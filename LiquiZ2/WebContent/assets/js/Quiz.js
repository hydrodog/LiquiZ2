/**
 * author: Dov Kruger
 * Represent all information about quiz required for display on client side.
 * Much more data resides on server side.
 * Some question types only differ in the server side comparison of answers
 *  (example regex, numeric vs. fillin)
 *  
 * The question editor is also embedded within the Quiz object.
 */

function Quiz(quizinfo, questions) {
	for ( var k in quizinfo) {
		this[k] = quizinfo[k];
	}
    this.body = document.getElementById("container");
    this.body.className = "quiz";
    this.questions = questions;
}

Quiz.prototype.exec = function(params) {
    var collapse = {};
    if (params.collapse) {
        var collapseArray = params.collapse.split(",");
        for (var i = 0; i < collapseArray.length; i++) {
            collapse[parseInt(collapseArray[i]) - 1] = true;
        }
    }

    this.render(this.displayHeader());
    this.render(this.createSubmit(1));
    this.render(this.headerButtons());
    
    for (var i = 0; i < this.questions.length; i++) {
        var q = this.questions[i];
        var qc = this.addQuestion(q[0], q[1], q[2]);
        if (!collapse[i])
            qc.appendChild(this.processQuestion(q));
        this.render(qc);
    }
    this.end();
}

/*
 * Demo!!
 * Should be removed before production
 */
Quiz.prototype.color = function(params) {
    this.body.style.background = params["color"] ? params["color"] : null;
    this.exec(params);
}

Quiz.prototype.collapsed = function(params) {
    var not = {};
    if (params.not) {
        var notArray = params.not.split(",");
        for (var i = 0; i < notArray.length; i++) {
            not[parseInt(notArray[i]) - 1] = true;
        }
    }

    this.render(this.displayHeader());
    this.render(this.createSubmit(1));
    this.render(this.headerButtons());

    for (i = 0; i < this.questions.length; i++) {
        var q = this.questions[i];
        var qc = this.addQuestion(q[0], q[1], q[2]);
        if (not[i]) {
            qc.appendChild(this.processQuestion(q));
        }
        this.render(qc);
    }
    this.end();
}

Quiz.prototype.headerButtons = function() {
    var fragment = document.createDocumentFragment();
    var button, input;

    button = Util.button("Collapse All", null, null,
        function(e) {
            Util.url.changeView("collapsed");
            Util.url.removeAllArgs();
        });
    fragment.appendChild(button);

    button = Util.button("Uncollapse All", null, null,
        function(e) {
            Util.url.changeView("");
            Util.url.removeAllArgs();
        });
    fragment.appendChild(button);

    onkeydown = function(e) {
        if (e.keyCode == 13) {
            if (hash.view === null) {
                collapse(e);                
            } else if (hash.view === "collapsed") {
                expand(e);
            }
        }
    };

    collapse = function(e) {
        var data = document.getElementById("collapse-input");
        var regex = /(\d+)/g;
        var collapse_vals = data.value.match(regex).sort().filter(
            function(element, index, array) {
                return !index || element != array[index - 1];
            });
        if (collapse_vals !== null) {
            Util.url.removeArg("not");
            Util.url.addArg("collapse", collapse_vals.join(","));
        }
    };

    expand = function(e) {
        var data = document.getElementById("collapse-input");
        var regex = /(\d+)/g;
        var expand_vals = data.value.match(regex).sort().filter(
            function(element, index, array) {
                return !index || element != array[index - 1];
            });
        if (expand_vals !== null) {
            Util.url.removeArg("collapse");
            Util.url.addArg("not", expand_vals.join(","));
        }
    };

    if (hash.view === null) {
        input = Util.input("text", null, "collapse-input", hash.params.collapse, onkeydown);
        button = Util.button("Collapse", null, null, collapse);
    } else if (hash.view === "collapsed") {
        input = Util.input("text", null, "collapse-input", hash.params.not, onkeydown);
        button = Util.button("Expand", null, null, expand);
    }
    fragment.appendChild(input);
    fragment.appendChild(button);
    return fragment;
}

