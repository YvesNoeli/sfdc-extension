import metadata from '../metadataTab';

const metadataTab = metadata;

async function restCallout(url, method, instanceHostname, sid, headers = {}){
    
    let xhr = new XMLHttpRequest();
    url += (url.includes("?") ? "&" : "?") + "cache=" + Math.random();
    xhr.open(method, "https://" + instanceHostname + url, true);
    console.log(method, " :: https://" + instanceHostname + url);
    xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + sid);
    for (let [name, value] of Object.entries(headers)) {
        xhr.setRequestHeader(name, value);
    }
    
    xhr.responseType = "json";
    // the function called when an XMLHttpRequest transaction completes successfully
    xhr.onload = function() {
        if (xhr.status != 200 || xhr.status != 204) {
          console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(`Done, got ${JSON.stringify(xhr.response.totalSize)} records`);
        }
        
    };
    //The progress event is fired periodically when a request receives more data.
    xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        console.log(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
        console.log(`Received ${event.loaded} bytes`);
    }
    
    }; 
    xhr.onerror = function() {
        console.log("Request failed");
    };
    xhr.send();
    return  new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 204) {
                resolve(xhr.response);
            } else if (xhr.status == 0) {
                reject(xhr.response);
                console.log("Received no response from Salesforce REST API - ", xhr);
            } else {
                reject(xhr.response);
                console.log("Received error response from Salesforce REST API", xhr);
            }
          } 
        };
    });
}

async function getData(restinstanceHostname,sid,categoryName,limit,offset){
    let data =[];
    const objDatas = {}
    let index = metadataTab.findIndex(elt => elt.metadata == categoryName);
    if(index == -1){
        data.push({"message": "Metadata is not supported", "errorCode": "Metadata_Notfound"});
        objDatas.error = true;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
        return objDatas;
    }
    let dataField = metadataTab[index].Name;      

    let resturl;

    

    if(limit == null && offset == null && categoryName == 'EntityDefinition'){

    
        resturl = `/services/data/v56.0/tooling/query?q=Select+Id,+${dataField}+From+${categoryName}+where+IsCustomizable=true+order+By+${dataField}`;
    
        await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
            objDatas.Type = dataFromCallOut.entityTypeName ? dataFromCallOut.entityTypeName : categoryName
            
            console.log('data from callout ::=====>',dataFromCallOut);

  
            dataFromCallOut.records.forEach(element => {if(!element[dataField].includes('__c') && !element[dataField].includes('__mdt')){
                data.push({
                    "Id" : element.Id,
                    "Name" : element[dataField],
                })
            }});

            console.log('data ::====>',data);

            objDatas.error = false;
            objDatas.data = data;
            console.log('objDatas-->', objDatas);
        })
        .catch(error => {
            data.push(error[0]);
            objDatas.error = true;
            objDatas.data = data;
            console.log('objDatas-->', objDatas);
        });

    }else{
       resturl = `/services/data/v56.0/tooling/query?q=Select+Id,+${dataField}+From+${categoryName}+order+By+${dataField}+limit+${limit}+offset+${offset}`;

       await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
        objDatas.Type = dataFromCallOut.entityTypeName ? dataFromCallOut.entityTypeName : categoryName
        data =  dataFromCallOut.records.map(element =>{
            
                return {
                    "Id" : element.Id,
                    "Name" : element[dataField]
                }
        });
        objDatas.error = false;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    })
    .catch(error => {
        data.push(error[0]);
        objDatas.error = true;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    });
    }

    return objDatas;               

}

async function getOccurenceData(metadataName, restinstanceHostname, sid){
    
    const objDatas = {}
    let resturl
    if(metadataName == 'EntityDefinition'){
        let occur = 0;
        resturl = `/services/data/v56.0/tooling/query?q=Select+Id,+Label+,QualifiedApiName+,DeveloperName+From+EntityDefinition+where+IsCustomizable=true`;
        await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
        console.log('dataFromCallOut-->', dataFromCallOut);
         
        dataFromCallOut.records.forEach(element => {
                if(!element.QualifiedApiName.includes('__c') && !element.QualifiedApiName.includes('__mdt')){
                   occur = occur + 1;
                }
            });
            objDatas.error = false;
            objDatas.data = occur;
            console.log('objDatas-->', objDatas);
            console.log('occur-->', objDatas.data);
        })
        .catch(error => {
            objDatas.error = true;
            objDatas.data = error[0];
            console.log('objDatas-->', objDatas);
        });
    }else{
        resturl = `/services/data/v56.0/tooling/query?q=Select+Count(Id)+Occurence+From+${metadataName}`;
        await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
            
            console.log('dataFromCallOut-->', metadataName, dataFromCallOut);
            objDatas.error = false;
            objDatas.data = dataFromCallOut.records[0].Occurence;
            console.log('objDatas-->', metadataName, objDatas);
        })
        .catch(error => {
            objDatas.error = true;
            objDatas.data = error[0];
            console.log('objDatas-->', objDatas);
        });
    }

    return objDatas;
    
}

