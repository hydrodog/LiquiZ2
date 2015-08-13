/*
 * Quiz Editor (part of the Quiz class)
 * author: Ying Zhao

 * reorganized and refactored Dov Kruger and Asher Davidson 8/12/2015
 */

//TODO: Move everything INTO YOUR CLASS. These should not be global variables.


QuizEdit.newid = 0;

function QuizEdit() {
    this.body = document.getElementById("container");
    this.body.className = "quizEditor";
}

function oneMCDDOption(parent, id){
    var optionLine = Util.div(null, id + 'o');
    var t = document.createTextNode("Possible Answer: ");
    var opt = Util.input("text", null,  id + 't');
    var checkbox = Util.input("checkbox", null, id + 'c');
    var deleteButton = Util.button("Delete this option", null, id + 'd', function(){
	$('#' + id + 'o').remove();
    })
    var linebreak = Util.br();
    checkbox.onclick = function(){addClassCheck(this, checkbox.id)};
    optionLine.appendChild(t);
    optionLine.appendChild(opt);
    optionLine.appendChild(checkbox);
    optionLine.appendChild(deleteButton);
    optionLine.appendChild(linebreak);
    parent.appendChild(optionLine);
}

function oneMCROption(parent, id){
    var optionLine = Util.div(null, id + 'o');
    var t = document.createTextNode("Possible Answer: ");
    var opt = Util.input("text", null,  id + 't');
    var radio = Util.input("radio", null, id + 'r');
    var deleteButton = Util.button("Delete this option", null, id + 'd', function(){
	$('#' + id + 'o').remove();
    })
    var linebreak = Util.br();
    optionLine.appendChild(t);
    optionLine.appendChild(opt);
    optionLine.appendChild(radio);
    optionLine.appendChild(deleteButton);
    optionLine.appendChild(linebreak);
    parent.appendChild(optionLine);
}

function oneMAOption(parent, id){
    var optionLine = Util.div(null, id + 'o');
    var t = document.createTextNode("Possible Answer: ");
    var opt = Util.input("text", null,  id + 't');
    var checkbox = Util.input("checkbox", null, id + 'c');
    var deleteButton = Util.button("Delete this option", null, id + 'd', function(){
	$('#' + id + 'o').remove();
    })
    var linebreak = Util.br();
    checkbox.onclick = function(){};
    optionLine.appendChild(t);
    optionLine.appendChild(opt);
    optionLine.appendChild(checkbox);
    optionLine.appendChild(deleteButton);
    optionLine.appendChild(linebreak);
    parent.appendChild(optionLine);
}

function oneSurveyOption(parent, id){
    var optionLine = Util.div(null, id + 'o');
    var t = document.createTextNode("Possible Answer: ");
    var opt = Util.input("text", null,  id + 't');
    // var addNewChoice = Util.button("Add new option below", null, null, function(){
    //  oneSurveyOption(parent, id+1);
    // });
    // var deleteButton = Util.button("Delete this option", null, null, function(){
    //  $('#' + id + 'o').remove();
    // })
    var linebreak = Util.br();
    optionLine.appendChild(t);
    optionLine.appendChild(opt);
    // optionLine.appendChild(addNewChoice);
    // optionLine.appendChild(deleteButton);
    optionLine.appendChild(linebreak);
    parent.appendChild(optionLine);    
}

function defaultSurveyOptions(parent, id, likertName) {
    for(var i = 0; i < likertName.length; i++){
	var optionLine = Util.div(null, id + (i+1) + 'o' );
	var t = document.createTextNode("Possible Answer: ");
	var opt = Util.input("text", null,  id + (i+1) + 't');
	opt.value = likertName[i];
	// var addNewChoice = Util.button("Add new option below", null, null, function(){
	//  oneSurveyOption(parent, id+1);
	// });
	// var deleteButton = Util.button("Delete this option", null, null, function(){
	//  $('#' + id + 'o' + i).remove();
	// });
	var linebreak = Util.br();
	optionLine.appendChild(t);
	optionLine.appendChild(opt);
	// optionLine.appendChild(addNewChoice);
	// optionLine.appendChild(deleteButton);
	optionLine.appendChild(linebreak);
	parent.appendChild(optionLine);
    }
}

