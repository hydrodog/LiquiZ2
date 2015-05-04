<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;">
<title>codeTest</title>
</head>
<body>
	<form method="Get" action="runCode">
		<div id="code_attribute" align="left">

			Programming Language <select name="code_type" size="1">
				<option value="C++">C++</option>
				<option value="Java">Java</option>

			</select> <br/>
			<div>
				Type your Code<br/>
				<textarea name="code_text" rows="10" cols="100"></textarea>
			</div>
		</div>
		<div align="left">
			<input type="submit" value="Submit" size="12">
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="reset" value="Cancel"
				size="12">
		</div>
	</form>
</body>
</html>