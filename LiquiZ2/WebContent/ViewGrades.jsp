<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<%-- Author: [Jack] --%>

<t:base>
<jsp:attribute name="title">
	<%-- The title of your page goes here --%>
	Student Grades
</jsp:attribute>
	
<jsp:body>
	<%-- Your code goes here --%>
	<h1>Grades for Jack Tan</h1>
	<table border="1">
		<tr>
			<th>Name</th>
			<th>ID</th>
			<th>Email</th>
		</tr>
		<tr>
    		<td>Jack Tan</td>
    		<td>12345678</td>
    		<td>jacktan@jacktan.com</td>
  		</tr>
  		<tr>
		    <th>Assignment</th>
		    <th>Due</th>
		    <th>Score</th>
		    <th>Out of</th>
		    <th></th>
  		</tr>
  		<tr>
		    <td>HW1</td>
		    <td>May 20 by 11:59pm</td>
		    <td>0</td>
		    <td>100</td>
		    <td>Scoring details</td>
  		</tr>
  		<tr>
		    <td>HW2</td>
		    <td>May 27 by 11:59pm</td>
		    <td>0</td>
		    <td>100</td>
		    <td>Scoring details</td>
  		</tr>
  		<tr>
		    <td>HW3</td>
		    <td>Jun 3 by 11:59pm</td>
		    <td>0</td>
		    <td>100</td>
		    <td>Scoring details</td>
  		</tr>				
	</table>
</jsp:body>
</t:base>