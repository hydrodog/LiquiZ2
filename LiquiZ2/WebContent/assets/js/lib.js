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


Element.prototype.mkdiv = function (className) {
    var div = document.createElement("div");
    div.className = className;
    this.appendChild(div);
    return div;
}

document.addText = function(div, t) {
    var txt = this.createElement("p");
    txt.innerHTML = t;
    div.appendChild(txt)
}

document.addTextInput = function(div, className, t) {
    var inp = this.createElement("input");
    inp.className = className;
    inp.value = t;
    div.appendChild(inp);
}

document.addNumInput = function(div, className, t) {
    var inp = this.createElement("input");
    inp.type = "number";
    inp.className = className;
    inp.value = t;
    div.appendChild(inp);
}

document.addImg = function(div, name) {
    var img = this.createElement("img");
    img.src = name;
    div.appendChild(img);
}

document.addAudio = function(div, name) {
    var audio = this.createElement("audio");
    img.src = name;
    div.appendChild(audio);
}

document.addQ = function() {
    var div = this.getElementById("quiz");
    div.className = "qc";
    return div;
}

document.fillin = function(txt) {
    var div = this.addQ();
    this.addText(div, txt);
    this.addTextInput(div, "fillin", "");
}

document.number = function(txt) {
    var div = this.addQ();
    this.addText(div, txt);
    this.addNumInput(div);
}

function equation() {


}

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

Element.prototype.addStyledText = function(className, text) {
    var n = document.createElement("span");
    n.innerHTML = text;
    this.appendChild(n);
}

Element.prototype.addFillin = function(id, value) {
    var n = document.createElement("input");
    n.id = id;
    n.className = "fillin";
    n.value = value;
    this.appendChild(n);
}

Element.prototype.addImage = function(url) {
    var n = document.createElement("img");
    n.src = url;
    this.appendChild(n);
}

Element.prototype.multipart = function(list) {
    var div = this.mkdiv("qc");
    if (typeof(list)=='undefined')
	return;
    alert(list);
    for (var i = 0; i < list.length; i++)
	;//this[list[i]]
}

function txt(txt)  { return {type: 'txt', text: txt}  } // plain text inside <span>
function ins(txt)  { return {type: 'ins', text: txt}  } // instructions <span class="instructions">
function lin(txt)  { return {type: 'lin', text: txt}  } // text within <p>
function box(txt)  { return {type: 'box', text: txt}  } // text within div
function gri(mat)  { return {type: 'gri', arr: mat}   } // create a table based on matrix
function img(file) { return {type: 'img', file: file} }
function aud(file) { return {type: 'aud', file: file} }
function vid(file) { return {type: 'vid', file: file} }

function fil(id)       {    return {type: 'fil', id: id}              }
function num(id)       {    return {type: 'num', id: id}              }
function mcr(id, list) {    return {type: 'mcr', id: id, list: list}  }
function mcd(id, list) {    return {type: 'mcd', id: id, list: list}  }
function mat(id, rows, cols) {    return {type: 'mat', rows: rows, cols: cols}; }
// file upload
function fup(id)       {    return {type: 'fup' } }
//???
function cli(id, file) {    return {type: 'cli', id: id, file: file}  }

// multiple fill-in-the-blank where [[a1]] is replaced by inputs
function cloze(id, txt) {   return {type: 'clo', id: id, text: txt}   }

// enter code to be compiled, run, spindled, mutilateed
function cod(id, txt) {  return {type: 'cod', id: id, text: txt}   }

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

