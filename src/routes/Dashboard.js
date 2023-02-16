import React from "react";
import './Dashboard.css';
import Menu from "../components/Menu/Menu";
import TitleCard from "../components/TitleCard/TitleCard";


const Dashboard = (props) => {

    console.log("props of dashboard :: ==> ", props.UpName, props.ProperName);

    return(
        <div className="dashboard">

            <div className="dashboard--menu">
                <Menu />
            </div>

            <div className="dashboard--banner">
                <TitleCard UpName={props.UpName} ProperName={props.ProperName} />
            </div>

            <div className="dashboard--card--group">
            
            </div>
        
        </div>
    )
}

export default Dashboard;