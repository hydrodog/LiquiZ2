<%
// delete the session and send user back to the login page.s
  session.invalidate();
  response.sendRedirect("Login.jsp");
%>