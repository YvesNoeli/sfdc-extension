"use strict";



if (document.querySelector("body.sfdcBody, body.ApexCSIPage, #auraLoadingBox") || location.host.endsWith("visualforce.com")) {
  
  // We are in a Salesforce org

  chrome.runtime.sendMessage({message: "getSession", url: window.location.host}, resp => {
        console.log('resp session :: ', resp);
        if (resp) {
          initButton(resp, false);
        }
  });

  
}


function initButton(sfHost, inInspector) {
  
  /**
   * general style of frameset and button inside a style tag
   */

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.mtdt-card-css { visibility: visible !important ; height: 230px; width: 210px; display: block; right: 40px; top: 210px; position: fixed; z-Index: 1000; }'
                    +'@keyframes fade-in { 0% {opacity: 0;} 100% {opacity: 1;} }'
                    +'.chrome-button { transition: box-shadow 1s ease; position: fixed; background-color: #2A739E; z-index: 1200; top: 200px; right: 5px; padding: 10px; border-radius: 15px; width: 40px; height: 40px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }'
                    +'.chrome-button:hover { cursor: pointer; box-shadow: none; }'
                    +'.mtdt-card-css[open] { animation: fade-in 0.85s forwards; }'
                    +'.chrome-button > .first-circle { position: absolute; border: 10px solid #00A1E0; background-color: #fff; left: 5px; top: 5px; padding: 5px; border-radius: 100%; width: 15px; height: 15px; }';
  document.getElementsByTagName('head')[0].appendChild(style);


  /**
   * div for the card element
   */

  let rootEl = document.createElement("div");
  rootEl.classList.add("insext-active");
  rootEl.setAttribute("id", "mtdt-card");
  rootEl.style.visibility = "hidden";
  rootEl.style.transition = "height 0.75s ease 0s";


  /**
   * button to toggle the card of chrome extension
   */

  let btn = document.createElement("div");
 
  btn.className ="chrome-button";
  btn.setAttribute("id", "toggle");
  btn.addEventListener("click", () => {
    var element = document.getElementById("mtdt-card");
    element.classList.toggle("mtdt-card-css");
    element.toggleAttribute('open')
  })

  let circle = document.createElement("div");
  circle.innerHTML = "&nbsp;";
  circle.className = "first-circle";


 /**
   * frameset of chrome extension
   */

  let popupSrc = chrome.runtime.getURL(`popup.html?sid=${sfHost.value}&hostname=${sfHost.domain}`);
  let popupEl = document.createElement("iframe");
  popupEl.src = popupSrc;
  popupEl.style.height = "230px";
  popupEl.style.width = "210px";
  popupEl.style.border = "0px";

  rootEl.appendChild(popupEl);
  btn.appendChild(circle);
  document.body.appendChild(btn);
  document.body.appendChild(rootEl);



}
