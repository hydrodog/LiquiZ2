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
<link href="./css/RegexTester.css" rel="stylesheet" type="text/css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>
	(function(i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function() {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o), m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js',
			'ga');

	ga('create', 'UA-56108398-1', 'auto');
	ga('send', 'pageview');
</script>
</head>
<body>
<ul>
		<li class="hidden"><input id="flagG" type="checkbox"
			checked="checked" /><label for="flagG">Global</label> <span
			class="flag">(g)</span></li>
	
		<li class="hidden"><input id="highlightSyntax" type="checkbox" /><label for="highlightSyntax">Highlight regex syntax</label></li>
		<li class="hidden"><input id="highlightMatches" type="checkbox"
			checked="checked" /><label for="highlightMatches">Highlight
				matches</label></li>
	</ul>
	
	<h1>Enter new Regex patterns</h1>
	<form  action = "RegexInput.jsp" method = "GET">
		<%@ include file="Regex.jsp" %>
		<div id="body">
		<strong>Regex testing area</strong>
			<div id="patternarea" class="matchingArea">
				<textarea id="Rpattern" tabindex="1" spellcheck="false">Enter Regular expression here </textarea>
			</div>
			<div id="matcharea" class="matchingArea">
				<textarea id="stringsToCheck" tabindex="2" spellcheck="false">This is Regex testing area. Input to check what your regex pattern matches</textarea>
			</div>
		</div>
		<table style="width: 50%">
			<tr>
				<td><b>Strings that match the pattern</b></td>
				<td><b>Strings that do not match the pattern</b></td>
			</tr>
			<tr>
				<td><textarea rows="8" cols="30" name="matched" readonly></textarea></td>
				<td><textarea rows="8" cols="30" name="notMatched" readonly></textarea></td>
			</tr>
		</table><br>

		<input type="button" value="Check String match at each line break" onclick="PatternChecktest()">
		<p>
		<input type = "submit" value = "Input Regex Patterns"/>
	</form>
	<script src="./assets/js1/xregexp.js"></script>
	<script src="./assets/js1/CheckRegex.js"></script>

</body>
</html>
