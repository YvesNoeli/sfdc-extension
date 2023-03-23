import React, { useEffect,useState } from "react";
import { getDependencyData,getUrlParam } from "../../store/ManageData"; 
import Branch from "../Branch/Branch";
import Spinner from "../Spinner/Spinner";
import './MetadataTree.css';


const MetadataTree = (props) => {

    const metadataClass = "branch_"+props.Id;

    const credentials = getUrlParam();

    const[dependancies, setdependancies] = useState([]);

    const[haschildren, setHaschildren] = useState(true);

    const[loading, setLoading] = useState(false);

    function getParentIds(){
        return {"ids": [...props.parentIds.ids, props.Id]}
    }
    useEffect(() => {
        
        let parents = getParentIds().ids;

        let tab = [];

        setLoading(true);

        getDependencyData(props.Id,credentials.hostname,props.categoryName,credentials.sid).then(
            (elt) => {
                elt.data.forEach(element => {
                // if(!parents.includes(element.Id)){
                    tab.push(element);
                })
                console.log("@## data",elt);
                setdependancies([...tab]);
                (tab.length > 0) ? setHaschildren(true) : setHaschildren(false);
                setLoading(false);
            }           
        )

        
        
        console.log('***** Metadata Tree ***** \n');

        console.log('/// MetadataTree Host name : ',credentials.hostname);
        console.log('/// MetadataTree Host Id : ',credentials.sid);
        console.log('/// Metadata Id : ',props.Id);
        console.log('/// MetadataTree dependancies tab : ', tab);
        console.log('/// MetadataTree dependancies : ', dependancies);

    }, [])

    
    // const Branch = (haschildren,name,id) => {
    //     return (haschildren) ? 
    //     <ul>
    //         <li>
    //             <details>
    //                 <summary key={id}>
    //                     <span>
    //                         {name}
    //                     </span>
    //                 </summary>
    //                 <ul>
    //                     <li>
    //                         {id}
    //                     </li>
    //                 </ul>
    //             </details>
    //         </li>
    //     </ul>
    //     :
    //     <ul>
    //         <li>No children</li>
    //     </ul>
    // }

    return (
        <>
            {
                (loading) ? 
                <Spinner /> :
                <div className="tree-comp">
                    <ul className="tree">
                
                        {
                            (haschildren) ?
                            dependancies.map(e => 
                                <Branch BranchClass={metadataClass} type={e.Type} name={e.Name} id={e.Id} parentIds={getParentIds()}/>
                            )
                            :
                            <li>No dependancies</li>
                        }

                    </ul>
                </div>
            }
        </>
    )
}

export default MetadataTree;




