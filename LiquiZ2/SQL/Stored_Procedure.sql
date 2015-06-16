-- UpdateLog: retrieve the old score from StudentQuizScore and update it with timestamp in 'log' table  
-- related table: log, StudentQuizScores, Users
USE `liquiz`;
DROP procedure IF EXISTS `UpdateLog`;

DELIMITER $$
USE `liquiz`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLog`(IN uid int, IN qid int, IN newscore double, In admin varchar(20))
BEGIN
DECLARE oldscore double;
DECLARE fName varchar(20);
DECLARE lName varchar(20);
select score into oldscore from `liquiz`.`studentquizscores`  
where UserID = uid and QuizID = qid;

select firstname, lastname into fName, lName from `liquiz`.`users`  
where UserID = uid;

INSERT INTO log VALUES (fname, lname, uid, qid, NOW(), oldscore, newscore, newscore-oldscore, admin);

update `liquiz`.`studentquizscores`  
set score = newscore
where userid = uid and quizid = qid;
END$$

DELIMITER ;

--InsertGradingScheme: update/insert the grade scheme in the table gradingScheme
--related table: gradingScheme
USE `liquiz`;
DROP procedure IF EXISTS `InsertGradingScheme`;

DELIMITER $$
USE `liquiz`$$
CREATE PROCEDURE `InsertGradingScheme` (newCourse INT, newTerm varchar(20), newScore INT, newGrade varchar(2))
BEGIN
	IF EXISTS(SELECT * FROM gradingScheme WHERE newCourse = course and newterm = term and newGrade = grade) THEN
		update gradingScheme set score = newScore
		where newCourse = course and newterm = term and newGrade = grade;
	ELSE 
		Insert into gradingScheme values (newCourse, newTerm, newScore, newGrade);
    END IF;	
END
$$

DELIMITER ;

