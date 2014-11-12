USE `LiquiZ` ;

INSERT INTO Users (FirstName, LastName, Username, Password, Email)
VALUES ("Yijin", "Kang", "yijkan", "password", "yijinkang@gmail.com");

INSERT INTO Courses (Name, Privacy)
VALUES ("Intro Java", "a");

INSERT INTO Policies (Name, Timed, ShowAns, Scored, Grade, ShuffleQues, ShuffleAns)
VALUES ("Homework", 0, 1, 0, "10", 0, 0);

INSERT INTO Quizzes (Name, Policy, Privacy)
VALUES ("ThisIsAQuiz", 1, "a");

-- Elements to go into first qc
INSERT INTO DispElSeq
VALUES (1, "What is the color of the sky?", 1, "text");
INSERT INTO DispElSeq
VALUES (1, "Example of longer text", 2, "text");

INSERT INTO Questions (Points, Level, QType)
VALUES (3, 1, "Fill");
INSERT INTO DispElSeq (DispEl, Element, Sequence, Type)
VALUES (2, "Blue", 1, "text");
INSERT INTO Answers (Element)
VALUES (2);
INSERT INTO DispElSeq (DispEl, Element, Sequence, Type)
VALUES (3, "Light Blue", 1, "text");
INSERT INTO Answers (Element)
VALUES (3);

-- Connect questions to answers
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 1, 1, 1);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (1, 2, 2, 1);

-- Add DispEls and Questions to qc
INSERT INTO QuesConElements (QuesCon, Sequence, Element)
VALUES (1, 1, 1);
INSERT INTO QuesConElements (QuesCon, Sequence, Ques)
VALUES (1, 2, 1);

-- Elements to go into second qc
INSERT INTO DispElSeq
VALUES (4, "image.jpg", 1, "img");
INSERT INTO DispElSeq
VALUES (5, "Which animal is shown in the picture?", 1, "text");

INSERT INTO Questions (Points, Level, QType)
VALUES (5, 2, "Mult");
INSERT INTO DispElSeq(DispEl, Element, Sequence, Type)
VALUES (6, "Dog", 1, "text");
INSERT INTO Answers(Element)
VALUES (6);
INSERT INTO DispElSeq(DispEl, Element, Sequence, Type)
VALUES (7, "Cat", 1, "text");
INSERT INTO Answers(Element)
VALUES (7);
INSERT INTO DispElSeq(DispEl, Element, Sequence, Type)
VALUES (8, "Dragon", 1, "text");
INSERT INTO Answers(Element)
VALUES (8);

INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 3, 1, 0);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 4, 2, 1);
INSERT INTO QuesAnsSeq (Ques, Ans, Sequence, Correct)
VALUES (2, 5, 3, 0);

INSERT INTO QuesConElements (QuesCon, Sequence, Element)
VALUES (2, 1, 4);
INSERT INTO QuesConElements (QuesCon, Sequence, Element)
VALUES (2, 2, 5);
INSERT INTO QuesConElements (QuesCon, Sequence, Ques)
VALUES (2, 3, 2);

-- Connect QuesCons to Quiz
INSERT INTO QuizzesQuesCons
VALUES (1, 1, 1);
INSERT INTO QuizzesQuesCons
VALUES (1, 2, 2);

-- Yijin Kang has admin permissions over Quiz 1
INSERT INTO UserPermissions
VALUES (1, 1, "Quiz", 1);
