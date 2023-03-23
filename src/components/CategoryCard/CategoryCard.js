import React, { useEffect, useState } from 'react';
import icon from './display_text.svg';
import './CategoryCard.css';
import { getOccurenceData,getUrlParam } from '../../store/ManageData';
import { Link } from 'react-router-dom';

const CategoryCard = (props) => {

    const credentials = getUrlParam();
    console.log('**************** ' + credentials);
    const [occurence, setOccurence] = useState({});
    
    
    let myName = () => {
        console.log('RENDER :: ', props.name)
    }

    useEffect(() => {
        console.log('RENDER :: ', props.name)
        getOccurenceData(props.name,credentials.hostname,credentials.sid)
        
        .then(item => {
            if(item.error){
                if(item.data.errorCode == 'INVALID_TYPE'){
                    setOccurence({value: 0})
                }else{
                    setOccurence({value: item.data.message})
                }
            }else{
                setOccurence({value: item.data})
            }
        })
        .catch(console.log)
    }, [props.name]);
    return (
        
        <article className="category-card slds-card">
            <div className="slds-card__header slds-grid">
                <header className="slds-media slds-media_center slds-has-flexi-truncate">
                    <div className="slds-media__figure">
                        <span className="slds-icon_container slds-icon-standard-account" style={{padding: "5px"}} title="account">
                            <img src={icon} alt="icon" width="25px" />
                            <span className="slds-assistive-text">
                                { (props.name == 'EntityDefinition') ? props.name + '(Standard Objects)' : props.name }
                            </span>
                        </span>
                    </div>
                    <div className="slds-media__body">
                        <h2 className="slds-card__header-title">
                            <Link to={`/Metadatas/${props.name}/${occurence.value}`} className="slds-card__header-link slds-truncate" title="Accounts">
                                <span>
                                    { (props.name == 'EntityDefinition') ? props.name + ' (Standard Objects)' : props.name }
                                </span>
                            </Link>
                        </h2>
                    </div>
                </header>
            </div>
            <div className="slds-card__body slds-card__body_inner">{(occurence.value >= 0) ? occurence.value+' occurencies' : '...wait' }</div>
            <footer className="slds-card__footer">
                <a className="slds-card__footer-action" href="#" style={{ fontWeight: "700" }}>
                    <Link to={`/Metadatas/${props.name}/${occurence.value}`}>View</Link>
                    <span className="slds-assistive-text">{ (props.name) ? props.name : "wait ...." }</span>
                </a>
            </footer>
        </article>
    )
}

export default CategoryCard