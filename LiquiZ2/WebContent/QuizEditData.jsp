<%@ page import="java.io.*"%>  
<%@ page import="java.util.*"%>   
<%@ page import="java.util.List"%>   
<%@ page import="java.nio.file.*"%>   
 

<%

/* Path path = Paths.get("demos/QuizDemo_ajax.jsp").toAbsolutePath();
out.println(path);
 */
List<String> list = Files.readAllLines(Paths.get("/Users/ying_air/git/LiquiZ2/LiquiZ2/WebContent/demos/QuizDemo_ajax.jsp"));
list.add(list.size() - 1, request.getParameter("123"));
Files.write(Paths.get("/Users/ying_air/git/LiquiZ2/LiquiZ2/WebContent/demos/QuizDemo_ajax.jsp"), list);


%> 
