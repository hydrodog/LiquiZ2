--log: log the information if anyone's grade has been changed

DROP TABLE IF EXISTS `LiquiZ`.`log` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`log` (
  `FirstName` VARCHAR(20) NOT NULL,
  `LastName` VARCHAR(20) NOT NULL,
  `UserID` INT NOT NULL,
  `QuizID` INT NOT NULL,
  `Date` DATETIME NOT NULL,
  `OldScore` DOUBLE NOT NULL,
  `NewScore` DOUBLE NOT NULL,
  `Change` DOUBLE NOT NULL,
  `Admin` VARCHAR(20)
  );
  
--gradingScheme: to define the grade scheme
  
DROP TABLE IF EXISTS `LiquiZ`.`gradingScheme` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`gradingScheme` (
  `Aplus` DOUBLE NOT NULL,
  `A` DOUBLE NOT NULL,
  `Aminus` DOUBLE NOT NULL,
  `Bplus` DOUBLE NOT NULL,
  `B` DOUBLE NOT NULL,
  `Bminus` DOUBLE NOT NULL,
  `Cplus` DOUBLE NOT NULL,
  `C` DOUBLE NOT NULL,
  `Cminus` DOUBLE NOT NULL,
  `Dplus` DOUBLE NOT NULL,
  `D` DOUBLE NOT NULL,
  `Dminus` DOUBLE NOT NULL,
  `F` DOUBLE NOT NULL
  );