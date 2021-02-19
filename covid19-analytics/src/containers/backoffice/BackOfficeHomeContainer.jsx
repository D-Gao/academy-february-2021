import React, {useState, useEffect} from "react";
import "./BackofficeContainer.scss";
import { InputText } from 'primereact/inputtext';
import {connect} from 'react-redux';
import {startGetCountries} from "./../../store/actions/countries";
import { Button } from 'primereact/button';
import _ from "lodash";



const BackOfficeHomeContainer = (props) => {

  const [formValues, setFormValues] = useState({continent: "", country: "", weeklyCases: 0, weeklyDeaths: 0, notificationRate: 0.0});

  const handleClick = () => {
    console.log("Sending formvalues: ", formValues);
  }

  return ( 
    <div className="home-container"> 
    <p>Post a case</p>
    <div className="p-field p-grid p-md-2">
        <label htmlFor="continent" className="p-col-fixed" style={{width:'100px'}}>Continent</label>
        <div className="p-col">
            <InputText 
              id="continent" 
              type="text" 
              value={formValues.continent} 
              onChange={(e) => {
                setFormValues({...formValues, continent: e.target.value});
          }}/>
        </div>
    </div>
    <div className="p-field p-grid p-md-2">
      <label htmlFor="countries" className="p-col-fixed" style={{width:'100px'}}>Country</label>
      <div className="p-col">
            <InputText 
              id="country" 
              type="text" 
              value={formValues.country} 
              onChange={(e) => {
                setFormValues({...formValues, country: e.target.value});
          }}/>
        </div>
    </div>
    <div className="p-field p-grid p-md-2">
        <label htmlFor="weekly-cases" className="p-col-fixed" style={{width:'100px'}}>Weekly Cases</label>
        <div className="p-col">
            <InputText 
              id="weekly-cases" 
              type="number" 
              value={formValues.weeklyCases} 
              onChange={(e) => {
                setFormValues({...formValues, weeklyCases: e.target.value});
          }}/>
        </div>
    </div>
    <div className="p-field p-grid p-md-2">
        <label htmlFor="weekly-deaths" className="p-col-fixed" style={{width:'100px'}}>Weekly Deaths</label>
        <div className="p-col">
            <InputText 
              id="weekly-deaths" 
              type="number" 
              value={formValues.weeklyDeaths}
              onChange={(e) => {
                setFormValues({...formValues, weeklyDeaths: e.target.value});
          }}/>
        </div>
    </div>
    <div className="p-field p-grid p-md-2">
        <label htmlFor="weekly-deaths" className="p-col-fixed" style={{width:'100px'}}>Notification Rate</label>
        <div className="p-col">
            <InputText 
              id="notification-rate" 
              type="float" 
              value={formValues.notificationRate}
              onChange={(e) => {
                setFormValues({...formValues, notificationRate: e.target.value});
          }}/>
        </div>
    </div>

    <div className={"col-12 p-md-2 button"}>
              <Button label="Submit" onClick={handleClick} disabled={_.some(formValues, el => (el === "" || el === 0))}/>
              </div>
    </div>
  );
};

const mapStateToProps = state => ({
  countries: state.countriesReducer.countries
});

const mapDispatchToProps = dispatch => ({
  getCountries: () => dispatch(startGetCountries()),
});

export default connect(mapStateToProps,
  mapDispatchToProps) (BackOfficeHomeContainer);

 


