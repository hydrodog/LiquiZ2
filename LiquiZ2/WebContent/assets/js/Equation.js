/*
* Author: Yubin Shen
* Equation support for display and question entry.
*
* Overall: The equation expression is just about two things: 
* 1.what's the container to set your character?(sub/sup/span/div...)
* 2.where is the cursor?(because all you need is to add something before the cursor) 	
*  
* Solution:
* 1.make each character as a element, use CSS to combine the required format
* 2.add hasCursor/empty in className to clarify the cursor's location and mark cursor with a unique id  
*/


/*
 * interface: 
 * Equation.prototype.equationButton		//return a new equation Editor button
 * Equation.prototype.editModeButton(target) {	//return 3 button for edit mode	
 * Equation.prototype.equationBox(target) 	//insert a edit box into target
 * Equation.prototype.buildEquation(qcId) 	//return uneditable equation into qc, remove all events -> uneditable
 */
function Equation(target, btn_set) {
	if (target == null) 
		this.body = document.getElementById("container");	
	else 
		this.body = target;
	console.log(target);
	this.btn_set = [];
	for (var i in btn_set)
    	this.btn_set.push(Equation[btn_set[i]]);
    this.body.className = "equation";
}

Equation.Fraction = {
    "btnLoc" : "button/",
    "btn" : [ "frac.png", "Fraction" ],
    "smallBtnLoc" : "frac/",
    "smallBtn" : [
            {"Fragment" : [ "1.png", "2.png" ]},
            {"Common Fragment" : [ "c1.png", "c2.png", "c4.png", "c5.png" ]} 
            ]
};
Equation.Script = {
	"btnLoc" : "button/",
	"btn" : [ "script.png", "Script" ],
	"smallBtnLoc" : "script/",
	"smallBtn" : [ 
			{"Script" : [ "1.png", "2.png", "3.png", "4.png" ]},
			{"Common Script" : [ "c1.png", "c2.png", "c3.png" ]} 
			]
};
Equation.Radical = {
	"btnLoc" : "button/",
	"btn" : [ "sqrt.png", "Radical" ],
	"smallBtnLoc" : "sqrt/",
	"smallBtn" : [
			{"Script" : [ "1.png", "2.png", "3.png", "4.png" ]},
			{"Common Script" : [ [ "c1.png", 137, 75 ], [ "c2.png", 137, 75 ] ]} 
			]
};
Equation.Integral = {
	"btnLoc" : "button/",
	"btn" : [ "int.png", "Integral" ],
	"smallBtnLoc" : "int/",
	"smallBtn" : [ 
			{"Script" : [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png" ]}
			]
};
Equation.LargeOperator = {
	"btnLoc" : "button/",
	"btn" : [ "sum.png", "Large Operator" ],
	"smallBtnLoc" : "large/",
	"smallBtn" : [ 
			{"Script" : [ "1.png", "2.png", "3.png" ]} 
			]
};
Equation.Bracket = {
	"btnLoc" : "button/",
	"btn" : [ "brackets.png", "Bracket" ],
	"smallBtnLoc" : "brackets/",
	"smallBtn" : [ 
			{"Brackets" : [ "1.png", "2.png", "3.png", "4.png" ]}
			]
};
Equation.Function = {
	"btnLoc" : "button/",
	"btn" : [ "sin.png", "Function" ],
	"smallBtnLoc" : "func/",
	"smallBtn" : [
			{"Function" : [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png" ]},
			{"Common Function" : [ "c1.png", "c2.png", [ "c3.png", 137, 75 ] ]} 
			]
};

Equation.prototype.equationButton = function(name) {		//return a new equation Editor button
	var popId = 'pop'+this.tag.getAttribute("math_id", math_id++);
	var x = Util.div("popup", popId);
	x.setAttribute("isHover", false);
	x.setAttribute("style", "visibility: hidden; display: none;");
	x.addEventListener("mouseover", function(){x.setAttribute("isHover", true);}, false);
	x.addEventListener("mouseout", function(){x.setAttribute("isHover", false);}, false);

	insertInto(x, [insertInto(Util.div("menu_form_header", "popup_drag"), 
					[document.createTextNode("equation Editor"), Util.input("button", "menu_form_exit", popId.slice(1), "X")], false),
					mkToolBtn(Util.div("menu_form_body", "math-tool-box"), this.btn_set)
				]);
	this.body.appendChild(x);
	console.log(x, this.body);
	this.x = x;
	x.target = this.tag;
	console.log(popId);
	
	return Util.button(name, function(){new DivWindow(this.id.slice(1),'popup_drag',this.id.slice(2),'500','125',1);}, "button", 0+popId);
};
Equation.prototype.editModeButton = function(target) {	//insert 3 button for edit mode into target	
	insertInto(this.body, [Util.button("reset", "button", "-1", resetButton), 
           Util.button("edit", "button", "-1", editButton), 
           Util.button("complete", "button", "-1", editButtonEnd)]);
};
Equation.prototype.equationBox = function() {	//insert a edit box into target
	var tag = make("span", {id: "main-math-box", 
		className: "math-expr math-editable empty", 
		style: {fontSize: "20px", backgroundColor: "white"}});
	tag.setAttribute("tabindex", "0"); 		//limitation: if the attribute does not belong to the element, it can't be added into the element by Util.make 
	tag.setAttribute("math_id", math_id++);
	addListener(tag, 1);
	this.tag = tag;
//	target.appendChild(tag);
//	target.appendChild(Util.br());
	return tag;
};
Equation.prototype.exec = function() {
	//add three buttons for teacher's mode 
	//TODO: should be changed when add into Quiz Demo
	this.editModeButton(this.body);
	//the edit div box for equation
	var box = Util.div("", "math-box");
	this.equationBox(box);
	this.body.appendChild(box);
	
	insertInto(this.body, [this.equationButton("equation Editor")]);
};
Equation.prototype.buildEquation = function(tag, qcId) {		//build equation into qc, remove all events -> uneditable
	var elem = tag;
	elemClone = elem.cloneNode(true);
	elemClone.id += qcId;
	elemClone.style.backgroundColor = "transparent";
	console.log(elemClone);
	console.log(parseEquation(elemClone));
	return elemClone;
};


/* Util part, some basic operation for save lines */
// the following two function uses Asher's idea, rewrite make by adding style for use
function make(tag, obj) {
    // without a valid tag we can't continue
    if (typeof tag === "undefined" || !tag) {
        console.log("Util.make failed with \ntag: " + tag +
            "\ninnerHTML: " + obj[innerHTML] +
            "\nclassName: " + obj[className] +
            "\nid: " + obj[id]);
        return;
    }
    var element = document.createElement(tag);
    for (var i in obj) {
        if (typeof obj[i] !== "undefined" && obj[i] !== null)
            if (i === "innerHTML" && obj[i].nodeName) {
                element.appendChild(obj[i]);
            } else if (i === "style") {
            	for (var j in obj[i]) 
            		element.style[j] = obj[i][j];
            } else {
                element[i] = obj[i];
            }
    }
    return element;
}
function div(className, style) {
    return make("div", {
        className: className,
        style: style
    });
}

var math_id = 1;	//math_id is used to identify if the expression is in a equation

function removeElement(elem) {
	elem.parentNode.removeChild(elem);
}
function insertBefore(newElement, targetElement) {
	var parent = targetElement.parentNode;
	parent.insertBefore(newElement, targetElement);
}
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement, targetElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
function insertInto(parent, elem_set, flag) { //append a set of children into parent, if flag exists, then no need to check class name
	for ( var i in elem_set)
		parent.appendChild(elem_set[i]);
	//console.log(parent.nodeType);	//11 = documentfragment
	if (parent.nodeType != 11 && parent.getAttribute("math_id")) {
		if (flag != false)
			checkClassName(parent);
		//console.log(parent);
		parent.focus();
//		parent.setAttribute("hasChild", "true");
	}
	return parent;
}
//TODO: possible to replace by css :active ???
function checkClassName(elem) { //check if the class name should be changed by the cursor position
	if (elem.className.indexOf(" hasCursor") != -1) {
		if (elem.firstChild == null)
			elem.className = elem.className.replace(" hasCursor", " empty");
		else
			elem.className = elem.className.replace(" hasCursor", "");
	} else if (elem.className.indexOf(" empty") != -1) {
		elem.className = elem.className.replace(" empty", " hasCursor");
	} else {
		elem.className = elem.className.concat(" hasCursor");
	}
	/*
	switch (elem.className) {
	case "denominator hasCursor":
		if (elem.firstChild == null)
			elem.className = "denominator empty";
		else 
			elem.className = "denominator";
		break;
	case "denominator empty":
		elem.className = "denominator hasCursor";
		break;
	case "denominator":
		elem.className = "denominator hasCursor";
		break;
	default:
		break;
	}*/
	//console.log("check"+elem.className);
}

/* Operation for cursor */
function createCursor() { //create cursor 
	var tag = document.createElement("span");
	tag.setAttribute("id", "cursor");
	tag.setAttribute("math_id", math_id++);
	var tnode = document.createTextNode("|");
	tag.appendChild(tnode);
	return tag;
}
function removeCursor() {	//remove the cursor and change the className of which the cursor belongs to
	var cursor = document.getElementById("cursor");
	if (cursor != null) {
		var parent = cursor.parentNode;
		removeElement(cursor);
		checkClassName(parent);
	}
}
// the following two function is used for moving cursor 
function insertCursorFront(elem) { //insert element before element's firstChild
	checkClassName(elem);	//because cursor changed, so the className should be changed
	elem.focus();	//focus for next input
	if (elem.firstChild == null)
		elem.appendChild(createCursor());
	else
		insertBefore(createCursor(), elem.firstChild);
}
function insertCursorEnd(elem) { //insert element after element's lastChild
	checkClassName(elem);
	elem.focus();
	if (elem.firstChild == null)
		elem.appendChild(createCursor());
	else
		insertAfter(createCursor(), elem.lastChild);
}

/*Operation for create element*/
function createVar(string) {	//transfer a string to individual VAR element
	var frag = document.createDocumentFragment();
	for (var i in string) {
		var tag = document.createElement("var");
		tag.setAttribute("id", "char");
		tag.setAttribute("math_id", math_id++);
		tag.innerHTML = string[i];
		tag.addEventListener('click', c, false);
		frag.appendChild(tag);
	}
	return frag;
}
Equation.prototype.createExpr = function(type) {
    this.expr[type]();
};
Equation.prototype.expr = {};
Equation.prototype.expr.sub = function() {
	var tnode = document.createElement("sub");
	tnode.setAttribute("tabindex", "0");
	tnode.setAttribute("class", "non-leaf limit empty");
	tnode.setAttribute("math_id", math_id++);
	addListener(tnode, 1);
	return tnode;
};

function createExpr(type) {		//complex expression
	var tnode;
	switch (type) {
// TODO: replace by this.expr[type]
	case "sub":
		tnode = document.createElement("sub");
		tnode.setAttribute("tabindex", "0");
		tnode.setAttribute("class", "non-leaf limit empty");
		tnode.setAttribute("math_id", math_id++);
		addListener(tnode, 1);
		break;
	case "sup":
		tnode = document.createElement("sup");
		tnode.setAttribute("tabindex", "0");
		tnode.setAttribute("class", "non-leaf limit empty");
		tnode.setAttribute("math_id", math_id++);
		addListener(tnode, 1);
		break;
	case "span":
		tnode = document.createElement("span");
		tnode.setAttribute("tabindex", "0");
		tnode.setAttribute("class", "non-leaf empty");
		tnode.setAttribute("math_id", math_id++);
		tnode.setAttribute("edit", "true");
		addListener(tnode, 1);
		break;
	case "sum":
		tnode = document.createElement("span");
		tnode.setAttribute("class", "large-oper");
		tnode.setAttribute("math_id", math_id++);
		tnode.addEventListener('click', c_both, false);
		
		var top = createExpr("span");
		top.setAttribute("class", "align-mid-large-oper");
		top.setAttribute("math_id", math_id++);
		removeListener(top, 1);
		insertInto(top, [ createExpr("span") ], false);
		top.setAttribute("edit", "inside");	//TODO: if there is a better way?
		//top.setAttribute("hasChild", "true");

		var mid = createExpr('\u2211');
		mid.setAttribute("edit", "false");
		removeListener(mid, 2);
		mid.setAttribute("class", "align-mid-large-oper");
		mid.setAttribute("math_id", math_id++);

		var bottom = createExpr("span");
		bottom.setAttribute("class", "bot-align-mid-large-oper");
		bottom.setAttribute("math_id", math_id++);
		removeListener(bottom, 1);
		insertInto(bottom, [ createExpr("span") ], false);
		bottom.setAttribute("edit", "inside");
		//bottom.setAttribute("hasChild", "true");

		insertInto(tnode, [ top, mid, bottom ], false);
		break;
	case "fraction":
		tnode = document.createElement("span");
		tnode.setAttribute("class", "fraction non-leaf");
		tnode.setAttribute("math_id", math_id++);
		tnode.addEventListener('click', c_both, false);

		var top = document.createElement("span");
		top.setAttribute("class", "numerator");
		top.setAttribute("math_id", math_id++);
		top.setAttribute("edit", "inside");
		insertInto(top, [ createExpr("span") ], false);

		var bottom = document.createElement("span");
		bottom.setAttribute("class", "denominator");
		bottom.setAttribute("math_id", math_id++);
		bottom.setAttribute("edit", "inside");
		insertInto(bottom, [ createExpr("span") ], false);

		var space = document.createElement("span");
		space.className = "space-in-frac";
		space.setAttribute("math_id", math_id++);
		space.setAttribute("edit", "false");
		//<span style="display:inline-block;width:0">&#8203;</span>
		insertInto(tnode, [ top, bottom, space ], false);
		break;
	case "subp":	//sub and sup for int
		tnode = document.createElement("span");
		tnode.setAttribute("class", "fraction non-leaf");
		tnode.setAttribute("math_id", math_id++);
		tnode.setAttribute("style", "margin-left: -0.25em;");
		tnode.addEventListener('click', c_onlyRight, false);
		
		var top = document.createElement("span");
		top.setAttribute("class", "top-in-frac");
		top.setAttribute("math_id", math_id++);
		top.setAttribute("edit", "inside");
		top.setAttribute("style", "margin-left: 0.25em;");
		insertInto(top, [createExpr("span")], false);
		
		var mid = document.createElement("span");	//adjust the top location
		mid.innerHTML = " ";
		mid.setAttribute("class", "mid-in-frac");
		mid.setAttribute("math_id", math_id++);
		mid.setAttribute("edit", "false");
		
		var bottom = document.createElement("span");
		bottom.setAttribute("class", "bot-in-frac");
		bottom.setAttribute("math_id", math_id++);
		bottom.setAttribute("edit", "inside");
		insertInto(bottom, [createExpr("span")], false);

		var space = document.createElement("span");
		space.className = "space-in-frac";
		space.setAttribute("edit", "false");
		space.setAttribute("math_id", math_id++);

		//<span style="display:inline-block;width:0">&#8203;</span>
		insertInto(tnode, [ top, mid, bottom, space ], false);
		break;
	case "sqrt":
		tnode = document.createElement("span");
		tnode.setAttribute("class", "non-leaf");
		tnode.addEventListener('click', c_both, false);
		tnode.setAttribute("math_id", math_id++);
		//tnode.setAttribute("style", "position:relative;");
		
		var sup = document.createElement("sup");
		sup.setAttribute("class", "nthroot non-leaf empty");
		sup.setAttribute("math_id", math_id++);
		addListener(sup, 1);
		sup.setAttribute("math_id", math_id++);
		
		var tnode1 = document.createElement("span");
		tnode1.setAttribute("class", "non-leaf");
		tnode1.setAttribute("math_id", math_id++);
		
		var l = document.createElement("div");
		var text = document.createTextNode("\u221A");
		l.appendChild(text);
		l.setAttribute("class", "scaled non-leaf sqrt-prefix");
		//l.setAttribute("style", "top:10%; ");
		l.setAttribute("math_id", math_id++);
		
		var r = document.createElement("span");
		r.setAttribute("class", "sqrt-stem non-leaf empty");
		r.setAttribute("tabindex", "0");
		r.setAttribute("math_id", math_id++);
		addListener(r, 1);
		r.addEventListener('DOMSubtreeModified',changeHeight,false);
		insertInto(tnode1, [l, r], false);
		insertInto(tnode, [sup, tnode1], false);
		break;
	default:
		tnode = document.createElement("big");
		text = document.createTextNode(type);
		tnode.appendChild(text);
		tnode.setAttribute("math_id", math_id++);
		//tnode.setAttribute("edit", "false");
		addListener(tnode, 2);	//TODO: if the bind was meaningful
		break;
	}
	return tnode;
}

/* deal with the position */
function elemOffsetLeft(elem) //just need left boundary
{
	//var t = elem.offsetTop;  
	var l = elem.offsetLeft;
	elem = elem.offsetParent;
	while (elem != null) {
		//t += elem.offsetTop;  
		l += elem.offsetLeft;
		elem = elem.offsetParent;
	} //interative
	return l;
}
function elemOffsetTop(elem) 
{
	var t = elem.offsetTop;  
	elem = elem.offsetParent;
	while (elem != null) {
		t += elem.offsetTop;  
		elem = elem.offsetParent;
	} //interative
	return t;
}
function mousePosition(e) {
	if (e.pageX && e.pageY) {
		return e.pageX;
	}
	var scrollElem = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement
			: document.body;
	return e.clientX + scrollElem.scrollLeft;
}

//deal with the sqrt and bracket scale if the element inside become taller than before
//TODO: I can't find better solution, just compare the old and new height to decide if they should be changed
function changeHeight() {	
	//console.log(this);
	//console.log(this.previousSibling);
	var ratio = this.parentNode.offsetHeight / this.previousSibling.offsetHeight ;	//20 means original height
	//var axis_y = -(this.parentNode.offsetHeight - this.previousSibling.offsetHeight) / 8;
	var axis_y = this.parentNode.offsetTop + this.parentNode.offsetHeight/2 - this.previousSibling.offsetTop - this.previousSibling.offsetHeight/2;
	this.previousSibling.setAttribute("style", "transform:scale(1,"+ratio+");");//matrix(1, 0, 0, "+ ratio + ", 0,"+ 0.9*axis_y +");");
	console.log(this.previousSibling.offsetTop);
	console.log(this.offsetTop);
}

/* teacher mode for editing equation */
function edit() {
	this.style.display = "none";
}
function resetButton() {
	var btn_set = document.getElementsByClassName("math-box-item");
	for (var i in btn_set)
		btn_set[i].style.display = "inline-block";
}
function editButton() {
	var btn_set = document.getElementsByClassName("math-box-item");
	for (var i in btn_set) {
		btn_set[i].removeEventListener('click', btn3, false);
		btn_set[i].addEventListener('click', edit , false);
	}
}
function editButtonEnd() {
	var btn_set = document.getElementsByClassName("math-box-item");
	for (var i in btn_set) {
		if (btn_set[i].style.display != "none") {
			btn_set[i].removeEventListener('click', edit, false);
			btn_set[i].addEventListener('click', btn3, false);
		}
	}
}

/* create equation tool buttons */
function mkToolBtnTop(iconLoc, label) {	//make tool button top part, always visiable
	var btn = insertInto(div("math-button"), [
		 		div("math-button-icon", {background: "url(assets/img/toolbar/" + iconLoc + ")"}),
				insertInto(div("math-button-label"), [
					document.createTextNode(label),
					make("br"),
					div("math-button-sign")
				])		
         	]);
	btn.setAttribute("tabindex","0");
	btn.addEventListener('click', btn1, false);
	btn.addEventListener('blur', btn2, false);
	return btn;
}

function mkToolBtnBot(group_set) {	//make tool button bottom part, visiable when top part is clicked
	var btn = insertInto(div("math-button-mount-point", {display: "none"}), [
		insertInto(div("math-box", {width: "300px", height: "200px"}), [
			insertInto(div("math-box-container"), group_set)
		])
	]);
	return btn;
}

function mkGroup(title, smallBtn_set) {	//make group part in tool button bottom
	var btn = insertInto(div("math-box-group"), [
		insertInto(div("math-box-group-title"), [
			document.createTextNode(title)
		]),
		insertInto(div("math-box-group-container"), smallBtn_set)
	]);
	
	btn.onclick = function(e){e.stopPropagation();};
	return btn;
}

function mkSmallBtn(loc, botton_id, w, h) {	//w means width , h means height, 
	w = w||56;	//default value is 56, same with w == undefined ? 56 : w
	h = h||75;
	var btn = make("div", {className: "math-box-item", style: {background: "url(assets/img/toolbar/" + loc + ")", width: w+"px", height: h+"px"}});
	btn.setAttribute("btn_id", botton_id);
	btn.addEventListener('click', btn3, false);
	return btn;
}
function mkToolBtn(parent, btn_set) { //make the whole btn and append to parent
	for ( var i in btn_set) {
		var group_set = [];
		for ( var j in btn_set[i]["smallBtn"]) {
			var smallBtn_set = [];
			for ( var k in btn_set[i]["smallBtn"][j]) {
				for ( var l in btn_set[i]["smallBtn"][j][k]) {
					if (typeof btn_set[i]["smallBtn"][j][k][l] == "object")
						smallBtn_set.push(mkSmallBtn(
								btn_set[i]["smallBtnLoc"] + btn_set[i]["smallBtn"][j][k][l][0],
								btn_set[i]["smallBtnLoc"] + btn_set[i]["smallBtn"][j][k][l][0].split('.')[0],
								btn_set[i]["smallBtn"][j][k][l][1],
								btn_set[i]["smallBtn"][j][k][l][2]));
					else
						smallBtn_set.push(mkSmallBtn(
								btn_set[i]["smallBtnLoc"]+ btn_set[i]["smallBtn"][j][k][l],
								btn_set[i]["smallBtnLoc"]+ btn_set[i]["smallBtn"][j][k][l].split('.')[0]));

				}
			}
			group_set.push(mkGroup(k, smallBtn_set));
			//console.log(group_set);
		}
		insertInto(parent, [ 
                   insertInto(mkToolBtnTop(btn_set[i]["btnLoc"] + btn_set[i]["btn"][0], 
                  	btn_set[i]["btn"][1]),
				[ mkToolBtnBot(group_set) ]) ]);
	}
	return parent;
}

/* click event bind with button */
function btn1(e) {
	var bot = this.getElementsByClassName("math-button-mount-point")[0];
	//console.log(bot);
	if (bot.style.display == "block") {
		bot.style.display = "none";
		this.className = "math-button";
	} else {
		bot.style.display = "block";
		this.className = "math-button math-button-in";
	}
	e.stopPropagation();	
}
function btn2(e) {	//blur has no bubble event catch
	var bot = this.getElementsByClassName("math-button-mount-point")[0];
	//console.log(bot);
	bot.style.display = "none";
	this.className = "math-button";
}
function btn3(e) {
	var expr = document.createDocumentFragment();
	var btn_id = this.getAttribute("btn_id");
	switch (btn_id) {
	//fraction
	case 'frac/1':
		expr.appendChild(createExpr("fraction"));
		break;
	case 'frac/2':
		insertInto(expr, [createExpr("span"), createExpr("/"), createExpr("span")], false);
		expr.firstChild.removeAttribute("edit");
		expr.lastChild.removeAttribute("edit");
		break;
	case 'frac/c1':
		var frac = createExpr("fraction");
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[0].firstChild.appendChild(createVar("dy"));
		frac.childNodes[1].firstChild.className = "non-leaf";
		frac.childNodes[1].firstChild.appendChild(createVar("dx"));
		expr.appendChild(frac);
		break;
	case 'frac/c2':
		var frac = createExpr("fraction");
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[0].firstChild.appendChild(createVar("\u0394y"));
		frac.childNodes[1].firstChild.className = "non-leaf";
		frac.childNodes[1].firstChild.appendChild(createVar("\u0394x"));
		expr.appendChild(frac);
		break;
	case 'frac/c4':
		var frac = createExpr("fraction");
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[0].firstChild.appendChild(createVar("\u2202y"));
		frac.childNodes[1].firstChild.className = "non-leaf";
		frac.childNodes[1].firstChild.appendChild(createVar("\u2202x"));
		expr.appendChild(frac);
		break;
	case 'frac/c5':
		var frac = createExpr("fraction");
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[0].firstChild.appendChild(createVar("\u03C0"));
		frac.childNodes[1].firstChild.className = "non-leaf";
		frac.childNodes[1].firstChild.appendChild(createVar("2"));
		expr.appendChild(frac);
		break;
	//script
	case 'script/1':
		expr.appendChild(createExpr("sup"));
		break;
	case 'script/2':
		expr.appendChild(createExpr("sub"));
		break;	
	case 'script/3':	//TODO: distance
		var frac = createExpr("fraction");
		frac.childNodes[0].className = "top-in-frac";
		frac.childNodes[1].className = "bot-in-frac";
		expr.appendChild(frac);
		break;
	case 'script/4':	
		var frac = createExpr("fraction");
		frac.childNodes[0].className = "div8";
		frac.childNodes[1].className = "div7";
		expr.appendChild(frac);
		break;
	case 'script/c1':
		var sup = createExpr("sup");
		sup.className = "non-leaf limit";
		sup.appendChild(createVar("-i\u03C9t"));
		insertInto(expr, [ createVar("e"), sup ], false);
		break;
	case 'script/c2':
		var sup = createExpr("sup");
		sup.className = "non-leaf limit";
		sup.appendChild(createVar("2"));
		insertInto(expr, [ createVar("x"), sup ], false);
		break;
	case 'script/c3':
		var frac = createExpr("fraction");
		frac.childNodes[0].className = "div8";
		frac.childNodes[0].firstChild.appendChild(createVar("n"));
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[1].className = "div7";
		frac.childNodes[1].firstChild.appendChild(createVar("1"));
		frac.childNodes[1].firstChild.className = "non-leaf";
		expr.appendChild(frac);
		insertInto(expr, [ frac, createVar("Y") ], false);
		break;
	//radical
	case "sqrt/1":	//TODO: change the height
		expr.appendChild(createExpr("sqrt"));
		removeElement(expr.firstChild.firstChild);
		break;
	case "sqrt/2":
		insertInto(expr, [createExpr("sqrt")], false);
		break;
	case "sqrt/3":
		insertInto(expr, [createExpr("sqrt")], false);
		expr.firstChild.firstChild.className = "nthroot non-leaf";
		expr.firstChild.firstChild.appendChild(createVar("2"));
		break;
	case "sqrt/4":
		insertInto(expr, [createExpr("sqrt")], false);
		expr.firstChild.firstChild.className = "nthroot non-leaf";
		expr.firstChild.firstChild.appendChild(createVar("3"));
		break;
	//integral
	case "int/1":
		expr.appendChild(createExpr('\u222B'));
		break;
	case "int/2":
		insertInto(expr, [createExpr('\u222B'), createExpr("subp")], false);
		break;
	case "int/3":
		insertInto(expr, [createExpr('\u222B'), createExpr('\u222B')], false);;
		break;
	case "int/4":
		insertInto(expr, [createExpr('\u222B'), createExpr('\u222B'), createExpr("subp")], false);
		break;
	case "int/5":
		insertInto(expr, [createExpr('\u222B'), createExpr('\u222B'), createExpr('\u222B')], false);
		break;
	case "int/6":
		insertInto(expr, [createExpr('\u222B'), createExpr('\u222B'), createExpr('\u222B'), createExpr("subp")], false);
		break;
	// large operator
	case 'large/1':
		expr.appendChild(createExpr('\u2211'));
		break;
	case 'large/2':
		expr.appendChild(createExpr("sum"));
		break;
	case 'large/3':
		var sum = createExpr("sum");
		removeElement(sum.firstChild);
		expr.appendChild(sum);
		break;
	// brackets
	case "brackets/1":
		insertInto(expr, [createExpr("("), createExpr(")")], false);
		break;
	case "brackets/2":
		insertInto(expr, [createExpr("["), createExpr("]")], false);
		break;
	case "brackets/3":
		insertInto(expr, [createExpr("{"), createExpr("}")], false);
		break;
	case "brackets/4":
		insertInto(expr, [createExpr("|"), createExpr("|")], false);
		break;
	// function
	case "func/1":
		insertInto(expr, [createVar("sin")], false);
		break;
	case "func/2":
		insertInto(expr, [createVar("cos")], false);
		break;
	case "func/3":
		insertInto(expr, [createVar("tan")], false);
		break;
	case "func/4":
		insertInto(expr, [createVar("cot")], false);
		break;
	case "func/5":
		insertInto(expr, [createVar("sec")], false);
		break;
	case "func/6":
		insertInto(expr, [createVar("csc")], false);
		break;
	case "func/c1":
		insertInto(expr, [createVar("sin\u03B8")], false);
		break;
	case "func/c2":
		insertInto(expr, [createVar("cos2x")], false);
		break;
	case "func/c3":
		var frac = createExpr("fraction");
		frac.childNodes[0].className = "numerator";
		insertInto(frac.childNodes[0].firstChild, [createVar("sin\u03B8")], false);
		frac.childNodes[0].firstChild.className = "non-leaf";
		frac.childNodes[1].className = "denominator";
		insertInto(frac.childNodes[1].firstChild, [createVar("cos\u03B8")], false);
		frac.childNodes[1].firstChild.className = "non-leaf";
		expr.appendChild(frac);
		insertInto(expr, [createVar("tan\u03B8"), createExpr("="), frac], false);
		break;
	default:
		break;
	}

	var box = document.getElementById("main-math-box");
	var cursor = document.getElementById("cursor");
	if (cursor != null) {
		insertBefore(expr, cursor);
		cursor.parentNode.setAttribute("hasChild", "true");
		cursor.parentNode.focus();
	} else {
		insertInto(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.target
				, [ expr, createCursor() ]);
		box.focus();
	}
	e.stopPropagation();
}

/* click event bind with element*/
function c(e) { //bind with character in sub/sup
	//deal with the previous cursor
	var x = this;
	var idObject = document.getElementById('cursor');
	if (idObject != null) {
		if (idObject.parentNode.getAttribute("math_id") == x.getAttribute("math_id")) { //use math_id to judge if they are same
			removeElement(idObject);
			checkClassName(this);	//for click same box more than once
			//x = null; //flag
		} else {
			// if not the same parent, change the className for the original one with cursor 
			// Note: delete cursor first, or there is no way to judge
			var parent = idObject.parentNode;
			//console.log(parent);
			removeElement(idObject);
			checkClassName(parent);
		}
	}
	//define the cursor position
	//console.log(this.firstChild.nodeType);	//3 means textnode
	if (this.firstChild == null) {
		checkClassName(this);
		this.appendChild(createCursor());
	} else if (this.firstChild.nodeType == 3) {
		var elemLeftSide = elemOffsetLeft(this);
		var mouseLeftSide = mousePosition(e);
		var elemWidth = this.offsetWidth;
		if (mouseLeftSide - elemLeftSide >= elemWidth / 2)
			insertAfter(createCursor(), this);
		else
			insertBefore(createCursor(), this);
		checkClassName(this.parentNode);
	} else {
		var mouseLeftSide = mousePosition(e);
		for (var i in this.childNodes) {
			var elemLeftSide = elemOffsetLeft(this.childNodes[i]);
			if (mouseLeftSide < elemLeftSide) {
				insertBefore(createCursor(), this.childNodes[i]);
				e.stopPropagation();
				checkClassName(this);
				return;
			}
		}
		this.appendChild(createCursor());
		checkClassName(this);
	}
//	if (x != null)
//		checkClassName(this.parentNode);
	e.stopPropagation();
}
function c_onlyLeft(e) { //cursor appears before the expression when clicked, bind with math expression with sub/sup
	//deal with the previous cursor
	var idObject = document.getElementById('cursor');
	if (idObject != null) {
		var parent = idObject.parentNode;
		removeElement(idObject);
		checkClassName(parent);
	}

	//define the cursor position
	insertBefore(createCursor(), this); //cursor after this expression is not allowed which should be in <sub>
	checkClassName(this.parentNode);
	e.stopPropagation();
}

function c_onlyRight(e) { //cursor appears after the expression when clicked
	//deal with the previous cursor
	var idObject = document.getElementById('cursor');
	if (idObject != null) {
		var parent = idObject.parentNode;
		removeElement(idObject);
		checkClassName(parent);
		checkClassName(this.parentNode);
	}

	//define the cursor position
	insertAfter(createCursor(), this); //cursor after this expression is not allowed which should be in <sub>
	e.stopPropagation();
}
function c_both(e) { //c_special kind 2nd, bind with math expression without sub/sup
	//deal with the previous cursor
	var idObject = document.getElementById('cursor');
	if (idObject != null) {
		var parent = idObject.parentNode;
		removeElement(idObject);
		checkClassName(parent);
	}
	//define the cursor position
	
	var elemLeftSide = elemOffsetLeft(this);
	var mouseLeftSide = mousePosition(e);
	var elemWidth = this.offsetWidth;
	if (mouseLeftSide - elemLeftSide >= elemWidth / 2)
		insertAfter(createCursor(), this);
	else
		insertBefore(createCursor(), this);
	checkClassName(this.parentNode);

	e.stopPropagation();
}
function objBlur(e) {
		for (var obj in this.childNodes) {
			if (this.childNodes[obj].id == "cursor") {
				removeElement(this.childNodes[obj]);
				checkClassName(this);
				return;
		}
	}
};


/* add event listener */
function addListener(node, type) {
	if (type == 1) {
		node.addEventListener('click', c, false);
	} else if (type == 2) {
		node.addEventListener('click', c_both, false);
	} else if (type == 3) {
		node.addEventListener('click', c_onlyRight, false);
	}
	node.addEventListener('keyup', keyOn, false);
	node.addEventListener('keydown', keyDown, false);
	node.addEventListener('blur', objBlur,  false);
}
/* remove event listener */
function removeListener(node, type) {
	if (type == 1) {
		node.removeEventListener('click', c, false);
	} else if (type == 2) {
		node.removeEventListener('click', c_both, false);
	} else if (type == 3) {
		node.removeEventListener('click', c_onlyRight, false);
	}
	node.removeEventListener('keyup', keyOn, false);
	node.removeEventListener('keydown', keyDown, false);
	node.removeEventListener('blur', objBlur, false);
}

function hasChild(elem) {
	if (elem.childNodes.length < 1)  
		return false;
	else if (elem.childNodes.length > 1) {
		return true;
	} else {
		if (elem.firstChild.nodeType == 3)	//3 means textnode
			return false;
		else 
			return true;
	}
}
function findPrev(elem) {
	//if the prevSibling exists, then judge if it has children, if has, move cursor into, if not, just move backward
	if (elem.previousSibling != null) {		
		var prev = elem.previousSibling;
		if (hasChild(prev)) {
			if (prev.lastChild.hasAttribute("edit")) {
				while (prev.lastChild.getAttribute("edit") == "inside")
					prev = prev.lastChild;
				if (prev.lastChild.getAttribute("edit") == "true") {
					removeCursor();
					insertCursorEnd(prev.lastChild);
				} else if (prev.lastChild.getAttribute("edit") == "false") {
					findPrev(prev.lastChild);
				}
			} else {
				removeCursor();
				insertCursorEnd(prev);
			}
		} else {
			if (prev.className.indexOf("empty") != -1) {
				removeCursor();
				insertCursorEnd(prev);
			} else if (prev.hasAttribute("edit"))
				findPrev(prev);
			else {
				removeCursor();
				insertBefore(createCursor(), prev);
				checkClassName(prev.parentNode);
				prev.parentNode.focus();
			}
		}
	//if the prevSibling does not exist, then jump out one layer to search 
	} else if (elem.parentNode.getAttribute("math_id") != null) {
		var parent = elem.parentNode;
		if (parent.hasAttribute("edit"))	//deal with the sum/fraction format
			findPrev(parent);
		else if (parent.parentNode.getAttribute("math_id") != null) {
			removeCursor();
			insertBefore(createCursor(), parent);
			checkClassName(parent.parentNode);
			parent.parentNode.focus();
		}
	}
}
function findNext(elem) {
	//if the nextSibling exists, then judge if it has children, if has, move cursor into, if not, just move forward
	if (elem.nextSibling != null) {
		var next = elem.nextSibling;
		if (hasChild(next)) {
			if (next.firstChild.hasAttribute("edit")) {
				while (next.firstChild.getAttribute("edit") == "inside")
					next = next.firstChild;
				if (next.firstChild.getAttribute("edit") == "true") {
					removeCursor();
					insertCursorFront(next.firstChild);
				} else if (next.firstChild.getAttribute("edit") == "false") {
					findNext(next.firstChild);
				}
			} else {
				removeCursor();
				insertCursorFront(next);
			}
		} else {
			if (next.className.indexOf("empty") != -1) {
				removeCursor();
				insertCursorFront(next);
			} else if (next.hasAttribute("edit"))
				findNext(next);
			else {
				removeCursor();
				insertAfter(createCursor(), next);
				checkClassName(next.parentNode);
				next.parentNode.focus();
			}
		}
	//if the prevSibling does not exist, then jump out one layer to search 
	} else if (elem.parentNode.getAttribute("math_id") != null) {
		var parent = elem.parentNode;
		if (parent.hasAttribute("edit")) 
			findNext(parent);
		else if (parent.parentNode.getAttribute("math_id") != null) {
			removeCursor();
			insertAfter(createCursor(), parent);
			checkClassName(parent.parentNode);
			parent.parentNode.focus();
		}
	}
}
keys = {
    SPACE: 32,
    DELETE: 46,
    BACKSPACE: 8,
    LEFTARROW: 37,
    RIGHTARROW: 39
};
function keyDown(e) {
	var keynum = window.event ? e.keyCode : e.which;
	var keychar = String.fromCharCode(keynum);
	var tag = document.createElement("var");
	tag.setAttribute("id", "char");
	tag.setAttribute("math_id", math_id++);
	//tag.setAttribute("tabindex","0");
	var cursor = document.getElementById('cursor');
	switch (keynum) {
	case keys.SPACE:	//spacebar
		var tnode = document.createTextNode(" ");
		tag.appendChild(tnode);
		tag.addEventListener('click', c, false);
		insertBefore(tag, cursor);
		break;
	case keys.DELETE: //delete
		if (cursor.nextSibling != null) {
			removeElement(cursor.nextSibling);
		}
		break;
	case keys.BACKSPACE: //backspace
		e.preventDefault(); // or the brower will back 	
		if (cursor.previousSibling != null) {
			removeElement(cursor.previousSibling);
		}
		break;
	case keys.LEFTARROW: //left arrow
		findPrev(cursor);
		e.preventDefault();
		break;
	case keys.RIGHTARROW: //right arrow
		findNext(cursor);
		e.preventDefault();
		break;
	}
	e.stopPropagation();
}
function keyOn(e) {
	var keynum = window.event ? e.keyCode : e.which;
	var keychar = String.fromCharCode(keynum);
	var tag = document.createElement("var");
	tag.setAttribute("id", "char");
	tag.setAttribute("math_id", math_id++);
	//tag.setAttribute("tabindex","0");
	var cursor = document.getElementById('cursor');
	// TODO:add other keyboard control, change the logic of display, deal with shift/ctrl/alt
	var tnode;
	if (keynum >= 65 && keynum <= 90) {
		if (e.shiftKey)
			tnode = document.createTextNode(keychar);
		else
			tnode = document.createTextNode(keychar.toLowerCase());
	} else if (keynum >= 48 && keynum <= 57) {
		var signal = [ ")", "!", "@", "#", "$", "%", "^", "&", "\xD7", "(" ];
		if (e.shiftKey) {
			if (keynum - 48 == 6) {
				tnode = document.createElement("sup");
				tnode.setAttribute("tabindex", "0");
				tnode.setAttribute("class", "non-leaf limit hasCursor");
				//tnode.setAttribute("style","left: -0.44em; margin-right: -0.34em;");
				tnode.setAttribute("math_id", math_id++);
				addListener(tnode, 1);
				//insert a cursor into the node
				insertBefore(tnode, cursor);
				removeCursor(); //remove the original cursor since a new one append on tnode
				tnode.appendChild(createCursor(), tnode);
				e.stopPropagation();
				return;
			} else
				tnode = document.createTextNode(signal[keynum - 48]);
		} else
			tnode = document.createTextNode(keychar);
	} else if (keynum >= 96 && keynum <= 105) {
		tnode = document.createTextNode(keynum - 96);
	} else if (keynum >= 106 && keynum <= 111) {
		var signal = [ "\xD7", "+", "", "-", ".", "/" ];
		tnode = document.createTextNode(signal[keynum - 106]);
	} else if (keynum >= 186 && keynum <= 192) {
		var signal = [ ":", "+", "<", "_", ">", "?", "~" ];
		var sign = [ ";", "=", ",", "-", ".", "/", "`" ];
		if (e.shiftKey) {
			if (keynum == 189) {
				tnode = document.createElement("sub");
				tnode.setAttribute("tabindex", "0");
				tnode.setAttribute("class", "non-leaf limit hasCursor");
				//tnode.setAttribute("style","left: -0.44em; margin-right: -0.34em;");
				tnode.setAttribute("math_id", math_id++);
				addListener(tnode, 1);
				//insert a cursor into the node
				insertBefore(tnode, cursor);
				removeCursor(); //remove the original cursor since a new one append on tnode
				tnode.appendChild(createCursor(), tnode);
				e.stopPropagation();
				return;
			} else
				tnode = document.createTextNode(signal[keynum - 186]);
		} else {
			if (keynum == 191) {
				tnode = createExpr("fraction");
				insertBefore(tnode, cursor);
				var tmp = tnode.previousSibling;
				if (tmp) {
					var frag = document.createDocumentFragment();
					while (tmp && tmp.tagName != "BIG" && tmp.innerHTML != " " && tmp.innerHTML != "+" && tmp.innerHTML != "-" && tmp.innerHTML != "=" && tmp.innerHTML != "\xD7") { 
						if (frag.firstChild)
							insertBefore(tmp, frag.firstChild);
						else 
							frag.appendChild(tmp);
						tmp = tnode.previousSibling;
					}
					tnode.firstChild.firstChild.appendChild(frag);
					tnode.firstChild.firstChild.className = "non-leaf";
					removeElement(cursor);
					checkClassName(tnode.childNodes[1].firstChild);
					tnode.childNodes[1].firstChild.appendChild(createCursor());
				} else {
					removeElement(cursor);
					checkClassName(tnode.firstChild.firstChild);
					tnode.firstChild.firstChild.appendChild(createCursor());
				}
					
				e.stopPropagation();
				return;
			} else 
				tnode = document.createTextNode(sign[keynum - 186]);
		}
			
	} else if (keynum >= 219 && keynum <= 222) {
		var signal = [ "{", "|", "}", "\"" ];
		var sign = [ "[", "\\", "]", "\'" ];
		if (e.shiftKey) {
			tnode = document.createTextNode(signal[keynum - 219]);
		} else
			tnode = document.createTextNode(sign[keynum - 219]);
	} else {
		e.stopPropagation();
		return;
	}

	tag.appendChild(tnode);
	tag.addEventListener('click', c, false);
	insertBefore(tag, cursor);
	e.stopPropagation();
}

/*
 * parse solution: first traverse all node DFS, record the attribute and the father's math-id
 * 				   then if you want to recover it, just follow the path
 */
function transferToString(arr) {
	var str = "[";
	for (var i = 0; i < arr.length; i++){
		str += JSON.stringify(arr[i]);
		if (i != arr.length-1)
			str += ",";
//		for (var j = 0; j < q[i].length; j++){
//			str += "'" + q[i][j] ;
//			if (j != (q[i].length-1) ){
//				str += "', ";
//			}
//			else{
//				str += "' ";
//			}
//				
//		}
//		if (i != (q.length-1) )
//			str += "], ";
//		else{
//			str += "] ";
//		}
	}
		
	str += "]";
	
	return str;
}
function parseEquation(target) {
	var arr = [];
	var stack = [];
	stack.push(target);
	while (stack.length > 0) {
		var node = stack.pop();	//pop the last one and return it
//		console.log(node.getAttribute("math_id"));
		if (node.getAttribute("math_id") != undefined) 
			arr.push(parseNode(node));
		for (var i = node.childNodes.length-1; i >= 0; i--) {
			console.log(node.childNodes[i]);
			if (hasChild(node) && node.childNodes[i].getAttribute("math_id") != undefined) {
				node.childNodes[i].parent = node.getAttribute("math_id");
				stack.push(node.childNodes[i]);
			} else if (node.childNodes[i].className == "space-in-frac") {
				node.childNodes[i].parent = node.getAttribute("math_id");
				stack.push(node.childNodes[i]);
				console.log(1);
			}
		}
	}
	console.log(arr);
	console.log(transferToString(arr));
	return arr;
}
function parseNode(node) {
	var obj = {};
	obj.type = node.tagName;
	obj.className = node.className;
	obj.mathId = node.getAttribute("math_id");
	obj.id = node.id;
	if (node.innerHTML.length == 1)
		obj.innerHTML = node.innerHTML;
	if (node.parent != undefined)
		obj.parent = node.parent;
//	console.log(obj);
	return obj;
}
function parseEquationArray(parent, arr) {
	for (var i in arr) {
		if (arr[i].parent == undefined) {
			var node = parseEquationObj(arr[i]);
			parent.appendChild(node);
			parent = node;
		} else {
			while (arr[i].parent != parent.getAttribute("math_id"))
				parent = parent.parentNode;
			var node = parseEquationObj(arr[i]);
			parent.appendChild(node);
			parent = node;
		}
	}
}
function parseEquationObj(obj) {
    var node = make(obj.type, {
						        className: obj.className,
						        id: obj.id,
						        innerHTML: obj.innerHTML
						    });
    node.setAttribute("math_id", obj.mathId);
    return node;
}
