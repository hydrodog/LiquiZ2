function layoutDivs(parent, list, x, y, dx, dy) {
    for (var i = 0; i < list.length; i++) {
	var d = document.createElement("div");
	d.style.position="absolute";
	d.style.left=x;
	d.style.top=y;
	d.innerHTML = list[i];
	x += dx; y += dy;
	parent.appendChild(d);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function grid(parent, rows, cols, x, y, width, height, color, list, f) {

    var d = document.createElement("div");
//    d.width=300;
    d.style.backgroundColor = color;
    d.style.position="absolute";
    d.style.left = x;
    d.style.top = y;
    var t = document.createElement("table");
    for (var i = 0; i < rows; i++) {
	var r = t.insertRow(i);
	for (var j = 0; j < cols; j++) {
	    var td = r.insertCell(j);
	    td.width = width;
	    td.height = height;
	    var x = f(list[i][j]);
	    x.width = width;
//	    x.height = height;
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
    var img = document.createElement("img");
    img.src = s;
    return img;
}

var suffixMap = {
    jpg: img,
    png: img,
    gif: img,
}
function suffix(s) {
    s=s+"";
    var suf = s.substring(s.lastIndexOf('.')+1);
    if (suffixMap[suf])
	return suffixMap[suf](s);
    return textnode(s);
}

function build() {
    var div = document.getElementById("draw");
    layoutDivs(div, ["hello", "hi", "prevyet", "shalom", "fu"], 20, 20, 0,+30);
    
    grid(div, 3, 3, 50,200, 100, 100, '#fdd',
	 [
	     [1,2,3],
	     [4,5,6],
	     [7,8,9]
	 ], textnode)

    grid(div, 3, 3, 0,300, 100, 100, '#def',
	 [
	     ['einstein.jpg','euler.jpg','einstein.jpg'],
	     ['PierredeFermat.jpg','IsaacNewton.jpg','Hilbert.jpg'],
	     ['Euklid.jpg','CarlFriedrichGauss.jpg','RenéDescartes.jpg'],
	 ], img)

    grid(div, 3, 3, 400,200, 100, 100, '#ddf',
	 [
	     ['einstein.jpg','Twas brillig','and the'],
	     ['slith toves',124.45,'Hilbert.jpg'],
	     ['Euclidean Geometry','Carl Friedrich Gauss','RenéDescartes.jpg'],
	 ], suffix)

    
}
