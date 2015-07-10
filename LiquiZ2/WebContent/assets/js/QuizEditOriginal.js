/*
 * Author: Ying Zhao
 */

function QuizEdit() {
    this.body = document.getElementById("container");
    this.body.className = "quizEditor";
}

function mktext(val){
	var text = document.createTextNode(val);
	return text;
}

function mkptext(parent, val){
	var text = document.createTextNode(val);
	parent.appendChild(text);
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

function mkpinput(parent, id, type, className) {
	var inp = document.createElement("input");
	inp.id = id;
	inp.type = type;
	inp.className = className;
	parent.appendChild(inp);
	return inp;
}

function mkbutton(val, id, clickFunc) {
    var b = mkinput(id, 'button', 'submit');
    b.onclick = clickFunc;
    b.value = val;
    return b;
}

function mkpbutton(parent, val, id, clickFunc) {
  parent.appendChild(mkbutton(val, id, clickFunc));
}

function make(tag, inner, className) {
    var t = document.createElement(tag);
    if (className)
        t.className = className;
    // if (inner)
    t.innerHTML = inner;
    return t;
}

function mktag(parent, tag, id, value, className) {
    var t = document.createElement(tag);
    t.id = id;
    t.value = value;
    t.className = className;
    parent.appendChild(t);
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
	



QuizEdit.prototype.displayHeader = function() {
    this.div.appendChild(make("h1", this.title));
    this.div.appendChild(make("span", " Points: " + this.points, "points"));
    this.timer = mkdiv(this.div, "timer");
    this.div.appendChild(this.timer);
    //TODO: add time and countdown
    //TODO: add remaining tries
}


QuizEdit.prototype.end = function(id) {
    var parent = this;
    var clicks = 0;
    qc = mkdivid(this.div, "qc" + id, "qc");
    if (this.editMode){
        mkpbutton(qc, "New Question", "new-question",
		  function() {
		      if (clicks == 0){
		      $("#id").remove();
			  parent.editQuestion();
			  checkIfInView("editor");
		      }
		      clicks++;
		  } );
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
    	mkpbutton(editBox, "Edit", id+"-edit", function() {
            innerHTML = "";
            console.log(edit.id);
        });
        mkpbutton(editBox, "Delete", id+"-delete",  function() {
            innerHTML = "";
            console.log(del.id);
        });
        mkpbutton(editBox, "Copy", id+"-copy", function() {
            innerHTML = "";
            console.log(copy.id);
        });
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
    mkpbutton(div, "Submit The Quiz", "submit-"+id, null);
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

function imageAudioVideo(){
	var editor = document.createElement("div");
	var t = document.createElement("table");
	editor.appendChild(t);

	var r0 = t.insertRow(0);
	var image = mktext("Image");
	var image_src = mkinput("image_src", "file", "image_src");
	var load_image = mkbutton("Load Selected Image", "image_src", null);
	fillRow(r0, [image, image_src, load_image]);
	
	var r1 = t.insertRow(1);
	var audio = mktext("Audio");
	var audio_src = mkinput("audio_src", "file", "audio_src");
	var load_audio = mkbutton("Load Selected Audio", "audio_src", null);
	fillRow(r1, [audio, audio_src, load_audio]);
	
	var r2 = t.insertRow(2);
	var video = mktext("Video");
	var video_src = mkinput("video_src", "file", "video_src");
	var load_video = mkbutton("Load Selected Video", "video_src", null);
	fillRow(r2, [video, video_src, load_video]);
	
	return editor;
	
}


function fillRowText(row, list) {
    for (var i = 0; i < list.length; i++) {
	var c = row.insertCell(i);
	c.innerHTML = list[i];
    }
}

function Calendar(startDate, days) {
    this.startDate = startDate;
    var s = '';
    for (var i = 0; i < days; i++)
	s += '0';
    this.holidays = s;
}

Calendar.prototype.shift = function(days) {
    this.startDate.setDate(this.startDate.getDate() + days);
}

Calendar.prototype.week = function(parent) {
    
}

Calendar.prototype.month = function(parent, d) {
    d = (typeof d !== "undefined") ? d : this.startDate;
    var t = document.createElement("table");
    t.className = "cal";
    var h = t.insertRow(0);
    d.setDate(1);
    // fillRow(h, [
    // button("<<"), button("<"), document.createTextNode(d.getMonth()), button(">"), button(">>")
    // ]);
    h = t.insertRow(1);
    fillRowText(h, ["S", "M", "T", "W", "T", "F", "S"]);
    var dayOfWeek = d.getDay();
    d.setDate(d.getDate() - dayOfWeek); // get back to Sunday
    for (var i = 2; i <= 5; i++) {
        var r = t.insertRow(i);
        var d2 = d;
        for (var j = 0; j < 7; j++) {
            var c = r.insertCell(j);
            c.innerHTML = d.getDate();
            d.setDate(d.getDate() + 1);
        }
    }
    parent.appendChild(t);
}

Calendar.prototype.year = function(parent) {
    var div = document.createElement("div");
    var d = this.startDate;
    for (var month = 0; month < 12; month++)
        this.month(div, d);
        
    parent.appendChild(div);
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

/*
 * Editor : Ying Zhao
 */
function oneMCDDOption(parent, id){
	 var t = document.createTextNode("Possible Answer: ");
	 var opt = mkinput(id + 't', "text", null);
	 var checkbox = mkinput(id + 'c', "checkbox", null);
	 var linebreak = document.createElement("br");
	 checkbox.onclick = function(){addClassCheck(this, checkbox.id)};
	 parent.appendChild(t);
	 parent.appendChild(opt);
	 parent.appendChild(checkbox);
	 parent.appendChild(linebreak);
}

function addClassCheck(element, id){

	if(element.checked){
        element.classList.add("marked");
    }
    else{
        element.classList.remove("marked");
    }

    if(document.getElementsByClassName("marked").length>1){
    	
	  	if(document.getElementsByClassName("marked")[0].id != id){
	  		document.getElementsByClassName("marked")[0].checked = false;
	  	    document.getElementsByClassName("marked")[0].classList.remove("marked");
	  	}
	  	
	  	else if(document.getElementsByClassName("marked")[1].id != id){
	  		document.getElementsByClassName("marked")[1].checked = false;
	  		document.getElementsByClassName("marked")[1].classList.remove("marked");
	  	}
    }

}


function editMCDDform(parent, id, numberBox, addOptionButton){
	var id_o = 1;
	var optionClicks = 0;
	var form = mktag(parent, "form", "optionForm", null, null);
		oneMCDDOption(form, "o" + id_o++);
		oneMCDDOption(form, "o" + id_o++);
		oneMCDDOption(form, "o" + id_o++);
		oneMCDDOption(form, "o" + id_o++);
    optionClicks += 4;		
		
	addOptionButton.onclick = function(){
		
		if(1 <= numberBox.value && numberBox.value <= 10){
			optionClicks += numberBox.value;
			for(var i = 0; i < numberBox.value; i++){
				oneMCDDOption(form, "o" + id_o++);
				}
	    	}
		else {
			optionClicks++;
			oneMCDDOption(form, "o" + id_o++);
			}
		checkIfInView("optionForm");
		};
		
	return form;
}

function editMAform(parent, id, labels, list){
	var form = document.createElement("form");
	form.id = id;
	
	for(var i = 0; i<list.length; i++){
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var checkbox = document.createElement("input");
		var linebreak = document.createElement("br");
		checkbox.type = "checkbox";
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}
	parent.appendChild(form);
	return form;
}

var Likert5 = ["Strongly Agree",
               "Agree",
               "Neutral",
               "Disagree",
               "Strongly Disagree"];

var Likert7 = ["Exceptional",
               "Excellent",
               "Very Good",
               "Good",
               "Fair",
               "Poor",
               "Very Poor"];

function mklist(id, list){
	var table = document.createElement("table");
	table.id = id;
	
	for(var i = 0; i<list.length; i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		td1.innerHTML = "Choice " + i +":";
		var inp = mkinput(function(){}, "text", function(){});
		var addChoiceButton = mkbutton("Add new choice below", function(){});
//		addChoiceButton.onclick = function(){
//			var td5 = document.createElement("td");
//			td5.appendChild(inp);
//			if(this.parentNode.parentNode.nextSibling != null)
//				this.parentNode.parentNode.parentNode.insertBefore(td5,this.parentNode.parentNode.nextSibling);
//			else
//				this.parentNode.parentNode.parentNode.appendChild(td5);
//			while(this.parentNode.parentNode.nextSibling != null){
//				this.parentNode.parentNode.firstChild.innerHTML = "Choice " +;
//					
//			}
//			//document.getElementById("Likert5").insertBefore(td5,this.parentNode.parentNode);
//			console.log(this.parentNode);
//			console.log(this.parentNode.parentNode);
//		}
//		
		
		var deleteButton = mkbutton("Delete this choice", function(){});
		
		
		
		inp.value = list[i];
		td2.appendChild(inp);
		td3.appendChild(addChoiceButton);
		td4.appendChild(deleteButton);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		table.appendChild(tr);
	
	}
	
	return table;
}

function editSurveyform(parent, id, list){
	var form = document.createElement("form");
	form.id = id;
    
	var table1 = document.createElement("table");
	
	var datalist = document.createElement("DATALIST");
	datalist.setAttribute("id", "Likert");
	var option1 = mktag(datalist, "option", "Likert5", "Likert5", "Likert5");
	var option2 = mktag(datalist, "option", "Likert7", "Likert7", "Likert7");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td1.innerHTML = "Name:"+ "&nbsp&nbsp&nbsp&nbsp&nbsp";
	var inp = mkinput(datalist.id, "text", datalist.id);
	inp.setAttribute("list", "Likert");
	inp.oninput= function(){
	switch(inp.value){
	case "Likert5":
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table3);}
	break;
    
	case "Likert7":
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table4);}
	break;
	
	default:
	{$("#" + form.id).empty();form.appendChild(table1);form.appendChild(table2);}
	}};
	inp.onkeydown = function(e){var keynumber = window.event ? e.keyCode: e.which; if(keynumber == 8){e.preventDefault();this.value = this.value.slice(0,-1);}};
	
	table1.appendChild(datalist);
	td2.appendChild(inp);
	tr.appendChild(td1);
	tr.appendChild(td2);
	table1.appendChild(tr);
	
	var table2 = mklist("blank", list);
	var table3 = mklist("Likert5", Likert5);
	var table4 = mklist("Likert7", Likert7);
	
	form.appendChild(table1);
	form.appendChild(table2);
	
	parent.appendChild(form);
	return form;
}

function editMCRform(parent, id, labels, list){
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
	parent.appendChild(form);
	return form;
}
var selStart, selEnd;	

function addBrackets(ta){
	
	  var v = ta.value;
	  ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart,selEnd) + "]] " + 
	  v.substring(selEnd);
}

