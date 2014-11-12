USE `LiquiZ` ;

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewAnsToQues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewAnsToQues` (`Ques` INT, `GROUP_CONCAT(Ans)` INT, `GROUP_CONCAT(StdChoice)` INT, `Sequence` INT);

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewQuiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewQuiz` (`QuesCon` INT, `QuesID` INT, `Element` INT);

-- -----------------------------------------------------
-- Placeholder table for view `LiquiZ`.`ViewQuizWAns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LiquiZ`.`ViewQuizWAns` (`QuesCon` INT, `Element` INT, `QuesID` INT, `Points` INT, `AnsID` INT);

-- -----------------------------------------------------
-- View `LiquiZ`.`ViewAnsToQues`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewAnsToQues` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewAnsToQues`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewAnsToQues` AS 
SELECT Ques, GROUP_CONCAT(Ans), GROUP_CONCAT(StdChoice), Sequence
FROM QuesAnsSeq
WHERE Correct="Y"
;

-- -----------------------------------------------------
-- View `LiquiZ`.`ViewQuiz`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuiz` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuiz`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuiz` AS
SELECT QuizzesQuesCons.Quiz, QuizzesQuesCons.QuesCon, Questions.QuesID, Questions.QType, DispElSeq.Element, DispElSeq.Type
FROM QuizzesQuesCons
LEFT JOIN QuesConElements ON QuizzesQuesCons.QuesCon = QuesConElements.QuesCon
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN DispElSeq ON QuesConElements.Element = DispElSeq.DispEl
ORDER BY QuizzesQuesCons.Sequence, QuesConElements.Sequence, DispElSeq.Sequence ASC;

-- -----------------------------------------------------
-- View `LiquiZ`.`ViewQuizWAns`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `LiquiZ`.`ViewQuizWAns` ;
DROP TABLE IF EXISTS `LiquiZ`.`ViewQuizWAns`;
USE `LiquiZ`;
CREATE  OR REPLACE VIEW `ViewQuizWAns` AS
SELECT QuizzesQuesCons.Quiz, QuizzesQuesCons.QuesCon, DispElSeq.Element, DispElSeq.Type, Questions.QuesID, Questions.Points, Answers.AnsID
FROM QuizzesQuesCons
LEFT JOIN QuesConElements ON QuizzesQuesCons.QuesCon = QuesConElements.QuesCon
LEFT JOIN Questions ON QuesConElements.Ques = Questions.QuesID
LEFT JOIN QuesAnsSeq ON Questions.QuesID = QuesAnsSeq.Ques
LEFT JOIN Answers ON QuesAnsSeq.Ans = Answers.AnsID AND QuesAnsSeq.Correct="Y"
LEFT JOIN StdChoices ON QuesAnsSeq.StdChoice = StdChoices.StdChID AND QuesAnsSeq.Correct="Y"
LEFT JOIN DispElSeq ON QuesConElements.Element = DispElSeq.DispEl AND Answers.Element = DispElSeq.DispEl AND Answers.Response = DispElSeq.DispEl
ORDER BY QuizzesQuesCons.Sequence, QuesConElements.Sequence, DispElSeq.Sequence ASC;
