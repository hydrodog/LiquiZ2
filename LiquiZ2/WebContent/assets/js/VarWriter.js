/*
* Author: Stephen Oro
* Makes a "Clickable Image" that will supply its answer to the quiz.
*
* Overall: The Clickable Image must
* 
*  
* Solution(s):
* 
*/


/*
 * interface: 
 * 
 */

function VarWriter(innerHTML, className, id, width, height){
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
	div.addEventListener("keydown",(this.keyDown).bind(this));
	div.addEventListener("keyup",(this.keyUp).bind(this));
	//div.addEventListener("paste",(this.paste).bind(this));
	div.valueOf = (this.valueOf).bind(this);
	this.index = 0;
	this.tags = [];
	return div;
}

var variablePolicy = new PolicyDef({
	rand1: new RandInt(1,11,2),
	rand2: new RandInt(1,10,2),
	rand3: new RandFloat(1.0,5.0, 0.1),
	rand4: new RandFloat(1.0,2.0, 1/3),
	rand5: new RandWord({"hello":0, "test":0, "goodbye":0, "alpha":0}),
	rand6: new RandListElement([2, 3, 5, 7, 11, 13, 17]),
	rand7: new RandListElement(["Stephen", "Yijin", "Asher", "Ethan"])
});


VarWriter.prototype.checkTag = function(tagname){
	return variablePolicy.search(tagname);
};

VarWriter.prototype.tagToHTML = function(tag, tagname){
	var html = this.checkTag(tagname);
	if(html){
		tag.innerHTML = "";
		tag.removeAttribute("class");
		tag.appendChild(html.toHTML());
		return true;
	}
	return false;
};

VarWriter.prototype.convertToHTML = function(div){
	var tags = div.getElementsByClassName("writervariable");
	var i = 0;
	while(i < tags.length){
		var tag = tags[i];
		if(!this.tagToHTML(tag, tag.children[0].textContent))
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

VarWriter.prototype.unknownVariables = function(){
	var tags = this.div.getElementsByClassName("writervariable");
	var unknownVars = [];
	for(var i = 0; i < tags.length; i++){
		var tag = tags[i];
		var curVar = tag.children[0].textContent;
		if(!this.checkTag(curVar))
			unknownVars.push(curVar);
	}
	return unknownVars;
};

VarWriter.prototype.appendVar = function(match){
	match = match.replace("$","");
	var tag = Util.span(undefined,"writervariable");
	tag.appendChild(document.createTextNode("$"));
	var innerSpan = Util.span(match);
	innerSpan.contentEditable = true;
	tag.appendChild(innerSpan);
	tag.appendChild(document.createTextNode("$"));
	tag.contentEditable = false;
	this.tags.push(tag);
	return tag;
};
VarWriter.prototype.tagMatch = function(node,index){
	var text = node.textContent;
	for(var i = index-1; i >= 0; i--){
		var code = text.charCodeAt(i);
		if(code == 160 || code == 32){
			return false;
		}else if(code == 36){
			var match = text.substring(i,index);
			if(match.replace("$","").length <= 0){
				return false;
			}
			this.index = i;
			node.textContent = text.substring(0,i)+text.substring(index,text.length);
			return match;
		}
	}
	return false;
};
var AAAA = null;
VarWriter.prototype.valueOf = function(){
	var nDiv = Util.div();
	nDiv.innerHTML = this.div.innerHTML;
	this.convertToHTML(nDiv);
	return nDiv;
};
VarWriter.prototype.keyUp = function(e){
	var key = e.which;
	var shift = e.shiftKey;
	if(window.getSelection){
		var sel = window.getSelection();
		var node = sel.anchorNode;
		var writer = node.parentElement;
		var range = sel.getRangeAt(0);
		var startIndex = range.startOffset;
		if(writer.className == "writervariable"){
			if(startIndex == 0 && key == 8){
				writer.parentElement.removeChild(writer);
				e.preventDefault();
				e.stopPropagation();
				if(this.div.oninput)
					this.div.oninput();
			}
		}
	}

};
VarWriter.prototype.keyDown = function(e){
	var key = e.which;
	var shift = e.shiftKey;
	if(window.getSelection){
		var sel = window.getSelection();
		var node = sel.anchorNode;
		var writer = node.parentElement.parentElement;
		if(writer.className == "writervariable"){
			//if needed
		}else if(key == 52 && shift){
			var range = sel.getRangeAt(0);
			var startIndex = range.startOffset;
			if(!range.collapsed){
				var match = range.cloneContents().textContent;
				match = match.replace("$","");
				var hasCls = this.bubbleHasClass(range.startContainer, "writervariable");
				hasCls = hasCls || this.bubbleHasClass(range.endContainer, "writervariable");
				if(match.length > 0 && !hasCls){
					range.deleteContents();
					var tag = this.appendVar(match);
					range.insertNode(tag);
					range.selectNode(tag);
					sel.removeAllRanges();
					sel.addRange(range);
					sel.collapseToEnd();
					if(this.div.oninput)
						this.div.oninput();
				}
				e.preventDefault();
				e.stopPropagation();
			}else{
				var match = this.tagMatch(node,startIndex);
				if(match && !this.bubbleHasClass(node, "writervariable")){
					var tag = this.appendVar(match);
					range.setStart(node,this.index);
					range.setEnd(node,this.index);
					range.insertNode(tag);
					range.selectNode(tag);
					sel.removeAllRanges();
					sel.addRange(range);
					sel.collapseToEnd();
					e.preventDefault();
					e.stopPropagation();
					if(this.div.oninput)
						this.div.oninput();
				}
			}
		}
	}
	
};
VarWriter.prototype.bubbleHasClass = function(node, className){
	while(node != this.div){
		if(node.className == className)
			return true;
		node = node.parentElement;
	}
	return false;
};
