# coding: utf-8
from sqlalchemy import Column, DECIMAL, DateTime, String, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Casedistribution(Base):
    __tablename__ = 'casedistribution'

    Id = Column(INTEGER(11), primary_key=True)
    YearWeek = Column(DateTime)
    CasesWeekly = Column(INTEGER(11))
    DeathsWeekly = Column(INTEGER(11))
    CountriesAndTerritories = Column(String(45))
    GeoId = Column(String(45))
    CountryTerritoryCode = Column(String(45))
    PopData2019 = Column(BIGINT(20))
    ContinentExp = Column(String(45))
    NotificationRate = Column(DECIMAL(18, 3))
    TsInsert = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    TsUpdate = Column(DateTime)
