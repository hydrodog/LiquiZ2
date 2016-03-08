<%@ page import = "org.adastraeducation.liquiz.*" %>
<%@ page import = "org.adastraeducation.liquiz.test.*" %>
<%@ page import = "com.google.gson.*" %>

<% 
 
            
		    Gson gson = new JsonTranslator().getGson();
			Quiz quiz = TestQuizJavascript.test2();
		    String je = gson.toJson(quiz);
		    System.out.println(je);
		    //Quiz quiz1 = gson.fromJson(je,  Quiz.class);
		
			//String je1 = gson.toJson(quiz1);
			//out.println(je1);
%>	  