function abstractOptionContext(number){
    var text = [];
    
    for(var i = 1; i <= number; i++){
	if((document.getElementById('o' + i +'t')) !== null){
	    text.push(document.getElementById('o' + i +'t').value);
	    //text[i-1] = document.getElementById('o' + i +'t').value;
	}	
    }
    return text;
}

function addClassCheck(element, id){
    if(element.checked){
        element.classList.add("marked");
    }
    else{
        element.classList.remove("marked");
    }

    if(document.getElementsByClassName("marked").length>1){
    	
	if(document.getElementsByClassName("marked")[0].id != id){
	    document.getElementsByClassName("marked")[0].checked = false;
	    document.getElementsByClassName("marked")[0].classList.remove("marked");
	}
	
	else if(document.getElementsByClassName("marked")[1].id != id){
	    document.getElementsByClassName("marked")[1].checked = false;
	    document.getElementsByClassName("marked")[1].classList.remove("marked");
	}
    }
}


function editMCRform(parent, id, numberBox, addOptionButton, addQuestionButton){
    var id_o = 1;
    var optionClicks = 0;
    var form = Util.form(null, null, id);
    parent.appendChild(form);
    oneMCROption(form, "o" + id_o++);
    oneMCROption(form, "o" + id_o++);
    oneMCROption(form, "o" + id_o++);
    oneMCROption(form, "o" + id_o++);
    optionClicks += 4;		
    
    addOptionButton.onclick = function(){
	if(1 <= numberBox.value && numberBox.value <= 10){
	    optionClicks += parseInt(numberBox.value,10); 
	    console.log(optionClicks);
	    for(var i = 0; i < numberBox.value; i++){
		oneMCROption(form, "o" + id_o++);
	    }
	}
	else if (numberBox.value === ""){
	    optionClicks++;
	    oneMCROption(form, "o" + id_o++);
	}
	scrollToId(id);
    };
    
    addQuestionButton.onclick = function() { 
	console.log(optionClicks);
	buildMCR(abstractOptionContext(optionClicks));
	$("#editor").remove();
	$("#qC").remove();
    };
    return form;
}

function editMAform(parent, id, numberBox, addOptionButton, addQuestionButton){
    var id_o = 1;
    var optionClicks = 0;
    var form = Util.form(null, null, id);
    parent.appendChild(form);
    oneMAOption(form, "o" + id_o++);
    oneMAOption(form, "o" + id_o++);
    oneMAOption(form, "o" + id_o++);
    oneMAOption(form, "o" + id_o++);
    optionClicks += 4;		
    
    addOptionButton.onclick = function(){
	
	if(1 <= numberBox.value && numberBox.value <= 10){
	    optionClicks += parseInt(numberBox.value,10); 
	    console.log(optionClicks);
	    for(var i = 0; i < numberBox.value; i++){
		oneMAOption(form, "o" + id_o++);
	    }
	}
	else if (numberBox.value = ""){
	    optionClicks++;
	    oneMAOption(form, "o" + id_o++);
	}
	scrollToId(id);
    };
    
    addQuestionButton.onclick = function() { 
	console.log(optionClicks);
	buildMA(abstractOptionContext(optionClicks));
	$("#editor").remove();
	$("#qC").remove();
    };
    return form;
}


