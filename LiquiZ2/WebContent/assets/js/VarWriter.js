/*
 * Author: Stephen Oro
 * Makes a "VarWriter" that will allow any kind of variable to be inserted by name.
 *
 * Overall: The VarWriter must
 * Look like a text editing area, and be editable. Must not look broken ever
 * Accept paste events
 * Be able to list variables used that do not exist and:
 * 		check if a variable exists.
 * Convert existing variables to html.
 * Detect tags that are typed or pasted.
 * Not interfere with non-variable based use of keyword "$...$" vs "$100 $200"
 * 
 * answers and save 
 *
 *
 * Solution(s):
 * 
 * 
 */



/*
 * interface: 
 * VarWriter(innerHTML, className, id, width, height)
 *
 * this.checkTag(tagname)
 *	return - js value associated or undefined if not found
 *	tagname - what is inside "$" tags e.g. $tagname$
 *	
 * this.tagToHTML(tag, tagname)
 *	return - HTML element value of tag
 *	tag - HTML tag div of class variablewriter (created by appendVar)
 *	
 * this.convertToHTML(div)
 *	converts all variable tags divs in an ancestor 'div' to their HTML values
 *	
 * this.unknownVariables()
 *	return - array of un unknown tag values as strings
 *	
 * this.appendVar(match)
 *	return - html div element of class variablewriter
 *	
 * this.tagMatch(node,index)
 *	searches within node's textcontent backwards from index
 *	return - false - if no tag found
 *	return - tagname - if tag found
 *	
 * this.valueOf()
 *	return div with html representing the values of evaluated text content
 *	
 * this.keyDown(e)
 *	checks to see if needs to wrap with a tag
 *	or create/delete a tag
 *
 * this.bubbleHasClass(node, className)
 *	returns true if any parent node has the searched class
 * 
 * 
 */

function VarWriter(innerHTML, className, id, width, height) {
	var div = Util.div(className, id);
	div.style.minHeight = "100px";
	div.style.width = "600px";
	div.style.backgroundColor = "#ffffff";
	div.style.display = "inline-block";
	div.contentEditable = "true";
	div.style.textAlign = "left";
	div.style.fontFamily = "monospace";
	this.div = div;
	div.varWriter = this;
	div.addEventListener("keydown", (this.keyDown).bind(this));
	//div.addEventListener("paste",(this.paste).bind(this));
	div.valueOf = (this.valueOf).bind(this);
	this.index = 0;
	this.tags = [];
	return div;
}

var variablePolicy = new PolicyDef("Variable", {
	rand1: new RandInt(1, 11, 2),
	rand2: new RandInt(12, 20, 1)
}, {
	rand3: new RandFloat(1.0, 5.0, 0.1),
	rand4: new RandFloat(1.0, 2.0, 1 / 3),
	rand5: new RandWord(["hello", 0, "test", 0, "goodbye", 0, "alpha", 0]),
	rand6: new RandListElement([2, 3, 5, 7, 11, 13, 17]),
	rand7: new RandListElement(["Stephen", "Yijin", "Asher", "Ethan"]),
	carith: new RandString(["+", "-", "/", "*", "%"]),
	modops: new RandString(["+=", "-=", "/=", "*=", "%="]),
	comparators: new RandString([">=", "<=", "==", "<", ">"])
});

QuizPolicies.add(variablePolicy);

ReservedVariables = {
	ans: {
		toHTML: function (ids) {
			return Util.input('text', 'fillin', "ans-" + (ids.next++));
		}
	}
};

VarWriter.prototype.checkTag = function (tagname) {
	var search = ReservedVariables[tagname];
	if (search) return search;
	search = variablePolicy.search(tagname);
	//if(!search)
	//variablePolicy.local[tagname] = null;
	return search;
};

VarWriter.prototype.tagToHTML = function (tag, tagname) {
	var html = this.checkTag(tagname);
	if (html) {
		tag.innerHTML = "";
		tag.removeAttribute("class");
		tag.appendChild(html.toHTML(this.ids));
		return true;
	}
	return false;
};

