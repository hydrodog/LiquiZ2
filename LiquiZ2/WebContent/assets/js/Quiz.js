/**
 * author: Dov Kruger
 * Represent all information about quiz required for display on client side.
 * Much more data resides on server side.
 * Some question types only differ in the server side comparison of answers
 *  (example regex, numeric vs. fillin)
 *  
 * The question editor is also embedded within the Quiz object.
 */

function Quiz(payload) {
    for ( var k in payload) {
        this[k] = payload[k];
    }

    this.body = document.getElementById("container");
    this.body.className = "quiz";

    this.answers = Array(this.questions.length);
    for (var i = 0; i < this.questions.length; i++) {
        this.answers[i] = Array(this.questions[i].content.length);
    }
}

// TODO(asher): This should be passed in through QuizDemo_ajax
Quiz.stdChoice = {
    Likert5: ["Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree"],
    Likert7: ["Exceptional",
          "Excellent",
          "Very Good",
          "Good",
          "Fair",
          "Poor",
          "Very Poor"],
    Yesno: ["Yes", "No"],
    Boolean: ["true", "false"]
};

Quiz.prototype.processParams = function() {
    this.params = {};
    this.params.not = {};
    this.params.collapse = {};
    for (var i in url.params) {
        this.params[i] = {};
        var array = url.params[i].split(",");
        for (var j = 0; j < array.length; j++) {
            this.params[i][array[j]] = true;
        }
    }
};

Quiz.prototype.exec = function(refresh) {
    this.processParams();
    if (refresh || this.view !== url.view) {
        clearPage();
        this.header();
        this.partialRefresh();
        this.end();
    } else {
        this.partialRefresh();
    }
    this.view = url.view;
};

Quiz.prototype.isCollapsed = function(i) {
    return (this.params.collapse[i+1]) ? false : true;
};

Quiz.prototype.isNotCollapsed = function(i) {
    return (this.params.not[i+1]) ? true : false;
};

Quiz.prototype.editBox = function(id) {
    return Util.div("editBox", "edit-qc"+id);
};

Quiz.prototype.submitAnswers = function() {

};

Quiz.prototype.refreshQuestion = function(i) {
    var q = this.questions[i];
    var qc = this.addQuestion(q.id, q.title, q.type, q.points, q.level);
    qc.appendChild(this.processQuestion(q.content));

    if (!document.getElementById("qc" + q.id))
        this.questionsDiv.appendChild(qc);

    if (this.editMode && !document.getElementById("edit-qc" + q.id))
            this.questionsDiv.appendChild(this.editBox(q.id));
};

Quiz.prototype.partialRefresh = function() {
    this.processParams();
    if (url.view === "collapsed")
        cb = this.isNotCollapsed.bind(this);
    else
        cb = this.isCollapsed.bind(this);

    var frag = document.createDocumentFragment();
    for (var i = 0; i < this.questions.length; i++) {
        var q = this.questions[i];
        var qc = this.addQuestion(q.id, q.title, q.type, q.points, q.level);
        if (cb(i)) {
            this.question_id = i;
            qc.appendChild(this.processQuestion(q.content));
        }
        frag.appendChild(qc);
        if (this.editMode)
            frag.appendChild(this.editBox(q.id));
    }


    this.headerButtons();
    if (!document.contains(this.questionsDiv)) {
        this.questionsDiv = Util.div("questions", "questions");
        this.questionsDiv.appendChild(frag);
        this.render(this.questionsDiv);
    } else {
        this.questionsDiv.innerHTML = "";
        this.questionsDiv.appendChild(frag);
    }
};

Quiz.prototype.header = function() {
    this.render(this.displayHeader());
    this.render(this.createSubmit(1));
};

Quiz.prototype.addQuestion = function(id, title, type, points, level) {
    points = (typeof points === "undefined") ? 1 : points;
    level =  (typeof level === "undefined") ? 1 : level;

    var qc = document.getElementById("qc" + id);
    if (qc) {
        qc.innerHTML = "";
    } else {
        qc = Util.div("qc " + type + "-qc", "qc" + id);
    }

    var header = Util.div("qheader");
    header.appendChild(Util.h2(title));
    
    var floatRight = Util.div("float-right");
    floatRight.appendChild(Util.span("points:" + points, "qpoints"));
    floatRight.appendChild(Util.span("level:" + level, "level"));
    if (this.editMode) {
        floatRight.appendChild(this.makeEditBox(id));
    }
    header.appendChild(floatRight);
    qc.appendChild(header);
    return qc;
};

