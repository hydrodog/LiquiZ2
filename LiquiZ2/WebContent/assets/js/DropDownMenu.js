window.addEventListener("load",function(){
	console.log("WARNING NOT MADE FOR IOS - WILL FIX IT - STEPHEN");
	var dropdown = document.getElementsByClassName("midropdown")[0];
	var dropcontrol = document.getElementsByClassName("midropcontrol")[0];
	var mouseholder = null;
	var mouseover = function(){
		if(dropdown.style.display != "block")
			dropdown.style.display="block";
		mouseholder = this;
	};
	var mouseout = function(){
		if(mouseholder == this)
			if(dropdown.style.display != "none")
				dropdown.style.display="none";
	};
	dropdown.onmouseover=mouseover;
	dropcontrol.onmouseover=mouseover;
	dropdown.onmouseout=mouseout;
	dropcontrol.onmouseout=mouseout;
});
	