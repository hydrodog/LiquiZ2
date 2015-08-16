/*
* Author: Yubin Shen
* Equation support for display and question entry.
*
*/
var math_id = 1;
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

document.onclick = function() {
	//console.log(22);	
	if (document.activeElement.getAttribute("math_id") == null) {
		var cursor = document.getElementById("cursor");
		if (cursor != null) {
			var parent = cursor.parentNode;
			removeElement(cursor);
			checkClassName(parent);
			//parent.blur();
		}
	}
};

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

function mkToolBtnTop(iconLoc, label) {	//make tool button top part, always visiable
	var btn = insertInto(div("math-button"), [
		 		div("math-button-icon", {background: "url(/LiquiZ2/assets/img/toolbar/" + iconLoc + ")"}),
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

function mkSmallBtn(loc, botton_id) {
	var btn = make("div", {className: "math-box-item", style: {background: "url(/LiquiZ2/assets/img/toolbar/" + loc + ")", width: "56px", height: "75px"}});
	btn.setAttribute("btn_id", botton_id);
	btn.addEventListener('click', btn3, false);
	return btn;
}

function mkSmallBtnLong(loc, botton_id, w, h) {
	var btn = make("div", {className: "math-box-item", style: {background: "url(/LiquiZ2/assets/img/toolbar/" + loc + ")", width: w+"px", height: h+"px"}});
	btn.setAttribute("btn_id", botton_id);
	btn.addEventListener('click', btn3, false);
	return btn;
}

function createVar(string) {
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
		frac.childNodes[0].className = "div6";
		frac.childNodes[1].className = "div5";
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
		sup.appendChild(createVar("-i\u03C9t"))
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
		insertInto(frac.childNodes[0], [createVar("sin\u03B8")], false);
		frac.childNodes[1].className = "denominator";
		insertInto(frac.childNodes[1], [createVar("cos\u03B8")], false);
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
		insertInto(box, [ expr, createCursor() ]);
		box.focus();
	}
	e.stopPropagation();
}

function mkToolBtn(parent, btn_set) { //make the whole btn and append to parent
	for ( var i in btn_set) {
		var group_set = [];
		for ( var j in btn_set[i]["smallBtn"]) {
			var smallBtn_set = [];
			for ( var k in btn_set[i]["smallBtn"][j]) {
				for ( var l in btn_set[i]["smallBtn"][j][k]) {
					if (typeof btn_set[i]["smallBtn"][j][k][l] == "object")
						smallBtn_set.push(mkSmallBtnLong(
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
}

var btn_set = [
		{
			"btnLoc" : "button/",
			"btn" : [ "frac.png", "Fraction" ],
			"smallBtnLoc" : "frac/",
			"smallBtn" : [
					{"Fragment" : [ "1.png", "2.png" ]},
					{"Common Fragment" : [ "c1.png", "c2.png", "c4.png", "c5.png" ]} 
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "script.png", "Script" ],
			"smallBtnLoc" : "script/",
			"smallBtn" : [ 
					{"Script" : [ "1.png", "2.png", "3.png", "4.png" ]},
					{"Common Script" : [ "c1.png", "c2.png", "c3.png" ]} 
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "sqrt.png", "Radical" ],
			"smallBtnLoc" : "sqrt/",
			"smallBtn" : [
					{"Script" : [ "1.png", "2.png", "3.png", "4.png" ]},
					{"Common Script" : [ [ "c1.png", 137, 75 ], [ "c2.png", 137, 75 ] ]} 
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "int.png", "Integral" ],
			"smallBtnLoc" : "int/",
			"smallBtn" : [ 
					{"Script" : [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png" ]}
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "sum.png", "Large Operator" ],
			"smallBtnLoc" : "large/",
			"smallBtn" : [ 
					{"Script" : [ "1.png", "2.png", "3.png" ]} 
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "brackets.png", "Brackets" ],
			"smallBtnLoc" : "brackets/",
			"smallBtn" : [ 
					{"Brackets" : [ "1.png", "2.png", "3.png", "4.png" ]}
					]
		},
		{
			"btnLoc" : "button/",
			"btn" : [ "sin.png", "Function" ],
			"smallBtnLoc" : "func/",
			"smallBtn" : [
					{"Function" : [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png" ]},
					{"Common Function" : [ "c1.png", "c2.png", [ "c3.png", 137, 75 ] ]} 
					]
		} ];


function insertInto(parent, elem_set, flag) { //append child into parent, if flag exists, then no need to check class name
	for ( var i in elem_set)
		parent.appendChild(elem_set[i]);
	//console.log(parent.nodeType);	//11 = documentfragment
	if (parent.nodeType != 11 && parent.getAttribute("math_id")) {
		if (flag != false)
			checkClassName(parent);
		//console.log(parent);
		parent.focus();
		parent.setAttribute("hasChild", "true");
	}
	return parent;
}

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
	
}

function removeListener(node, type) {
	if (type == 1) {
		node.removeEventListener('click', c, false);
	} else if (type == 2) {
		node.removeEventListener('click', c_both, false);
	} else if (type == 3) {
		node.removeEventListener('click', c_onlyRight, false);
	}
	node.removeEventListener('click', c, false);
	node.removeEventListener('keyup', keyOn, false);
	node.removeEventListener('keydown', keyDown, false);
}

function createExpr(type) {
	var tnode;
	switch (type) {
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
		top.setAttribute("edit", "false");	//TODO: may be useless
		top.setAttribute("hasChild", "true");

		var mid = createExpr('\u2211');
		removeListener(mid, 2);
		mid.setAttribute("class", "align-mid-large-oper");
		mid.setAttribute("math_id", math_id++);

		var bottom = createExpr("span");
		bottom.setAttribute("class", "bot-align-mid-large-oper");
		bottom.setAttribute("math_id", math_id++);
		removeListener(bottom, 1);
		insertInto(bottom, [ createExpr("span") ], false);
		bottom.setAttribute("edit", "false");
		bottom.setAttribute("hasChild", "true");

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
		insertInto(top, [ createExpr("span") ], false);

		var bottom = document.createElement("span");
		bottom.setAttribute("class", "denominator");
		bottom.setAttribute("math_id", math_id++);
		insertInto(bottom, [ createExpr("span") ], false);

		var space = document.createElement("span");
		space.style.display = "inline-block";
		space.style.width = 0;
		space.setAttribute("math_id", math_id++);
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
		top.setAttribute("class", "div6");
		top.setAttribute("math_id", math_id++);
		var space = document.createTextNode(" ");
		insertInto(top, [space, createExpr("span")], false);
		
		var mid = document.createElement("span");	//adjust the top location
		mid.setAttribute("class", "div6");
		mid.setAttribute("math_id", math_id++);
		mid.style.height = "7px";
		
		var bottom = document.createElement("span");
		bottom.setAttribute("class", "div5");
		bottom.setAttribute("math_id", math_id++);
		insertInto(bottom, [createExpr("span")], false);

		var space = document.createElement("span");
		space.style.display = "inline-block";
		space.style.width = 0;
		
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
		text = document.createTextNode("¡Ì");
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
		tnode.setAttribute("edit", "false");
		addListener(tnode, 2);	//TODO: if the bind was meaningful
		break;
	}
	return tnode;
}

	function clicked(e) { //bind with sub/sup
		var x = this;
		var idObject = document.getElementById("cursor");
		//console.log(idObject);

		//if you transfer from other box to this one, delete cursor first to avoid logic problem
		//if cursor in the same box, for prognent catching, should be judged
		if (idObject != null) {
			console.log(idObject.parentNode.getAttribute("math_id"));
			console.log(x);
			if (idObject.parentNode.getAttribute("math_id") == x
					.getAttribute("math_id")) //use math_id to judge if they are same
				return;

			// if not the same parent, change the className for the original one with cursor 
			// Note: delete cursor first, or there is no way to judge
			var parent = idObject.parentNode;
			removeElement(idObject);
			checkClassName(parent);
		}
		checkClassName(x);
		x.appendChild(createCursor());
		e.stopPropagation();
		//console.log(1);
	}
	function findPrev(cursor) {
		if (cursor.previousSibling != null) {
			if (cursor.previousSibling.tagName == "VAR") {
				insertBefore(cursor, cursor.previousSibling);
				//cursor.previousSibling.focus();
			} else if (cursor.previousSibling.tagName == "BIG") { //TODO: rewrite
				insertBefore(cursor, cursor.previousSibling);
				cursor.previousSibling.focus();
			} else if (cursor.previousSibling.tagName == "SUP" || cursor.previousSibling.tagName == "SUB") { //sub or sup, just appendChild
				checkClassName(cursor.parentNode);
				checkClassName(cursor.previousSibling);
				cursor.previousSibling.appendChild(createCursor());
				cursor.previousSibling.focus();
				removeElement(cursor);
			} else if (cursor.previousSibling.tagName == "SPAN") {
				checkClassName(cursor.parentNode);
				checkClassName(cursor.previousSibling);
				cursor.previousSibling.lastChild.appendChild(createCursor());
				cursor.previousSibling.focus();
				removeElement(cursor);
			}
		} else if (cursor.parentNode.getAttribute("math_id") != null) {
			insertBefore(cursor, cursor.parentNode);
		}
	}
	function findNext(cursor) {
		if (cursor.nextSibling != null) {
			if (cursor.nextSibling.tagName == "VAR") {
				insertAfter(cursor, cursor.nextSibling);
				//cursor.nextSibling.focus();
			} else if (cursor.nextSibling.tagName == "BIG") {
				insertAfter(cursor, cursor.nextSibling);
				cursor.nextSibling.focus();
			} else if (cursor.nextSibling.tagName == "SUP" || cursor.nextSibling.tagName == "SUB") { //sub or sup, just appendChild
				checkClassName(cursor.parentNode);
				checkClassName(cursor.nextSibling);
				cursor.nextSibling.appendChild(createCursor());
				cursor.nextSibling.focus();
				removeElement(cursor);
			} else if (cursor.nextSibling.tagName == "SPAN") {
				checkClassName(cursor.parentNode);
				checkClassName(cursor.nextSibling);
				cursor.nextSibling.firstChild.appendChild(createCursor());
				cursor.nextSibling.focus();
				removeElement(cursor);
			}
		} else if (cursor.parentNode.getAttribute("math_id") != null) {
			findNext(cursor.parentNode);
		}
	}
	function keyDown(e) {
		var keynum = window.event ? e.keyCode : e.which;
		var keychar = String.fromCharCode(keynum);
		var tag = document.createElement("var");
		tag.setAttribute("id", "char");
		tag.setAttribute("math_id", math_id++);
		//tag.setAttribute("tabindex","0");
		var cursor = document.getElementById('cursor');
		switch (keynum) {
		case 32:	//spacebar
			var tnode = document.createTextNode(" ");
			tag.appendChild(tnode);
			tag.addEventListener('click', c, false);
			insertBefore(tag, cursor);
			break;
		case 46: //delete
			if (cursor.nextSibling != null) {
				removeElement(cursor.nextSibling);
			}
			break;
		case 8: //backspace
			e.preventDefault(); // or the brower will back 	
			if (cursor.previousSibling != null) {
				removeElement(cursor.previousSibling);
			}
			break;
		case 37: //left arrow
			//findPrev(cursor);
			if (cursor.previousSibling != null) {
				if (cursor.previousSibling.tagName == "VAR") {
					insertBefore(cursor, cursor.previousSibling);
					//cursor.previousSibling.focus();
				} else if (cursor.previousSibling.tagName == "BIG") { //TODO: rewrite
					insertBefore(cursor, cursor.previousSibling);
					//cursor.previousSibling.focus();
				} else if (cursor.previousSibling.tagName == "SUP" || cursor.previousSibling.tagName == "SUB") { //sub or sup, just appendChild
					checkClassName(cursor.parentNode);
					checkClassName(cursor.previousSibling);
					cursor.previousSibling.appendChild(createCursor());
					cursor.previousSibling.focus();
					removeElement(cursor);
				} else if (cursor.previousSibling.tagName == "SPAN") {
					checkClassName(cursor.parentNode);
					if (cursor.previousSibling.className == "fraction non-leaf") {
						checkClassName(cursor.previousSibling.lastChild.previousSibling.firstChild);
						cursor.previousSibling.lastChild.previousSibling.firstChild.appendChild(createCursor());
						cursor.previousSibling.lastChild.previousSibling.firstChild.focus();
					} else if (cursor.previousSibling.className == "large-oper") {
						checkClassName(cursor.previousSibling.lastChild.firstChild);
						cursor.previousSibling.lastChild.firstChild.appendChild(createCursor());
						cursor.previousSibling.lastChild.firstChild.focus();
					} else {
						checkClassName(cursor.previousSibling.lastChild);
						cursor.previousSibling.lastChild.appendChild(createCursor());
						cursor.previousSibling.lastChild.focus();
					}
					removeElement(cursor);
				}
			} else {
				var iter = cursor.parentNode;	//upper level
				//console.log(iter);
				//check sibling first, than parent
				if (iter.previousSibling != null) {
					if (iter.parentNode.className == "div6") {
						removeElement(cursor);
						checkClassName(iter);
						insertBefore(createCursor(), iter.parentNode.parentNode);
						checkClassName(iter.parentNode.parentNode.parentNode);
						iter.parentNode.parentNode.parentNode.focus();
					} else if (iter.previousSibling.getAttribute("math_id") != null) {
						if (iter.previousSibling.tagName == "VAR") {
							removeElement(cursor);
							checkClassName(iter);
							insertBefore(createCursor(), iter);
							checkClassName(iter.previousSibling.parentNode);
							iter.previousSibling.parentNode.focus();
						} else if (iter.previousSibling.tagName == "BIG") {
							removeElement(cursor);
							checkClassName(iter);
							insertBefore(createCursor(), iter.previousSibling);
							checkClassName(iter.previousSibling.parentNode);
							iter.previousSibling.parentNode.focus();
						} else if (iter.previousSibling.innerHTML == "¡Ì") {
							removeElement(cursor);
							checkClassName(iter);
							if (iter.parentNode.firstChild.tagName == "SUP") {
								iter.parentNode.firstChild.appendChild(createCursor());
								checkClassName(iter.parentNode.firstChild);
								iter.parentNode.firstChild.focus();
							} else {
								insertBefore(createCursor(), iter.parentNode);
								checkClassName(iter.parentNode.parentNode);
								iter.parentNode.parentNode.focus();
							}
						} else {
							removeElement(cursor);
							checkClassName(iter);
							checkClassName(iter.previousSibling);
							iter.previousSibling.focus();
							iter.previousSibling.appendChild(createCursor());
						}
					}
				} else if (iter.parentNode.getAttribute("math_id") != null) {
					if (iter.parentNode.className == "bot-align-mid-large-oper") {
						removeElement(cursor);
						checkClassName(iter);
						iter.parentNode.previousSibling.previousSibling.firstChild.appendChild(createCursor());
						checkClassName(iter.parentNode.previousSibling.previousSibling.firstChild);
						iter.parentNode.previousSibling.previousSibling.firstChild.focus();
					} else if (iter.parentNode.className == "align-mid-large-oper") {
						removeElement(cursor);
						checkClassName(iter);
						insertBefore(createCursor(), iter.parentNode.parentNode);
						checkClassName(iter.parentNode.parentNode.parentNode);
						iter.parentNode.parentNode.parentNode.focus();
					} else if (iter.parentNode.className == "denominator" || iter.parentNode.className == "div7") {
						removeElement(cursor);
						checkClassName(iter);
						console.log(iter.parentNode.parentNode);
						iter.parentNode.parentNode.firstChild.firstChild.appendChild(createCursor());
						checkClassName(iter.parentNode.parentNode.firstChild.firstChild);
						iter.parentNode.parentNode.firstChild.firstChild.focus();
					} else if (iter.parentNode.className == "div5") {
						removeElement(cursor);
						checkClassName(iter);
						console.log(iter.parentNode.parentNode);
						iter.parentNode.parentNode.firstChild.lastChild.appendChild(createCursor());
						checkClassName(iter.parentNode.parentNode.firstChild.lastChild);
						iter.parentNode.parentNode.firstChild.lastChild.focus();
					} else if (iter.parentNode.className == "numerator" || iter.parentNode.className == "div6" || iter.parentNode.className == "div8") {
						removeElement(cursor);
						checkClassName(iter);
						insertBefore(createCursor(), iter.parentNode.parentNode);
						checkClassName(iter.parentNode.parentNode.parentNode);
						iter.parentNode.parentNode.parentNode.focus();
					} else if (iter.className == "nthroot non-leaf hasCursor" ) {
						removeElement(cursor);
						checkClassName(iter);
						insertBefore(createCursor(), iter.parentNode);
						checkClassName(iter.parentNode.parentNode);
						iter.parentNode.parentNode.focus();
					} else {
						removeElement(cursor);
						checkClassName(iter);
						checkClassName(iter.parentNode);
						iter.parentNode.focus();
						insertBefore(createCursor(), iter);
					}
				}
			}
			e.preventDefault();
			break;
		case 39: //right arrow
			if (cursor.nextSibling != null) {
				if (cursor.nextSibling.tagName == "VAR") {
					//cursor.nextSibling.focus();
					insertAfter(cursor, cursor.nextSibling);
				} else if (cursor.nextSibling.tagName == "BIG") {
					insertAfter(cursor, cursor.nextSibling);
				} else if (cursor.nextSibling.tagName == "SUP" || cursor.nextSibling.tagName == "SUB") { //sub or sup, just appendChild
					checkClassName(cursor.parentNode);
					checkClassName(cursor.nextSibling);
					insertCursor(cursor.nextSibling);
					cursor.nextSibling.focus();
					removeElement(cursor);
				} else if (cursor.nextSibling.tagName == "SPAN") {
					checkClassName(cursor.parentNode);
					if (cursor.nextSibling.className == "fraction non-leaf") {
						if (cursor.nextSibling.firstChild.className == "div6") { 
							checkClassName(cursor.nextSibling.firstChild.firstChild.nextSibling);
							insertCursor(cursor.nextSibling.firstChild.firstChild.nextSibling);
							cursor.nextSibling.firstChild.firstChild.nextSibling.focus();
						} else { 
							checkClassName(cursor.nextSibling.firstChild.firstChild);
							insertCursor(cursor.nextSibling.firstChild.firstChild);
							cursor.nextSibling.firstChild.firstChild.focus();
						}
					} else if (cursor.nextSibling.className == "large-oper") {
						checkClassName(cursor.nextSibling.firstChild.firstChild);
						insertCursor(cursor.nextSibling.firstChild.firstChild);
						cursor.nextSibling.firstChild.firstChild.focus();
					} else {
						if (cursor.nextSibling.firstChild.tagName == "SUP") {
							checkClassName(cursor.nextSibling.firstChild);
							insertCursor(cursor.nextSibling.firstChild);
							cursor.nextSibling.firstChild.focus();
						} else {
							checkClassName(cursor.nextSibling.lastChild);
							insertCursor(cursor.nextSibling.lastChild);
							cursor.nextSibling.lastChild.focus();
						}
					}
					removeElement(cursor);
				}
			} else {
				var iter = cursor.parentNode;
				//console.log(iter);
				//check sibling first, than parent ... iterative search until the first layer
				if (iter.nextSibling != null) {
					//console.log(iter.nextSibling);
					if (iter.nextSibling.getAttribute("math_id") != null) {
						removeElement(cursor);
						checkClassName(iter);
						insertBefore(createCursor(), iter.nextSibling);
						checkClassName(iter.parentNode);
						iter.parentNode.focus();
						/*
						if (iter.nextSibling.tagName == "BIG"
								|| iter.nextSibling.tagName == "VAR") {
							insertBefore(createCursor(), iter.nextSibling);
							checkClassName(iter.parentNode);
							iter.parentNode.focus();
						} else if (iter.nextSibling.innerHTML == "¡Ì") {
							insertCursor(iter.nextSibling.nextSibling);
							checkClassName(iter.nextSibling.nextSibling);
							iter.nextSibling.nextSibling.focus();
						} else {
							checkClassName(iter.nextSibling);
							iter.nextSibling.focus();
							insertCursor(iter.nextSibling);
						}*/
					}
				} else if (iter.parentNode.getAttribute("math_id") != null) {
				 	if (iter.parentNode.className == "bot-align-mid-large-oper") {
						removeElement(cursor);
						checkClassName(iter);
						insertAfter(createCursor(), iter.parentNode.parentNode);
						checkClassName(iter.parentNode.parentNode.parentNode);
						iter.parentNode.parentNode.parentNode.focus();
					} else if (iter.parentNode.className == "align-mid-large-oper") {
						removeElement(cursor);
						checkClassName(iter);
						iter.parentNode.nextSibling.nextSibling.firstChild.appendChild(createCursor());
						checkClassName(iter.parentNode.nextSibling.nextSibling.firstChild);
						iter.parentNode.nextSibling.nextSibling.firstChild.focus();
					} else if (iter.parentNode.className == "denominator" || iter.parentNode.className == "div7" || iter.parentNode.className == "div5") {
						removeElement(cursor);
						checkClassName(iter);
						insertAfter(createCursor(), iter.parentNode.parentNode);
						checkClassName(iter.parentNode.parentNode.parentNode);
						iter.parentNode.parentNode.parentNode.focus();
					} else if (iter.parentNode.className == "div6") {
						removeElement(cursor);
						checkClassName(iter);
						insertCursor(iter.parentNode.nextSibling.nextSibling.firstChild);
						checkClassName(iter.parentNode.nextSibling.nextSibling.firstChild);
						iter.parentNode.nextSibling.nextSibling.firstChild.focus();
					} else if (iter.parentNode.className == "numerator" || iter.parentNode.className == "div8") {
						removeElement(cursor);
						checkClassName(iter);
						insertCursor(iter.parentNode.nextSibling.firstChild);
						checkClassName(iter.parentNode.nextSibling.firstChild);
						iter.parentNode.nextSibling.firstChild.focus();
					} else if (iter.className == "sqrt-stem non-leaf hasCursor" ) {
						removeElement(cursor);
						checkClassName(iter);
						insertAfter(createCursor(), iter.parentNode);
						checkClassName(iter.parentNode.parentNode);
						iter.parentNode.parentNode.focus();
					} else {
						removeElement(cursor);
						checkClassName(iter);
						checkClassName(iter.parentNode);
						iter.parentNode.focus();
						insertAfter(createCursor(), iter);
					}
				}
			}
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
			var signal = [ ")", "!", "@", "#", "$", "%", "^", "&", "¡Á", "(" ];
			if (e.shiftKey) {
				if (keynum - 48 == 6) {
					tnode = document.createElement("sup");
					tnode.setAttribute("tabindex", "0");
					tnode.setAttribute("class", "non-leaf limit hasCursor");
					//tnode.setAttribute("style","left: -0.44em; margin-right: -0.34em;");
					tnode.setAttribute("math_id", math_id++);
					tnode.addEventListener('click', c, false);
					tnode.addEventListener('keyup', keyOn, false);
					tnode.addEventListener('keydown', keyDown, false);
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
			var signal = [ "¡Á", "+", "", "-", ".", "/" ];
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
					tnode.addEventListener('click', c, false);
					tnode.addEventListener('keyup', keyOn, false);
					tnode.addEventListener('keydown', keyDown, false);
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
						while (tmp && tmp.tagName != "BIG" && tmp.innerHTML != " " && tmp.innerHTML != "+" && tmp.innerHTML != "-" && tmp.innerHTML != "=" && tmp.innerHTML != "¡Á") {
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

	function c(e) { //bind with character in sub/sup
		//deal with the previous cursor
		var x = this;
		var idObject = document.getElementById('cursor');
		var cursor = idObject;
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
//		if (x != null)
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
	function mousePosition(e) {
		if (e.pageX && e.pageY) {
			return e.pageX;
		}
		var scrollElem = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement
				: document.body;
		return e.clientX + scrollElem.scrollLeft;
	}
	function createCursor() { //create cursor 
		var tag = document.createElement("span");
		tag.setAttribute("id", "cursor");
		tag.setAttribute("math_id", math_id++);
		var tnode = document.createTextNode("|");
		tag.appendChild(tnode);
		return tag;
	}
	function removeElement(e) {
		e.parentNode.removeChild(e);
	}
	//remove the cursor and change the className of which the cursor belongs to
	function removeCursor() {
		var cursor = document.getElementById("cursor");
		if (cursor != null) {
			checkClassName(cursor.parentNode);
			removeElement(cursor);
		}
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
	function insertCursor(elem) { //insert element in sub/sup
		if (elem.firstChild == null)
			elem.appendChild(createCursor());
		else
			insertBefore(createCursor(), elem.firstChild);
		//console.log(1);
	}
