<%@ include file="secure.jsp"%>


<!DOCTYPE html>

<body>

<form action="">
<div class= "box">

<div class= "column1"style="width:40%; float: left" id ="column1">
<div>Quiz List</div>
<table id="tblQuiz">

<div>&nbsp;</div>

<button type="button" style="width: 25%" id ="NewQz"> New Quiz</button>

<div>&nbsp;</div>

<tr class="Qz">
<td style="width: 2%"><button type="button" class="EditQz">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QzChk" id="Qz1"></td>
<td>593_Quiz1_Sorting</td>
</tr>
<tr class="Qz">
<td style="width: 2%"><button type="button" class="EditQz">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QzChk" id="Qz2"></td>
<td>593_Quiz2_Searching</td>
</tr>
<tr class="Qz">
<td style="width: 2%"><button type="button" class="EditQz">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QzChk" id="Qz3"></td>
<td>593_Quiz3_Matrix</td>
</tr>
</table> 

<p></p>

<button type="button" style="width: 13%" id="AllQz">All</button>
<button type="button" style="width: 13%" id="DelQz">Delete</button>
<button type="button" style="width: 13%" id="NoQz">Cancel</button>
</div>

<div class= "column2" style = "width: 60%; float: left" id = "column2">

<div>&nbsp;</div>
<div>&nbsp;</div>

<div>
<input type="text" name="QuizName" value="" id ="QuizName">
<button type="button" style="width: 12%" id ="NewQs"> New Question</button>
</div>

<div>&nbsp;</div>
<table id="tblQues">
<tr>
<td style="width: 2%"><button type="button" class="EditQs">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q1"></td>
<td>Bubble Sort Complexity</td>
</tr>
<tr>
<td style="width: 2%"><button type="button" class="EditQs">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q2"></td>
<td>Quick Sort Complexity</td>
</tr>
<tr>
<td style="width: 2%"><button type="button" class="EditQs">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q3"></td>
<td>Quick sort pivot value</td>
</tr>
</table>
<div>&nbsp;</div>
<button type="button" style="width: 8.7%" id="AllQues">All</button>
<button type="button" style="width: 8.7%" id="DelQues">Delete</button>
<button type="button" style="width: 8.7%" id="NoQues">Cancel</button>
</div>
</div>
</form>

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">

var QuizCount = $("#tblQuiz tr").length;
var QuesCount = $("#tblQues tr").length;

$(document).ready(function(){
	$("#column2").hide();
});

$(".EditQz").click(function(){
	$("#column2").show();
	var name = $(this).closest('tr').children(':last').text();
	$("#QuizName").val(name);
});

$("#AllQz").click(function(){
	$("#column1 .QzChk").each(function(){
    if(!$(this).prop("checked")){
        $(this).prop( "checked", true );
    }
});
});

$("#NoQz").click(function(){
	$("#column1 .QzChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).prop( "checked", false );
	    }
	});
});

$("#DelQz").click(function(){
	var changed = false;
	$("#column1 .QzChk").each(function(){
	    if($(this).prop("checked")){
	       changed = true;
	    }
	});
	if(changed){
	if(confirm("Are you sure you want to delete the quizzes?")){
	$("#column1 .QzChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).closest('tr').hide();
	    }
	});
	}
	}
});

$("#NewQz").click(function(){
	$('#tblQuiz').append("<tr class='Qz'><td style='width: 2%'><button type='button' class='EditQz'>Edit</button></td><td style='width: 2%'><input type='checkbox' class = 'QzChk'></td><td><input type='text' class='newQzName'></td></tr>");
});

$("#AllQues").click(function(){
	$("#column2 .QsChk").each(function(){
    if(!$(this).prop("checked")){
        $(this).prop( "checked", true );
    }
});
});

$("#NoQues").click(function(){
	$("#column2 .QsChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).prop( "checked", false );
	    }
	});
});

$("#DelQues").click(function(){
	var changed = false;
	$("#column2 .QsChk").each(function(){
	    if($(this).prop("checked")){
	       changed = true;
	    }
	});
	if(changed){
	if(	confirm("Are you sure you want to delete the questions?")){
	$("#column2 .QsChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).closest('tr').hide();
	    }
	});
	}
	}
});

$("#NewQs").click(function(){
	$('#tblQues').append("<tr class='Qs'><td style='width: 2%'><button type='button' class='EditQs'>Edit</button></td><td style='width: 2%'><input type='checkbox' class = 'QsChk'></td><td><input type='text' class='newQsName'></td></tr>");
});

</script>
