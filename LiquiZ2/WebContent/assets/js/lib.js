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

video = {};
audio = {};
mediaLocations = {
    img: "assets/img/",
    audio: "assets/audio/",
    video: "assets/video/",
};

Util = {
    dump: function(obj) {
        console.warn(JSON.stringify(obj, null, 3));
    },

    add: function(parent, children) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < children.length; i++)
            fragment.appendChild(children[i]);
        parent.appendChild(fragment);
    },
    
    divadd: function(className) {
    var div = Util.div(className);
    for (var i = 1; i < arguments.length; i++)
            div.appendChild(arguments[i]);
        return div;
    },
    
    goToId: function(id) {
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
    make: function(tag, obj) {
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
     * Takes a src, class, id and a bool for controls. controls defaults to
     * true. src is relative to the dir you defined in mediaLocations
     */
    video: function(src, controls, className, id, preload) {
        controls = (typeof controls !== "undefined") ? controls: true;
        preload = (typeof preload !== "undefined") ? preload: "metadata";
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
    audio: function(src, controls, className, id) {
        controls = (typeof controls !== "undefined") ? controls: true;
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

    input: function(type, className, id, value, oninput, onEnter) {
        return Util.make("input", {
            type: type,
            className: className,
            id: id,
            value: value,
            oninput: oninput,
            onkeydown: function(e) {
                if (e.keyCode === 13) {
                    onEnter(e);
                }
            }
        });
    },

    button: function(value, onClick, className, id) {
            return Util.make("input", {
                type: "button",
                value: value,
                className: className,
                id: id,
                onclick: onClick,
                disabled: (onClick) ? false: true,
            });            
    },

    file: function(value, accept, className, id) {
        value = (typeof value === "undefined") ? "File Upload" : value;
        var label = Util.label();
        label.appendChild(Util.span(value));
        label.input = Util.make("input", {
            type: "file",
            accept: accept,
            className: className,
            id: id,
        });
        label.appendChild(label.input);
        return label;
    },

    filebutton: function(value, accept, className, onAccept) {
    var file = Util.file(accept, className);
    file.onClick = onAccept; //TODO: if the user selects a file, add the name to the JSON.
    //TODO: This really is not a file browser at all.  Maybe we should just browse a list of strings that are already on the server?
    return Util.button(value, className, null, function() {
        var w = Util.popup(0,0, 600, 500, 'filebrowser', null);
        w.document.body.appendChild(file);
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

    sel: function (innerHTML, className, id) {
	return Util.select(null, false, innerHTML, className, id);
    },

    yesno: function(className, id, onChange) {
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
     * Generic <tr> generator. For the use of Util.table(). You probably
     * shouldn't use this.
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
     * trFunction should be used to modify escape characters that you pass in
     * through the list. It lets you insert any arbitrary formatting to any tr
     * element based on whatever escape mechanism you choose.
     */
    table: function(list, header, className, trFunction) {
        header = (typeof header !== "undefined") ? header: false;
        trFunction = (typeof trFunction !== "undefined") ? trFunction: Util.tr;
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
    if (!window.localStorage.files)
        window.localStorage.files = "{}";

    this.storage = JSON.parse(window.localStorage.files);
}

FileBrowser.prototype.render = function(data) {
    this.body = document.getElementById("container");
    this.body.appendChild(data);
};

FileBrowser.prototype.savePopup = function(data) {
    this.destroy("file-saver");
    var filesaver = Util.div("file-popup", "file-saver");

    Util.add(filesaver, [
        Util.h3("Save your data", "file-header"),

        Util.input("text", "file-input", null, null,
            (function(e) {
                this.title = e.target.value;
            }).bind(this),
            (function(e) {
                this.addFile(this.title, data);
                this.destroy("file-saver");
            }).bind(this)),

        Util.button("Save", (function() {
            this.addFile(this.title, data);
            this.destroy("file-saver");
        }).bind(this), "file-save"),

        Util.button("Cancel", (function() {
            this.destroy("file-saver");
        }).bind(this), "file-cancel")
    ]);
    this.render(filesaver);
};

FileBrowser.prototype.loadPopup = function(cb) {
    this.destroy("file-picker");
    var filepicker = Util.div("file-popup", "file-picker");

    var l = [];

    var func = (function(e) {
        this.destroy("file-picker");
        cb(JSON.parse(this.storage[e.target.value]));
    }).bind(this);

    var filenames = Object.keys(this.storage).sort();
    for (var i = 0; i < filenames.length; i++) {
        l.push(Util.button(filenames[i], func, "file-item"));
    }

    var files = Util.div("files");
    Util.add(files, l);

    Util.add(filepicker, [
        Util.h3("File Selector", "file-header"),
        Util.button("Close", (function() {
            this.destroy("file-picker");
        }).bind(this), "file-close"),
        files
    ]);

    this.render(filepicker);
};

FileBrowser.prototype.destroy = function(id) {
    while (document.getElementById(id))
        this.body.removeChild(document.getElementById(id));
};

FileBrowser.prototype.addFile = function(name, content) {
    this.storage[name] = JSON.stringify(content);
    window.localStorage.files = JSON.stringify(this.storage);

    if (document.getElementById("file-picker"))
        this.loadPopup();
};

filebrowser = new FileBrowser();


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

testXML();

var url_regex = /#([\w\/]*)?!?(\w*)?\??(.*)?/;


function post(url, payload, callback) {
    payload = JSON.stringify(payload);
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
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
    url_hash = (typeof url_hash === "undefined") ? document.location.hash: url_hash;

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
    this.url = reMatch[1] ? reMatch[1]: "";
    this.view = reMatch[2] ? reMatch[2]: "";
    this.params = this.parseParams(reMatch[3]);
    this.ajax = true;
}

Url.prototype.copy = function() {
    var u = new Url(this.hash);
    u.ajax = this.ajax;
    return u;
};

Url.prototype.load = function(ajax) {
    this.ajax = (typeof(ajax) === "undefined") ? true: ajax;

    this.buildHash();

    if (document.location.hash !== this.hash) {
        document.location.hash = this.hash;
    } else {
        loadPage();
    }
    url = this;
};

Url.prototype.parseParams = function(params) {
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

Url.prototype.buildParams = function() {
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

Url.prototype.buildHash = function() {
    this.hash = "#" + this.url;
    if (this.view)
        this.hash += "!" + this.view;
    if (this.params) {
        this.hash += this.buildParams();
    }
};

Url.prototype.addParam = function(key, value) {
    value = (typeof value === "undefined") ? true: value;
    this.params[key] = value;
};

Url.prototype.addParams = function(params) {
    for (var item in params) {
        this.params[item] = params[item];
    }
};

Url.prototype.removeParam = function(arg) {
    delete this.params[arg];
};

Url.prototype.removeAllParams = function() {
    this.params = {};
};

Url.prototype.changeView = function(view) {
    view = (typeof view === "undefined") ? "": view;
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

function errorStatus(errorCode) {
    var frag = document.createDocumentFragment();
    frag.appendChild(Util.h1("Error: " + errorCode));
    frag.appendChild(Util.p("Please make sure the url you entered in the address bar is correct."));
    document.getElementById("currentStatus").appendChild(frag);
}

function handlePage(text, url) {
    var json = JSON.parse(text);
    page = new window[json.type](json.payload);
    loadView(url);
}

function requestAjax(ajax_url, handler, error, url) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status !== 200) {
            error(ajax.status);
        } else if (ajax.readyState === 4 && ajax.status === 200) {
            handler(ajax.responseText, url);
        }
        return;
    };
    ajax.open("GET", ajax_url, true);
    ajax.send();
}

function loadView(url) {
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

    var ajax_url;
    if (location.pathname === "/") {
        ajax_url = url.url + "_ajax.jsp" + url.buildParams(); // name of dynamic file
    } else {
        ajax_url = location.pathname + url.url.slice(1) + "_ajax.jsp" + url.buildParams(); // name of dynamic file
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
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    window.sessionStorage.scrollLocation = JSON.stringify({
        top: top,
        left: left,
    });
}

SCROLL_SECONDS_AFTER_RELOAD = 200;
function GoToOldScrollPosition() {
    setTimeout(function() {
        if (sessionStorage.scrollLocation) {
            var scrollLocation = JSON.parse(sessionStorage.scrollLocation);
            var top = scrollLocation.top;
            var left = scrollLocation.left;
            window.scroll(left, top);        
        }
    }, SCROLL_SECONDS_AFTER_RELOAD);
}

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
