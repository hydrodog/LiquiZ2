/**
 * Lib.js author: Asher Davidson
 * 
 * This library supports a lightweight one-page html framework The initial page
 * loads in and should contain div boxes with id="container" and id=" Each page
 * calls loadPage and loads ajax code in JSON format. To do so, it reads the
 * page URL after the hash # For example, for the url
 * localhost/LiquiZ2/index.html#demos/QuizDemo the framework will load ajax from
 * the file: QuizDemo_ajax.jsp. If the URL has an exclamation after that hash #!
 * then the framework will run the next javascript without loading ajax for even
 * faster response.
 * 
 * In this way, we can load data and share it among several pages. Each can
 * display a subcomponent of the data in different ways See the full
 * documentation for more details.
 */

// Keep these global so they are cached!
video = {};
audio = {};
mediaLocations = {
	img: "assets/img/",
	audio: "assets/audio/",
	video: "assets/video/",
};

Util = {
	aryCons: ([]).constructor,
	strCons: ("").constructor,
	SERVER_SUFFIX: "_ajax.jsp", // we are using jsp to feed our ajax
	dump: function (obj) {
		console.warn(JSON.stringify(obj, null, 3));
	},

	add: function (parent, children) {
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < children.length; i++)
			fragment.appendChild(children[i]);
		parent.appendChild(fragment);
	},

	divadd: function (className) {
		var div = Util.div(className);
		for (var i = 1; i < arguments.length; i++)
			this.append(div, arguments[i]);
		return div;
	},
	subClass: function (sup, sub) {
		sub.prototype = Object.create(sup.prototype);
		sub.prototype.constructor = sub;
	},
	append: function (p, e) {
		if (e)
			if (e.constructor != Util.aryCons) {
				if (e.constructor == Util.strCons)
					e = document.createTextNode(e);
				p.appendChild(e);
			} else {
				for (var i = 0; i < e.length; i++) {
					this.append(p, e[i]);
				}
			}
	},
	goToId: function (id) {
		// if (typeof id === "undefined") {
		// id = window.location.hash.substr(1);
		// }
		// window.location.hash = "";
		// window.location.hash = id;
	},

	/*
	 * Returns an html tag filled with the keys and values you pass in Second
	 * arg is an object filled with key, value pairs Returns undefined if no
	 * valid tag was passed.
	 */
	make: function (tag, obj) {
		// without a valid tag we can't continue
		if (typeof tag === "undefined" || !tag) {
			console.error("Util.make failed with tag: " + tag);
			Util.dump(obj);
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
	 * Most of the following functions only take the innerHTML, the className,
	 * and the id of the tag you want, in that order. Any cases that break this
	 * rule will be noted explicitly.
	 */
	span: function (innerHTML, className, id) {
		return Util.make("span", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	div: function (className, id) {
		return Util.make("div", {
			className: className,
			id: id
		});
	},

	p: function (innerHTML, className, id) {
		return Util.make("p", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	a: function (href, innerHTML, className, id) {
		return Util.make("a", {
			href: href,
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h1: function (innerHTML, className, id) {
		return Util.make("h1", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h2: function (innerHTML, className, id) {
		return Util.make("h2", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h3: function (innerHTML, className, id) {
		return Util.make("h3", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h4: function (innerHTML, className, id) {
		return Util.make("h4", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h5: function (innerHTML, className, id) {
		return Util.make("h5", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	h6: function (innerHTML, className, id) {
		return Util.make("h6", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	strong: function (innerHTML, className, id) {
		return Util.make("strong", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	em: function (innerHTML, className, id) {
		return Util.make("em", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	pre: function (innerHTML, className, id) {
		return Util.make("pre", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},
	text: function (text) {
		return document.createTextNode(text);
	},
	/*
	 * This function takes rows and cols as additional arguments
	 */
	textarea: function (innerHTML, className, id, rows, cols) {
		return Util.make("textarea", {
			innerHTML: innerHTML,
			className: className,
			id: id,
			rows: rows,
			cols: cols,
		});
	},

	ul: function (innerHTML, className, id) {
		return Util.make("ul", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	ol: function (innerHTML, className, id) {
		return Util.make("ol", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	li: function (innerHTML, className, id) {
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
	img: function (src, className, id) {
		className = (className || "");
		className = "quizimg" + (className.length > 0 ? " " : "") + className;
		return Util.make("img", {
			src: mediaLocations.img + src,
			className: className,
			id: id,
		});
	},

	/*
	 * Does not take any arguments
	 */
	br: function () {
		return Util.make("br");
	},

	/*
	 * Takes a src, class, id and a bool for controls. controls defaults to
	 * true. src is relative to the dir you defined in mediaLocations
	 */
	video: function (src, controls, className, id, preload) {
		controls = (typeof controls !== "undefined") ? controls : true;
		preload = (typeof preload !== "undefined") ? preload : "metadata";
		if (video[src]) {
			return video[src];
		}
		var result = Util.make("video", {
			src: mediaLocations.video + src,
			controls: controls,
			className: className,
			id: id,
			preload: preload,
		});
		video[src] = result;
		return result;
	},

	/*
	 * Takes a src, class, id and a bool for controls. controls defaults to
	 * true. src is relative to the dir you defined in mediaLocations
	 */
	audio: function (src, controls, className, id) {
		controls = (typeof controls !== "undefined") ? controls : true;
		if (audio[src]) {
			return audio[src];
		}
		var result = Util.make("audio", {
			src: mediaLocations.audio + src,
			controls: controls,
			className: className,
			id: id,
		});
		audio[src] = result;
		return result;
	},

	canvas: function (height, width, className) {
		return Util.make("canvas", {
			height: height,
			width: width,
		});
	},

	form: function (innerHTML, className, id) {
		return Util.make("form", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	input: function (type, className, id, value, oninput, onEnter) {
		onEnter = (typeof onEnter === "undefined") ? function () {} : onEnter;
		return Util.make("input", {
			type: type,
			className: className,
			id: id,
			value: value,
			oninput: oninput,
			onkeydown: function (e) {
				if (e.keyCode === 13) {
					onEnter(e);
				}
			}
		});
	},
	regMatch: function (str, reg) {
		var match = str.match(reg);
		if (!match) return false;
		return match[0] == str;
	},
	button: function (value, onClick, className, id) {
		return Util.make("input", {
			type: "button",
			value: value,
			className: className,
			id: id,
			onclick: onClick,
			disabled: (onClick) ? false : true,
		});
	},

	file: function (value, filetypes, className, id, onchange) {
		value = (typeof value === "undefined") ? "File Upload" : value;
		var label = Util.label();
		label.appendChild(Util.span(value));
		label.input = Util.make("input", {
			type: "file",
			accept: filetypes,
			className: className,
			id: id,
			onchange: onchange
		});
		label.appendChild(label.input);
		return label;
	},

	filebutton: function (value, accept, className, onAccept) {
		var file = Util.file(accept, className);
		file.onClick = onAccept; //TODO: if the user selects a file, add the name to the JSON.
		//TODO: This really is not a file browser at all.  Maybe we should just browse a list of strings that are already on the server?
		return Util.button(value, className, null, function () {
			var w = Util.popup(0, 0, 600, 500, 'filebrowser', null);
			w.document.body.appendChild(file);
		});
	},
	select: function (name, multiple, innerHTML, className, id, indexesDisabled) {
		indexesDisabled = indexesDisabled || [];
		if (innerHTML.constructor === Array) {
			var options = document.createDocumentFragment();
			for (var i = 0; i < innerHTML.length; i++) {
				var ind = indexesDisabled.indexOf(i);
				var u = undefined;
				var disabled = (ind != -1) ? true : u;
				options.appendChild(Util.option(innerHTML[i], innerHTML[i], u, u, disabled));
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

	removeSelOption: function (sel, innerHTML) {
		var children = sel.children;
		for (var i = 0; i < children.length; i++) {
			if (children[i].innerHTML == innerHTML) {
				sel.removeChild(children[i]);
				i = children.length;
			}
		}
	},

	addSelOption: function (sel, innerHTML, disabled, after) {
		var u = undefined;
		var opt = Util.option(innerHTML, innerHTML, u, u, disabled);
		var children = sel.children;
		var insertIndex = children.length;
		for (var i = 0; i < children.length; i++) {
			if (children[i].innerHTML == after) {
				insertIndex = i + 1;
			}
			if (children[i].innerHTML == innerHTML) {
				sel.removeChild(children[i]);
			}
		}
		if (insertIndex <= -1 || insertIndex >= children.length) {
			sel.appendChild(opt);
		} else {
			sel.insertBefore(opt, children[insertIndex]);
		}
	},

	sel: function (innerHTML, className, id, indexesDisabled) {
		return Util.select(null, false, innerHTML, className, id, indexesDisabled);
	},

	yesno: function (className, id, onChange) {
		var options = document.createDocumentFragment();
		options.appendChild(Util.option("F", "No"));
		options.appendChild(Util.option("T", "Yes"));
		return Util.make("select", {
			className: className,
			id: id,
			onChange: onChange,
			innerHTML: options
		});
	},

	option: function (value, innerHTML, className, id, disabled) {
		return Util.make("option", {
			value: value,
			innerHTML: innerHTML,
			disabled: disabled,
			className: className,
			id: id,
		});
	},

	optgroup: function (label, innerHTML, className, id) {
		return Util.make("optgroup", {
			label: label,
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	radio: function (value, name, className, id) {
		return Util.make("input", {
			type: "radio",
			value: value,
			name: name,
			className: className,
			id: id,
		});
	},

	checkbox: function (value, name, className, id, checked) {
		return Util.make("input", {
			type: "checkbox",
			value: value,
			name: name,
			className: className,
			id: id,
			checked: checked,
		});
	},

	label: function (htmlFor, innerHTML, className, id) {
		return Util.make("label", {
			htmlFor: htmlFor,
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	code: function (innerHTML, className, id) {
		return Util.make("code", {
			innerHTML: innerHTML,
			className: className,
			id: id,
		});
	},

	/*
	 * Generic <tr> generator. For the use of Util.table(). You probably
	 * shouldn't use this.
	 */
	tr: function (list, th) {
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
	 * trFunction should be used to modify escape characters that you pass in
	 * through the list. It lets you insert any arbitrary formatting to any tr
	 * element based on whatever escape mechanism you choose.
	 */
	table: function (list, header, className, trFunction) {
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

function FileBrowser() {
	this.init();
}

FileBrowser.prototype.init = function () {
	if (!window.localStorage.files)
		window.localStorage.files = "{}";

	this.storage = JSON.parse(window.localStorage.files);
};

FileBrowser.prototype.render = function (data) {
	this.body = document.getElementById("container");
	this.body.appendChild(data);
};

FileBrowser.prototype.savePopup = function (data, saveToSource) {
	this.destroy("file-saver");
	var filesaver = Util.div("file-popup", "file-saver");

	Util.add(filesaver, [
        Util.h3("Save your data", "file-header"),

        Util.input("text", "file-input", null, null, (function (e) {
			this.title = e.target.value;
		}).bind(this), (function (e) {
			this.addFile(this.title, data, saveToSource);
			this.destroy("file-saver");
		}).bind(this)),

        Util.button("Save", (function () {
			this.addFile(this.title, data, saveToSource);
			this.destroy("file-saver");
		}).bind(this), "file-save"),

        Util.button("Cancel", (function () {
			this.destroy("file-saver");
		}).bind(this), "file-cancel")
    ]);
	this.render(filesaver);
};

FileBrowser.prototype.loadPopup = function (cb) {
	this.init();
	this.destroy("file-picker");
	var filepicker = Util.div("file-popup", "file-picker");

	var l = [];

	var func = (function (e) {
		this.destroy("file-picker");
		cb(this.getFile(e.target.value));
	}).bind(this);

	var filenames = Object.keys(this.storage).sort();
	for (var i = 0; i < filenames.length; i++) {
		l.push(Util.button(filenames[i], func, "file-item"));
	}

	var files = Util.div("files");
	Util.add(files, l);

	Util.add(filepicker, [
        Util.h3("File Selector", "file-header"),
        Util.button("Close", (function () {
			this.destroy("file-picker");
		}).bind(this), "file-close"),
        files
    ]);

	this.render(filepicker);
};

FileBrowser.prototype.destroy = function (id) {
	while (document.getElementById(id))
		this.body.removeChild(document.getElementById(id));
};

FileBrowser.prototype.getFile = function (name) {
	return JSON.parse(this.storage[name]);
};


FileBrowser.prototype.addFile = function (name, content, saveToSource) {
	if (saveToSource == 1) {
		this.storage[name] = JSON.stringify(content);
		window.localStorage.files = JSON.stringify(this.storage);
	} else if (saveToSource == 2) {
		var blob = new Blob([JSON.stringify(content)], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, name + ".json");
	}

	if (document.getElementById("file-picker"))
		this.loadPopup();
};

filebrowser = new FileBrowser();


/*
 * Test to output xml. Not totally working yet.
 */
function createXML() {
	return document.implementation.createDocument("", "");
}

function writeXML(xmlObj) {
	xmlParser = new XMLSerializer();
	return '<?xml version="1.0" encoding="UTF-8"?>' + xmlParser.serializeToString(xmlObj);
}

function testXML() {
	var xml = createXML();

	var quiz = Util.make("quiz");
	xml.appendChild(quiz);
	quiz.setAttribute("identifier", "123456");
	quiz.setAttribute("xmlns", "http://canvas.instructure.com/xsd/cccv1p0");
	quiz.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
	quiz.setAttribute("xsi:schemaLocation", "http://canvas.instructure.com/xsd/cccv1p0 http://canvas.instructure.com/xsd/cccv1p0.xsd");

	var title = Util.make("title", {
		innerText: "Scope and Lifetime"
	});
	quiz.appendChild(title);

	var description = Util.make("description", {
		// innerText: "<p>Review of the facts about variables, their lifetimes, and where they can be referenced (scope)</p>"
	});
	quiz.appendChild(description);

	var desc_sub = Util.make("desc_sub", {
		innerText: "I'm a sub field!"
	});
	description.appendChild(desc_sub);

	console.log(writeXML(xml));
}

// testXML();

var url_regex = /#([\w\/]*)?!?(\w*)?\??(.*)?/;


/*
 * post json to a url.
 */
function post(url, payload, callback) {
	payload = JSON.stringify(payload);
	var http = new XMLHttpRequest();
	http.open("POST", location.pathname + url, true);

	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function () {
		if (http.readyState === 4 && http.status !== 200) {
			callback(false, http.response);
		} else if (http.readyState === 4 && http.status === 200) {
			callback(true, http.response);
		}
		return;
	};

	http.send(payload);
}


/*
 * A Url object that keeps track of the state of the url,
 * and allows for programmatic modification of the url.
 * 
 * The global Url object can be access via window.url (url)
 *
 * When making a new Url you can either use the existing url
 * or make a new one. Either way will work.
 */
function Url(url_hash) {
	url_hash = (typeof url_hash === "undefined") ? document.location.hash : url_hash;

	if (url_hash === "") {
		this.hash = "";
		this.url = "/";
		this.view = "";
		this.params = {};
		return;
	}

	var reMatch = url_regex.exec(url_hash);

	if (reMatch === null) {
		console.error("The url parsed was null!");
		console.log(url_hash);
		return;
	}

	this.hash = url_hash;
	this.url = reMatch[1] ? reMatch[1] : "";
	this.view = reMatch[2] ? reMatch[2] : "";
	this.params = this.parseParams(reMatch[3]);
	this.ajax = true;
}

Url.prototype.copy = function () {
	var u = new Url(this.hash);
	u.ajax = this.ajax;
	return u;
};

Url.prototype.load = function (ajax) {
	this.ajax = (typeof (ajax) === "undefined") ? true : ajax;

	this.buildHash();

	if (document.location.hash !== this.hash) {
		document.location.hash = this.hash;
	} else {
		loadPage();
	}
	url = this;
};

Url.prototype.parseParams = function (params) {
	if (typeof params === "undefined") {
		return {};
	}

	var result = {};
	paramArray = params.split("&");
	for (var i = 0; i < paramArray.length; i++) {
		var temp = paramArray[i].split("=");
		if (temp[0] && temp[1]) {
			result[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
		} else if (temp[0] && !temp[1]) {
			result[decodeURIComponent(temp[0])] = true;
		}
	}
	return result;
};

Url.prototype.buildParams = function () {
	pstr = "?";
	for (var item in this.params) {
		if (typeof this.params[item] !== "boolean") {
			pstr += item + "=" + this.params[item] + "&";
		} else if (typeof this.params[item] === "boolean" && this.params[item] === true) {
			pstr += item + "&";
		}
	}
	return pstr.slice(0, -1);
};

Url.prototype.buildHash = function () {
	this.hash = "#" + this.url;
	if (this.view)
		this.hash += "!" + this.view;
	if (this.params) {
		this.hash += this.buildParams();
	}
};

Url.prototype.addParam = function (key, value) {
	value = (typeof value === "undefined") ? true : value;
	this.params[key] = value;
};

Url.prototype.addParams = function (params) {
	for (var item in params) {
		this.params[item] = params[item];
	}
};

Url.prototype.removeParam = function (arg) {
	delete this.params[arg];
};

Url.prototype.removeAllParams = function () {
	this.params = {};
};

Url.prototype.changeView = function (view) {
	view = (typeof view === "undefined") ? "" : view;
	this.view = view;
};

/**
 * find the element with the id and make it visible
 * currently this function uses jquery but it would be nice to streamline
 */
function scrollToId(id) { //TODO: Fix Jquery madness below
	var element = $('#' + id); //document.getElementById(id);
	var yPos = element.offset().top;
	var xPos = 0;

	// if (yPos > window.innerHeight) {
	//     window.scroll(xPos, yPos);
	// }

	if (yPos > window.innerHeight) {
		$('html,body').animate({
			scrollTop: yPos
		}, 0);
	}
}

function clearPage() {
	document.getElementById("container").innerHTML = "";
	document.getElementById("currentStatus").innerHTML = "";
}

/*
 * Displays an error on the page
 */
function errorStatus(errorCode) {
	var frag = document.createDocumentFragment();
	frag.appendChild(Util.h1("Error: " + errorCode));
	frag.appendChild(Util.p("Please make sure the url you entered in the address bar is correct."));
	document.getElementById("currentStatus").appendChild(frag);
}


function requestAjax(ajax_url, handler, error, url) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState === 4 && ajax.status !== 200) {
			error(ajax.status);
		} else if (ajax.readyState === 4 && ajax.status === 200) {
			handler(ajax.responseText, url);
		}
	};
	ajax.open("GET", ajax_url, true);
	ajax.send();
}

function sendAjax(url) {
//	var ajax = new XMLHttpRequest();
//	ajax.onreadystatechange = function () {
//		if (ajax.readyState === 4 && ajax.status !== 200) {
//			error(ajax.status);
//		} else if (ajax.readyState === 4 && ajax.status === 200) {
//			handler(ajax.responseText, url);
//		}
//	};
//	ajax.open("post", ajax_url, true);
//	ajax.send();
	
	
	$.ajax({
	       url: url,
	       type: 'POST',
	       contentType:'application/json',
	       data: JSON.stringify({ "userName": 'ying', "password" : 'zhao' }),
	       dataType:'json',
	       success: function () {

	           alert("Thanks!"); 
	           }
	});
}

function getPrefs(ajax_url, error, url) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState === 4 && ajax.status !== 200) {
			error(ajax.status);
		} else if (ajax.readyState === 4 && ajax.status === 200) {
			prefs = JSON.parse(ajax.responseText);
			console.log(prefs);
		}
	};
	ajax.open("GET", ajax_url, true);
	ajax.send();
}

function handlePage(text) {
	var json = JSON.parse(text);
	page = new window[json.type](json.payload);
	page.exec();
	GoToOldScrollPosition();
}

var url = oldUrl = new Url();

function loadPage(e) {
	oldUrl = url.copy();
	url = new Url(location.hash);
	if (url.url === "/") {
		url.url = "/index";
	}
  var location_pathname = location.pathname.split("/");
  location_pathname.pop();
  location_pathname = location_pathname.join("/") + "/";
	var ajax_url;
	if (location.pathname === "/") {
		ajax_url = url.url + Util.SERVER_SUFFIX + url.buildParams(); // name of dynamic file
	} else {
		//        ajax_url = location.pathname + url.url.slice(1) + "_ajax.jsp" + url.buildParams(); // name of dynamic file
		//Dov: why the slice?
		ajax_url = location_pathname + url.url.slice(1) + Util.SERVER_SUFFIX + url.buildParams(); // name of dynamic file
	}
	console.log(ajax_url);
	if (prefs === null) {
		getPrefs("demos/prefs" + Util.SERVER_SUFFIX);
	}
	if (oldUrl.ajax) {
		clearPage();
		requestAjax(ajax_url, handlePage, errorStatus, url);
	}

	oldUrl = url.copy();
}

function captureScroll(e) {
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	window.sessionStorage.scrollLocation = JSON.stringify({
		top: top,
		left: left,
	});
}

SCROLL_SECONDS_AFTER_RELOAD = 200;

function GoToOldScrollPosition() {
	setTimeout(function () {
		if (sessionStorage.scrollLocation) {
			var scrollLocation = JSON.parse(sessionStorage.scrollLocation);
			var top = scrollLocation.top;
			var left = scrollLocation.left;
			window.scroll(left, top);
		}
	}, SCROLL_SECONDS_AFTER_RELOAD);
}

var prefs = null;
var page;

// If the link clicked is the current page, reload the page.
// This is the expected behavior, but because we're using hashes,
// we can't register these clicks any other way
var lastClicked;

function setLastClicked(e) {
	if (lastClicked === e.target) {
		loadPage(e);
	} else {
		lastClicked = e.target;
	}
}

// Adds an onclick function to all <a> tags.
function loadOnce(e) {
	var aList = document.links;
	for (var i = 0; i < aList.length; i++) {
		if (aList[i].hostname === document.domain) { // Same domain links only
			aList[i].onclick = setLastClicked;
			if (aList[i].hash === location.hash) { // Our current page
				lastClicked = aList[i];
			}
		}
	}

	// resume regular loading
	loadPage(e);
}

// loadOnce();
window.onload = loadOnce;
window.onhashchange = loadPage;
window.onscroll = captureScroll;



function PagePrinter() {
	this.doc = new jsPDF('p', 'pt', [768, 1086]);
	this.scale = this.doc.internal.scaleFactor;
	this.pageHeight = this.scale * this.doc.internal.pageSize.height;
	this.pageWidth = this.scale * this.doc.internal.pageSize.width;
	this.widthLeft = this.pageWidth;
	this.heightLeft = this.pageHeight;


	this.currentFontSize = 12;
	this.doc.setFontSize(this.currentFontSize);
	this.currentFontHeight = this.doc.getTextDimensions("|").h
	this.currentDocTop = -1;

	/*this.doc.fromHTML($('body').get(0), 15, 15, {
	      'width': 170
	  });*/
}
PagePrinter.handlers = {
	img: function (self, element, x, y, width, height, computedStyle) {

		self.doc.addImage(element, x, y);
		return true;
	},
	input: function (self, element, x, y, width, height, computedStyle) {
		if (element.type.toLowerCase() == "radio") {
			self.doc.circle(x + width / 2, y + height / 2, width / 2, "stroke");
		} else if (element.type.toLowerCase() == "checkbox") {
			self.doc.rect(x, y, width, height, "stroke");
		}
		return true;

	},
	textarea: function (self, element, x, y, width, height, computedStyle) {
		var text = element.value;
		self.setFont(computedStyle);
		var textHeight = self.doc.getTextDimensions(text).h;
		//self.doc.rect(x, y, width, height, "stroke");
		self.doc.text(text, x, y + self.currentFontHeight);
		return false;
	},
	span: function (self, element, x, y, width, height, computedStyle) {

		return true;
	}
};
PagePrinter.prototype.printElementBoarders = function (element, x, y, width, height, computedStyle) {
	var bottom = parseInt(computedStyle.borderBottomWidth),
		top = parseInt(computedStyle.borderTopWidth),
		left = parseInt(computedStyle.borderLeftWidth),
		right = parseInt(computedStyle.borderRightWidth);

	if (bottom && top && left && right) {
		this.doc.rect(x, y, width, height, "stroke");
	} else {
		if (bottom) {
			this.doc.line(x + width, y + height, x, y + height);
		}
		if (top) {
			this.doc.line(x + width, y, x, y);
		}
		if (left) {
			this.doc.line(x, y + height, x, y);
		}
		if (right) {
			this.doc.line(x + width, y + height, x + width, y);
		}
	}
};

PagePrinter.prototype.printElement = function (element, shouldCareHeight) {
	var clientRect = element.getBoundingClientRect();
	if (clientRect) {
		var computedStyle = getComputedStyle(element);
		if (computedStyle.display == "none")
			return false;
		var x = clientRect.left / this.scale;
		var y = clientRect.top / this.scale - this.currentDocTop;
		if (this.currentDocTop < 0) {
			this.currentDocTop = y - 10 / this.scale;
			y = 10 / this.scale;
		}
		var height = clientRect.height / this.scale;
		var width = clientRect.width / this.scale;
		if (shouldCareHeight) {
			this.heightLeft = this.pageHeight - height - y;
			if (this.heightLeft < 0) {
				this.currentDocTop = y + this.currentDocTop - 10 / this.scale;
				y = 10 / this.scale;
				this.doc.addPage();
				this.heightLeft = this.pageHeight;
			}
		}
		this.doc.setDrawColor(0);
		this.doc.setFillColor(1);
		//console.log(x + ":" + y + ":" + width + ":" + height);
		if (PagePrinter.handlers[element.nodeName.toLowerCase()]) {
			if (!PagePrinter.handlers[element.nodeName.toLowerCase()](this, element, x, y, width, height, computedStyle)) {
				return false;
			}
		}
		this.printElementBoarders(element, x, y, width, height, computedStyle);
		this.printChildText(element, x, y, width, height, computedStyle);

	}
};
PagePrinter.prototype.setFont = function (computedStyle) {
	var fontName = (computedStyle.fontFamily).split(",")[0].trim();
	var fontSize = parseFloat(computedStyle.fontSize);
	this.doc.setFontSize(fontSize);
	var fontStyle = computedStyle.fontStyle;
	this.doc.setFont(fontName, fontStyle);
	this.currentFontSize = fontSize;
	this.currentFontHeight = this.doc.getTextDimensions("|").h
};
PagePrinter.prototype.printChildText = function (element, x, y, width, height, computedStyle) {
	var children = element.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType == 3) {
			var textHeight = this.doc.getTextDimensions(children[i].textContent).h;
			if (children[i].textContent.indexOf("\n") == -1) {
				this.setFont(computedStyle);
				this.doc.text(children[i].textContent, x, y + this.currentFontHeight);
			} else {
				var ary = children[i].textContent.split("\n");
				for (var j = ary.length - 1; j >= 0; j--) {
					var span = document.createElement("SPAN");
					span.textContent = ary[j];
					if (j != ary.length - 1) {
						element.insertAdjacentElement('afterEnd', document.createElement("br"));
					}
					element.insertAdjacentElement('afterEnd', span);
				}
				element.removeChild(children[i--]);
			}

			//console.log(textHeight +":"+height);
		} else {
			this.printElement(children[i]);
		}
	}
};
PagePrinter.prototype.print = function () {
	this.widthLeft = this.pageWidth;
	this.heightLeft = this.pageHeight;
	document.body.classList.add("printing");
	document.body.style.width = this.pageWidth + "px";
	window.scrollTo(0, 0);

	this.printElement(document.body.getElementsByClassName("header")[0], true);
	var questionsSets = document.getElementsByClassName("questions");
	for (var i = 0; i < questionsSets.length; i++) {
		var currentQuestionSet = questionsSets[i];
		var questions = currentQuestionSet.getElementsByClassName("qc");
		for (var j = 0; j < questions.length; j++) {
			var question = questions[j];
			//var computedStyle = getComputedStyle(question);
			//console.log(computedStyle.height);
			this.printElement(question, true);
		}
	}
	document.body.removeAttribute("style");
	document.body.classList.remove("printing");
	this.doc.save();
};