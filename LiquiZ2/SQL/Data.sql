-- TODO: fix DisplayElement entries
USE `LiquiZ` ;
DELETE FROM Answers;
DELETE FROM Courses;
DELETE FROM Courses_Quizzes; 
DELETE FROM DisplayElements;
DELETE FROM Media;
DELETE FROM Policies;
DELETE FROM QuesCon; 
DELETE FROM QuesConElements;
DELETE FROM Ques_Ans;
DELETE FROM Questions;
DELETE FROM Quizzes;
DELETE FROM Quizzes_QuesCons;
DELETE FROM StdChoices;
DELETE FROM StdSet;
DELETE FROM StudentGrades; 
DELETE FROM StudentQuizScores; 
DELETE FROM StudentResponses; 
DELETE FROM Text;
DELETE FROM UserActions;
DELETE FROM UserPermissions;
DELETE FROM Users;

INSERT INTO Users
VALUES (1, "Yijin", "Kang", "yijkan", "password", "yijinkang@gmail.com");

INSERT INTO Courses
VALUES (1, "Intro Java", "a");

INSERT INTO Policies (PolID, Name, Timed, ShowAns, Scored, Grade, ShuffleQues, ShuffleAns)
VALUES (1, "Homework", 0, 1, 0, 10, 0, 0);

INSERT INTO Quizzes (QuizID, Name, PolID, Privacy)
VALUES (1, "Example Quiz", 1, "a");

INSERT INTO Courses_Quizzes
VALUES (1, 1, 1);

