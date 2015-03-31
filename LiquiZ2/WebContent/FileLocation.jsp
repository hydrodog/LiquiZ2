<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body>
<%@ page import="java.util.*" %>
<jsp:useBean id="formHandler" class="org.adastraeducation.liquiz.NamedObjects" scope="request">
<jsp:setProperty name="formHandler" property="*"/>
<jsp:setProperty name="formHandler" property="fileLocation" value='<%=getServletContext().getResource("/").toURI().getPath()%>'/>
</jsp:useBean>
</body>
</html>
