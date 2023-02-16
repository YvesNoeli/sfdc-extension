import React from 'react';
import icon from './dashboard_component.svg';
import './TitleCard.css';

const TitleCard = ({UpName,ProperName}) => {
    return (
        <article className="slds-card banner">
            <div className="slds-card__header slds-grid">
                <header className="slds-media slds-media_center slds-has-flexi-truncate">
                    <div className="slds-media__figure">
                        <span className="slds-icon_container slds-icon-standard-assignment" title="account">
                            <img src={icon} alt="icon" />
                            <span className="slds-assistive-text">{UpName}</span>
                        </span>
                    </div>
                    <div className="slds-media__body">
                        <h2 className="slds-card__header-title">
                            <a href="#" className="slds-card__header-link slds-truncate" title="Accounts">
                                <span className='slds-title-one'>{UpName}</span>
                                <span className='slds-title-two'>{ProperName}</span>
                            </a>
                        </h2>
                    </div>
                </header>
            </div>
        </article>
    )
}

export default TitleCard;