<%@ page import="java.io.*" %>
<%@ page import = "org.adastraeducation.liquiz.util.*" %>
<%@ page import="org.adastraeducation.liquiz.*" %>
<%@ page import="org.adastraeducation.liquiz.test.*" %>
<%@ page import="com.google.gson.Gson" %>

<html>
<body>
<% 


	ReadsInFromPost.printOut(request);
	
	/* BufferedReader r = new BufferedReader(request.getReader());
	String line, jsonString = "";
	while ((line=r.readLine()) != null){
		jsonString += line;
	} 
		
	System.out.println(jsonString);  */

	/* new JsonTranslator();
	Quiz quiz = TestQuizJavascript.test2();
	String je = "";
	je = gson.toJson(quiz);
	System.out.println(je);
	
	Quiz quiz1 = gson.fromJson(je, Quiz.class);
	System.out.println("Quiz Object: ");
	System.out.println(quiz1); */
	
	/* new JsonTranslator();
	Gson gson = new JsonTranslator().getGson();
	Quiz quiz = TestQuizJavascript.test2();
	String je = "";
	je = gson.toJson(quiz);
	System.out.println(je);
	
	Quiz quiz1 = gson.fromJson(je, Quiz.class);
	System.out.println("Quiz Object: ");
	System.out.println(quiz1); */

	

%>
</body>

</html>