<%@ tag description="Base HTML" pageEncoding="UTF-8"%>
<%@attribute name="title" %>
<!DOCTYPE html>
<html>
<head>
	<title>${title} - LiquiZ</title>
</head>
<body>
	<section>
		<jsp:doBody/>	
	</section>
</body>
</html>