var exampleClozeTest = 'public class A {\n [[]]  public [[]] void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';

Quiz.prototype.editFillin = function(qc, title, text) {
	
	  var fillinForm = mktag(qc, "form", "Fillin", null, "fillinForm");
	  var Ans = mkptext(fillinForm, "Answer: ");
	  var ans = mkpinput(fillinForm, "ans", "text", "ans");
      var Button1 = mkpbutton(fillinForm, "Add Question", function(){}, function(){
          $("#" + editor.id).remove();
          $("#" + qc.id).remove();
          $("#" + fillinForm.id).remove();
	      buildFillin(titleInp.value, textBox.value, ans.value);
	      });

}

Quiz.prototype.editNumber = function (qc, title, text){

	var numberForm = mktag(qc, "form", "Number", null, "numberForm");
	var min = mkptext(numberForm, "Min: ");
    var Min = mkpinput(numberForm, "min", "text", "min");
    var max = mkptext(numberForm, "Max: ");
    var Max = mkpinput(numberForm, "max", "text", "max");
    var Button1 = mkpbutton(numberForm, "Add Question", function(){}, function(){
    	$("#" + editor.id).remove();
        $("#" + qc.id).remove();
        $("#" + numberForm.id).remove();
    	buildnumber(titleInp.value, textBox.value, Min.value, Max.value);
		  });
}

