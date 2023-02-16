import React from "react";
import './DialogBox.css';
import warning from './warning.svg';
import { useNavigate } from 'react-router-dom';
import { deleteData, getUrlParam } from './../../store/ManageData'; 


const DialogBox = ({ message, categoryName, handleConfirmation, nameMetadata, id, abort }) => {

    const navigate = useNavigate();
    const credentials = getUrlParam();

    const deleteAction = () => {

        deleteData(credentials.hostname, credentials.sid, categoryName, id).then(e => {
            if (e.error) {
                console.log('Error');
                abort();
                handleConfirmation(e.data.message);
            } else {
                console.log('We have deleted : \n');
                console.log('Metadata Name : ' + nameMetadata);
                console.log('\n Metadata Id : ' + id);
                navigate(0);
            }
        })


    }

    return (
        <>
            <div className="dialog-box">
                <div className="dialog-box--card">
                    <section className="dialog-box--card--icon-message">
                        <div className="dialog-box--card--icon-message--icon">
                            <img src={warning} alt="icon" />
                        </div>
                        <div className="dialog-box--card--icon-message--message">
                            <p>{message}</p>
                        </div>
                    </section>
                    <section className="dialog-box--card--btn-group">
                        <button className="dialog-box--card--btn-accept" onClick={deleteAction}>
                            Yes
                        </button>
                        <button className="dialog-box--card--btn-reject" onClick={abort}>
                            No
                        </button>
                    </section>
                </div>
            </div>
        </>
    )
}

export default DialogBox;