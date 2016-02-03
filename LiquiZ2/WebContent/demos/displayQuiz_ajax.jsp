<%@page import="org.adastraeducation.liquiz.*" %>
<% 
// TODO: where to put image?
/* 	String pwd = new java.io.File(".").getCanonicalPath();
	out.println(pwd); */

	DisplayContext dc = new DisplayContext();
	Quiz quiz = org.adastraeducation.liquiz.test.TestQuizJavascript.test1();
// int quizID = Integer.parseInt(request.getParameter("quizID")); // TODO
//Database.getQuiz(1).writeJS(dc);
quiz.writeJS(dc);
out.print(dc.toString());
%>
