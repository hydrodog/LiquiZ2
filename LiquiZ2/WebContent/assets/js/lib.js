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


function mkdiv(parent, className) {
    var div = document.createElement("div");
    div.className = className;
    parent.appendChild(div);
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

function equation() {

}
/*
Element.prototype.add = function(tag, className) {
    var n = document.createElement(tag);
    n.className = className;
    this.appendChild(n);
    return n;
}
Element.prototype.addText = function(text) {
    var n = document.createTextNode(text);
    this.appendChild(n);
}
*/
function qhead(title, points, level) {
    points = (typeof(points) == 'undefined') ? 1 : points;
    level =  (typeof(level) == 'undefined') ? 1 : level;
    return {type: 'qhe', title: title, points: points, level: level};
}
function txt(txt)  { return {type: 'txt', text: txt}  } // plain text inside <span>
function ins(txt)  { return {type: 'ins', text: txt}  } // instructions <span class="instructions">
function lin(txt)  { return {type: 'lin', text: txt}  } // text within <p>
function box(txt)  { return {type: 'box', text: txt}  } // text within div
function gri(mat)  { return {type: 'mat', arr: mat,
                 className: 'grid', readOnly: 1,
                 rows: mat.length, cols: mat[0].length}   } // create a table based on matrix
function img(file) { return {type: 'img', file: file} }
function aud(file) { return {type: 'aud', file: file} }
function vid(file) { return {type: 'vid', file: file} }

function fil(id)       {    return {type: 'fil', id: id}              }
function num(id)       {    return {type: 'num', id: id}              }
function mcr(id, list) {    return {type: 'mcr', id: id, list: list}  }
function mcd(id, list) {    return {type: 'mcd', id: id, list: list}  }
function mat(id, rows, cols) { return {type: 'mat', rows: rows, cols: cols}; }
function ess(id, rows, cols,maxwords) { return {type: 'ess', rows: rows, cols: cols, maxwords: maxwords};  }
// file upload
function fup(id)       {    return {type: 'fup' } }
//???
function cli(id, file, xs, ys) {    return {type: 'cli', id: id, file: file, xs: xs, ys: ys}  }

// multiple fill-in-the-blank where [[a1]] is replaced by inputs
function cloze(id, txt) {   return {type: 'cloze', id: id, text: txt}   }

// enter code to be compiled, run, spindled, mutilateed
function cod(id, txt, rows, cols) {  return {type: 'cod', id: id, text: txt, rows: rows, cols: cols}   }
function match(id, questions, answers) {
    return {type: 'match', id: id, questions: questions, answers: answers };
}

function dump(obj) {
    var s = "";
    for (var k in obj) {
    s += k + "-->" + obj[k] + '\n';
    }
    alert(s);
}
var audioTypeMap = {
    mp3: "mp3",
    au:  "au"
};

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
    if (typeof(className) != 'undefined')
    t.className = className;
    t.innerHTML = inner;
    return t;
}

var clozeTarget = /[[]]/;

/*
  Information about quiz required for display on client side.
  Much more data on server side in Policy.java
*/
function QuizInfo(title, points, timelimit, remainingTries, datadir) {
    this.title = title;
    this.points = points;
    this.timelimit = timelimit;
    this.remaining = remainingTries;
    this.datadir = datadir;
}
QuizInfo.prototype.display = function(quiz) {
    quiz.appendChild(make("h1", this.title));
    quiz.appendChild(make("span", " Points: " + this.points, "points"));
    //TODO: add time and countdown
    //TODO: add remaining tries
}

function Quiz(quizinfo, qlist) {
    this.div = document.getElementById("quiz");
    this.setDataDir(quizinfo.datadir);
    this.div.className = "quiz";
    quizinfo.display(this.div);
    this.createSubmit();
    for (var i = 0; i < qlist.length; i++) {
        var qc = mkdiv(this.div, "qc");
        for (var j = 0; j < qlist[i].length; j++)
            this.add(qc, qlist[i][j]);
    }
    this.createSubmit();
}

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
}

Quiz.prototype.qhe = function(qhead) {
    return mktable("qheader",
           [ [ mk("h2", qhead.title, ''),
               mk("span", "points:" + qhead.points, "qpoints"),
               mk("span", "level:" +qhead.level, "level")
             ]]);
}

