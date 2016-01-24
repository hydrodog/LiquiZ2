<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import='org.adastraeducation.liquiz.*, org.adastraeducation.liquiz.database.*' %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Quiz</title>
</head>
<body>
<% 
// TODO: where to put image?
/* 	String pwd = new java.io.File(".").getCanonicalPath();
	out.println(pwd); */
// ^ this gave me /Applications/Eclipse JEE/Eclipse JEE.app/Contents/MacOS

DisplayContext dc = new DisplayContext();
	Quiz quiz = org.adastraeducation.liquiz.test.TestQuizJavascript.test1();
// int quizID = Integer.parseInt(request.getParameter("quizID")); // TODO
//Database.getQuiz(1).writeJS(dc);
quiz.writeJS(dc);
out.print(dc.toString());
%>
</body>
</html>