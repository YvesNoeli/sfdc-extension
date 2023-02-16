import React from 'react';
import warning from './warning.svg';

const ConfirmBox = ({ message,close }) => {
    return (
        <>
            <section role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01" class="slds-modal slds-fade-in-open">
                <div class="slds-modal__container">
                    <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse">
                        <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                            x
                        </svg>
                        <span class="slds-assistive-text" onClick={close}>Cancel and close</span>
                    </button>
                    <div class="slds-modal__header">

                        <h1 
                        id="modal-heading-01" 
                        class="slds-modal__title slds-hyphenate"
                        style={{
                            display : "flex",
                            alignItems : "center",
                            justifyContent : "center",
                            fontSize : "25px",
                            fontWeight : "600"
                        }}
                        >
                            <img src={warning} alt="warning" width="20px" />
                            <p>Warning</p>
                        </h1>
                    </div>
                    <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">
                        <p style={{
                            fontSize : "20px",
                            fontWeight : "400"
                        }}>
                            { message }
                        </p>
                    </div>
                    <div class="slds-modal__footer slds-modal__footer_directional">
                        <button class="slds-button slds-button_brand" onClick={close}>Close</button>
                    </div>
                </div>
            </section>
            <div class="slds-backdrop slds-backdrop_open" role="presentation" onClick={close}></div>
        </>
    )
}

export default ConfirmBox