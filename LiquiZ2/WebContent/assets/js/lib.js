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


function dump(obj) {
    var s = "";
    for (var k in obj) {
    s += k + "-->" + obj[k] + '\n';
    }
    console.log(s);
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

function mkbutton(val) {
    var b = mkinput(null, 'button', 'submit');
    b.value = val;
    return b;
}

function make(tag, inner, className) {
    var t = document.createElement(tag);
    if (className)
        t.className = className;
    // if (inner)
    t.innerHTML = inner;
    return t;
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
    this.createSubmit();
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
    var newB = mkbutton("New Question");
    newB.onclick = function() {
    alert('test');
  }
  qc = mkdivid(this.div, "qc" + id, "qc");
      qc.appendChild(newB);
  }
    this.createSubmit();
}
Quiz.prototype.addQuestion = function(id, title, className, points, level) {
    mkdivid(this.div, "qc" + id, "qc " + className + "-qc");
    this.q = document.getElementById("qc" + id);
    points = (!exists(typeof(points))) ? 1 : points;
    level =  (!exists(typeof(level))) ? 1 : level;
    var editBox = document.createElement("div");
    editBox.className = "edit";
    if (this.editMode) {
    	var edit = mkbutton("Edit");
    	edit.onclick= function() {
    		innerHTML = "";
    		alert("test");
    	};
    	editBox.appendChild(edit);
    	editBox.appendChild(mkbutton("Delete"));
    	editBox.appendChild(mkbutton("Copy"));
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
Quiz.prototype.createSubmit = function() {
    var div = mkdiv(this.div, "submit");
    div.appendChild(mkbutton("Submit The Quiz"));
    this.div.appendChild(div);
};


Quiz.prototype.img = function(src) {
    var im = document.createElement("img");
    im.src = Quiz.mediaLocations.img + src;
    im.width = 300; //TODO: stop hardcoding this!
    this.q.appendChild(im);
};

//var audioTypeMap = {
//    mp3: "mp3",
//    au:  "au"
//};

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

Quiz.prototype.span	 = function(txt) {
    this.q.appendChild(make('span', txt, ''));
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
    this.q.appendChild(mkinput(id, 'radio', 'multichoiceradio'));
    var img = document.createElement("image");
    img.src = src;
    this.q.appendChild(img);
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

Quiz.prototype.matrix = function(id, m, rows, cols, className,
				 colHeaders, rowHeaders) {
    this.q.appendChild(make("span", "Matrix goes here", "matrix-placeholder"))
    // this.span("Matrix goes here");
/*    var id = this.numeric(id); // base id
    var t = document.createElement("table");
    t.className = className;
    var hasVals = typeof(m) != 'undefined';
    var hasColHeaders = typeof(colHeaders) != 'undefined';
    var hasRowHeaders = typeof(rowHeaders) != 'undefined';
    if (hasColHeaders) {
	var colheaders = hasRowHeaders ? [''] : [];
	for (var i = 1; i < m[0].length; i++)
	    colHeaders.push(i);
	m.splice(0,0, colHeaders);
	if(hasColHeaders) {
	    for (var i = 1; i < m.length; i++) {
		m[i].splice(0,0, rowHeaders[i]);
	    }
	}
    }
    for (var i = 0; i < rows; i++) {
	var r = t.insertRow(i);
	r.className = "mat.rowClassName";
	for (var j = 0; j < cols; j++) {
            var td = r.insertCell(j);
            var v = hasVals ? m[i][j] : '';
            var inp = this.numid(id + "_" + i + "," + j, v);
            if (mat.readOnly)
		inp.readOnly = mat.readOnly;
            if (mat.disabled)
		inp.disabled = true;
            td.appendChild(inp);
	}
    }
    this.q.appendChild(t);*/
};

// accept is a string: ".java,.txt"
Quiz.prototype.fileUpload = function(id, accept) {
    var up = document.createElement("input");
    up.id = id;
    up.type = "file";	
    up.accept = accept;
    this.q.appendChild(up);
};

function imgclick(e) {
    alert(e);
};

Quiz.prototype.clickableImage = function (id, src, xs, ys) {
    var img = document.createElement("img");
    img.src = Quiz.mediaLocations.img + src;
    img.onClick = function(e) { alert(e); }
    this.q.appendChild(img);
};

// multiple fill-in-the-blank where [[a1]] is replaced by inputs
Quiz.prototype.cloze = function (id, txt) {
    var preItems = txt.split("[[]]") // If you want default items in here, just parse with regex
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

/*
 * Run a serverside script (the parameter)
 * which prints a JSON string.
 * load the JSON, evaluate it and call initPage() to update the page
 */
function build() {
    // your page: test.html
    // ajax url: test_ajax.jsp
	var thisURL = window.location.href;
	var last = thisURL.split("/");
	last=last[last.length-1];
	var baseFilename = last.split('.').slice(0,-1).join('');
	var ajax = baseFilename + "_ajax.jsp"; // name of dynamic file to run

	var json=new XMLHttpRequest();
	json.onreadystatechange=function() {
	  if (json.readyState!=4 || json.status!=200)
		  return;// TODO: Handle error if it doesn't come back
	  eval("page="+json.responseText);
	  processAJAX();
	}
	json.open("GET",ajax,true);
	json.send();
}

function processAJAX() {
    if (exists(typeof(page.css))) {
    	appendCSSLink("assets/css/" + page.css + ".css");	// load the user's css skin
    } else {
        console.log("custom css didn't load. check css link in page.css");
    }
	if (exists(typeof(thisPage)))
        thisPage();
}
