/*
 * Quiz Editor
 * author: Ying Zhao
 *
 * reorganized and refactored Dov Kruger and Asher Davidson 8/12/2015
 * All parameters are now passed to build methods by storing them in this.
 * Not so robust, but it streamlines the code 
 */

QuizEdit.newid = 0;

function QuizEdit(qnum) {
    qnum = qnum ? "edit-qc" + qnum : "edit-" + page.questions[page.questions.length-1].id
    this.container = document.getElementById(qnum);
}

QuizEdit.EDITCTRL = "editctrl";
QuizEdit.INT = "editint";
QuizEdit.DOUBLE = "editdouble";
QuizEdit.NAME = "editname";

QuizEdit.BUTTON = "editbutton";
QuizEdit.ANSWERS = "answers";
QuizEdit.TEXTAREA = "editTA";
QuizEdit.REGEX = "editPattern";

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
        page.partialRefresh();
        scrollToId("editor");
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

    //$("#editor").remove(); // remove from window
//    $("#qC").remove();
//    var array = buildFunc(); //.apply(this||window, Array.prototype.slice.call(arguments, 1));
    page.end();
    page.partialRefresh();
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
    for (var i = 1; i < arguments.length; i++) {
        if (typeof(arguments[i]) === 'string')
           this.varEdit.appendChild(document.createTextNode(arguments[i]));
       else
            this.varEdit.appendChild(arguments[i]);
    }
    scrollToId("editor");
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

QuizEdit.prototype.deleteAnswer = function() {
    console.log('delete answer');
}

QuizEdit.prototype.addOption = function(row) {
    var r = this.ansTable.insertRow();
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
    var numberBox, stdChoice;
    var addOption = function() {
    var count = numberBox.value;
    var row = ansTable.rows.length-1;
    if (1 < count || count > 100) count = 1;
    for (var i = 0; i < count; i++) {
        this.addOptions(ansTable, i);
    }
    scrollToId(id);
    };
    var div = Util.divadd(QuizEdit.EDITCTRL,
        numberBox = Util.input("number", QuizEdit.EDITCTRL, "optionAdd"),
        this.editButton("Add Option", this.addOption),
        Util.span("Name"),
        this.stdChoice = Util.input("text", 'editInput', 'stdChoice'),
        this.editButton("Create Standard Choice", this.addStdChoice)
    );

    var list = [ ["Answer", "correct", ""] ];
    for (var row = 0; row < 4; row++) {
        list.push([ Util.input("text", QuizEdit.EDITCTRL, "a"+row),
           Util.checkbox(null, "check"+row, "editCB", "check"+row),
           this.editButton("delete", this.deleteAnswer)]);
    }
    this.ansTable = Util.table(list, true, QuizEdit.ANSWERS);

    this.addFields(questionType, div, this.ansTable);
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

QuizEdit.prototype.editSurvey = function() {
    this.editMC(this.buildSurvey);
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
            ['regex', --QuizEdit.newid],
    ];
};

QuizEdit.prototype.editRegex = function() {
    this.addFields(this.buildRegex,
        Util.table([
            [Util.span("Regex Name: "), Util.input("text", QuizEdit.EDITCTRL, "regexName")],
            ["Pattern:", Util.input("text", QuizEdit.REGEX, "regex")],
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


QuizEdit.imageFileTypes = "jpg,jpeg,png,eps,gif,bmp";
QuizEdit.audioFileTypes = "mp3,ogg,wav";
QuizEdit.videoFileTypes = "mpg,mpeg,mp4";

QuizEdit.prototype.buildImage = function() {
    return [
        ['image', this.src, this.x, this.y, this.w, this.h]
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
    v.onkeyup = v.onkeydown = v.onkeypress = v.onblur = function() {
        t.q[val] = v.value; // change attributes of question like title, points...
        page.partialRefresh();
    };
    return v;
}



QuizEdit.prototype.addEditButtons = function () {
    this.editor.appendChild(Util.button("Add Question", this.addQuestion()));
    this.editor.appendChild(Util.button("Add SubQuestion", this.addSubQuestion()));
}
QuizEdit.prototype.editQuestion = function() {
//    var submitbar = document.getElementById("submitDiv-2");
//    submitbar.parent.removeChild(submitbar);
    //$("#submitDiv-2").remove();
    this.q = {
        id: --QuizEdit.newid,
        title: "",
        level: 1,
        points: 1,
        content:[],
        answers: []
    };
    page.questions.push(this.q);
    page.partialRefresh();

    var e = this.editor = Util.div("editor", "editor");
    this.container.appendChild(this.editor);
    e.appendChild(Util.h1("Question Editor"));
    
    var meta = [
        ["Title", this.title = this.inputBlur("text", "title")],
        ["Level:", this.level = this.inputBlur("number", "level")],
        ["Points:", this.points = this.inputBlur("number", "points")],
    ];
    this.addEditButtons();
    e.appendChild(Util.table(meta));
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
    [ image = Util.file(QuizEdit.imageFileTypes, QuizEdit.EDITCTRL, "image_src"),
      audio = Util.file(QuizEdit.audioFileTypes, QuizEdit.EDITCTRL, "audio_src"),
      video = Util.file(QuizEdit.videoFileTypes, QuizEdit.EDITCTRL, "video_src")
    ]
    ] ));
    image.onchange = function() {
    console.log('img');
    }
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
      this.editButton("Formula", null)
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
    this.varEdit = Util.div("varEdit", "varEdit");
    e.appendChild(this.varEdit);
    this.addEditButtons();
    scrollToId("editor");
}

/*
* Edit and store the policies governing a quiz, ie how it may be taken, when to display answers, etc.
*/
function Policy() {
    this.container = document.getElementById("container");
    this.container.className = "quizEditor";
}

Policy.names = ["homework1x", "homework4x", "midtermreview"];
Policy.prototype.edit = function() {
    var policy = Util.div("policy", "policy");
    this.container.appendChild(policy);

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
    this.container = document.getElementById("container"); //TODO: figure out a strategy to eliminate this commmon logic between Assignment, Policy, QuizEdit, etc.
    this.container.className = "quizEditor";
}

Assignment.prototype.edit = function() {
    var assign = Util.div("assign", "assign");
    this.container.appendChild(assign);

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
