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
	for (int i = 1; i <= 13; i++) {
		score.add(request.getParameter("g" + String.valueOf(i)));
	}
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
       	
       	for (int i = 0; i < 13; i++) {
       		if (score.get(i) != "") {
           		String value = String.valueOf(course) + ", " +  "'" + term + "'";
           		value += ", " + score.get(i) + ", " + "'" + grade[i] + "'";
           		String sql = "call InsertGradingScheme(" + value + ")";
               	//out.println(sql);
               	stmt.executeUpdate(sql); //execute query  
               	out.print("Insert successfully!!");
       		}
       	}
       	 
       	stmt.close();   
       	con.close();   
    }catch(Exception ex) {   
       	out.print("Connect Error!!<br>"+ex.toString());   
    }    
    //http.open('get', 'insertGrade.jsp?course='+course+'&term=' +term+'&g1=' +aplus+'&g2=' +a+'&g3=' +aminus+'&g4=' +bplus+'&g5=' +b+'&g6=' +bminus+'&g7=' +cplus+'&g8=' +c+'&g9=' +cminus+'&g10=' +dplus+'&g11=' +d+'&g12=' +dminus+'&nocache = '+nocache);            
%>


