<%@ page import = "org.adastraeducation.liquiz.*" %>
<%@ page import = "org.adastraeducation.liquiz.test.*" %>
<%@ page import = "com.google.gson.*" %>

<% 
		/* Quiz q1 = TestQuizJavascript.test3(); 
		DisplayContext dc = new DisplayContext();
		q1.writeJS(dc);
		out.println(dc.toString());   */
		
		
		/* GsonBuilder builder = new GsonBuilder();
		builder.setPrettyPrinting().serializeNulls();
		
		Gson gson = builder.create();
		gson.toJson(q1); */
		
		/* GsonBuilder builder = new GsonBuilder();
		builder.setPrettyPrinting().serializeNulls();
		
		Gson gson = builder.create();
		System.out.println(gson.toJson(q1));
 */
 
            
		    Gson gson = new JsonTranslator().getGson();
			Quiz quiz = TestQuizJavascript.test1();
		    String je = gson.toJson(quiz);
		    out.println(je);
			//System.out.println(je);
		    //Quiz quiz1 = gson.fromJson(je,  Quiz.class);
		//	System.out.println("Quiz Object: ");
		//	System.out.println(quiz1);
		
		
			//String je1 = gson.toJson(quiz1);
			//out.println(je1);
%>	  


