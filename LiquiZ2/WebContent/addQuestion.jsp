<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ page import="org.adastraeducation.liquiz.*"%>
<%@ page import="org.adastraeducation.liquiz.util.*"%>

<!-- session problem for quiz!!! -->

<jsp:useBean id="quiz" class="org.adastraeducation.liquiz.Quiz" scope="session"/>

<%= request.getParameter("QuizContext")%>
<%
  (new Quiz()).addQuestion(request);
System.out.println("in addQuestion.jsp");%>
Quiz now has: <%= request.getAttribute("NumberOfQuestions") %> 
questions in  <%= request.getAttribute("NumberOfQuestionContainers") %> question containers.
