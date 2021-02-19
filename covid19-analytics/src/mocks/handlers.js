import {rest} from 'msw'
import {covidData} from "../assets/covid-data";
import _ from "lodash";
import {filterCovidData} from "../assets/utils/utils";
import {formatDate} from "../assets/utils/constant";
import moment from "moment";

export const handlers = [
    rest.get("/cases", (req, res, ctx) => getCases(req, res, ctx)),
    rest.get("/countries", (req, res, ctx) => getCountries(req, res, ctx)),
    rest.get("/case-summary", (req, res, ctx) => getSummary(req, res, ctx)),
    rest.post("/case", (req, res, ctx) => postCase(req, res, ctx)),
    /*
    rest.put("/case", null),
    rest.delete("/case", null),
    */
];

const getCases = (request, response, context) => {
    const from = request.url.searchParams.get('from');
    const to = request.url.searchParams.get('to');
    const country = request.url.searchParams.get('country');
    let data = [];

    if (from && to) {
        if (country) {
            data = _.filter(covidData, singleRecord => filterCovidData(singleRecord, from, to, country));
        } else {
            data = _.filter(covidData, singleRecord => filterCovidData(singleRecord, from, to, null));
        }

        let responseData = data.map(singleRecord => ({
            "dateRep": moment(singleRecord.dateRep, formatDate.ddMMYYYY, true),
            "dateRepString": singleRecord.dateRep,
            "yearWeek": singleRecord.year_week,
            "casesWeekly": singleRecord.cases_weekly,
            "deathsWeekly": singleRecord.deaths_weekly,
            "country": singleRecord.countriesAndTerritories,
            "countryCode": singleRecord.countryterritoryCode,
            "continent": singleRecord.continentExp,
            "average": parseFloat(singleRecord["notification_rate_per_100000_population_14-days"])
        }));

        responseData = _.orderBy(responseData, ['dateRep'], ['asc']);

        return response(context.delay(3000), context.status(200), context.json(responseData));
    } else {
        return response(context.delay(3000), context.status(400));
    }
};

const postCase = (request, response, context) => {
    const { weeklyCases, weeklyDeaths, country, countryCode, continent, notificationRate } = request.body;
    let dateRep = moment();
    const dateRepString = dateRep.format(formatDate.ddMMYYYY);
    const yearWeek = dateRep.format(formatDate.YYYYMM);

    if (weeklyCases && weeklyDeaths && country && countryCode && continent && notificationRate) {
        covidData.push({
            dateRep: dateRepString,
            year_week: yearWeek,
            cases_weekly: weeklyCases,
            deaths_weekly: weeklyDeaths,
            countriesAndTerritories: country,
            geoId: null,
            countryterritoryCode: countryCode,
            popData2019: null,
            continentExp: continent,
            "notification_rate_per_100000_population_14-days": notificationRate
        });
        return response(context.delay(3000), context.status(201));
    } else {
        return response(context.delay(3000), context.status(400));
    }
};

const getCountries = (request, response, context) => {
    const responseData = _.uniqBy(covidData, 'countryterritoryCode').map(dayData => ({
        country: dayData.countriesAndTerritories,
        code: dayData.countryterritoryCode,
        continent: dayData.continentExp
    }));

    return response(context.delay(3000), context.status(200), context.json(responseData));
};

const getSummary = (request, response, context) => {
    const responseData = [];
    covidData.map(singleRecord => {
        const index = _.findIndex(responseData, (obj) => obj.countryCode === singleRecord.countryterritoryCode);

        if (index >= 0) {
            responseData[index] = {
                "country": responseData[index].country,
                "countryCode": responseData[index].countryCode,
                "continent": responseData[index].continent,
                "totalCase": responseData[index].totalCase + singleRecord.cases_weekly,
                "totalDeaths": responseData[index].totalDeaths + singleRecord.deaths_weekly
            };
        } else {
            responseData.push({
                "totalCase": singleRecord.cases_weekly,
                "totalDeaths": singleRecord.deaths_weekly,
                "country": singleRecord.countriesAndTerritories,
                "countryCode": singleRecord.countryterritoryCode,
                "continent": singleRecord.continentExp
            })
        }
    });

    return response(context.delay(3000), context.status(200), context.json(responseData));
}