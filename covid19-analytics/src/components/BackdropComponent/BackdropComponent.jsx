import React from "react";
import "./BackdropComponent.scss";
import {ProgressSpinner} from "primereact/progressspinner";

const BackdropComponent = (props) => {
    return (
        <div className="backdrop-container">
            <ProgressSpinner/>
        </div>
    );
};

export default BackdropComponent;
