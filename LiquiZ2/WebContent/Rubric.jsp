<form name="rubric" method="get" action="editRubric.jsp">
<table>
<tr><td>Name</td><td><input type="text" name="name"/>
<select name="existingName" onChange="selectExisting(this)">
<option value="">- choose existing or type a new one -</option>
<option value=""></option>
<option value=""></option>
</select></td></tr>
<tr><td></td><td><input type="number" name="attempts" value="1"/></td></tr>
<tr><td>Duration (seconds)</td><td><input type="number" name="duration" value="0"/></td></tr>
<tr><td>Shuffle Answers</td><td>
<select name="shuffleAnswers">
<option value="T">Yes</option>
<option value="F">No</option>
</select>
</td></tr>
<tr><td>Access Code</td><td><input type="text" name="name"/></td></tr>
</table>
</form> 