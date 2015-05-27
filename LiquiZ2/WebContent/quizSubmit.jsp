<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import='java.io.*, java.util.*, org.adastraeducation.liquiz.*, org.adastraeducation.liquiz.database.*' %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="style.css">
<title>Quiz Submitted!</title>
</head>
<body>
<% session.setAttribute("StudentResponses", new StudentResponses()); %>


<h1>LiquiZ</h1>

<div class='quiz'> <!-- temporarily called quiz for styling purposes -->
<% 
	int quizID = Integer.parseInt(request.getParameter("quizID")); // for debugging
	double score = Score.gradeQuiz(request, session);
	int total = Score.getTotalPoints(quizID);
	int percent = (int) Math.floor(score / (double) total * 100);
%>

<div class="quesHeader">
Your quiz (ID <%= quizID %>) has been submitted.
</div>

<div class="question">
Your score for this quiz is <%= score %> out of <%= total %> possible points, which is <%= percent %>%.<br>

<% if (Score.needsGrading(quizID)) { %>
However, this quiz includes questions that must be manually graded. Check back later to see your updated grade.
<%} else {%>
This score is final. All questions have been automatically graded. 
<% } %> 
</div>

<% DisplayContext dc = new DisplayContext();
dc.setDisplayResponses(true); // display student's responses

Quiz quiz = Database.getQuiz(quizID); 

boolean displayAnswers = quiz.getPolicy().getShowAns() || //display correct answers if policy says to always show or...
		(quiz.getPolicy().getShowAnsOnLastAtt() && Load.getTakenTimes(((User) session.getAttribute("")).getID(), quiz.getId()) + 1 == quiz.getPolicy().getAttemptNum()); 
		//if policy says to show on last attempt and this is the last attempt
dc.setDisplayAnswers(displayAnswers); 

dc.setStudentResponses((StudentResponses) session.getAttribute("StudentResponses")); // give the StudentResponses
Database.getQuiz(quizID).writeHTML(dc);
System.out.print(dc.toString());
out.print(dc.toString()); %>

</div>
</body>
</html>