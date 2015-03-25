USE `LiquiZ` ;
DELETE FROM Answers;
DELETE FROM Courses;
DELETE FROM CoursesQuizzes; 
DELETE FROM DisplayElements;
DELETE FROM Policies;
DELETE FROM QuesAnsSeq;
DELETE FROM QuesCon; 
DELETE FROM QuesConElements;
DELETE FROM Questions;
DELETE FROM Quizzes;
DELETE FROM QuizzesQuesCons;
DELETE FROM StdChoices;
DELETE FROM StdSet;
DELETE FROM StudentGrades; 
DELETE FROM StudentQuizScores; 
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
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (1, "What is the color of the sky?", "text");

INSERT INTO Questions
VALUES (1, 3, 1, "Fill");
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(2, "Blue", "text");
INSERT INTO Answers (AnsID, Element)
VALUES (1, 2);
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (3, "Light Blue", "text");
INSERT INTO Answers (AnsID, Element)
VALUES (2, 3);

-- Connect questions to answers
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 1, 1, 1);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 2, 2, 1);

-- Add DispEls and Questions to qc
INSERT INTO QuesCon
VALUES (1, "The Sky");
INSERT INTO QuesConElements (QuesCon, Sequence, Element, Type)
VALUES (1, 1, 1, "Elem");
INSERT INTO QuesConElements (QuesCon, Sequence, Ques, Type)
VALUES (1, 2, 1, "Ques");

-- Elements to go into second qc
INSERT INTO QuesCon
VALUES (2, "Animal Identification");
INSERT INTO DisplayElements
VALUES (4, "image.jpg", "img", 600, 480);
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (5, "Which animal is shown in the picture?", "text");

INSERT INTO Questions
VALUES (2, 5, 2, "Mult");
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (6, "Dog", "text");
INSERT INTO Answers(AnsID, Element)
VALUES (3, 6);
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (7, "Cat", "text");
INSERT INTO Answers(AnsID, Element)
VALUES (4, 7);
INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (8, "Dragon", "text");
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

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(9, "Strongly Agree", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(6, 9);
INSERT INTO StdChoices
VALUES(1, 6, 1);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(10, "Agree", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(7, 10);
INSERT INTO StdChoices
VALUES(1, 7, 2);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(11, "No Opinion", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(8, 11);
INSERT INTO StdChoices
VALUES(1, 8, 3);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(12, "Disagree", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(9, 12);
INSERT INTO StdChoices
VALUES(1, 9, 4);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(13, "Strongly Disagree", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(10, 13);
INSERT INTO StdChoices
VALUES(1, 10, 5);

-- StdChoices: Complexity
INSERT INTO StdSet
VALUES(2, "Complexity");

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(14, "O(1)", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(11, 14);
INSERT INTO StdChoices
VALUES(2, 11, 1);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(15, "O(n)", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(12, 15);
INSERT INTO StdChoices
VALUES(2, 12, 2);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(16, "O(n^2)", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(13, 16);
INSERT INTO StdChoices
VALUES(2, 13, 3);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(17, "O(n^3)", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(14, 17);
INSERT INTO StdChoices
VALUES(2, 14, 4);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(18, "O(n logn)", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(15, 18);
INSERT INTO StdChoices
VALUES(2, 15, 5);

-- StdChoices: Colors
INSERT INTO StdSet
VALUES(3, "Colors");

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(19, "Blue", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(16, 19);
INSERT INTO StdChoices
VALUES(3, 16, 1);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(20, "Red", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(17, 20);
INSERT INTO StdChoices
VALUES(3, 17, 2);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(21, "Green", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(18, 21);
INSERT INTO StdChoices
VALUES(3, 18, 3);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(22, "Orange", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(19, 22);
INSERT INTO StdChoices
VALUES(3, 19, 4);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES(23, "Purple", "text");
INSERT INTO Answers (AnsID, Element)
VALUES(20, 10);
INSERT INTO StdChoices
VALUES(3, 20, 5);

-- Student A has taken the quiz
INSERT INTO Users
VALUES (2, "A", "A", "aa", "password", "abcd@gmail.com");

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (24, "Blue", "text");
INSERT INTO StudentResponses
VALUES (2, 1, 24, 1);

INSERT INTO DisplayElements (DispElID, Element, DispType)
VALUES (25, "Cat", "text");
INSERT INTO StudentResponses
VALUES (2, 2, 25, 1);

INSERT INTO StudentQuizScores
VALUES (1, 1, 100);

INSERT INTO StudentGrades
VALUES (1, 1, 100);