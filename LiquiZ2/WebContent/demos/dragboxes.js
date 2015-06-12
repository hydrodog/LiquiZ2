function mkinput(id, type, className) {
    var inp = document.createElement("input");
    inp.id = id;
    inp.type = type;
    inp.className = className;
    return inp;
}

function emptyGrid(parent, id, rows, cols, header) {
    var l;
    var returnHeader = false;
    i = 0;
    if (header) {
        l = new Array(rows+1);
        l[0] = header;
        i = 1;
        returnHeader = true;
    } else {
        l = new Array(rows);
    }

    for (i; i < l.length; i++) {
        l[i] = new Array(cols);
        for (j = 0; j < l[i].length; j++) {
            l[i][j] = "%%input%%";
        }
    }
    grid(parent, id, l, returnHeader);
}


function grid(parent, id, list, header) {
    var d = document.createElement("div");
    var t = document.createElement("table");
    suffixMap.inputCount = 0;
    if (header) {
        headList = list.shift();
        thead = t.createTHead();
        for (i = 0; i < headList.length; i++) {
            td = document.createElement("td");
            x = suffix(headList[i], id);
            td.appendChild(x);
            thead.appendChild(td);
        }
    }
    for (i = 0; i < list.length; i++) {
        r = t.insertRow(-1);
    	for (var j = 0; j < list[i].length; j++) {
    	    var td = r.insertCell(-1);
    	    var x = suffix(list[i][j], id);
    	    td.appendChild(x);
    	}
    }
    d.appendChild(t);
    parent.appendChild(d);
}

function textnode(s) {
    return document.createTextNode(s);
}

function img(s) {
    e = document.createElement("img");
    e.src = s;
    return e;
}

function tableInput(s, id) {
    input = mkinput(id + "_" + suffixMap.inputCount, "text", "grid-input");
    suffixMap.inputCount++;
    return input;
}

var suffixMap = {
    inputCount: 0,
    "jpg": img,
    "png": img,
    "gif": img,
    "%%input%%": tableInput,
};

function suffix(s, id) {
    s += "";
    var suf = s.split('.').pop();
    if (suffixMap[suf])
	   return suffixMap[suf](s, true, id);
    return textnode(s);
}

function build() {
    var div = document.getElementById("draw");
    grid(div, 1,
	 [
         ["col 1", "%%input%%", "col 3"],
	     [1,2,3],
	     [4,5,6],
	     ["%%input%%", "%%input%%", "%%input%%"]
	 ], true);

    emptyGrid(div, 2, 6, 4, ["header 1", "Cats", "aliens", "origami doughnuts"]);

    grid(div, 3,
	 [
	     ['einstein.jpg','euler.jpg','einstein.jpg'],
	     ['PierredeFermat.jpg','IsaacNewton.jpg','Hilbert.jpg'],
	     ['Euklid.jpg','CarlFriedrichGauss.jpg','RenéDescartes.jpg'],
	 ]);

    grid(div, 4,
	 [
	     ['einstein.jpg','Twas .brillig','and the'],
	     ['slith toves',124.45,'Hilbert.jpg'],
	     ['Euclidean Geometry','Carl Friedrich Gauss','RenéDescartes.jpg'],
	 ]);

    
}
