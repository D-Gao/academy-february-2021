from sqlalchemy import func
from sqlalchemy.orm import sessionmaker

from models.dbmodel import Casedistribution


class CaseDistributionRepository:
    def __init__(self, *, db_engine):
        self.db_engine = db_engine

    def get_case(self, case_id):
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        data = session.query(Casedistribution).get(case_id)
        return self.__get_case_dict(data)

    def get_cases(self, from_date, to_date, country):
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        query = session.query(Casedistribution)
        if country is not None:
            query = query.filter_by(CountryTerritoryCode=country)
        if from_date is not None:
            query = query.filter(Casedistribution.YearWeek >= from_date)
        if to_date is not None:
            query = query.filter(Casedistribution.YearWeek <= to_date)
        data = query.order_by(Casedistribution.YearWeek).all()
        result = [self.__get_case_dict(item) for item in data]
        return result


    def get_countries(self):
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        data = session.query(
            Casedistribution.CountryTerritoryCode,
            Casedistribution.CountriesAndTerritories
        ).distinct().all()
        result = [self.__get_country_dict(item) for item in data]
        return result


    def insert_case(self, case_data):
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        case = Casedistribution(
            YearWeek=case_data["yearWeek"],
            CasesWeekly=case_data["casesWeekly"],
            DeathsWeekly=case_data["deathsWeekly"],
            CountriesAndTerritories=case_data["countriesAndTerritories"],
            GeoId=case_data["geoId"],
            CountryTerritoryCode=case_data["countryTerritoryCode"],
            PopData2019=case_data["popData2019"],
            ContinentExp=case_data["continentExp"],
            NotificationRate=case_data["notificationRate"]
        )
        session.add(case)
        session.commit()
        return {
            "state": "Success",
            "message": "Case created successfully"
        }


    def update_case(self, case_data):
        # if "id" not in case_data:
        #     return {
        #         "state": "Failed",
        #         "message": "Missing case id"
        #     }
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        data = session.query(Casedistribution).get(case_data["id"])

        if data is None:
            return {
                "state": "Failed",
                "message": "Cannot find case with id " + str(case_data["id"])
            }

        data.YearWeek=case_data["yearWeek"]
        data.CasesWeekly=case_data["casesWeekly"]
        data.DeathsWeekly=case_data["deathsWeekly"]
        data.CountriesAndTerritories=case_data["countriesAndTerritories"]
        data.GeoId=case_data["geoId"]
        data.CountryTerritoryCode=case_data["countryTerritoryCode"]
        data.PopData2019=case_data["popData2019"]
        data.ContinentExp=case_data["continentExp"]
        data.NotificationRate=case_data["notificationRate"]

        session.commit()
        return {
            "state": "Success",
            "message": "Case updated successfully"
        }


    def delete_case(self, case_id):
        if case_id is None:
            return {
                "state": "Failed",
                "message": "Missing case id"
            }

        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        data = session.query(Casedistribution).get(case_id)
        session.delete(data)

        session.commit()
        return {
            "state": "Success",
            "message": "Case deleted successfully"
        }

    def get_cases_summary(self, from_date, to_date, country):
        session_factory = sessionmaker(bind=self.db_engine)
        session = session_factory()
        query = session.query(
            Casedistribution.CountryTerritoryCode,
            func.sum(Casedistribution.CasesWeekly).label("CasesWeeklySum"),
            func.sum(Casedistribution.DeathsWeekly).label("DeathsWeeklySum"))

        if country is not None:
            query = query.filter_by(CountryTerritoryCode=country)

        if from_date is not None:
            query = query.filter(Casedistribution.YearWeek >= from_date)

        if to_date is not None:
            query = query.filter(Casedistribution.YearWeek <= to_date)

        data = query.group_by(Casedistribution.CountryTerritoryCode).all()
        result = [self.__get_case_summary_dict(item) for item in data]
        return result


    def __get_case_dict(self, sql_alchemy_item):
        return {
            "id": sql_alchemy_item.Id,
            "yearWeek": sql_alchemy_item.YearWeek,
            "casesWeekly": sql_alchemy_item.CasesWeekly,
            "deathsWeekly": sql_alchemy_item.DeathsWeekly,
            "countryTerritoryCode": sql_alchemy_item.CountryTerritoryCode,
            "countriesAndTerritories": sql_alchemy_item.CountriesAndTerritories,
            "popData2019": sql_alchemy_item.PopData2019,
            "tsInsert": sql_alchemy_item.TsInsert,
            "tsUpdate": sql_alchemy_item.TsUpdate
        }


    def __get_country_dict(self, sql_alchemy_item):
        return {
            "countryTerritoryCode": sql_alchemy_item.CountryTerritoryCode,
            "countriesAndTerritories": sql_alchemy_item.CountriesAndTerritories
        }


    def __get_case_summary_dict(self, sql_alchemy_item):
        return {
            "countryTerritoryCode": sql_alchemy_item.CountryTerritoryCode,
            "casesWeeklySum": int(sql_alchemy_item.CasesWeeklySum),
            "deathsWeeklySum": int(sql_alchemy_item.DeathsWeeklySum)
        }
