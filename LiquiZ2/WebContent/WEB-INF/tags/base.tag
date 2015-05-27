<%@ tag description="Base HTML" pageEncoding="UTF-8"%>
<%@attribute name="title" %>
<!DOCTYPE html>
<html>
<head>
	<title>${title} - LiquiZ</title>
	<link rel="stylesheet" type="text/css" href="/Liquiz2/assets/css/red.css">
</head>

<body>
	<section class="header">
		<ul>
			<li><a href="/LiquiZ2/home.jsp">Home</a></li>
			<li><a href="/LiquiZ2/Login.jsp">Login</a></li>
			<li><a href="/LiquiZ2/ManualGradeCode.html">Manual Grade Code</a></li>
		</ul>
	</section>
	<section>
		<jsp:doBody/>	
	</section>
</body>
</html>