Quiz.prototype.editEssay = function(qc){
	  
	  var essayForm = mktag(qc, "form", "Essay", null, "essayForm");
	  var Button1 = mkpbutton(essayForm, "Add Question", function(){}, function(){
		  $("#" + editor.id).remove();
	      $("#" + qc.id).remove();
	      $("#" + essayForm.id).remove();
		  buildessay(titleInp.value, textBox.value);
		  });
}

Quiz.prototype.editCode = function(qc) {
	  
	  var codeForm = mktag(qc, "form", "Code", null, "codeForm");
	  var langSelect = select("langSelect", ["C++", "Java", "Python", "Perl", "Processing"]);
	  codeForm.appendChild(langSelect);
	  var Button1 = mkpbutton(codeForm, "Add Question", function(){}, function(){
		  $("#" + editor.id).remove();
	      $("#" + qc.id).remove();
	      $("#" + codeForm.id).remove();
		  buildcode(titleInp.value, textBox.value);
		  });
}

Quiz.prototype.editMultiChoiceDropdown = function(qc) {
	
	var mCDDForm = mktag(qc, "form", "MultiChoiceDropdown", null, "mCDDForm");
	var t = mktag(mCDDForm, "table", null, null, null);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Dropdown :"
	                +"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	var MCDDform = editMCDDform(mCDDForm, "MCDDform", numberBox, addOptionButton);
	var Button1 = mkpbutton(mCDDForm, "Add Question", function(){}, function(){
		$("#" + editor.id).remove();
	    $("#" + qc.id).remove();
	    $("#" + mCDDForm.id).remove();
		builddpd(titleInp.value, textBox.value);
	    });
}

