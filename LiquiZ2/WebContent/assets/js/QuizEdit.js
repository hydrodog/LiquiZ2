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

QuizEdit.EDITCTRL = "editctrl";
QuizEdit.INT = "editint";
QuizEdit.DOUBLE = "editdouble";
QuizEdit.NAME = "editname";
QuizEdit.QUESTION = "question";

QuizEdit.BUTTON = "editbutton";
QuizEdit.ANSWERS = "answers";
QuizEdit.TEXTAREA = "editTA";
QuizEdit.REGEX = "editPattern";

QuizEdit.prototype.scrollToEditor = function() {
//    location= location.href.split("#")[0]+'#'+this.q.id;
    scrollToId("edit-qc" + this.q.id);
};

QuizEdit.prototype.renderQuestion = function() {
    page.refreshQuestion(this.id);
    this.scrollToEditor();
}

QuizEdit.prototype.editButton = function(label, method) {
    return Util.button(label, (method === null) ? null : method.bind(this), QuizEdit.EDITCTRL);
}

QuizEdit.prototype.textArea = function(id, rows, cols) {
    return Util.textarea(null, QuizEdit.TEXTAREA, id, rows, cols);
}

QuizEdit.prototype.addDispButton = function(title, funcName) {
    var t = this;
    return Util.button(title, function() {
        t.q.content.push([funcName, t.textBox.value]);
        t.renderQuestion();
    });
}

QuizEdit.prototype.openBracket = "[[";
QuizEdit.prototype.closeBracket = "]]";

//TODO: Remove dependence on JQuery
QuizEdit.prototype.currentEdit;

QuizEdit.prototype.update = function() {
    this.q.title = this.title.value;
    this.q.level = this.level.value;
    this.q.points = this.points.value;
}
//Perform all actions to complete a question edited and added to the end of the quiz
QuizEdit.prototype.completeEdit = function(array) {
    this.update();
    for (var i = 0; i < array.length; i++)
        this.q.content.push(array[i]);
//    $("#editor").remove(); // remove from window
//    $("#qC").remove();
//    var array = buildFunc(); //.apply(this||window, Array.prototype.slice.call(arguments, 1));
    this.renderQuestion();
}

// create a question, display it, remove the editor
//TODO: Have a mode where it automatically keeps the editor open for multiple questions?
QuizEdit.prototype.addQuestion = function() {
    var t = this;
    return function() {
        t.completeEdit(t.cbFunc());
        t.editor.innerHTML = "";
    };
}

QuizEdit.prototype.addSubQuestion = function() {
    var t = this;
    return function() {
        t.completeEdit(t.cbFunc());
    };
}

// Cancel a question, add nothing and remove the editor
QuizEdit.prototype.cancel = function() {

}

QuizEdit.prototype.addFields = function(cbFunc) {
    this.cbFunc = cbFunc;
    this.varEdit.innerHTML = ""; // clear all the options before adding the new ones
    for (var i = 1; i < arguments.length; i++) {
        if (typeof(arguments[i]) === 'string')
           this.varEdit.appendChild(document.createTextNode(arguments[i]));
       else
            this.varEdit.appendChild(arguments[i]);
    }
    this.scrollToEditor();
}

QuizEdit.prototype.buildFillin = function() {
    this.q.answers.push([this.ans.value]);
    return [
        ['fillin', --QuizEdit.newid],
    ];
};

QuizEdit.prototype.editFillin = function() {
    this.addFields(this.buildFillin,
           Util.span("Answer: "),
           this.ans = Util.input("text", "ans", "ans")
    );
};