Quiz.prototype.processQuestion = function(q) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < q.length; i++) {
        this.subQuestion_id = i;
        if (q[i][0].substring(0, 5) === "Util.") {
            frag.appendChild(Util[q[i][0].substring(5)].apply(this||window, q[i].slice(1)));
        } else {
            frag.appendChild(this[q[i][0]].apply(this||window, q[i].slice(1)));
        }
    }
    return frag;
};

Quiz.prototype.collapse = function(e) {
    var data = document.getElementById("collapse-input").value;
    var regex = /(\d+)/g;
    var collapse_vals = data.match(regex);
    if (collapse_vals !== null) {
        collapse_vals.sort(this.sortInt).filter(
            function(element, index, array) {
                return !index || element != array[index - 1];
        });
        url.removeParam("not");
        url.addParam("collapse", collapse_vals.join(","));
        url.load(false);
    } else {
        url.removeParam("collapse");
        url.load(false);
    }
    this.partialRefresh();
};

Quiz.prototype.expand = function(e) {
    var data = document.getElementById("collapse-input").value;
    var regex = /(\d+)/g;
    var expand_vals = data.match(regex);
    if (expand_vals !== null) {
        expand_vals.sort(this.sortInt).filter(
            function(element, index, array) {
                return !index || element != array[index - 1];
        });
        url.removeParam("collapse");
        url.addParam("not", expand_vals.join(","));
        url.load(false);
    } else {
        url.removeParam("not");
        url.load(false);
    }
    this.partialRefresh();
};

Quiz.prototype.sortInt = function(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
};

Quiz.prototype.collapseExpandOnkeydown = function(e) {
    if (e.keyCode == 13 && (e.type === "keydown" || e.type === "keypress")) {
        if (url.view === "") {
            this.collapse(e);                
        } else if (url.view === "collapsed") {
            this.expand(e);
        }
    }
};

Quiz.prototype.headerButtons = function() {
    var button, input, render;

    if (document.contains(this.headerControl)) {
        this.headerControl.innerHTML = "";
        render = false;
    } else {
        this.headerControl = Util.div("header", "header-control");
        render = true;
    }


    var t = this;
    button = Util.button("Collapse All",
        function(e) {
            url.changeView("collapsed");
            url.removeAllParams();
            url.load(false);
            t.partialRefresh();
        });
    this.headerControl.appendChild(button);

    button = Util.button("Uncollapse All", 
        function(e) {
            url.changeView("");
            url.removeAllParams();
            url.load(false);
            t.partialRefresh();
        });
    this.headerControl.appendChild(button);

    if (url.view === "") {
        input = Util.input("text", null, "collapse-input", url.params.collapse, this.collapseExpandOnkeydown.bind(this));
        button = Util.button("Collapse", this.collapse.bind(this));
    } else if (url.view === "collapsed") {
        input = Util.input("text", null, "collapse-input", url.params.not, this.collapseExpandOnkeydown.bind(this));
        button = Util.button("Expand", this.expand.bind(this));
    }
    this.headerControl.appendChild(input);
    this.headerControl.appendChild(button);

    if (render)
        this.render(this.headerControl);
}

Quiz.prototype.render = function(child) {
    this.body.appendChild(child);
}

Quiz.prototype.displayHeader = function() {
    var header = Util.div("header");
    header.appendChild(Util.h1(this.title));
    header.appendChild(Util.span(" Points: " + this.points, "points"));
    header.appendChild(Util.p("timer"));
    return header;
    //TODO: add time and countdown
    //TODO: add remaining tries
}


Quiz.prototype.end = function() {
    this.render(this.createSubmit(2));
};

Quiz.prototype.makeEditBox = function(id) {
    var editFunc = function(e) {
        console.log(e.target.id);
    };
    // TODO: Delete currene question
    var deleteFunc = function(e) {
        page.questions.splice(e.target.id, 1);
        page.partialRefresh();
    };
    var copyFunc = function(e) {
//      page.questions.splice(e.target.id, 0, page.questions[e.target.id]);
        page.partialRefresh();
    };

    var editBox = Util.div("edit");
    Util.add(editBox,
        [
            Util.button("Edit", editFunc, null, id+"-edit"),
            Util.button("Delete", deleteFunc, null, id+"-delete"), 
            Util.button("Copy", copyFunc, null, id+"-copy")
        ]);
    return editBox;
};

