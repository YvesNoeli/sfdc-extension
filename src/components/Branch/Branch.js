import React from 'react'
import { useState, useEffect } from 'react'
import MetadataTree from '../MetadataTree/MetadataTree';

const Branch = (props) => {

    const handleBranch = () => {

        const branchname = '.'+props.BranchClass;

        const branchs = document.querySelectorAll(branchname);

        console.log(branchs);

        branchs.forEach((branch) => {


            branch.addEventListener("click", () => {

                branchs.forEach((item) => {
                    if(item != branch) item.removeAttribute("open"); 
                });

            })

        })

    }

    const [roll, setRoll] = useState(false);

    useEffect(() => {

        console.log(' ***** hasDependancy *******   ', props)
    }, [])
    function getParentIds(){
        return {"ids": [...props.parentIds.ids]}
    }

    return (
        <ul>
            {
                <li>
                        <details className={props.BranchClass} onClick={ handleBranch } >
                            <summary key={props.id} onClick={() => {
                                setRoll(!roll)
                            }}>
                                <span>
                                    {props.name}{'('+props.type+')'}
                                </span>
                            </summary>
                            { !(getParentIds().ids.includes(props.id)) ? 
                              <ul>
                                    <li>
                                        {roll && <MetadataTree Id={props.id} parentIds={getParentIds()}/>}
                                    </li>
                                </ul>
                                :
                            <ul>
                                <li>Already open</li>
                            </ul>
                            }
                            
                        </details>
                    </li>
            }
        </ul>
    )
    // (!props.hasDependancy) ?
    //     <ul>
    //         <li>No dependencies</li>
    //     </ul>
    //     :
    //     <ul>
    //         <li>
    //             <details>
    //                 <summary key={props.id} onClick={() => {
    //                     setRoll(!roll)
    //                 }}>
    //                     <span>
    //                         {props.name}
    //                     </span>
    //                 </summary>
    //                 <ul>
    //                     <li>
    //                         {roll && <MetadataTree Id={props.id} />}
    //                     </li>
    //                 </ul>
    //             </details>
    //         </li>
    //     </ul>
}

export default Branch