QuizEdit.prototype.buildNumber = function() {
    this.q.answers.push([this.min.value, this.max.value]);
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

QuizEdit.prototype.buildMC = function() {
    var rows = this.ansTable.rows;
    var answers = new Array(rows.length-1);
    var correct = new Array(rows.length-1);
    for (var i = 1; i < rows.length; i++) {
        answers[i-1] = rows[i].cells[0].children[0].value
        correct[i-1] = rows[i].cells[1].children[0].checked;
    }
    this.q.answers.push([answers,correct]);
    return answers;
}

QuizEdit.prototype.buildSurveyQuestions = function() {
    var surveyQuestions = [];
    var rows = this.surveyQuestions.rows;
    for (var i = 0; i < rows.length; i++) {
        surveyQuestions[i] = rows[i].cells[0].children[0].value;
    }
    return surveyQuestions;
}

QuizEdit.prototype.buildMCDropdown = function() {
    return [
    ['selectText', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMCRadioTextVert = function() {
    return [
    ['mcRadioTextVert', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMCRadioTextHoriz = function() {
    return [
        ['mcRadioTextHoriz', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildMAnswer = function() {
    return [
    ['multiAnswer', --QuizEdit.newid, this.buildMC()]
    ];
}

QuizEdit.prototype.buildSurvey = function() {
    return [
    ['mcSurvey', --QuizEdit.newid, this.buildSurveyQuestions(), this.buildMC()]
    ];
}

QuizEdit.prototype.deleteAnswer = function() {
    console.log('delete answer');
}

QuizEdit.prototype.addOption = function(row) {
    var count = Number(this.optCount.value);
    if (count < 1 || count > 100) count = 1;
    for (var i = 0; i < count; i++) {
        var r = this.ansTable.insertRow();
        var td = r.insertCell();
        td.appendChild(Util.input("text", QuizEdit.EDITCTRL, "a"+row));
        if (this.withCheckbox) {
            td = r.insertCell();
            td.appendChild(Util.checkbox(null, "check"+row, "editCB", "check"+row));
        }
        td = r.insertCell();
        td.appendChild(this.editButton("delete", this.deleteAnswer));
    }
    this.scrollToEditor();
}

QuizEdit.prototype.addStdChoice = function() {
    //stdChoice.style.background="#fff";
    var name = this.stdChoice.value;
    if (name === '') {
        this.stdChoice.style.background="#f00";
        return; //TODO: alert? need a name for a standard choice
    }
    var answers = [];
    for (var i = 0; i < this.ansTable.rows.length; i++) {
        var inp =document.getElementById("a"+i);
        if (inp !== null)
            answers.push(inp.value);
    }
    Quiz.stdChoice[name] = answers;
    var c = Util.option(name, name);
    this.selStdChoice.add(c);
}


QuizEdit.prototype.deleteStdChoice = function() {
    var name = this.stdChoice.value;
    delete Quiz.stdChoice[name];
    for (var i = 0; i < this.selStdChoice.children.length; i++)
        if (this.selStdChoice.children[i].value == name)
            this.selStdChoice.remove(i);
}

QuizEdit.prototype.selectName = function(hash, method, defaultLabel) {
    var sel = document.createElement("select");
    sel.onchange = (method === null) ? null : method.bind(this);

    sel.appendChild(Util.option(null, defaultLabel));
    for (var k in hash) {
        sel.appendChild(Util.option(k,k));
    }
    return sel;
}

QuizEdit.prototype.editMCtop = function(checkbox) {
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
            list.push([ Util.input("text", QuizEdit.EDITCTRL, "a"+row),
               Util.checkbox(null, "check"+row, "editCB", "check"+row),
               this.editButton("delete", this.deleteAnswer)]);
        } else {
            list.push([ Util.input("text", QuizEdit.EDITCTRL, "a"+row),
               this.editButton("delete", this.deleteAnswer)]);            
        }
    }
    this.ansTable = Util.table(list, true, QuizEdit.ANSWERS);
}

QuizEdit.prototype.editMC = function(questionType) {
    this.editMCtop(true);
    this.addFields(questionType, this.mcHeader, this.mcHeader2, this.ansTable);
    this.answers = [];
}

QuizEdit.prototype.editMultiChoiceDropdown = function() {
    this.editMC(this.buildMCDropdown);
}

QuizEdit.prototype.editMultiChoiceRadioVert = function() {
    this.editMC(this.buildMCRadioTextVert);
}

QuizEdit.prototype.editMultiChoiceRadioHoriz = function() {
    this.editMC(this.buildMCRadioTextHoriz);
}

QuizEdit.prototype.editMultiAnswer = function() {
    this.editMC(this.buildMAnswer);
}

QuizEdit.prototype.addStandardChoice = function(name, choices, nameBlank) {
    Quiz.stdChoice[name] = choices;
}

QuizEdit.prototype.addSurveyQuestion = function(i) {
    var tr = this.surveyQuestions.insertRow();
    var c = tr.insertCell();
    c.appendChild(Util.input("text", QuizEdit.QUESTION, 'surveyQuestion'+i))
    c = tr.insertCell();
    c.appendChild(this.editButton("delete", null));
}

QuizEdit.prototype.editSurvey = function() {
    this.editMCtop(false);
    var surveyQuestions = [[this.editButton("More Questions", this.addSurveyQuestion)]];
    for (var i = 0; i < 4; i++) {
        surveyQuestions.push([Util.input("text", QuizEdit.QUESTION, 'surveyQuestion'+i), this.editButton("delete", null)]);
    }
    this.surveyQuestions = Util.table(surveyQuestions, false);

    this.addFields(this.buildSurvey, this.mcHeader, this.mcHeader2, this.ansTable, Util.h2("Survey Questions"),this.surveyQuestions);
    this.answers = [];
}

QuizEdit.prototype.buildCLOZE = function(){
    return [
        ['cloze', --QuizEdit.newid, this.CLOZE.value],
    ];
}

QuizEdit.prototype.addBrackets = function() {
    var ta = this.CLOZE;
    var v = ta.value;
    ta.value = v.substring(0, this.selStart) + ' ' + this.openBracket +
    v.substring(this.selStart, this.selEnd)
    + this.closeBracket + ' ' + v.substring(this.selEnd);
}

QuizEdit.prototype.editCLOZE = function() {
    var t = this;
    this.addFields(this.buildCLOZE,
        Util.table([
           [Util.span("Rows:"), this.textAreaRows = Util.input("number", QuizEdit.INT, null, 10),
           Util.span("Cols:"), this.textAreaCols = Util.input("number", QuizEdit.INT, null, 80)],
           [this.editButton("SquareBracket It!", this.addBrackets)]
        ]), this.CLOZE = Util.textarea(null, "code cloze", "cloze", this.textAreaRows.value, this.textAreaCols.value));
    
    this.CLOZE.onmouseup = function(){
        t.selStart = t.CLOZE.selectionStart; 
        t.selEnd = t.CLOZE.selectionEnd; 
        console.log(t.selStart + "," + t.selEnd);
    };
    this.CLOZE.ondblclick = function(){ t.addBrackets(); };
}

//Equation part
QuizEdit.prototype.buildEquation = function() {
    this.q.answers.push(parseEquation(this.equation.tag));
    return [
        ['equation', "equation"+this.id, "true"]
    ];
};

QuizEdit.prototype.editEquation = function() {
	this.equation = new Equation({
        "target": this.varEdit,
        "btn": ["Fraction", "Script", "Integral", "LargeOperator", "Bracket", "Function"]
    }); 
    this.addFields(this.buildEquation, 
    		Util.span("Answer: "), this.equation.equationBox(), 
    		Util.br(), this.equation.equationButton("Equation Editor")
    );
    this.varEdit.appendChild(this.equation.x);
};

QuizEdit.prototype.buildEquationQues = function() {
    return [
        ['equation', "equationQues"+this.id, "false", parseEquation(this.equation.tag)]	//TODO: maybe add parameter to pass button editions 
    ];
};

QuizEdit.prototype.editEquationQues = function() {
	this.equation = new Equation({
        "target": this.varEdit,
        "btn": ["Fraction", "Script", "Integral", "LargeOperator", "Bracket", "Function"]
    }); 
    this.addFields(this.buildEquationQues,
    		Util.span("Question: "), this.equation.equationBox(), 
    		Util.br(), this.equation.equationButton("Equation Editor")
    );
    this.varEdit.appendChild(this.equation.x);
};

QuizEdit.prototype.buildMatrix = function() {
    return [
        ['matrix', this.matrixRows, this.matrixCols],
    ];
};

QuizEdit.prototype.editMatrix = function() {
    this.addFields(this.buildMatrix,
           Util.span("Rows: "), this.matrixRows = Util.input("number", QuizEdit.INT, "rows"),
           Util.span("Cols: "), this.matrixCols = Util.input("number", QuizEdit.INT, "cols")
        //   this.ans = //TODO: add a matrix to fill in the values
    );
};

QuizEdit.prototype.buildRegex = function() {
    this.q.regexName = this.regexName.value;
    this.q.regex = this.regex.value;
    this.q.mustMatch = this.mustMatch.value;
    this.q.cannotWatch = this.cannotMatch.value
    return [
            ['regex', QuizEdit.newid],
    ];
};

QuizEdit.prototype.testRegex = function() {

    console.log(new RegExp(this.pattern.value));
}

QuizEdit.prototype.editRegex = function() {
    this.addFields(this.buildRegex,
        Util.table([
            [Util.span("Regex Name: "), Util.input("text", QuizEdit.EDITCTRL, "regexName"),
                this.editButton("Create", null), this.editButton("delete", null), this.editButton("test", this.testRegex)],
            ["Pattern:", this.pattern = Util.input("text", QuizEdit.REGEX, "regex"), this.selRegex],
            [Util.span("Must match:"), this.mustMatch = this.textArea(null, 10, 40)],
            [Util.span("Cannot match:"), this.cannotMatch = this.textArea(null, 10, 40)]
        ]));
};


QuizEdit.prototype.editRandInt = function() {
    this.addFields(this.buildRandInt, Util.table ( [
    [ Util.span("min="), this.min = Util.input("number", QuizEdit.DOUBLE, "min"),
      Util.span("step="), this.step = Util.input("number", QuizEdit.DOUBLE, "step"),
      Util.span("max="), this.max = Util.input("number", QuizEdit.DOUBLE, "max")]
    ]));    
}


QuizEdit.imageFileTypes = "jpg,jpeg,png,eps,svg,gif,bmp";
QuizEdit.audioFileTypes = "mp3,ogg,wav";
QuizEdit.videoFileTypes = "mpg,mpeg,mp4";

QuizEdit.prototype.buildImage = function(src, x, y, w, h) {
    return [
        ['image', src, x, y, w, h]
    ];
};

QuizEdit.prototype.buildVideo = function(src, x, y, w, h) {
    return [
        ['Util.video', src]
    ];
};

QuizEdit.prototype.buildAudio = function(src, x, y, w, h) {
    return [
        ['Util.audio', src]
    ];
};

QuizEdit.prototype.editImage = function() {
    this.addFields(this.buildImage, Util.table ( [
    [ Util.span("x="), this.x = Util.input("number", QuizEdit.INT, "x"),
      Util.span("y="), this.y = Util.input("number", QuizEdit.INT, "y") ],
    [ Util.span("w="), this.w = Util.input("number", QuizEdit.INT, "w"),
      Util.span("h="), this.h = Util.input("number", QuizEdit.INT, "h") ]
    ]));
}

QuizEdit.prototype.inputBlur = function(type, val) {
    var t = this;
    var v = Util.input(type, QuizEdit.EDITCTRL, val, this.q[val]);
    v.oninput = function() {
        t.q[val] = v.value; // change attributes of question like title, points...
        t.renderQuestion();
    };
    return v;
}


QuizEdit.prototype.pickRegex = function() {
    console.log(this);
    var s = this.selRegex.selectedIndex;
    if (s == 0)
        return;
    var name = this.selRegex.options[s].value;
    this.regex.value = QuizEdit.regex[name];
};

QuizEdit.prototype.pickStdChoice = function() {
    var name = this.selStdChoice.options[this.selStdChoice.selectedIndex].value;
    this.stdChoice.value = name;
    var answers = Quiz.stdChoice[name];
    console.log(answers);
    if (this.ansTable.rows.length < answers.length+1) {
        for (var i = this.ansTable.rows.length; i < answers.length+1; i++)
            this.addOption(i);
    } else if (this.ansTable.rows.length > answers.length+1) {
        for (var i = this.ansTable.rows.length-1; i > answers.length+1; i--)
            this.ansTable.deleteRow(i);
    }
    for (var i = 0; i < answers.length; i++) {
        this.ansTable.rows[i+1].cells[0].innerHTML = "";
        this.ansTable.rows[i+1].cells[0].appendChild(Util.input("text", null, null, answers[i]));
    }
}

QuizEdit.regex = {
    mass: "kg|KG|kilo|kilogram",
    length: "m|meter",
    time: "sec|s|second"
};

QuizEdit.prototype.addEditButtons = function () {
    this.editor.appendChild(Util.button("Add Question", this.addQuestion()));
    this.editor.appendChild(Util.button("Add SubQuestion", this.addSubQuestion()));
}
QuizEdit.prototype.editQuestion = function() {
//    var submitbar = document.getElementById("submitDiv-2");
//    submitbar.parent.removeChild(submitbar);
    this.q = {
        id: --QuizEdit.newid,
        title: "",
        level: 1,
        points: 1,
        content:[],
        answers: []
    };
    page.questions.push(this.q);

    this.id = page.questions.length-1;
    page.refreshQuestion(this.id);

    var e = this.editor = document.getElementById("edit-qc"+this.q.id);
    this.scrollToEditor();

    e.appendChild(Util.h1("Question Editor"));
    this.addEditButtons();
    
    e.appendChild(Util.table([ ["Title", this.title = this.inputBlur("text", "title")] ]));
    e.appendChild(Util.table([ ["Level:", this.level = this.inputBlur("number", "level"),
                                "Points:", this.points = this.inputBlur("number", "points")] ]));
    var list = [    
    ["Question Text:", this.textBox = this.textArea("blankbox", 5, 60),
     Util.divadd(null, Util.h2("Insert"),
             this.addDispButton("Instructions", "instructions"),
             this.addDispButton("Paragraph", "Util.p"),
             this.addDispButton("Code", "precode"),
             Util.button("Text2Equation"))//TODO: need equation feature
    ]
    ];
    var image, audio, video;
    e.appendChild(Util.table(list));
    e.appendChild( Util.table( [
    [ image = Util.file("Upload Image", QuizEdit.imageFileTypes, QuizEdit.EDITCTRL, "image_src"),
      audio = Util.file("Upload Audio", QuizEdit.audioFileTypes, QuizEdit.EDITCTRL, "audio_src"),
      video = Util.file("Upload Video", QuizEdit.videoFileTypes, QuizEdit.EDITCTRL, "video_src")
    ]
    ] ));
    var t = this;
    image.onchange = function() {
        //TODO: do the upload to the server
        t.completeEdit(t.buildImage(this.input.files[0].name, 0,0,500,500));
    };
    audio.onchange = function() {
        //TODO: do the upload to the server
        t.completeEdit(t.buildAudio(this.input.files[0].name));
    };
    video.onchange = function() {
        //TODO: do the upload to the server
        t.completeEdit(t.buildVideo(this.input.files[0].name));
    };

    var ins = [
    [ this.editButton("Equation", this.editEquation),
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
      this.editButton("Formula", null)
         ],
    [
      this.editButton("EquationQues", this.editEquationQues),
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
    this.varEdit = Util.div("varEdit", "varEdit");
    e.appendChild(this.varEdit);
    this.addEditButtons();
    this.selRegex = this.selectName(QuizEdit.regex, this.pickRegex, "Select Regex");
    this.selStdChoice = this.selectName(Quiz.stdChoice, this.pickStdChoice, "Select Choice");

    this.title.focus();
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
    this.scrollToEditor();
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
    this.scrollToEditor();
}
