/**
 * 
 * 
 * 
 * View Quizzes Part
 * 
 * @Author: Jack Tan
 * 
 * 
 * 
 */
/*
 * function loadViewQuizzes() { var input; var xmlhttp = new XMLHttpRequest();
 * var url = "../demos/assets/json/quizzes.json"; xmlhttp.onreadystatechange =
 * function() { if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { var
 * input = JSON.parse(xmlhttp.responseText); var c =
 * document.getElementById("container");
 * c.appendChild(qtoolbar(input.editMode)); c.appendChild(qtable(input)); } }
 * xmlhttp.open("GET", url, true); xmlhttp.send(); }
 */

function QuizList(listinfo, list) {
	for ( var k in listinfo) {
		this[k] = listinfo[k];
	}
	this.months = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ",
			"Aug ", "Sep ", "Oct ", "Nov ", "Dec " ];
	this.body = document.getElementById("container");
	this.body.className = "quizlist";
	this.list = list;
}

QuizList.prototype.exec = function() {
	var c = document.getElementById("container");
	c.appendChild(this.qtoolbar());
	c.appendChild(this.qtable());
}

QuizList.prototype.dayshift = function(datetype, rowID, rowNum, NOD) {
	var cell = document.getElementById(rowID).cells[datetype];
	var date = new Date(this.list[rowNum][datetype]);
	date.setDate(date.getDate() + NOD);
	this.list[rowNum][datetype] = date.toString();
	cell.innerHTML = this.months[date.getMonth()] + date.getDate() + " at "
			+ date.getHours() + ":" + date.getMinutes();
	if (this.checkDates(rowNum)) {
		this.dayshift(datetype, rowID, rowNum, -NOD);
	}
}
/*
 * Check the dates before each time you change them. Open date must be earlier
 * than due date and close date; Due date must later than open date but no later
 * than close date; Close date must be later than open date and no earlier than
 * due date. Return ture if an error happens
 */
