USE `liquiz`;
DROP function IF EXISTS `gradeScheme`;

DELIMITER $$
USE `liquiz`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `gradeScheme`(studentScore double, studentCourse INT) RETURNS varchar(2) CHARSET latin1
BEGIN
	declare result varchar(2);
	select grade into result from gradingScheme
    where studentScore >= score && studentCourse = course
    order by score DESC
    LIMIT 1;
RETURN result;
END$$

DELIMITER ;