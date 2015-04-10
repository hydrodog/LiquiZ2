<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Patterns input</title>
	<%
	if(org.adastraeducation.liquiz.FormInput.ReadRegexPatterns(request))
	response.sendRedirect("Working.jsp");
%>		
</head>
<body>
<h1>Enter new Regex patterns</h1>
<form  action = "RegexInput.jsp" method = "GET">
<%@ include file="Regex.jsp" %>
    <input type = "submit" value = "Input Regex Patterns"/> 
</form>
</body>
</html>
