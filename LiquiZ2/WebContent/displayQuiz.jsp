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
DisplayContext dc = new DisplayContext();
// int quizID = Integer.parseInt(request.getParameter("quizID")); // for later
Database.getQuiz(1).writeHTML(dc);
out.print(dc.toString());
%>
</body>
</html>