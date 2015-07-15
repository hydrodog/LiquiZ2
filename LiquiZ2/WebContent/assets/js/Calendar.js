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
	this.monthView = true;
    this.startDate = startDate;
    var s = "";
    for (var i = 0; i < days; i++){
		s += '0';
    }
    this.holidays = s;
    this.events = s;
    
    this.body = document.getElementById("container");
	this.body.className = "calendar";
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

/*
 * d is the date that being set and flag indicates mark or not
 */
Calendar.prototype.setHoliday = function(d, flag){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			if(flag)
				s += '1';
			else
				s += '0';
		}
		else{
			s += this.holidays.charAt(i);
		}
    }
    this.holidays = s;
}

Calendar.prototype.toggleHoliday = function(d){
	var date = this.getDateOfYear(d) - 1;
	var s = "";
	for (var i = 0; i < 365; i++){
		if(i == date){
			if(this.holidays.charAt(i) == '0')
				s += '1';
			else
				s += '0';
		}
		else{
			s += this.holidays.charAt(i);
		}
    }
    this.holidays = s;
}

Calendar.prototype.shiftHoliday = function(){
	var s = "";
	for(var i=0; i<365; i++){
		var flag = this.holidays.charAt((i-7+365)%365);
		s += flag;
	}
	this.holidays = s;
}

