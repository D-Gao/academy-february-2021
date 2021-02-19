import React, {useEffect, useState} from "react";
import _ from "lodash";
import {Menubar} from "primereact/menubar";
import "./MenuBarComponent.scss";
import {useSelector} from "react-redux";

const MenuBarComponent = (props) => {
    const covidData = useSelector(state => state.covidReducer.covidData);
    const covidDataSummary = useSelector(state => state.covidReducer.covidDataSummary);

    const [items, setItems] = useState([
        {
            label: "Search",
            icon: "pi pi-search",
            disabled: false,
            command: (event) => {
                window.location = "/";
            },
        },
        {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            disabled: false,
            command: (event) => {
                window.location = "/dashboard";
            },
        },
        {
            label: "Back Office",
            icon: "pi pi-fw pi-pencil",
            disabled: false,
            command: (event) => {
                window.location = "/back-office";
            },
        },
    ]);

    useEffect(() => {
        let newItems = _.cloneDeep(items);
        newItems[1].disabled = _.isEmpty(covidDataSummary) || _.isEmpty(covidData);
        setItems(newItems);
    }, [covidData, covidDataSummary]);

    return <Menubar model={items}/>;
};

export default MenuBarComponent;
