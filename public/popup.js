let view = document.querySelector('.card--btn-view');
let sid;

let getUrlParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        hostname: urlParams.get('hostname'),
        sid: urlParams.get('sid')
    }
}

// const sid = ;
// let restinstanceHostname = 'resourceful-koala-rztcb6-dev-ed.lightning.force.com/';

const redirect = () => {
    const credentials = getUrlParam();

    chrome.tabs.create({
        url: 'index.html?id='+credentials.sid+'&hostname='+credentials.hostname
    })
    

    console.log('end')
    // console.log('sid', sid)
}




view.addEventListener('click',redirect)