Quiz.prototype.editSurvey = function(qc) {
	
	var surveyForm = mktag(qc, "form", "Survey", null, "surveyForm");
	
	var t = mktag(surveyForm, "table", null, null, null);
	var r = t.insertRow(0);
	var description = document.createTextNode("Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	var createStdChoice = mkbutton("Create Standard Choice", function(){});
	fillRow(r, [description, numberBox, addOptionButton, createStdChoice]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
	
	var surveyform= editSurveyform(qc, 4, ["","","",""]);
	
	var Button1 = mkpbutton(qc, "Add Question", function(){}, function(){
		$("#y").remove();
		builddpd(ta.value);
	    });
}

Quiz.prototype.editMultiChoiceRadio = function(qc) {
	
	var mCRForm = mktag(qc, "form", "MultiChoiceRadio", null, "mCRForm");
	
	var t = mktag(mCRForm, "table", null, null, null);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Radio:"
			+"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
	
	var MCRform= editMCRform(qc, 4,["Choice 1: ", "Choice 2: ", "Choice 3: ", "Choice 4: "], ["","","",""]);
	
	var Button1 = mkpbutton(qc, "Add Question", function(){}, function(){
		$("#y").remove();
		builddpd(ta.value);
	    });
}

Quiz.prototype.editMultiAnswer = function(qc) {
	
	var mAForm = mktag(qc, "form", "MultiAnswer", null, "mAForm");
	
	var t = mktag(mAForm, "table", null, null, null);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple Answer Choices: "
			+"Correct Answer" + "Add more options");
	var numberBox = mkinput("numberinput", "text", "numberinput"); 
	var addOptionButton = mkbutton("Add Option", function(){});
	fillRow(r, [description, numberBox, addOptionButton]);
	
	//addOptionButton.onclick = div.appendChild(extraOption);
		
	var MAform = editMAform(qc, 4,["Option 1: ", "Option 2: ", "Option 3: ", "Option 4: "], ["","","",""]);
	
	var Button1 = mkpbutton(qc, "Add Question", function(){}, function(){
		$("#y").remove();
		builddpd(ta.value);
	    });
}

Quiz.prototype.editCloze = function (qc) { 
	  var clozeForm = mktag(qc, "form", "Cloze", null, "clozeForm");
	  var ta = mktag(clozeForm, "textarea", "x", exampleClozeTest, "cloze");
	  ta.rows = 10;
	  ta.cols = 80;
	  ta.ondblclick = function() { addBrackets(ta); }
	  ta.onmouseup = function(){ selStart = ta.selectionStart;
	  selEnd = ta.selectionEnd;
	  console.log(ta.selectionStart + "," + ta.selectionEnd);}
	  var Button = mkpbutton(clozeForm,"SquareBracket It!", function(){}, function(){addBrackets(ta);});
	  
	  var Button1 = mkpbutton(clozeForm, "Add Question", function(){}, function(){
		  $("#y").remove();
		  buildCloze('title',ta.value);
		  });
	}

function removeOldButtons(){
	$("#qc18").remove();
	var button1 = document.getElementById("submit-2");
	button1.parentNode.parentNode.removeChild(button1.parentNode);
}

function addQuestionHead(title, text, id){
	page.addQuestion(newid--, title, id);
	page.span(text);
	
}

function addQuestionBody(id){
	if(id === "fillin" || id === "number"){
		page.fillin(newid--);
	}
	else if(id === "essay" || id === "code"){
		page.essay(14, 10, 80, 200);
	}
	else if(id === "multidpd"){
		page.match(6,
				["class", "object", "method", "message", "polymorphism", "encapsulation"],
					["A concrete instance of a class",
					 "A request made to an object",
					 "Hiding the internal details of a class or object",
					 "Sending the same message to different objects and getting different results",
					 "A specification of an object",
				     "A function that is applied to an object"]);

	}
	
}

function addQuestionEnd(id){
	page.end(id);
}

var newid = -1;
function buildCloze(title, text){
	
	page.addQuestion(newid--, title, "cloze");
	page.instructions("Fill in the blanks to make the code correct");
	page.cloze(newid--, text);
}

function buildFillin(title, text, answer){
	removeOldButtons();
	addQuestionHead(title, text, "fillin");
	addQuestionBody("fillin");
	addQuestionEnd(18);
	
//TODO: store answer 
}
function buildnumber(title, text, min, max){
	removeOldButtons();
	addQuestionHead(title, text, "number");
	addQuestionBody("number");
	addQuestionEnd(18);
}
function buildessay(title, text){
	removeOldButtons();
	addQuestionHead(title, text, "essay");
	addQuestionBody("essay");
	addQuestionEnd(18);
}
function buildcode(title, text){
	removeOldButtons();
	addQuestionHead(title, text, "code");
	addQuestionBody("code");
	addQuestionEnd(18);
}

function builddpd(){
	removeOldButtons();
	addQuestionHead(title, text, "multidpd");
	addQuestionBody("multidpd");
	addQuestionEnd(18);
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

//function editTextBox(val){
////	  var div = document.createElement("div");
////	  div.id = "textBoxDiv";
////	  div.className = "textBoxDiv"; // style of the editor box
//	  var ta = mktag(null, "textarea", "blankbox", val, "textArea");
////		  document.createElement("textarea");
////	  div.appendChild(ta);
////	  ta.className = "textArea";
////	  ta.id = "textArea";
//	  ta.rows =5;
//	  ta.cols = 40;
//	  //ta.value = val;
//	  return ta;
//    
//}

QuizEdit.prototype.editQuestion = function() {
	var parent = this;
	var editor = mkdivid(parent.body,"editor","editor");
	//this.body.appendChild(editor);
	var t0 = document.createElement("table");
	editor.appendChild(t0);
	var r0 = t0.insertRow(0);

	var titleText = document.createTextNode("Title: ");
	    titleInp = document.createElement("input");
	var questionType = document.createTextNode("Question Type: ");
    var selectBox = select("quizType",list);
	var addQuestion = mkbutton( "Add Question", function(){});
	var cancel = mkbutton("Cancel", function(){});
	fillRow(r0, [titleText, titleInp, questionType, selectBox, addQuestion, cancel]);
	
	var r1 = t0.insertRow(1);
	var level = document.createTextNode("Level: ");
	var inpl = document.createElement("input");
	inpl.placeholder = "1";
	var points = document.createTextNode("Points: ");
	var inpp = document.createElement("input");
	inpp.placeholder = "1";
	fillRow(r1, [level, inpl, points, inpp]);
	
	
	var t1 = document.createElement("table");
	editor.appendChild(t1);
	var r2 = t1.insertRow(0);
    textBox = mktag(r2, "textarea", "blankbox", null, "textArea");
	textBox.rows =5;
	textBox.cols = 40;
	fillRow(r2, [textBox, imageAudioVideo()]);

	var questionContainer = document.createElement("div");
	questionContainer.id = "qC";
	
	document.body.appendChild(questionContainer);
	
	$('#quizType').change(function() {
//		for(var i = 0; i < list.length; i++){
//			$("#" + list[i]).remove();
//		}
		$("#" + questionContainer.id).empty();
		
	    var val = $("#quizType option:selected").text();
	    
	    if(val === "Choose QuestionType"){
	    	return;
	    }
	    
	    parent["edit" + val](questionContainer);
	    checkIfInView(val);
	   
	});
	
}