Quiz.prototype.processQuestion = function(q) {
    var frag = document.createDocumentFragment();
    for (var j = 3; j < q.length; j++) {
        if (q[j][0].substring(0, 5) === "Util.") {
            frag.appendChild(Util[q[j][0].substring(5)].apply(this||window, q[j].slice(1)));
        } else {
            frag.appendChild(this[q[j][0]].apply(this||window, q[j].slice(1)));
        }
    }
    return frag;
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

function makeEditBox(id, editFunc, deleteFunc, copyFunc) {
    var editBox = Util.div("edit");
    Util.add(editBox,
    	[
    	 	Util.button("Edit", null, id+"-edit", editFunc),
    		Util.button("Delete", null, id+"-delete", deleteFunc), 
    		Util.button("Copy", null, id+"-copy", copyFunc)
    	]);
    return editBox;
}

Quiz.prototype.addQuestion = function(id, title, className, points, level) {
    points = (typeof points === "undefined") ? 1 : points;
    level =  (typeof level === "undefined") ? 1 : level;

    var qc = Util.div("qc " + className + "-qc", "qc" + id);

    var header = Util.div("qheader");
    header.appendChild(Util.h2(title));
    
    var floatRight = Util.div("float-right");
    floatRight.appendChild(Util.span("points:" + points, "qpoints"));
    floatRight.appendChild(Util.span("level:" + level, "level"));
    if (this.editMode) {
        floatRight.appendChild(makeEditBox(id,
            function(e) {
                console.log(e.target.id);
            },
            function(e) {
                console.log(e.target.id);
            },
            function(e) {
                console.log(e.target.id);
            }));
    }
    header.appendChild(floatRight);
    qc.appendChild(header);
    return qc;
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

Quiz.prototype.saveLocal = function(id) {
	var saveVal = JSON.stringify(this.questions);
	console.log(saveVal);
	var name = Util.popupLocalStoreBrowser('quiz');
    localStorage[name] = saveVal;
}

Quiz.prototype.createSubmit = function(id) {
    var div = Util.div("submit", "submitDiv-" + id);
    var parent = this;
    var clicks = 0;
    div.appendChild(Util.button("Submit The Quiz", "submit-button", "submit-"+id));
    if (this.editMode) {
    	var editBox = Util.div("edit-quiz", id + "-edit-quiz");
        editBox.appendChild(Util.button("New Question", id + "-new-question", null,
            function() {
                if (clicks === 0) {
                	var editor = new QuizEdit();
                	editor.editQuestion();
                	checkIfInView("editor");
                    // Util.goToId("editor");
                }
                clicks++;
            }));
        // editBox.appendChild(Util.div("filebrowse"));
        editBox.appendChild(Util.button("Save Local", id + "-edit-buttons", null, 
        		function () {
        		parent.saveLocal();
        }));
        editBox.appendChild(Util.button("Load From Local", id + "-edit-buttons", null, 
        		function () {
        		parent.loadLocal();
        } ));
        div.appendChild(editBox);
    }

    return div;
};

Quiz.prototype.instructions = function(txt) {
	return Util.p(txt, 'instructions');
}

Quiz.prototype.fillin = function(id) {
	var input = Util.input('text', 'fillin', id);
	return input;
}

Quiz.prototype.numeric = function(id) {
	return Util.input('text', 'number', id);
}

Quiz.prototype.numid = function(id, v) {
	var inp = Util.input('text', 'cell', id);
	inp.size = 3;
	inp.value = v;
	return inp;
}

Quiz.prototype.add = function(parent, spec) {
	parent.appendChild(this[spec.type](spec));
}

Quiz.prototype.mcRadioText = function(id, txt) {
	return Util.input('radio', 'multichoiceradio', id);
	this.add(this.q, document.createTextNode(txt));
}

Quiz.prototype.mcRadioImg = function(id, src) {
	l = [];
	for (var i = 0; i < src.length; i++) {
		radio = Util.radio(id + "-" + i, id, 'multichoiceradio', id + "-" + i);
		label = Util.label(id + "-" + i, Util.img(src[i]));
		group = [ radio, label ];
		l.push(group);
	}
	return Util.table(l);
}

/*
 * Build dropdown list of text
 */
Quiz.prototype.selectText = function(id, list, sendBack) {
	var s = document.createElement("select");
	s.id = id;
	s.className = "multichoicedropdown";
	var opt = document.createElement("option");
	opt.value = -1;
	opt.appendChild(document.createTextNode("Select one"));
	s.appendChild(opt);
	for (var i = 0; i < list.length; i++) {
		opt = document.createElement("option");
		opt.value = i;
		opt.appendChild(document.createTextNode(list[i]));
		s.appendChild(opt);
	}
	return s;
}

/*
 * Build dropdown list of images
 */
Quiz.prototype.selectImg = function(id, list) {
	var s = document.createElement("select");
	s.id = id;
	s.className = "multichoicedropdown";
	for (var i = 0; i < list.length; i++) {
		var opt = document.createElement("option");
		opt.value = i;
		var img = document.createElement("img");
		img.src = mediaLocations.img + list[i];
		opt.appendChild(img);
		s.appendChild(opt);
	}
	return s;
}

Quiz.prototype.match = function(id, questions, answers) {
	var t = document.createElement("table");
	for (var i = 0; i < questions.length; ++i) {
		var r = t.insertRow(i);
		var q = r.insertCell(0);
		q.appendChild(document.createTextNode(questions[i]));
		q = r.insertCell(1);
		q.appendChild(this.selectText(id + "_" + i, answers, true));
	}
	return t;
}

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
	var d = document.createElement("div");
	var t = document.createElement("table");
	t.className = "matrix";
	this.suffixMap.inputCount = 0;
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
			x = this.suffix(list[i][j], id);
			td.appendChild(x);
		}
	}
	d.appendChild(t);
	return d;
};

