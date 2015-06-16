Util = {
    /*
     * Returns an html tag filled with the keys and values you pass in
     * Second arg is an object filled with key, value pairs
     * Returns undefined if no valid tag was passed.
     */
    make: function(tag, obj) {
        // without a valid tag we can't continue
        if (typeof tag === "undefined" || !tag) {
            console.log("Util.make failed with \ntag: " + tag +
                                              "\ninnerHTML: " + innerHTML +
                                              "\nclassName: " + className +
                                              "\nid: " + id);
            return;
        }
        var element = document.createElement(tag);
        for (var i in obj) {
            if (typeof obj[i] !== "undefined" && obj[i] !== null)
                element[i] = obj[i];
        }
        return element;
    },

    /*
     * Most of the following functions only take the innerHTML, the className, and 
     * the id of the tag you want, in that order. Any cases that break this rule
     * will be noted explicitly.
     */
    span: function(innerHTML, className, id) {
        return Util.make("span", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    div: function(innerHTML, className, id) {
        return Util.make("div", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    p: function(innerHTML, className, id) {
        return Util.make("p", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    pre: function(innerHTML, className, id) {
        return Util.make("pre", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    /*
     * This function takes rows and cols as additional arguments
     */
    textarea: function(innerHTML, className, id, rows, cols) {
        return Util.make("textarea", {
            innerHTML: innerHTML,
            className: className,
            id: id,
            rows: rows,
            cols: cols,
        });
    },

    /*
     * This function takes the src as its first argument instead of innerHTML
     */
    img: function(src, className, id) {
        return Util.make("span", {
            src: src,
            className: className,
            id: id,
        });
    },

    /*
     * Does not take any arguments
     */
    br: function() {
        return Util.make("br");
    },

    /*
     * Generic <tr> generator. For the use of Util.table(). You probably shouldn't
     * use this.
     */
    tr: function(list) {
        var tr = Util.make("tr");
        for (var i = 0; i < list.length; i++) {
            td = Util.make("td", {
                innerHTML: list[i],
            });
            tr.appendChild(td);
        }
        return tr;
    },

    /*
     * Takes in a class for the table, a list of elements to be inserted into 
     * the table, an optional boolean if there's a header in the table, and an
     * optional function that will accept a list and return a tr element
     * 
     * trFunction should be used to modify escape characters that you pass in through
     * the list. It lets you insert any arbitrary formatting to any tr element based
     * on whatever escape mechanism you choose.
     */
    table: function(tableClass, list, header, trFunction) {
        header = (typeof header !== "undefined") ? header : false;
        trFunction = (typeof trFunction !== "undefined") ? trFunction : Util.tr;
        var result = Util.make("table", {
            className: tableClass,
        });

        if (header) {
            var headList = list.shift();
            var thead = result.createTHead();
            thead.appendChild(trFunction(headList));
        }

        tbody = Util.make("tbody");
        result.appendChild(tbody);
        for (var i = 0; i < list.length; i++) {
            var tr = trFunction(list[i]);
            tbody.appendChild(tr);
        }

        return result;
    },

};

/*
 * Proof of concept. Not testing code!
 */
tdCount = 0;
function modTd (list) {
    var tr = Util.make("tr", {
        className: "custom-tr",
    });
    for (var i = 0; i < list.length; i++) {
        var td = Util.make("td", {
            className: "modded",
            id: tdCount++,
            innerHTML: list[i],
        });
        tr.appendChild(td);
    }
    return tr;
}

/*
 * Proof of concept. Not production code!
 * 
 * Function that integrates with the new Util.table function
 * to generate an empty table filled with inputs.
 */
function emptyGrid(list) {
    var obj = list[0];
    var result = document.createDocumentFragment();
    for (var i = 0; i < obj.rows; i++) {
        tr = Util.make("tr");
        for (var j = 0; j < obj.cols; j++) {
            var input = Util.make("input", {
                type: "text",
            });
            td = Util.make("td", {
                className: "td-input",
            });
            td.appendChild(input);
            tr.appendChild(td);
        }
        result.appendChild(tr);
    }
    return result;
}

function build() {
    var element = Util.table("table-empty", [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10]
    ], true, modTd);
    console.log(element);
    document.getElementById("quiz").appendChild(element);

    element = Util.table("table-input", [
        [{
            cols: 3,
            rows: 3,
        }]
    ], false, emptyGrid);
    console.log(element);
    document.getElementById("quiz").appendChild(element);
}

// function make(tag, inner, className) {
//     var t = document.createElement(tag);
//     if (className)
//         t.className = className;
//     // if (inner)
//     t.innerHTML = inner;
//     return t;
// }

/*
 * Add a css file to the header section. This is useful for dynamically loading
 * the css file depending on the user's preferences.
 */
function appendCSSLink(src) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('LINK');
	link.rel="stylesheet";
	link.type="text/css";
	link.href=src;
	head.appendChild(link);
}

/*
 * Add a css stylesheet to the current page
 */
function appendCSSText(css) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
}

/*
 * Test if an object exists
 */
function exists(type) {
    if (type == "undefined")
        return false;
    return true;
}

var count = -5;
function insertRow(t) {
  var r = t.insertRow(0);
  var td = document.createElement("td");
  td.innerHTML = "stuff";
  r.appendChild(td);
  td = document.createElement("td");
  td.innerHTML = count++;
  r.appendChild(td);
}

function dump(obj) {
    var s = "";
    for (var k in obj) {
    s += k + "-->" + obj[k] + '\n';
    }
    console.log(s);
}

function select(list) {
  var s = document.createElement("select");
  for (var i = 0; i < list.length; i++) {
    var opt = document.createElement("option");
    opt.value = list[i];
    opt.innerHTML = list[i];
    s.appendChild(opt);
  }
  return s;
}

function mkdiv(parent, className) {
    var div = document.createElement("div");
    div.className = className;
    parent.appendChild(div);
    return div;
}

function mkdivid(parent, id, className) {
	var div = mkdiv(parent, className);
	div.id = id;
	return div;
}

function mktable(className, arr) {
    var t = document.createElement("table");
    t.className = className;
    for (var i = 0; i < arr.length; i++) {
        var tr = t.insertRow(i);
        for (var j = 0; j < arr[i].length; ++j) {
            var c = tr.insertCell(j);
            c.appendChild(arr[i][j]);
        }
    }
    return t;
}

function mk(tag, value, className) {
    var t = document.createElement(tag);
    t.innerHTML = value;
    t.className = className;
    return t;
}

function mkinput(id, type, className) {
    var inp = document.createElement("input");
    inp.id = id;
    inp.type = type;
    inp.className = className;
    return inp;
}

function mkbutton(val, id) {
    var b = mkinput(id, 'button', 'submit');
    b.value = val;
    return b;
}

var clozeTarget = /[[]]/;

/*

//  Information about quiz required for display on client side.
 // Much more data on server side in Policy.java
function QuizInfo(title, points, timelimit, remainingTries, datadir) {
    this.title = title;
    this.points = points;
    this.timelimit = timelimit;
    this.remaining = remainingTries;
    this.datadir = datadir;
    this.editMode = 1;
}*/
	
function Quiz(quizinfo) {
	for (var k in quizinfo) {
		this[k] = quizinfo[k];
	}
    this.div = document.getElementById("quiz");
    // this.setDataDir(this.datadir);
    this.div.className = "quiz";
    this.displayHeader(this.div);
    this.editMode = true;
    this.createSubmit(1);
}

Quiz.prototype.displayHeader = function() {
    this.div.appendChild(make("h1", this.title));
    this.div.appendChild(make("span", " Points: " + this.points, "points"));
    this.timer = mkdiv(this.div, "timer");
    this.div.appendChild(this.timer);
    //TODO: add time and countdown
    //TODO: add remaining tries
}

Quiz.prototype.end = function(id) {
    if (this.editMode) {
        var newB = mkbutton("New Question", "new-question");
        newB.onclick = function() {
            console.log(newB.id);
        };
    qc = mkdivid(this.div, "qc" + id, "qc");
        qc.appendChild(newB);
  }
    this.createSubmit(2);
};

Quiz.prototype.addQuestion = function(id, title, className, points, level) {
    mkdivid(this.div, "qc" + id, "qc " + className + "-qc");
    this.q = document.getElementById("qc" + id);
    points = (!exists(typeof(points))) ? 1 : points;
    level =  (!exists(typeof(level))) ? 1 : level;
    var editBox = document.createElement("div");
    editBox.className = "edit";
    if (this.editMode) {
    	var edit = mkbutton("Edit", id+"-edit");
        var del = mkbutton("Delete", id+"-delete");
        var copy = mkbutton("Copy", id+"-copy");
        edit.onclick = function() {
            innerHTML = "";
            console.log(edit.id);
        };
        del.onclick = function() {
            innerHTML = "";
            console.log(del.id);
        };
        copy.onclick = function() {
            innerHTML = "";
            console.log(copy.id);
        };
    	editBox.appendChild(edit);
    	editBox.appendChild(del);
    	editBox.appendChild(copy);
    }

    header = document.createElement("div");
    header.className = "qheader";
    header.appendChild(mk("h2", title, ''));
    
    floatRight = document.createElement("div");
    floatRight.className = "float-right";
    floatRight.appendChild(mk("span", "points:" + points, "qpoints"));
    floatRight.appendChild(mk("span", "level:" + level, "level"));
    floatRight.appendChild(editBox);

    header.appendChild(floatRight);

    this.q.appendChild(header);
};

Quiz.mediaLocations = { // map where each kind of file is under assets
    png: "img/",         //TODO: map by class, like maps to map directory (harder)
    jpg: "img/",
    mp3: "aud/",
    wav: "aid/",
    mp4: "vid/",
    img: "assets/img/",  // map the javascript object type to the directory?
    aud: "assets/aud/",
    vid: "assets/vid/"
}

Quiz.prototype.setDataDir = function(path) {
    Quiz.mediaLocations.img = path + "/img/";
    Quiz.mediaLocations.aud = path + "/aud/";
    Quiz.mediaLocations.vid = path + "/vid/";
}
Quiz.prototype.createSubmit = function(id) {
    var div = mkdiv(this.div, "submit");
    div.appendChild(mkbutton("Submit The Quiz", "submit-"+id));
    this.div.appendChild(div);
};


Quiz.prototype.img = function(src, returnValue) {
    var im = document.createElement("img");
    im.src = Quiz.mediaLocations.img + src;
    if (returnValue)
        return im;
    this.q.appendChild(im);
};

Quiz.prototype.aud = function(src) {
    var au = document.createElement("audio");
    au.controls = true;
    // var s = document.createElement("source");
    au.src = Quiz.mediaLocations.aud + src;
    // var suffix = aud.file.search(/\.\w+$/);
//    var mediaType = audioTypeMap[aud.file.substr(suffix+1)]; //TODO: Fix this!
    // s.type = mediaType;
    // au.appendChild(s);
    this.q.appendChild(au);
}

Quiz.prototype.vid = function(src) {
    var vi = document.createElement("video");
    vi.src = Quiz.mediaLocations.vid + src;
    vi.controls = true;
    this.q.appendChild(vi);
}


Quiz.prototype.span	 = function(txt, returnValue) {
    span = make('span', txt, '');
    if (returnValue)
        return span;
    this.q.appendChild(span);
}

Quiz.prototype.br = function() {
    this.q.appendChild(document.createElement('br'));
}

Quiz.prototype.instructions = function(txt) {
    this.q.appendChild(make('p', txt, 'instructions'));
}

Quiz.prototype.p = function(txt) {
    this.q.appendChild(make('p', txt));
}

Quiz.prototype.box = function(txt) {
    var div = mkdiv(this, "div", "box");
    div.innerHTML = txt;
    this.q.appendChild(newChild);
}

Quiz.prototype.fillin = function(id, sendBack) {
    if (sendBack)
        return mkinput(id, 'text', 'fillin');
    this.q.appendChild(mkinput(id, 'text', 'fillin'));
}

Quiz.prototype.numeric = function(id) {
    this.q.appendChild(mkinput(id, 'text', 'number'));
}

Quiz.prototype.numid = function(id, v) {
    var inp = mkinput(id, 'text', 'cell');
    inp.size = 3;
    inp.value = v;
    this.q.appendChild(inp);
}

Quiz.prototype.add = function(parent, spec) {
    parent.appendChild(this[spec.type](spec));
}

Quiz.prototype.mcRadioText = function(id, txt) {
    this.q.appendChild(mkinput(id, 'radio', 'multichoiceradio'));
    this.add(this.q, document.createTextNode(txt));
}

Quiz.prototype.mcRadioImg = function(id, src) {
    if (src.constructor === Array) {
        l = [];
        for (var i = 0; i < src.length; i++) {
            radio = mkinput(id+"-"+i, 'radio', 'multichoiceradio');
            radio.name = id;
            label = document.createElement("label");
            label.htmlFor = id+"-"+i;
            label.appendChild(this.img(src[i], true));
            group = [radio, label];
            l.push(group);
        }
        this.q.appendChild(mktable("", l));
    } else {
        div = make("div", "", "radio-container");
        label = document.createElement("label");
        label.htmlFor = id;
        radio = mkinput(id, 'radio', 'multichoiceradio');
        radio.name = id;
        div.appendChild(radio);
        var img = document.createElement("img");
        img.src = src;
        label.appendChild(img);
        div.appendChild(label);
        this.q.appendChild(div);
    }
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
    if (sendBack)
        return s;
	this.q.appendChild(s);
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
		img.src = Quiz.mediaLocations.img + list[i];
		opt.appendChild(img);
		s.appendChild(opt);
	}
	this.q.appendChild(s);
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
    this.q.appendChild(t);
}

Quiz.prototype.emptyGrid = function(id, rows, cols, header) {
    var l;
    var returnHeader = false;
    i = 0;
    if (header) {
        l = new Array(rows+1);
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
    this.grid(id, l, returnHeader);
};

Quiz.prototype.grid = function(id, list, header) {
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
    this.q.appendChild(d);
};

Quiz.prototype.suffixMap = {
    inputCount: 0,
    jpg: Quiz.prototype.img,
    png: Quiz.prototype.img,
    gif: Quiz.prototype.img,
};

Quiz.prototype.tableInput = function(s, returnValue, id) {
    input = mkinput(id + "_" + this.inputCount, "text", "grid-input");
    this.inputCount++;
    return input;
};
Quiz.prototype.suffixMap["%%input%%"] = Quiz.prototype.tableInput;

Quiz.prototype.suffix = function(s, id) {
    s += "";
    var suf = s.split('.').pop();
    if (this.suffixMap[suf])
       return this.suffixMap[suf](s, true, id);
    return this.span(s, true);
};

// accept is a string: ".java,.txt"
Quiz.prototype.fileUpload = function(id, accept) {
    var up = document.createElement("input");
    up.id = id;
    up.type = "file";	
    up.accept = accept;
    this.q.appendChild(up);
};

function imgClick(e) {
    console.log(e.clientX + "," + e.clientY);	
};

Quiz.prototype.clickableImage = function(id, src, xs, ys) {
    var img = document.createElement("img");
    img.src = Quiz.mediaLocations.img + src;
    img.onclick = imgClick;
    this.q.appendChild(img);
};

// multiple fill-in-the-blank where [[]] is replaced by inputs
Quiz.prototype.cloze = function(id, txt) {
    var preItems = txt.split("[[]]");
    var pre = document.createElement("pre");
    pre.className = "code";

    for (var i = 0; i < preItems.length; ++i) {
        pre.appendChild(make('span', preItems[i], ''));
        if (i != preItems.length-1)
        	pre.appendChild(this.fillin(id + "_" + i, true));
    }
    this.q.appendChild(pre);
};

// enter code to be compiled, run, spindled, mutilated
Quiz.prototype.code = function(id, txt, rows, cols) {
    var ta = document.createElement("textarea");
    ta.className = "code";
    ta.rows = rows;
    ta.cols = cols;
    ta.value = txt;
    this.q.appendChild(ta);
};

Quiz.prototype.essay = function(id, rows, cols, maxwords) {
    var ta = document.createElement("textarea");
    ta.className = "essay";
    ta.rows = rows;
    ta.cols = cols;
    //ta.value = essay.text;
    this.q.appendChild(ta);
};

var page;

// /*
//  * Run a serverside script (the parameter)
//  * which prints a JSON string.
//  * load the JSON, evaluate it and call initPage() to update the page
//  */
// function build() {
//     // your page: test.html
//     // ajax url: test_ajax.jsp
// 	var thisURL = window.location.href;
// 	var last = thisURL.split("/");
// 	last=last[last.length-1];
// 	var baseFilename = last.split('.').slice(0,-1).join('');
// 	var ajax = baseFilename + "_ajax.jsp"; // name of dynamic file to run

// 	var json = new XMLHttpRequest();
// 	json.onreadystatechange=function() {
// 	  if (json.readyState!=4 || json.status!=200)
// 		  return;// TODO: Handle error if it doesn't come back
// 	  eval("page="+json.responseText);
// 	  processAJAX();
// 	}
// 	json.open("GET",ajax,true);
// 	json.send();
// }

function processAJAX() {
    if (exists(typeof(page.css))) {
    	appendCSSLink("assets/css/" + page.css + ".css");	// load the user's css skin
    } else {
        console.error("custom css didn't load. check css link in page.css");
    }
	if (exists(typeof(thisPage)))
        thisPage();
}
