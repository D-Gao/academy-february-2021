import moment from "moment";
import {formatDate} from "./constant";

export const filterCovidData = (singleRecord, from, to, country) => {
    const fromDate = moment(from, formatDate.ddMMYYYY);
    const toDate = moment(to, formatDate.ddMMYYYY);
    const dataReport = moment(singleRecord.dateRep, formatDate.ddMMYYYY);

    if (country) {
        return fromDate <= dataReport && toDate >= dataReport && singleRecord.countryterritoryCode === country;
    } else {
        return fromDate <= dataReport && toDate >= dataReport;
    }
};