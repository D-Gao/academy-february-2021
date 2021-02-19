export const getDatasetCasesWeeklyBarChart = (covidData, countryCode) => {
    const dataObj = {};

    covidData.map(singleRecord => {
        if (singleRecord.countryCode === countryCode) {
            if (singleRecord.yearWeek in dataObj) {
                dataObj[singleRecord.yearWeek] += singleRecord.casesWeekly;
            } else {
                dataObj[singleRecord.yearWeek] = singleRecord.casesWeekly;
            }
        }
        return null;
    });

    let labels = [];
    let data = [];

    Object.keys(dataObj).map(key => {
        labels.push(key);
        data.push(dataObj[key]);
        return null;
    })

    return [labels, data];
};

export const getDatasetDeathsWeeklyBarChart = (covidData, countryCode) => {
    const dataObj = {};

    covidData.map(singleRecord => {
        if (singleRecord.countryCode === countryCode) {
            if (singleRecord.yearWeek in dataObj) {
                dataObj[singleRecord.yearWeek] += singleRecord.deathsWeekly;
            } else {
                dataObj[singleRecord.yearWeek] = singleRecord.deathsWeekly;
            }
        }
        return null;
    });

    let labels = [];
    let data = [];

    Object.keys(dataObj).map(key => {
        labels.push(key);
        data.push(dataObj[key]);
        return null;
    })

    return [labels, data];
};

export const getDatasetAverageLineChart = (covidData, countryCode) => {
    const dataObj = {};

    covidData.map(singleRecord => {
        if (singleRecord.countryCode === countryCode) {
            if (singleRecord.yearWeek in dataObj) {
                dataObj[singleRecord.yearWeek] = (dataObj[singleRecord.yearWeek] + singleRecord['average']) / 2;
            } else {
                dataObj[singleRecord.yearWeek] = singleRecord['average'];
            }
        }
        return null;
    });

    let labels = [];
    let data = [];

    Object.keys(dataObj).map(key => {
        labels.push(key);
        data.push(dataObj[key]);
        return null;
    })

    return [labels, data];
};
