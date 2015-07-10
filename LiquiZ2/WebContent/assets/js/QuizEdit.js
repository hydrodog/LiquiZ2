/*
 * Quiz Editor (part of the Quiz class)
 * author: Ying Zhao
 */

//TODO: Move everything INTO YOUR CLASS. These should not be global variables.
var clozeTarget = /[[]]/;

function turnalloff(elem) { // TODO: turn off all the other selections when one of them is selected
	var elems = elem.form.elements;
	var currentState = elems.checked;

	for (var i = 0; i < elems.length; i++) {
		if (elems[i].type === "checkbox") {
			elems[i].checked = false;
		}
	}

	elem.checked = currentState;
}

function QuizEdit() {
    this.body = document.getElementById("container");
    this.body.className = "quizEditor";
}

function oneMCDDOption(parent, id){
	 var t = document.createTextNode("Possible Answer: ");
	 var opt = Util.input("text", null,  id + 't');
	 var checkbox = Util.input("checkbox", null, id + 'c');
	 var linebreak = Util.br();
	 checkbox.onclick = function(){addClassCheck(this, checkbox.id)};
	 parent.appendChild(t);
	 parent.appendChild(opt);
	 parent.appendChild(checkbox);
	 parent.appendChild(linebreak);
}

function abstractOptionContext(number){
	var text = [];
	for(var i = 1; i <= number; i++){
		text.push(document.getElementById('o' + i +'t').value);
		//text[i-1] = document.getElementById('o' + i +'t').value;
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

//function returnClicks(number){
//	//return number;
//	abstractOptionContext(number);
//}

function editMCDDform(parent, id, numberBox, addOptionButton, addQuestionButton) {
	var id_o = 1;
	var optionClicks = 0;
	var form = Util.form(null, null, "optionForm");
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
		checkIfInView("optionForm");
		};
		
		
		addQuestionButton.onclick = function() { 
		 console.log(optionClicks);
	     buildDpd(abstractOptionContext(optionClicks));
	     $("#editor").remove();
	     $("#qC").remove();};
		
	return form;
}


function editMAform(parent, id, labels, list){
	var form = Util.form(null, null, id);
	
	for(var i = 0; i<list.length; i++){
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var checkbox = document.createElement("input");
		var linebreak = document.createElement("br");
		checkbox.type = "checkbox";
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}
	parent.appendChild(form);
	return form;
}

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

function mklist(id, list){  // TODO : can be transfered to Util.table
	var table = document.createElement("table");
	table.id = id;
	
	for(var i = 0; i<list.length; i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		td1.innerHTML = "Choice " + i +":";
		var inp = Util.input("text", null, null);//mkinput(function(){}, "text", function(){});
		var addChoiceButton = Util.button("Add new choice below", null, null, null);
			//mkbutton("Add new choice below", function(){});
//		addChoiceButton.onclick = function(){
//			var td5 = document.createElement("td");
//			td5.appendChild(inp);
//			if(this.parentNode.parentNode.nextSibling != null)
//				this.parentNode.parentNode.parentNode.insertBefore(td5,this.parentNode.parentNode.nextSibling);
//			else
//				this.parentNode.parentNode.parentNode.appendChild(td5);
//			while(this.parentNode.parentNode.nextSibling != null){
//				this.parentNode.parentNode.firstChild.innerHTML = "Choice " +;
//					
//			}
//			//document.getElementById("Likert5").insertBefore(td5,this.parentNode.parentNode);
//			console.log(this.parentNode);
//			console.log(this.parentNode.parentNode);
//		}
//		
		
		var deleteButton = Util.button("Delete this choice", function(){}, null, null, null);
		
		
		
		inp.value = list[i];
		td2.appendChild(inp);
		td3.appendChild(addChoiceButton);
		td4.appendChild(deleteButton);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		table.appendChild(tr);
	
	}
	
	return table;
}

function editSurveyform(parent, id, list){
	var form = document.createElement("form");
	form.id = id;
    
	var table1 = document.createElement("table");
	
	var datalist = document.createElement("DATALIST");
	datalist.setAttribute("id", "Likert");
	var option1 = Util.option("Likert5", null, "Likert5", "Likert5");
	datalist.appendChild(option1);
	var option2 = Util.option("Likert7", null, "Likert7", "Likert7");
	datalist.appendChild(option2);
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td1.innerHTML = "Name:"+ "&nbsp&nbsp&nbsp&nbsp&nbsp";
	var inp = Util.input("text", datalist.id, datalist.id);
	inp.setAttribute("list", "Likert");
	inp.oninput= function(){
	switch(inp.value){
	case "Likert5":
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table3);}
	break;
    
	case "Likert7":
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table4);}
	break;
	
	default:
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table2);}
	}};
	inp.onkeydown = function(e){var keynumber = window.event ? e.keyCode: e.which; 
	if(keynumber == 8){e.preventDefault();this.value = this.value.slice(0,-1);}};
	
	table1.appendChild(datalist);
	td2.appendChild(inp);
	tr.appendChild(td1);
	tr.appendChild(td2);
	table1.appendChild(tr);
	
	var table2 = mklist("blank", list);
	var table3 = mklist("Likert5", Likert5);
	var table4 = mklist("Likert7", Likert7);
	
	form.appendChild(table1);
	form.appendChild(table2);
	
	parent.appendChild(form);
	return form;
}

