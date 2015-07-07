/**
 * Calendar
 * author: Yue
 * 
 * Represents a year or more calendar
 * Can define holidays, select a date
 * shift dates by a fixed number of days
 * and compute a fallback if that day falls on a holiday.
 */
function Calendar(startDate, days) {
    this.startDate = startDate;
    var s = "";
    for (var i = 0; i < days; i++){
		s += '0';
    }
    this.holidays = s;
    this.events = s;
}

Calendar.prototype.shift = function(days) {
	this.startDate.setDate(this.startDate.getDate() + days);
}

Calendar.prototype.week = function(parent) {

}

Calendar.prototype.getDateOfYear = function(d) {
	var endDateOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var dateOfYear = 0;
	var month = d.getMonth();
	for(var i=0; i<month; i++){
		dateOfYear += endDateOfMonth[i];
	}
	dateOfYear += d.getDate();
	return dateOfYear;
}


//TODO: Don't process this in a loop, index into the correct position and set it.
Calendar.prototype.setHoliday = function(d){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			s += '1';
		}
		else{
			s += this.holidays.charAt(i);
		}
    }
    this.holidays = s;
}

Calendar.prototype.setEvent = function(d){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			if(this.events.charAt(i) == '1')
				s += '0';
			else
				s += '1';
		}
		else{
			s += this.events.charAt(i);
		}
    }
    this.events = s;
}

Calendar.prototype.markCell = function(date, d){
	var dd = new Date();
	dd.setDate(date);
	dd.setMonth(d.getMonth());
	this.setEvent(dd);
	var t = document.getElementById("cal");
	if(t != null){
		t.parentNode.replaceChild(this.month(d, this), t);
	}
}

Calendar.prototype.month = function(d, calendar) {
    //d = (typeof d !== "undefined") ? d : this.startDate;
    var t = document.createElement("table");
    t.className = "cal";
    t.id = "cal";
    var h = t.insertRow(0);
    var b1 = Util.button("<<", null, null, function(){});
    b1.onclick = function(){
    	d.setFullYear(d.getFullYear() - 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b2 = Util.button("<", null, null, function(){});
    b2.onclick = function(){
    	d.setMonth(d.getMonth() - 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b3 = Util.button(">", null, null, function(){});
    b3.onclick = function(){
    	d.setMonth(d.getMonth() + 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    };
    var b4 = Util.button(">>", null, null, function(){});
    b4.onclick = function(){
    	d.setFullYear(d.getFullYear() + 1);
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }; 
    var b5 = Util.button("shift", null, null, function(){});
    b5.onclick = function(){
    	var s = "";
    	for(var i=0; i<365; i++){
    		var flag = calendar.events.charAt((i-7+365)%365);
    		s += flag;
    	}
    	calendar.events = s;
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }
    var b6 = Util.button("mark holiday", null, null, function(){});
    b6.onclick = function(){
    	var dd = new Date(); //dd is the first day of the year
    	dd.setDate(1);
    	dd.setMonth(0);
    	dd.setFullYear(d.getFullYear());
    	for(var i=0; i<365; i++){
    		if(dd.getDay() == 0 || dd.getDay() == 6)
    			calendar.setHoliday(dd);
    		dd.setDate(dd.getDate() + 1);
    	}
    	var t = document.getElementById("cal");
    	if(t != null){
    		t.parentNode.replaceChild(calendar.month(d, calendar), t);
    	}
    }
    
    fillRow(h, [
     b1, b2, document.createTextNode(d.getFullYear()), document.createTextNode(" "), document.createTextNode(d.getMonth()+1), b3, b4, b5, b6
    ]);
    h = t.insertRow(1);
    fillRowText(h, ["S", "M", "T", "W", "T", "F", "S"]);   
    d.setDate(1);
    var monthId = d.getMonth();
    var dayOfWeek = d.getDay();
    d.setDate(d.getDate() - dayOfWeek); // get back to Sunday
	for (var i = 2; i <= 7; i++) {
        var r = t.insertRow(i);
        var rowFlag = false;
        for (var j = 0; j < 7; j++) {
            var c = r.insertCell(j);
            if(d.getMonth() == (monthId-1+12)%12){
                d.setDate(d.getDate() + 1);
            }
            else if (d.getMonth() == monthId){
            	c.innerHTML = d.getDate();
            	c.ondblclick = function(){calendar.markCell(this.innerHTML, d);};
            	
            	var holidayFlag = this.holidays.charAt(this.getDateOfYear(d) - 1);
            	var eventFlag = this.events.charAt(this.getDateOfYear(d) - 1);
            	if (holidayFlag == '1') {
            		c.style.color = eventFlag == '1' ? "blue" : "red";
            	}
            	else if(eventFlag == '1'){
            		c.style.color = "green";
            	}
            	else {
            		c.style.color = "black";
            	}
                d.setDate(d.getDate() + 1);
            }
            else {
                rowFlag = true;
            }
        }
        if (rowFlag){
        	d.setMonth(d.getMonth() - 1);//go back to current month
        	break;
        }
	}
    return t;
}

Calendar.prototype.year = function(calendar) {
    var div = document.createElement("div");
    var d = this.startDate;
    for (var month = 0; month < 12; month++){
    	div.appendChild(this.month(d, calendar));
    	d.setMonth(d.getMonth() + 1);
    }      
    return div;
}
