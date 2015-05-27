
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