function editSurveyform(parent, id, numberBox, addOptionButton, addQuestionButton, createStdChoiceButton, likertName){
    var form = Util.form(null, null, id);
    parent.appendChild(form);
    var id_o = 1;
    var optionClicks = 0;
    
    if(likertName === null){
	oneSurveyOption(form, "o" + id_o++);
	oneSurveyOption(form, "o" + id_o++);
	oneSurveyOption(form, "o" + id_o++);
	oneSurveyOption(form, "o" + id_o++);
	optionClicks += 4;		
    }
    else{
	defaultSurveyOptions(form, "o", likertName);
	optionClicks += likertName.length;
	console.log(optionClicks);
    }
    
    addOptionButton.onclick = function(){
	
	if(1 <= numberBox.value && numberBox.value <= 10){
	    optionClicks += parseInt(numberBox.value,10); 
	    console.log(optionClicks);
	    for(var i = 0; i < numberBox.value; i++){
		oneSurveyOption(form, "o" + id_o++);
	    }
	}
	else if (numberBox.value = ""){
	    optionClicks++;
	    oneSurveyOption(form, "o" + id_o++);
	}
	scrollToId(id);
    };
    
    addQuestionButton.onclick = function() { 
	console.log(optionClicks);
	buildSurvey(abstractOptionContext(optionClicks));
	$("#editor").remove();
	$("#qC").remove();};
    
    createStdChoiceButton.onclick = function(){
	createStandardChoice(document.getElementById("Likert").value,
	    		     abstractOptionContext(optionClicks), document.getElementById("Likert") );
    }
    return form;
}

function addBrackets(ta, selStart, selEnd) {
    var v = ta.value;
    ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart, selEnd)
	+ "]] " + v.substring(selEnd);
}


QuizEdit.prototype.editFillin = function(qc, title, text) {
    var fillinForm = Util.form(null, "fillinForm", "Fillin");
    qc.appendChild(fillinForm);
    var Ans = Util.span("Answer: ");
    var ans = Util.input("text", "ans", "ans");
    fillinForm.appendChild(ans);
    fillinForm.appendChild(Util.button("Add Question", null, null, function() {
    	$("#editor").remove();
        $("#qC" ).remove();
        buildFillin(this.titleInp.value, this.textBox.value, ans.value);
    }));
}

//TODO: Remove dependence on JQuery, but at least before that

//Perform all actions to complete a question edited and added to the end of the quiz
QuizEdit.prototype.completeEdit = function(array) {
    $("#submitDiv-2").remove();
    $("#editor").remove(); // remove from window
    $("#qC").remove();
//    var array = buildFunc(); //.apply(this||window, Array.prototype.slice.call(arguments, 1));
    var newQ = 	[
	--QuizEdit.newid, this.titleInp.value, 'numeric', //TODO: add points and level!
    ];
    if (this.textBox.value !== '') {
	newQ.push(['instructions', this.textBox.value]);
    }

    for (var i = 0; i < array.length; i++) {
	newQ.push(array[i]); //TODO: What if each one is empty?
    }
    page.questions.push(newQ);
    console.log(page.questions);
    url.load(false);
    scrollToId('qc' + Quiz.newid);
}

QuizEdit.prototype.addQuestion = function() {
    var t = this;
    return function() { t.completeEdit(t.cbFunc());};
}

QuizEdit.prototype.addFields = function(editorClassname, editorFormId, cbFunc) {
    this.cbFunc = cbFunc;
    var c = Util.form(null, editorClassname, editorFormId);
    this.qc.appendChild(c);
    for (var i = 3; i < arguments.length; i++)
	c.appendChild(arguments[i]);
    c.appendChild(Util.button("Add Question", null, null, this.addQuestion()));
}

//TODO: either figure out how to make this work or ditch it.
// it would be great to look up quizedit.build[name] but then this is not a QuizEdit
QuizEdit.build = {
    Number: QuizEdit.prototype.buildNumber,
    Essay: QuizEdit.prototype.buildEssay,
};

QuizEdit.prototype.buildNumber = function() {
    return [
	['numeric', QuizEdit.newid]
    ];
}

QuizEdit.prototype.editNumber = function() {
    this.addFields('numberForm', 'Number', this.buildNumber,
		   Util.span("Min: "), this.min = Util.input("text", "min"), 
		   Util.span("Max: "), this.max = Util.input("text", "max")
		  );
}