async function getDependencyData(dataId, restinstanceHostname,categoryName, sid){
    let data =[];
    const objDatas = {}
    
    let resturl = `/services/data/v56.0/tooling/query?q=Select+MetadataComponentId,+MetadataComponentName,+MetadataComponentType+From+MetadataComponentDependency+Where+RefMetadataComponentId='${dataId}'`;

    if(categoryName == 'entityDefinition'){
        resturl = `/services/data/v56.0/tooling/query?q=Select+MetadataComponentId,+RefMetadataComponentId,+MetadataComponentName,+RefMetadataComponentName,+MetadataComponentType,+RefMetadataComponentType+From+MetadataComponentDependency+Where+RefMetadataComponentId='${dataId}'`;
    }

    
    
    await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
        let occurence = 0
        data =  dataFromCallOut.records.map(element =>{
            occurence++
            return {
                "Id" : element.MetadataComponentId,
                "Name" : element.MetadataComponentName,
                "Type" : element.MetadataComponentType
            }
        });
        objDatas.occurence = occurence;
        objDatas.error = false;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    })
    .catch(error => {
        data.push(error[0]);
        objDatas.error = true;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    });
    return objDatas;
}


async function searchMetaData(restinstanceHostname,sid,valueParam,typeParam){

    let data =[];

    const objDatas = {}
    let resturl;
    let param = '{'+valueParam+'*'+'}'
    console.log('param-->', param);
    resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}`;
  

     if (typeParam != undefined) {
             metadataTab.forEach(element =>{
            if(element.metadata == typeParam  && element.IsSearchable){
                switch (element.Name) {
                    case 'MasterLabel':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(MasterLabel,Id)`;
                        break;
                    case 'DeveloperName':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(DeveloperName,Id)`;
                        
                        break;
                    case 'Name':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(Name,Id)`;
                        break;
                    case 'TestSuiteName':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(TestSuiteName,Id)`;
                        break;
                    case 'ValidationName':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(ValidationName,Id)`;
                        break;
                    case 'Subject':
                        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING+${typeParam}+(Subject,Id)`;
                    default:
                        break;
                }
                
            }
        });
    }
    else{
        resturl = `/services/data/v56.0/tooling/search/?q=FIND+${param}+RETURNING`;
        metadataTab.forEach(element =>{
            if(element.IsSearchable){
                switch (element.Name) {
                    case 'MasterLabel':
                        resturl = resturl+' '+`${element.metadata}(MasterLabel,Id),`;
                        
                        break;
                    case 'DeveloperName':
                        resturl = resturl+' '+`${element.metadata}(DeveloperName,Id),`;
                        break;
                    case 'Name':
                        resturl = resturl+' '+`${element.metadata}(Name,Id),`;
                        break;
                    case 'TestSuiteName':
                        resturl = resturl+' '+`${element.metadata}(TestSuiteName,Id),`;
                        break;
                    case 'ValidationName':
                        resturl = resturl+' '+`${element.metadata}(ValidationName,Id),`;
                        break;
                    case 'Subject':
                        resturl = resturl+' '+`${element.metadata}(Subject,Id),`;
                    default:
                        break;
                }
            }    
                
            
        }); 
        resturl = resturl.substring(0, resturl.length-1);
    }
    console.log('resturl-->', resturl);
    await restCallout(resturl, 'GET', restinstanceHostname, sid).then(dataFromCallOut=>{
        console.log('dataFromCallOut-->', dataFromCallOut);
        data =  dataFromCallOut.searchRecords.map(element =>{
            console.log('element-->', element);
            let valName
            if(element.hasOwnProperty('MasterLabel')) {
                valName = element.MasterLabel;
            }
            else if(element.hasOwnProperty('DeveloperName')) {
                valName = element.DeveloperName;
            }
            else if(element.hasOwnProperty('Name')) {
                valName = element.Name;
            }
            else if(element.hasOwnProperty('TestSuiteName')) {
                valName = element.TestSuiteName;
            }
            else if(element.hasOwnProperty('ValidationName')) {
                valName = element.ValidationName;
            }
            else if(element.hasOwnProperty('Subject')) {
                valName = element.Subject;
            }
            return {
                "Id" : element.Id,
                "url" : element.attributes.url,
                "Type" : element.attributes.type,
                "Name" : valName
            }
        });
        objDatas.error = false;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    })
    .catch(error => {
        data.push(error[0]);
        objDatas.error = true;
        objDatas.data = data;
        console.log('objDatas-->', objDatas);
    });
    return objDatas;
}

async function deleteData(restinstanceHostname, sid, metadataName, dataId){
    const objDatas = {}
    let resturl = '/services/data/v56.0/tooling/sobjects/'+metadataName+'/'+dataId;
    await restCallout(resturl , 'DELETE', restinstanceHostname, sid)
    .then(response=>{
        objDatas.error = false;
        objDatas.data = 'Deleted Successfully';
        console.log('objDatas-->', objDatas);
    })
    .catch(error => {
        console.log('error :: ', error);
        objDatas.error = true;
        objDatas.data = error[0];
        console.log('objDatas-->', objDatas);
    });
    return objDatas;
}

let getUrlParam = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let credential = {hostName: null, sid: null};
    
    credential.hostName = urlParams.get('hostname');
    
    if(urlParams.get('id')){
        credential.sid = urlParams.get('id');
        sessionStorage.setItem("credential", JSON.stringify(credential));
        let newUrl = window.location.origin + window.location.pathname + '?hostname=' + credential.hostName;
        window.location.replace(newUrl);
    }else{
        credential = JSON.parse(sessionStorage.getItem("credential"));
    }
    console.log('### SESSION credential => '+credential);
    
    return {
        hostname: credential.hostName,
        sid: credential.sid
    }

}


export  { deleteData,searchMetaData, getData, getDependencyData, getOccurenceData, getUrlParam }