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
        document.getElementById("multichoice_attribute").style.display="none";
        document.getElementById("multianswer_attribute").style.display="none";
        
    }else if (obj.value=="Essay"){
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="";
        document.getElementById("multichoice_attribute").style.display="none";
        document.getElementById("multianswer_attribute").style.display="none";

    }
	else if (obj.value=="MultiChoice"){
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multichoice_attribute").style.display="";
        document.getElementById("multianswer_attribute").style.display="none";

    }else {
        document.getElementById("fillin_attribute").style.display="none";
        document.getElementById("essay_attribute").style.display="none";
        document.getElementById("multichoice_attribute").style.display="none";
        document.getElementById("multianswer_attribute").style.display="";
    }
    
}

function changeSource(obj) {
	if (obj.value=="None") {
        document.getElementById("image_attribute").style.display="none";
        document.getElementById("video_attribute").style.display="none";
        document.getElementById("audio_attribute").style.display="none";
        
    }else if (obj.value=="Image") {
        document.getElementById("image_attribute").style.display="";
        document.getElementById("video_attribute").style.display="none";
        document.getElementById("audio_attribute").style.display="none";
        
    }else if (obj.value=="Video"){
        document.getElementById("image_attribute").style.display="none";
        document.getElementById("video_attribute").style.display="";
        document.getElementById("audio_attribute").style.display="none";

    }else {
        document.getElementById("image_attribute").style.display="none";
        document.getElementById("video_attribute").style.display="none";
        document.getElementById("audio_attribute").style.display="";
    }
    
}

function showImage(){
	var empty="";
    document.getElementById("image_src").innerHTML=empty;

	empty = "<img src= \"assets\img\image_src \" alt= \"image_src\" width=\"600\" height=\"450\">";
    document.getElementById("image_src").innerHTML=empty;

}


function showVideo(){
	var empty="";
    document.getElementById("video_src").innerHTML=empty;

	empty = "<img src= assets\img\" image_src \" alt= \"image_src\" width=\"42\" height=\"42\">";

}

function showAudio(){
	var empty="";
    document.getElementById("audio_src").innerHTML=empty;

	empty = "<img src= assets\img\" image_src \" alt= \"image_src\" width=\"42\" height=\"42\">";
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

function createMultiChoices(obj) {
    var empty="";
    document.getElementById("multichoices").innerHTML=empty;
    for (var i=0;i<obj.value;i++) {
        empty+="Choices"+(i+1)+"&nbsp&nbsp<input type=\"text\" name=\"multichoices"+(i+1)+"\"></br>";
    }
    document.getElementById("multichoices").innerHTML=empty;
}