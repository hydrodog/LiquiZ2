USE `LiquiZ` ;
DELETE FROM Answers;
DELETE FROM Courses;
DELETE FROM Courses_Quizzes; 
DELETE FROM DisplayElements;
DELETE FROM Media;
DELETE FROM Policies;
DELETE FROM Ques_Ans;
DELETE FROM QuesCon; 
DELETE FROM QuesConElements;
DELETE FROM Questions;
DELETE FROM Quizzes;
DELETE FROM Quizzes_QuesCons;
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

INSERT INTO Quizzes (QuizID, Name, PolID, Privacy)
VALUES (1, "ThisIsAQuiz", 1, "a");

INSERT INTO Courses_Quizzes
VALUES (1, 1, 1);

-- first QC
INSERT INTO QuesCon
VALUES (1, "The Sky");

-- Elements to go into first qc
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (1, "What is the color of the sky?", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (1, 3, 1, "Fill");
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(2, "Blue", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES (1, 2);
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (3, "Light Blue", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES (2, 3);

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
VALUES (2, "Animal Identification");

-- Elements to go into second qc
INSERT INTO DisplayElements (DispElID, MediaID, DispType)
VALUES (4, 1, "med");
INSERT INTO Media
VALUES (1, "cat.jpg", "image.jpg", "img", 275, 183);
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (5, "Which animal is shown in the picture?", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (2, 5, 2, "MCRa");
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (6, "Dog", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (3, 6);
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (7, "Cat", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (4, 7);
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (8, "Dragon", "txt");
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
VALUES (6, "Choosing animals");

-- Elements to go into second qc
INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (30, "Select all animals from the list", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (7, 5, 3, "Mult");

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (31, "Dog", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (21, 31);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (32, "Cat", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (22, 32);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (33, "Computer", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (23, 33);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (34, "Dragon", "txt");
INSERT INTO Answers(AnsID, DispElID)
VALUES (24, 34);

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
VALUES (6, 1, 30, "Elem");
INSERT INTO QuesConElements (QuesConID, Sequence, QuesID, Type)
VALUES (6, 3, 7, "Ques");








-- Third QC
INSERT INTO QuesCon
VALUES (3, "Opinion");

-- Elements to go into third qc
INSERT INTO DisplayElements(DispElID, TextElement, DispType)
VALUES (26, "Did you like this quiz?", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (3, 0, 0, "MCDD");

-- Connect question to std answer set
INSERT INTO Ques_Ans (QuesID, StdSetName)
VALUES(3, "Yes/No");

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (3, 1, 26, "Elem");
INSERT INTO QuesConElements(QuesConID, Sequence, QuesID, Type)
VALUES (3, 2, 3, "Ques");

-- Fourth QC
INSERT INTO QuesCon
VALUES (4, "Hello World");

-- Elements to go into fourth qc
INSERT INTO DisplayElements(DispElID, TextElement, DispType)
VALUES (27, "Write a method to output Hello World to the console.", "txt");

INSERT INTO DisplayElements(DispElID, TextElement, DispType) 
VALUES (28, "Was this question hard?", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (4, 10, 5, "Code");
INSERT INTO Questions (QuesID, Points, Level, QuesType)
VALUES (5, 0, 0, "Essa");

-- Add DispEls and Questions to qc

INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (4, 1, 27, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (4, 2, 4, "Ques");
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (4, 3, 28, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (4, 4, 5, "Ques");

-- Fifth QC
INSERT INTO QuesCon
VALUES (5, "Number Range");

-- Elements to go into fifth qc
INSERT INTO DisplayElements(DispElID, TextElement, DispType)
VALUES (29, "Write a number between 0 and 10.", "txt");

-- Question and answers
INSERT INTO Questions (QuesID, Points, Level, QuesType, LowBound, HighBound)
VALUES (6, 1, 1, "NumR", 0, 10);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements(QuesConID, Sequence, DispElID, Type)
VALUES (5, 1, 29, "Elem");
INSERT INTO QuesConElements(QuesconID, Sequence, QuesID, Type)
VALUES (5, 2, 6, "Ques");





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
VALUES (1, 3, 6);







-- Yijin Kang has admin permissions over Quiz 1
INSERT INTO UserPermissions
VALUES (1, 1, "Quiz", 1);

-- StdChoices: Poll
INSERT INTO StdSet
VALUES(1, "Poll");

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(9, "Strongly Agree", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(6, 9);
INSERT INTO StdChoices
VALUES(1, 6, 1);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(10, "Agree", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(7, 10);
INSERT INTO StdChoices
VALUES(1, 7, 2);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(11, "No Opinion", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(8, 11);
INSERT INTO StdChoices
VALUES(1, 8, 3);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(12, "Disagree", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(9, 12);
INSERT INTO StdChoices
VALUES(1, 9, 4);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(13, "Strongly Disagree", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(10, 13);
INSERT INTO StdChoices
VALUES(1, 10, 5);

-- StdChoices: Complexity
INSERT INTO StdSet
VALUES(2, "Complexity");

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(14, "O(1)", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(11, 14);
INSERT INTO StdChoices
VALUES(2, 11, 1);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(15, "O(n)", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(12, 15);
INSERT INTO StdChoices
VALUES(2, 12, 2);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(16, "O(n^2)", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(13, 16);
INSERT INTO StdChoices
VALUES(2, 13, 3);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(17, "O(n^3)", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(14, 17);
INSERT INTO StdChoices
VALUES(2, 14, 4);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(18, "O(n logn)", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(15, 18);
INSERT INTO StdChoices
VALUES(2, 15, 5);

-- StdChoices: Colors
INSERT INTO StdSet
VALUES(3, "Colors");

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(19, "Blue", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(16, 19);
INSERT INTO StdChoices
VALUES(3, 16, 1);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(20, "Red", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(17, 20);
INSERT INTO StdChoices
VALUES(3, 17, 2);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(21, "Green", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(18, 21);
INSERT INTO StdChoices
VALUES(3, 18, 3);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(22, "Orange", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(19, 22);
INSERT INTO StdChoices
VALUES(3, 19, 4);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES(23, "Purple", "txt");
INSERT INTO Answers (AnsID, DispElID)
VALUES(20, 10);
INSERT INTO StdChoices
VALUES(3, 20, 5);

-- Student A has taken the quiz
INSERT INTO Users
VALUES (2, "A", "A", "aa", "password", "abcd@gmail.com");

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (24, "Blue", "txt");
INSERT INTO StudentResponses
VALUES (2, 1, 24, 1);

INSERT INTO DisplayElements (DispElID, TextElement, DispType)
VALUES (25, "Cat", "txt");
INSERT INTO StudentResponses
VALUES (2, 2, 25, 1);

INSERT INTO StudentQuizScores
VALUES (1, 1, 100);

INSERT INTO StudentGrades
VALUES (1, 1, 100);