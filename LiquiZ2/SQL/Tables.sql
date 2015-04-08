-- MySQL Script generated by MySQL Workbench
-- Wed Oct  1 15:51:35 2014
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema LiquiZ
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LiquiZ` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `LiquiZ` ;

-- -----------------------------------------------------
-- Table `LiquiZ`.`Policies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Policies` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Policies` (
  `PolID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Attempts` INT NOT NULL DEFAULT 1,
  `Timed` BIT(1) NOT NULL DEFAULT 0,
  `TimeLimit` INT NULL,
  `ShowAns` BIT(1) NOT NULL DEFAULT 0,
  `Scored` BIT(1) NOT NULL DEFAULT 1,
  `Grade` INT NOT NULL,
  `ShuffleQues` BIT(1) NOT NULL DEFAULT 0,
  `ShuffleAns` BIT(1) NOT NULL DEFAULT 0,
  `AccessCode` VARCHAR(255) NULL,
  PRIMARY KEY (`PolID`),
  UNIQUE INDEX `PolID_UNIQUE` (`PolID` ASC));


-- -----------------------------------------------------
-- Table `LiquiZ`.`DisplayElements`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`DisplayElements` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`DisplayElements` (
  `DispElID` INT NOT NULL AUTO_INCREMENT,
  `TextElement` VARCHAR(21000) NULL, -- text or source (name)
  `MediaID` INT NULL, 
  `DispType` CHAR(3) NOT NULL, -- txt or med
  PRIMARY KEY (`DispElID`));

-- -----------------------------------------------------
-- Table `LiquiZ`.`Media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Liquiz`.`Media` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Media` (
  `MediaID` INT NOT NULL AUTO_INCREMENT, 
  `OrigName` VARCHAR(255) NOT NULL,
  `Path` VARCHAR(21000) NOT NULL,
  `MediaType` CHAR(3) NOT NULL, -- img, aud, vid
  `Width` INT NULL,
  `Height` INT NULL,
  PRIMARY KEY (`MediaID`)
);


-- -----------------------------------------------------
-- Table `LiquiZ`.`Quizzes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Quizzes` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Quizzes` (
  `QuizID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `Desc` INT NULL,
  `PolID` INT NOT NULL, -- Policies.PolID
  `Privacy` CHAR(1) NOT NULL,
  PRIMARY KEY (`QuizID`),
  UNIQUE INDEX `QID_UNIQUE` (`QuizID` ASC));


-- -----------------------------------------------------
-- Table `LiquiZ`.`Questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Questions` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Questions` (
  `QuesID` INT NOT NULL AUTO_INCREMENT,
  `Points` INT NOT NULL,
  `Level` INT NULL,
  `QuesType` CHAR(4) NOT NULL,
  `Pattern` VARCHAR(10) NULL, -- for regex
  `LowBound` DOUBLE NULL COMMENT 'to accept a range of numbers (lower bound)',
  `HighBound` DOUBLE NULL COMMENT 'to accept a range of numbers (upper bound)',
  PRIMARY KEY (`QuesID`),
  UNIQUE INDEX `QuesID_UNIQUE` (`QuesID` ASC));


-- -----------------------------------------------------
-- Table `LiquiZ`.`Courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Courses` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Courses` (
  `CourseID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Privacy` CHAR(1) NOT NULL,
  PRIMARY KEY (`CourseID`),
  UNIQUE INDEX `CID_UNIQUE` (`CourseID` ASC));


-- -----------------------------------------------------
-- Table `LiquiZ`.`CoursesQuizzes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Courses_Quizzes` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Courses_Quizzes` (
  `CourseID` INT NULL, -- Courses.CourseID
  `QuizID` INT NULL, -- Quizzes.QuizID
  `Sequence` INT NULL);


-- -----------------------------------------------------
-- Table `LiquiZ`.`QuesCon`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`QuesCon` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`QuesCon` (
  `QuesConID` INT NOT NULL AUTO_INCREMENT,
  `QuesConName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`QuesConID`)
  );


-- -----------------------------------------------------
-- Table `LiquiZ`.`QuizzesQuesCons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Quizzes_QuesCons` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Quizzes_QuesCons` (
  `QuizID` INT NOT NULL, -- Quizzes.QuizID
  `QuesConID` INT NOT NULL, -- QuesCon.QuesConID
  `Sequence` INT NOT NULL);


-- -----------------------------------------------------
-- Table `LiquiZ`.`QuesConElements`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`QuesConElements` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`QuesConElements` (
  `QuesConID` INT NOT NULL, -- QuesCon.QuesConID
  `Sequence` INT NOT NULL,
  `DispElID` INT NULL, -- DisplayElements.DispElID
  `QuesID` INT NULL, -- Questions.QuesID
  `Type` CHAR(4) NOT NULL); -- disp or ques


-- -----------------------------------------------------
-- Table `LiquiZ`.`Answers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Answers` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Answers` (
  `AnsID` INT NOT NULL AUTO_INCREMENT,
  `Response` INT NULL, -- DisplayElements.DispElID
  `DispElID` INT NOT NULL COMMENT 'The DispEl that represents the answer', -- DisplayElements.DispElID
  PRIMARY KEY (`AnsID`));


-- -----------------------------------------------------
-- Table `LiquiZ`.`StdSet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`StdSet` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`StdSet` (
  `StdSetID`  INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`StdSetId`));


-- -----------------------------------------------------
-- Table `LiquiZ`.`StdChoices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`StdChoices` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`StdChoices` (
  `StdSetID` INT NOT NULL, -- StdSet.StdSetID
  `Answer` INT NOT NULL, -- Answers.AnsID
  `Sequence` INT NOT NULL);


-- -----------------------------------------------------
-- Table `LiquiZ`.`QuesAnsSeq`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Ques_Ans` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Ques_Ans` (
  `QuesID` INT NOT NULL,
  `AnsID` INT NULL,
  `Sequence` INT NULL,
  `Correct` BIT(1) NULL, -- 0/1 for Ans
  `StdSetID` VARCHAR(255) NULL,
  `StdCorrectIndex` INT NULL -- Index of correct answer
);


-- -----------------------------------------------------
-- Table `LiquiZ`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`Users` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Username` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`UserID`));


