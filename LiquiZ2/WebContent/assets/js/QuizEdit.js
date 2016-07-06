/*
 * Quiz Editor
 * author: Ying Zhao
 *
 * reorganized and refactored Dov Kruger and Asher Davidson 8/12/2015
 * All parameters are now passed to build methods by storing them in this.
 * Not so robust, but it streamlines the code 
 */
console.log("bugs to fix - undefined-qc");
console.log("bugs to fix - newlines-qc");

QuizEdit.newid = 0;

function QuizEdit() {
	this.body = document.getElementById("container");
}

QuizEdit.EDITCTRL = "editctrl";
QuizEdit.INT = "editint";
QuizEdit.DOUBLE = "editdouble";
QuizEdit.NAME = "editname";
QuizEdit.QUESTION = "question";

QuizEdit.BUTTON = "editbutton";
QuizEdit.ANSWERS = "answers";
QuizEdit.TEXTAREA = "editTA";
QuizEdit.REGEX = "editPattern";

QuizEdit.prototype.scrollToEditor = function () {
	//    location= location.href.split("#")[0]+'#'+this.q.id;
	scrollToId("edit-qc" + this.q.id);
};

QuizEdit.prototype.renderQuestion = function () {
	page.refreshQuestion(this.id);
}

QuizEdit.prototype.editButton = function (label, method,id) {
	return Util.button(label, (method === null) ? null : method.bind(this), QuizEdit.EDITCTRL,id);
}

QuizEdit.prototype.textArea = function (id, rows, cols) {
	return Util.textarea(null, QuizEdit.TEXTAREA, id, rows, cols);
}
QuizEdit.prototype.varWriter = function (id, rows, cols) {
	return new VarWriter(id, rows, cols);
}
QuizEdit.prototype.addDispButton = function (title, funcName, className) {
	var t = this;
	return Util.button(title,
		function () {
			var e = this.paraEditor;
			e.activeType.classList.remove("paramultiselected");
			this.classList.add("paramultiselected");
			e.activeType = this;
			var cont = [funcName, e.textBox.valueOf()];
			if (e.ind != -1) {
				t.q.content[e.ind] = cont;
			} else {
				t.q.content.push(cont);
				e.ind = t.q.content.length - 1;
			}
			t.renderQuestion();
		},
		className);
}

QuizEdit.prototype.openBracket = "[[";
QuizEdit.prototype.closeBracket = "]]";

//TODO: Remove dependence on JQuery
QuizEdit.prototype.currentEdit;

QuizEdit.prototype.update = function () {
		this.q.title = this.title.value;
		this.q.level = this.level.value;
		this.q.points = this.points.value;
	}
	//Perform all actions to complete a question edited and added to the end of the quiz
QuizEdit.prototype.completeEdit = function (array) {
	this.update();
	for (var i = 0; i < array.length; i++)
		this.q.content.push(array[i]);
	this.renderQuestion();
}

// create a question, display it, remove the editor
QuizEdit.prototype.addQuestion = function () {
	var t = this;
	return function () {
		if (t.cbFunc)
			t.completeEdit(t.cbFunc());
		t.editor.innerHTML = "";
	};
}

//add a question to the current compound question and keep going in the editor
QuizEdit.prototype.addSubQuestion = function () {
	var t = this;
	return function () {
		if (t.cbFunc)
			t.completeEdit(t.cbFunc());
	};
}
//Close button for editor
QuizEdit.prototype.closeEditor = function () {
	var t = this;
	return function () {
		t.editor.innerHTML = "";
	};
}


// Add variable fields to the editor for editing specific question types
QuizEdit.prototype.addFields = function (cbFunc) {
	this.cbFunc = cbFunc;
	this.varEdit.innerHTML = ""; // clear all the options before adding the new ones
	for (var i = 1; i < arguments.length; i++) {
		if (typeof (arguments[i]) === 'string')
			this.varEdit.appendChild(document.createTextNode(arguments[i]));
		else
			this.varEdit.appendChild(arguments[i]);
	}
	this.scrollToEditor();
}

/*
 * For each question type, the editXXX function creates whatever fields are needed
 * to provide information for editing that type and the buildXXX function adds the question
 * into the quiz when the user clicks either create Question or subquestion.
 */


QuizEdit.prototype.buildFillin = function () {
	this.q.answers.push([this.ans.value]);
	return [
        ['fillin', --QuizEdit.newid],
    ];
};

