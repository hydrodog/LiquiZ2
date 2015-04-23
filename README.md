#LiquiZ Project Specification

## Authors
Dov Kruger

Mary Linu Susainathan

Shenghan Gao

Yijin Kang

Poornima Kuna

Stephen Oro

Yingzhu Wang

Yujie Liu

[Add your name here]

## Introduction

LiquiZ is a quiz, testing, and homework platform that looks to solve the problems user experience, efficiency, and capability of modern platforms in the educational field. In user experience, LiquiZ is built to be intuitive and smooth, while providing greater freedom to the educators who use it. In terms of efficiency, the LiquiZ platform takes advantage of content caching to only dynamically load the content that is specific to each quiz or course. LiquiZ makes further improvements in its ability to randomize not only the order of questions and answers, but also can modify equation and basic code questions to create individualized tests, making tests more secure against cheating. LiquiZ optimizes interaction through the efficient design of the server, in which major improvements have been made in preloading information for access. User specific random quizzes are generated prior to the test day to ensure no time is wasted on this step when a user requests a quiz. Alongside this improvement, the server provides faster access by preloading information into RAM, which manifests itself in faster access over the traditional approach of making multiple requests to a single database. In capability, the LiquiZ platform excells by providing a wider array of question types than current systems, which allows educators to test with questions better suited to their subjects. 

## System Architecture

[diagram of entire system.  I drew a quick and dirty (bad one).  Draw a better one, preferably in a UML design tool.]

Describe (in English) the overall design of the system.

## Question Types

All questions can have display components that are: text, audio, video.  All question containers can contain any combination of the question inputs below.

All questions involving typing can either start blank (user types all) or can be filled in (user must modify what is already there)

* Multiple Choice (dropdown)	[see Choices]

* Multiple Choice (radio button)	[see Choices]

* Multiple Answer	[see Choices]

* True/false

* Matching (dropdown)

* Matching (drag and drop)

* Image (click in areas)

* Image (drag from x,y to x2,y2)