function showDialog(openFileDialog) {
    document.getElementById(openFileDialog).click();
}
function fileName(openFileDialog) {
    return document.getElementById(openFileDialog).value;
}
function hasFile(openFileDialog) {
    return document.getElementById(openFileDialog).value != "";
}
function fileNameWithoutFakePath(openFileDialog) {
    var fileName = document.getElementById(openFileDialog).value;
    return fileName.substr(fileName.lastIndexOf('\\') + 1);
}
function fakePathWithoutFileName(openFileDialog) {
    var fileName = document.getElementById(openFileDialog).value;
    return fileName.substr(0, fileName.lastIndexOf('\\'));
}
function createAndAddNewOpenFileDialog(name) {
    document.getElementById("filebrowse").innerHtml += "<input type='file' style='display:none' id='" + name + "'/>"
}

Quiz.prototype.loadLocal = function() {
    filebrowser.loadPopup((function(payload) {
        for (var item in payload)
            this[item] = payload[item];
        this.exec(true);
    }).bind(this));
};

Quiz.prototype.generateData = function() {
    var payload = {
        title: this.title,
        points: this.points,
        timeLimit: this.timeLimit,
        remainingTries: this.remainingTries,
        dataDir: this.dataDir,
        editMode: this.editMode,
        questions: this.questions
    };

    return payload;
};

Quiz.prototype.submitCB = function(worked, response) {
    console.log("status:", worked);
    console.log("response:", response);
};

Quiz.prototype.submit = function() {
    console.log(this.answers);
    post("GradeQuiz", this.answers, this.submitCB);
}

Quiz.prototype.createSubmit = function(id) {
    var div = Util.div("submit", "submitDiv-" + id);
    var t = this;
    var clickEditQuestion = 0, clickPolicy = 0, clickAssignment = 0;
    div.appendChild(Util.button("Submit The Quiz", this.submit.bind(this), "submit-button", "submit-"+id));
    if (this.editMode) {
        var editBox = Util.div("edit-quiz", id + "-edit-quiz");
    Util.add(editBox, [
            Util.button("New Question", 
            function() {
                var editor = new QuizEdit();
                editor.editQuestion();
            }),
            Util.button("Edit Assign",
                function() {
                    var ass = new Assignment();
                    ass.edit();
                } ),
            Util.button("Edit Policy", 
            function() {
                if (clickPolicy === 0) {
                        var policy = new Policy();
                        policy.edit();
                }
                clickPolicy++;
            }),
        Util.button("Save to Server", 
            (function () {
                
            }).bind(this)),
         Util.button("Save Local",  
            (function () {
                filebrowser.savePopup(this.generateData());
            }).bind(this)),
        Util.button("Load From Local", this.loadLocal.bind(this), null, id + "-edit-buttons" )
    ] );
        div.appendChild(editBox);
    }
    return div;
};

Quiz.prototype.add = function(parent, spec) {
    parent.appendChild(this[spec.type](spec));
}

Quiz.prototype.addInputHandlers = function(input, i, j) {
    i = (typeof i === "undefined") ? 0 : i;
    j = (typeof j === "undefined") ? 0 : j;

    var question = this.question_id,
        subQuestion = this.subQuestion_id;

    q = this.answers[question][subQuestion] || Array(0);

    while (q.length <= i) {
        q.push(Array(0));
    }

    while (q[i].length <= j) {
        q[i].push({
            v: [],
            s: [],
            e: [],
        });
    }

    input.oninput = input.onchange = (function(e) {
            console.log("recording input", question, subQuestion, i, j);

            q = this.answers[question][subQuestion];

            q[i][j].v[q[i][j].v.length-1] = e.target.v;
        }).bind(this);

    input.onfocus = (function(e) {
            console.log("start timestamp", question, subQuestion, i, j);

            q = this.answers[question][subQuestion];

            q[i][j].v.push(e.target.v);
            q[i][j].s.push(new Date().getTime());
        }).bind(this);

    input.onblur = (function(e) {
            // record end timestamp
            console.log("end timestamp", question, subQuestion, i, j);

            q = this.answers[question][subQuestion];

            q[i][j].e.push(new Date().getTime());
        }).bind(this);

    this.answers[question][subQuestion] = q;
    return input;
};

/*
 * NOTE: Question generators start here!
 */

Quiz.prototype.instructions = function(txt) {
    return Util.p(txt, 'instructions');
}

