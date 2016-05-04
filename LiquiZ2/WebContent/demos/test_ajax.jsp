<%@ page import="java.io.*" %>
<%@ page import = "org.adastraeducation.liquiz.util.*" %>
<%@ page import="org.adastraeducation.liquiz.*" %>
<%@ page import="org.adastraeducation.liquiz.test.*" %>
<%@ page import="com.google.gson.Gson" %>


<% 

	String je = "";

	je = ReadsInFromPost.JsonString(request);
	
	out.println(je);
	
	

%>
