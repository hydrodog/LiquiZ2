/*
 *This is file is for javascript
 */
 
 
/*
 *warning pattern
 */
function showNumberWarning(id,n) {
    var x = $("#"+id).val();
    $("#FW"+id).empty();
    
    eval("var pattern = /[0-9]+.[0-9]{"+n+"}/;");
  
    if (x.match(pattern)==null){
        $("#FW"+id).append("Wrong input!");
    } 
}

function changeQuestion(obj) {
    if (obj.value=="FillIn") {
        document.getElementById("fillin_attribute").style.display="";
        document.getElementById("multichoice_attribute").style.display="none";
    }else{
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("multichoice_attribute").style.display="";
    }
}

function showWarningPatternAttribute(obj) {
    if (obj.checked) {
        document.getElementById("warningPattern_attribute").style.display="";
    }else{
        document.getElementById("warningPattern_attribute").style.display="none";
    }
}

function showRegexQuestionAttribute(obj) {
    if (obj.checked) {
        document.getElementById("regexQuestion_attribute").style.display="";
    }else{
        document.getElementById("regexQuestion_attribute").style.display="none";
    }
}

function showNumberQuestionAttribute(obj) {
    if (obj.checked) {
        document.getElementById("numberQuestion_attribute").style.display="";
    }else{
        document.getElementById("numberQuestion_attribute").style.display="none";
    }
}

function createChoices(obj) {
    var empty="";
    document.getElementById("choices").innerHTML=empty;
    for (var i=0;i<obj.value;i++) {
        empty+="Choices"+(i+1)+"&nbsp&nbsp<input type=\"text\" name=\"choices"+(i+1)+"\"></br>";
    }
    document.getElementById("choices").innerHTML=empty;
}