QuizEdit.prototype.buildEssay = function() {
    return [
	['essay', 14, this.textAreaRows.value, this.textAreaCols.value, 200],
    ];
}

QuizEdit.prototype.editEssay = function() {
    this.addFields("essayForm", "Essay", this.buildEssay,
		   Util.span("Rows:"), this.textAreaRows = Util.input("number", "rows", null, 10),
		   Util.span("Cols:"), this.textAreaCols = Util.input("number", "cols", null, 80));
}

QuizEdit.prototype.buildCode = function() {
    return [
	['instructions', "Please use " + this.selectedLanguage + " to code"],
	['code', --QuizEdit.newid, "", this.textAreaRows.value, this.textAreaCols.value]
    ];
}

QuizEdit.prototype.editCode = function() {

    this.addFields
    ("codeForm", "Code", this.buildCode,
     Util.select(null, null,
		 ["-Select Language-", "C++", "Java", "Python", "Perl", "Processing"], null, "langSelect")
    );
}

QuizEdit.prototype.buildMCDropdown = function() {
    return [
	['selectText', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.buildMCRadioText = function() {
    return [
	['mcRadioText', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.buildMAnswer = function() {
    return [
	['multiAnswer', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.addOption = function() {
    if (1 <= numberBox.value && numberBox.value <= 100){
	optionClicks += parseInt(numberBox.value,10); 
	console.log(optionClicks);
	for(var i = 0; i < numberBox.value; i++){
	    oneMCDDOption(form, "o" + id_o++);
	}
    } else {
	optionClicks++;
	oneMCDDOption(form, "o" + id_o++);
    }
    scrollToId(id);
}
QuizEdit.prototype.editMC = function(questionType) {

    var description = document.createTextNode("Multiple choice - Dropdown :"
					      + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {
    });

 
    var div = Util.div();
    Util.add(div, [Util.input("number", "editField", "optionAdd"), Util.button("Add Option", "editButton", null,  )]);

    var list = [ ["Answer Id", "Answer", "correct"] ];
    for (var row = 0; row < 4; row++) {
	list.push([row, Util.input("text", "editField", "a"+row), Util.checkbox(null, "check"+row, "editCB", "check"+row), Util.button("delete")]);
    }
    var t = Util.table(list, true);

    this.addFields("mCDDForm", "MultiChoiceDropdown", questionType, t, div);
    this.answers = [];
}

QuizEdit.prototype.editMultiChoiceDropdown = function() {
    this.editMC(this.buildMCDropdown);
}
//    var list = [ "Choose QuestionType", "Fillin", "Number", "Essay", "Code",
//	     	 "MultiChoiceDropdown", "Survey", "MultiChoiceRadio", "MultiAnswer",
//	     	 "Regex", "Matrix", "Cloze" ];

QuizEdit.prototype.editMultiChoiceRadio = function() {
    this.editMC(this.buildMCRadioText);
}

QuizEdit.prototype.editMultiAnswer = function() {
    this.editMC(this.buildMAnswer);
}



function editMCDDform(parent, id, numberBox, addOptionButton, addQuestionButton) {
    var id_o = 1;
    var optionClicks = 0;
    var form = Util.form(null, null, id);
    parent.appendChild(form);
    oneMCDDOption(form, "o" + id_o++);
    oneMCDDOption(form, "o" + id_o++);
    oneMCDDOption(form, "o" + id_o++);
    oneMCDDOption(form, "o" + id_o++);
    optionClicks += 4;		
    
    addOptionButton.onclick = function(){
	
	if(1 <= numberBox.value && numberBox.value <= 10){
	    optionClicks += parseInt(numberBox.value,10); 
	    console.log(optionClicks);
	    for(var i = 0; i < numberBox.value; i++){
		oneMCDDOption(form, "o" + id_o++);
	    }
	}
	else if (numberBox.value = ""){
	    optionClicks++;
	    oneMCDDOption(form, "o" + id_o++);
	}
	scrollToId(id);
    };

    addQuestionButton.onclick = function() { 
	console.log(optionClicks);
	buildDpd(abstractOptionContext(optionClicks));
	$("#editor").remove();
	$("#qC").remove();};   
    return form;
}


QuizEdit.prototype.editMultiChoiceRadio = function(qc, title, text) {
    var mCRForm = Util.form(null, "mCRForm", "MultiChoiceRadio");
    qc.appendChild(mCRForm);
    var t = Util.table(0, null, null, null);
    mCRForm.appendChild(t);
    var r = t.insertRow(0);
    var description = document.createTextNode("Multiple choice - Radio:"
					      + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {
    });
    fillRow(r, [ description, numberBox, addOptionButton]);
    
    var addQuestion = Util.button("Add Question", null, "mcrButton", function() {});
    var MCRform = editMCRform(mCRForm, "MCRform", numberBox, addOptionButton, addQuestion);
    mCRForm.appendChild(addQuestion);
}

QuizEdit.prototype.editMultiAnswer = function(qc, title, text) {
    var mAForm = Util.form(null, "mAForm", "MultiAnswer");
    qc.appendChild(mAForm);
    var t = Util.table(0, null, null, null);
    mAForm.appendChild(t);
    var r = t.insertRow(0);
    var description = document.createTextNode("Multiple Answer Choices: "
					      + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {
    });
    fillRow(r, [ description, numberBox, addOptionButton]);

    var addQuestion = Util.button("Add Question", null, "maButton", function() {});
    var MCRform = editMAform(mAForm, "MAform", numberBox, addOptionButton, addQuestion);
    mAForm.appendChild(addQuestion);
}

function createStandardChoice(name, choices, nameBlank){
    document.getElementById("Likert").appendChild(Util.option(name, null, name, name));
    //	var name = choices;
    if(nameBlank.value === name){
	defaultSurveyOptions(document.getElementById("qC"), "o", choices);

    }
    
}

QuizEdit.prototype.editSurvey = function(qc, title, text) {
    var surveyForm = Util.form(null, "surveyForm", "Survey");
    qc.appendChild(surveyForm);
    var t = Util.table(0, null, null, null);
    surveyForm.appendChild(t);
    var r = t.insertRow(0);
    var description = document.createTextNode("Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {
    });
    fillRow(r, [ description, numberBox, addOptionButton]);
    
    var Likert5 = ["Strongly Agree",
	           "Agree",
	           "Neutral",
	           "Disagree",
	           "Strongly Disagree"];

    var Likert7 = ["Exceptional",
	           "Excellent",
	           "Very Good",
	           "Good",
	           "Fair",
	           "Poor",
	           "Very Poor"];
    var r1 = t.insertRow(1);
    var datalist = document.createElement("DATALIST");
    datalist.setAttribute("id", "Likert");
    var option1 = Util.option("Likert5", null, "Likert5", "Likert5");
    datalist.appendChild(option1);
    var option2 = Util.option("Likert7", null, "Likert7", "Likert7");
    datalist.appendChild(option2);
    r1.appendChild(datalist);
    var createStdChoice = Util.button("Create Standard Choice", null, null, function(){});
    var name = document.createTextNode("Name: ");
    var inp = Util.input("text", datalist.id, datalist.id);
    inp.setAttribute("list", "Likert");
    inp.oninput= function(){
	switch(inp.value){
	    
	case "Likert5":
	    {$("#Surveyform").remove();
	     $("#surveyButton").remove();
	     var addQuestion = Util.button("Add Question", null, "maButton", function() {});
	     var Surveyform = editSurveyform(surveyForm, "Surveyform", numberBox, addOptionButton, addQuestion, createStdChoice, Likert5);
	     Surveyform.appendChild(addQuestion);
	     scrollToId("Surveyform");
	    }
	    break;
	    
	case "Likert7":
	    {$("#Surveyform").remove();
	     $("#surveyButton").remove();
	     var addQuestion = Util.button("Add Question", null, "maButton", function() {});
	     var Surveyform = editSurveyform(surveyForm, "Surveyform", numberBox, addOptionButton, addQuestion, createStdChoice, Likert7);
	     Surveyform.appendChild(addQuestion);
	     scrollToId("Surveyform");
	    }
	    break;
	    
	default:
	    {$("#Surveyform").remove();
	     $("#surveyButton").remove();
	     var addQuestion = Util.button("Add Question", null, "maButton", function() {});
	     var Surveyform = editSurveyform(surveyForm, "Surveyform", numberBox, addOptionButton, addQuestion, createStdChoice, null);
	     Surveyform.appendChild(addQuestion);
	     scrollToId("Surveyform");
	    }
	}};
    
    inp.onkeydown = function(e){var keynumber = window.event ? e.keyCode: e.which; 
				if(keynumber == 8){e.preventDefault();this.value = this.value.slice(0,-1);}};
    fillRow(r1, [name, inp, createStdChoice]);	
    
    var addQuestion = Util.button("Add Question", null, "surveyButton", function() {});
    var Surveyform = editSurveyform(surveyForm, "Surveyform", numberBox, addOptionButton, addQuestion, createStdChoice, null);
    surveyForm.appendChild(addQuestion);
}



QuizEdit.prototype.editCloze = function(qc, title, text) {
    var selStart, selEnd;
    var exampleClozeTest = 'public class A {\n [[]]  public [[]] '+
	'void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
    
    var clozeForm = Util.form(null, "clozeForm", "Cloze");
    qc.appendChild(clozeForm);
    var ta = Util.textarea(exampleClozeTest, "cloze", "x", 10, 80);
    clozeForm.appendChild(ta);
    ta.onmouseup = function(){ selStart = ta.selectionStart; 
			       selEnd = ta.selectionEnd; 
			       console.log(ta.selectionStart + "," + ta.selectionEnd); }
    ta.ondblclick = function(){addBrackets(ta, selStart, selEnd)};
    clozeForm.appendChild(Util.button("SquareBracket It!", null, null, function(){addBrackets(ta, selStart, selEnd);}));
    clozeForm.appendChild(Util.button("Add Question", null, null, function() {
	$("#" + editor.id).remove();
	$("#" + qc.id).remove();
	buildCloze(ta.value);
    }));
    
}


function buildFillin(answer) {
    var q = [
	--newid, this.titleInp.value, "fillin",
	['Util.span', this.textBox.value],
	['fillin', newid],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    page.end();
    scrollToId('qc' + newid);
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
    
    
}

function parseArray(q){
    var str = "[";
    str +=       q[0] + ", ";
    str += "'" + q[1] + "', ";
    str += "'" + q[2] + "', ";
    for(var i = 3; i < q.length; i++){
	
	str+= "[";
	for (var j = 0; j < q[i].length; j++){
	    str += "'" + q[i][j] ;
	    if (j != (q[i].length-1) ){
		str += "', ";
	    }
	    else{
		str += "' ";
	    }
	    
	}
	if (i != (q.length-1) )
	    str += "], ";
	else{
	    str += "] ";
	}
    }
    
    str += "], ";
    
    return str;
}


function buildDpd(options) {
    var q = [
	newid--, this.titleInp.value, "multiple_dropdown",
	['instructions', this.textBox.value],
	['Util.select', "which", false, options, 'mcdropdown', newid],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    scrollToId('qc' + (newid + 1));
    page.end();
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
}

function buildMCR(options) {
    var q = [
	newid--, this.titleInp.value, "multiple_radio",
	['instructions', this.textBox.value],
	['mcRadioText', newid, options],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    scrollToId('qc' + (newid + 1));
    page.end();
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
}

function buildMA(options) {
    var q = [
	newid--, this.titleInp.value, "multiple_answer",
	['instructions', this.textBox.value],
	['multiAnswer', newid, options],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    scrollToId('qc' + (newid + 1));
    page.end();
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
}

function buildSurvey(options) {
    var q = [
	newid--, this.titleInp.value, "survey",
	['instructions', this.textBox.value],
	['mcRadioText', newid, options],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    scrollToId('qc' + (newid + 1));
    page.end();
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
}

function buildCloze(text){
    var q = [
	newid--, this.titleInp.value, "cloze",
	['instructions', this.textBox.value],
	['cloze', newid, text],
    ];
    var qc = page.addQuestion(q[0], q[1], q[2]);
    qc.appendChild(page.processQuestion(q));
    page.render(qc);
    scrollToId('qc' + (newid + 1));
    page.end();
    console.log(parseArray(q));
    $.post("QuizEditData.jsp", {"123" : parseArray(q)});
}


function fillRow(row, list) {
    for (var i = 0; i < list.length; i++) {
	var c = row.insertCell(i);
	c.appendChild(list[i]);
    }
}

function scrollToId(id) { //TODO: Fix Jquery madness below
    var element = $('#' + id); //document.getElementById(id);
    var offset = element.offset().top;

    if (offset > window.innerHeight) {
	// Not in view so scroll to it
	$('html,body').animate({
	    scrollTop : offset
	}, 1000);
	return false;
    }
    return true;
}

function editTextBox(val) {
    var div = document.createElement("div");
    div.id = "this.textBoxDiv";
    div.className = "this.textBoxDiv"; // style of the editor box
    var ta = document.createElement("textarea");
    div.appendChild(ta);
    ta.className = "textArea";
    ta.id = "textArea";
    ta.rows = 5;
    ta.cols = 50;
    ta.value = val;
    return div;

}

QuizEdit.prototype.editQuestion = function() {
    var editor = Util.div("editor", "editor");
    this.body.appendChild(editor);
    var t0 = document.createElement("table");
    editor.appendChild(t0);
    var r0 = t0.insertRow(0);

    var list = [ "Choose QuestionType", "Fillin", "Number", "Essay", "Code",
	     	 "MultiChoiceDropdown", "Survey", "MultiChoiceRadio", "MultiAnswer",
	     	 "Regex", "Matrix", "Cloze" ];
    var titleText = document.createTextNode("Title: ");
    /*
     * this.titleInp is a glable variable right now, since the real-time value of it should be passed
     * to the function of build~() in the edit~() functions instead of the initial value.
     * 
     * the same as this.textBox
     */
    this.titleInp = document.createElement("input");
    var questionType = document.createTextNode("Question Type: ");
    var selectBox = Util.select("quizType", false, list, null, "quizType");
    var addQuestion = Util.button("Add Question", null, null, function() {
    });
    var cancel = Util.button("Cancel", null, null, function() {
    });
    fillRow(r0, [ titleText, this.titleInp, questionType, selectBox, addQuestion, cancel ]);

    var r1 = t0.insertRow(1);
    var level = document.createTextNode("Level: ");
    var inpl = document.createElement("input");
    inpl.placeholder = "1";
    var points = document.createTextNode("Points: ");
    var inpp = document.createElement("input");
    inpp.placeholder = "1";
    fillRow(r1, [ level, inpl, points, inpp ]);

    var t1 = document.createElement("table");
    editor.appendChild(t1);
    var r2 = t1.insertRow(0);
    this.textBox = Util.textarea(null, "textArea", "blankbox", 5, 40);
    r2.appendChild(this.textBox);
    fillRow(r2, [this.textBox, imageAudioVideo()]);
    
    var qc = this.qc = Util.div('editor', 'qC');
    this.body.appendChild(this.qc);

    var t = this;
    $('#quizType').change(function() {
	$("#" + qc.id).empty();
	var sel = document.getElementById("quizType");
	var val = sel.options[sel.selectedIndex].value;
	if (val === "Choose QuestionType") {
	    return;
	}
	t["edit" + val](qc, t.titleInp.value, t.textBox.value);
	scrollToId(val);
    });
    scrollToId("editor");
}
