/**
 * 
 * Author: Jack Tan
 * View Quizzes Part
 * 
 * 
 * 
 * 
 * 
 * 
 */
function loadViewQuizzes() {
	var input;
	var xmlhttp = new XMLHttpRequest();
	var url = "../demos/assets/json/quizzes.json";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var input = JSON.parse(xmlhttp.responseText);
			var c = document.getElementById("container");
			c.appendChild(qtoolbar(input.editMode));
			c.appendChild(qtable(input));
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
var arr_temp; // This is for the memory where we save the data temporarily.
var months = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ",
		"Sep ", "Oct ", "Nov ", "Dec " ];
function dayshift(datetype, rowID, rowNum, NOD) {
	var cell = document.getElementById(rowID).cells[datetype];
	var date = new Date(arr_temp[rowNum][datetype]);
	date.setDate(date.getDate() + NOD);
	arr_temp[rowNum][datetype] = date.toString();
	cell.innerHTML = months[date.getMonth()] + date.getDate() + " at "
			+ date.getHours() + ":" + date.getMinutes();
	if (checkDates(rowNum)) {
		dayshift(datetype, rowID, rowNum, -NOD);
	}
}
/*
 * Check the dates before each time you change them. Open date must be earlier
 * than due date and close date; Due date must later than open date but no later
 * than close date; Close date must be later than open date and no earlier than
 * due date. Return ture if an error happens
 */
function checkDates(rowNum) {
	var opendate = new Date(arr_temp[rowNum][2]);
	var closedate = new Date(arr_temp[rowNum][3]);
	var duedate = new Date(arr_temp[rowNum][4]);
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
function condDayShift(rowID, rowNum, NOD) {
	if (document.getElementById("selectOpenDate").checked == true) {
		dayshift(2, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectCloseDate").checked == true) {
		dayshift(3, rowID, rowNum, NOD);
	}
	if (document.getElementById("selectDueDate").checked == true) {
		dayshift(4, rowID, rowNum, NOD);
	}
}
// make day shift buttons i.e. (-7, -1, +1, +7)
function mkDSButtons(rowID, rowNum) {
	var d = document.createElement("div");
	Util.add(d, [
	    Util.button("-7", null, null, function() {
		condDayShift(rowID, rowNum, -7)
	}),
		Util.button("-1", null, null, function() {
		condDayShift(rowID, rowNum, -1)
	}),
		Util.button("+1", null, null, function() {
		condDayShift(rowID, rowNum, +1)
	}),
		Util.button("+7", null, null, function() {
			condDayShift(rowID, rowNum, +7)
	}) 
	]);
	return d;
}

function mkth(parent, txt, colspan) { // make table head cell
	var th = document.createElement("th");
	th.innerHTML = txt;
	th.colSpan = colspan;
	parent.appendChild(th);
	return th;
}
// TODO START HERE
function qtoolbar(editMode) {
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
	if (editMode) {
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

function qtable(input) {
	arr_temp = input.quizzes;
	var t = document.createElement("table");
	t.border = "1";
	/* **************** table head for current quizzes **************** */
	var h1 = t.insertRow(0);
	mkth(h1, "Current Quizzes", 2);
	mkth(h1, "Open", "1");
	mkth(h1, "Close", "1");
	mkth(h1, "Due", "1");
	mkth(h1, "Points", "1");
	mkth(h1, "Questions", "1");
	/* **************** table head for current quizzes **************** */
	/* **************** table head for closed quizzes **************** */
	var h2 = t.insertRow(1);
	mkth(h2, "Closed Quizzes", 8);
	/* **************** table head for closed quizzes **************** */
	/* **************** table body **************** */
	for (var i = 1; i < arr_temp.length; i++) {
		var tr = t.insertRow(i);
		tr.id = arr_temp[i][0];
		var cell0 = tr.insertCell(0);
		for (var j = 1; j < arr_temp[i].length; j++) {
			var c = tr.insertCell(-1);
			c.innerHTML = arr_temp[i][j];
		}
		var opendate = new Date(arr_temp[i][2]);
		tr.cells[2].innerHTML = months[opendate.getMonth()]
				+ opendate.getDate() + " at " + opendate.getHours() + ":"
				+ opendate.getMinutes();
		var closedate = new Date(arr_temp[i][3]);
		tr.cells[3].innerHTML = months[closedate.getMonth()]
				+ closedate.getDate() + " at " + closedate.getHours() + ":"
				+ closedate.getMinutes();
		var duedate = new Date(arr_temp[i][4]);
		tr.cells[4].innerHTML = months[duedate.getMonth()] + duedate.getDate()
				+ " at " + duedate.getHours() + ":" + duedate.getMinutes();
	}
	/* **************** table body **************** */
	/* **************** edit functions for edit mode **************** */
	if (input.editMode) {
		h1.cells[1].appendChild(Util.checkbox(null, null, null,
				"selectOpenDate", false));
		h1.cells[2].appendChild(Util.checkbox(null, null, null,
				"selectCloseDate", true));
		h1.cells[3].appendChild(Util.checkbox(null, null, null,
				"selectDueDate", true));
		for (var i = 1; i < arr_temp.length; i++) {
			t.rows[i].cells[0].appendChild(Util.checkbox(null, null, null,
					null, false));
			t.rows[i].cells[1].appendChild(Util.br());
			t.rows[i].cells[1].appendChild(mkDSButtons(t.rows[i].id, i));
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
