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
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multidropdown_attribute").style.display="none";
        document.getElementById("multiradio_attribute").style.display="none";		
        document.getElementById("multianswer_attribute").style.display="none";
        
    }else if (obj.value=="Essay"){
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="";
        document.getElementById("multidropdown_attribute").style.display="none";
		document.getElementById("multiradio_attribute").style.display="none";		
        document.getElementById("multianswer_attribute").style.display="none";

    }
	else if (obj.value=="MultiChoice-Dropdown"){
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multidropdown_attribute").style.display="";
		document.getElementById("multiradio_attribute").style.display="none";		
        document.getElementById("multianswer_attribute").style.display="none";

    }else if (obj.value=="MultiChoice-Radio"){
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multidropdown_attribute").style.display="none";
		document.getElementById("multiradio_attribute").style.display="";		
        document.getElementById("multianswer_attribute").style.display="none";

    }else {
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multidropdown_attribute").style.display="none";
		document.getElementById("multiradio_attribute").style.display="none";		
        document.getElementById("multianswer_attribute").style.display="";
    }
    
}

var maxwords = 120;  
function check_length(obj, cnt, rem)  

{  
    var ary = obj.value.split(" ");  
    var len = ary.length;  
    cnt.innerHTML = len;  
    rem.innerHTML = maxwords - len;  
    if (len > maxwords) {  
        alert("Message in '" + obj.name + "' limited to " + maxwords + " words.");  
        ary = ary.slice(0,maxwords-1);  
        obj.value = ary.join(" ");  
        cnt.innerHTML = maxwords;  
        rem.innerHTML = 0;  
        return false;  
    }  
    return true;  
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

function createDropDownChoices(obj) {
    var empty="";
    document.getElementById("dropdown").innerHTML=empty;
    for (var i=0;i<obj.value;i++) {
        empty+="</br>Option "+(i+5)+"&nbsp&nbsp<input type=\"text\" name=\"dropdown_choices"+(i+5)+"\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type=\"radio\" name=\"dropdown_choices\" value =\"choice"+(i+5)+"\" ></br>";
    }
    document.getElementById("dropdown").innerHTML=empty;
}

function createRadioChoices(obj) {
    var empty="";
    document.getElementById("radio").innerHTML=empty;
    for (var i=0;i<=obj.value;i++) {
        empty+="</br>Option "+(i+5)+"&nbsp&nbsp<input type=\"text\" name=\"radio_choices"+(i+5)+"\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type=\"radio\" name=\"radio_choices\" value =\"choice"+(i+5)+"\" ></br>";
    }
    document.getElementById("radio").innerHTML=empty;
}

function createMultiChoices(obj) {
    var empty="";
    document.getElementById("multichoices").innerHTML=empty;
    for (var i=0;i<obj.value;i++) {
        empty+="</br>Option "+(i+5)+"&nbsp&nbsp<input type=\"text\" name=\"multi_choices"+(i+5)+"\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type=\"checkbox\" name=\"multi_choices\" value =\"choice"+(i+5)+"\" ></br>";
    }
    document.getElementById("multichoices").innerHTML=empty;
}