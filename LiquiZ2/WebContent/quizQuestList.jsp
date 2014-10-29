<%@ include file="secure.jsp"%>


<!DOCTYPE html>

<body>

<form action="">
<div class= "box">

<div class= "column1"style="width:40%; float: left" id ="column1">
<div>Quiz List</div>
<table>

<div>&nbsp</div>

<button type="button" style="width: 25%"> New Quiz</button>

<div>&nbsp</div>

<tr class="Qz">
<td style="width: 2%"><button type="button">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QzChk" id="Qz1"></td>
<td>593_Quiz1_Sorting</td>
</tr>
<tr class="Qz">
<td style="width: 2%"><button type="button">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QzChk" id="Qz2"></td>
<td>593_Quiz2_Searching</td>
</tr>
<tr class="Qz">
<td style="width: 2%"><button type="button">Edit</button></td>
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

<div>&nbsp</div>
<div>&nbsp</div>

<div><input type="text" name="QuizName" value="593_Quiz1_Sorting"></div>
<div>&nbsp</div>
<table >
<tr>
<td style="width: 2%"><button type="button">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q1"></td>
<td>Bubble Sort Complexity</td>
</tr>
<tr>
<td style="width: 2%"><button type="button">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q2"></td>
<td>Quick Sort Complexity</td>
</tr>
<tr>
<td style="width: 2%"><button type="button">Edit</button></td>
<td style="width: 2%"><input type="checkbox" class = "QsChk" id="Q3"></td>
<td>Quick sort pivot value</td>
</tr>
</table>
<div>&nbsp</div>
<button type="button" style="width: 8.7%" id="AllQues">All</button>
<button type="button" style="width: 8.7%">Delete</button>
<button type="button" style="width: 8.7%" id="NoQues">Cancel</button>
</div>
</div>
</form>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">

$("#AllQz").click(function(){
	$("#column1 .QzChk").each(function(){
    if(!$(this).prop("checked")){
        $(this).prop( "checked", true );
    }
})
});

$("#NoQz").click(function(){
	$("#column1 .QzChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).prop( "checked", false );
	    }
	})
});

$("#DelQz").click(function(){
	confirm("Are you sure you want to delete the quizzes?")
	if("Yes"){
	$("#column1 .QzChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).closest('tr').hide();
	    }
	})
	}
});

$("#AllQues").click(function(){
	$("#column2 .QsChk").each(function(){
    if(!$(this).prop("checked")){
        $(this).prop( "checked", true );
    }
})
});

$("#NoQues").click(function(){
	$("#column2 .QsChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).prop( "checked", false );
	    }
	})
});

$("#DelQues").click(function(){
	confirm("Are you sure you want to delete the questions?")
	if("Yes"){
	$("#column2 .QsChk").each(function(){
	    if($(this).prop("checked")){
	        $(this).closest('tr').hide();
	    }
	})
	}
});
</script>