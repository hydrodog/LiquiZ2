USE `LiquiZ` ;

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewAnsToQues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`ViewAnsToQues` ;
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewAnsToQues` (`Ques` INT, `Ans` INT, `StdChoice` INT, `Correct` BIT(1));

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewCAnsToQues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`ViewCAnsToQues` ;
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewCAnsToQues` (`Ques` INT, `Ans` INT, `StdChoice` INT);

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewQuiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuiz` ;
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewQuiz` (`Quiz` INT, `QuesCon` INT, `QuesID` INT, `QType` INT, `Element` INT);

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewQuizWCAns`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWCAns` ;
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewQuizWCAns` (`Quiz` INT, `QuesCon` INT, `DispEl` INT, `Element` INT, `QuesID` INT, `Points` INT, `AnsID` INT);

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewQuizWAns`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWAns` ;
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewQuizWAns` (`Quiz` INT, `QuesCon` INT, `DispEl` INT, `Element` INT, `QuesID` INT, `Points` INT, `AnsID` INT, `Correct` BIT(1));


-- -----------------------------------------------------
-- View possible Answers to Questions
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewAnsToQues` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewAnsToQues`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewAnsToQues` AS 
SELECT Ques, Ans, StdChoice, Correct
FROM QuesAnsSeq
ORDER BY Sequence ASC;

-- -----------------------------------------------------
-- View Correct Answers to Questions
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewCAnsToQues` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewCAnsToQues`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewCAnsToQues` AS 
SELECT * from ViewAnsToQues
WHERE Correct=1;


-- -----------------------------------------------------
-- View QuesCon
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuesCon` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuesCon`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuesCon` AS 
SELECT QuesConElements.QuesCon, DisplayElements.DispElID, DisplayElements.Element, Questions.QuesID, Questions.QType, Questions.Points, Questions.Level
FROM QuesConElements
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN DisplayElements ON QuesConElements.Element = DisplayElements.DispElID
ORDER BY QuesConElements.QuesCon, QuesConElements.Sequence ASC;
-- QuesCon | DispElID | Element | QuesID | QType | Points | Level


-- -----------------------------------------------------
-- View QuesConWAns
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuesConWAns` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuesConWAns`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuesConWAns` AS 
SELECT QuesConElements.QuesCon, QuesConElements.Type, DisplayElements.DispElID, DisplayElements.Element, DisplayElements.DispType, Questions.QuesID, Questions.QType, Questions.Points, Questions.Level, Answers.AnsID, QuesAnsSeq.Correct
FROM QuesConElements
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN QuesAnsSeq ON Questions.QuesID = QuesAnsSeq.Ques
LEFT JOIN Answers ON QuesAnsSeq.Ans = Answers.AnsID
LEFT JOIN StdChoices ON QuesAnsSeq.StdChoice = StdChoices.StdSetID
LEFT JOIN DisplayElements ON QuesConElements.Element = DisplayElements.DispElID OR Answers.Element = DisplayElements.DispElID OR Answers.Response = DisplayElements.DispElID
ORDER BY QuesConElements.QuesCon, QuesConElements.Sequence, QuesAnsSeq.Sequence ASC;
-- QuesCon | Type | DispElID | Element | DispType | QuesID | QType | Points | Level | AnsID | Correct

-- -----------------------------------------------------
-- View Quiz
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuiz` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuiz`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuiz` AS 
SELECT QuizzesQuesCons.Quiz, QuizzesQuesCons.QuesCon, DisplayElements.DispElID, DisplayElements.Element, Questions.QuesID, Questions.QType, Questions.Points, Questions.Level
FROM QuizzesQuesCons
LEFT JOIN QuesConElements ON QuizzesQuesCons.QuesCon = QuesConElements.QuesCon
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN DisplayElements ON QuesConElements.Element = DisplayElements.DispElID
ORDER BY QuizzesQuesCons.Sequence, QuesConElements.Sequence ASC;
-- Quiz | QuesCon | DispElID | Element | QuesID | QType | Points | Level


-- -----------------------------------------------------
-- View Quiz with all possible Answers
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuizWAns` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWAns`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuizWAns` AS 
SELECT QuizzesQuesCons.Quiz, QuizzesQuesCons.QuesCon, DisplayElements.DispElID, DisplayElements.Element, Questions.QuesID, Questions.QType, Questions.Points, Questions.Level, Answers.AnsID, QuesAnsSeq.Correct
FROM QuizzesQuesCons
LEFT JOIN QuesConElements ON QuizzesQuesCons.QuesCon = QuesConElements.QuesCon
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN QuesAnsSeq ON Questions.QuesID = QuesAnsSeq.Ques
LEFT JOIN Answers ON QuesAnsSeq.Ans = Answers.AnsID
LEFT JOIN StdChoices ON QuesAnsSeq.StdChoice = StdChoices.StdSetID
LEFT JOIN DisplayElements ON QuesConElements.Element = DisplayElements.DispElID OR Answers.Element = DisplayElements.DispElID OR Answers.Response = DisplayElements.DispElID
ORDER BY QuizzesQuesCons.Sequence, QuesConElements.Sequence ASC;
-- Quiz | QuesCon | DispElID | Element | QuesID | QType | Points | Level | AnsID | Correct


-- -----------------------------------------------------
-- View Quiz with Correct Answers only
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuizWCAns` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWCAns`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuizWCAns` AS 
SELECT * FROM ViewQuizWAns
WHERE Correct IS NULL OR Correct=1;

