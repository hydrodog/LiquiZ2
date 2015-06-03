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

function addSelect(divName, list) {
  document.getElementById(divName).appendChild(select(list));
}

function gri(mat)  { return {type: 'mat', arr: mat,
                 className: 'grid', readOnly: 1, disabled: true,
                 rows: mat.length, cols: mat[0].length}   } // create a table based on matrix

function dump(obj) {
    var s = "";
    for (var k in obj) {
    s += k + "-->" + obj[k] + '\n';
    }
    alert(s);
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
    this.setDataDir(this.datadir);
    this.div.className = "quiz";
    this.displayHeader(this.div);
    this.editMode = true;
    this.createSubmit();
}

Quiz.prototype.displayHeader = function() {
    this.div.appendChild(make("h1", this.title));
    this.div.appendChild(make("span", " Points: " + this.points, "points"));
    this.timer = mkinput("timer", "type", "timer");
    this.div.appendChild(this.timer);
    //TODO: add time and countdown
    //TODO: add remaining tries
}

Quiz.prototype.end = function() {
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
Quiz.prototype.addQuestion = function(id, title, points, level) {
    mkdivid(this.div, "qc" + id, "qc");
    points = (typeof(points) == 'undefined') ? 1 : points;
    level =  (typeof(level) == 'undefined') ? 1 : level;
    var td = document.createElement("td");
    if (this.editMode) {
    	var edit = mkbutton("Edit");
    	edit.onclick= function() {
    		innerHTML = "";
    		alert("test");
    	};
    	td.appendChild(edit);
    	td.appendChild(mkbutton("Delete"));
    	td.appendChild(mkbutton("Copy"));
    }

    this.div.appendChild(mktable("qheader",
    		[ [ mk("h2", this.title, ''),
    		    mk("span", "points:" + points, "qpoints"),
    		    mk("span", "level:" + level, "level"),
    		    td
    		    ]]));
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
    return im;
};

//var audioTypeMap = {
//    mp3: "mp3",
//    au:  "au"
//};

Quiz.prototype.aud = function(src) {
    var au = document.createElement("audio");
    au.controls = 1; //TODO: proabbly wrong!
    var s = document.createElement("source");
    s.src = Quiz.mediaLocations.aud + src;
    var suffix = aud.file.search(/\.\w+$/);
//    var mediaType = audioTypeMap[aud.file.substr(suffix+1)]; //TODO: Fix this!
    s.type = mediaType;
    au.appendChild(s);
    return au;
}

Quiz.prototype.vid = function(src) {
    var vi = document.createElement("video");
    vi.src = Quiz.mediaLocations.vid + src;
    vi.controls = true;
    this.div.appendChild(vi);
}

Quiz.prototype.span	 = function(txt) {
    this.div.appendChild(make('span', txt, ''));
}

Quiz.prototype.br = function() {
    this.div.appendChild(document.createElement('br'));
}

Quiz.prototype.instructions = function(txt) {
    this.div.appendChild(make('span', txt, 'instructions'));
}

Quiz.prototype.p = function(txt) {
    this.div.appendChild(make('p', txt));
}

Quiz.prototype.box = function(txt) {
    var div = mkdiv(this, "div", "box");
    div.innerHTML = txt;
    this.div.appendChild(newChild);
}

Quiz.prototype.fillin = function(id) {
    return mkinput(id, 'text', 'fillin');
}

Quiz.prototype.numeric = function(id) {
    return mkinput(id, 'text', 'number');
}

Quiz.prototype.numid = function(id, v) {
    var inp = mkinput(id, 'text', 'cell');
    inp.size = 3;
    inp.value = v;
    return inp;
}

Quiz.prototype.add = function(parent, spec) {
    parent.appendChild(this[spec.type](spec));
}

Quiz.prototype.mcRadioText = function(id, txt) {
    this.div.appendChild(mkinput(id, 'radio', 'multichoiceradio'));
    this.add(this.div, document.createTextNode(txt));
}

Quiz.prototype.mcRadioImg = function(id, src) {
    this.div.appendChild(mkinput(id, 'radio', 'multichoiceradio'));
    var img = document.createElement("image");
    img.src = src;
    this.div.appendChild(img);
}

Quiz.prototype.select = function(id, list) {
    var s = document.createElement("select");
    s.id = id;
    s.className = "multichoicedropdown";
    for (var i = 0; i < list.length; i++) {
	var opt = document.createElement("option");
	opt.value = i;
	opt.appendChild(document.createTextNode(list[i]));
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
	q.appendChild(this.select(id + "_" + i, answers));
    }
    return t;
}

Quiz.prototype.matrix = function(id, m, rows, cols, className,
				 colHeaders, rowHeaders) {
    var id = this.numeric(id); // base id
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
    this.div.appendChild(t);
};

// accept is a string: ".java,.txt"
Quiz.prototype.fileUpload = function(id, accept) {
    var up = document.createElement("input");
    up.id = id;
    up.type = "file";	
    up.accept = accept;
    this.div.appendChild(up);
};

function imgclick(e) {
    alert(e);
};

Quiz.prototype.clickableImage = function (id, src, xs, ys) {
    var img = document.createElement("img");
    img.src = Quiz.mediaLocations.img + cli.file;
    img.onClick = function(e) { alert(e); }
    this.div.appendChild(img);
};

// multiple fill-in-the-blank where [[a1]] is replaced by inputs
Quiz.prototype.cloze = function (id, txt) {
    var preItems = txt.split("[[]]") // If you want default items in here, just parse with regex
    var pre = document.createElement("pre");
    pre.className = "code";

    for (var i = 0; i < preItems.length; ++i) {
        pre.appendChild(make('span', preItems[i], ''));
        if (i != preItems.length-1)
        	pre.appendChild(this.fillin(id + "_" + i));
    }
    this.div.appendChild(pre);
};

// enter code to be compiled, run, spindled, mutilated
Quiz.prototype.code = function(id, txt, rows, cols) {
    var ta = document.createElement("textarea");
    ta.className = "code";
    ta.rows = rows;
    ta.cols = cols;
    ta.value = txt;
    this.div.appendChild(ta);
};

Quiz.prototype.essay = function(id, rows, cols, maxwords) {
    var ta = document.createElement("textarea");
    ta.className = "essay";
    ta.rows = ess.rows;
    ta.cols = ess.cols;
    //ta.value = essay.text;
    this.div.appendChid(ta);
};

function build() {
    var q = new Quiz( {
	title: "Quiz Demo #1",
	points: 100,
	timeLimit: 0,
	remainingTries: 1,
	dataDir: "assets/"
    } );
    q.addQuestion(1, "Mergesort");
    q.instructions("Show the first pass of Mergesort below");
//    q.grid([[9, 8, 7, 6, 5, 4, 3, 1]]);
    q.br();
    q.matrix(1, 1, 8);

    q.addQuestion(2, "Matrix Multiplication", 2); // 2 point question
    q.instructions("Show the result of matrix A * B");
  //  q.grid([[1, 0, 2],[1, 1, -2],[2, 1, 0]]);
    q.span("*");
  //  q.grid([[1, 1, -1],[-2, 1, 0],[1, 1, 3]]);
    q.span("=");
    q.matrix(2, 3, 3);

    q.addQuestion(3, 'Java'),
    q.instructions('Complete the code below so it prints "Hello"'),
    q.code(3, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80);

    q.addQuestion(4, 'Java');
    q.instructions('Complete the following function so it computes factorial recursively.');
    q.code(4, "public static void fact(int n) {\n\n\n\n}", 10, 80)

    q.addQuestion(5,'Java');
    q.instructions("Fill in the blanks to make the code correct");
    q.cloze(5, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}');

    q.addQuestion(6, "Object Oriented Terminology");
    q.instructions("Match the object-oriented terminology to the meaning");
    q.match(6,
    		["class", "object", "method", "message", "polymorphism", "encapsulation"],
			["A concrete instance of a class",
    		"A request made to an object",
			"Hiding the internal details of a class or object",
			"Sending the same message to different objects and getting different results",
			"A specification of an object",
    		"A function that is applied to an object"]);

    q.addQuestion(7, "File Upload");
    q.instructions("Submit your homework for the 3n+1 problem as a single .java file");
    q.fileUpload(7, ".java");

    q.addQuestion(8, "Graph Theory");
    q.instructions("Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable.");
    q.img("Bellmanford_3.png");
    q.matrix(8, 3, 5);

    q.addQuestion(10, "Arithmetic"),
    q.span("What is 2 + 2?"),
    q.fillin(10);

    q.addQuestion(11, 'Dinosaur');
    q.p("Which one is the dinosaur?");
    q.mcRadioImg(11);
    q.img("cat2.jpg");
    q.img("fish2.png");
    q.img("trex.jpg");

    q.addQuestion(12, 'Dinosaur');
    q.p("Which one is the dinosaur?"),
    q.mcDropdown(12, [img("cat2.jpg"), img("fish2.png"), img("trex.jpg")])

    q.addQuestion(13);
    q.qhead('Multimedia'),
    q.instructions('listen to the following audio file and pick the name of the main character.');
    q.aud("clip1.mp3");
    q.mcDropdown(13, [txt('Yijin'), txt('Asher'), txt('Ying'), txt('Xuefan'), txt('Bob')]);

    q.addQuestion(14, 'Tacoma Narrows'),
    q.instructions('Watch the following video, then explain what caused the bridge to fail.');
    q.vid("Tacoma Narrows Bridge Collapse.mp4");
    q.essay(14, 10, 80, 200)

    q.addQuestion(15, 'Arithmetic');
    q.txt("What is the square root of 2 (four digits is fine)?");
    q.numeric(15);

    q.addQuestion(16);
    q.qhead("Geography");
    q.lin("Click on Texas");
    q.clickableMap(16,"usmap.png");
    quiz.end();
}