Quiz.prototype.equation = function(id, editable, arr) {	
	var div = Util.div("equation");
    if (editable == "true") {
    	var eq = new Equation({
            "target": div,
            "btn": ["Fraction", "Script", "Integral", "LargeOperator", "Bracket", "Function"]
        });
        div.appendChild(eq.equationBox());
        div.appendChild(Util.br());
        div.appendChild(eq.equationButton("Equation Editor"));
    }
    if (arr != undefined)
    	parseEquationArray(div, arr);
    return div;
}

Quiz.prototype.fillin = function(id) {
    var input = Util.input('text', 'fillin', id);
    return this.addInputHandlers(input);
}

Quiz.prototype.numeric = function(id) {
    return this.addInputHandlers(Util.input('text', 'number', id));
}

Quiz.prototype.numid = function(id, v) {
    var inp = Util.input('text', 'cell', id);
    inp.size = 3;
    inp.value = v;
    return this.addInputHandlers(inp);
}

/*
 * Build vertical radio boxes for multiple choice
 */
Quiz.prototype.mcRadioTextVert = function(id, txt) {
    var list = [];
    for (var i = 0; i < txt.length; i++) {
        var radio = this.addInputHandlers(
                        Util.radio(id + "-" + i, id, 'mcradio', id + "-" + i), i);
        var label = Util.label(id + "-" + i, Util.span(txt[i]));
        list.push([radio, label]);
    }
    return Util.table(list);
}

/*
 * Build horizontal radio boxes for multiple choice
 */
Quiz.prototype.mcRadioTextHoriz = function(id, choices) {
    var list = [ [],[] ];
    for (var i = 0; i < choices.length; i++) {
        list[0].push(Util.label(id + "-" + i, Util.span(choices[i])));
    }
    for (var i = 0; i < choices.length; i++) {
        list[1].push(this.addInputHandlers(
                        Util.radio(id + "-" + i, id, 'mcradio', id + "-" + i), i));
    }

    return Util.table(list, false);
}

/*
 * Build a survey sharing labels with horizontal radio boxes
 */
Quiz.prototype.mcSurvey = function(id, questions, choices) {
    var head = choices.slice();
    head.unshift("");
    var list = [ head ];
    for (var j = 0; j < questions.length; j++) {
        var row = [questions[j]];
        for (var i = 0; i < choices.length; i++) {
            row.push(this.addInputHandlers(
                        Util.radio(i, id + "-" + j, 'mcradio', id + "-" + j + "-" + i), j, i));
        }
        list.push(row);
    }

    return Util.table(list, true, "survey");
}

/*
 * Build vertical list of images for multiple choice using radio buttons
 */
Quiz.prototype.mcRadioImg = function(id, src) {
    var list = [];
    for (var i = 0; i < src.length; i++) {
        var radio = this.addInputHandlers(
                        Util.radio(id + "-" + i, id, 'multichoiceradio', id + "-" + i), i);
        var label = Util.label(id + "-" + i, Util.img(src[i]));
        list.push([radio, label]);
    }
    return Util.table(list);
}

/*
 * Build dropdown list of text
 */
Quiz.prototype.selectText = function(id, list, title, skipHandler) {
    l = [title||"Select one"];
    Array.prototype.push.apply(l, list);
    if (skipHandler) {
        return Util.select("Select one", false, l, "mcdropdown", id);
    }
    return this.addInputHandlers(Util.select("Select one", false, l, "mcdropdown", id));
}

// /*
//  * NOTE: Deprecated
//  * Build dropdown list of images
//  */
// Quiz.prototype.selectImg = function(id, list) {
//     var s = document.createElement("select");
//     s.id = id;
//     s.className = "multichoicedropdown";
//     for (var i = 0; i < list.length; i++) {
//         var opt = document.createElement("option");
//         opt.value = i;
//         var img = document.createElement("img");
//         img.src = mediaLocations.img + list[i];
//         opt.appendChild(img);
//         s.appendChild(opt);
//     }
//     return s;
// }

Quiz.prototype.match = function(id, questions, answers) {
    var t = document.createElement("table");
    for (var i = 0; i < questions.length; ++i) {
        var r = t.insertRow(i);
        var q = r.insertCell(0);
        q.appendChild(document.createTextNode(questions[i]));
        q = r.insertCell(1);
        q.appendChild(this.addInputHandlers(this.selectText(id + "_" + i, answers, null, true), i));
    }
    return t;
}

