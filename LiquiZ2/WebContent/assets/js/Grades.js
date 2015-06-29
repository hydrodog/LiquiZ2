/*
 * author: Dov Kruger
 * 
 * Read in the AJAX Grades, draw them on screen as a spreadsheet
 * Clicking on each column should sort on that column. Clicking again should reverse
 * sorting order.
 * 
 * 
 */

function Spreadsheet(parent, g) {
	this.table = Util.table("spread");
	this.primaryIndex = 0;
	this.secondIndex = 1;
	this.compare = this.ascend;
	if (g.length > 0) {
		var h = table.insertRow(0);
		for (var i = 0; i < g[0].length; i++) {
			var c = h.insertCell(i);
			c.innerHTML = g[0][i];
			c.onclick = function(event) { this.clickColumn(event)}
		}
	}
	for (var i = 1; i < g.length; i++) {
		var r = table.insertRow(i);
		for (var j = 0; j < g[i].length; j++) {
			var c = r.insertCell(j);
			c.innerHTML = g[i][j];
		}
	}
	parent.appendChild(this.table);
}

Spreadsheet.ascend = function(a,b) {
	if (a[primaryIndex] < b[primaryIndex])
		return -1;
	else if (a[primaryIndex] == b[primaryIndex]) {
		if (a[secondIndex] < b[secondIndex])
			return -1;
		else if (a[secondIndex] == b[secondIndex])
			return 0;
	}
	return 1;
}

Spreadsheet.descend = function(a,b) {
	return -Spreadsheet.ascend(a,b);
}

Spreadsheet.clickColumn = function(e) {
	var td = e.currentTarget;
	if (td.cellIndex == primaryIndex)
		this.compare = this.compare == this.ascend ? this.descend : this.ascend;
	else {
		this.compare = this.ascend;
		primaryIndex = td.cellIndex;
	}

	g = g.slice(0,1).concat(g.slice(1,g.length).sort(compare));
//	g = g.shift().concat(g.sort(compare));
	for (var i = 0; i < g.length; i++) {
		var r = this.table.rows[i];
		for (var j = 0; j < g[i].length; j++) {
			var c = r.cells[j];
			c.innerHTML = g[i][j];
		}
	}
}