Quiz.prototype.img = function(img) {
    var im = document.createElement("img");
    im.src=Quiz.mediaLocations.img + img.file;
    im.width=300;
    return im;
}

Quiz.prototype.aud = function(aud) {
    var au = document.createElement("audio");
    au.controls = 1; //TODO: proabbly wrong!
    var s = document.createElement("source");
    s.src = Quiz.mediaLocations.aud + aud.src;
    var suffix = aud.file.search(/\.\w+$/);
    var mediaType = audioTypeMap[aud.file.substr(suffix+1)]; //TODO: Fix this!
    s.type = mediaType;
    au.appendChild(s);
    return au;
}

Quiz.prototype.vid = function(vid) {
    var vi = document.createElement("video");
    vi.src = Quiz.mediaLocations.vid + vid.file;
    return vi;
}

Quiz.prototype.txt = function(txt) {
    return make('span', txt.text);
}

Quiz.prototype.ins = function(ins) {
    return make('span', ins.text, 'instructions');
}

Quiz.prototype.lin = function(lin) {
    return make('p', lin.text);
}

Quiz.prototype.box = function(txt) {
    var div = mkdiv(this, "div", "box");
    div.innerHTML = txt.text;
    return div;
}

Quiz.prototype.fil = function(fil) {
    return mkinput(fil.id, 'text', 'fillin');
}

