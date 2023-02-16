import React from "react";
import { Link } from "react-router-dom";
import './MetadataCard.css';
import view from './preview.svg';
import trash from './delete.svg';
import icon from './display_text.svg';

const MetadataCard = (props) => {
  return (
    <article className="metadata-card slds-card">
            <div className="slds-card__header slds-grid">
                <header className="slds-media slds-media_center slds-has-flexi-truncate">
                    <div className="slds-media__figure">
                        <span className="slds-icon_container slds-icon-standard-calibration" style={{padding: "5px"}} title="account">
                            <img src={icon} alt="icon" width="25px" />
                            <span className="slds-assistive-text">{ props.name }</span>
                        </span>
                    </div>
                    <div className="slds-media__body">
                        <h2 className="slds-card__header-title">
                            <Link to={`/Tree/${props.categoryName}/${props.name}/${props.Id}`} className="slds-card__header-link slds-truncate" title="Accounts">
                                <span>{ props.name }</span>
                            </Link>
                        </h2>
                    </div>
                </header>
            </div>
            <div className="slds-card__body slds-card__body_inner">Click view to see dependancies</div>
            <footer className="slds-card__footer">
                <Link to={`/Tree/${props.categoryName}/${props.name}/${props.Id}`} className="view-btn footer-btn slds-card__footer-action" href="#" style={{ fontWeight: "700" }}>
                    <img src={view} alt="view" className='btn-icon'/>
                    <p>View</p> 
                </Link>
                <button name={props.name} id={props.Id} onClick={props.handleDialog} className="delete-btn footer-btn slds-card__footer-action" href="#" style={{ fontWeight: "700" }}>
                    <img src={trash} alt="trash" className='btn-icon'/>
                    <p>Delete</p>
                </button>
            </footer>
        </article>
  )
}

export default MetadataCard