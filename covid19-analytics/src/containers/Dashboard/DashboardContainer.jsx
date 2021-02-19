import React, {useEffect, useState} from "react";
import _ from "lodash";
import "./DashboardContainer.scss";
import {useSelector} from "react-redux";
import {TabPanel, TabView} from "primereact/tabview";
import TableComponent from "../../components/TableComponent/TableComponent";
import {Chart} from "primereact/chart";
import {Dropdown} from "primereact/dropdown";
import {chartColor} from "../../assets/utils/constant";
import {getDatasetAverageLineChart, getDatasetCasesWeeklyBarChart, getDatasetDeathsWeeklyBarChart} from "./utils";


const DashboardContainer = (props) => {
    const covidData = useSelector(state => state.covidReducer.covidData);
    const covidDataSummary = useSelector(state => state.covidReducer.covidDataSummary);
    const countries = useSelector(state => state.countriesReducer.countries);

    const [selectedCountry1, setSelectedCountry1] = useState("");
    const [selectedCountry2, setSelectedCountry2] = useState("");
    const [selectedCountry3, setSelectedCountry3] = useState("");
    const [casesWeeklyBarChartDataset, setCasesWeeklyBarChartDataset] = useState({ labels: [], datasets: [] });
    const [deathsWeeklyBarChartDataset, setDeathsWeeklyBarChartDataset] = useState({ labels: [], datasets: [] });
    const [averageLineChartDataset, setAverageLineChartDataset] = useState({ labels: [], datasets: [] });

    const [columnsTable, setColumnsTable] = useState([
        { field: "country", header: "Country Name", sortable: true },
        { field: "countryCode", header: "Country Code", sortable: true },
        { field: "continent", header: "Continent", sortable: true },
        { field: "totalCase", header: "Total Case", sortable: true },
        { field: "totalDeaths", header: "Total Deaths", sortable: true }]);

    let barChartOptions = {
        legend: {
            labels: {
                fontColor: '#ffffff'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#ffffff'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#ffffff'
                }
            }]
        }
    };


    useEffect(() => {
        if (_.isEmpty(countries) || _.isEmpty(covidData) || _.isEmpty(covidDataSummary)) {
            props.history.push("/");
        }
    }, [countries, covidData])

    useEffect(() => {
        if (props.location.state && props.location.state.selectedCountry && covidData) {
            console.log(props.location.state.selectedCountry);
            const countryCode = props.location.state.selectedCountry;
            setSelectedCountry1(countryCode);

            const [labels1, data1] = getDatasetCasesWeeklyBarChart(covidData, countryCode);
            const [labels2, data2] = getDatasetDeathsWeeklyBarChart(covidData, countryCode);
            const [labels3, data3] = getDatasetAverageLineChart(covidData, countryCode);

            setCasesWeeklyBarChartDataset(prevState => ({
                    labels: labels1,
                    datasets: [{
                        label: countryCode,
                        data: data1,
                        backgroundColor: chartColor.dataset1
                    }]
                })
            );

            setDeathsWeeklyBarChartDataset(prevState => ({
                    labels: labels2,
                    datasets: [{
                        label: countryCode,
                        data: data2,
                        backgroundColor: chartColor.dataset1
                    }]
                })
            );

            setAverageLineChartDataset(prevState => ({
                    labels: labels3,
                    datasets: [
                        {
                            label: countryCode,
                            data: data3,
                            fill: false,
                            borderColor: chartColor.dataset1
                        }
                    ]
                })
            );
        }
    }, [props.location, covidData]);


    const onDropDownChangeHandler = event => {
        let newCasesWeeklyBarChartDataset = _.cloneDeep(casesWeeklyBarChartDataset);
        let newDeathsWeeklyBarChartDataset = _.cloneDeep(deathsWeeklyBarChartDataset);
        let newAverageLineChartDataset = _.cloneDeep(averageLineChartDataset);
        let [labels1, data1] = getDatasetCasesWeeklyBarChart(covidData, event.target.value);
        let [labels2, data2] = getDatasetDeathsWeeklyBarChart(covidData, event.target.value);
        let [labels3, data3] = getDatasetAverageLineChart(covidData, event.target.value);

        switch (event.target.id) {
            case "country-1":
                setSelectedCountry1(event.target.value);

                newCasesWeeklyBarChartDataset.datasets[0] = {
                    label: event.target.value,
                    data: data1,
                    backgroundColor: chartColor.dataset1
                };

                newDeathsWeeklyBarChartDataset.datasets[0] = {
                    label: event.target.value,
                    data: data2,
                    backgroundColor: chartColor.dataset1
                };

                newAverageLineChartDataset.datasets[0] = {
                    label: event.target.value,
                    data: data3,
                    fill: false,
                    borderColor: chartColor.dataset1
                };

                if (_.isEmpty(newCasesWeeklyBarChartDataset.labels)) newCasesWeeklyBarChartDataset.labels = labels1;
                if (_.isEmpty(newDeathsWeeklyBarChartDataset.labels)) newDeathsWeeklyBarChartDataset.labels = labels2;
                if (_.isEmpty(newAverageLineChartDataset.labels)) newAverageLineChartDataset.labels = labels3;
                break;
            case "country-2":
                setSelectedCountry2(event.target.value);

                newCasesWeeklyBarChartDataset.datasets[1] = {
                    label: event.target.value,
                    data: data1,
                    backgroundColor: chartColor.dataset2
                };
                newDeathsWeeklyBarChartDataset.datasets[1] = {
                    label: event.target.value,
                    data: data2,
                    backgroundColor: chartColor.dataset2
                };
                newAverageLineChartDataset.datasets[1] = {
                    label: event.target.value,
                    data: data3,
                    fill: false,
                    borderColor: chartColor.dataset2
                };

                if (_.isEmpty(newCasesWeeklyBarChartDataset.labels)) newCasesWeeklyBarChartDataset.labels = labels1;
                if (_.isEmpty(newDeathsWeeklyBarChartDataset.labels)) newDeathsWeeklyBarChartDataset.labels = labels2;
                if (_.isEmpty(newAverageLineChartDataset.labels)) newAverageLineChartDataset.labels = labels3;
                break;
            case "country-3":
                setSelectedCountry3(event.target.value);

                newCasesWeeklyBarChartDataset.datasets[2] = {
                    label: event.target.value,
                    data: data1,
                    backgroundColor: chartColor.dataset3
                };
                newDeathsWeeklyBarChartDataset.datasets[2] = {
                    label: event.target.value,
                    data: data2,
                    backgroundColor: chartColor.dataset3
                };
                newAverageLineChartDataset.datasets[2] = {
                    label: event.target.value,
                    data: data3,
                    fill: false,
                    borderColor: chartColor.dataset3
                };

                if (_.isEmpty(newCasesWeeklyBarChartDataset.labels)) newCasesWeeklyBarChartDataset.labels = labels1;
                if (_.isEmpty(newDeathsWeeklyBarChartDataset.labels)) newDeathsWeeklyBarChartDataset.labels = labels2;
                if (_.isEmpty(newAverageLineChartDataset.labels)) newAverageLineChartDataset.labels = labels3;
                break;
            default:
                break;
        }
        setCasesWeeklyBarChartDataset(newCasesWeeklyBarChartDataset);
        setDeathsWeeklyBarChartDataset(newDeathsWeeklyBarChartDataset);
        setAverageLineChartDataset(newAverageLineChartDataset);
    };

    return (
        <div className="dashboard-container">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 filter">
                    <div className="row">
                        <div className="col-4 dropdown-countries">
                            <div>
                                <label htmlFor="country-1">Country 1</label>
                            </div>
                            <Dropdown
                                id="country-1"
                                value={selectedCountry1}
                                options={countries}
                                optionLabel="country"
                                optionValue="code"
                                onChange={(e) => onDropDownChangeHandler(e)}
                                placeholder="Select a Country"
                                disabled={props.location.state && props.location.state.selectedCountry.length > 0}
                            />
                        </div>
                        <div className="col-4 dropdown-countries">
                            <div>
                                <label htmlFor="country-2">Country 2</label>
                            </div>
                            <Dropdown
                                id="country-2"
                                value={selectedCountry2}
                                options={countries}
                                optionLabel="country"
                                optionValue="code"
                                onChange={(e) => onDropDownChangeHandler(e)}
                                placeholder="Select a Country"
                                disabled={props.location.state && props.location.state.selectedCountry.length > 0}
                            />
                        </div>
                        <div className="col-4">
                            <div>
                                <label htmlFor="country-3">Country 3</label>
                            </div>
                            <Dropdown
                                id="country-3"
                                value={selectedCountry3}
                                options={countries}
                                optionLabel="country"
                                optionValue="code"
                                onChange={(e) => onDropDownChangeHandler(e)}
                                placeholder="Select a Country"
                                disabled={props.location.state && props.location.state.selectedCountry.length > 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-start align-items-start tabs-container">
                <div className="col-12">
                    <TabView>
                        {/* TODO: creare un componente riutilizzabile per la tabella*/}
                        <TabPanel header="Summary Country Table" leftIcon="pi pi-table">
                            {covidDataSummary.length > 0 &&
                            columnsTable.length > 0 &&
                            <TableComponent tableData={covidDataSummary}
                                            pagination
                                            rows={10}
                                            rowsOptions={[10, 15, 20]}
                                            columnsList={columnsTable}/>
                            }
                        </TabPanel>
                        <TabPanel header="Cases Weekly per Country" leftIcon="pi pi-user">
                            <Chart type="bar" data={casesWeeklyBarChartDataset} options={barChartOptions}/>
                        </TabPanel>
                        <TabPanel header="Deaths Weekly per Country" leftIcon="pi pi-cog">
                            <Chart type="bar" data={deathsWeeklyBarChartDataset} options={barChartOptions}/>
                        </TabPanel>
                        <TabPanel header="Average per Country" leftIcon="pi pi-cog">
                            <Chart type="line" data={averageLineChartDataset} options={barChartOptions}/>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default DashboardContainer;
