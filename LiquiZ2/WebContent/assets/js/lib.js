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


Util = {
	dump : function(obj) {
		console.warn(JSON.stringify(obj, null, 3));
	},

	popup : function(x, y, w, h, bg) {
		var p = window.open('', '_blank', 'top=' + y + ',left=' + x + ',width='
				+ w + ',height=' + h);
		var pbody = p.document.body;
		pbody.style.backgroundColor = bg;
		pbody.style.border = "solid black 1px";
		var d = p.document.createElement("div");
		d.style.backgroundColor = '#f00';
		d.innerHTML = JSON.stringify(files);
		pbody.appendChild(d);
		return d;
	},

	popupLocalStoreBrowser : function(dir) {
		dir = localStorage[dir];
		console.log('dir=' + dir);
		var files;
		if (typeof (dir) == 'undefined') {
			localStorage.dir = {}; // create empty directory
			files = [];
		} else {
			files = dir.keys().sort();
		}
		var d = Util.popup(100, 100, 500, 500, '0c0');
		d.innerHTML = "Foo!" + files;
	},

	add : function(parent, children) {
		fragment = document.createDocumentFragment();
		for (var i = 0; i < children.length; i++)
			fragment.appendChild(children[i]);
		parent.appendChild(fragment);
	},

	goToId : function(id) {
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
	make : function(tag, obj) {
		// without a valid tag we can't continue
		if (typeof tag === "undefined" || !tag) {
			console.error("Util.make failed with tag: " + tag);
			Util.dump(obj);
			return;
		}
		var element = document.createElement(tag);
		for ( var i in obj) {
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
	span : function(innerHTML, className, id) {
		return Util.make("span", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	div : function(className, id) {
		return Util.make("div", {
			className : className,
			id : id,
		});
	},

	p : function(innerHTML, className, id) {
		return Util.make("p", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	a : function(href, innerHTML, className, id) {
		return Util.make("a", {
			href : href,
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h1 : function(innerHTML, className, id) {
		return Util.make("h1", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h2 : function(innerHTML, className, id) {
		return Util.make("h2", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h3 : function(innerHTML, className, id) {
		return Util.make("h3", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h4 : function(innerHTML, className, id) {
		return Util.make("h4", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h5 : function(innerHTML, className, id) {
		return Util.make("h5", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	h6 : function(innerHTML, className, id) {
		return Util.make("h6", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	strong : function(innerHTML, className, id) {
		return Util.make("strong", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	em : function(innerHTML, className, id) {
		return Util.make("em", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	pre : function(innerHTML, className, id) {
		return Util.make("pre", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	/*
	 * This function takes rows and cols as additional arguments
	 */
	textarea : function(innerHTML, className, id, rows, cols) {
		return Util.make("textarea", {
			innerHTML : innerHTML,
			className : className,
			id : id,
			rows : rows,
			cols : cols,
		});
	},

	ul : function(innerHTML, className, id) {
		return Util.make("ul", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	ol : function(innerHTML, className, id) {
		return Util.make("ol", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	li : function(innerHTML, className, id) {
		return Util.make("li", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	/*
	 * This function takes the src as its first argument instead of innerHTML
	 * src is relative to the dir you defined in mediaLocations
	 */
	img : function(src, className, id) {
		return Util.make("img", {
			src : mediaLocations.img + src,
			className : className,
			id : id,
		});
	},

	/*
	 * Does not take any arguments
	 */
	br : function() {
		return Util.make("br");
	},

	/*
	 * Takes a src, class, id and a bool for controls. controls defaults to
	 * true. src is relative to the dir you defined in mediaLocations
	 */
	video : function(src, controls, className, id) {
		controls = (typeof controls !== "undefined") ? controls : true;
		var result = Util.make("video", {
			src : mediaLocations.video + src,
			controls : controls,
			className : className,
			id : id,
		});
		media.push(result);
		return result;
	},

	/*
	 * Takes a src, class, id and a bool for controls. controls defaults to
	 * true. src is relative to the dir you defined in mediaLocations
	 */
	audio : function(src, controls, className, id) {
		controls = (typeof controls !== "undefined") ? controls : true;
		var result = Util.make("audio", {
			src : mediaLocations.audio + src,
			controls : controls,
			className : className,
			id : id,
		});
		media.push(result);
		return result;
	},

	canvas : function(height, width) {
		return Util.make("canvas", {
			height : height,
			width : width,
		});
	},

	form : function(innerHTML, className, id) {
		return Util.make("form", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	input : function(type, className, id, value, onkeypress) {
		return Util.make("input", {
			type : type,
			className : className,
			id : id,
			value: value,
			onkeypress: onkeypress,
		});
	},

	button : function(value, className, id, onClick) {
		return Util.make("input", {
			type : "button",
			value : value,
			className : className,
			id : id,
			onclick : onClick,
		});
	},

	file : function(accept, className, id) {
		return Util.make("input", {
			type : "file",
			accept : accept,
			className : className,
			id : id,
		});
	},

	select : function(name, multiple, innerHTML, className, id) {
		if (innerHTML.constructor === Array) {
			var options = document.createDocumentFragment();
			for (var i = 0; i < innerHTML.length; i++) {
				options.appendChild(Util.option(innerHTML[i], innerHTML[i]));
			}
			innerHTML = options;
		}
		return Util.make("select", {
			name : name,
			innerHTML : innerHTML,
			className : className,
			id : id,
			multiple : multiple,
		});
	},

	option : function(value, innerHTML, className, id) {
		return Util.make("option", {
			value : value,
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	optgroup : function(label, innerHTML, className, id) {
		return Util.make("optgroup", {
			label : label,
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	radio : function(value, name, className, id) {
		return Util.make("input", {
			type : "radio",
			value : value,
			name : name,
			className : className,
			id : id,
		});
	},

	checkbox : function(value, name, className, id, checked) {
		return Util.make("input", {
			type : "checkbox",
			value : value,
			name : name,
			className : className,
			id : id,
			checked : checked,
		});
	},

	label : function(htmlFor, innerHTML, className, id) {
		return Util.make("label", {
			htmlFor : htmlFor,
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	code : function(innerHTML, className, id) {
		return Util.make("code", {
			innerHTML : innerHTML,
			className : className,
			id : id,
		});
	},

	/*
	 * Generic <tr> generator. For the use of Util.table(). You probably
	 * shouldn't use this.
	 */
	tr : function(list, th) {
		var tr = Util.make("tr");
		for (var i = 0; i < list.length; i++) {
			var tElement;
			if (th) {
				tElement = Util.make("th", {
					scope : "col",
					innerHTML : list[i],
				});
			} else {
				tElement = Util.make("td", {
					innerHTML : list[i],
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
	table : function(list, header, className, trFunction) {
		header = (typeof header !== "undefined") ? header : false;
		trFunction = (typeof trFunction !== "undefined") ? trFunction : Util.tr;
		var result = Util.make("table", {
			className : className,
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

Util.url = {
	load: function() {
		var url = hash.url;
		if (hash.view)
			url += "!" + hash.view;
		if (hash.params) {
			pstr = "?";
			for (var item in hash.params) {
				pstr += item + "=" + hash.params[item] + "&";
			}
			url += pstr.slice(0, -1);
		}
		// document.location.hash = document.location.hash + "??"; // forces a refresh
		if (document.location.hash === "#" + url) {
			loadPage("view_reload");
		} else {
			document.location.hash = url;
		}
	},

	addArg: function(key, value) {
		args = {};
		args[key] = value;
		Util.url.addArgs(args);
	},

	addArgs: function(params) {
		for (var item in params) {
			hash.params[item] = params[item];
		}
	},

	removeArg: function(arg) {
		delete hash.params[arg];
	},

	removeAllArgs: function() {
		for (var item in hash.params){
			delete hash.params[item];
		}
	},

	changeView: function(view) {
		hash.view = view;
	}
};

media = [];
mediaLocations = {
	img : "assets/img/",
	audio : "assets/audio/",
	video : "assets/video/",
}

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

var page;

function processAJAX() {
	if (typeof page.css !== "undefined") {
		appendCSSLink("assets/css/" + page.css + ".css"); // load the user's
		// css skin
	} else {
		console.warn("custom css didn't load. check css link in page.css");
	}
}

function resetMedia() {
	for (var i = 0; i < media.length; i++) {
		media[i].removeAttribute("src");
		media[i].load();
	}
	media = [];
}

function parseParams(params) {
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
}

function parseHash(hash) {
	if (hash === "") {
		return {
			hash : "",
			url : "/",
			view : null,
			params : null,
		};
	}
	var re = /#([\w\/]*)?!?(\w*)?\??(.*)?/;
	var reMatch = re.exec(hash);
	var result = {};

	result.hash = hash;
	result.url = reMatch[1] ? reMatch[1] : null;
	result.view = reMatch[2] ? reMatch[2] : null;
	result.params = parseParams(reMatch[3]);

	return result;
}

function clearPage() {
	document.getElementById("container").innerHTML = "";
	document.getElementById("currentStatus").innerHTML = "";
}

function errorStatus(errorCode) {
	var frag = document.createDocumentFragment();
	frag.appendChild(Util.h1("Error: " + errorCode));
	frag
			.appendChild(Util
					.p("Please make sure the url you entered in the address bar is correct."));
	document.getElementById("currentStatus").appendChild(frag);
}

function handlePage(text, hash) {
	eval("page=" + text);
	loadView(hash);
	processAJAX();
}

function requestAjax(url, handler, error, hash) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status !== 200) {
            error(ajax.status);
        } else if (ajax.readyState === 4 && ajax.status === 200) {
            handler(ajax.responseText, hash);
        }
        return;
    };
    ajax.open("GET", url, true);
    ajax.send();
}

function loadView(hash) {
    if (hash.view) {
        if (page[hash.view])
            page[hash.view](hash.params);
        else
            errorStatus(hash.view + " view doesn't exist!");
    } else {
        page.exec(hash.params);
    }
    GoToOldScrollPosition();
}

var oldHash, hash;
function loadPage(e) {
	var newHash = parseHash(location.hash);
	if (newHash.url === "/") {
		newHash.url = "/index";
	}
	var url = "/LiquiZ2" + newHash.url + "_ajax.jsp"; // name of dynamic file
	hash = newHash;

	resetMedia();
	clearPage();
	if ((!oldHash) || (oldHash.hash === newHash.hash && e !== "view_reload")
			|| (oldHash.url !== newHash.url)) {

		requestAjax(url, handlePage, errorStatus, newHash);

	} else if ((oldHash.view !== newHash.view)
			|| (oldHash.params || newHash.params)) {

		loadView(newHash);
	} else {
		console.error("Unhandled url action!");
		console.error(newHash);
	}

	oldHash = newHash;
}

function captureScroll(e) {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    window.sessionStorage.scrollLocation = JSON.stringify({
        top: top,
        left: left,
    });
}

SCROLL_SECONDS_AFTER_RELOAD = 200;
function GoToOldScrollPosition() {
    setTimeout(function() {
        var scrollLocation = JSON.parse(sessionStorage.scrollLocation);
        var top = scrollLocation.top;
        var left = scrollLocation.left;
        window.scroll(left, top);        
    }, SCROLL_SECONDS_AFTER_RELOAD);
}

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
		if (aList[i].hostname === document.domain) { // Same domain links
			// only
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
