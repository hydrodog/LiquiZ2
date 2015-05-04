<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	if(org.adastraeducation.liquiz.FormInput.ReadRegexPatterns(request))
		response.sendRedirect("Working.jsp");
%>
<!DOCTYPE html">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Patterns input</title>
<link rel="stylesheet" type="text/css" href="css/textAreaStyles.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/regexTesting.js"></script>

</head>
<body>
	<h1>Enter new Regex patterns</h1>
	<form action="RegexInput.jsp" method="GET">
		<%@ include file="Regex.jsp"%>
		<input type="submit" value="Input Regex Patterns" />
	</form>

	<form name="testPatterns">
		<br>
		<h1>Regular expression test area</h1>
		<div id="textArea" contenteditable>123 abc</div>
		<p>
		<table style="width: 50%">
			<tr>
				<td><b>Strings that match the pattern</b></td>
				<td><b>Strings that do not match the pattern</b></td>
			</tr>
			<tr>
				<td><textarea rows="8" cols="30" name="matched" readonly></textarea></td>
				<td><textarea rows="8" cols="30" name="notMatched" readonly></textarea></td>
			</tr>
		</table>
		<input type="button" value="Check" onclick="check()">
		<input type="button" value="Highlight" onclick="highlight()">

	</form>
</body>
</html>
