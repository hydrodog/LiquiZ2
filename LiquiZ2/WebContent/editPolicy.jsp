<form name="policy" method="get" action="editPolicy.jsp">
<table>
<tr><td>Name</td><td><input type="text" name="name"/>
<select name="existingName" onChange="selectExisting(this)">
<option value="">- choose existing or type a new one -</option>
<option value=""></option>
<option value=""></option>
</select></td>
<td><input type="button" value="delete"/><input type="button" value="copy"/></td></tr>
<tr><td>Attempts permitted</td><td><input type="number" name="attempts" value="1"/></td></tr>
<tr><td>Duration (seconds)</td><td><input type="number" name="duration" value="0"/></td></tr>
<tr><td>Show answers</td><td>
<select name="showans">
<option value="T">Yes</option>
<option value="F">No</option>
</td></tr>
<tr><td>Scored</td><td>
<select name="scored">
<option value="T">Yes</option>
<option value="F">No</option>
</td></tr>
<tr><td>Shuffle Questions</td><td>
<select name="shuffleQuestions">
<option value="T">Yes</option>
<option value="F">No</option>
</td></tr>
<tr><td>Shuffle Answers</td><td>
<select name="shuffleAnswers">
<option value="T">Yes</option>
<option value="F">No</option>
</td></tr>
<tr><td>Access Code</td><td><input type="text" name="name"/></td></tr>
</table>
</form> 