VarWriter.prototype.convertToHTML = function (div) {
	var tags = div.getElementsByClassName("writervariable");
	var i = 0;
	this.ids = {
		next: 0
	};
	while (i < tags.length) {
		var tag = tags[i];
		if (!this.tagToHTML(tag, tag.children[0].textContent))
			i++;
	}
};

/*
VarWriter.prototype.paste = function(){
	var index = 0;
	var string = 
	while(index != -1){
		index = 
};*/

VarWriter.prototype.unknownVariables = function () {
	var tags = this.div.getElementsByClassName("writervariable");
	var unknownVars = [];
	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];
		var curVar = tag.children[0].textContent;
		if (!this.checkTag(curVar))
			unknownVars.push(curVar);
	}
	return unknownVars;
};

VarWriter.prototype.appendVar = function (match) {
	match = match.replace("$", "");
	var tag = Util.span(undefined, "writervariable");
	tag.appendChild(document.createTextNode("$"));
	var innerSpan = Util.span(match);
	innerSpan.contentEditable = true;
	tag.appendChild(innerSpan);
	tag.appendChild(document.createTextNode("$"));
	tag.contentEditable = false;
	this.tags.push(tag);
	return tag;
};

VarWriter.prototype.tagMatch = function (node, index) {
	var text = node.textContent;
	for (var i = index - 1; i >= 0; i--) {
		var code = text.charCodeAt(i);
		if (code == 160 || code == 32) {
			return false;
		} else if (code == 36) {
			var match = text.substring(i, index);
			if (match.replace("$", "").length <= 0) {
				return false;
			}
			this.index = i;
			node.textContent = text.substring(0, i) + text.substring(index, text.length);
			return match;
		}
	}
	return false;
};

VarWriter.prototype.valueOf = function () {
	var nDiv = Util.div();
	nDiv.innerHTML = this.div.innerHTML;
	this.convertToHTML(nDiv);
	return nDiv;
};

VarWriter.prototype.keyDown = function (e) {
	var key = e.which;
	var shift = e.shiftKey;
	if (window.getSelection) {
		var sel = window.getSelection();
		var node = sel.anchorNode;
		var writer = node.parentElement.parentElement;
		if (key == 8 && writer.className == "writervariable") {
			var range = sel.getRangeAt(0);
			var startIndex = range.startOffset;
			if ((startIndex == 0 || startIndex == 1) && writer.className == "writervariable") {
				writer.parentElement.removeChild(writer);
				e.preventDefault();
				e.stopPropagation();
				if (this.div.oninput)
					this.div.oninput();
			}
		} else if (key == 52 && shift) {
			var range = sel.getRangeAt(0);
			var startIndex = range.startOffset;
			if (!range.collapsed) {
				var match = range.cloneContents().textContent;
				match = match.replace("$", "");
				var hasCls = this.bubbleHasClass(range.startContainer, "writervariable");
				hasCls = hasCls || this.bubbleHasClass(range.endContainer, "writervariable");
				if (match.length > 0 && !hasCls) {
					range.deleteContents();
					var tag = this.appendVar(match);
					range.insertNode(tag);
					range.selectNode(tag);
					sel.removeAllRanges();
					sel.addRange(range);
					sel.collapseToEnd();
					if (this.div.oninput)
						this.div.oninput();
				}
				e.preventDefault();
				e.stopPropagation();
			} else {
				var match = this.tagMatch(node, startIndex);
				if (match && !this.bubbleHasClass(node, "writervariable")) {
					var tag = this.appendVar(match);
					range.setStart(node, this.index);
					range.setEnd(node, this.index);
					range.insertNode(tag);
					range.selectNode(tag);
					sel.removeAllRanges();
					sel.addRange(range);
					sel.collapseToEnd();
					e.preventDefault();
					e.stopPropagation();
					if (this.div.oninput)
						this.div.oninput();
				}
			}
		}
	}

};

VarWriter.prototype.bubbleHasClass = function (node, className) {
	while (node != this.div) {
		if (node.className == className)
			return true;
		var p = node.parentElement;
		if (node == p)
			return false;
		node = p;
	}
	return false;
};

