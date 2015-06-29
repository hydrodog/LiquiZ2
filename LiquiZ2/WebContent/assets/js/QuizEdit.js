/*
 * Quiz Editor (part of the Quiz class)
 * author: Ying Zhao
 */

//TODO: Move everything INTO YOUR CLASS. These should not be global variables.
var clozeTarget = /[[]]/;

function turnalloff(elem) { // TODO: turn off all the other selections when one
	// of them is selected
	var elems = elem.form.elements;
	var currentState = elems.checked;

	for (var i = 0; i < elems.length; i++) {
		if (elems[i].type === "checkbox") {
			elems[i].checked = false;
		}
	}

	elem.checked = currentState;
}

function editMCDDform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var opt = document.createElement("input");
		opt.value = list[i];
		// checkbox.onclick = turnalloff(this);
		Util.add(form,
				[document.createTextNode(labels[i]),
				 opt,
				 Util.input('checkbox'), Util.br()]);
	}

	return form;
}
function editMAform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		opt.value = list[i];
		// checkbox.onclick = turnalloff(this);
		Util.add(form, [t, opt, Util.input('checkbox'), Util.br()])
	}

	return form;
}
function editSurveyform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var linebreak = document.createElement("br");

		// checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		Util.add(form, [t, opt, Util.br()]);
	}

	return form;
}

function editMCRform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var opt = document.createElement("input");
		opt.value = list[i];

		// checkbox.onclick = turnalloff(this);
		Util.add(form, [document.createTextNode(labels[i]),
		                opt, Util.input('radio'), Util.br()]);
	}
	return form;
}
var selStart, selEnd;

function addBrackets(ta) {

	var v = ta.value;
	ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart, selEnd)
			+ "]] " + v.substring(selEnd);
}

//TODO: Make one, parameterized function that does this (without jquery)
//then call this from each edit function
Quiz.prototype.addCommitQuestion = function(parent, func) {
		parent.appendChild(Util.button("Add Question", null, null, function() {
			$("#y").remove();
			this[func]('title', ta.value);
		}));
}