-- -----------------------------------------------------
-- Table `LiquiZ`.`UserPermissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`UserPermissions` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`UserPermissions` (
  `UserID` INT NOT NULL,
  `Entity` INT NULL COMMENT 'Course or Quiz... other Users?',
  `EType` CHAR(4) NULL COMMENT 'Course or Quiz... other Users?',
  `Permissions` INT NULL COMMENT 'each bit represents a permission');


-- -----------------------------------------------------
-- Table `LiquiZ`.`StudentResponses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`StudentResponses` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`StudentResponses` (
  `Student` INT NOT NULL,
  `Ques` INT NOT NULL,
  `Response` INT NOT NULL,
  `Correct` BIT(1) NULL);


-- -----------------------------------------------------
-- Table `LiquiZ`.`StudentQuizScores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`StudentQuizScores` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`StudentQuizScores` (
  `Student` INT NOT NULL,
  `Quiz` INT NOT NULL,
  `Score` INT NOT NULL);


-- -----------------------------------------------------
-- Table `LiquiZ`.`StudentGrades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`StudentGrades` ;

CREATE TABLE IF NOT EXISTS `LiquiZ`.`StudentGrades` (
  `Student` INT NOT NULL,
  `Course` INT NOT NULL,
  `Grade` DOUBLE NOT NULL);

DROP TABLE IF EXISTS `LiquiZ`.`ViewAnsToQues` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuiz` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWAns` ;
DROP VIEW IF EXISTS `LiquiZ`.`ViewAnsToQues` ;
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuiz` ;
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuizWAns` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
