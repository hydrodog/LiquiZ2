var g = [
    ["First Name", "Last Name", "Id", "HW1"],
    ["moshe", "kruger", "2", 90],
    ["dov", "kruger", "1", 50],
    ["Asher", "Davidson", "3", 95],
    ["Yu-Dong", "Yao", "4", 92],
    ["Xuefan", "Wu", "5", 93],
];

var table;
var primaryIndex = 0, secondIndex = 1;
var compare;
function ascend(a,b) {
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

function descend(a,b) {
    return -ascend(a,b);
}

function clickColumn(e) {
    var td = e.currentTarget;
    if (td.cellIndex == primaryIndex)
	compare = compare == ascend ? descend : ascend;
    else {
	compare = ascend;
	primaryIndex = td.cellIndex;
    }
    
    g = g.slice(0,1).concat(g.slice(1,g.length).sort(compare));
//    g = g.shift().concat(g.sort(compare));
    for (var i = 0; i < g.length; i++) {
	var r = table.rows[i];
	for (var j = 0; j < g[i].length; j++) {
	    var c = r.cells[j];
	    c.innerHTML = g[i][j];
	}
    }
}

function spread(parent, g) {
    table = document.createElement("table");
    if (g.length > 0) {
	var h = table.insertRow(0);
	for (var i = 0; i < g[0].length; i++) {
	    var c = h.insertCell(i);
	    c.innerHTML = g[0][i];
	    c.onclick = function(event) { clickColumn(event, this)}
	}
    }
    for (var i = 1; i < g.length; i++) {
	var r = table.insertRow(i);
	for (var j = 0; j < g[i].length; j++) {
	    var c = r.insertCell(j);
	    c.innerHTML = g[i][j];
	}
    }
    parent.appendChild(table);
}
	    
function build() {
    spread(document.getElementById("content"), g);
}
