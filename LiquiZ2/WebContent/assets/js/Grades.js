/*
 * author: Dov Kruger
 * 
 * Read in the AJAX Grades, draw them on screen as a spreadsheet
 * Clicking on each column should sort on that column. Clicking again should reverse
 * sorting order.
 * 
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
		className : "spread"
	});
	this.primaryIndex = null;
	this.secondIndex = 1;
	this.compare = this.ascend;
	if (temp.length > 0) {
		var h = table.insertRow(0);
		for (var i = 0; i < temp[0].length; i++) {
			var c = h.insertCell(i);
			c.innerHTML = temp[0][i];
			c.onclick = function(event) {
				gtable.clickColumn(event);
			}
		}
	}
	for (var i = 1; i < temp.length; i++) {
		var r = table.insertRow(i);
		for (var j = 0; j < temp[i].length; j++) {
			var c = r.insertCell(j);
			c.innerHTML = temp[i][j];
		}
	}
	return (this.table);
}

gtable.ascend = function(a, b) {
	// For comparing numbers:
	if (!isNaN(a[primaryIndex] - b[primaryIndex])) {
		if (a[primaryIndex] - b[primaryIndex] != 0)
			return a[primaryIndex] - b[primaryIndex];
	}
	// For comparing strings:
	else {
		if (a[primaryIndex].toUpperCase() < b[primaryIndex].toUpperCase())
			return -1;
		if (a[primaryIndex].toUpperCase() > b[primaryIndex].toUpperCase())
			return 1;
	}
	// In case the primary index elements are equal(no matter numbers or
	// strings), use second index:
	if (a[secondIndex].toUpperCase() < b[secondIndex].toUpperCase())
		return -1;
	else if (a[secondIndex].toUpperCase() == b[secondIndex].toUpperCase())
		return 0;
	return 1;
}

gtable.descend = function(a, b) {
	return -gtable.ascend(a, b);
}

gtable.clickColumn = function(e) {
	var td = e.currentTarget;
	if (td.cellIndex == primaryIndex)
		this.compare = this.compare == this.ascend ? this.descend : this.ascend;
	else {
		this.compare = this.ascend;
		primaryIndex = td.cellIndex;
	}
	temp = temp.slice(0, 1).concat(
			temp.slice(1, temp.length).sort(this.compare));
	// temp = temp.shift().concat(temp.sort(compare));
	for (var i = 0; i < temp.length; i++) {
		var r = table.rows[i];
		for (var j = 0; j < temp[i].length; j++) {
			var c = r.cells[j];
			c.innerHTML = temp[i][j];
		}
	}
}

function Grades(gradeinfo, list) {
	for ( var k in gradeinfo) {
		this[k] = gradeinfo[k];
	}
	this.body = document.getElementById("container");
	this.body.className = "grades";
	this.list = list;
}

Grades.prototype.exec = function() {
	this.body.appendChild(gtoolbar());
	this.body.appendChild(gtable(this.list));
}

/*
 * Grades.prototype.summary = function() { }}
 */