QuizList.prototype.checkDates = function(rowNum) {
	var opendate = new Date(this.list[rowNum][2]);
	var closedate = new Date(this.list[rowNum][3]);
	var duedate = new Date(this.list[rowNum][4]);
	if (closedate.getTime() <= opendate.getTime()) {
		alert("Open date must be earlier than close date.");
		return true;
	}
	if (closedate.getTime() < duedate.getTime()) {
		alert("Close date must be no earlier than due date.");
		return true;
	}
	if (opendate.getTime() >= duedate.getTime()) {
		alert("Open date must be earlier than due date.");
		return true;
	}
}
// Conditional day shift.
QuizList.prototype.condDayShift = function(rowID, rowNum, NOD) {
	if (document.getElementById("selectOpenDate").checked == true) {
		this.dayshift(2, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectCloseDate").checked == true) {
		this.dayshift(3, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectDueDate").checked == true) {
		this.dayshift(4, rowID, rowNum, NOD);
	}
}
// make day shift buttons i.e. (-7, -1, +1, +7)
QuizList.prototype.mkDSButtons = function(rowID, rowNum) {
	var d = document.createElement("div");
	var ql = this;
	Util.add(d, [ Util.button("-7", null, null, function() {
		ql.condDayShift(rowID, rowNum, -7)
	}), Util.button("-1", null, null, function() {
		ql.condDayShift(rowID, rowNum, -1)
	}), Util.button("+1", null, null, function() {
		ql.condDayShift(rowID, rowNum, +1)
	}), Util.button("+7", null, null, function() {
		ql.condDayShift(rowID, rowNum, +7)
	}) ]);
	return d;
}

function mkth(parent, txt, colspan) { // make table head cell
	var th = document.createElement("th");
	th.innerHTML = txt;
	th.colSpan = colspan;
	parent.appendChild(th);
	return th;
}
QuizList.prototype.qtoolbar = function() {
	var qtoolbar = Util.div();
	/* **************** search div **************** */
	var srch_div = Util.div();
	qtoolbar.appendChild(srch_div);
	srch_div.appendChild(Util.make("input", {
		type : "search",
		placeholder : "Search for Quiz"
	}));

	srch_div.appendChild(Util.button("Search"));
	/* **************** search div **************** */
	/* **************** buttons div **************** */
	if (this.editMode) {
		var btns_div = Util.div();
		qtoolbar.appendChild(btns_div);
		btns_div.appendChild(Util.button("all"));
		btns_div.appendChild(Util.button("invert"));
		btns_div.appendChild(Util.button("none"));
		btns_div.appendChild(Util.make("input", { // enter a date for date
			// shift
			type : "text",
			placeholder : "Enter a date point"
		}));
		btns_div.appendChild(Util.make("input", { // enter the number of days
			// for date shift
			type : "text",
			placeholder : "Number of days"
		}));
		btns_div.appendChild(Util.button("Advance"));
		btns_div.appendChild(Util.button("Postpone"));
	}
	/* **************** buttons div **************** */
	return qtoolbar;
}

/* headtype: 0 for current quizzes; 1 for closed quizzes */
QuizList.prototype.qtablehead = function(headtype) {
	var thead = document.createElement("tr");
	var type = [ "Current Quizzes", "Closed Quizzes" ];
	mkth(thead, type[headtype], 2);
	mkth(thead, "Open", "1");
	mkth(thead, "Close", "1");
	mkth(thead, "Due", "1");
	mkth(thead, "Points", "1");
	mkth(thead, "Questions", "1");
	return thead;
}

QuizList.prototype.qtable = function() {
	var t = document.createElement("table");
	t.border = "1";
	// table head for current quizzes
	var h1 = this.qtablehead(0);
	t.appendChild(h1);
	// table head for closed quizzes
	var h2 = this.qtablehead(1);
	t.appendChild(h2);
	/* **************** table body **************** */
	for (var i = 1; i < this.list.length; i++) {
		var tr = t.insertRow(i);
		tr.id = this.list[i][0];
		var cell0 = tr.insertCell(0);
		for (var j = 1; j < this.list[i].length; j++) {
			var c = tr.insertCell(-1);
			c.innerHTML = this.list[i][j];
		}
		var opendate = new Date(this.list[i][2]);
		tr.cells[2].innerHTML = this.months[opendate.getMonth()]
				+ opendate.getDate() + " at " + opendate.getHours() + ":"
				+ opendate.getMinutes();
		var closedate = new Date(this.list[i][3]);
		tr.cells[3].innerHTML = this.months[closedate.getMonth()]
				+ closedate.getDate() + " at " + closedate.getHours() + ":"
				+ closedate.getMinutes();
		var duedate = new Date(this.list[i][4]);
		tr.cells[4].innerHTML = this.months[duedate.getMonth()]
				+ duedate.getDate() + " at " + duedate.getHours() + ":"
				+ duedate.getMinutes();
	}
	/* **************** table body **************** */
	/* **************** edit functions for edit mode **************** */
	if (this.editMode) {
		h1.cells[1].appendChild(Util.checkbox(null, null, null,
				"selectOpenDate", false));
		h1.cells[2].appendChild(Util.checkbox(null, null, null,
				"selectCloseDate", true));
		h1.cells[3].appendChild(Util.checkbox(null, null, null,
				"selectDueDate", true));
		h2.cells[1].appendChild(Util.checkbox(null, null, null,
				"selectOpenDate", false));
		h2.cells[2].appendChild(Util.checkbox(null, null, null,
				"selectCloseDate", true));
		h2.cells[3].appendChild(Util.checkbox(null, null, null,
				"selectDueDate", true));
		for (var i = 1; i < this.list.length; i++) {
			t.rows[i].cells[0].appendChild(Util.checkbox(null, null, null,
					null, false));
			t.rows[i].cells[1].appendChild(Util.br());
			t.rows[i].cells[1].appendChild(this.mkDSButtons(t.rows[i].id, i));
			t.rows[i].insertCell(-1);
			t.rows[i].cells[7].appendChild(Util.button("edit"));
			t.rows[i].cells[7].appendChild(Util.button("delete"));
			t.rows[i].cells[7].appendChild(Util.button("copy"));
		}
	}
	/* **************** edit functions for edit mode **************** */
	return t;
}
/** ******************** View Quizzes Part ******************** * */
