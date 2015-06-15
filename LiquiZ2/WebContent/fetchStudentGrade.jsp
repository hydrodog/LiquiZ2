<%@ page import="java.io.*"%>   
  
<%@ page import="java.util.*"%>   
  
<%@ page import="java.sql.*"%>   
 
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<%
	String course = request.getParameter("course");
	//String term = request.getParameter("term");

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
       	
        String sql = "select grade from studentGrades where course = " + course;
        //out.println(sql);
        rs = stmt.executeQuery(sql); //execute query  
        while(rs.next())   
          	out.println(rs.getDouble(1));  
       	stmt.close();   
       	con.close();   
    }catch(Exception ex) {   
       	out.print("Connect Error!!<br>"+ex.toString());   
    }    
    //http.open('get', 'insertGrade.jsp?course='+course+'&term=' +term+'&g1=' +aplus+'&g2=' +a+'&g3=' +aminus+'&g4=' +bplus+'&g5=' +b+'&g6=' +bminus+'&g7=' +cplus+'&g8=' +c+'&g9=' +cminus+'&g10=' +dplus+'&g11=' +d+'&g12=' +dminus+'&nocache = '+nocache);            
%>