//TODO: GET RID OF GLOBAL VARIABLES! This should be in the class (and really, it should not exist)
var exampleClozeTest = 'public class A {\n [[]]  public [[]] void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
Quiz.prototype.editCloze = function() {
	var div = document.createElement("div");
	div.id = "Cloze";
	div.className = "cloze"; // style of the editor box
	var ta = document.createElement("textarea");
	div.appendChild(ta);
	ta.className = "cloze";
	ta.id = "x";
	ta.rows = 10;
	ta.cols = 80;
	ta.value = exampleClozeTest;
	ta.ondblclick = function() {
		addBrackets(ta);
	};
	ta.onmouseup = function() {
		selStart = ta.selectionStart;
		selEnd = ta.selectionEnd;
		console.log(ta.selectionStart + "," + ta.selectionEnd);
	};
	// ta.onkeyup = function(){ ta.style.height = "1px";
	// ta.style.height = (25+ta.scrollHeight)+"px";}

	div.appendChild(Util.button("SquareBracket It!", null, null, function() {
		addBrackets(ta);
	}));
//	this.addCommitQuestion(div, 'buildCloze')
	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildCloze('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editFillin = function() {
	var div = document.createElement("div");
	div.id = "Fillin";
	div.className = "Fillin"; // style of the editor box

	var Ans = Util.span("Answer: ");
	var ans = Util.input("text", "ans");
	ans.value = "";
	div.appendChild(Ans);
	div.appendChild(ans);

	div.appendChild(Util.button("Submit", null, null, function() {
		div.innerHTML = '';
//		$("#y").remove();
		//buildFillin('title', ta.value, ans.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editNumber = function() {
	var div = document.createElement("div");
	div.id = "Number";
	div.className = "Number"; // style of the editor box

	var min = Util.span("Min: ");
	var Min = Util.input("text", "min");
	var max = Util.span("Max: ");
	var Max = Util.input("text", "max");
	div.appendChild(min);
	div.appendChild(Min);
	div.appendChild(max);
	div.appendChild(Max);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildnumber('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editEssay = function() {
	var div = Util.div("Essay", "Essay");

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildessay('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editCode = function() {
	var div = document.createElement("div");
	div.id = "Code";
	div.className = "Code"; // style of the editor box

	div.appendChild(Util.button("Submit", function() {
		$("#y").remove();
		buildcode('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editEssay = function() {
	var div = document.createElement("div");
	div.id = "Essay";
	div.className = "Essay"; // style of the editor box

	mkpbutton(div, "Submit", null, function() {
		$("#y").remove();
		buildessay('title', ta.value);
	});
	document.body.appendChild(div);
}

Quiz.prototype.editCode = function() {
	var div = document.createElement("div");
	div.id = "Code";
	div.className = "Code"; // style of the editor box

	mkpbutton(div, "Submit", function() {
		$("#y").remove();
		buildcode('title', ta.value);
	});
	document.body.appendChild(div);
}

// function addOption(parent){
// var extraOpteditMCform= form(4, [optionChar], [""]);
// div.appendChild(extraOption)
// }
//
// var optionCharUni = 68; // the Dec Unicode of 'D'
// var optionChar = String.fromCharCode(optionCharUni);

Quiz.prototype.editMultiChoiceDropdown = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceDropdown";
	div.className = "MultiChoiceDropdown"; // style of the editor box

	var editor = Util.div("MCeditor", "MCeditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Dropdown :"
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MCDDform = editMCDDform(4, [ "A: ", "B: ", "C: ", "D: " ], [ "", "",
			"", "" ]);
	div.appendChild(MCDDform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editSurvey = function() {
	var div = document.createElement("div");
	div.id = "Survey";
	div.className = "Survey"; // style of the editor box

	var editor = Util.div("surveyEditor", "surveyEditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var surveyform = editSurveyform(4, [ "Choice 1: ", "Choice 2: ",
			"Choice 3: ", "Choice 4: " ], [ "", "", "", "" ]);
	div.appendChild(surveyform);

	div.appendChild(Util.input("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));

	document.body.appendChild(div);
}

Quiz.prototype.editMultiChoiceRadio = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceRadio";
	div.className = "MultiChoiceRadio"; // style of the editor box

	var editor = Util.div("MCReditor", "MCReditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Radio:"
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MCRform = editMCRform(4, [ "Choice 1: ", "Choice 2: ", "Choice 3: ",
			"Choice 4: " ], [ "", "", "", "" ]);
	div.appendChild(MCRform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editMultiAnswer = function() {
	var div = document.createElement("div");
	div.id = "MultiAnswer";
	div.className = "MultiAnswer"; // style of the editor box

	var editor = Util.div("MAeditor", "MAeditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple Answer Choices: "
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MAform = editMAform(4, [ "Option 1: ", "Option 2: ", "Option 3: ",
			"Option 4: " ], [ "", "", "", "" ]);
	div.appendChild(MAform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

var newid = -1;
function buildCloze(title, text) {

	page.addQuestion(newid--, title, "cloze");
	page.instructions("Fill in the blanks to make the code correct");
	page.cloze(newid--, text);
}

function buildFillin(title, text, answer) {

	page.addQuestion(newid--, title, "fillin");
	page.span(text);
	page.fillin(newid--);
	// TODO: store answer

	// var quizinfo = new QuizInfo("New Fill-In Question", 10, 0, 1, "assets/");
	// var qlist = [[
	// qhead('Java'),
	// lin('Complete the code below'),
	// cod(3, txt3, 10, 80)
	// ]]
	// var q_cloze = new Quiz(quizinfo, qlist);
}
function buildnumber(title, text) {
	var quizinfo = new QuizInfo("New Number Question", 10, 0, 1, "assets/");
	var qlist = [
			[ qhead('Java'), lin('Complete number text below'),
					cod(3, txt4, 10, 80) ],
			[ lin('Type your Answer'), cod(3, "", 2, 80) ] ]
	var q_cloze = new Quiz(quizinfo, qlist);
}
function buildessay(txt5) {
	var quizinfo = new QuizInfo("New Essay Question", 10, 0, 1, "assets/");
	var qlist = [
			[ qhead('Java'), lin('Question Text'), cod(3, txt5, 10, 80) ],
			[ lin('Type your Essay'), cod(3, "", 12, 100) ], ]
	var q_cloze = new Quiz(quizinfo, qlist);
}
function buildcode() {
	var quizinfo = new QuizInfo("New Code Question", 10, 0, 1, "assets/");
	var qlist = [
			[
					qhead('Java'),
					lin('Question Text'),
					cod(3, txt6, 10, 80),
					match(1, [ txt("Programming Language: ") ], [ txt("C++"),
							txt("Java"), txt("Python"), ]) ],
			[ lin('Type your code'), cod(3, "", 12, 100), button("Run") ]

	]
	var q_cloze = new Quiz(quizinfo, qlist);
}

function builddpd() {
	var quizinfo = new QuizInfo("New DropDownList Question", 10, 0, 1,
			"assets/");
	var qlist = [
			[ qhead('Java'), lin('Question Text'), cod(3, txt6, 10, 80), ],

			[ lin('Type your code'), cod(3, "", 12, 100), ]

	]
	var q_cloze = new Quiz(quizinfo, qlist);
}

var list = [
            "Choose QuestionType",
            "Fillin",
            "Number",
            "Essay",
            "Code",
            "MultiChoiceDropdown",
            "Survey",
            "MultiChoiceRadio",
            "MultiAnswer",
            "Regex",
            "Matrix",
            "Cloze"];

var list = [ "Choose QuestionType", "Fillin", "Number", "Essay", "Code",
		"MultiChoiceDropdown", "Survey", "MultiChoiceRadio", "MultiAnswer",
		"Regex", "Matrix", "Cloze" ];

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

Quiz.prototype.editQuestion = function() {
	var parent = this;
	var editor = Util.div("editor", "editor");
	this.body.appendChild(editor);
	var t0 = document.createElement("table");
	editor.appendChild(t0);
	var r0 = t0.insertRow(0);

	var title = document.createTextNode("Title: ");
	var inp = document.createElement("input");
	var questionType = document.createTextNode("Question Type: ");
	var selectBox = Util.select("quizType", false, list, null, "quizType");
	var addQuestion = Util.button("Add Question", null, null, function() {
	});
	var cancel = Util.button("Cancel", null, null, function() {
	});
	fillRow(r0, [ title, inp, questionType, selectBox, addQuestion, cancel ]);

	var r1 = t0.insertRow(1);
	var level = document.createTextNode("Level: ");
	var inpl = document.createElement("input");
	var points = document.createTextNode("Points: ");
	var inpp = document.createElement("input");
	fillRow(r1, [ level, inpl, points, inpp ]);

	var t1 = document.createElement("table");
	editor.appendChild(t1);
	var r2 = t1.insertRow(0);
	fillRow(r2, [ editTextBox(""), imageAudioVideo() ]);

	$('#quizType').change(function() {
		for (var i = 0; i < list.length; i++) {
			$("#" + list[i]).hide();
		}
		var val = $("#quizType option:selected").text();
		if (val === "Choose QuestionType") {
			return;
		}
		parent["edit" + val]();
		checkIfInView(val);
	});
}