Quiz.prototype.suffixMap = {
	inputCount : 0,
	jpg : Quiz.prototype.img,
	png : Quiz.prototype.img,
	gif : Quiz.prototype.img,
};

Quiz.prototype.tableInput = function(s, returnValue, id) {
	input = Util.input("text", "grid-input", id + "_" + this.inputCount);
	this.inputCount++;
	return input;
};
Quiz.prototype.suffixMap["%%input%%"] = Quiz.prototype.tableInput;

Quiz.prototype.suffix = function(s, id) {
	s += "";
	var suf = s.split('.').pop();
	if (this.suffixMap[suf])
		return this.suffixMap[suf](s, true, id);
	return Util.span(s, true);
};

// accept is a string: ".java,.txt"
Quiz.prototype.fileUpload = function(id, accept) {
	var up = document.createElement("input");
	up.id = id;
	up.type = "file";
	up.accept = accept;
	return up;
};

// function imageAudioVideo() {
// var
// }

function imageAudioVideo() {
	var editor = document.createElement("div");
	var t = document.createElement("table");
	editor.appendChild(t);

	var r0 = t.insertRow(0);
	var image = Util.p("Image");
	var image_src = Util.file(null, null, "image_src");
	var load_image = Util.button("Load Selected Image", "image_src");
	fillRow(r0, [ image, image_src, load_image ]);

	var r1 = t.insertRow(1);
	var audio = Util.p("Audio");
	var audio_src = Util.file(null, null, "audio_src");
	var load_audio = Util.button("Load Selected Audio", "audio_src");
	fillRow(r1, [ audio, audio_src, load_audio ]);

	var r2 = t.insertRow(2);
	var video = Util.p("Video");
	var video_src = Util.file(null, null, "video_src");
	var load_video = Util.button("Load Selected Video", "video_src");
	fillRow(r2, [ video, video_src, load_video ]);

	return editor;

}

function fillRowText(row, list) {
	for (var i = 0; i < list.length; i++) {
		var c = row.insertCell(i);
		c.innerHTML = list[i];
	}
}


function imgClick(e) {
    // getBoundingClientRect()
    var boundRect = e.target.getBoundingClientRect();
    // console.log(boundRect);
    // console.log(e);
	console.log((e.clientX - boundRect.x).toFixed(0) + ", " + (e.clientY - boundRect.y).toFixed(0));
};

Quiz.prototype.clickableImage = function(id, src, xs, ys) {
	var img = document.createElement("img");
	img.src = mediaLocations.img + src;
	img.onclick = imgClick;
	return img;
};

Quiz.prototype.cloze = function (id, txt) {
    var patt1 = /\[\[.*?\]\]/g;  // when using the shortest match, give a ? mark. 
    var preItems = txt.split(patt1);
    var pre = document.createElement("pre");
    pre.className = "code";
    
    for (var i = 0; i < preItems.length; i++) {
        pre.appendChild(Util.span(preItems[i]));
        if (i != preItems.length-1)
            pre.appendChild(this.fillin(id + "_" + i, true));
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
	return ta;
};

Quiz.prototype.essay = function(id, rows, cols, maxwords) {
	var ta = document.createElement("textarea");
	ta.className = "essay";
	ta.rows = rows;
	ta.cols = cols;
	// ta.value = essay.text;
	return ta;
};
