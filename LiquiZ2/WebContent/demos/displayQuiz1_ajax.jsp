<%@ page import = "org.adastraeducation.liquiz.*" %>
<%@ page import = "org.adastraeducation.liquiz.test.*" %>
<%@ page import = "com.google.gson.*" %>

<% 
			JsonTranslator jt = new JsonTranslator();
			Gson gson = jt.getGson();
			Quiz quiz = TestQuizJavascript.test1();
			String je = gson.toJson(quiz);
			System.out.println(je);
			//Quiz quiz1 = gson.fromJson(je,  Quiz.class);
			
			//String je1 = gson.toJson(quiz1);
			//out.println(je1);
            
%>	  


