<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
<title>Register</title>

</head>

<body>
	<form method="get" action="register">
		UserName:<input type="text" name="userName"> <br /> 
		Password: <input type="password" name="passwd"> <br /> 
		Password Confirm: <input type="password" name="passwd2"> <br /> 
		EmailAddress: <input type="text" name="email-address"> <br /> 
		<input type="submit" value="Submit" size="12">
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<input type="reset" value="Cancel" size="12">
	</form>
</body>
</html>