Calendar.prototype.resetHoliday = function(){
	var s = "";
    for (var i = 0; i < 365; i++){
		s += '0';
    }
    this.holidays = s;
    this.removeCalendar();
	this.body.appendChild(this.showCalendar());
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

/**
 * d is the day you want to mark
 * id is used for identifing a month in year view
 */
Calendar.prototype.toggleCell = function(d){
	this.toggleHoliday(d);
	//this.refreshMonth(d, id);
	this.removeCalendar();
	this.body.appendChild(this.showCalendar());
}

Calendar.prototype.markHoliday = function(idx){
	var dd = new Date(this.startDate); //dd is the first day of the year
	dd.setDate(1);
	dd.setMonth(0);
	for(var i=0; i<365; i++){
		if(dd.getDay() == idx)
			this.setHoliday(dd, true);
		dd.setDate(dd.getDate() + 1);
	}
	this.removeCalendar();
	this.body.appendChild(this.showCalendar());
}

Calendar.prototype.unmarkHoliday = function(idx){
	var dd = new Date(this.startDate); //dd is the first day of the year
	dd.setDate(1);
	dd.setMonth(0);
	for(var i=0; i<365; i++){
		if(dd.getDay() == idx)
			this.setHoliday(dd, false);
		dd.setDate(dd.getDate() + 1);
	}
	this.removeCalendar();
	this.body.appendChild(this.showCalendar());
}

Calendar.prototype.refreshMonth = function(d, id){
	id = (typeof id !== "undefined") ? id : "cal0";
	var div = document.getElementById(id);
	if(div != null){
		div.parentNode.replaceChild(this.month(d, this, id), div);
	}
}

Calendar.prototype.refreshYear = function(d){
	for(var i=0; i<12; i++){
		var id = "cal" + i;
		this.refreshMonth(d, id);
		d.setMonth(d.getMonth() + 1);
	}
}

Calendar.prototype.initialButtons = function(d, calendar){
	var b1 = Util.button("<<", null, null, function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() - 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		//var id = "cal0";
        	//calendar.refreshMonth(d, id);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    	else{
        	//calendar.refreshYear(d);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    });
    var b2 = Util.button("<", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() - 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		var id = "cal0";
        	//calendar.refreshMonth(d, id);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    	else{
        	//calendar.refreshYear(d);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    });
    var b3 = Util.button(">", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() + 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		//var id = "cal0";
        	//calendar.refreshMonth(d, id);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    	else{
        	//calendar.refreshYear(d);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    });
    var b4 = Util.button(">>", null, null, function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() + 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		//var id = "cal0";
        	//calendar.refreshMonth(d, id);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    	else{
        	//calendar.refreshYear(d);
    		calendar.removeCalendar();
    		calendar.body.appendChild(calendar.showCalendar());
    	}
    });
    
    var div = Util.div("calbutton", null);
    if(this.monthView){
	    div.appendChild(b1);
	    div.appendChild(b2);
	    div.appendChild(b3);
	    div.appendChild(b4);
    }
    else{
    	div.appendChild(b1);
	    div.appendChild(b4);
    }
    /*var t = document.createElement("table");
    t.className = "buttons";
    t.id = "buttons";
    var h = t.insertRow(0);
    fillRow(h, [b1, b2, b3, b4])*/
    return div;
}

/**
 * d is the date in which month you want to draw an month calendar;
 * calendar is the object you currently working with;
 * monthView is a boolean to show whether month view or year view;
 * id indicates which month you may want to change if you have a year view of the calendar;
 */
Calendar.prototype.month = function(d, calendar, id) {
    d = (typeof d !== "undefined") ? d : this.startDate;
	monthView = (typeof monthView !== "undefined") ? monthView : true;
	id = (typeof id !== "undefined") ? id : "cal0";
	var div = Util.div("calMonth", id);
    
	if(this.monthView)
		div.appendChild(this.initialButtons(d, calendar));
	div.appendChild(this.drawMonth(d, calendar, id));
    return div;
}

Calendar.prototype.drawMonth = function(d, calendar, id){
	var t = document.createElement("table");
    t.className = "calendar";
    t.id = "calendar";
    var h = t.insertRow(0);
    var blankTextNode = document.createTextNode(" ");
    fillRow(h, [
     blankTextNode, blankTextNode, document.createTextNode(d.getFullYear()), 
     document.createTextNode(" "), document.createTextNode(d.getMonth()+1), blankTextNode, blankTextNode
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
            else if(d.getMonth() == monthId){
            	c.innerHTML = d.getDate();
            	c.ondblclick = function(){
            		var id = this.parentNode.parentNode.parentNode.parentNode.id;//get working id in order to find the right month
            		var date = new Date(calendar.startDate);
            		if(!calendar.monthView)
            			date.setMonth(parseInt(id.substring(3)));
            		date.setDate(this.innerHTML);
            		calendar.toggleCell(date);
            		};
            	
            	var holidayFlag = this.holidays.charAt(this.getDateOfYear(d) - 1);
            	//var eventFlag = this.events.charAt(this.getDateOfYear(d) - 1);
            	if(holidayFlag == '1'){
            		/*if(eventFlag == '1'){
            			c.style.color = "blue";
            		}
            		else{
            			c.style.color = "red";
            		}*/
            		c.style.color = "red";
            	}
            	/*else if(eventFlag == '1'){
            		c.style.color = "green";
            	}*/
            	else{
            		c.style.color = "black";
            	}
                d.setDate(d.getDate() + 1);
            }
            else{
                rowFlag = true;
            }
        }
        if(rowFlag){
        	d.setMonth(d.getMonth() - 1);//go back to current month
        	break;
        }
	}
	
	return t;
}

Calendar.prototype.year = function(d) {
    var div = Util.div("calYear", "calYear");
    div.appendChild(this.initialButtons(d, this));
    for (var month = 0; month < 12; month++){
    	var id = "cal" + month;
    	div.appendChild(this.month(d, this, id));
    	d.setMonth(d.getMonth() + 1);
    }
    d.setMonth(d.getMonth() - 1);//back to the last year of the working calendar
    return div;
}

Calendar.prototype.showCalendar = function(id){
	id = (typeof id !== "undefined") ? id : "cal0";
	var d = new Date(this.startDate);
	if(this.monthView){
		return this.month(d, this, id);
	}	
	d.setMonth(0);
	return this.year(d);
}

Calendar.prototype.toolBar = function(calendar){
	var div = Util.div("toolbar", null);
	var b1 = Util.button("show month", "toolButton", "b1", function(){
		calendar.removeCalendar();
		calendar.monthView = true;
		calendar.body.appendChild(calendar.showCalendar());
	});
	
	var b2 = Util.button("show year", "toolButton", "b2", function(){
		calendar.removeCalendar();
		calendar.monthView = false;
		calendar.body.appendChild(calendar.showCalendar());
	});
	
	var s1 = Util.select("holiday indicator", false, "", "toolSelect", "s1");
	s1.add(Util.option("Sunday", "Sunday", null, null));
	s1.add(Util.option("Monday", "Monday", null, null));
	s1.add(Util.option("Tuesday", "Tuesday", null, null));
	s1.add(Util.option("Wednesday", "Wednesday", null, null));
	s1.add(Util.option("Thusday", "Thusday", null, null));
	s1.add(Util.option("Friday", "Friday", null, null));
	s1.add(Util.option("Saturday", "Saturday", null, null));
	
	var b3 = Util.button("mark holidays", "toolButton", "b3", function(){
		var idx = document.getElementById("s1").selectedIndex;
		calendar.markHoliday(idx);
	});
	
	var b4 = Util.button("unmark holidays", "toolButton", "b4", function(){
		var idx = document.getElementById("s1").selectedIndex;
		calendar.unmarkHoliday(idx);
	});
	
	var b5 = Util.button("reset holidays", "toolButton", "b5", function(){
		calendar.resetHoliday();
	});
	
	var b6 = Util.button("shift holidays", "toolButton", "b6", function(){
    	calendar.shiftHoliday();
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
	
	div.appendChild(b1);
	div.appendChild(b2);
	div.appendChild(s1);
	div.appendChild(b3);
	div.appendChild(b4);
	div.appendChild(b5);
	div.appendChild(b6);
	return div;
}

/*
 * remove previous calendar showing on the page
 */
Calendar.prototype.removeCalendar = function(){
	if(this.monthView){
		var month = document.getElementById("cal0");
		if(month != null){
			this.body.removeChild(month);
		}
	}
	else{
		var year = document.getElementById("calYear");
		if(year != null){
			this.body.removeChild(year);
		}
	}
}

Calendar.prototype.exec = function() {
	this.body.appendChild(this.toolBar(this));
	this.body.appendChild(this.showCalendar());
}