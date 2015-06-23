Util = {    
    dump: function(obj) {
        var s = "";
        for (var k in obj) {
            s += k + "-->" + obj[k] + '\n';
        }
        console.log(s);
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
     */
    img: function(src, className, id) {
        return Util.make("img", {
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
     * Takes a src, class, id and a bool for controls.
     * controls defaults to true.
     */
    video: function(src, controls, className, id) {
        controls = (typeof controls !== "undefined") ? controls : true;
        return Util.make("video", {
            src: src,
            controls: controls,
            className: className,
            id: id,
        });
    },

    /*
     * Takes a src, class, id and a bool for controls.
     * controls defaults to true.
     */
    audio: function(src, controls, className, id) {
        controls = (typeof controls !== "undefined") ? controls : true;
        return Util.make("audio", {
            src: src,
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

    file: function(accept, value, className, id) {
        return Util.make("input", {
            type: "file",
            accept: accept,
            value: value,
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

    checkbox: function(value, name, className, id) {
        return Util.make("input", {
            type: "checkbox",
            value: value,
            name: name,
            className: className,
            id: id,            
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

// /*
//  * Proof of concept. Not production code!
//  */
// tdCount = 0;
// function modTd(list, th) {
//     var tr = Util.make("tr", {
//         className: "custom-tr",
//     });
//     for (var i = 0; i < list.length; i++) {
//         var tElement;
//         if (th) {
//             tElement = Util.make("th", {
//                 className: "modded-header",
//                 id: tdCount++,
//                 innerHTML: list[i],
//                 scope: "col",
//             });
//         } else {
//             tElement = Util.make("td", {
//                 className: "modded",
//                 id: tdCount++,
//                 innerHTML: list[i],
//             });
//         }
//         tr.appendChild(tElement);
//     }
//     return tr;
// }

// /*
//  * Proof of concept. Not production code!
//  * 
//  * Function that integrates with the new Util.table function
//  * to generate an empty table filled with inputs.
//  */
// function emptyGrid(list, th) {
//     var obj = list[0];
//     var result = document.createDocumentFragment();
//     for (var i = 0; i < obj.rows; i++) {
//         var tr = Util.make("tr");
//         for (var j = 0; j < obj.cols; j++) {
//             // var input = Util.make("input", {
//             //     type: "text",
//             // });
//             var td = Util.make("td", {
//                 className: "td-input",
//                 innerHTML: Util.make("input", {
//                     type: "text",
//                 }),
//             });
//             tr.appendChild(td);
//         }
//         result.appendChild(tr);
//     }
//     return result;
// }

// function labelGrid(list, th) {
//     var td = Util.make("td", null, list[0]);
//     var tr = Util.make("tr", null, td);
//     return tr;
// }

/*
function build() {
    var quiz = document.getElementById("quiz");
    var element = Util.table([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10]
    ], true, "table-empty");
    console.log(element);
    quiz.appendChild(element);

    var br = Util.br();
    console.log(br);
    quiz.appendChild(br);

    element = Util.table([
        [{
            cols: 3,
            rows: 6,
        }]
    ], false, "table-input", emptyGrid);
    console.log(element);
    quiz.appendChild(element);

    var video = Util.video("assets/vid/Tacoma Narrows Bridge Collapse.mp4");
    console.log(video);
    quiz.appendChild(video);

    var audio = Util.audio("assets/aud/clip1.mp3", true, "pianos", "the-only-one");
    console.log(audio);
    quiz.appendChild(audio);

    var genInput = Util.button("submit", "generic-input");
    console.log(genInput);
    quiz.appendChild(genInput);

    var file = Util.file(".java");
    console.log(file);
    quiz.appendChild(file);

    var labelsRadio = [];
    var label;
    for (var i = 0; i < 5; i++) {
        var radio = Util.radio(i, "radio-group", null, "radio-" + i);
        label = Util.label("radio-" + i, " " + i + ". Click me!");
        label.insertBefore(radio, label.firstChild);
        labelsRadio.push([label]);
    }
    var labelTable = Util.table(labelsRadio, false, null, labelGrid);
    console.log(labelTable);
    quiz.appendChild(labelTable);

    var labelsCheckbox = [];
    for (i = 0; i < 5; i++) {
        var checkbox = Util.checkbox(i, "checkbox-group", null, "checkbox-" + i);
        label = Util.label("checkbox-" + i, " " + i + ". Click me!");
        label.insertBefore(checkbox, label.firstChild);
        labelsCheckbox.push([label]);
    }
    labelTable = Util.table(labelsCheckbox, false, null, labelGrid);
    console.log(labelTable);
    quiz.appendChild(labelTable);

    var h1 = Util.h1("I'm an h1 tag!", "special-h1");
    console.log(h1);
    quiz.appendChild(h1);

    var liFragment = document.createDocumentFragment();
    for (i = 0; i < 10; i++) {
        liFragment.appendChild(Util.li(i));
    }
    var ul = Util.ul(liFragment, "lists-are-cool");
    console.log(ul);
    quiz.appendChild(ul);

    var a = Util.a("assets/img/einstein.jpg", "I'm a link!");
    console.log(a);
    quiz.appendChild(a);

    var nested = Util.h1(Util.a("assets/img/einstein.jpg", Util.em("I'm a big h1 link!")));
    console.log(nested);
    quiz.appendChild(nested);

    var code = Util.p(Util.code("print \"Hello World!\""));
    console.log(code);
    quiz.appendChild(code);

    var j, optgroup;
    var options = document.createDocumentFragment();
    for (i = 0; i < 3; i++) {
        optgroup = Util.optgroup("Group " + i);
        for (j = 0; j < 5; j++) {
            optgroup.appendChild(Util.option(j+"-"+i, "The value is: "+j+"-"+i, "options-are-cool", "option-" +j + "-" + i));
        }
        options.appendChild(optgroup);
    }

    var select = Util.select("test-select", true, options, "options-list", "totally-unique-option");
    console.log(select);
    quiz.appendChild(select);

    options = document.createDocumentFragment();
    for (i = 0; i < 3; i++) {
        optgroup = Util.optgroup("Group " + i);
        for (j = 0; j < 5; j++) {
            optgroup.appendChild(Util.option(j+"-"+i, "The value is: "+j+"-"+i, "options-are-cool", "option-" +j + "-" + i));
        }
        options.appendChild(optgroup);
    }

    select = Util.select("test-select", false, options, "options-list", "totally-unique-option");
    console.log(select);
    quiz.appendChild(select);

    var canvas = Util.canvas(400, 400);
    console.log(canvas);
    quiz.appendChild(canvas);

    var img = Util.img("assets/img/einstein.jpg");
    console.log(img);
    quiz.appendChild(img);
}
*/

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
    this.div.appendChild(Util.h1(this.title));
    this.div.appendChild(Util.span(" Points: " + this.points, "points"));
    this.div.appendChild(Util.p("timer"));
    //TODO: add time and countdown
    //TODO: add remaining tries
}

var clicks = 0;
Quiz.prototype.end = function(id) {
    var parent = this;
    qc = Util.div("qc", "qc" + id);
    page.q.appendChild(qc);
    if (this.editMode) {
        qc.appendChild(Util.button("New Question", "new-question", null,
            function() {
                if (clicks === 0) {
                    parent.editQuestion();
                    checkIfInView("editor");
                }
                clicks++;
            }));
    }
    this.createSubmit(2);
};

function makeEditBox(parent, editFunc, deleteFunc, copyFunc) {
    var editBox = Util.div("edit");
    editBox.appendChild(Util.button("Edit", null, id+"-edit", editFunc));
    editBox.appendChild(Util.button("Delete", null, id+"-delete", deleteFunc)); 
    editBox.appendChild(Util.button("Copy", null, id+"-copy", copyFunc));
    parent.appendChild(editBox);
}   

Quiz.prototype.addQuestion = function(id, title, className, points, level) {
    this.div.appendChild(Util.div("qc " + className + "-qc", "qc" + id));
    this.q = document.getElementById("qc" + id);
    points = (typeof points === "undefined") ? 1 : points;
    level =  (typeof level === "undefined") ? 1 : level;

    header = Util.div("qheader");
    header.appendChild(Util.h2(title));
    
    floatRight = Util.div("float-right");

    floatRight.appendChild(Util.span("points:" + points, "qpoints"));
    floatRight.appendChild(Util.span("level:" + level, "level"));
    if (this.editMode) {
        makeEditBox(floatRight, function() {
                innerHTML = "";
                console.log(edit.id);
            },
            function() {
                innerHTML = "";
                console.log(del.id);
            },
            function() {
                innerHTML = "";
                console.log(copy.id);
            });
    }
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
    var div = Util.div("submit");
    div.appendChild(Util.button("Submit The Quiz", "submit-button", "submit-"+id));
    this.div.appendChild(div);
};

Quiz.prototype.instructions = function(txt) {
    this.q.appendChild(Util.p(txt, 'instructions'));
}

Quiz.prototype.box = function(txt) {
    var div = Util.div("box");
    div.innerHTML = txt;
    this.q.appendChild(newChild);
}

Quiz.prototype.fillin = function(id, sendBack) {
    var input = Util.input('text', 'fillin', id);
    if (sendBack)
        return input;
    this.q.appendChild(input);
}

Quiz.prototype.numeric = function(id) {
    this.q.appendChild(Util.input('text', 'number', id));
}

Quiz.prototype.numid = function(id, v) {
    var inp = Util.input('text', 'cell', id);
    inp.size = 3;
    inp.value = v;
    this.q.appendChild(inp);
}

Quiz.prototype.add = function(parent, spec) {
    parent.appendChild(this[spec.type](spec));
}

Quiz.prototype.mcRadioText = function(id, txt) {
    this.q.appendChild(Util.input('radio', 'multichoiceradio', id));
    this.add(this.q, document.createTextNode(txt));
}

Quiz.prototype.mcRadioImg = function(id, src) {
    l = [];
    for (var i = 0; i < src.length; i++) {
        radio = Util.radio(id+"-"+i, id, 'multichoiceradio', id+"-"+i);
        label = Util.label(id+"-"+i, Util.img(Quiz.mediaLocations.img + src[i]));
        group = [radio, label];
        l.push(group);
    }
    this.q.appendChild(Util.table(l));
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
    input = Util.input("text", id + "_" + this.inputCount, "grid-input");
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
	var image = Util.p("Image");
	var image_src = Util.file(null, null, "image_src");
	var load_image = Util.button("Load Selected Image", "image_src");
	fillRow(r0, [image, image_src, load_image]);
	
	var r1 = t.insertRow(1);
	var audio = Util.p("Audio");
	var audio_src = Util.file(null, null, "audio_src");
	var load_audio = Util.button("Load Selected Audio", "audio_src");
	fillRow(r1, [audio, audio_src, load_audio]);
	
	var r2 = t.insertRow(2);
	var video = Util.p("Video");
	var video_src = Util.file(null, null, "video_src");
	var load_video = Util.button("Load Selected Video", "video_src");
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
        pre.appendChild(Util.span(preItems[i]));
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
        //    ta.onkeyup = function(){ ta.style.height = "1px";
        //    ta.style.height = (25+ta.scrollHeight)+"px";}

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

    var editor = Util.div("MCeditor", "MCeditor");
    div.appendChild(editor);
    var t = document.createElement("table");
    editor.appendChild(t);
    var r = t.insertRow(0);
    var description = document.createTextNode("Multiple choice - Dropdown :" + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {});
    fillRow(r, [description, numberBox, addOptionButton]);

    //addOptionButton.onclick = div.appendChild(extraOption);

    var MCDDform = editMCDDform(4, ["A: ", "B: ", "C: ", "D: "], ["", "", "", ""]);
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
    var addOptionButton = Util.button("Add Option", null, null, function() {});
    fillRow(r, [description, numberBox, addOptionButton]);

    //addOptionButton.onclick = div.appendChild(extraOption);

    var surveyform = editSurveyform(4, ["Choice 1: ", "Choice 2: ", "Choice 3: ", "Choice 4: "], ["", "", "", ""]);
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
    var description = document.createTextNode("Multiple choice - Radio:" + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {});
    fillRow(r, [description, numberBox, addOptionButton]);

    //addOptionButton.onclick = div.appendChild(extraOption);

    var MCRform = editMCRform(4, ["Choice 1: ", "Choice 2: ", "Choice 3: ", "Choice 4: "], ["", "", "", ""]);
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
    var description = document.createTextNode("Multiple Answer Choices: " + "Correct Answer" + "Add more options");
    var numberBox = Util.input("text", "numberinput", "numberinput");
    var addOptionButton = Util.button("Add Option", null, null, function() {});
    fillRow(r, [description, numberBox, addOptionButton]);

    //addOptionButton.onclick = div.appendChild(extraOption);

    var MAform = editMAform(4, ["Option 1: ", "Option 2: ", "Option 3: ", "Option 4: "], ["", "", "", ""]);
    div.appendChild(MAform);

    div.appendChild(Util.button("Submit", null, null, function() {
        $("#y").remove();
        builddpd(ta.value);
    }));
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
//	var c = mkdivid(this.div, "new-question-button", "qc new-question-button"); // TODO(asher): Fix mkdiv
//    var newB = mkbutton("New Question"); // TODO(asher): Fix mkbutton
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
    var editor = Util.div("editor", "editor");
    this.div.appendChild(editor);
    var t0 = document.createElement("table");
    editor.appendChild(t0);
    var r0 = t0.insertRow(0);

    var title = document.createTextNode("Title: ");
    var inp = document.createElement("input");
    var questionType = document.createTextNode("Question Type: ");
    var selectBox = Util.select("quizType", false, list, null, "quizType");
    var addQuestion = Util.button("Add Question", null, null, function() {});
    var cancel = Util.button("Cancel", null, null, function() {});
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
    if (typeof page.css !== "undefined") {
        appendCSSLink("assets/css/" + page.css + ".css");   // load the user's css skin
    } else {
        console.error("custom css didn't load. check css link in page.css");
    }
    if (typeof thisPage !== "undefined") {
        thisPage();
    } else {
        console.error("thisPage() never ran!!");
    }
}

// List/Edit Quizzes Page

// List/Edit Grades Page

window.onload  = build;
