<%@ page import="java.io.*"%>   
  
<%@ page import="java.util.*"%>   
  
<%@ page import="java.sql.*"%>   
 
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
 
<html>   
  
<head>   
  
<title>ViewGrade.jsp</title>   
  
</head>   
  
<body>   
  
	<sql:setDataSource var="logfile" driver="com.mysql.jdbc.Driver"
	     url="jdbc:mysql://localhost/liquiz"
	     user="root"  password=""/>
	 
	<sql:query dataSource="${logfile}" var="result">
	select student, gradeScheme(grade, course) as grade from studentgrades;
	</sql:query>
	
  	<table border="1" width="100%">
	<tr>
	   <th>StudentID</th>
	   <th>Grade</th>

	</tr>
	<c:forEach var="row" items="${result.rows}">
	<tr>
	   <td><c:out value="${row.student}"/></td>
	   <td><c:out value="${row.grade}"/></td>
	</tr>
	</c:forEach>
	</table>
</body>   
  
</html>  
  
</pre>  