-- Response DisplEl
INSERT INTO DisplayElements(DispElID, DispType)
VALUES (34, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (34, "rtxt", "Good job!");

-- first QC
INSERT INTO QuesCon
VALUES (1, "The Sky", "cssClass?");

-- Elements to go into first qc
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (1, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (1, "qtxt", "What is the color of the sky?");

-- Question
INSERT INTO Questions (QuesID, Points, Level, QuesType, CaseSensitive)
VALUES (1, 3, 1, "Fill", 0);

-- Answers
INSERT INTO DisplayElements (DispElID, DispType)
VALUES(2, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (2, "atxt", "Blue");
INSERT INTO Answers (AnsID, Response, DispElID)
VALUES (1, 34, 2);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (3, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (3, "atxt", "Light Blue");
INSERT INTO Answers (AnsID, Response, DispElID)
VALUES (2, 34, 3);

-- Connect questions to answers
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (1, 1, 1, 1);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (1, 2, 2, 1);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements (QuesConID, Sequence, DispElID, Type)
VALUES (1, 1, 1, "Elem");
INSERT INTO QuesConElements (QuesConId, Sequence, QuesId, Type)
VALUES (1, 2, 1, "Ques");

-- Second QC
INSERT INTO QuesCon
VALUES (2, "Animal Identification", "cssClass?");

-- Elements to go into second qc
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (4, "med");
INSERT INTO Media
VALUES (4, "cat.jpg", "WebContent/assets/img/cat.jpg", "img", 275, 183);
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (5, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (5, "qtxt", "Which animal is shown in the picture?");

-- Question
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (2, 5, 2, "MCRa");

-- Answers
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (6, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (6, "atxt", "Dog");
INSERT INTO Answers(AnsID, DispElID)
VALUES (3, 6);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (7, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (7, "atxt", "Cat");
INSERT INTO Answers(AnsID, Response, DispElID)
VALUES (4, 34, 7);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (8, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (8, "atxt", "Dragon");
INSERT INTO Answers(AnsID, DispElID)
VALUES (5, 8);

-- Connect questions to answers
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (2, 3, 1, 0);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (2, 4, 2, 1);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (2, 5, 3, 0);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements (QuesConID, Sequence, DispElID, Type)
VALUES (2, 1, 4, "Elem");
INSERT INTO QuesConElements (QuesConID, Sequence, DispElID, Type)
VALUES (2, 2, 5, "Elem");
INSERT INTO QuesConElements (QuesConID, Sequence, QuesID, Type)
VALUES (2, 3, 2, "Ques");


-- Sixth QC (will be 2nd in quiz)
INSERT INTO QuesCon
VALUES (6, "Choosing animals", "cssClass?");

-- Elements to go into second qc
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (28, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (28, "itxt", "Select all animals from the list");

-- Question
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (7, 4, 3, "Mult");

-- Answers
INSERT INTO DisplayElements (DispElID, DispType)
VALUES (29, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (29, "atxt", "Dog");
INSERT INTO Answers(AnsID, Response, DispElID)
VALUES (21, 34, 29);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (30, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (30, "atxt", "Cat");
INSERT INTO Answers(AnsID, Response, DispElID)
VALUES (22, 34, 30);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (31, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (31, "atxt", "Computer");
INSERT INTO Answers(AnsID, DispElID)
VALUES (23, 31);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES (32, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (32, "atxt", "Dragon");
INSERT INTO Answers(AnsID, Response, DispElID)
VALUES (24, 34, 32);

-- Connect questions to answers
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (7, 21, 1, 1);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (7, 22, 2, 1);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (7, 23, 3, 0);
INSERT INTO Ques_Ans (QuesID, AnsID, Sequence, Correct)
VALUES (7, 24, 4, 1);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements (QuesConID, Sequence, DispElID, Type)
VALUES (6, 1, 28, "Elem");
INSERT INTO QuesConElements (QuesConID, Sequence, QuesID, Type)
VALUES (6, 3, 7, "Ques");








-- Third QC
INSERT INTO QuesCon
VALUES (3, "Opinion", "cssClass?");

-- Elements to go into third qc
INSERT INTO DisplayElements(DispElID, DispType)
VALUES (24, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (24, "qtxt", "Did you like this quiz?");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (3, 0, 0, "MCDD");

-- Connect question to std answer set
INSERT INTO Ques_Ans (QuesID, StdSetName)
VALUES(3, "Yes/No");

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (3, 1, 24, "Elem");
INSERT INTO QuesConElements(QuesConID, Sequence, QuesID, Type)
VALUES (3, 2, 3, "Ques");

-- Fourth QC
INSERT INTO QuesCon
VALUES (4, "Hello World", "cssClass?");

-- Elements to go into fourth qc
INSERT INTO DisplayElements(DispElID, DispType)
VALUES (25, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (25, "itxt", "Write a method to output Hello World to the console");

INSERT INTO DisplayElements(DispElID, DispType) 
VALUES (26, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (26, "qtxt", "Was this question hard?");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (4, 10, 5, "Code");
INSERT INTO Questions (QuesID, Points, Level, QuesType, Rows, Cols, MaxWords)
VALUES (5, 0, 0, "Essa", 2, 50, 250);

-- Add DispEls and Questions to qc

INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (4, 1, 25, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (4, 2, 4, "Ques");
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (4, 3, 26, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (4, 4, 5, "Ques");

-- Fifth QC
INSERT INTO QuesCon
VALUES (5, "Number Range", "cssClass?");

-- Elements to go into fifth qc
INSERT INTO DisplayElements(DispElID, DispType)
VALUES (27, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (27, "qtxt", "Write a number between 0 and 10");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType, LowBound, HighBound)
VALUES (6, 1, 1, "NumR", 0, 10);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (5, 1, 27, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (5, 2, 6, "Ques");


-- Seventh QC
INSERT INTO QuesCon
VALUES (7, "Regex Question", "cssClass?");

-- Elements to go into third qc
INSERT INTO DisplayElements(DispElID, DispType)
VALUES (33, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (33, "qtxt", "Type a digit");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType, Pattern)
VALUES (8, 1, 0, "RegX", "[0-9]");

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (7, 1, 33, "Elem");
INSERT INTO QuesConElements(QuesConID, Sequence, QuesID, Type)
VALUES (7, 2, 8, "Ques");





-- Connect QuesCons to Quiz
INSERT INTO Quizzes_QuesCons
VALUES (1, 1, 1);
INSERT INTO Quizzes_QuesCons
VALUES (1, 6, 2);
INSERT INTO Quizzes_QuesCons
VALUES (1, 2, 3);
INSERT INTO Quizzes_QuesCons
VALUES (1, 4, 4);
INSERT INTO Quizzes_QuesCons
VALUES (1, 5, 5);
INSERT INTO Quizzes_QuesCons
VALUES (1, 7, 6);
INSERT INTO Quizzes_QuesCons
VALUES (1, 3, 7);






-- Yijin Kang has admin permissions over Quiz 1
INSERT INTO UserPermissions
VALUES (1, 1, "Quiz", 1);

-- StdChoices: Poll
INSERT INTO StdSet
VALUES(1, "Poll");

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(9, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (9, "atxt", "Strongly Agree");
INSERT INTO Answers (AnsID, DispElID)
VALUES(6, 9);
INSERT INTO StdChoices
VALUES(1, 6, 1);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(10, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (10, "atxt", "Agree");
INSERT INTO Answers (AnsID, DispElID)
VALUES(7, 10);
INSERT INTO StdChoices
VALUES(1, 7, 2);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(11, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (11, "atxt", "No opinion");
INSERT INTO Answers (AnsID, DispElID)
VALUES(8, 11);
INSERT INTO StdChoices
VALUES(1, 8, 3);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(12, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (12, "atxt", "Disagree");
INSERT INTO Answers (AnsID, DispElID)
VALUES(9, 12);
INSERT INTO StdChoices
VALUES(1, 9, 4);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(13, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (13, "atxt", "Strongly Disagree");
INSERT INTO Answers (AnsID, DispElID)
VALUES(10, 13);
INSERT INTO StdChoices
VALUES(1, 10, 5);

-- StdChoices: Complexity
INSERT INTO StdSet
VALUES(2, "Complexity");

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(14, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (14, "atxt", "O(1)");
INSERT INTO Answers (AnsID, DispElID)
VALUES(11, 14);
INSERT INTO StdChoices
VALUES(2, 11, 1);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(15, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (15, "atxt", "O(n)");
INSERT INTO Answers (AnsID, DispElID)
VALUES(12, 15);
INSERT INTO StdChoices
VALUES(2, 12, 2);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(16, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (16, "atxt", "O(n^2)");
INSERT INTO Answers (AnsID, DispElID)
VALUES(13, 16);
INSERT INTO StdChoices
VALUES(2, 13, 3);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(17, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (17, "atxt", "O(n^3)");
INSERT INTO Answers (AnsID, DispElID)
VALUES(14, 17);
INSERT INTO StdChoices
VALUES(2, 14, 4);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(18, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (18, "atxt", "O(n logn)");
INSERT INTO Answers (AnsID, DispElID)
VALUES(15, 18);
INSERT INTO StdChoices
VALUES(2, 15, 5);

-- StdChoices: Colors
INSERT INTO StdSet
VALUES(3, "Colors");

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(19, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (19, "atxt", "Blue");
INSERT INTO Answers (AnsID, DispElID)
VALUES(16, 19);
INSERT INTO StdChoices
VALUES(3, 16, 1);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(20, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (20, "atxt", "Red");
INSERT INTO Answers (AnsID, DispElID)
VALUES(17, 20);
INSERT INTO StdChoices
VALUES(3, 17, 2);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(21, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (21, "atxt", "Green");
INSERT INTO Answers (AnsID, DispElID)
VALUES(18, 21);
INSERT INTO StdChoices
VALUES(3, 18, 3);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(22, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (22, "atxt", "Orange");
INSERT INTO Answers (AnsID, DispElID)
VALUES(19, 22);
INSERT INTO StdChoices
VALUES(3, 19, 4);

INSERT INTO DisplayElements (DispElID, DispType)
VALUES(23, "txt");
INSERT INTO Text(TextID, TextType, TextElement)
VALUES (23, "atxt", "Purple");
INSERT INTO Answers (AnsID, DispElID)
VALUES(20, 10);
INSERT INTO StdChoices
VALUES(3, 20, 5);

-- Student A has taken the quiz
INSERT INTO Users
VALUES (2, "A", "A", "aa", "password", "abcd@gmail.com");

INSERT INTO StudentResponses
VALUES (2, 1, "Blue", 1, 3, 1);

INSERT INTO StudentResponses
VALUES (2, 2, "Cat", 1, 5, 1);

INSERT INTO StudentQuizScores
VALUES (1, 1, 100, 1);

INSERT INTO StudentGrades
VALUES (1, 1, 100);