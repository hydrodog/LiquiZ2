var DivWindow = function(popup, popup_drag, popup_exit, varwidth, varheight, zindex) {
	this.popup = popup; //outline div id 
	this.popup_drag = popup_drag;	//header for drag
	this.height = varheight; //div height
	this.width = varwidth; //div width
	this.popup_exit = popup_exit;
	this.zindex = zindex;
	this.init = function() { //initialize div
		this.popupShow();
		this.startDrag(); //set drag
		this.close(); //set close
	};
	this.init();
};

//drag
DivWindow.prototype.Drag = function(o, oRoot) {
	var dragObj = this; //drag object = this
	this.obj = (typeof oRoot != "undefined") ? oRoot : o;
	this.relLeft = 0; //record left position
	this.relTop = 0; //record top position
	o.onselectstart = function() {
		return false;
	};
	o.onmousedown = function(e) { 
		e = dragObj.fixE(e);
		dragObj.relLeft = e.clientX - dragObj.fixU(dragObj.obj.style.left);
		dragObj.relTop = e.clientY - dragObj.fixU(dragObj.obj.style.top);
		document.onmousemove = function(e) {
			dragObj.drag(e);
			e.stopPropagation();
		};
		document.onmouseup = function() {
			dragObj.end();
		};
	};

	this.drag = function(e) { //drag
		e = this.fixE(e);
		var l = e.clientX - this.relLeft;
		var t = e.clientY - this.relTop;
		if (t < 0) {
			t = 0; //in case that header disappear
		}
		this.obj.style.left = l + "px";
		this.obj.style.top = t + "px";
	};
	this.end = function() { //drag end
		document.onmousemove = null;
		document.onmouseup = null;
	};
	this.fixE = function(e) { //in case that event lost
		if (typeof e == "undefined")
			e = window.event;
		return e;
	};
	this.fixU = function(u) { //split the px of left/top position
		return parseInt(u.split("p")[0]);
	};
};

//start drag
DivWindow.prototype.startDrag = function() {
	var obj = document.getElementById(this.popup);
	var drag = document.getElementById(this.popup_drag);
	new this.Drag(drag, obj);
};

//display
DivWindow.prototype.popupShow = function() {
	var element = document.getElementById(this.popup);
	element.style.position = "absolute";
	element.style.visibility = "visible";
	element.style.display = "block";
	element.style.width = this.width + "px";
//	element.style.height = this.height + "px";
//	console.log(this.width);
	element.style.left = (document.body.clientWidth - this.width) / 2 + "px";
	//element.style.top = (document.body.offsetHeight - this.height) / 2 + "px";	//if page is too short, it's useless
	element.style.top = elemOffsetTop(element) + "px";
	element.style.margin = 0;
	element.style.padding = 0;
	element.style.zIndex = this.zindex;
};

//close
DivWindow.prototype.close = function() {
	var obj = document.getElementById(this.popup);
	var exit = document.getElementById(this.popup_exit);
	console.log(exit);
	exit.onclick = function() {
		obj.style.display = "none";
		obj.style.visibility = 'hidden';
		//TODO: add cursor control
	};
};