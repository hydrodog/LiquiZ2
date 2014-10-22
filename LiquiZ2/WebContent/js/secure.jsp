<jsp:useBean id="user" class="org.adastraeducation.liquiz.User" scope="session"/>
<%
  if (!user.isLoggedIn()) {
    response.sendRedirect("Login.jsp");
  }
%>