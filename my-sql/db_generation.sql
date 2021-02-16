DROP DATABASE IF EXISTS `academy`;

CREATE DATABASE `academy` /*!40100 DEFAULT CHARACTER SET latin1 */;


DROP TABLE IF EXISTS  `academy`.`casedistribution`;
CREATE TABLE  `academy`.`casedistribution` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `YearWeek` datetime DEFAULT NULL,
  `CasesWeekly` int(11) DEFAULT NULL,
  `DeathsWeekly` int(11) DEFAULT NULL,
  `CountriesAndTerritories` varchar(45) DEFAULT NULL,
  `GeoId` varchar(45) DEFAULT NULL,
  `CountryTerritoryCode` varchar(45) DEFAULT NULL,
  `PopData2019` bigint(20) DEFAULT NULL,
  `ContinentExp` varchar(45) DEFAULT NULL,
  `NotificationRate` decimal(18,3) DEFAULT NULL,
  `TsInsert` datetime DEFAULT CURRENT_TIMESTAMP,
  `TsUpdate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;