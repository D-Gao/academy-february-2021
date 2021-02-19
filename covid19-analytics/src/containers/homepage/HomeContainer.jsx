import React, { useEffect, useRef, useState, useCallback } from "react";
import "./HomeContainer.scss";
import _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { startGetCovidData } from "../../store/actions/covid";
import { startGetCountries } from "../../store/actions/countries";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  formatDate,
  restMethod,
  toastSeverity,
} from "../../assets/utils/constant";

const HomeContainer = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const toast = useRef(null);

  const dispatch = useDispatch();

  const covidReducer = useSelector((state) => state.covidReducer);
  const countriesReducer = useSelector((state) => state.countriesReducer);
  const loadingReducer = useSelector((state) => state.loadingReducer);

  const getCountries = useCallback(() => dispatch(startGetCountries()), [
    dispatch,
  ]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const searchOnClickHandler = (event) => {
    if (dateFrom && dateTo) {
      if (dateFrom <= dateTo) {
        dispatch(
          startGetCovidData(
            moment(dateFrom).format(formatDate.ddMMYYYY),
            moment(dateTo).format(formatDate.ddMMYYYY),
            selectedCountry.code
          )
        );
        // dispatch(startGetCovidDataSummary());
      } else {
        toast.current.show({
          severity: toastSeverity.error,
          summary: "Error",
          detail: "From date should be minor or equal to to date.",
          life: 3000,
        });
      }
    } else {
      toast.current.show({
        severity: toastSeverity.error,
        summary: "Error",
        detail: "Missing params: from and to dates. Country is optional.",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    console.log("Che figata funziona!!! ", covidReducer);
    if (
      loadingReducer.counter > 0 &&
      !covidReducer.loading &&
      covidReducer.action === restMethod.get
    ) {
      if (covidReducer.error) {
        toast.current.show({
          severity: toastSeverity.error,
          summary: "Error",
          detail: "Cannot fetch data.",
          life: 3000,
        });
      } else if (
        _.isEmpty(covidReducer.covidData) ||
        _.isEmpty(covidReducer.covidDataSummary)
      ) {
        toast.current.show({
          severity: toastSeverity.warning,
          summary: "Warning",
          detail: "There are no results for this search.",
          life: 3000,
        });
      } else if (
        !_.isEmpty(covidReducer.covidData) &&
        !_.isEmpty(covidReducer.covidDataSummary)
      ) {
        props.history.push({
          pathname: "/dashboard",
          state: { selectedCountry: selectedCountry },
        });
      }
    }
  }, [covidReducer]);

  return (
    <div className="row justify-content-center align-items-start home-container">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="row justify-content-center align-items-center">
          <div className="col-9">
            {countriesReducer.countries && (
              <>
                <div className="row justify-content-center align-items-end search-container">
                  <div className="col-3">
                    <label htmlFor="countries">Countries</label>
                    <Dropdown
                      id="countries"
                      required={true}
                      value={selectedCountry}
                      options={countriesReducer.countries}
                      optionLabel="country"
                      optionValue="code"
                      onChange={(e) => {
                        console.log("select value: ", e.value);
                        setSelectedCountry(e.value);
                      }}
                      placeholder="Select a Country"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="from">From</label>
                    <Calendar
                      id="from"
                      value={dateFrom}
                      dateFormat="dd/mm/yy"
                      monthNavigator={true}
                      yearNavigator={true}
                      yearRange="2010:2030"
                      onChange={(e) => setDateFrom(e.value)}
                      showIcon
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="to">To</label>
                    <Calendar
                      id="to"
                      value={dateTo}
                      dateFormat="dd/mm/yy"
                      monthNavigator={true}
                      yearNavigator={true}
                      yearRange="2010:2030"
                      onChange={(e) => setDateTo(e.value)}
                      showIcon
                    />
                  </div>
                  <div className="col-3 button-position">
                    <Button
                      label="Search"
                      onClick={(event) => searchOnClickHandler()}
                      disabled={!dateFrom || !dateTo}
                      className="p-button-rounded p-button-lg"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
