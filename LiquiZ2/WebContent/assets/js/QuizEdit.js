/*
 * Quiz Editor
 * author: Ying Zhao
 *
 * reorganized and refactored Dov Kruger and Asher Davidson 8/12/2015
 * All parameters are now passed to build methods by storing them in this.
 * Not so robust, but it streamlines the code 
 */

QuizEdit.newid = 0;

function QuizEdit() {
    this.body = document.getElementById("container");
}

QuizEdit.CTRL = "editctrl";
QuizEdit.BUTTON = "editbutton";

QuizEdit.prototype.openBracket = "[[";
QuizEdit.prototype.closeBracket = "]]";

QuizEdit.prototype.addBrackets = function(ta, selStart, selEnd) {
    var v = ta.value;
    ta.value = v.substring(0, selStart) + ' ' + this.openBracket +
	v.substring(selStart, selEnd)
	+ this.closeBracket + ' ' + v.substring(selEnd);
}

//TODO: Remove dependence on JQuery
QuizEdit.prototype.currentEdit;

//Perform all actions to complete a question edited and added to the end of the quiz
QuizEdit.prototype.completeEdit = function(array) {
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

// create a question, display it, remove the editor
//TODO: Have a mode where it automatically keeps the editor open for multiple questions?
QuizEdit.prototype.addQuestion = function() {
    var t = this;
    return function() { t.completeEdit(t.cbFunc());};
}

QuizEdit.prototype.addSubQuestion = function() {
    var t = this;
    return function() { t.completeEdit(t.cbFunc());};
}

// Cancel a question, add nothing and remove the editor
QuizEdit.prototype.cancel = function() {

}

QuizEdit.prototype.addFields = function(cbFunc) {
    this.cbFunc = cbFunc;
    this.varEdit.innerHTML = ""; // clear all the options before adding the new ones
    this.varEdit.innerHTML = "foo!";
    for (var i = 1; i < arguments.length; i++) {
	if (typeof(arguments[i]) === 'string')
	    this.varEdit.appendChild(document.createTextNode(arguments[i]));
	else
    	    this.varEdit.appendChild(arguments[i]);
    }
}

QuizEdit.prototype.buildFillin = function() {
    return [
            ['fillin', newid],
    ];
};

QuizEdit.prototype.editFillin = function() {
    this.addFields(this.buildFillin,
 		   Util.span("Answer: "),
 		   this.ans = Util.input("text", "ans", "ans")
    );
};

QuizEdit.prototype.buildNumber = function() {
    return [
	['numeric', QuizEdit.newid]
    ];
};

QuizEdit.prototype.editNumber = function() {
    this.addFields(this.buildNumber,
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
    this.addFields(this.buildEssay,
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
    (this.buildCode,
     Util.span("Rows:"), this.textAreaRows = Util.input("number", "rows", null, 10),
     Util.span("Cols:"), this.textAreaCols = Util.input("number", "cols", null, 80),
     Util.select(null, null,
		 ["-Select Language-", "C++", "Java", "Python", "Perl", "Processing"], null, "langSelect")
    );
}

QuizEdit.prototype.buildMCDropdown = function() {
    return [
	['selectText', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.buildMCRadioTextVert = function() {
    return [
	['mcRadioTextVert', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.buildMCRadioTextHoriz = function() {
    return [
	['mcRadioTextHoriz', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.buildMAnswer = function() {
    return [
	['multiAnswer', --QuizEdit.newid, this.answers]
    ];
}

QuizEdit.prototype.deleteAnswer = function() {
    console.log('delete answer');
}

QuizEdit.prototype.addOption = function(row) {
    var r = ansTable.insertRow();
    var td = r.insertCell();
    td.innerHTML = row;
    td = r.insertCell();
    td.appendChild(Util.input("text", QuizEdit.EDITCTRL, "a"+row));
    this.editButton("delete", this.deleteAnswer);
}

QuizEdit.prototype.addStdChoice = function(stdChoice) {
    stdChoice.style.background="#fff";
    var name = stdChoice.value;
    if (name === '') {
	stdChoice.style.background="#f00";
	return; //TODO: alert? need a name for a standard choice
    }
    console.log(this);
    var answers = [];
    for (var i = 0; i < ansTable.rows; i++) {
	answers.push(document.getElementById("a"+i));
    }
    Quiz.stdChoice[name] = answers;
}

QuizEdit.prototype.editMC = function(questionType) {
    var numberBox, ansTable, stdChoice;
    var addOption = function() {
	var count = numberBox.value;
	var row = ansTable.rows.length-1;
	if (1 < count || count > 100) count = 1;
	for (var i = 0; i < count; i++) {
	    this.addOptions(ansTable, i);
	}
	scrollToId(id);
    };
    this.editor.appendChild
    (Util.divadd
     (QuizEdit.EDITCTRL,
      numberBox = Util.input("number", QuizEdit.EDITCTRL, "optionAdd"),
      Util.button("Add Option", addOption, QuizEdit.EDITBUTTON),
      Util.span("Name"),
      stdChoice = Util.input("text", 'editInput', 'stdChoice'),
      Util.button("Create Standard Choice", createStdChoice)
     ));

    var list = [ ["Answer Id", "Answer", "correct"] ];
    for (var row = 0; row < 4; row++) {
	list.push([row,
		   Util.input("text", QuizEdit.EDITCTRL, "a"+row),
		   Util.checkbox(null, "check"+row, "editCB", "check"+row),
		   this.editButton("delete", this.deleteAnswer)]);
    }
    var ansTable = Util.table(list, true);

    this.addFields(questionType, ansTable, div);
    this.answers = [];
}

QuizEdit.prototype.editMultiChoiceDropdown = function() {
    this.editMC(this.buildMCDropdown);
}

QuizEdit.prototype.editMultiChoiceRadioVert = function() {
    this.editMC(this.buildMCRadioTextVert);
}

QuizEdit.prototype.editMultiChoiceRadioHoriz = function() {
    this.editMC(this.buildMCRadioTextVert);
}

QuizEdit.prototype.editMultiAnswer = function() {
    this.editMC(this.buildMAnswer);
}

QuizEdit.prototype.addStandardChoice = function(name, choices, nameBlank) {
    Quiz.stdChoice[name] = choices;
}

QuizEdit.prototype.editSurvey = function() {
    this.editMC(this.buildSurvey);
}

QuizEdit.prototype.buildCLOZE = function(){
    return [
	['cloze', --QuizEdit.newid, this.text],
    ];
}

QuizEdit.prototype.editCLOZE = function() {
    var ta;
    this.addFields(this.buildCLOZE,
		   ta = Util.textarea(null, "cloze", "x", this.textAreaRows, this.textAreaCols),
		   Util.span("Rows:"), this.textAreaRows = Util.input("number", "rows", null, 10),
		   Util.span("Cols:"), this.textAreaCols = Util.input("number", "cols", null, 80),
		   Util.button("SquareBracket It!", function(){addBrackets(ta, selStart, selEnd) } )
  		  );
    var selStart, selEnd;
//    var exampleClozeTest = 'public class A {\n [[]]  public [[]] '+
//	'void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
    
    ta.onmouseup = function(){ selStart = ta.selectionStart; 
			       selEnd = ta.selectionEnd; 
			       console.log(ta.selectionStart + "," + ta.selectionEnd); }
    ta.ondblclick = function(){this.addBrackets(ta, selStart, selEnd)};
}

QuizEdit.prototype.buildMatrix = function() {
    return [
        ['matrix', this.matrixRows, this.matrixCols],
    ];
};

QuizEdit.prototype.editMatrix = function() {
    this.addFields(this.buildMatrix,
 		   Util.span("Rows: "), this.matrixRows = Util.input("number", QuizEdit.EDITCTRL, "rows"),
 		   Util.span("Cols: "), this.matrixCols = Util.input("number", QuizEdit.EDITCTRL, "cols")
		//   this.ans = //TODO: add a matrix to fill in the values
    );
};

QuizEdit.prototype.buildRegex = function() {
    return [
            ['regex', --QuizEdit.newid],
    ];
};

QuizEdit.prototype.editRegex = function() {
    this.addFields(this.buildRegex,
 		   Util.span("Regex Name: "), Util.input("text", QuizEdit.EDITCTRL, "regexName"),
 		   Util.span("Regex Pattern: "), Util.input("text", QuizEdit.EDITCTRL, "regex"),
 		   Util.span("Must match:"), this.mustMatch = Util.textarea(null, QuizEdit.EDITCTRL, null, 10, 40),
 		   Util.span("Cannot match:"), this.cannotMatch = Util.textarea(null, QuizEdit.EDITCTRL, null, 10, 40))
};

//Complete list of every question type supported by editQuestion
QuizEdit.questionTypes = [
    "-Choose QuestionType-",
    "MultiChoiceDropdown", "MultiChoiceRadioVert", "MultiChoiceRadioHoriz", "MultiAnswer", "Matching", "Survey", 
    "Fillin", "Number", "Regex", "Formula", "Equation",
    "Essay", "Code", "Matrix", "Cloze", "ImgClick",
    "Graph", "Diagram"
];

QuizEdit.random = [
    "-Random Element-",
    "Integer", "Decimal", "String", "Name"
];

// Support adding images, audio and video into a question.  Any additional multimedia controls belong here
QuizEdit.prototype.insertMultimedia = function() {
}

QuizEdit.imageFileTypes = "jpg,jpeg,png,eps,gif,bmp";
QuizEdit.audioFileTypes = "mp3,ogg,wav";
QuizEdit.videoFileTypes = "mpg,mpeg,mp4";

QuizEdit.prototype.inputBlur = function(type, val) {
    var t = this;
    var v = Util.input(type, QuizEdit.EDITCTRL, val, this.q[val]);
    v.onblur = function() {
	t.q[val] = v.value; // change attributes of question like title, points...
	page.refreshQuestion(t.q);
    };
    return v;
}

QuizEdit.prototype.editButton = function(label, method) {
    var b = Util.button(label, (method === null) ? null : method.bind(this), QuizEdit.EDITCTRL);
    return b;
}

QuizEdit.prototype.addDispButton = function(title, funcName) {
    var t = this;
    return Util.button(title, function() {
	t.q.content.push([funcName, t.textBox.value])
    });
}

QuizEdit.prototype.editQuestion = function() {
//    var submitbar = document.getElementById("submitDiv-2");
//    submitbar.parent.removeChild(submitbar);
    $("#submitDiv-2").remove();
    this.q = {
	id: --QuizEdit.newid,
	title: "",
	level: 1,
	points: 1,
	content:[],
	answer: []
    };
    page.questions.push(this.q);
    page.refreshQuestions();

    var e = this.editor = Util.div("editor", "editor");
    this.body.appendChild(this.editor);
    e.appendChild(Util.h1("Question Editor"));
    
    var meta = [
	["Title", this.inputBlur("text", "title")],
	["Level:", this.inputBlur("number", "level")],
	["Points:", this.inputBlur("number", "points")],
    ];
    e.appendChild(Util.table(meta));
    var list = [	
	["Question Text:", this.textBox = Util.textarea(null, "textArea", "blankbox", 5, 60),
	 Util.divadd(null, Util.h2("Insert"),
		     this.addDispButton("Instructions", "instructions"),
		     this.addDispButton("Paragraph", "Util.p"),
		     this.addDispButton("Code", "precode"),
		     Util.button("Text2Equation"))//TODO: need equation feature
	]
    ];
    e.appendChild(Util.table(list));
    e.appendChild( Util.table( [
	[ Util.file(QuizEdit.imageFileTypes, QuizEdit.EDITCTRL, "image_src"),
	  Util.file(QuizEdit.audioFileTypes, QuizEdit.EDITCTRL, "audio_src"),
	  Util.file(QuizEdit.videoFileTypes, QuizEdit.EDITCTRL, "video_src")
	]
    ] ));
    var ins = [
	[ this.editButton("Equation", null),
	  this.editButton("Rnd Int", null),
	  this.editButton("Rnd Dec", null),
	  this.editButton("Rnd String", null),
	  this.editButton("Rnd Name", null)         ],
	[ this.editButton("MC Dropdown", this.editMultiChoiceDropdown),
	  this.editButton("MC RadioVert", this.editMultiChoiceRadioVert),
	  this.editButton("MC RadioHoriz", this.editMultiChoiceRadioHoriz),
	  this.editButton("MultiAnswer", this.editMultiAnswer),
	  this.editButton("Matching", null)         ],
	[
	  this.editButton("Survey", this.editSurvey),
	  this.editButton("Fillin", this.editFillin),
	  this.editButton("Number", this.editNumber),
	  this.editButton("Regex", this.editRegex),
	  this.editButton("Formula", this.editFormula)
         ],
	[
	  this.editButton("Equation", null),
	  this.editButton("Essay", this.editEssay),
	  this.editButton("Code", this.editCode),
	  this.editButton("Matrix", this.editMatrix),
	  this.editButton("CLOZE", this.editCLOZE)
         ],
	[
	  this.editButton("ImgClick", null),
	  this.editButton("Graph", null),
	  this.editButton("Diagram", null),
	  this.editButton("", null),
	  this.editButton("", null)
         ]
    ];
    e.appendChild(Util.divadd(Util.h2("Insert"), Util.table(ins)));
    e.appendChild(Util.button("Add Question", this.addQuestion()));
    e.appendChild(Util.button("Add SubQuestion", this.addSubQuestion());
    this.varEdit = Util.div(QuizEdit.EDITCTRL, "varEdit");
    scrollToId("editor");
}

/*
* Edit and store the policies governing a quiz, ie how it may be taken, when to display answers, etc.
*/
function Policy() {
    this.body = document.getElementById("container");
    this.body.className = "quizEditor";
}

Policy.names = ["homework1x", "homework4x", "midtermreview"];
Policy.prototype.edit = function() {
    var policy = Util.div("policy", "policy");
    this.body.appendChild(policy);

    policy.appendChild(
	Util.table([
	    ["Name", Util.input("text", "name"),
	     Util.select("existingName", false, Policy.names, QuizEdit.EDITCTRL),
	     Util.button("Save", QuizEdit.EDITBUTTON), Util.button("Delete", QuizEdit.EDITBUTTON), Util.button("Copy", QuizEdit.EDITBUTTON)
	    ]
	]));
    
    policy.appendChild(
	Util.table([
	    ["Attempts permitted", Util.input("number", QuizEdit.EDITCTRL, "attempts")],
	    ["Duration (min)", Util.input("number", QuizEdit.EDITCTRL, "duration", 0)],
	    ["Show Student Answers", Util.yesno(QuizEdit.EDITCTRL, "showStudentAnswers")],
	    ["Show Correct Answers", Util.yesno(QuizEdit.EDITCTRL, "showCorrectAnswers")],
	    ["One question per page", Util.yesno(QuizEdit.EDITCTRL, "showCorrectAnswers")],
	    ["Scored", Util.yesno(QuizEdit.EDITCTRL, "scored")],
	    ["Shuffle Questions", Util.yesno(QuizEdit.EDITCTRL, "shuffleQuestions")],
	    ["Shuffle Answers", Util.yesno(QuizEdit.EDITCTRL, "shuffleAnswers")],
	    ["Access Code", Util.input("text", QuizEdit.EDITCTRL, "accessCode")],
	    ["Filter IP", Util.yesno(QuizEdit.EDITCTRL, "filterIP")],

 	    ["Early Bonus", Util.input("number", QuizEdit.EDITCTRL, "earlyBonus", 0)],
	    ["Early Daily Bonus", Util.input("number", QuizEdit.EDITCTRL, "earlyDailyBonus", 0)],
 	    ["Late Penalty", Util.input("number", QuizEdit.EDITCTRL, "latePenalty", 0)],
	    ["Late Daily Penalty", Util.input("number", QuizEdit.EDITCTRL, "lateDailyPenalty", 0)],
	    
	])
    );
    scrollToId("policy");
}


/*
 * Edit and store the parameters of an assignment, including due dates
 */
function Assignment() {
    this.body = document.getElementById("container"); //TODO: figure out a strategy to eliminate this commmon logic between Assignment, Policy, QuizEdit, etc.
    this.body.className = "quizEditor";
}

Assignment.prototype.edit = function() {
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
    scrollToId("policy");
}
