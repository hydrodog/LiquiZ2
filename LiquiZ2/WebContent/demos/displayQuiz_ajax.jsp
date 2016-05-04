<%@ page import = "org.adastraeducation.liquiz.*" %>
<%@ page import = "org.adastraeducation.liquiz.test.*" %>
<%@ page import = "com.google.gson.*" %>


<% 
 
            
		    Gson gson = JsonTranslator.getGson();
			Quiz quiz = TestQuizJavascript.test2();
		    String je = gson.toJson(quiz);
		    out.println(je);
%>	  


