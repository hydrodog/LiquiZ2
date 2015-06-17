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

function select(id, list) {
	
  var s = document.createElement("select");
  for (var i = 0; i < list.length; i++) {
    var opt = document.createElement("option");
    opt.value = list[i];
    opt.innerHTML = list[i];
    s.appendChild(opt);
  }
  s.id = id;
  return s;
}


function dump(obj) {
    var s = "";
    for (var k in obj) {
    s += k + "-->" + obj[k] + '\n';
    }
    console.log(s);
}

function mktext(val){
	var text = document.createTextNode(val);
	return text;
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
    //this.displayHeader(this.div);
    this.displayHeader();
    this.editMode = true;
    console.log(this);
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

var clicks = 0;
Quiz.prototype.end = function(id) {
	var parent = this;
    	if(this.editMode){
        var newB = mkbutton("New Question", "new-question");
        newB.onclick = function() { if(clicks == 0){ parent.editQuestion(); checkIfInView("editor");}
        clicks++; };
        }
//            var element = document.getElementById("quizType");
//            checkIfInView(element);
          
        
    
    qc = mkdivid(this.div, "qc" + id, "qc");
    qc.appendChild(newB);
  
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

//function imageAudioVideo() {
//	var 
//}

function imageAudioVideo(){
	var editor = document.createElement("div");
	var t = document.createElement("table");
	editor.appendChild(t);

	var r0 = t.insertRow(0);
	var image = mktext("Image");
	var image_src = mkinput("image_src", "file", "image_src");
	var load_image = mkbutton("Load Selected Image", "image_src");
	fillRow(r0, [image, image_src, load_image]);
	
	var r1 = t.insertRow(1);
	var audio = mktext("Audio");
	var audio_src = mkinput("audio_src", "file", "audio_src");
	var load_audio = mkbutton("Load Selected Audio", "audio_src");
	fillRow(r1, [audio, audio_src, load_audio]);
	
	var r2 = t.insertRow(2);
	var video = mktext("Video");
	var video_src = mkinput("video_src", "file", "video_src");
	var load_video = mkbutton("Load Selected Video", "video_src");
	fillRow(r2, [video, video_src, load_video]);
	
	return editor;
	
}

function imgClick(e) {
    console.log(e.clientX + "," + e.clientY);
    
};

Quiz.prototype.clickableImage = function (id, src, xs, ys) {
    var img = document.createElement("img");
    img.src = Quiz.mediaLocations.img + src;
    img.onclick = imgClick;
    this.q.appendChild(img);
};

// multiple fill-in-the-blank where [[]] is replaced by inputs
Quiz.prototype.cloze = function (id, txt) {
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

	var json = new XMLHttpRequest();
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

//////////////////////////////////////////////////////////////////////
// Editor //
//Ying //
function turnalloff(elem){ // TODO: turn off all the other selections when one of them is selected
	 var elems = elem.form.elements;
	  var currentState = elems.checked;

	  for(var i=0; i<elems.length; i++)
	  {
	    if(elems[i].type === "checkbox")
	    {
	       elems[i].checked = false;   
	    }
	  }

	  elem.checked = currentState;
}

function editMCDDform(id, labels, list){
	var form = document.createElement("form");
	form.id = id;

	for(var i = 0; i<list.length; i++){
		 var t = document.createTextNode(labels[i]);
		 var opt = document.createElement("input");
		 var checkbox = document.createElement("input");
		 var linebreak = document.createElement("br");
		 checkbox.type = "checkbox";
		
		//checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}

	return form;
}
function editMAform(id, labels, list){
	var form = document.createElement("form");
	form.id = id;
	
	for(var i = 0; i<list.length; i++){
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var checkbox = document.createElement("input");
		var linebreak = document.createElement("br");
		checkbox.type = "checkbox";
		
		//checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}
	
	return form;
}
function editSurveyform(id, labels, list){
	var form = document.createElement("form");
	form.id = id;
	
	for(var i = 0; i<list.length; i++){
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var linebreak = document.createElement("br");
		
		//checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(linebreak);
	}
	
	return form;
}

function editMCRform(id, labels, list){
	var form = document.createElement("form");
	form.id = id;

	for(var i = 0; i<list.length; i++){
		 var t = document.createTextNode(labels[i]);
		 var opt = document.createElement("input");
		 var radio = document.createElement("input");
		 var linebreak = document.createElement("br");
		 radio.type = "radio";
		
		//checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(radio);
		form.appendChild(linebreak);
	}

	return form;
}
var selStart, selEnd;	

function addBrackets(ta){
	
	  var v = ta.value;
	  ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart,selEnd) + "]] " + 
	  v.substring(selEnd);
}

var exampleClozeTest = 'public class A {\n [[]]  public [[]] void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
Quiz.prototype.editCloze = function () {
	  var div = document.createElement("div");
	  div.id = "Cloze";
	  div.className = "cloze"; // style of the editor box
	  var ta = document.createElement("textarea");
	  div.appendChild(ta);
	  ta.className = "cloze";
	  ta.id = "x";
	  ta.rows =10;
	  ta.cols = 80;
	  ta.value = exampleClozeTest;
	  ta.ondblclick = function() { addBrackets(ta); }
	  ta.onmouseup = function(){ selStart = ta.selectionStart;
	  selEnd = ta.selectionEnd;
	  console.log(ta.selectionStart + "," + ta.selectionEnd);}
//	  ta.onkeyup = function(){ ta.style.height = "1px";
//	  ta.style.height = (25+ta.scrollHeight)+"px";}
	  
	  var Button = mkbutton("SquareBracket It!", function(){});
	  div.appendChild(Button);
	  Button.onclick = function(){addBrackets(ta);};
	  
	  var Button1 = mkbutton("Submit", function(){});
	  div.appendChild(Button1);
	  Button1.onclick = function(){
		  $("#y").remove();
		  buildCloze('title',ta.value);
		  }; 
	  document.body.appendChild(div);
	  
	}

Quiz.prototype.editFillin = function() {
	var div = document.createElement("div");
	  div.id = "Fillin";
	  div.className = "Fillin"; // style of the editor box
	  
	  var Ans = mktext("Answer: ");
	  var ans = mkinput("ans", "text", "ans");
	  ans.value = "";
      div.appendChild(Ans);
      div.appendChild(ans);
      
    
      var Button1 = mkbutton("Submit", function(){});
	  div.appendChild(Button1);
	  
	  Button1.onclick = function(){
          $("#y").remove();
	      buildFillin('title', ta.value, ans.value );
	      }; 
	  document.body.appendChild(div);
}

Quiz.prototype.editNumber = function (){
	  var div = document.createElement("div");
	  div.id = "Number";
	  div.className = "Number"; // style of the editor box
	  
	  var min = mktext("Min: ");
      var Min = mkinput("min", "text", "min");
      var max = mktext("Max: ");
      var Max = mkinput("max", "text", "max");
      div.appendChild(min);
      div.appendChild(Min);
      div.appendChild(max);
      div.appendChild(Max);
      
      var Button1 = mkbutton("Submit", function(){});
	  div.appendChild(Button1);
	  
	  Button1.onclick = function(){
		  $("#y").remove(); 
		  buildnumber('title', ta.value);
		  }; //TODO: delete return
	  document.body.appendChild(div);
}

Quiz.prototype.editEssay = function(){
	  var div = document.createElement("div");
	  div.id = "Essay";
	  div.className = "Essay"; // style of the editor box
	  
	  var Button1 = mkbutton("Submit", function(){});
	  div.appendChild(Button1);
	  
	  Button1.onclick = function(){
		  $("#y").remove();
		  buildessay('title', ta.value);
		  }; 
	  document.body.appendChild(div);
}

Quiz.prototype.editCode = function() {
	var div = document.createElement("div");
	  div.id = "Code";
	  div.className = "Code"; // style of the editor box
	 
	  var Button1 = mkbutton("Submit", function(){});
	  div.appendChild(Button1);
	  
	  Button1.onclick = function(){
		  $("#y").remove();
		  buildcode('title', ta.value);
		  }; //TODO: delete return
	  document.body.appendChild(div);
}



//function addOption(parent){
//	var extraOpteditMCform= form(4, [optionChar], [""]);
//	div.appendChild(extraOption)
//}
//
//var optionCharUni = 68; // the Dec Unicode of 'D'
//var optionChar = String.fromCharCode(optionCharUni);

Quiz.prototype.editMultiChoiceDropdown = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceDropdown";
	div.className = "MultiChoiceDropdown"; // style of the editor box
	
	var editor = mkdivid(div,"MCeditor","MCeditor");
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Dropdown :"
			+"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
		
	var MCDDform = editMCDDform(4,["A: ", "B: ", "C: ", "D: "], ["","","",""]);
	div.appendChild(MCDDform);
	
	var Button1 = mkbutton("Submit", function(){});
	div.appendChild(Button1);
	
	Button1.onclick = function(){
		$("#y").remove();
		builddpd(ta.value);
	    }; 
	
	document.body.appendChild(div);
}

Quiz.prototype.editSurvey = function() {
	var div = document.createElement("div");
	div.id = "Survey";
	div.className = "Survey"; // style of the editor box
	
	var editor = mkdivid(div,"surveyEditor","surveyEditor");
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
	
	var surveyform= editSurveyform(4,["Choice 1: ", "Choice 2: ", "Choice 3: ", "Choice 4: "], ["","","",""]);
	div.appendChild(surveyform);
	
	var Button1 = mkbutton("Submit", function(){});
	div.appendChild(Button1);
	
	Button1.onclick = function(){
		$("#y").remove();
		builddpd(ta.value);
	}; 
	
	document.body.appendChild(div);
}

Quiz.prototype.editMultiChoiceRadio = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceRadio";
	div.className = "MultiChoiceRadio"; // style of the editor box
	
	var editor = mkdivid(div,"MCReditor","MCReditor");
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Radio:"
			+"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
	
	var MCRform= editMCRform(4,["Choice 1: ", "Choice 2: ", "Choice 3: ", "Choice 4: "], ["","","",""]);
	div.appendChild(MCRform);
	
	var Button1 = mkbutton("Submit", function(){});
	div.appendChild(Button1);
	
	Button1.onclick = function(){
		$("#y").remove();
		builddpd(ta.value);
	}; 
	
	document.body.appendChild(div);
}

Quiz.prototype.editMultiAnswer = function() {
	var div = document.createElement("div");
	div.id = "MultiAnswer";
	div.className = "MultiAnswer"; // style of the editor box
	
	var editor = mkdivid(div,"MAeditor","MAeditor");
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple Answer Choices: "
			+"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
		
	var MAform = editMAform(4,["Option 1: ", "Option 2: ", "Option 3: ", "Option 4: "], ["","","",""]);
	div.appendChild(MAform);
	
	var Button1 = mkbutton("Submit", function(){});
	div.appendChild(Button1);
	
	Button1.onclick = function(){
		$("#y").remove();
		builddpd(ta.value);
	}; 
	
	document.body.appendChild(div);
}


var newid = -1;
function buildCloze(title, text){
	
	page.addQuestion(newid--, title, "cloze");
	page.instructions("Fill in the blanks to make the code correct");
	page.cloze(newid--, text);
}

function buildFillin(title, text, answer){
	
	page.addQuestion(newid--, title, "fillin");
	page.span(text);
	page.fillin(newid--);
//TODO: store answer 

//	 var quizinfo  = new QuizInfo("New Fill-In Question", 10, 0, 1, "assets/");
//	 var qlist = [[
//    qhead('Java'),
//    lin('Complete the code below'),
//    cod(3, txt3, 10, 80)
//]]
//	  var q_cloze = new Quiz(quizinfo, qlist);  
}
function buildnumber(title, text){
	var quizinfo  = new QuizInfo("New Number Question", 10, 0, 1, "assets/");
	var qlist = [[
   qhead('Java'),
   lin('Complete number text below'),
   cod(3, txt4, 10, 80)],
  [lin('Type your Answer'),
  cod(3, "", 2, 80)]]
	var q_cloze = new Quiz(quizinfo, qlist);  
}
function buildessay(txt5){
	var quizinfo  = new QuizInfo("New Essay Question", 10, 0, 1, "assets/");
	var qlist = [
  [ qhead('Java'),
   lin('Question Text'),
   cod(3, txt5, 10, 80)],
   [lin('Type your Essay'),
   cod(3, "", 12, 100)],
]
	  var q_cloze = new Quiz(quizinfo, qlist);  
}
function buildcode(){
	var quizinfo  = new QuizInfo("New Code Question", 10, 0, 1, "assets/");
	var qlist = [
  [qhead('Java'),
   lin('Question Text'),
   cod(3, txt6, 10, 80),
   match(1, [txt("Programming Language: ")],
            [txt("C++"),
             txt("Java"),
             txt("Python"),
            ]) ],
  [lin('Type your code'),
   cod(3, "", 12, 100),
   button("Run")]
 
   
 ]
	  var q_cloze = new Quiz(quizinfo, qlist);  
}

function builddpd(){
	var quizinfo  = new QuizInfo("New DropDownList Question", 10, 0, 1, "assets/");
	var qlist = [
  [qhead('Java'),
   lin('Question Text'),
   cod(3, txt6, 10, 80),],
   
  [lin('Type your code'),
   cod(3, "", 12, 100),
   ]

   
 ]
	  var q_cloze = new Quiz(quizinfo, qlist);  
}

var list = [
            "Choose QuestionType",
            "Fillin",
            "Number",
            "Essay",
            "Code",
            "MultiChoiceDropdown",
            "Survey",
            "MultiChoiceRadio",
            "MultiAnswer",
            "Regex",
            "Matrix",
            "Cloze"];

//Quiz.prototype.editMode = function(){
//	var c = mkdivid(this.div, "new-question-button", "qc new-question-button");
//    var newB = mkbutton("New Question");
//    newB.onclick = function() { this.editQuestion; }
//    c.appendChild(newB);
//    this.add(c);
//}


function fillRow(row, list) {
	for(var i = 0; i <list.length; i++){
		var c = row.insertCell(i);
		c.appendChild(list[i]);
	}
}

function checkIfInView(id){
	
	var element = $("#" + id);
    var offset = element.offset().top;

    if(offset > window.innerHeight){
        // Not in view so scroll to it
        $('html,body').animate({scrollTop: offset}, 1000);
        return false;
    }
   return true;
}

function editTextBox(val){
	  var div = document.createElement("div");
	  div.id = "textBoxDiv";
	  div.className = "textBoxDiv"; // style of the editor box
	  var ta = document.createElement("textarea");
	  div.appendChild(ta);
	  ta.className = "textArea";
	  ta.id = "textArea";
	  ta.rows =5;
	  ta.cols = 50;
	  ta.value = val;
	  return div;
      
}

Quiz.prototype.editQuestion = function() {
	var parent = this;
	var editor = mkdivid(this.div,"editor","editor");
	var t0 = document.createElement("table");
	editor.appendChild(t0);
	var r0 = t0.insertRow(0);

	var title = document.createTextNode("Title: ");
	var inp = document.createElement("input");
	var questionType = document.createTextNode("Question Type: ");
    var selectBox = select("quizType",list);
	var addQuestion = mkbutton("Add Question", function(){});
	var cancel = mkbutton("Cancel", function(){});
	fillRow(r0, [title, inp, questionType, selectBox, addQuestion, cancel]);
	
	var r1 = t0.insertRow(1);
	var level = document.createTextNode("Level: ");
	var inpl = document.createElement("input");
	var points = document.createTextNode("Points: ");
	var inpp = document.createElement("input");
	fillRow(r1, [level, inpl, points, inpp]);
	
	
	var t1 = document.createElement("table");
	editor.appendChild(t1);
	var r2 = t1.insertRow(0);
	fillRow(r2, [editTextBox(""), imageAudioVideo()]);

	
	
	$('#quizType').change(function() {
		for(var i = 0; i < list.length; i++){
			$("#" + list[i]).hide();
		}
	    var val = $("#quizType option:selected").text();
	    if(val === "Choose QuestionType"){
	    	return;
	    }
	    parent["edit" + val]();
	    checkIfInView(val);
	   
	});
	
}