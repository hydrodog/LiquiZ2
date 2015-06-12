<%@ page import="java.io.*"%>   
  
<%@ page import="java.util.*"%>   
  
<%@ page import="java.sql.*"%>   
 
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>

<%
	List<String> score = new ArrayList<String>();
	String[] grade = {"A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"};
	int course = Integer.parseInt(request.getParameter("course"));
	String term = request.getParameter("term");

	//String aplus = request.getParameter("aplus");
	//String a = request.getParameter("a");
	//int aminus = Integer.parseInt(request.getParameter("aminus"));

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
       	
       	String value = String.valueOf(course) + " and term = " +  "'" + term + "'";
        String sql = "select score, grade from gradingscheme where course = " + value;
        //out.println(sql);
        rs = stmt.executeQuery(sql); //execute query  
        while(rs.next())   
          	out.println(rs.getInt(1) + "&" + rs.getString(2));  
       	stmt.close();   
       	con.close();   
    }catch(Exception ex) {   
       	out.print("Connect Error!!<br>"+ex.toString());   
    }    
    //http.open('get', 'insertGrade.jsp?course='+course+'&term=' +term+'&g1=' +aplus+'&g2=' +a+'&g3=' +aminus+'&g4=' +bplus+'&g5=' +b+'&g6=' +bminus+'&g7=' +cplus+'&g8=' +c+'&g9=' +cminus+'&g10=' +dplus+'&g11=' +d+'&g12=' +dminus+'&nocache = '+nocache);            
%>


