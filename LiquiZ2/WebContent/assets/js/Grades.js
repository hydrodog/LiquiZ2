/**
 * 
 * @Author: Dov Kruger, Jack Ziqi Tan
 * 
 * Read in the AJAX Grades, draw them on screen as a spreadsheet Clicking on
 * each column should sort on that column. Clicking again should reverse sorting
 * order.
 * 
 */

function gtoolbar() {
	var gtoolbar = Util.div();
	/* **************** search div **************** */
	var srch_div = Util.div();
	gtoolbar.appendChild(srch_div);
	srch_div.appendChild(Util.make("input", {
		type : "search",
		placeholder : "Filter by student name or ID"
	}));
	/* **************** search div **************** */
	/* **************** buttons div **************** */
	var btns_div = Util.div();
	gtoolbar.appendChild(btns_div);
	btns_div.appendChild(Util.button("Import"));
	btns_div.appendChild(Util.button("Export"));
	btns_div.appendChild(Util.select("gradesOptions", false, [
			"View Grading History", "Set Group Weights", "Hide Student Names",
			"Arrenge columns by due date", "Treat Ungraded as 0",
			"Show Concluded Enrollments", "Show Notes Column" ]));
	/* **************** buttons div **************** */
	return gtoolbar;
}
function gtable(g) {
	this.temp = g;
	this.table = Util.make("table", {
		className : "spread",
	});
	this.primaryIndex = null;
	this.secondIndex = 1;
	this.order = 1; // Order: "1" for ascending, "-1" for descending.
	if (temp.length > 0) {
		var h = table.insertRow(0);
		for (var i = 0; i < temp[0].length; i++) {
			var c = h.insertCell(i);
			c.innerHTML = temp[0][i];
			c.className = temp[1][i];
			c.onclick = function(event) {
				gtable.clickColumn(event);
			}
		}
	}
	for (var i = 2; i < temp.length; i++) {
		var r = table.insertRow(-1);
		for (var j = 0; j < temp[i].length; j++) {
			var c = r.insertCell(j);
			c.innerHTML = temp[i][j];
		}
	}
	return (this.table);
}
// A dictionary for comparing letter grades
gtable.compareLetterGrade = function(a, b) {
	var scale = {
		'A+' : 1.3,
		'A' : 1.2,
		'A-' : 1.1,
		'B+' : 1.0,
		'B' : 0.9,
		'B-' : 0.8,
		'C+' : 0.7,
		'C' : 0.6,
		'C-' : 0.5,
		'D+' : 0.4,
		'D' : 0.3,
		'D-' : 0.2,
		'F' : 0.1,
	};
	if (scale[a] < scale[b])
		return -1;
	else if (scale[a] > scale[b])
		return 1;
	return 0;
}

gtable.compare = function(a, b) {
	// For comparing letter grades:
	if (table.rows[0].cells[primaryIndex].className == "letterGrade") {
		if (gtable.compareLetterGrade(a[primaryIndex], b[primaryIndex]) != 0)
			return order
					* gtable.compareLetterGrade(a[primaryIndex],
							b[primaryIndex]);
	}
	// For comparing numbers:
	else if (!isNaN(a[primaryIndex] - b[primaryIndex])) {
		if (a[primaryIndex] - b[primaryIndex] != 0)
			return order * (a[primaryIndex] - b[primaryIndex]);
	}
	// For comparing strings:
	else {
		if (a[primaryIndex].toUpperCase() < b[primaryIndex].toUpperCase())
			return -order;
		if (a[primaryIndex].toUpperCase() > b[primaryIndex].toUpperCase())
			return order;
	}
	// In case the primary index elements are equal(no matter numbers or
	// strings), use second index, note that the second index always sorts in
	// ascending order:
	if (a[secondIndex].toUpperCase() < b[secondIndex].toUpperCase())
		return -1;
	else if (a[secondIndex].toUpperCase() == b[secondIndex].toUpperCase())
		return 0;
	return 1;
}

gtable.clickColumn = function(e) {
	var td = e.currentTarget;
	// Order: "1" for ascending, "-1" for descending.
	if (td.cellIndex == primaryIndex)
		order = order == 1 ? -1 : 1;
	else {
		if (td.className == "gradeInfo")
			order = 1;
		else
			order = -1;
		primaryIndex = td.cellIndex;
	}
	temp = temp.slice(0, 2).concat(
			temp.slice(2, temp.length).sort(gtable.compare));
	// the temp has 1 more row than the table, cuz the 2nd row in temp is the
	// class names of the columns.
	for (var i = 1; i < temp.length - 1; i++) {
		var r = table.rows[i];
		for (var j = 0; j < temp[i].length; j++) {
			var c = r.cells[j];
			c.innerHTML = temp[i + 1][j];
		}
	}
}

function Grades(payload) {
	for ( var k in payload) {
		this[k] = payload[k];
	}
	this.body = document.getElementById("container");
	this.body.className = "grades";
}

Grades.prototype.exec = function() {
	this.body.appendChild(gtoolbar());
	this.body.appendChild(gtable(this.data));
}

/*
 * Grades.prototype.summary = function() { }}
 */