Quiz.prototype.file = function(value, filetypes, className, id) {
    return this.addInputHandlers(Util.file(value, filetypes, className, id));
};

Quiz.prototype.emptyGrid = function(id, rows, cols, header) {
    var l;
    var returnHeader = false;
    i = 0;
    if (header) {
        l = new Array(rows + 1);
        l[0] = header;
        i = 1;
        returnHeader = true;
    } else {
        l = new Array(rows);
    }

    for (i; i < l.length; i++) {
        l[i] = new Array(cols);
        for (j = 0; j < l[i].length; j++) {
            l[i][j] = "%%input%%";
        }
    }
    return this.grid(id, l, returnHeader);
};

Quiz.prototype.grid = function(id, list, header) {
    list = JSON.parse(JSON.stringify(list));
    var t = document.createElement("table");
    t.className = "matrix";
    this.inputCount = 0;
    if (header) {
        headList = list.shift();
        thead = t.createTHead();
        for (i = 0; i < headList.length; i++) {
            td = document.createElement("td");
            td.className = "cell";
            x = this.suffix(headList[i], id);
            td.appendChild(x);
            thead.appendChild(td);
        }
    }

    for (i = 0; i < list.length; i++) {
        r = t.insertRow(-1);
        for (j = 0; j < list[i].length; j++) {
            td = r.insertCell(-1);
            td.className = "cell";
            x = this.suffix(list[i][j], id, i, j);
            td.appendChild(x);
        }
    }
    return t;
};

Quiz.prototype.tableInput = function(s, id) {
    input = Util.input("text", "grid-input", id + "_" + this.inputCount);
    this.inputCount++;
    return input;
};

Quiz.prototype.suffix = function(s, id, i, j) {
    s += "";
    if (s === "%%input%%")
        return this.addInputHandlers(this.tableInput(s, id), i, j);
    return Util.span(s);
};

// accept is a string: ".java,.txt"
Quiz.prototype.fileUpload = function(id, accept) {
    var up = document.createElement("input");
    up.id = id;
    up.type = "file";
    up.accept = accept;
    return this.addInputHandlers(up);
};

Quiz.prototype.imgClick = function(e) {
    // getBoundingClientRect()
    var boundRect = e.target.getBoundingClientRect();
    console.log((e.clientX - boundRect.x).toFixed(0) + ", " + (e.clientY - boundRect.y).toFixed(0));
};

Quiz.prototype.clickableImage = function(id, src, xs, ys) {
    var img = document.createElement("img");
    img.src = mediaLocations.img + src;
    img.onclick = this.imgClick;
    // TODO(asher): Store answer in this.answers
    return img;
};

Quiz.prototype.image = function(src, x, y, w, h) {
    var img = Util.img(src);
    img.style.left = x;
    img.style.top = y;
    img.width = w;
    img.height = h;
    return img;
}

Quiz.prototype.cloze = function (id, txt) {
    var patt1 = /\[\[.*?\]\]/g;  // when using the shortest match, give a ? mark. 
    var preItems = txt.split(patt1);
    var pre = document.createElement("pre");
    pre.className = "code";
    
    for (var i = 0; i < preItems.length; i++) {
        pre.appendChild(Util.span(preItems[i]));
        if (i != preItems.length-1)
            pre.appendChild(this.addInputHandlers(this.fillin(id + "_" + i, true), i));
    }
    return pre;
}
// enter code to be compiled, run, spindled, mutilated
Quiz.prototype.code = function(id, txt, rows, cols) {
    var ta = document.createElement("textarea");
    ta.className = "code";
    ta.rows = rows;
    ta.cols = cols;
    ta.value = txt;
    return this.addInputHandlers(ta);
};

Quiz.prototype.precode = function(txt) {
    return Util.pre(txt, "precode");
};

Quiz.prototype.essay = function(id, rows, cols, maxwords) {
    var ta = document.createElement("textarea");
    ta.className = "essay";
    ta.rows = rows;
    ta.cols = cols;
    // ta.value = essay.text;
    return this.addInputHandlers(ta);
};

Quiz.prototype.multiAnswer = function(id, txt) {
    //var ta = Util.form(null, "multiAnswer", id);
    l = [];
    for (var i = 0; i < txt.length; i++) {
        checkbox = Util.checkbox(id + "-" + i, id, 'multianswer', id + "-" + i, false);
        label = Util.label(id + "-" + i, Util.span(txt[i]));
        group = [ checkbox, label ];
        l.push(group);
    }
    return Util.table(l);
    
}