QuizEdit.prototype.editFillin = function () {
	this.addFields(this.buildFillin,
		Util.span("Answer: "),
		this.ans = Util.input("text", "ans", "ans")
	);
};

QuizEdit.prototype.buildNumber = function () {
	this.q.answers.push([this.min.value, this.max.value]);
	return [
        ['numeric', QuizEdit.newid]
    ];
};

QuizEdit.prototype.editNumber = function () {
	this.addFields(this.buildNumber,
		Util.span("Min: "), this.min = Util.input("text", "min"),
		Util.span("Max: "), this.max = Util.input("text", "max")
	);
}

QuizEdit.prototype.buildEssay = function () {
	return [
    ['essay', 14, this.textAreaRows.value, this.textAreaCols.value, 200],
    ];
}

QuizEdit.prototype.editEssay = function () {
	this.addFields(this.buildEssay,
		Util.span("Rows:"), this.textAreaRows = Util.input("number", "rows", null, 10),
		Util.span("Cols:"), this.textAreaCols = Util.input("number", "cols", null, 80));
}

QuizEdit.prototype.buildCode = function () {
	return [
        ['instructions', "Please use " + this.varEdit.childNodes[4].value + " to code"],
        ['code', --QuizEdit.newid, "", this.textAreaRows.value, this.textAreaCols.value]
    ];
}

QuizEdit.prototype.editCode = function () {
	this.addFields(this.buildCode,
		Util.span("Rows:"), this.textAreaRows = Util.input("number", "rows", null, 10),
		Util.span("Cols:"), this.textAreaCols = Util.input("number", "cols", null, 80),
		Util.select(null, null, ["-Select Language-", "C++", "Java", "Python", "Perl", "Processing"], null, "langSelect")
	);
}

/*
 * This is the code common to all the multiple choice questions including
 *
 */
QuizEdit.prototype.buildMC = function () {
	var rows = this.ansTable.rows;
	var answers = new Array(rows.length - 1);
	var correct = new Array(rows.length - 1);
	for (var i = 1; i < rows.length; i++) {
		answers[i - 1] = rows[i].cells[0].children[0].value
		correct[i - 1] = rows[i].cells[1].children[0].checked;
	}
	this.q.answers.push([answers, correct]);
	return answers;
}

QuizEdit.prototype.buildSurveyQuestions = function () {
	var surveyQuestions = [];
	var rows = this.surveyQuestions.rows;
	for (var i = 0; i < rows.length; i++) {
		surveyQuestions[i] = rows[i].cells[0].children[0].value;
	}
	return surveyQuestions;
}

