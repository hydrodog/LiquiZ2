/*
MIT license
Copyright (c) <2007> < Steven Levithan >
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


*/

function $ (el) {
	if (el.nodeName) return el;
	if (typeof el === "string") return document.getElementById(el);
	return false;
};
function replaceHtml (el, html) {
	var oldEl = $(el);
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	return newEl;
};

function replaceOuterHtml (el, html) {
	el = replaceHtml(el, "");
	if (el.outerHTML) { // If IE
		var	id = el.id,
			className = el.className,
			nodeName = el.nodeName;
		el.outerHTML = "<" + nodeName + " id=\"" + id + "\" class=\"" + className + "\">" + html + "</" + nodeName + ">";
		el = $(id); // Reassign, since we just overwrote the element in the DOM
	} else {
		el.innerHTML = html;
	}
	return el;
};

function extend (to, from) {
	for (var property in from) to[property] = from[property];
	return to;
};

var	isWebKit = navigator.userAgent.indexOf("WebKit") > -1,
	isIE /*@cc_on = true @*/,
	isIE6 = isIE && !window.XMLHttpRequest;

(function () {

if (window.XRegExp)
	return;

var real = {
	RegExp:  RegExp,
	exec:    RegExp.prototype.exec,
	match:   String.prototype.match,
	replace: String.prototype.replace
};


var re = {
	extended:            /(?:[^[#\s\\]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?)+|(\s*#[^\n\r\u2028\u2029]*\s*|\s+)([?*+]|{[0-9]+(?:,[0-9]*)?})?/g,
	singleLine:          /(?:[^[\\.]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?)+|\./g,
	characterClass:      /(?:[^\\[]+|\\(?:[\S\s]|$))+|\[\^?(]?)(?:[^\\\]]+|\\(?:[\S\s]|$))*]?/g,
	capturingGroup:      /(?:[^[(\\]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?|\((?=\?))+|(\()(?:<([$\w]+)>)?/g,
	namedBackreference:  /(?:[^\\[]+|\\(?:[^k]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?|\\k(?!<[$\w]+>))+|\\k<([$\w]+)>([0-9]?)/g,
	replacementVariable: /(?:[^$]+|\$(?![1-9$&`']|{[$\w]+}))+|\$(?:([1-9]\d*|[$&`'])|{([$\w]+)})/g
};


XRegExp = function (pattern, flags) {
	flags = flags || "";

	if (flags.indexOf("x") > -1) {
		pattern = real.replace.call(pattern, re.extended, function ($0, $1, $2) {
			// Keep backreferences separate from subsequent tokens unless the token is a quantifier
			return $1 ? ($2 || "(?:)") : $0;
		});
	}

	var hasNamedCapture = false;
	if (flags.indexOf("k") > -1) {
		var captureNames = [];
		pattern = real.replace.call(pattern, re.capturingGroup, function ($0, $1, $2) {
			if ($1) {
				if ($2) hasNamedCapture = true;
				captureNames.push($2 || null);
				return "(";
			} else {
				return $0;
			}
		});
		if (hasNamedCapture) {
			// Replace named with numbered backreferences
			pattern = real.replace.call(pattern, re.namedBackreference, function ($0, $1, $2) {
				var index = $1 ? captureNames.indexOf($1) : -1;
				// Keep backreferences separate from subsequent literal numbers
				return index > -1 ? "\\" + (index + 1) + ($2 ? "(?:)" + $2 : "") : $0;
			});
		}
	}

	pattern = real.replace.call(pattern, re.characterClass, function ($0, $1) {
		return $1 ? real.replace.call($0, "]", "\\]") : $0;
	});

	if (flags.indexOf("s") > -1) {
		pattern = real.replace.call(pattern, re.singleLine, function ($0) {
			return $0 === "." ? "[\\S\\s]" : $0;
		});
	}

	var regex = real.RegExp(pattern, real.replace.call(flags, /[sxk]+/g, ""));
	if (hasNamedCapture)
		regex._captureNames = captureNames;
	return regex;
};

RegExp.prototype.exec = function (str) {
	var result = real.exec.call(this, str);
	if (!(this._captureNames && result && result.length > 1))
		return result;
	for (var i = 1; i < result.length; i++) {
		var name = this._captureNames[i - 1];
		if (name)
			result[name] = result[i];
	}
	return result;
};

String.prototype.replace = function (search, replacement) {
	// If search is not a regex which uses named capturing groups, use the native replace method
	if (!(search instanceof real.RegExp && search._captureNames))
		return real.replace.apply(this, arguments);

	if (typeof replacement === "function") {
		return real.replace.call(this, search, function () {
			// Convert arguments[0] from a string primitive to a String object which can store properties
			arguments[0] = new String(arguments[0]);
			// Store named backreferences on arguments[0] before calling replacement
			for (var i = 0; i < search._captureNames.length; i++) {
				if (search._captureNames[i])
					arguments[0][search._captureNames[i]] = arguments[i + 1];
			}
			/* The context object ``this`` is set to the global context ``window`` as it should be with stand-
			alone anonymous functions, although it's unlikely to be used within a replacement function. */
			return replacement.apply(window, arguments);
		});
	} else {
		return real.replace.call(this, search, function () {
			var args = arguments;
			return real.replace.call(replacement, re.replacementVariable, function ($0, $1, $2) {
				// Numbered backreference or special variable
				if ($1) {
					switch ($1) {
						case "$": return "$";
						case "&": return args[0];
						case "`": return args[args.length - 1].slice(0, args[args.length - 2]);
						case "'": return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
						// Numbered backreference
						default:
							/* What does "$10" mean?
							 - Backreference 10, if 10 or more capturing groups exist
							 - Backreference 1 followed by "0", if 1-9 capturing groups exist
							 - Otherwise, it's the string "$10" */
							var literalNumbers = "";
							$1 = +$1; // Cheap type-conversion
							while ($1 > search._captureNames.length) {
								literalNumbers = $1.split("").pop() + literalNumbers;
								$1 = Math.floor($1 / 10); // Drop the last digit
							}
							return ($1 ? args[$1] : "$") + literalNumbers;
					}
				// Named backreference
				} else if ($2) {
					/* What does "${name}" mean?
					 - Backreference to named capture "name", if it exists
					 - Otherwise, it's the string "${name}" */
					var index = search._captureNames.indexOf($2);
					return index > -1 ? args[index + 1] : $0;
				} else {
					return $0;
				}
			});
		});
	}
};

})();
// ...End anonymous function


XRegExp.cache = function (pattern, flags) {
	var key = "/" + pattern + "/" + (flags || "");
	return XRegExp.cache[key] || (XRegExp.cache[key] = new XRegExp(pattern, flags));
};

if (!Array.prototype.indexOf) {
	// JavaScript 1.6 compliant indexOf from MooTools 1.11; MIT License
	Array.prototype.indexOf = function (item, from) {
		var len = this.length;
		for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
			if (this[i] === item)
				return i;
		}
		return -1;
	};
}
var CheckRegex = {
		fields: {
			patternarea: new MatchingArea("patternarea"),
			matcharea:  new MatchingArea("matcharea"),
			options: {
				flags: {
					g: $("flagG"),
					m: $("flagM")

				},
				highlightSyntax:  $("highlightSyntax"),
				highlightMatches: $("highlightMatches")
			}
		}
};

function specificAnswertest(){

	var Rp = CheckRegex.fields.patternarea.textbox.value;
	if (document.getElementById("testing").checked) {
		var newRp = "^"+ Rp + "$";
		CheckRegex.fields.patternarea.textbox.value = newRp;
	}
	else{
		var prevRp = Rp.substr(1, Rp.length-2);
		CheckRegex.fields.patternarea.textbox.value = prevRp ;
	}
}
function PatternChecktest(){

	var textArea = CheckRegex.fields.matcharea.textbox.value;
	var strings = textArea.split('\n');
	var expression = CheckRegex.fields.patternarea.textbox.value;
	var regex = new RegExp(expression);
	document.testPatterns.matched.value = "";
	document.testPatterns.notMatched.value ="";

	for(var i=0;i<strings.length;i++){
		if (strings[i].match(regex) )
		{		
			document.testPatterns.matched.value += strings[i] + "\n";
		} else {		
			document.testPatterns.notMatched.value += strings[i] + "\n";
		}
	}
}

extend(CheckRegex, function () {
	opts = CheckRegex.fields.options;
	return {
		highlightMatches: function () {
			var captureGroup=/`~\{((?:[^}]+|\}(?!~`))*)\}~`((?:[^`]+|`(?!~\{(?:[^}]+|\}(?!~`))*\}~`))*)(?:`~\{((?:[^}]+|\}(?!~`))*)\}~`)?/g;
			var captureAternateGroup = /^(?:[^\\|]+|\\[\S\s]?|\|(?=[\S\s]))*/;
			return function () {
				var	patternarea = String(CheckRegex.fields.patternarea.textbox.value),
				matcharea  = String(CheckRegex.fields.matcharea.textbox.value);
				if (
						XRegExp.cache('<[bB] class="?err"?>').test(CheckRegex.fields.patternarea.background.innerHTML) ||
						(!patternarea.length) ||
						!opts.highlightMatches.checked
				) {
					CheckRegex.fields.matcharea.clearbackground();
					return;
				}
				try {
					var searchRegex = new XRegExp(captureAternateGroup.exec(patternarea)[0],
							(opts.flags.g.checked ? "g" : "")+
							(opts.flags.m.checked ? "m" : "") 
					);

				} catch (err) {
					CheckRegex.fields.matcharea.clearbackground();
					return;
				}
				var output = matcharea.replace(searchRegex, "`~{$&}~`");
				output = output
				.replace(XRegExp.cache("[<&>]", "g"), "_")
				.replace(captureGroup, "<b>$1</b>$2<i>$3</i>");

				CheckRegex.fields.matcharea.setbackground(output);
			};
		}(),

		highlightSearchSyntax: function () {
			if (opts.highlightSyntax.checked) {
				CheckRegex.fields.patternarea.setbackground(parseRegex(CheckRegex.fields.patternarea.textbox.value));
			} else {
				CheckRegex.fields.patternarea.clearbackground();
			}
		}
	};
}());

//Matching area functions

function MatchingArea (el) {
	el = $(el);
	var	textboxEl = el.getElementsByTagName("textarea")[0],
	backgroundEl      = document.createElement("pre");

	textboxEl.id = el.id + "Text";
	backgroundEl.id      = el.id + "background";
	el.insertBefore(backgroundEl, textboxEl);
	textboxEl.onkeydown = function (el) {MatchingArea.prototype.onKeyDown(el);};
	textboxEl.onkeyup   = function (el) {MatchingArea.prototype.onKeyUp(el);};
	this.field = el;
	this.textbox = textboxEl;
	this.background = backgroundEl;
};

extend(MatchingArea.prototype, {
	setbackground: function (html) {
		html = html.replace(XRegExp.cache("^\\n"), "\n\n");
		this.background = replaceOuterHtml(this.background, html + "<br>&nbsp;");
		this.setDimensions();
	},
	clearbackground: function () {
		this.setbackground(this.textbox.value.replace(XRegExp.cache("[<&>]", "g"), "_"));
	},

	//Set the new overwriting text area dimensions 
	setDimensions: function () {
		this.textbox.style.width = "";
		var	scrollWidth = this.textbox.scrollWidth,
		offsetWidth = this.textbox.offsetWidth;

		this.textbox.style.width = (scrollWidth === offsetWidth ? offsetWidth - 1 : scrollWidth + 8) + "px";
		this.textbox.style.height = Math.max(this.background.offsetHeight, this.field.offsetHeight - 2) + "px";
	},

	onKeyDown: function (el) {
		el = el || event;
		if (!this.onSpecialKeysPressed(el)) return false;
		var srcEl = el.srcElement || el.target;
		switch (srcEl) {
		case CheckRegex.fields.patternarea.textbox:
			setTimeout(function () {CheckRegex.highlightSearchSyntax.call(CheckRegex);}, 0);
			break;
		}
		//for Opera to fix scrolling bugs 
		if (isWebKit && srcEl.selectionEnd === srcEl.value.length) {
			srcEl.parentNode.scrollTop = srcEl.scrollHeight;
		}
		this.onKeyHold(el);
	},

	onKeyUp: function (el) {
		el = el || event;
		var srcEl = el.srcElement || el.target;
		this.keydownCount = 0; // Reset
		if (this.keyUpMatch) {
			this.keyUpMatch = false; // Reset
			switch (srcEl) {
			case CheckRegex.fields.patternarea.textbox: // fallthru
			case CheckRegex.fields.matcharea.textbox:
				CheckRegex.highlightMatches();
				break;
			}
		}
	},

	onKeyHold: function (el) {
		var srcEl = el.srcElement || el.target;
		this.keydownCount++;
		if (this.keydownCount > 2) {
			CheckRegex.fields.matcharea.clearbackground();
			this.keyUpMatch = true;
		} else {
			switch (srcEl) {
			case CheckRegex.fields.patternarea.textbox: // fallthru
			case CheckRegex.fields.matcharea.textbox:
				setTimeout(function () {CheckRegex.highlightMatches.call(CheckRegex);}, 0);
				break;
			}
		}
	},

	onSpecialKeysPressed: function (el) {
		var	srcEl = el.srcElement || el.target;

		// If the user pressed a key which does not change the matcharea, return false to prevent running a match
		if (this.nonFunctionKeys.indexOf(el.keyCode) > -1)
			return false;

		// If the user pressed tab (keyCode 9) in the patternarea or matcharea fields, override the default behavior
		if ((el.keyCode === 9) && (srcEl === CheckRegex.fields.matcharea.textbox || (srcEl === CheckRegex.fields.patternarea.textbox && !el.shiftKey))) {
			if (srcEl === CheckRegex.fields.matcharea.textbox) {
				if (el.shiftKey) {
					CheckRegex.fields.patternarea.textbox.focus();
				} else {
					// Insert a tab character, overwriting any selected text
					replaceSelection(srcEl, "\t");
					// Opera's tabbing mechanism fires before keydown, so bring back the focus
					if (window.opera)
						setTimeout(function () {srcEl.focus();}, 0);
				}
			} else {
				CheckRegex.fields.matcharea.textbox.focus();
			}

			if (el.preventDefault) el.preventDefault();
			else el.returnValue = false;
		}

		return true;
	},

	keyUpMatch: false,
	keydownCount: 0,
	nonFunctionKeys: [16,17,18,19,20,27,33,34,35,36,37,38,39,40,44,45,112,113,114,115,116,117,118,119,120,121,122,123,144,145]
});


(function () {
	var	opts = CheckRegex.fields.options;

	onresize = function (el) {

		CheckRegex.fields.matcharea.field.style.height = Math.max((window.innerHeight || document.documentElement.clientHeight) - 210, 60) + "px";
		CheckRegex.fields.patternarea.setDimensions();
		CheckRegex.fields.matcharea.setDimensions();
	};
	onresize(); 
	//onload check once if any match is there
	CheckRegex.highlightSearchSyntax();
	CheckRegex.highlightMatches();

	for (var flag in opts.flags) {
		opts.flags[flag].onclick = CheckRegex.highlightMatches;
	}

	opts.highlightSyntax.onclick  = CheckRegex.highlightSearchSyntax;
	opts.highlightMatches.onclick = CheckRegex.highlightMatches;


	function makeResetter (field) {
		return function () {
			field.clearbackground();
			field.textbox.value = "";
			field.textbox.onfocus = null;
		};
	};
	if (CheckRegex.fields.patternarea.textbox.value === "Enter Regular expression here ") {
		CheckRegex.fields.patternarea.textbox.onfocus = makeResetter(CheckRegex.fields.patternarea);
	}
	if (CheckRegex.fields.matcharea.textbox.value === "This is Regex testing area. Input to check what your regex pattern matches") {
		CheckRegex.fields.matcharea.textbox.onfocus = makeResetter(CheckRegex.fields.matcharea);
	}


})();
