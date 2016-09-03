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
 *	tag - HTML tag div of class variablewriter (created by VarWriterAppendVar)
 *	
 * this.convertToHTML(div)
 *	converts all variable tags divs in an ancestor 'div' to their HTML values
 *	
 * this.unknownVariables()
 *	return - array of un unknown tag values as strings
 *	
 * VarWriterAppendVar(match)
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

function vartext(text){
  var output = VarWriterParse2(text);
  return Util.divadd("var-written",output);
}

function Contained(){
  
};



function VarWriter2(text, className) {
  this.container = Util.textarea(text, className);
  Util.applyStyles(this.container, {
    minHeight: "100px",
    maxWidth: "600px",
    width: "600px",
    display: "inline-block",
    textAlign: "left",
    fontFamily: "monospace"
  });
}

VarWriter2.prototype.setValue = function (value) {
  if (typeof value === "string") {
    this.container.value = value;
  } else {
    this.container.value = this.unparse(value);
  }
};

var signOps = /(\*|\/|\+|\-|\||\*|\(|\)|\^|\%|\&|\!|\:|\?|\<\<|\>\>)/g;
var notSignOps = /[^\*|\/|\+|\-|\||\*|\(|\)|\^|\%|\&|\!|\:|\?|\<\<|\>\>]*/g;

VarWriterParse2 = function (value) {
  value = value.split(/(\$[^\s\t\n\$]*\$)/g);
  for (var i = 0; i < value.length; i++) {
    var val = value[i];
    if (val.charAt(0) == "$" && val.charAt(val.length - 1) == "$") {
      val = val.substring(1, val.length - 1);
      if (val.search(signOps) != -1) {
        val = val.replace(notSignOps, function (inner) {
          var search = VarWriterCheckTag(inner);
          if (search)
            return search.valueOf();
          return inner;
        });
        try {
          var temp = eval(val);
          value[i] = temp;
        } catch (e) {
          value[i] = "$error$";
        }
      } else {
        var search = VarWriterCheckTag(val);
        if (search)
          value[i] = search.valueOf();
      }
    }
  }
  return value;
};

VarWriter2.prototype.unparse = function (value) {
  var copy = new Array(value.size);

  for (var i = 0; i < value.length; i++) {
    if (typeof value[i] === "string") {
      copy[i] = value[i];
    } else {
      copy[i] = value[i][1];
    }
  }
  return copy.join("");
};


VarWriter2.prototype.valueOf = function () {
  return ["vartext", this.container.value];
};


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

var variablePolicy = new ScopedDictionary("Variable", {
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

QuizDictionaries.add(variablePolicy);

ReservedVariables = {
  ans: {
    valueOf: function () {
      return {container:Util.input('text', 'fillin')};
    }
  },
  "\\n": {
    valueOf: function () {
      return {container:Util.br()};
    }
  }
};

VarWriterCheckTag = function (tagname) {
  var search = ReservedVariables[tagname];
  if (search) return search;
  search = variablePolicy.search(tagname);
  //if(!search)
  //variablePolicy.local[tagname] = null;
  return search;
};


VarWriterTagToHTML = function (tagname, ids) {
  var html = VarWriterCheckTag(tagname);
  if (html) {
    return (html.toHTML(ids));
  } else {
    var matches = tagname.match(signOps);
    if (matches) {
      var ret = "";
      var splitted = tagname.split(signOps);
      for (var i in splitted) {
        var alt = splitted[i];
        splitted[i] = VarWriterCheckTag(splitted[i]);
        if (splitted[i]) {
          splitted[i] = splitted[i].valueOf();
        } else {
          splitted[i] = alt;
        }
      }

      for (var i = 0; i < splitted.length; i++) {
        var cur = splitted[i];
        if (matches[i])
          cur += matches[i];
        ret += cur;
      }
      try {
        ret = eval(ret);
      } catch (e) {
        console.log("math fail");
      }
      return Util.span(ret);
    } else {
      return VarWriterAppendVar(tagname, true);
    }
  }
};

VarWriter.prototype.convertToHTML = function (div) {
  var rets = [];
  var nDiv = Util.div();
  var children = div.childNodes;
  for (var c = 0; c < children.length; c++) {
    var child = children[c];
    if (child.className == "writervariable") {
      rets.push([child.children[0].textContent]);
    } else if (child.tagName == "BR") {
      rets.push(["\\n"]);
    } else {
      rets.push(child.textContent);
    }
  }
  return rets;
  /*
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
  */
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

VarWriterAppendVar = function (match, notEditable, varWriter) {
  match = match.replace("$", "");
  var tag = Util.span(undefined, "writervariable");
  tag.appendChild(document.createTextNode("$"));
  var innerSpan = Util.span(match);
  if (!notEditable)
    innerSpan.contentEditable = true;
  tag.appendChild(innerSpan);
  tag.appendChild(document.createTextNode("$"));
  tag.contentEditable = false;
  if (varWriter)
    varWriter.tags.push(tag);
  return tag;
};

VarWriter.prototype.tagMatch = function (node, index) {
  var text = node.textContent;
  if (node == this.div || this.bubbleHasClass(node, "writervariable"))
    return false;
  for (var i = index - 1; i >= 0; i--) {
    var code = text.charAt(i);
    if (Util.regMatch(code, /\s/)) {
      return false;
    } else if (Util.regMatch(code, /\$/)) {
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

  return this.convertToHTML(this.div);
};

function indexOfChild(child, children) {
  var len = children.length;
  while (len--)
    if (children[len] == child)
      return len;
  return -1;
}

VarWriter.prototype.keyDown = function (e) {
  var key = e.which;
  var shift = e.shiftKey;
  if (window.getSelection) {
    var sel = window.getSelection();
    var node = sel.anchorNode;
    var writer = node.parentElement.parentElement;
    if (key == 8) {
      var range = sel.getRangeAt(0);
      var startIndex = range.startOffset;
      if ((startIndex == 0 || startIndex == 1) && writer.className == "writervariable") {
        writer.parentElement.removeChild(writer);
        e.preventDefault();
        e.stopPropagation();
        if (this.div.oninput)
          this.div.oninput();
      } else if (startIndex == 0) {
        var parent = node.parentElement;
        var children = parent.childNodes;
        var index = indexOfChild(node, children);
        var suspect = children[index - 1];
        if (index > 0) {
          if (suspect.className == "writervariable") {
            //suspect.parentElement.removeChild(suspect);
            range.selectNode(suspect);
            sel.removeAllRanges();
            sel.addRange(range);
            if (this.div.oninput)
              this.div.oninput();
          }
        }
      } else if (node == this.div) {
        var suspect = node.childNodes[startIndex - 1]
        if (suspect.className == "writervariable") {
          suspect.parentElement.removeChild(suspect);
          e.preventDefault();
          e.stopPropagation();
          if (this.div.oninput)
            this.div.oninput();
        }
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
          var tag = VarWriterAppendVar(match, 0, this);
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
          var tag = VarWriterAppendVar(match, 0, this);
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

function VarWrittenParser(data, type, classOf) {
  var ele = Util[type]();
  Util.append(ele,vartext(data[1]));
  ele.classList.add(classOf);
  return ele;
}