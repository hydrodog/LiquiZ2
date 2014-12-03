USE `LiquiZ` ;
DELETE FROM Answers;
DELETE FROM Courses;
DELETE FROM CoursesQuizzes; 
DELETE FROM DispElSeq;
DELETE FROM DisplayElements;
DELETE FROM Policies;
DELETE FROM QuesAnsSeq;
DELETE FROM QuesCon; 
DELETE FROM QuesConElements;
DELETE FROM Questions;
DELETE FROM Quizzes;
DELETE FROM QuizzesQuesCons;
DELETE FROM Responses;
DELETE FROM StdChoices;
DELETE FROM StdSet;
DELETE FROM StudentGrades; 
DELETE FROM StudentGradesOnQuizzes; 
DELETE FROM StudentResponses; 
DELETE FROM UserPermissions;
DELETE FROM Users;

INSERT INTO Users
VALUES (1, "Yijin", "Kang", "yijkan", "password", "yijinkang@gmail.com");

INSERT INTO Courses
VALUES (1, "Intro Java", "a");

INSERT INTO Policies (PolID, Name, Timed, ShowAns, Scored, Grade, ShuffleQues, ShuffleAns)
VALUES (1, "Homework", 0, 1, 0, 10, 0, 0);

INSERT INTO Quizzes (QuizID, Name, Policy, Privacy)
VALUES (1, "ThisIsAQuiz", 1, "a");

INSERT INTO CoursesQuizzes
VALUES (1, 1, 1);

-- Elements to go into first qc
INSERT INTO DisplayElements
VALUES (1, "text");
INSERT INTO DispElSeq
VALUES (1, "What is the color of the sky?", 1);
INSERT INTO DispElSeq
VALUES (1, "Example of longer text", 2);

INSERT INTO Questions
VALUES (1, 3, 1, "Fill");
INSERT INTO DisplayElements
VALUES(2, "text");
INSERT INTO DispElSeq
VALUES (2, "Blue", 1);
INSERT INTO Answers (AnsID, Element)
VALUES (1, 2);
INSERT INTO DisplayElements
VALUES (3, "text");
INSERT INTO DispElSeq
VALUES (3, "Light Blue", 1);
INSERT INTO Answers (AnsID, Element)
VALUES (2, 3);

-- Connect questions to answers
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 1, 1, 1);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 2, 2, 1);

-- Add DispEls and Questions to qc
INSERT INTO QuesCon
VALUES (1);
INSERT INTO QuesConElements (QuesCon, Sequence, Element, Type)
VALUES (1, 1, 1, "Elem");
INSERT INTO QuesConElements (QuesCon, Sequence, Ques, Type)
VALUES (1, 2, 1, "Ques");

-- Elements to go into second qc
INSERT INTO QuesCon
VALUES (2);
INSERT INTO DisplayElements
VALUES (4, "img");
INSERT INTO DispElSeq
VALUES (4, "image.jpg", 1);
INSERT INTO DisplayElements
VALUES (5, "text");
INSERT INTO DispElSeq
VALUES (5, "Which animal is shown in the picture?", 1);

INSERT INTO Questions
VALUES (2, 5, 2, "Mult");
INSERT INTO DisplayElements
VALUES (6, "text");
INSERT INTO DispElSeq
VALUES (6, "Dog", 1);
INSERT INTO Answers(AnsID, Element)
VALUES (3, 6);
INSERT INTO DisplayElements
VALUES (7, "text");
INSERT INTO DispElSeq
VALUES (7, "Cat", 1);
INSERT INTO Answers(AnsID, Element)
VALUES (4, 7);
INSERT INTO DisplayElements
VALUES (8, "text");
INSERT INTO DispElSeq
VALUES (8, "Dragon", 1);
INSERT INTO Answers(AnsID, Element)
VALUES (5, 8);

INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 3, 1, 0);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 4, 2, 1);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 5, 3, 0);

INSERT INTO QuesConElements (QuesCon, Sequence, Element, Type)
VALUES (2, 1, 4, "Elem");
INSERT INTO QuesConElements (QuesCon, Sequence, Element, Type)
VALUES (2, 2, 5, "Elem");
INSERT INTO QuesConElements (QuesCon, Sequence, Ques, Type)
VALUES (2, 3, 2, "Ques");

-- Connect QuesCons to Quiz
INSERT INTO QuizzesQuesCons
VALUES (1, 1, 1);
INSERT INTO QuizzesQuesCons
VALUES (1, 2, 2);

