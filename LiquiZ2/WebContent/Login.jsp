<jsp:useBean id="user" class="org.adastraeducation.liquiz.User" scope="session"/>
<%
  user.setId(request.getParameter("id"));  
  user.setPasswd(request.getParameter("passwd"));  
  if (user.isLoggedIn()) {
  response.sendRedirect("home.jsp");
  }
%>
  <form method="get" action="Login.jsp">
  Userid:<input type="text" name="id">
  <br/>
  Password: <input type="password" name="passwd">
  <br/>
  <input type="submit">
  </form>
  