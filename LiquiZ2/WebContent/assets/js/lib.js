Util = {
    dump: function(obj) {
        var s = "";
        for (var k in obj) {
            s += k + "-->" + obj[k] + '\n';
        }
        console.log(s);
    },

    goToId: function(id) {
    //     if (typeof id === "undefined") {
    //         id = window.location.hash.substr(1);
    //     }
    //     window.location.hash = "";
    //     window.location.hash = id;
    },

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
                if (i === "innerHTML" && obj[i].nodeName) {
                    element.appendChild(obj[i]);
                } else {
                    element[i] = obj[i];
                }
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

    div: function(className, id) {
        return Util.make("div", {
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

    a: function(href, innerHTML, className, id) {
        return Util.make("a", {
            href: href,
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h1: function(innerHTML, className, id) {
        return Util.make("h1", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h2: function(innerHTML, className, id) {
        return Util.make("h2", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h3: function(innerHTML, className, id) {
        return Util.make("h3", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h4: function(innerHTML, className, id) {
        return Util.make("h4", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h5: function(innerHTML, className, id) {
        return Util.make("h5", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    h6: function(innerHTML, className, id) {
        return Util.make("h6", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    strong: function(innerHTML, className, id) {
        return Util.make("strong", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });        
    },

    em: function(innerHTML, className, id) {
        return Util.make("em", {
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

    ul: function(innerHTML, className, id) {
        return Util.make("ul", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    ol: function(innerHTML, className, id) {
        return Util.make("ol", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    li: function(innerHTML, className, id) {
        return Util.make("li", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    /*
     * This function takes the src as its first argument instead of innerHTML
     * src is relative to the dir you defined in mediaLocations
     */
    img: function(src, className, id) {
        return Util.make("img", {
            src: mediaLocations.img + src,
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
     * Takes a src, class, id and a bool for controls.
     * controls defaults to true.
     * src is relative to the dir you defined in mediaLocations
     */
    video: function(src, controls, className, id) {
        controls = (typeof controls !== "undefined") ? controls : true;
        return Util.make("video", {
            src: mediaLocations.video + src,
            controls: controls,
            className: className,
            id: id,
            preload: false,
        });
    },

    /*
     * Takes a src, class, id and a bool for controls.
     * controls defaults to true.
     * src is relative to the dir you defined in mediaLocations
     */
    audio: function(src, controls, className, id) {
        controls = (typeof controls !== "undefined") ? controls : true;
        return Util.make("audio", {
            src: mediaLocations.audio + src,
            controls: controls,
            className: className,
            id: id,
        });
    },

    canvas: function(height, width) {
        return Util.make("canvas", {
            height: height,
            width: width,
        });
    },

    form: function(innerHTML, className, id) {
        return Util.make("form", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    input: function(type, className, id) {
        return Util.make("input", {
            type: type,
            className: className,
            id: id,
        });
    },

    button: function(value, className, id, onClick) {
        return Util.make("input", {
            type: "button",
            value: value,
            className: className,
            id: id,
            onclick: onClick,
        });
    },

    file: function(accept, className, id) {
        return Util.make("input", {
            type: "file",
            accept: accept,
            className: className,
            id: id,
        });
    },

    select: function(name, multiple, innerHTML, className, id) {
        if (innerHTML.constructor === Array) {
            var options = document.createDocumentFragment();
            for (var i = 0; i < innerHTML.length; i++) {
                options.appendChild(Util.option(innerHTML[i], innerHTML[i]));
            }
            innerHTML = options;
        }
        return Util.make("select", {
            name: name,
            innerHTML: innerHTML,
            className: className,
            id: id,
            multiple: multiple,
        });
    },

    option: function(value, innerHTML, className, id) {
        return Util.make("option", {
                    value: value,
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    optgroup: function(label, innerHTML, className, id) {
        return Util.make("optgroup", {
            label: label,
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    radio: function(value, name, className, id) {
        return Util.make("input", {
            type: "radio",
            value: value,
            name: name,
            className: className,
            id: id,
        });
    },

    checkbox: function(value, name, className, id, checked) {
        return Util.make("input", {
            type: "checkbox",
            value: value,
            name: name,
            className: className,
            id: id,
            checked: checked,
        });
    },

    label: function(htmlFor, innerHTML, className, id) {
        return Util.make("label", {
            htmlFor: htmlFor,
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    code: function(innerHTML, className, id) {
        return Util.make("code", {
            innerHTML: innerHTML,
            className: className,
            id: id,
        });
    },

    /*
     * Generic <tr> generator. For the use of Util.table(). You probably shouldn't
     * use this.
     */
    tr: function(list, th) {
        var tr = Util.make("tr");
        for (var i = 0; i < list.length; i++) {
            var tElement;
            if (th) {
                tElement = Util.make("th", {
                    scope: "col",
                    innerHTML: list[i],
                });
            } else {
                tElement = Util.make("td", {
                    innerHTML: list[i],
                });
            }
            tr.appendChild(tElement);
        }
        return tr;
    },

    /*
     * Takes in a class for the table, a list of elements to be inserted into 
     * the table, an optional boolean if there's a header in the table, and an
     * optional function that will accept a list and a bool if the list passed
     * in is the header and return a tr element
     * 
     * trFunction should be used to modify escape characters that you pass in through
     * the list. It lets you insert any arbitrary formatting to any tr element based
     * on whatever escape mechanism you choose.
     */
    table: function(list, header, className, trFunction) {
        header = (typeof header !== "undefined") ? header : false;
        trFunction = (typeof trFunction !== "undefined") ? trFunction : Util.tr;
        var result = Util.make("table", {
            className: className,
        });

        if (header) {
            var headList = list.shift();
            var thead = result.createTHead();
            thead.appendChild(trFunction(headList, true));
        }

        var tbody = Util.make("tbody");
        result.appendChild(tbody);
        for (var i = 0; i < list.length; i++) {
            var tr = trFunction(list[i], false);
            tbody.appendChild(tr);
        }

        return result;
    },

};

mediaLocations = {
	img : "assets/img/",
	audio : "assets/aud/",
	video : "assets/vid/",
	png : this.img,
	jpg : this.img,
	mp3 : this.audio,
	wav : this.audio,
	mp4 : this.video,
},

/*
 * Add a css file to the header section. This is useful for dynamically loading
 * the css file depending on the user's preferences.
 */
function appendCSSLink(src) {
	var head = document.getElementsByTagName('head')[0];
	var link = Util.make("link", {
		rel : "stylesheet",
		type : "text/css",
		href : src,
	});
	head.appendChild(link);
}

/*
 * Add a css stylesheet to the current page
 */
function appendCSSText(css) {
	var head = document.getElementsByTagName('head')[0];
	var s = Util.make("style", {
		type : "text/css"
	});
	if (s.styleSheet) { // IE
		s.styleSheet.cssText = css;
	} else { // the world
		s.appendChild(document.createTextNode(css));
	}
	head.appendChild(s);
}

var clozeTarget = /[[]]/;

/*
 * // Information about quiz required for display on client side. // Much more
 * data on server side in Policy.java function QuizInfo(title, points,
 * timelimit, remainingTries, datadir) { this.title = title; this.points =
 * points; this.timelimit = timelimit; this.remaining = remainingTries;
 * this.datadir = datadir; this.editMode = 1; }
 */

function Quiz(quizinfo, questions) {
	for ( var k in quizinfo) {
		this[k] = quizinfo[k];
	}
    this.body = document.getElementById("container");
    this.body.className = "quiz";
    this.questions = questions;
    this.render(this.displayHeader());
    console.log(this);
    this.render(this.createSubmit(1));

    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var qc = this.addQuestion(q[0], q[1], q[2]);
        for (var j = 3; j < q.length; j++) {
            if (q[j][0].substring(0, 5) === "Util.") {
                qc.appendChild(Util[q[j][0].substring(5)].apply(this||window, q[j].splice(1)));
            } else {
                qc.appendChild(this[q[j][0]].apply(this||window, q[j].splice(1)));
            }
        }
        this.render(qc);
    }
    this.end();
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

var clicks = 0;
Quiz.prototype.end = function() {
    var parent = this;
    var qc = Util.div("qc", "end-quiz");
    if (this.editMode) {
        qc.appendChild(Util.button("New Question", "new-question", null,
            function() {
                if (clicks === 0) {
                    parent.editQuestion();
                    // Util.goToId("editor");
                }
                clicks++;
            }));
    }
    this.render(qc);
    this.render(this.createSubmit(2));
};

function makeEditBox(id, editFunc, deleteFunc, copyFunc) {
    var editBox = Util.div("edit");
    editBox.appendChild(Util.button("Edit", null, id+"-edit", editFunc));
    editBox.appendChild(Util.button("Delete", null, id+"-delete", deleteFunc)); 
    editBox.appendChild(Util.button("Copy", null, id+"-copy", copyFunc));
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

Quiz.prototype.createSubmit = function(id) {
    var div = Util.div("submit");
    div.appendChild(Util.button("Submit The Quiz", "submit-button", "submit-"+id));
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

//calendar//
//yue//
function Calendar(startDate, days) {
    this.startDate = startDate;
    var s = "";
    for (var i = 0; i < days; i++){
		s += '0';
    }
    this.holidays = s;
    this.events = s;
}

Calendar.prototype.shift = function(days) {
	this.startDate.setDate(this.startDate.getDate() + days);
}

Calendar.prototype.week = function(parent) {

}

Calendar.prototype.getDateOfYear = function(d) {
	var endDateOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var dateOfYear = 0;
	var month = d.getMonth();
	for(var i=0; i<month; i++){
		dateOfYear += endDateOfMonth[i];
	}
	dateOfYear += d.getDate();
	return dateOfYear;
}

Calendar.prototype.setHoliday = function(d){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			s += '1';
		}
		else{
			s += this.holidays.charAt(i);
		}
    }
    this.holidays = s;
}

Calendar.prototype.setEvent = function(d){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			if(this.events.charAt(i) == '1')
				s += '0';
			else
				s += '1';
		}
		else{
			s += this.events.charAt(i);
		}
    }
    this.events = s;
}

Calendar.prototype.markCell = function(date, d){
	var dd = new Date();
	dd.setDate(date);
	dd.setMonth(d.getMonth());
	this.setEvent(dd);
	var t = document.getElementById("cal");
	if(t != null){
		t.parentNode.replaceChild(this.month(d, this), t);
	}
}

Calendar.prototype.month = function(d, calendar) {
    //d = (typeof d !== "undefined") ? d : this.startDate;
    var t = document.createElement("table");
    t.className = "cal";
    t.id = "cal";
    var h = t.insertRow(0);
    var b1 = Util.button("<<", null, null, function(){});
    b1.onclick = function(){
    	d.setFullYear(d.getFullYear() - 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b2 = Util.button("<", null, null, function(){});
    b2.onclick = function(){
    	d.setMonth(d.getMonth() - 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b3 = Util.button(">", null, null, function(){});
    b3.onclick = function(){
    	d.setMonth(d.getMonth() + 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b4 = Util.button(">>", null, null, function(){});
    b4.onclick = function(){
    	d.setFullYear(d.getFullYear() + 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }; 
    var b5 = Util.button("shift", null, null, function(){});
    b5.onclick = function(){
    	var s = "";
    	for(var i=0; i<365; i++){
    		var flag = calendar.events.charAt((i-7+365)%365);
    		s += flag;
    	}
    	calendar.events = s;
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }
    var b6 = Util.button("mark holiday", null, null, function(){});
    b6.onclick = function(){
    	var dd = new Date(); //dd is the first day of the year
    	dd.setDate(1);
    	dd.setMonth(0);
    	dd.setFullYear(d.getFullYear());
    	for(var i=0; i<365; i++){
    		if(dd.getDay() == 0 || dd.getDay() == 6)
    			calendar.setHoliday(dd);
    		dd.setDate(dd.getDate() + 1);
    	}
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }
    
    fillRow(h, [
     b1, b2, document.createTextNode(d.getFullYear()), document.createTextNode(" "), document.createTextNode(d.getMonth()+1), b3, b4, b5, b6
    ]);
    h = t.insertRow(1);
    fillRowText(h, ["S", "M", "T", "W", "T", "F", "S"]);   
    d.setDate(1);
    var monthId = d.getMonth();
    var dayOfWeek = d.getDay();
    d.setDate(d.getDate() - dayOfWeek); // get back to Sunday
	for (var i = 2; i <= 7; i++) {
        var r = t.insertRow(i);
        var rowFlag = false;
        for (var j = 0; j < 7; j++) {
            var c = r.insertCell(j);
            if(d.getMonth() == (monthId-1+12)%12){
                d.setDate(d.getDate() + 1);
            }
            else if(d.getMonth() == monthId){
            	c.innerHTML = d.getDate();
            	c.ondblclick = function(){calendar.markCell(this.innerHTML, d);};
            	
            	var holidayFlag = this.holidays.charAt(this.getDateOfYear(d) - 1);
            	var eventFlag = this.events.charAt(this.getDateOfYear(d) - 1);
            	if(holidayFlag == '1'){
            		if(eventFlag == '1'){
            			c.style.color = "blue";
            		}
            		else{
            			c.style.color = "red";
            		}
            	}
            	else if(eventFlag == '1'){
            		c.style.color = "green";
            	}
            	else{
            		c.style.color = "black";
            	}
                d.setDate(d.getDate() + 1);
            }
            else{
                rowFlag = true;
            }
        }
        if(rowFlag){
        	d.setMonth(d.getMonth() - 1);//go back to current month
        	break;
        }
	}
    return t;
}

Calendar.prototype.year = function(calendar) {
    var div = document.createElement("div");
    var d = this.startDate;
    for (var month = 0; month < 12; month++){
    	div.appendChild(this.month(d, calendar));
    	d.setMonth(d.getMonth() + 1);
    }      
    return div;
}

function imgClick(e) {
	console.log(e.clientX + "," + e.clientY);
};

Quiz.prototype.clickableImage = function(id, src, xs, ys) {
	var img = document.createElement("img");
	img.src = mediaLocations.img + src;
	img.onclick = imgClick;
	return img;
};

// multiple fill-in-the-blank where [[]] is replaced by inputs
Quiz.prototype.cloze = function(id, txt) {
	var preItems = txt.split("[[]]");
	var pre = document.createElement("pre");
	pre.className = "code";

	for (var i = 0; i < preItems.length; ++i) {
		pre.appendChild(Util.span(preItems[i]));
		if (i != preItems.length - 1)
			pre.appendChild(this.fillin(id + "_" + i, true));
	}
	return pre;
};

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

// ////////////////////////////////////////////////////////////////////
// Editor //
// Ying //
function turnalloff(elem) { // TODO: turn off all the other selections when one
	// of them is selected
	var elems = elem.form.elements;
	var currentState = elems.checked;

	for (var i = 0; i < elems.length; i++) {
		if (elems[i].type === "checkbox") {
			elems[i].checked = false;
		}
	}

	elem.checked = currentState;
}

function editMCDDform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var checkbox = document.createElement("input");
		var linebreak = document.createElement("br");
		checkbox.type = "checkbox";

		// checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}

	return form;
}
function editMAform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var checkbox = document.createElement("input");
		var linebreak = document.createElement("br");
		checkbox.type = "checkbox";

		// checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(checkbox);
		form.appendChild(linebreak);
	}

	return form;
}
function editSurveyform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var linebreak = document.createElement("br");

		// checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(linebreak);
	}

	return form;
}

function editMCRform(id, labels, list) {
	var form = document.createElement("form");
	form.id = id;

	for (var i = 0; i < list.length; i++) {
		var t = document.createTextNode(labels[i]);
		var opt = document.createElement("input");
		var radio = document.createElement("input");
		var linebreak = document.createElement("br");
		radio.type = "radio";

		// checkbox.onclick = turnalloff(this);
		opt.value = list[i];
		form.appendChild(t);
		form.appendChild(opt);
		form.appendChild(radio);
		form.appendChild(linebreak);
	}

	return form;
}
var selStart, selEnd;

function addBrackets(ta) {

	var v = ta.value;
	ta.value = v.substring(0, selStart) + " [[" + v.substring(selStart, selEnd)
			+ "]] " + v.substring(selEnd);
}

var exampleClozeTest = 'public class A {\n [[]]  public [[]] void main(strings [] args) {\n  System.println.out("hello");\n  }\n}';
Quiz.prototype.editCloze = function() {
	var div = document.createElement("div");
	div.id = "Cloze";
	div.className = "cloze"; // style of the editor box
	var ta = document.createElement("textarea");
	div.appendChild(ta);
	ta.className = "cloze";
	ta.id = "x";
	ta.rows = 10;
	ta.cols = 80;
	ta.value = exampleClozeTest;
	ta.ondblclick = function() {
		addBrackets(ta);
	};
	ta.onmouseup = function() {
		selStart = ta.selectionStart;
		selEnd = ta.selectionEnd;
		console.log(ta.selectionStart + "," + ta.selectionEnd);
	};
	// ta.onkeyup = function(){ ta.style.height = "1px";
	// ta.style.height = (25+ta.scrollHeight)+"px";}

	div.appendChild(Util.button("SquareBracket It!", null, null, function() {
		addBrackets(ta);
	}));
	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildCloze('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editFillin = function() {
	var div = document.createElement("div");
	div.id = "Fillin";
	div.className = "Fillin"; // style of the editor box

	var Ans = Util.span("Answer: ");
	var ans = Util.input("text", "ans");
	ans.value = "";
	div.appendChild(Ans);
	div.appendChild(ans);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildFillin('title', ta.value, ans.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editNumber = function() {
	var div = document.createElement("div");
	div.id = "Number";
	div.className = "Number"; // style of the editor box

	var min = Util.span("Min: ");
	var Min = Util.input("text", "min");
	var max = Util.span("Max: ");
	var Max = Util.input("text", "max");
	div.appendChild(min);
	div.appendChild(Min);
	div.appendChild(max);
	div.appendChild(Max);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildnumber('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editEssay = function() {
	var div = Util.div("Essay", "Essay");

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		buildessay('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editCode = function() {
	var div = document.createElement("div");
	div.id = "Code";
	div.className = "Code"; // style of the editor box

	div.appendChild(Util.button("Submit", function() {
		$("#y").remove();
		buildcode('title', ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editEssay = function() {
	var div = document.createElement("div");
	div.id = "Essay";
	div.className = "Essay"; // style of the editor box

	mkpbutton(div, "Submit", null, function() {
		$("#y").remove();
		buildessay('title', ta.value);
	});
	document.body.appendChild(div);
}

Quiz.prototype.editCode = function() {
	var div = document.createElement("div");
	div.id = "Code";
	div.className = "Code"; // style of the editor box

	mkpbutton(div, "Submit", function() {
		$("#y").remove();
		buildcode('title', ta.value);
	});
	document.body.appendChild(div);
}

// function addOption(parent){
// var extraOpteditMCform= form(4, [optionChar], [""]);
// div.appendChild(extraOption)
// }
//
// var optionCharUni = 68; // the Dec Unicode of 'D'
// var optionChar = String.fromCharCode(optionCharUni);

Quiz.prototype.editMultiChoiceDropdown = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceDropdown";
	div.className = "MultiChoiceDropdown"; // style of the editor box

	var editor = Util.div("MCeditor", "MCeditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Dropdown :"
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MCDDform = editMCDDform(4, [ "A: ", "B: ", "C: ", "D: " ], [ "", "",
			"", "" ]);
	div.appendChild(MCDDform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editSurvey = function() {
	var div = document.createElement("div");
	div.id = "Survey";
	div.className = "Survey"; // style of the editor box

	var editor = Util.div("surveyEditor", "surveyEditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var surveyform = editSurveyform(4, [ "Choice 1: ", "Choice 2: ",
			"Choice 3: ", "Choice 4: " ], [ "", "", "", "" ]);
	div.appendChild(surveyform);

	div.appendChild(Util.input("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));

	document.body.appendChild(div);
}

Quiz.prototype.editMultiChoiceRadio = function() {
	var div = document.createElement("div");
	div.id = "MultiChoiceRadio";
	div.className = "MultiChoiceRadio"; // style of the editor box

	var editor = Util.div("MCReditor", "MCReditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple choice - Radio:"
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MCRform = editMCRform(4, [ "Choice 1: ", "Choice 2: ", "Choice 3: ",
			"Choice 4: " ], [ "", "", "", "" ]);
	div.appendChild(MCRform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

Quiz.prototype.editMultiAnswer = function() {
	var div = document.createElement("div");
	div.id = "MultiAnswer";
	div.className = "MultiAnswer"; // style of the editor box

	var editor = Util.div("MAeditor", "MAeditor");
	div.appendChild(editor);
	var t = document.createElement("table");
	editor.appendChild(t);
	var r = t.insertRow(0);
	var description = document.createTextNode("Multiple Answer Choices: "
			+ "Correct Answer" + "Add more options");
	var numberBox = Util.input("text", "numberinput", "numberinput");
	var addOptionButton = Util.button("Add Option", null, null, function() {
	});
	fillRow(r, [ description, numberBox, addOptionButton ]);

	// addOptionButton.onclick = div.appendChild(extraOption);

	var MAform = editMAform(4, [ "Option 1: ", "Option 2: ", "Option 3: ",
			"Option 4: " ], [ "", "", "", "" ]);
	div.appendChild(MAform);

	div.appendChild(Util.button("Submit", null, null, function() {
		$("#y").remove();
		builddpd(ta.value);
	}));
	document.body.appendChild(div);
}

var newid = -1;
function buildCloze(title, text) {

	page.addQuestion(newid--, title, "cloze");
	page.instructions("Fill in the blanks to make the code correct");
	page.cloze(newid--, text);
}

function buildFillin(title, text, answer) {

	page.addQuestion(newid--, title, "fillin");
	page.span(text);
	page.fillin(newid--);
	// TODO: store answer

	// var quizinfo = new QuizInfo("New Fill-In Question", 10, 0, 1, "assets/");
	// var qlist = [[
	// qhead('Java'),
	// lin('Complete the code below'),
	// cod(3, txt3, 10, 80)
	// ]]
	// var q_cloze = new Quiz(quizinfo, qlist);
}
function buildnumber(title, text) {
	var quizinfo = new QuizInfo("New Number Question", 10, 0, 1, "assets/");
	var qlist = [
			[ qhead('Java'), lin('Complete number text below'),
					cod(3, txt4, 10, 80) ],
			[ lin('Type your Answer'), cod(3, "", 2, 80) ] ]
	var q_cloze = new Quiz(quizinfo, qlist);
}
function buildessay(txt5) {
	var quizinfo = new QuizInfo("New Essay Question", 10, 0, 1, "assets/");
	var qlist = [
			[ qhead('Java'), lin('Question Text'), cod(3, txt5, 10, 80) ],
			[ lin('Type your Essay'), cod(3, "", 12, 100) ], ]
	var q_cloze = new Quiz(quizinfo, qlist);
}
function buildcode() {
	var quizinfo = new QuizInfo("New Code Question", 10, 0, 1, "assets/");
	var qlist = [
			[
					qhead('Java'),
					lin('Question Text'),
					cod(3, txt6, 10, 80),
					match(1, [ txt("Programming Language: ") ], [ txt("C++"),
							txt("Java"), txt("Python"), ]) ],
			[ lin('Type your code'), cod(3, "", 12, 100), button("Run") ]

	]
	var q_cloze = new Quiz(quizinfo, qlist);
}

function builddpd() {
	var quizinfo = new QuizInfo("New DropDownList Question", 10, 0, 1,
			"assets/");
	var qlist = [
			[ qhead('Java'), lin('Question Text'), cod(3, txt6, 10, 80), ],

			[ lin('Type your code'), cod(3, "", 12, 100), ]

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
//	var c = mkdivid(this.body, "new-question-button", "qc new-question-button"); // TODO(asher): Fix mkdiv
//    var newB = mkbutton("New Question"); // TODO(asher): Fix mkbutton
//    newB.onclick = function() { this.editQuestion; }
//    c.appendChild(newB);
//    this.add(c);
//}

var list = [ "Choose QuestionType", "Fillin", "Number", "Essay", "Code",
		"MultiChoiceDropdown", "Survey", "MultiChoiceRadio", "MultiAnswer",
		"Regex", "Matrix", "Cloze" ];

// Quiz.prototype.editMode = function(){
// var c = mkdivid(this.div, "new-question-button", "qc new-question-button");
// var newB = mkbutton("New Question");
// newB.onclick = function() { this.editQuestion; }
// c.appendChild(newB);
// this.add(c);
// }

function fillRow(row, list) {
	for (var i = 0; i < list.length; i++) {
		var c = row.insertCell(i);
		c.appendChild(list[i]);
	}
}

function checkIfInView(id) {

	var element = $("#" + id);
	var offset = element.offset().top;

	if (offset > window.innerHeight) {
		// Not in view so scroll to it
		$('html,body').animate({
			scrollTop : offset
		}, 1000);
		return false;
	}
	return true;
}

function editTextBox(val) {
	var div = document.createElement("div");
	div.id = "textBoxDiv";
	div.className = "textBoxDiv"; // style of the editor box
	var ta = document.createElement("textarea");
	div.appendChild(ta);
	ta.className = "textArea";
	ta.id = "textArea";
	ta.rows = 5;
	ta.cols = 50;
	ta.value = val;
	return div;

}

Quiz.prototype.editQuestion = function() {
	var parent = this;
	var editor = Util.div("editor", "editor");
	this.container.appendChild(editor);
	var t0 = document.createElement("table");
	editor.appendChild(t0);
	var r0 = t0.insertRow(0);

	var title = document.createTextNode("Title: ");
	var inp = document.createElement("input");
	var questionType = document.createTextNode("Question Type: ");
	var selectBox = Util.select("quizType", false, list, null, "quizType");
	var addQuestion = Util.button("Add Question", null, null, function() {
	});
	var cancel = Util.button("Cancel", null, null, function() {
	});
	fillRow(r0, [ title, inp, questionType, selectBox, addQuestion, cancel ]);

	var r1 = t0.insertRow(1);
	var level = document.createTextNode("Level: ");
	var inpl = document.createElement("input");
	var points = document.createTextNode("Points: ");
	var inpp = document.createElement("input");
	fillRow(r1, [ level, inpl, points, inpp ]);

	var t1 = document.createElement("table");
	editor.appendChild(t1);
	var r2 = t1.insertRow(0);
	fillRow(r2, [ editTextBox(""), imageAudioVideo() ]);

	$('#quizType').change(function() {
		for (var i = 0; i < list.length; i++) {
			$("#" + list[i]).hide();
		}
		var val = $("#quizType option:selected").text();
		if (val === "Choose QuestionType") {
			return;
		}
		parent["edit" + val]();
		checkIfInView(val);
	});
}

/** ******************** View Quizzes Part ******************** * */
/** Jack Tan * */
function loadViewQuizzes() {
	var input;
	var xmlhttp = new XMLHttpRequest();
	var url = "../demos/assets/json/quizzes.json";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var input = JSON.parse(xmlhttp.responseText);
			var c = document.getElementById("container");
			c.appendChild(qtoolbar(input.editMode));
			c.appendChild(qtable(input));
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
var arr_temp; // This is for the memory where we save the data temporarily.
var months = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ",
		"Sep ", "Oct ", "Nov ", "Dec " ];
function dayshift(datetype, rowID, rowNum, NOD) {
	var cell = document.getElementById(rowID).cells[datetype];
	var date = new Date(arr_temp[rowNum][datetype]);
	date.setDate(date.getDate() + NOD);
	arr_temp[rowNum][datetype] = date.toString();
	cell.innerHTML = months[date.getMonth()] + date.getDate() + " at "
			+ date.getHours() + ":" + date.getMinutes();
	if (checkDates(rowNum)) {
		dayshift(datetype, rowID, rowNum, -NOD);
	}
}
/*
 * Check the dates before each time you change them. Open date must be earlier
 * than due date and close date; Due date must later than open date but no later
 * than close date; Close date must be later than open date and no earlier than
 * due date. Return ture if an error happens
 */
function checkDates(rowNum) {
	var opendate = new Date(arr_temp[rowNum][2]);
	var closedate = new Date(arr_temp[rowNum][3]);
	var duedate = new Date(arr_temp[rowNum][4]);
	if (closedate.getTime() <= opendate.getTime()) {
		alert("Open date must be earlier than close date.");
		return true;
	}
	if (closedate.getTime() < duedate.getTime()) {
		alert("Close date must be no earlier than due date.");
		return true;
	}
	if (opendate.getTime() >= duedate.getTime()) {
		alert("Open date must be earlier than due date.");
		return true;
	}
}
// Conditional day shift.
function condDayShift(rowID, rowNum, NOD) {
	if (document.getElementById("selectOpenDate").checked == true) {
		dayshift(2, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectCloseDate").checked == true) {
		dayshift(3, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectDueDate").checked == true) {
		dayshift(4, rowID, rowNum, NOD);
	}
}
// make day shift buttons i.e. (-7, -1, +1, +7)
function mkDSButtons(rowID, rowNum) {
	var d = document.createElement("div");
	d.appendChild(Util.button("-7", null, null, function() {
		condDayShift(rowID, rowNum, -7)
	}));
	d.appendChild(Util.button("-1", null, null, function() {
		condDayShift(rowID, rowNum, -1)
	}));
	d.appendChild(Util.button("+1", null, null, function() {
		condDayShift(rowID, rowNum, +1)
	}));
	d.appendChild(Util.button("+7", null, null, function() {
		condDayShift(rowID, rowNum, +7)
	}));
	return d;
}

function mkth(parent, txt, colspan) { // make table head cell
	var th = document.createElement("th");
	th.innerHTML = txt;
	th.colSpan = colspan;
	parent.appendChild(th);
	return th;
}
// TODO START HERE
function qtoolbar(editMode) {
	var qtoolbar = Util.div();
	/* **************** search div **************** */
	var srch_div = Util.div();
	qtoolbar.appendChild(srch_div);
	srch_div.appendChild(Util.make("input", {
		type : "search",
		placeholder : "Search for Quiz"
	}));

	srch_div.appendChild(Util.button("Search"));
	/* **************** search div **************** */
	/* **************** buttons div **************** */
	if (editMode) {
		var btns_div = Util.div();
		qtoolbar.appendChild(btns_div);
		btns_div.appendChild(Util.button("all"));
		btns_div.appendChild(Util.button("invert"));
		btns_div.appendChild(Util.button("none"));
		btns_div.appendChild(Util.make("input", { // enter a date for date
			// shift
			type : "text",
			placeholder : "Enter a date point"
		}));
		btns_div.appendChild(Util.make("input", { // enter the number of days
			// for date shift
			type : "text",
			placeholder : "Number of days"
		}));
		btns_div.appendChild(Util.button("Advance"));
		btns_div.appendChild(Util.button("Postpone"));
	}
	/* **************** buttons div **************** */
	return qtoolbar;
}

function qtable(input) {
	arr_temp = input.quizzes;
	var t = document.createElement("table");
	t.border = "1";
	/* **************** table head for current quizzes **************** */
	var h1 = t.insertRow(0);
	mkth(h1, "Current Quizzes", 2);
	mkth(h1, "Open", "1");
	mkth(h1, "Close", "1");
	mkth(h1, "Due", "1");
	mkth(h1, "Points", "1");
	mkth(h1, "Questions", "1");
	/* **************** table head for current quizzes **************** */
	/* **************** table head for closed quizzes **************** */
	var h2 = t.insertRow(1);
	mkth(h2, "Closed Quizzes", 8);
	/* **************** table head for closed quizzes **************** */
	/* **************** table body **************** */
	for (var i = 1; i < arr_temp.length; i++) {
		var tr = t.insertRow(i);
		tr.id = arr_temp[i][0];
		var cell0 = tr.insertCell(0);
		for (var j = 1; j < arr_temp[i].length; j++) {
			var c = tr.insertCell(-1);
			c.innerHTML = arr_temp[i][j];
		}
		var opendate = new Date(arr_temp[i][2]);
		tr.cells[2].innerHTML = months[opendate.getMonth()]
				+ opendate.getDate() + " at " + opendate.getHours() + ":"
				+ opendate.getMinutes();
		var closedate = new Date(arr_temp[i][3]);
		tr.cells[3].innerHTML = months[closedate.getMonth()]
				+ closedate.getDate() + " at " + closedate.getHours() + ":"
				+ closedate.getMinutes();
		var duedate = new Date(arr_temp[i][4]);
		tr.cells[4].innerHTML = months[duedate.getMonth()] + duedate.getDate()
				+ " at " + duedate.getHours() + ":" + duedate.getMinutes();
	}
	/* **************** table body **************** */
	/* **************** edit functions for edit mode **************** */
	if (input.editMode) {
		h1.cells[1].appendChild(Util.checkbox(null, null, null,
				"selectOpenDate", false));
		h1.cells[2].appendChild(Util.checkbox(null, null, null,
				"selectCloseDate", true));
		h1.cells[3].appendChild(Util.checkbox(null, null, null,
				"selectDueDate", true));
		for (var i = 1; i < arr_temp.length; i++) {
			t.rows[i].cells[0].appendChild(Util.checkbox(null, null, null,
					null, false));
			t.rows[i].cells[1].appendChild(Util.br());
			t.rows[i].cells[1].appendChild(mkDSButtons(t.rows[i].id, i));
			t.rows[i].insertCell(-1);
			t.rows[i].cells[7].appendChild(Util.button("edit"));
			t.rows[i].cells[7].appendChild(Util.button("delete"));
			t.rows[i].cells[7].appendChild(Util.button("copy"));
		}
	}
	/* **************** edit functions for edit mode **************** */
	return t;
}
/** ******************** View Quizzes Part ******************** * */

var page;

// This should just become a generic handler for any error that's not 200.
function status404() {
    fragment = document.createDocumentFragment();
    fragment.appendChild(Util.h1("Error: 404"));
    fragment.appendChild(Util.p("Please make sure the url you entered in the address bar is correct."));
    return fragment;
}

function processAJAX() {
    if (typeof page.css !== "undefined") {
        appendCSSLink("assets/css/" + page.css + ".css"); // load the user's
        // css skin
    } else {
        console.error("custom css didn't load. check css link in page.css");
    }
    if (typeof thisPage !== "undefined") {
        thisPage();
    } else {
        console.error("thisPage() never ran!!");
    }
}

function loadPage(e) {
    var baseFilename = location.hash.substr(1);
    var ajax = "/LiquiZ2" + baseFilename + "_ajax.jsp"; // name of dynamic file to run
    // console.log(ajax);
    // console.log("hash change to: " + location.hash);
    document.getElementById("currentStatus").innerHTML = "If you see this message, please press f12 twice and then reload the page.";

    var json = new XMLHttpRequest();
    json.onreadystatechange = function() {
        if (json.status === 404) {
            document.getElementById("container").innerHTML = "";
            document.getElementById("currentStatus").innerHTML = "";
            document.getElementById("currentStatus").appendChild(status404());
        }
        if (json.readyState !== 4 || json.status !== 200)
            return; // TODO: Handle error if it doesn't come back
        document.getElementById("currentStatus").innerHTML = "";
        document.getElementById("container").innerHTML = "";
        eval("page=" + json.responseText);
        processAJAX();
        // Util.goToId();
    }
    json.open("GET", ajax, true);
    json.send();
}

window.onload = loadPage;
window.onhashchange = loadPage;

// TODO(asher): Here we're not reloading the whole page, just calling a method on page (page.summary).
// If the first part (/demos/QuizDemo) is the same, just execute the summary method
// otherwise load the page via ajax and execute the summary method
// If there's no !, we just call the exec method
// http://localhost:8080/LiquiZ2/demos/QuizDemo.html#/demos/QuizDemo!summary