QuizEdit.prototype.buildMCDropdown = function () {
	return [
    ['selectText', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMCRadioTextVert = function () {
	return [
    ['mcRadioTextVert', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMCRadioTextHoriz = function () {
	return [
        ['mcRadioTextHoriz', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMAnswer = function () {
	return [
    ['multiAnswer', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildSurvey = function () {
	return [
    ['mcSurvey', --QuizEdit.newid, this.buildSurveyQuestions(), this.buildMC()]
    ];
}

QuizEdit.prototype.deleteOptionAnswer = function (e) {
	console.log('delete answer');
	var nid=e.target.id.split("-OptionDelete")[0];
	var table=this.ansTable;
	for(var i=1;i<table.rows.length;i++){
		if(table.rows[i].cells[1].childNodes[0].id.split("-OptionDelete")[0]==nid){
			this.ansTable.deleteRow(i);
			break;
		}
	}	
}

QuizEdit.prototype.deleteEquation = function (e) {
	console.log('delete equation answer');
	console.log(e.target);
}

QuizEdit.prototype.addOption = function (row) {
	var leng = this.ansTable.rows.length;
	var r = this.ansTable.insertRow();
	var td = r.insertCell();
	td.appendChild(Util.input("text", QuizEdit.EDITCTRL, "a" + (leng+1)));
	if (this.withCheckbox) {
		td = r.insertCell();
		td.appendChild(Util.checkbox(null, "check" + (leng+1), "editCB", "check" + (leng+1)));
	}
	td = r.insertCell();
	td.appendChild(this.editButton("delete", this.deleteOptionAnswer,(leng+1)+"-OptionDelete"));
	this.scrollToEditor();
}

/*
 *  Add a standard choice to the list
 */

QuizEdit.prototype.addStdChoice = function () {
	//stdChoice.style.background="#fff";
	var name = this.stdChoice.value;
	if (name === '') {
		this.stdChoice.style.background = "#f00";
		return; //TODO: alert? need a name for a standard choice
	}
	var answers = [];
	for (var i = 0; i < this.ansTable.rows.length; i++) {
		var inp = document.getElementById("a" + i);
		if (inp !== null)
			answers.push(inp.value);
	}
	Quiz.stdChoice[name] = answers;
	var c = Util.option(name, name);
	this.selStdChoice.add(c);
}

/*
 * Remove a standard choice from the hash and update the screen 
 */

QuizEdit.prototype.deleteStdChoice = function () {
	var name = this.stdChoice.value;
	delete Quiz.stdChoice[name];
	for (var i = 0; i < this.selStdChoice.children.length; i++)
		if (this.selStdChoice.children[i].value == name)
			this.selStdChoice.remove(i);
}

/*
 *  Build a selection from a named global hash. This is used for
 *  named regexes, named stdSelections, and any other item where a single
 *  shared name must be added
 */
QuizEdit.prototype.selectName = function (hash, method, defaultLabel) {
	var sel = document.createElement("select");
	sel.onchange = (method === null) ? null : method.bind(this);

	sel.appendChild(Util.option(null, defaultLabel));
	for (var k in hash) {
		sel.appendChild(Util.option(k, k));
	}
	return sel;
}

QuizEdit.prototype.editMCtop = function (checkbox) {
	var stdChoice;
	this.mcHeader = Util.divadd(QuizEdit.EDITPANE,
		this.optCount = Util.input("number", QuizEdit.EDITCTRL, "optionAdd"),
		this.editButton("Add Option", this.addOption));
	this.mcHeader2 = Util.divadd(QuizEdit.EDITPANE,
		Util.span("StdChoice Name"),
		this.stdChoice = Util.input("text", QuizEdit.NAME, 'stdChoice'),
		this.editButton("Create", this.addStdChoice),
		this.selStdChoice,
		this.editButton("Delete", this.deleteStdChoice)
	);

	var list = (checkbox) ? [["Answer", "correct", ""]] : [["Answer", ""]];
	for (var row = 0; row < 4; row++) {
		if (checkbox) {
			list.push([Util.input("text", QuizEdit.EDITCTRL, "a" + row),
               Util.checkbox(null, "check" + row, "editCB", "check" + row),
               this.editButton("delete", this.deleteOptionAnswer,row+"-OptionDelete")]);
		} else {
			list.push([Util.input("text", QuizEdit.EDITCTRL, "a" + row),
               this.editButton("delete", this.deleteOptionAnswer,row+"-OptionDelete")]);
		}
	}
	this.ansTable = Util.table(list, true, QuizEdit.ANSWERS);
}

QuizEdit.prototype.editMC = function (questionType) {
	this.editMCtop(true);
	this.addFields(questionType, this.mcHeader, this.mcHeader2, this.ansTable);
	this.answers = [];
}

QuizEdit.prototype.editMultiChoiceDropdown = function () {
	this.editMC(this.buildMCDropdown);
}

QuizEdit.prototype.editMultiChoiceRadioVert = function () {
	this.editMC(this.buildMCRadioTextVert);
}

QuizEdit.prototype.editMultiChoiceRadioHoriz = function () {
	this.editMC(this.buildMCRadioTextHoriz);
}

QuizEdit.prototype.editMultiAnswer = function () {
	this.editMC(this.buildMAnswer);
}

QuizEdit.prototype.addStandardChoice = function (name, choices, nameBlank) {
	Quiz.stdChoice[name] = choices;
}

QuizEdit.prototype.deleteSurveyQuestion = function (e) {
	var nid=e.target.id.split("-SurveyDelete")[0];
	var table=this.surveyQuestions;
	for(var i=0;i<table.rows.length;i++){
		if(table.rows[i].cells[1].childNodes[0].id.split("-SurveyDelete")[0]==nid){
			this.surveyQuestions.deleteRow(i);
			break;
		}
	}	
}

QuizEdit.prototype.addSurveyQuestion = function (i) {
	var leng=this.surveyQuestions.rows.length;
	var tr = this.surveyQuestions.insertRow();
	var c = tr.insertCell();
	c.appendChild(Util.input("text", QuizEdit.QUESTION, 'surveyQuestion' + (leng+1)));
	c = tr.insertCell();
	c.appendChild(this.editButton("delete", this.deleteSurveyQuestion,(leng+1)+"-SurveyDelete"));
}

QuizEdit.prototype.editSurvey = function () {
	this.editMCtop(false);
	var surveyQuestions = [];
	this.surveyQuestions = Util.table(surveyQuestions, false);
	for (var i = 0; i < 4; i++) {
		var r= this.surveyQuestions.insertRow();
		var td=r.insertCell();
		td.appendChild(Util.input("text", QuizEdit.QUESTION, 'surveyQuestion' + i));
		td= r.insertCell();
		td.appendChild(this.editButton("delete", this.deleteSurveyQuestion,i+"-SurveyDelete"));
	} 
	var table=this.surveyQuestions;
	this.addFields(this.buildSurvey, this.mcHeader, this.mcHeader2, this.ansTable, Util.h2("Survey Questions"),
		this.editButton("More Questions", this.addSurveyQuestion), this.surveyQuestions);
	this.answers = [];
}

QuizEdit.prototype.buildCLOZE = function () {
	return [
        ['cloze', --QuizEdit.newid, this.CLOZE.value],
    ];
}

QuizEdit.prototype.addBrackets = function () {
	var ta = this.CLOZE;
	var v = ta.value;
	ta.value = v.substring(0, this.selStart) + ' ' + this.openBracket +
		v.substring(this.selStart, this.selEnd) + this.closeBracket + ' ' + v.substring(this.selEnd);
}

QuizEdit.prototype.editCLOZE = function () {
	var t = this;
	this.addFields(this.buildCLOZE,
		Util.table([
           [Util.span("Rows:"), this.textAreaRows = Util.input("number", QuizEdit.INT, null, 10),
           Util.span("Cols:"), this.textAreaCols = Util.input("number", QuizEdit.INT, null, 80)],
           [this.editButton("SquareBracket It!", this.addBrackets)]
        ]), this.CLOZE = Util.textarea(null, "code cloze", "cloze", this.textAreaRows.value, this.textAreaCols.value));

	this.CLOZE.onmouseup = function () {
		t.selStart = t.CLOZE.selectionStart;
		t.selEnd = t.CLOZE.selectionEnd;
		console.log(t.selStart + "," + t.selEnd);
	};
	this.CLOZE.ondblclick = function () {
		t.addBrackets();
	};
}

//Image Click part
QuizEdit.prototype.buildImgClick = function(){
	var canvas = document.getElementById("canvas");
	var src = canvas.toDataURL();
	//var src = this.imgEditor.canvas.toDataURL();
	return [
	        ['image', src, --QuizEdit.newid]
	    ];
}

QuizEdit.prototype.editImgClick = function(e){
	var src = "usmap1.png";
	var img = new Paint(src, 600 , 330);
	this.imgEditor = img;
	this.addFields(this.buildImgClick, img);
}


//Equation part
QuizEdit.prototype.buildEquationQuestion = function () {
	this.q.answers.push(parseEquation(this.equation.tag));
	return [
        ['equation', "equation" + this.id, "true"]
    ];
};

QuizEdit.prototype.editEquationQuestion = function () {
	this.equation = new Equation({
		"target": this.varEdit,
		"btn": ["Fraction", "Script","Radical", "Integral", "LargeOperator", "Bracket", "Function"]
	});
	this.addFields(this.buildEquationQuestion,
		Util.span("Answer: "), this.equation.equationBox(),
		Util.br(),this.equation.equationButton("Equation Editor for answer")
	);
	this.varEdit.appendChild(this.equation.popDiv);
};

QuizEdit.prototype.buildEquation = function () {
	return [
        ['equation', "equationQues" + this.id, "false", parseEquation(this.equation.tag)] //TODO: maybe add parameter to pass button editions 
    ];
};

QuizEdit.prototype.editEquation = function () {
	this.equation = new Equation({
		"target": this.varEdit,
		"btn": ["Fraction", "Script", "Radical","Integral", "LargeOperator", "Bracket", "Function"]
	});
	this.addFields(this.buildEquation,
		Util.span("Question: "), this.equation.equationBox(),
		Util.br(), this.equation.equationButton("Equation Editor for Question"),
		Util.br(),Util.span("Preview: "),Util.div("equation-preivew","equation-preivew")
	);
	this.varEdit.appendChild(this.equation.popDiv);
};
QuizEdit.prototype.matrix = function () {
	console.log("ASDFASDF");
}
QuizEdit.prototype.buildGrid = function () {
	return [
        ['emptyGrid',"grid-test", this.matrixRows.value, this.matrixCols.value],
    ];
};

QuizEdit.prototype.editGrid= function () {
	this.addFields(this.buildGrid,
		Util.span("Rows: "), this.matrixRows = Util.input("number", QuizEdit.INT, "rows",3),
		Util.span("Cols: "), this.matrixCols = Util.input("number", QuizEdit.INT, "cols",3)
		//   this.ans = //TODO: add a matrix to fill in the values
	);
};

QuizEdit.prototype.editRandomVars = function () {
	var editor = new EditingPlugin.RandomVar(this);
};

QuizEdit.prototype.buildRegex = function () {
	return [
            ['regex', QuizEdit.newid],
    ];
};


QuizEdit.prototype.buildRandomVar = function () {
	return [
            ['randomvar', QuizEdit.newid],
    ];
};

QuizEdit.prototype.testRegex = function () {
	console.log(new RegExp(this.q.regexPattern.value));
};

QuizEdit.prototype.createRegex = function () {
	var name = this.q.regexName.value;
	var pattern = this.q.regexPattern.value;
	if (name && name.length > 0 && pattern && pattern.length > 0) {
		if (!QuizEdit.regex.local[name])
			Util.addSelOption(this.q.selRegex, name, false, "Local");
		this.q.value = name;
		QuizEdit.regex.local[name] = pattern;
	}
};

QuizEdit.prototype.deleteRegex = function () {
	var name = this.q.value;
	if (this.q.regexName.value != name) {
		console.log("Ambiguous case regex delete.");
	}
	QuizEdit.regex.delete(name);
	Util.removeSelOption(this.q.selRegex, name);
	this.q.regexName.placeholder = this.q.regexName.value;
	this.q.regexPattern.placeholder = this.q.regexPattern.value;
	this.q.regexName.value = "";
	this.q.regexPattern.value = "";
};

QuizEdit.prototype.editRegex = function () {

	this.q.selRegex = QuizEdit.regex.toSelect((this.pickRegex).bind(this));

	this.addFields(this.buildRegex,
		Util.table([
            [Util.span("Regex Name: "), this.q.regexName = Util.input("text", QuizEdit.EDITCTRL, "regexName"),
                this.editButton("Create", this.createRegex), this.editButton("delete", this.deleteRegex), this.editButton("test", this.testRegex)],
            ["Pattern:", this.q.regexPattern = Util.input("text", QuizEdit.REGEX, "regex"), this.q.selRegex],
            [Util.span("Must match:"), this.mustMatch = this.textArea(null, 10, 40)],
            [Util.span("Cannot match:"), this.cannotMatch = this.textArea(null, 10, 40)]
        ]));
};


QuizEdit.imageFileTypes = "jpg,jpeg,png,eps,svg,gif,bmp";
QuizEdit.audioFileTypes = "mp3,ogg,wav";
QuizEdit.videoFileTypes = "mpg,mpeg,mp4";

QuizEdit.prototype.buildImage = function (src, x, y, w, h) {
	return [
        ['image', src, x, y, w, h]
    ];
};

QuizEdit.prototype.buildVideo = function (src, x, y, w, h) {
	return [
        ['Util.video', src]
    ];
};

QuizEdit.prototype.buildAudio = function (src, x, y, w, h) {
	return [
        ['Util.audio', src]
    ];
};

QuizEdit.prototype.editImage = function () {
	this.addFields(this.buildImage, Util.table([
    [Util.span("x="), this.x = Util.input("number", QuizEdit.INT, "x"),
      Util.span("y="), this.y = Util.input("number", QuizEdit.INT, "y")],
    [Util.span("w="), this.w = Util.input("number", QuizEdit.INT, "w"),
      Util.span("h="), this.h = Util.input("number", QuizEdit.INT, "h")]
    ]));
};

QuizEdit.prototype.inputBlur = function (type, val) {
	var t = this;
	var v = Util.input(type, QuizEdit.EDITCTRL, val, this.q[val]);
	v.oninput = function () {
		t.q[val] = v.value; // change attributes of question like title, points...
		t.renderQuestion();
	};
	return v;
};

QuizEdit.prototype.pickRegex = function () {
	var s = this.q.selRegex.selectedIndex;
	if (s == 0)
		return;
	var name = this.q.selRegex.options[s].value;
	this.q.value = name;
	this.q.regexName.value = name;
	this.q.regexPattern.value = QuizEdit.regex.search(name);
};

QuizEdit.prototype.pickStdChoice = function () {
	var name = this.selStdChoice.options[this.selStdChoice.selectedIndex].value;
	this.stdChoice.value = name;
	var answers = Quiz.stdChoice[name];
	console.log(answers);
	if (this.ansTable.rows.length < answers.length + 1) {
		for (var i = this.ansTable.rows.length; i < answers.length + 1; i++)
			this.addOption(i);
	} else if (this.ansTable.rows.length > answers.length + 1) {
		for (var i = this.ansTable.rows.length - 1; i > answers.length + 1; i--)
			this.ansTable.deleteRow(i);
	}
	for (var i = 0; i < answers.length; i++) {
		this.ansTable.rows[i + 1].cells[0].innerHTML = "";
		this.ansTable.rows[i + 1].cells[0].appendChild(Util.input("text", null, null, answers[i]));
	}
};

QuizEdit.regex = new PolicyDef("Regex", {
	mass: "kg|KG|kilo|kilogram",
	length: "m|meter",
	time: "sec|s|second"
});

QuizPolicies.add(QuizEdit.regex);


QuizEdit.varTypes = [
    "question", "quiz", "course", "user", "subject", "global"
];

QuizEdit.prototype.addEditButtons = function () {
	return [Util.button("Add Question", this.addQuestion()),
			Util.button("Add SubQuestion", this.addSubQuestion()),
			Util.button("Close Editor",this.closeEditor())];
};

QuizEdit.prototype.appendParagraphEditor = function () {
	this.appendParaEditor(1);
};

QuizEdit.prototype.appendParaCode = function () {
	this.appendParaEditor(2);
};

QuizEdit.prototype.appendInstructions = function () {
	this.appendParaEditor(0);
};

QuizEdit.prototype.appendParaEditor = function (num,q) {
	var i = 0;
	var funcs = ["instructions",
				 "paragraph",
				 "precode",
				 undefined
				 ];

	var instr = this.addDispButton("Instructions", funcs[i++], "paramulti paramultileft"),
		parag = this.addDispButton("Paragraph", funcs[i++], "paramulti"),
		code = this.addDispButton("Code", funcs[i++], "paramulti"),
		text2eq = Util.button("Text2Equation", funcs[i++], "paramulti paramultiright");


	var types = [instr,
				 parag,
				 code,
				 text2eq
				];

	var textBox = this.varWriter("blankbox", 5, 60);
	if(q!=null){
		if(q.content[0][0]=="instructions"){
		textBox.innerHTML=q.content[0][1];
		}
	}
	
	var t = this;
	textBox.oninput = function () {
		var e = this.paraEditor;
		
		var cont = [funcs[e.activeType.i], e.textBox.valueOf()];
		if (e.ind != -1) {
			t.q.content[e.ind] = cont;
		} else {
			if(t.q.content[0]!=null&&t.q.content[0][0]==cont[0]){
				cont=t.q.content[0];
				e.ind = 0;
			}
			else{
				t.q.content.push(cont);
				e.ind = t.q.content.length - 1;
			}
		}
		t.renderQuestion();
	};

	var paraEditor = Util.divadd("qetitlehold",
		types,
		Util.br(),
		textBox,
		Util.br()
	);

	paraEditor.textBox = textBox;
	paraEditor.activeType = types[num];
	paraEditor.ind = -1;
	types[num].classList.add("paramultiselected");

	for (var i in types) {
		types[i].paraEditor = paraEditor;
		types[i].i = i;
	}
	textBox.paraEditor = paraEditor;
	paraEditor.types = types;

	textBox.oninput.call(textBox);
	//this.editor.appendChild();
	this.editor.insertBefore(paraEditor, this.appendIndex);
};
QuizEdit.prototype.editNewQuestion = function () {
	//    var submitbar = document.getElementById("submitDiv-2");
	//    submitbar.parent.removeChild(submitbar);
	this.q = {
		id: --QuizEdit.newid,
		title: "",
		level: 1,
		points: 1,
		content: [],
		answers: []
	};

	page.questions.push(this.q);

	this.id = page.questions.length - 1;
	page.refreshQuestion(this.id);

	var e = this.editor = document.getElementById("edit-qc" + this.q.id);
	this.scrollToEditor();

	e.appendChild(Util.h1("Question Editor"));


	e.appendChild(Util.divadd("qetitlehold",
		this.addEditButtons(),
		Util.br(),
		Util.span("Title", "qetitle"),
		Util.br(),
		this.title = this.inputBlur("text", "title"),
		Util.br(),
		Util.span("Level:", "qelabel"),
		this.level = this.inputBlur("number", "level"),
		Util.span("Points:", "qelabel"),
		this.points = this.inputBlur("number", "points"),
		Util.br()
	));


	this.appendIndex = Util.div("apndIndx");
	e.appendChild(this.appendIndex);
	
	this.appendParaEditor(0);

	var image, audio, video;
	e.appendChild(Util.table([
    [image = Util.file("Upload Image", QuizEdit.imageFileTypes, QuizEdit.EDITCTRL, "image_src"),
      audio = Util.file("Upload Audio", QuizEdit.audioFileTypes, QuizEdit.EDITCTRL, "audio_src"),
      video = Util.file("Upload Video", QuizEdit.videoFileTypes, QuizEdit.EDITCTRL, "video_src")
    ]
    ]));
	var t = this;
	image.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildImage(this.input.files[0].name, 0, 0, 500, 500));
	};
	audio.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildAudio(this.input.files[0].name));
	};
	video.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildVideo(this.input.files[0].name));
	};

	var ins = [
    [this.editButton("Equation", this.editEquation),
      this.editButton("Random Var", this.editRandomVars),
      this.editButton("Paragraph", this.appendParagraphEditor),
      this.editButton("Instruction", this.appendInstructions),
      this.editButton("Code Paragraph", this.appendParaCode)],
    [this.editButton("MC Dropdown", this.editMultiChoiceDropdown),
      this.editButton("MC RadioVert", this.editMultiChoiceRadioVert),
      this.editButton("MC RadioHoriz", this.editMultiChoiceRadioHoriz),
      this.editButton("MultiAnswer", this.editMultiAnswer),
      this.editButton("Matching", null)],
    [
      this.editButton("Survey", this.editSurvey),
      this.editButton("Fillin", this.editFillin),
      this.editButton("Number", this.editNumber),
      this.editButton("Regex", this.editRegex),
      this.editButton("Formula", null)
         ],
    [
      this.editButton("Eq Question", this.editEquationQuestion),
      this.editButton("Essay", this.editEssay),
      this.editButton("Code", this.editCode),
      this.editButton("Grid", this.editGrid),
      this.editButton("CLOZE", this.editCLOZE)
         ],
    [
      this.editButton("ImgClick", this.editImgClick),
      this.editButton("Graph", null),
      this.editButton("Diagram", null),
      this.editButton("", null),
      this.editButton("", null)
         ]
    ];
	e.appendChild(Util.table(ins));
	this.varEdit = Util.div("varEdit", "varEdit");
	e.appendChild(this.varEdit);
	Util.append(e, this.addEditButtons());
	this.selStdChoice = this.selectName(Quiz.stdChoice, this.pickStdChoice, "Select Choice");
	//this.selVarType = this.selectName(QuizEdit.varTypes, this.pickVar, "Select Var");

	this.title.focus();
}
QuizEdit.prototype.editOldQuestion = function (edi,qu,num) {
	console.log(edi);
	this.q = qu;
	this.q.answers=[];
	this.id = num;
	page.refreshQuestion(this.id);

	var e = this.editor =  edi;
	this.scrollToEditor();

	e.appendChild(Util.h1("Question Editor"));
	e.appendChild(Util.divadd("qetitlehold",
		this.addEditButtons(),
		Util.br(),
		Util.span("Title", "qetitle"),
		Util.br(),
		this.title = this.inputBlur("text", "title"),
		Util.br(),
		Util.span("Level:", "qelabel"),
		this.level = this.inputBlur("number", "level"),
		Util.span("Points:", "qelabel"),
		this.points = this.inputBlur("number", "points"),
		Util.br()
	));


	this.appendIndex = Util.div("apndIndx");
	e.appendChild(this.appendIndex);
	console.log(this.q);
	this.appendParaEditor(0,this.q);

	var image, audio, video;
	e.appendChild(Util.table([
    [image = Util.file("Upload Image", QuizEdit.imageFileTypes, QuizEdit.EDITCTRL, "image_src"),
      audio = Util.file("Upload Audio", QuizEdit.audioFileTypes, QuizEdit.EDITCTRL, "audio_src"),
      video = Util.file("Upload Video", QuizEdit.videoFileTypes, QuizEdit.EDITCTRL, "video_src")
    ]
    ]));
	var t = this;
	image.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildImage(this.input.files[0].name, 0, 0, 500, 500));
	};
	audio.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildAudio(this.input.files[0].name));
	};
	video.onchange = function () {
		//TODO: do the upload to the server
		t.completeEdit(t.buildVideo(this.input.files[0].name));
	};

	var ins = [
    [this.editButton("Equation", this.editEquation),
      this.editButton("Random Var", this.editRandomVars),
      this.editButton("Paragraph", this.appendParagraphEditor),
      this.editButton("Instruction", this.appendInstructions),
      this.editButton("Code Paragraph", this.appendParaCode)],
    [this.editButton("MC Dropdown", this.editMultiChoiceDropdown),
      this.editButton("MC RadioVert", this.editMultiChoiceRadioVert),
      this.editButton("MC RadioHoriz", this.editMultiChoiceRadioHoriz),
      this.editButton("MultiAnswer", this.editMultiAnswer),
      this.editButton("Matching", null)],
    [
      this.editButton("Survey", this.editSurvey),
      this.editButton("Fillin", this.editFillin),
      this.editButton("Number", this.editNumber),
      this.editButton("Regex", this.editRegex),
      this.editButton("Formula", null)
         ],
    [
      this.editButton("Eq Question", this.editEquationQuestion),
      this.editButton("Essay", this.editEssay),
      this.editButton("Code", this.editCode),
      this.editButton("Grid", this.editGrid),
      this.editButton("CLOZE", this.editCLOZE)
         ],
    [
      this.editButton("ImgClick", this.editImgClick),
      this.editButton("Graph", null),
      this.editButton("Diagram", null),
      this.editButton("", null),
      this.editButton("", null)
         ]
    ];
	e.appendChild(Util.table(ins));
	this.varEdit = Util.div("varEdit", "varEdit");
	e.appendChild(this.varEdit);
	Util.append(e, this.addEditButtons());
	this.selStdChoice = this.selectName(Quiz.stdChoice, this.pickStdChoice, "Select Choice");
	//this.selVarType = this.selectName(QuizEdit.varTypes, this.pickVar, "Select Var");

	this.title.focus();
}

/*
 * Edit and store the parameters of an assignment, including due dates
 */
function Assignment() {
	this.body = document.getElementById("container"); //TODO: figure out a strategy to eliminate this commmon logic between Assignment, Policy, QuizEdit, etc.
	this.body.className = "quizEditor";
}

Assignment.prototype.edit = function () {
	var assign = Util.div("assign", "assign");
	this.body.appendChild(assign);

	assign.appendChild(
		Util.table([
        ["Open Date", Util.input("text", "openDate")],
        ["Due Date", Util.input("text", "dueDate")],
        ["Close  Date", Util.input("text", "closeDate")],
        ["Points", Util.input("number", "points")],
    ])
	);
	this.scrollToEditor();
}

/**
 * Named Entities are values that are stored in a hash, have a selector to pick the name
 * The user can type in a new name and create a new NamedEntity, delete an old one
 * The hash is stored as a class variable in Quiz.
 * The parameters to the constructor include the three methods of QuizEdit that should be invoked
 * when clicked:
 *   When the create button is pressed, create a new named entity in the hash and update the select
 *   When the delete button is pressed, remove the name from the hash and selection.
 *   When an item is selected from the selection, 
 *
 */
QuizEdit.prototype.NamedEntity = function (kind, createAction, deleteAction, selectAction) {
	//    Quiz[kind] = page[kind]; // look up the name in the ajax payload and store in the quiz.
	var hash = page[kind];
	var sel = QuizEdit["select" + kind] = document.createElement("select");
	sel.onchange = (method === null) ? null : method.bind(this);

	sel.appendChild(Util.option(null, defaultLabel));
	for (var k in hash) {
		sel.appendChild(Util.option(k, k));
	}
	this["sel" + kind] = sel;
}