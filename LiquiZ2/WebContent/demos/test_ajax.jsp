<%@ page import="java.io.*" %>

<html>
<body>
<% 

BufferedReader r = new BufferedReader(request.getReader());
String line;
while ((line=r.readLine()) != null)
	System.out.println(line);




%>
</body>

</html>