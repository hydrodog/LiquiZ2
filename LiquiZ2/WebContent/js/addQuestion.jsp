<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ page import="org.adastraeducation.liquiz.*"%>
<%@ page import="org.adastraeducation.liquiz.util.*"%>

<jsp:useBean id="quiz" class="org.adastraeducation.liquiz.Quiz" scope="session"/>

<%
	Util util = new Util();
	util.addQuestion(quiz, request);
    
%>

<%= util.showQuiz(quiz) %>
Quiz now has: <%= quiz.getQuestionCount() %> questions in <%= quiz.getQuestionContainerCount() %> question containers.