var clozeTarget = /[[]]/;
Element.prototype.dispatch = {
    img: function(img) {
	var im = document.createElement("img");
	im.src=img.file;
	return im;
    },
    aud: function(aud) {
	var au = document.createElement("audio");
	au.controls = 1; //TODO: proabbly wrong!
	var s = document.createElement("source");
	s.src = aud.src;
	var suffix = aud.file.search(/\.\w+$/);
	var mediaType = audioTypeMap[suffix.match.substring(1)]; //TODO: Fix this!
	s.type = mediaType;
	au.appendChild(s);
	return au;
    },
    vid: function(vid) {
	var vi = document.createElement("video");
	vi.src = vid.file;
	return vi;
    },
    txt: function(txt) {
	var span = document.createElement("span");
	span.innerHTML = txt.text;
	return span;
    },
    ins: function(ins) {
	var span = document.createElement("span");
	span.className = "instructions";
	span.innerHTML = ins.text;
	return span;
    },
    lin: function(lin) {
	var p = document.createElement("p");
	p.innerHTML = lin.text;
	return p;
    },
    box: function(txt) {
	var div = this.mkdiv("div", "box");
	div.innerHTML = txt.text;
	return div;
    },
    gri: function(mat) {
	var t = document.createElement("table");
	t.className = "grid";
	var m = mat.arr;
	for (var i = 0; i < m.length; i++) {
	    var r = t.insertRow(i);
	    for (var j = 0; j < m[i].length; j++) {
		var td = r.insertCell(j);
		td.className = "gridcell";
		td.innerHTML = m[i][j];
	    }
	}
	return t;
    },
    fil: function(fil) {
	var inp = document.createElement("input");
	inp.id = fil.id;
	inp.type = "text";
	inp.className = "fillin";
	return inp;
    },
    num: function(num) {
	var inp = document.createElement("input");
	inp.id = num.id;
	inp.type = "text"; // TODO: add javascript to restrict input?
	inp.className = "number";
	return inp;
    },
    numid: function(id) {
	var inp = document.createElement("input");
	inp.id = id;
	inp.type = "text"; // TODO: add javascript to restrict input?
	inp.size = 3;
	inp.className = "cell";
	return inp;
    },
    mcr: function(mcr) {
	for (var i = 0; i < mcr.list.length; i++) {
	    var inp = document.createElement("input");
	    inp.name = mcr.id;
	    inp.type = radio;
	    inp.className = "multichoiceradio";
	    this.appendChild(inp);
	    this.appendChild(this.dispatch[mcd.list[i].type](mcd.list[i]));
	}
	return this;	
    },
    mcd: function(mcd) {
	var s = document.createElement("select");
	s.id = mcr.id;
	s.className = "multichoicedropdown";
	for (var i = 0; i < mcd.list.length; i++) {
	    var opt = document.createElement("option");
	    opt.value = i;
	    opt.appendChild(s.dispatch[mcd.list[i].type](mcd.list[i]));
	    ; //s.dispatch[mcd.list.length[i]];
	    s.appendChild(opt);
	}
	return s;
    },
    mat: function(mat) {
	var id = num(mat.id); // base id
	var t = document.createElement("table");
	t.className = "matrix";
	for (var i = 0; i < mat.rows; i++) {
	    var r = t.insertRow(i);
	    r.className = "matrixrow";
	    for (var j = 0; j < mat.cols; j++) {
		var td = r.insertCell(j);
		td.appendChild(td.dispatch.numid(id + "_" + i + "," + j));
	    }
	}
	return t;
    },
    fup: function(fup) {

    },
    cli: function (cli) { // clickable image
	var img = document.createElement("img");
	img.src = cli.file;
	img.onClick = "alert(event)"; // TODO: make this store the location
    },
    cloze: function (cloze) {
	var count = 0;
	var t = close.text;
	t.replace(/\n/g, '<br/>');
	var last = 0;
	var ind;
	var f = fil(cloze.id);
	while ((ind = t.exec(clozeTarget)) >= 0) {
	    if (ind > 0) {
		this.dispatch.txt(t.substring(0, ind-last));
		this.dispatch.fil(id);
		t = t.substring(ind + 4);
	    }
	}
	this.dispatch.txt(t);
    },
    cod : function(cod) {
	var ta = document.createElement("textarea");
	ta.className = "code";
	ta.rows = cod.rows;
	ta.cols = cod.cols;
	ta.value = cod.text;
	return ta;
    }
};

Element.prototype.createSubmit = function() {
    var div = this.mkdiv("submit");
    var b = document.createElement("input");
    b.type = "button";
    b.className = "submit";
    b.value = "Submit the Quiz";
    div.appendChild(b);
    this.appendChild(div);
    return div;
}


Element.prototype.addQuestions = function(quizinfo, qlist) {
//    quizinfo.display(this);
    this.createSubmit();
    var id = -1;
    for (var i = 0; i < qlist.length; i++, id--) {
	var ques = this.mkdiv("qc");
	ques.id = id;
	for (var j = 0; j < qlist[i].length; j++) {
	    var q = qlist[i][j];
	    var t = q.type;
	    var newq = this.dispatch[t](q);
	    ques.appendChild(newq);
	}
	ques.addEdit();
    }
    this.createSubmit();
}

Element.prototype.addButton = function(label) {
	var b = document.createElement("input");
	b.type = 'button';
	b.value = label;
	this.appendChild(b);
}
Element.prototype.addEdit = function() {
	var div = this.mkdiv("editpane");
	div.addButton("edit");
	div.addButton("delete");
	this.appendChild(div);
}
function build() {
    //    dump(multradio(19, ['test', 'yoho', 24]));

    var quiz = document.getElementById("quiz");

    var quizinfo  = {
	title: "Random Quiz Demo #1"
    }
    var qlist = [
	[
	    txt("What is 2 + 2?"),
	    fil(1)
	],
	[
	    lin("Which one is the dinosaur?"),
//	    mcr(2, [img("cat2.jpg"), img("fish2.png"), img("cat.jpg")])
	],
	[
	    lin("Which one is the dinosaur?"),
	    mcd(3, [img("cat2.jpg"), img("fish2.png"), img("cat.jpg")])
	],
	[
	    lin('Complete the code below so it prints "Hello"'),
	    cod(4, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n")
	],
	[
	    txt('listen to the following audio file and pick the name of the main character.'),
//	    aud("clip1.mp3"),
	    mcd(5, [txt('Yijin'), txt('Asher'), txt('Ying'), txt('Xuefan'), txt('Bob')])
	],
	[
	    txt("Fill in the blanks to make the code correct"),
//	    cloze(6, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}')
	],
	[
	    txt("What is the square root of 2 (four digits is fine)?"),
	    num(7)
	],
	[
	    lin("Show the first pass of Mergesort below"),
	    gri([9, 8, 7, 6, 5, 4, 3, 1]),
 	    mat(8, 1, 8)
	]
    ];
    quiz.addQuestions(quizinfo, qlist);
/*
    //    document.fillin("What is 2+2?");
    ///    document.number("What is 3 / 2?");
    
    //    document.mc(["which is a dinosaur?", audio("");
    var q = quiz.add("div", "question");
    q.addText("What is 2 + 3?");
    q.addFillin(123, "");


    q = quiz.multipart();
    q.addText("Which one is the fish?");
    q.addImage("fish2.png");
    q.addImage("dinosaur.jpg");
    q.addImage("cat.jpg");
    q.addImage("cat2.jpg");
*/
   
}