* Formula (variables can be ranged [start:step:end] or list of values (1,5,18,24, etc)

* Equation (the answer is an equation)

* Fillin (user types in an answer)

* Regex (fillin where answer specified as regex pattern.  see Pattern)

* Number (fillin where answer is a number in a range [a,b]

* Combine Regex and Number: example: 12.5 Kg

    * Scaffolded Number + dropdown (choices fixed on the units)

* MatrixQuestion (a grid of answers)

* Code (user types in code, can compile remotely, errors come back, can repeat) output displayed when successful.

* File upload (file types can be specified).  If a zip file, contents can be specified either what must be in, what can be in, what cannot be in.

* Draw in HTML5.

* Random Graph: randomize graph(this is really a display element, the question is one of the other types)

* Graph question:  The user clicks to form a graph which is the answer.  For example, y=5x + 3, click two points to show this line.  y=x2+2, click three points to uniquely determine this parabola.

* Essay (ungraded, the human grader does this one)

* Audio/video question: Given an audio or video clip, answer the question based on it

* [English]Jumbled sentence.  Re-sequence a paragraph.

Add other question types of your own if you think of them.  Yijin, you had suggested Music as a topic.
Please see [http://www.thatquiz.org/](http://www.thatquiz.org/) for some very interesting ideas in assessment.  Look at angles (measurement) geography, triangles (with circles, diameter).

[http://epat-parcc.testnav.com/client/index.html#tests](http://epat-parcc.testnav.com/client/index.html#tests)

**_Different types of questions in LiquiZ2:_**

* **_Multiple Choice (dropdown): _**A multiple choice dropdown type of question has a dropdown box adjacent or below the question .The instructor can provide multiple choices from which generally one choice may be selected by the student as a correct answer. To allow the student to pick multiple answers the instructor may select "multiple choices allowed". If only one answer is allowed, complete points will be awarded as specified by the instructor for that particular question. If multiple choices are allowed the instructor is allowed to allocate respective points for each correct answer.

*  **_Multiple Choice (radio button):_** This type of question has multiple choices with "radio button" selection which are provided by the instructor. It has only one correct answer. The instructor can decide the number of points to award for a correct answer.

* **_Multiple answer: _**Multiple answer type of question has multiple choices provided by the instructor with "check box" selection. The student can select one or more than one choices. Number of points to award for each correct answer is specified by the instructor. We make sure that selecting all the choices does not account for answering correctly.

* **_True / False: _**A true or false question is generally a multiple choice radio button type question with only two choices (true and false). Only one can be selected. But the instructor could also use multi choice dropdown with single answer selection mode.

* **_Matching(dropdown): _**This type of question have a set of questions on one side and a set of correct answers are provided to be matched against these questions. Against each question there is a dropdown box with all the correct answers from which the student has to select the match for each question. Each match will contribute towards the points obtained on that particular question. The instructor can decide individual points for each question in the set.

* **_Matching (drag and drop): _**This type of question has a set of questions and a set of correct answers. The answers are provided in a container and can be dragged and dropped into another container. So the student has to drag the correct answer from the initial container and drop it to the right container against the question. Each match will contribute to the total points scored for that particular question.

*  **_Image (click in areas): _**The question shows an image as part of the question. The student has to click on a area on the image to answer the question. An example would be map pointing where a student has to locate a particular area on the map.

* **_Image(drag from one point on the image to another): _**The question contains an image and can connect two points on the image. An example would be a circuit connection question. The instructor can describe how the circuit should work and the student has to make circuit connections to work as desired.

* **_Formula:_** A question contains a formula. Often instructors either provide the same formula with same numeric digits to all the students taking the quiz or have to write several formulae to provide different formulae for different students. But in LiquiZ2 the instructor can enter either a set of different numbers from which the formula can be modified or can specify a start and end point and in what intervals the variables can be changed. So the instructor only has to enter a formula only once specifying what should be fixed and what are variables. As a result each student gets a different formula (differed in variables) in their quiz.

*  **_Equation : _**The answer to this type of questions is an equation. So we provide an equation editor which can be used by the student to fill in the answer.

* **_Fillin: _**Fillin is a classic fill in the blank question. The answer is written where there is a blank space or an empty box.

* **_Regex:_** This is a type of "fillin" question where answer matches a specified regex pattern. For example if the instructor asks a question which has the correct answer that includes a number and unit, upon entering only a number or only a unit a warning pattern is displayed accordingly. This does not stop the student from submitting the answer but providing partial answer will result in no points for the question.

* **_Number:_** This is a type of "fillin" question where the answer is a number within a certain range. For example an answer given in decimal error or a round off error can also be awarded points.

* **_Regex and Number Combined:_** This type of question allows to accept an answer which is a combination of number and a match for a given regex pattern. This type of question is highly appropriate for a science question where numbers with digit or round-off errors can be accepted as a correct answer and a regex pattern can specify that there is a unit after the number to complete the answer. A warning pattern is given if the student forgets to answer the units portion of the answer.

* **_Matrix:_** A matrix question is basically a fill in the blank question with many blanks. Number of rows and columns for the matrix is specified by the instructor which develops an appropriate layout for the student to fill in the multiple blanks.

* **_Code: _**The answer a code question is programming code. The instructor decides in which language the student should write the code. For the student to check the output of his code, he can compile and execute it before he submits it.

* **_File upload:_** This type of question accepts file upload as an answer. The instructor can specify the types of files to be accepted. Anything other than that formal file will not be accepted. For example if the instructor specifies that only .txt files are allowed nothing other than that format are accepted.

* **_Draw: _**This type of question allows a student to draw on a canvas. These questions are graded manually by the instructor.

* **_Graph question:_** This is another type of interface with the canvas. The canvas looks like a graph sheet and the student can plot a graph by clicking on the canvas. For every two points clicked they are connected by a solid line.

* **_Essay:_** An essay question can be used for short answer type questions typically a paragraph or two. The answer is manually graded by the instructor.

* **_Audio/Video:_** This question type is used if the question requires any audio or video material. It can be used to provide tips for certain type of questions.

* **_Jumble sentence:_** A jumble sentence question contains words which upon re-arranging forms a correct sentence. The words are placed in separate containers and the placing of the containers can be changed. Each correction in the sentence contributes to the total points awarded to the question.

## Other Objects in the System

Choices: Standardized choices that appear as answers on many questions.  For example, for a survey:

surveyagree	strongly agree,agree,no opinion, disagree,strongly agree

Pattern: Regex patterns predefined so teachers who are not programmers can easily use patterns by name.  Examples
mass	kg|kilogram|KG|g|gram

We need a notation for one pattern to reference another.  For example:

massqty	[:3digit:] [:mass:]

Choices: standard choice for questions like survey which have the same answers every time: strongly agree, agree, no opinion, disagree, strongly disagree.  Choices should be available in menus for quick access.

Matrix: used for computing a grid

Response: the response object encapsulates what the system does in response to a student’s answer.  This is only on a self-checked assessment of course.  Examples include "good job", playing a reward sound or animation.

## Web Navigation

[this section of the document describes how to traverse the system.  Use this section to plan the user interface. Design for extreme ease of use and minimize work on the part of the teacher to create large numbers of problems]

List here each case, what the page should look like, how to transition to other pages.

How do we:

* Create/edit a new quiz

* Create/edit a new question

* Bulk load many questions

* Backup and restore to/from XML

* Assign a quiz to all students

* Take a quiz

* Correct a quiz and force a regrade if there was a mistake

* Define new patterns

* Add a pattern to a library if it’s good for more than just a single question

* Create standard responses and add to the library if it’s more than just you

* Future: create a sharing center where teachers can give (or sell) each other question sets.

**Create Quiz**

Click the **Create Quiz** Button to create a new quiz.

**Add New Question**

(Need to create a button to add new Question)

**Complete Question**

Create a **Title** for your question, In the **Points** textbox enter the number of points for the question, set the **Level** based on the question.

**Question Type **

In the question type drop-down menu, you can create the following types of questions:

* Fill In

* Essay

* Code

* MultiChoice-Dropdown

* MultiChoice-Radio

* MultiAnswer

* Regex Question ( To Do: Check)

You can add image, audio, and video to the question

**Question **

Type the question in the **Question Text ** text box. (Size of the question text box can be changed for the Essay and Code type Question)

**Image Upload**

Click on the **Choose** **File** button to upload image from the PC, then click **Load Select Image** to Display the Image (Current code supports Google Chrome)

**Audio File Upload**

Click on the **Choose File** button to upload audio file from the PC, then click **Load Select Image** to Display the Audio. Different styles can be applied for audio controls (Current code supports Google Chrome) 

**Video File Upload**

Click on the **Choose File** button to upload video file from the PC, then click **Load Select Image** to display and play the Video. Different styles can be applied for video controls (Current code supports Google Chrome) 

[Note: For the image and video file the height and width is not applied in order to be compatible with the browsers default setting]

(To Do: All three file Upload has to be hidden for the Code type question)

**Fill In Question**

Click the drop-down menu and select **Fill-In** question type

Use the **Question Text** text box to create a fill-in question. Enter the possible answer for the fill-in question in the **Answer** text box. Apply Warning Pattern by clicking the **Warning Pattern **check box. Choose the type of question from the drop-down menu by default the **Fill-In** is selected. Set the **Number Limits** in the text box

Click the **Number Question** check box to display the input text boxes. Type the exact number and the approximate number in the available text boxes.

**Essay Question**

Click the drop-down menu and select **Essay** question type

Use the **Question Text** text box to create an essay question or use **Type your Essay **text box to create an essay as question that has to be modified/answered. As you type the word counter shows the number of words typed and the number of words remaining in text box in red color.

[To Do: make the counter work when the text is deleted.]

**Code Type Question**

Click the drop-down menu and select **Code **question type

Use the **Question Text** text box to create a code type question or Use **Type your Code **text box to type in code that has to be modified. 

The **Programming Language** drop-down menu has two options to choose the language C++ or Java.

[To Do: Check whether the word count is needed for the Code type question or not and make the text box work with respect to the programming language chosen.]

**MultiChoice-Dropdown Question**

Click the drop-down menu and select **MultiChoice-Dropdown **question type

Use the **Question Text** text box to create a question. By default there four options available for the possible answers. Type your options in the text box **Option 1 - Option 4. ** To choose the right answer click the check box **Correct Answer** with respect to options.

 

The **Add more Options** text box can be used to add more options to the question. The student view for this question type will a multiple choice drop-down menu. 

(Further development for the option type may be to add "delete option" attribute. )

**MultiChoice-Radio Question**

Click the drop-down menu and select **MultiChoice-Radio **question type

Use the **Question Text** text box to create a question. By default there four options available for the possible answers. Type your options in the text box **Option 1 - Option 4. ** To choose the right answer click the check box **Correct Answer** with respect to options.

The **Add more Options** text box can be used to add more options to the question. The student view for this question type will a multiple choice radio button menu. 

**MultiAnswer Question**

Click the drop-down menu and select **MultiAnswer **question type

Use the **Question Text** text box to create a question. By default there four options available for the possible answers. Type your options in the text box **Option 1 - Option 4. ** To choose the right answer click the check box **Correct Answer** with respect to options.

The **Add more Options** text box can be used to add more options to the question. The student view for this question type will a multiple choice drop-down menu with an option to choose multiple answers.

**Regex-Question**

Click the drop-down menu and select **Regex-Question **question type. Use the **Question Text** text box to create a regex question. Enter the possible answer for the regex question in the **Answer** text box. Use the **Input your Regex ** textbox to create your regex.

[To Do: The regex java code has to be checked. ]

**Save Question**

[To Do: Submit can be changed to Save or Update Question]

## QTI-2.0 (IMSGlobal standard)

[describe the QTI-2.0 standard and what it supports.  Does it cover all the features we have in our project? Can it be used to represent our quizzes?  If not we will have to do our own]

## LTI 1.1

[Describe LTI and how we can build a link to click from Canvas and Get into LiquiZ]

## Current XML Representation of LiquiZ

[this should describe how Tim’s current code loads/saves XML.]

## LiquiZ Database Structure

[describe the current database design.  show the table structure, describe how to get objects in RAM to the database.  What cases do we need to support? Create a quiz, Edit an existing quiz, delete a quiz, Create a question, edit a question, add a question to a quiz, ….]

## Overview

An assessment program deals with dynamic data.  Users continually create new entities (quizzes, questions, etc), and other users, generally students, take quizzes, generating responses which must be recorded.  The individual answers should be associated with a session (IP address) and each question should have an associated time.  An interesting question is where this time comes from (see the section on time synchronization).

There are three major database architectures.  First, everything can be dynamically pulled from the database.  In this case, every time

## Time Synchronization

Every event that is of security interest should be logged.  This is primarily when questions are being answered.  The time standard used should probably be based on the server clock because the client clock can be manipulated.  Possibly we could also stored local client time to learn something about latency, but we can never be sure that client time is not being modified by a user.

The database uses a generalized structure in order to be able to fit different types of questions and answers in the same tables. Entity tables include Users, Courses, Quizzes, Questions, Answers, etc, each of which have a primary key marked in red. Some limitations of SQL databases force certain design features.  For example, strings in most databases are limited to approximately 255 characters.  [In MySQL?]  Strings that are longer are stored as blobs and are not stored inline, dramatically reducing speed.  So for any strings we have that may exceed the limit, we have a table design that spreads the string over multiple rows.  For example, DisplayElements contains multiple DispElSeq that each contain a sequence number in addition to the string. Separate entities are connected by linking tables such as CoursesQuizzes, QuesAnsSeq, etc. These latter two use "foreign keys" (though not designated as such in the database) marked in blue. 

The full diagram of the table structure is shown below. 

## Table and field descriptions

**Courses** - Courses created by instructors that contain many quizzes

* CourseID - Auto incremented primary key

* Name - The name of the course

* Privacy - A 4-character string representing a privacy setting

**CoursesQuizzes** - Connects courses and quizzes, which share a many to many relationship

* Course - Connects to Courses.CourseID

* Quiz - Connects to Quizzes.QuizID

* Sequence - To allow customized ordering of quizzes within a course

**Quizzes** - Contains all information about a quiz

* QuizID - Auto incremented primary key

* Name - The name of the course

* Desc - Connects to DisplayElements.DispElID to provide a description of the quiz

* Policy - Connects to Policies.PolID to designate a policy for the quiz

* Privacy - A 4-character string representing a privacy setting

**Policies** - A group of settings for a quiz

* PolID - Auto incremented primary key

* Name - The name of the policy

* Attempts - How many times a student can take the quiz

* Timed - A boolean representing whether there is a time limit

* TimeLimit - The number of minutes the student has to take the quiz (??) Is there are need for smaller denominations? Is there a need for hour-or-longer time limits? (keep in mind 3600 seconds/hour) 

* ShowAns - A boolean representing whether the answers should be shown after the student attempts the quiz

* Scored - A boolean representing whether the grade on the quiz should count for the student’s grade

* Grade - (??) I think this was level but now I don’t remember...

* ShuffleQues - A boolean representing whether the order of the questions should change for every instance

* ShuffleAns - A boolean representing whether the order of the answer choices should change for every instance

* AccessCode - Allows for the instructor to set an access code that the student must provide in order to take the quiz

* (??) are policies unique to users or courses?

**QuizzesQuesCons** - Connects quizzes and question containers, which share a many-to-many relationship

* Quiz - Connects to Quizzes.QuizID

* QuesCon - Connects to QuesCon.QuesConID

* Sequence - To save the order of question containers within the quiz

**QuesCon** - A "QuesCon" is a container contains the problem like "What's your name. " and the box need to fill or choices could be chosen. Has only one column to keep track of question container ID’s and allow for auto increment.

* QuesConID - Auto incremented primary key

**QuesConElements** - 

* QuesCon - Connects to QuesCon.QuesConID

* Sequence - The element’s sequence within the question container

* Element - A row in this table can either use this field to put a display element in the question container or...

* Ques - Use this field to put a question in the question container 

* Type - A 4-character string to designate the row as containing either a question or a display element (!!)should be a bit/boolean instead. DE types are stored elsewhere

**Questions** - Contains information about the question in a question container. A "question" is actually a radio box, a blank box need to fill text or one choice of a single choice or multiple choice selection. 

* QuesID - Auto incremented primary key

* Points - How many points the question is worth (??) if question containers are to be reused, should their point value really be in the questions table?

* Level - The level of difficulty of the question (??) same comment as above

* Qtype - The type of question (e.g., multiple choice, fill-in)

**QuesAnsSeq** - Connects questions to individual answers, answer choices, or individual choices within a standard set. Questions and standard choices share a many to many relationship, and regular answers are treated similarly though they should be one to many 

* Ques - Connects to Questions.QuesID

* Ans - Connects to Answers.AnsID. If and only if this field is not used, the following two should be used

* StdSet - Connects to StdSet.StdSetID

* StdChoice - Connects to StdChoices.Sequence

* Correct - A boolean that designates whether the answer or standard choice selected is the correct answer to the question

**Answers** - Contains information about answer choices

* AnsID - Auto incremented primary key

* Response - Connects to DisplayElements.DispElID to represent a response that a student will receive if s/he chooses this option

* Element - Connects to DisplayElements.DispElID to designate the visual representation of this answer choice

* LowBound, HighBound - These fields are used to designate numeric answer choices within a range

* (!!)add step and other numeric options

**StdSet** - A standard set of grouped standard choices

* StdSetID - Auto incremented primary key

* Name - The name of the set

* (??) should these be global or specific to a user or course? support both?

**StdChoices** - The choices in a standard set

* StdSetID - Connects to StdSet.StdSetID

* Element - Connects to DisplayElements.DispElID

* Sequence - To allow the choices to be ordered in a specific way within the set

**StudentResponses** - Records students’ responses to specific questions

* Student - Connects to Users.UserID

* Ques - Connects to Questions.QuesID

* Response - Connects to DisplayElements.DispElID to store the response of the student

* Correct - To store whether this answer was correct or not

**Users** - An entity table for all system users

* UserID - Auto incremented primary key

* FirstName, LastName - strings to represent the user’s name

* Username, Password - Login information

* Email - the email address of the user

**StudentGrades** - Records students’ grades in courses

* Student - Connects to Users.UserID

* Course - Connects to Courses.CourseID (not shown on diagram but is in code)

* Grade - The numeric grade

**UserPermissions** - Gives users permissions over certain entities

* User - connects to Users.UserID

* Entity - connects to the primary key of whatever the user is being connected to

* EType - a 4-character string that identifies what ‘Entity’ is being connected to

* Permissions - an 8-bit integer representing the permissions that the user has over the entity. Each bit represents a different permission

**StudentQuizScores** - Records students’ scores on individual quizzes

* Student - connects to Users.UserID

* Quiz - Connects to Quizzes.QuizID

* Score - the score received

**DisplayElements** - Entity table for display elements

* DispElID - Auto incremented primary key

* Type - A 4-character string representing the type of display element (e.g., text, audi, vide, imag)

**DispElSeq** - Contains what should be displayed for display elements. This must be a separate table because text must be broken up, creating a one to many relationship between the display elements and the string segments

* DispEl - Connects to DisplayElements.DispElID

* Element - A string that represents text to be shown or the name of the file to be loaded

* Sequence - To keep the string segments in order

[Put brief description for each entity what it means (one sentence typically)

StudentQuizScores should include sequence number (student can take the same quiz multiple times

StudentGrades should have Course

StudentResponses should track individual response to each question

We need a diagramming tool so we stay in sync!


Green indicates a Display Element, which connects to DisplayElements.DispElID. There were simply too many Display Elements to draw lines from each one to the DisplayElements table.
]
Notes: 

**StudentGrades** also has a Course column after Student but it is missing from the diagram

**UserPermissions** exists… but is currently underdeveloped in both Java and the database.

*The database may need additional tables in order to support more complex question types*

Java connects to the MySQL database using JDBC. Methods are organized into classes Database, Check, Create, Load, Edit, and Delete.

## DatabaseMgr

Encapsulates access to the database.  Contains methods that facilitate multiple connections, sharing those connections and not having to continually allocate new ones.

## DBExample

A reference that contains examples and explanations of how to use JDBC and the DatabaseMgr methods.

## Database

contains ArrayLists for each entity table in the database as well as setters and getters for each ArrayList. "Database" and “Database ArrayLists” (with a capital “D”) will refer to this class and “the database” (with a lowercase “d”) will refer to the MySQL database. 

## Check

currently contains only one method to check whether a set of inputted user credentials is valid.

## Create

contains four different types of methods. 

create* methods add rows to entity tables. 

fill* methods are used with Display Elements, Standard Choice Sets, Question Containers… 

link* methods update linking tables like CoursesQuizzes. 

record* methods deal with student records. 

At the end of the class is a list of methods to be completed.

## Load

has three different types of methods. 

Methods for Users, Courses, Quizzes, Question Containers (and more) take no parameters and return nothing. They simply load all rows in the database to the ArrayLists in the Database class when called. (!!)loadStdChoice and loadPolicy must be changed in order to fit this category of methods. 

Methods for Display Elements, Answers, and Questions take an ID as an integer parameter and put the requested object in the Database class ArrayList, then return the requested object. As Question Containers are being loaded, they will load the necessary Display Elements and Questions - which would load the necessary Answers - so it would be unnecessary and repetitive to access the database both when calling these methods and when calling the loadQuesCon method. 

Alternatively, all methods can be made to fit the first category and reference the Database ArrayLists when they need to load something rather than going to the database. For example, Question Containers would need to load the Display Elements and Questions it is supposed to contain. Currently, loadQuesCon uses the loadDispEl and loadQues methods in order to retrieve the needed Display Elements and Questions but adjustments can be made so that when loadQuesCon runs, the Database.displayables and Database.questions would already be updated and able to be accessed through getDisp() and getQues(). This option would entail careful attention to the order that the load methods are run in order to ensure that no method is looking for an entity in an empty or out-of-date ArrayList!

Finally, the last type would deal with student records. As of yet, these methods simply return the requested entity as there is no Database class equivalent for student record tables in the database. The issue is that student records must associate Users with Questions, Quizzes, or Courses (for student responses, student grades on a quiz, and student overall grades in a course). Once this issue is resolved, these methods too should load everything when called. 

## Edit

should contain methods to update table rows when entities are edited. Currently, (!!)very little progress has been made in this class.

## Delete

should contain methods to delete rows and all associated rows when entities are deleted. (Ex: When a question container is deleted, corresponding QuizzesQuesCons rows must also be deleted). (!!)This class has no progress thus far. 

## LiquiZ Database Performance Architecture(s)

[three ways to make LiquiZ faster.  The basic way is to load an entity (like a quiz) every time someone wants it and print a page.  The second way is to preload everything into RAM, and do everyone out of RAM, but then we have to save everything that changes to database so that the next time, it is available in case the server crashes. The third optimization (independent of the other two) is to pre-generate quizzes as HTML and require only that the user ask with a password.  Can we send out to a third party under a random name as Stephen suggested? I don’t know.  For example, if we do, that might mean someone can take the quiz more times than permitted, or that they can pass the link to other people who can see without logging in.]

LiquiZ uses these methods in order to boost performance.

The first involves how entities are accessed. One option is to load them from the database when they are requested by a user. With this option, a user request to view a quiz would call a method to access the database and create a Quiz object along with the necessary Question and Displayable objects. Another option is to preload all entities in the database into RAM. The Database class in the database package contains ArrayLists that align with the database tables. When LiquiZ starts, the program loops through all entries in the tables and puts corresponding objects into the ArrayLists. This presents the issue that when a user creates, edits, or deletes an entity, or when a student takes a quiz, both the object in RAM and the database entries must be updated.

We went with the second option. The Load class contains methods that loop through all Users, Policies, Question Containers, Quizzes, and Courses and put them in the Database ArrayLists. These methods should run in this order so that, for example, a question container needed by a quiz can be accessed through the Database class rather than by querying the database again and creating another object. All other entities - Questions, Answers, *Standard Choice Sets*, and Display Elements are loaded as they are needed when loading Question Containers rather than all in order. Since all of these are elements of a Question Container and *would not exist on their own*, all of them should be loaded provided all Question Containers are successfully loaded.

LiquiZ can be further improved by having quizzes generate HTML as they are made so they are available when needed rather than having to go through writeHTML methods for all entities related to the quiz in order to finally display the requested quiz. With this method, the user need only verify login before viewing the pre-generated page. 

## Import/Export XML

[In the future, we should be able to import from any LMS.  But with limited resources, we are going to focus on the one in which I already have quizzes -- Canvas.] Describe the process by which your program reads in the XML from Canvas, converts it to our XML, and loads it in.

Note that this should not be written until you do it.  This depends on the QTI-2.0 task, and on writing a program to actually load from Canvas to ours.]

