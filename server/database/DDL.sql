-- Events Manager - Final Project CS340
-- Richard Oluyole and Matthew Devery
-- This script creates the schema for the Events Manager

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users`(
	`UserId` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(50),
    `Email` varchar(50),
    PRIMARY KEY (`UserId`)
);

-- create Events Table
DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events`(
	`EventId` int  NOT NULL AUTO_INCREMENT,
    `Time` DATETIME NOT NULL,
    `Description` text NOT NULL,
    `Cost` decimal(18,2),
    `LocationId` int ,
	PRIMARY KEY (`EventId`),
    FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`LocationId`)
);


-- create UserEvents table which intersects Users and Events
DROP TABLE IF EXISTS `UserEvents`;
CREATE TABLE `UserEvents`(
	`UserId` int NOT NULL,
    `EventId` int NOT NULL,
    PRIMARY KEY (`UserId`, `EventId`),
    FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserId`),
    FOREIGN KEY (`EventId`) REFERENCES `Events`(`EventId`) ON DELETE CASCADE
);

-- creates Locations tables that stores all possible known locations for any event added
DROP TABLE IF EXISTS `Locations`;
CREATE TABLE `Locations`(
	`LocationId` int AUTO_INCREMENT,
    `StreetAddress` varchar(50) NOT NULL,
    `City` varchar(50) NOT NULL,
    `PostalCode` int,
    `Country` varchar(50),
    PRIMARY KEY (`LocationId`)
);

-- creates a categories table to classify events under
DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories`(
	`CategoryId` int not null AUTO_INCREMENT,
    `CategoryName` varchar(50),
    `Description` varchar(50),
    PRIMARY KEY (`CategoryId`)
);

-- creates Events Categories intersection tables so Events may be looked up by category
DROP TABLE IF EXISTS `EventCategories`;
CREATE TABLE `EventCategories`(
	`EventId` int NOT NULL,
	`CategoryId` int NOT NULL,
    PRIMARY KEY (`EventId`,`CategoryId`),
    FOREIGN KEY (`EventId`) REFERENCES `Events`(`EventId`) ON DELETE CASCADE,
    FOREIGN KEY (`CategoryId`) REFERENCES `Categories`(`CategoryId`)
);


-- sample inserts of new locatiosn
INSERT INTO `Locations`(`StreetAddress`,`City`,`PostalCode`,`Country`) VALUES
("111 Local Street","Eugene",11111,"United States"),
("101 Event Street","Springfield",11010,"United States"),
("000 Nowhere Road","Corvallis",10000,"United States"),
("60025 Bollinger Canyon Road","San Ramon",94583,"United States");

-- sample creations of new categories
INSERT INTO `Categories`(`CategoryName`,`Description`) VALUES
("Indoor","Events that take place within a building"),
("Tournament","Events that involve a tournament style format"),
("Chess","Events centered around the board game chess"),
("Wedding","Events centered around a wedding"),
("Concert","Events centered around musical concerts"),
("Festival","Festival style events "),
("Outdoor","Events that take place largely outdoors");


-- sample creation of new users
INSERT INTO `Users` (`Name`, `Email`)VALUES
("Abbie Cooper", "abbie.cooper@example.com"),
("Hans Dressler", "hans.dressler@example.com"),
("Lila Blanchard", "lila.blanchard@example.com"),
("Christina Campbell", "christina.campbell@example.com"),
("Guerete Fernandes", "guerete.fernandez@example.com");

-- sample creation of a new event
INSERT INTO `Events` (`Time`, `Description`, `Cost`, `LocationId`)
Values ("2023-08-18 1:00:00", "Bridal Party for Abbie", 17.93, 1),
("2023-06-22 16:58:00", "Rolling Stones Concert", 37.97, 2),
("2023-06-07 16:17:00", "Sunset Film Festival", 23.84, 3),
("2023-02-06 06:06:00", "Live Band Karaoke", 39.73, 2),
("2023-11-08 08:00:00", "Abbie's Wedding", 2.60, 1);

-- sample inserts used to link a single user to multiple events 
INSERT INTO `UserEvents`(`UserId`, `EventId`) VALUES
(1, 1),
(1, 5),
(3, 1),
(4, 3),
(2, 3);

-- sample inserts that demonstrate linking a single event to multiple categories
INSERT INTO `EventCategories`(`EventId`,`CategoryId`) VALUES
(2,5),
(2,7),
(5,4);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;


