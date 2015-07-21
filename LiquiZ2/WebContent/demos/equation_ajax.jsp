{};
btn_set = [
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
		/*{
			"btnLoc" : "button/",
			"btn" : [ "sqrt.png", "Radical" ],
			"smallBtnLoc" : "sqrt/",
			"smallBtn" : [
					{"Script" : [ "1.png", "2.png", "3.png", "4.png" ]},
					{"Common Script" : [ [ "c1.png", 137, 75 ], [ "c2.png", 137, 75 ] ]} 
					]
		},*/
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

page.exec = function(a) {};
mkToolBtn(document.getElementById("container"), btn_set);
document.getElementById("container").className = "equation";
var box = document.createElement("div");
box.setAttribute("id", "math-box");
insertInto(document.getElementById("container"), [Util.button("reset", "button", "-1", resetButton), Util.button("edit", "button", "-1", editButton), Util.button("complete", "button", "-1", editButtonEnd)], false);
document.getElementById("container").appendChild(box);

var tag = document.createElement("span");
tag.setAttribute("id", "main-math-box");
tag.setAttribute("tabindex", "0"); 
tag.setAttribute("class", "math-expr math-editable empty");
tag.setAttribute("style", "font-size: 20px;");
tag.setAttribute("math_id", math_id++);
addListener(tag, 1);
box.appendChild(tag);