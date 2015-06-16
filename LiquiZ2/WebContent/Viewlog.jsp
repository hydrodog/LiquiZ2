<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>   
  
<%@ page import="java.util.*"%>   
  
<%@ page import="java.sql.*"%>   
 
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
 
<html>   
  
<head>   
  
<title>Viewlog.jsp</title>   
  
</head>   
  
<body>   
  
<%--   
  
Connection con = null;   
  
Statement stmt = null;   
  
ResultSet rs = null;   
  
try{   
  
	Class.forName("com.mysql.jdbc.Driver");   
	  
	String dbUrl = "jdbc:mysql://localhost:3306/demo";   
	  
	String dbUser = "root";   
	  
	String dbPwd = "";   
	  
	con = DriverManager.getConnection(dbUrl,dbUser,dbPwd);   
	  
	out.println("Connected......");   
	  
	stmt=con.createStatement();   
	
	String sql = "select * from log";
	
	rs=stmt.executeQuery(sql); //execute query  
	  
	if(rs.next())  
	  
	{  
	
		out.println("student" + "\t" + "logTime" + "\t\t\t" + "originalGrade" + "\t" + "newGrade" + "\t" + "change" + "\t" + "admin");
		out.println(rs.getString(1) + "\t" + rs.getString(2) + "\t" + rs.getInt(3) + "\t\t" + rs.getInt(4) + "\t\t" + rs.getInt(5) + "\t" + rs.getString(6));  
	}   
	stmt.close();   
	con.close();   
}catch(Exception ex)   
{   
	out.print("Connect Errorï¼ï¼<br>"+ex.toString());   
}   
  
--%>   
	<sql:setDataSource var="logfile" driver="com.mysql.jdbc.Driver"
	     url="jdbc:mysql://localhost/liquiz"
	     user="root"  password=""/>
	 
	<sql:query dataSource="${logfile}" var="result">
	SELECT * from log;
	</sql:query>
	
  	<table border="1" width="100%">
	<tr>
	   <th>First Name</th>
	   <th>Last Name</th>
	   <th>UserID</th>
	   <th>QuizID</th>
	   <th>log date</th>
	   <th>old score</th>
	   <th>new score</th>
	   <th>change point</th>
	   <th>admin</th>
	</tr>
	<c:forEach var="row" items="${result.rows}">
	<tr>
	   <td><c:out value="${row.firstName}"/></td>
	   <td><c:out value="${row.lastName}"/></td>
	   <td><c:out value="${row.userID}"/></td>
	   <td><c:out value="${row.quizID}"/></td>
	   <td><c:out value="${row.date}"/></td>
	   <td><c:out value="${row.oldScore}"/></td>
	   <td><c:out value="${row.newScore}"/></td>
	   <td><c:out value="${row.change}"/></td>
	   <td><c:out value="${row.admin}"/></td>
	</tr>
	</c:forEach>
	</table>
</body>   
  
</html>  
  
</pre>  