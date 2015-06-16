<%@ page import="java.io.*"%>   
  
<%@ page import="java.util.*"%>   
  
<%@ page import="java.sql.*"%>   
 
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>


<%
	int stuid = Integer.parseInt(request.getParameter("stuid"));
	int qzid = Integer.parseInt(request.getParameter("qzid"));
	int newg = Integer.parseInt(request.getParameter("newg"));
    String admin = request.getParameter("admin");

    Connection con = null;   
    Statement stmt = null;   
    ResultSet rs = null;   
    try{   
    	Class.forName("com.mysql.jdbc.Driver");   
       	String dbUrl = "jdbc:mysql://localhost:3306/liquiz";   
       	String dbUser = "root";   
       	String dbPwd = "";   
       	  
       	con = DriverManager.getConnection(dbUrl,dbUser,dbPwd);   
       	  
       	out.println("Connected......");   
       	stmt=con.createStatement();   
       	
       	String value = String.valueOf(stuid) + ", " + String.valueOf(qzid) + ", " + String.valueOf(newg) + ", " + "'" + admin + "'"; 
       	String sql = "call Updatelog(" + value + ")";
       	
       	//out.println(sql);
       	
       	stmt.executeUpdate(sql); //execute query  
       	
       	out.print("Insert successfully!!"); 
       	stmt.close();   
       	con.close();   
    }catch(Exception ex) {   
       	out.print("Connect Error!!<br>"+ex.toString());   
    }    
            
%>