-- Yijin Kang has admin permissions over Quiz 1
INSERT INTO UserPermissions
VALUES (1, 1, "Quiz", 1);

-- StdChoices: Poll
INSERT INTO StdSet
VALUES(1, "Poll");

INSERT INTO DisplayElements
VALUES(9, "text");
INSERT INTO DispElSeq
VALUES(9, "Strongly Agree", 1);
INSERT INTO StdChoices
VALUES(1, 9, 1);

INSERT INTO DisplayElements
VALUES(10, "text");
INSERT INTO DispElSeq
VALUES(10, "Agree", 1);
INSERT INTO StdChoices
VALUES(1, 10, 2);

INSERT INTO DisplayElements
VALUES(11, "text");
INSERT INTO DispElSeq
VALUES(11, "No Opinion", 1);
INSERT INTO StdChoices
VALUES(1, 11, 3);

INSERT INTO DisplayElements
VALUES(12, "text");
INSERT INTO DispElSeq
VALUES(12, "Disagree", 1);
INSERT INTO StdChoices
VALUES(1, 12, 4);

INSERT INTO DisplayElements
VALUES(13, "text");
INSERT INTO DispElSeq
VALUES(13, "Strongly Disagree", 1);
INSERT INTO StdChoices
VALUES(1, 13, 5);

-- StdChoices: Complexity
INSERT INTO StdSet
VALUES(2, "Complexity");

INSERT INTO DisplayElements
VALUES(14, "text");
INSERT INTO DispElSeq
VALUES(14, "O(1)", 1);
INSERT INTO StdChoices
VALUES(2, 14, 1);

INSERT INTO DisplayElements
VALUES(15, "text");
INSERT INTO DispElSeq
VALUES(15, "O(n)", 1);
INSERT INTO StdChoices
VALUES(2, 15, 2);

INSERT INTO DisplayElements
VALUES(16, "text");
INSERT INTO DispElSeq
VALUES(16, "O(n^2)", 1);
INSERT INTO StdChoices
VALUES(2, 16, 3);

INSERT INTO DisplayElements
VALUES(17, "text");
INSERT INTO DispElSeq
VALUES(17, "O(n^3)", 1);
INSERT INTO StdChoices
VALUES(2, 17, 4);

INSERT INTO DisplayElements
VALUES(18, "text");
INSERT INTO DispElSeq
VALUES(18, "O(n logn)", 1);
INSERT INTO StdChoices
VALUES(2, 18, 5);

-- StdChoices: Colors
INSERT INTO StdSet
VALUES(3, "Colors");

INSERT INTO DisplayElements
VALUES(19, "text");
INSERT INTO DispElSeq
VALUES(19, "Blue", 1);
INSERT INTO StdChoices
VALUES(3, 19, 1);

INSERT INTO DisplayElements
VALUES(20, "text");
INSERT INTO DispElSeq
VALUES(20, "Red", 1);
INSERT INTO StdChoices
VALUES(3, 20, 2);

INSERT INTO DisplayElements
VALUES(21, "text");
INSERT INTO DispElSeq
VALUES(21, "Green", 1);
INSERT INTO StdChoices
VALUES(3, 21, 3);

INSERT INTO DisplayElements
VALUES(22, "text");
INSERT INTO DispElSeq
VALUES(22, "Orange", 1);
INSERT INTO StdChoices
VALUES(3, 22, 4);

INSERT INTO DisplayElements
VALUES(23, "text");
INSERT INTO DispElSeq
VALUES(23, "Purple", 1);
INSERT INTO StdChoices
VALUES(3, 23, 5);

-- Student A has taken the quiz
INSERT INTO Users
VALUES (2, "A", "A", "aa", "password", "abcd@gmail.com");

INSERT INTO Responses
VALUES (1, 24);
INSERT INTO DisplayElements
VALUES (24, "text");
INSERT INTO DispElSeq
VALUES (24, "Blue", 1);
INSERT INTO StudentResponses
VALUES (2, 1, 1, 1);

INSERT INTO Responses
VALUES (2, 25);
INSERT INTO DisplayElements
VALUES (25, "text");
INSERT INTO DispElSeq
VALUES (25, "Cat", 1);
INSERT INTO StudentResponses
VALUES (2, 2, 2, 1);

INSERT INTO StudentGradesOnQuizzes
VALUES (1, 1, 100);

INSERT INTO StudentGrades
VALUES (1, 100);