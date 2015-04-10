<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%
    if(org.adastraeducation.liquiz.FormInput.ReadStdChoices(request))
    	response.sendRedirect("Working.jsp");
    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Input new Standard Choices</title>
<script src="js/StdChoice.js"></script>
</head>
<body>
<form method="GET" action="StdChoiceInput.jsp">
<table id="StdChoiceTable">
<tr><td>Name:</td><td><input type="text" name="name"/></td></tr>
<tr><td>Choice 1:</td><td><input type="text" name="a1"/></td></tr>
<tr><td>Choice 2:</td><td><input type="text" name="a2"/></td></tr>
<tr><td>Choice 3:</td><td><input type="text" name="a3"/></td></tr>
<tr><td>Choice 4:</td><td><input type="text" name="a4"/></td></tr>
</table>
<input type="button" value="Add more choices" onClick="AddChoices(this)">
<input type="Submit" value="Create Standard Choices">
</form>

</body>
</html>