function editMCRform(parent, id, labels, list){
	var form = document.createElement("form");
	form.id = id;

	for(var i = 0; i<list.length; i++){
		 var t = document.createTextNode(labels[i]);
		 var opt = document.createElement("input");
		 var radio = document.createElement("input");
		 var linebreak = document.createElement("br");
		 radio.type = "radio";
		
		//checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(radio);
		form.appendChild(linebreak);
	}
	parent.appendChild(form);
	return form;
}

function addBrackets(ta) {

	var v = ta.value;
	ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart, selEnd)
			+ "]] " + v.substring(selEnd);
}

////TODO: Make one, parameterized function that does this (without jquery)
////then call this from each edit function
//Quiz.prototype.addCommitQuestion = function(parent, func) {
//		parent.appendChild(Util.button("Add Question", null, null, function() {
//			$("#y").remove();
//			this[func]('title', ta.value);
//		}));
//}



QuizEdit.prototype.editFillin = function(qc, title, text) {
	  var fillinForm = Util.form(null, "fillinForm", "Fillin");
	  qc.appendChild(fillinForm);
	  var Ans = Util.span("Answer: ");
	  var ans = Util.input("text", "ans", "ans");
	  fillinForm.appendChild(ans);
      fillinForm.appendChild(Util.button("Add Question", null, null, function() {
    	  $("#editor").remove();
          $("#qC" ).remove();
          buildFillin(titleInp.value, textBox.value, ans.value);
      }));
}

QuizEdit.prototype.editNumber = function(qc, title, text) {
	
	var numberForm = Util.form(null, "numberForm", "Number");
	qc.appendChild(numberForm);
	var min = Util.span("Min: ");
	var Min = Util.input("text", "min");
	var max = Util.span("Max: ");
	var Max = Util.input("text", "max");
	numberForm.appendChild(min);
	numberForm.appendChild(Min);
	numberForm.appendChild(max);
	numberForm.appendChild(Max);
	numberForm.appendChild(Util.button("Add Question", null, null, function() {
		$("#editor" ).remove();
        $("#qC").remove();
    	buildNumber(title, text, Min.value, Max.value);
	}));
}

QuizEdit.prototype.editEssay = function(qc, title, text) {

	var essayForm = Util.form(null, "essayForm", "Essay");
	qc.appendChild(essayForm);
	essayForm.appendChild(Util.button("Add Question", null, null, function() {
		$("#editor").remove();
	    $("#qC").remove();
		buildEssay();
	}));
}

QuizEdit.prototype.editCode = function(qc, title, text) {
	
	var codeForm = Util.form(null, "codeForm", "Code");
	var langSelect = Util.select(null, null, ["Please select the language here", "C++", "Java", "Python", "Perl", "Processing"], null, "langSelect");
	qc.appendChild(codeForm);
	codeForm.appendChild(langSelect);
	var e = document.getElementById("langSelect");
	   
	
	codeForm.appendChild(Util.button("Add Question", null, null, function() {
		var strUser = e.options[e.selectedIndex].text;
		 $("#editor").remove();
	     $("#qC").remove();
		 buildCode(strUser);
	}));
}


QuizEdit.prototype.editMultiChoiceDropdown = function(qc, title, text) {
	var mCDDForm = Util.form(null, "mCDDForm", "MultiChoiceDropdown");
	qc.appendChild(mCDDForm);
	var t = Util.table(0, null, null, null);
	//document.createElement("table");
	mCDDForm.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Dropdown :"
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);
	
	var addQuestion = Util.button("Add Question", null, "mcdpButton", function() {});
	var MCDDform = editMCDDform(mCDDForm, "MCDDform", numberBox, addOptionButton, addQuestion);
	mCDDForm.appendChild(addQuestion);
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
	var createStdChoice = Util.button("Create Standard Choice", null, null, function(){});
	fillRow(r, [ description, numberBox, addOptionButton, createStdChoice]);
	var surveyform = editSurveyform(qc, 4, [ "", "", "", "" ]);
	qc.appendChild(Util.button("Add Question", null, null, function() {
		 $("#" + editor.id).remove();
	     $("#" + qc.id).remove();
	     $("#" + surveyForm.id).remove();
		 builddpd(title, text);
	}));
	
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
	
	var MCRform = editMCRform(qc, 4, [ "Choice 1: ", "Choice 2: ", "Choice 3: ",
	                   			"Choice 4: " ], [ "", "", "", "" ]);

	qc.appendChild(Util.button("Add Question", null, null, function() {
		 $("#" + editor.id).remove();
	     $("#" + qc.id).remove();
	     $("#" + mCRForm.id).remove();
		 builddpd(titleInp.value, textBox.value);
	}));
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

	var MAform = editMAform(qc, 4, [ "Option 1: ", "Option 2: ", "Option 3: ",
			"Option 4: " ], [ "", "", "", "" ]);

	qc.appendChild(Util.button("Add Question", null, null, function() {
		 $("#" + editor.id).remove();
	     $("#" + qc.id).remove();
	     $("#" + mAForm.id).remove();
		 builddpd(titleInp.value, textBox.value);
	}));
}