Quiz.prototype.num = function(num) {
    return mkinput(num.id, 'text', 'number');
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

Quiz.prototype.mcr = function(mcr) {
    for (var i = 0; i < mcr.list.length; i++) {
    this.div.appendChild(mkinput(mcr.id, 'radio', 'multichoiceradio'));
    this.add(this.div, mcr.list[i]);
    }
    return this.div;
}

Quiz.prototype.select = function(id, list) {
    var s = document.createElement("select");
    s.id = id;
    s.className = "multichoicedropdown";
    for (var i = 0; i < list.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.appendChild(this[list[i].type](list[i]));
    s.appendChild(opt);
    }
    return s;
}

Quiz.prototype.mcd = function(mcd) {
    return select(mcd.id, mcd.list);
}

Quiz.prototype.match = function(match) { 
    var t = document.createElement("table");
    for (var i = 0; i < match.questions.length; ++i) {
    var r = t.insertRow(i);
    var q = r.insertCell(0);
    this.add(q, match.questions[i]);
    q = r.insertCell(1);
    q.appendChild(this.select(match.id + "_" + i, match.answers));
    }
    return t;
}
Quiz.prototype.mat = function(mat) {
    var id = num(mat.id); // base id
    var t = document.createElement("table");
    t.className = mat.className;
    var m = mat.arr;
    var hasVal = typeof(m) != 'undefined';
    for (var i = 0; i < mat.rows; i++) {
    var r = t.insertRow(i);
    r.className = "mat.rowClassName";
    for (var j = 0; j < mat.cols; j++) {
        var td = r.insertCell(j);
        var v = hasVal ? m[i][j] : '';
        var inp = this.numid(id + "_" + i + "," + j, v);
        if (mat.readOnly)
        inp.readOnly = mat.readOnly;
        td.appendChild(inp);
    }   
    }
    return t;
}
Quiz.prototype.fup = function(fup) {
    var up = document.createElement("input");
    up.id = fup.id;
    up.type = "file";
    return up;
}

function imgclick(e) {
    alert(e);
}

Quiz.prototype.cli = function (cli) { // clickable image
    var img = document.createElement("img");
    img.src = cli.file;
    img.onClick = function(e) { alert(e); }
    return img;
}

Quiz.prototype.cloze = function (cloze) {
    var count = 0;
    var t = cloze.text;
    var last = 0;
    var ind;
    var pre = document.createElement("pre");
    pre.className = "code";
    var f = fil(cloze.id);
    while ((ind = t.search(clozeTarget)) >= 0) {
    if (ind > 0)
        pre.appendChild(this.txt(t.substring(0, ind-last)));
    pre.appendChild(this.fil(cloze.id + "_" + count++));
    t = t.substring(ind + 4);
    }
    pre.appendChild(this.txt(t));
    return pre;
}

Quiz.prototype.cod = function(cod) {
    var ta = document.createElement("textarea");
    ta.className = "code";
    ta.rows = cod.rows;
    ta.cols = cod.cols;
    ta.value = cod.text;
    return ta;
}

/*
Quiz.prototype.ess = function(ess) {
    var ta = document.createElement("textarea");
    ta.className = "essay";
    ta.rows = ess.rows;
    ta.cols = ess.cols;
    //ta.value = essay.text;
    return ta;
}
*/

function build() {
    var quizinfo  = new QuizInfo("Quiz Demo #1", 100, 0, 1, "assets/");
    var qlist = [
    [
        qhead("Mergesort", 1, 1),
        lin("Show the first pass of Mergesort below"),
        gri([[9, 8, 7, 6, 5, 4, 3, 1]]),
        mat(1, 1, 8)
    ],
    [
        qhead("Matrix Multiplication", 1, 1),
        lin("Show the result of matrix A * B"),
        gri([[1, 0, 2],[1, 1, -2],[2, 1, 0]]), txt("*"),
        gri([[1, 1, -1],[-2, 1, 0],[1, 1, 3]]), txt("="),
        mat(2, 3, 3)
    ],
    [
        qhead('Java'),
        lin('Complete the code below so it prints "Hello"'),
        cod(3, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80)
    ],
    [
        qhead('Java'),
        lin('Complete the following function so it computes factorial recursively.'),
        cod(4, "public static void fact(int n) {\n\n\n\n}", 10, 80)
    ],
    [
        qhead('Java'),
        txt("Fill in the blanks to make the code correct"),
        cloze(5, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}')
    ],
    [
        qhead("Object Oriented Terminology"),
        lin("Match the object-oriented terminology to the meaning"),
        match(6, [txt("class"), txt("object"), txt("method"), txt("message"),
           txt("polymorphism"), txt("encapsulation")],
          [txt("A concrete instance of a class"),
           txt("A request made to an object"),
           txt("Hiding the internal details of a class or object"),
           txt("Sending the same message to different objects and getting different results"),
           txt("A specification of an object"),
           txt("A function that is applied to an object")
          ])
    ],
    [
        qhead("File Upload"),
        lin("Submit your homework for the 3n+1 problem as a single .java file"),
        fup(7, "java"),     
    ],
//      match(17, ["class", "object", "method", "message", "polymorphism", "encapsulation"],
//        ["A concrete instance of a class",
//         "A request made to an object",
//         "Hiding the internal details of a class or object",
//         "Sending the same message to different objects and getting different results",
//         "A specification of an object"
//        ])
    [
        qhead("Graph Theory"),
        lin("Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable."),
        img("Bellmanford_3.png"),
        mat(8, 3, 5)
    ],
    [
        qhead("Arithmetic"),
        txt("What is 2 + 2?"),
        fil(10)
    ],
    [
        qhead('Dinosaur'),
        lin("Which one is the dinosaur?"),
//      mcr(11, [img("cat2.jpg"), img("fish2.png"), img("trex.jpg")])
    ],
    [
        qhead('Dinosaur'),
        lin("Which one is the dinosaur?"),
        mcd(12, [img("cat2.jpg"), img("fish2.png"), img("trex.jpg")])
    ],
    [
        qhead('Multimedia'),
        txt('listen to the following audio file and pick the name of the main character.'),
        aud("clip1.mp3"),
        mcd(13, [txt('Yijin'), txt('Asher'), txt('Ying'), txt('Xuefan'), txt('Bob')])
    ],
    [
        qhead('Tacoma Narrows'),
        txt('Watch the following video, then explain what caused the bridge to fail.'),
        vid("Tacoma Narrows Bridge Collapse.mp4"),
        ess(14, 10, 80, 200)
    ],
    [
        qhead('Arithmetic'),
        txt("What is the square root of 2 (four digits is fine)?"),
        num(15)
    ],
    [
        qhead("Geography"),
        lin("Click on Texas"),
        cli(16,"usmap.gif")
    ]
    ];
    var q = new Quiz(quizinfo, qlist);   
}