var selStart, selEnd;
QuizEdit.prototype.editCloze = function(qc, title, text) {
	
	var exampleClozeTest = 'public class A {\n [[]]  public [[]] '+
		'void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
	
	var clozeForm = Util.form(null, "clozeForm", "Cloze");
	qc.appendChild(clozeForm);
	var ta = Util.textarea(exampleClozeTest, "cloze", "x", 10, 80);
	clozeForm.appendChild(ta);
	ta.ondblclick = function(){addBrackets(ta)};
	ta.onmouseup = function(){ selStart = ta.selectionStart; 
	selEnd = ta.selectionEnd; 
	console.log(ta.selectionStart + "," + ta.selectionEnd); }
	clozeForm.appendChild(Util.button("SquareBracket It!", null, null, function(){addBrackets(ta);}));
	clozeForm.appendChild(Util.button("Add Question", null, null, function() {
		 $("#" + editor.id).remove();
	     $("#" + qc.id).remove();
		 buildCloze(ta.value);
	}));
	
}


var newid = -1;
function removeOldButtons(){
	$("#submitDiv-2").remove();
	$("#editor").remove();
}


function buildFillin(answer) {
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "fillin",
	         ['Util.span', textBox.value],
	         ['fillin', newid],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	page.end();
	checkIfInView('qc' + (newid + 1));
	console.log('qc' + (newid + 1));
	
}

function buildNumber(Min, Max) {
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "numeric",
	         ['instructions', textBox.value],
	         ['numeric', newid],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	checkIfInView('qc' + (newid + 1));
	page.end();
}

function buildEssay() {
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "essay",
	         ['instructions', textBox.value],
	         ['essay', 14, 10, 80, 200],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	page.end();
	checkIfInView('qc' + (newid + 1));
}

function buildCode(selectedLanguage) {
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "code",
	         ['instructions', textBox.value],
	         ['instructions', "Please use " + selectedLanguage + " to code"],
	         ['code', newid, "", 10, 80],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	checkIfInView('qc' + (newid + 1));
	page.end();
}

function buildDpd(options) {
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "multiple_dropdown",
	         ['instructions', textBox.value],
	         ['Util.select', "which", false, options, 'mcdropdown', newid],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	checkIfInView('qc' + (newid + 1));
	page.end();
}

function buildCloze(text){
	removeOldButtons();
	var q = [
	         newid--, titleInp.value, "cloze",
	         ['instructions', textBox.value],
	         ['cloze', newid, text],
	     ];
	 var qc = page.addQuestion(q[0], q[1], q[2]);
         qc.appendChild(page.processQuestion(q));
	page.render(qc);
	checkIfInView('qc' + (newid + 1));
	page.end();
}


function fillRow(row, list) {
	for (var i = 0; i < list.length; i++) {
		var c = row.insertCell(i);
		c.appendChild(list[i]);
	}
}

function checkIfInView(id) {

	var element = $("#" + id);
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
	div.id = "textBoxDiv";
	div.className = "textBoxDiv"; // style of the editor box
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
	var parent = this;
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
	 * titleInp is a glable variable right now, since the real-time value of it should be passed
	 * to the function of build~() in the edit~() functions instead of the initial value.
	 * 
	 * the same as textBox
	 */
	titleInp = document.createElement("input");
	var questionType = document.createTextNode("Question Type: ");
	var selectBox = Util.select("quizType", false, list, null, "quizType");
	var addQuestion = Util.button("Add Question", null, null, function() {
	});
	var cancel = Util.button("Cancel", null, null, function() {
	});
	fillRow(r0, [ titleText, titleInp, questionType, selectBox, addQuestion, cancel ]);

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
	    textBox = Util.textarea(null, "textArea", "blankbox", 5, 40);
	r2.appendChild(textBox);
	fillRow(r2, [textBox, imageAudioVideo()]);
	
	var questionContainer = document.createElement("div");
	questionContainer.id = "qC";
	this.body.appendChild(questionContainer);

	$('#quizType').change(function() {
		$("#" + questionContainer.id).empty();
		var val = $("#quizType option:selected").text();
		if (val === "Choose QuestionType") {
			return;
		}
		parent["edit" + val](questionContainer, titleInp.value, textBox.value);
		checkIfInView(val);
	});
}
