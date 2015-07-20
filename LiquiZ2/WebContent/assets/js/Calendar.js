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
    this.holidays = [];
    for (var i = 0; i < days; i++){
    	this.holidays.push('0');
    }
    this.monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.endDateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.body = document.getElementById("container");
	this.body.className = "calendar";
}

Calendar.prototype.getDateOfYear = function(d) {
	var dateOfYear = 0;
	var month = d.getMonth();
	for(var i=0; i<month; i++){
		dateOfYear += this.endDateOfMonth[i];
	}
	dateOfYear += d.getDate();
	return dateOfYear;
}

/*
 * d is the date that being set
 * flag indicates mark or not
 */
Calendar.prototype.setHoliday = function(d, flag){
	var date = this.getDateOfYear(d) - 1;
	if(flag){
		this.holidays[date] = '1';
	}
	else{
		this.holidays[date] = '0';
	}
}

Calendar.prototype.toggleHoliday = function(d){
	var date = this.getDateOfYear(d) - 1;
	if(this.holidays[date] == '0'){
		this.holidays[date] = '1';
	}
	else {
		this.holidays[date] = '0';
	}
}

Calendar.prototype.shiftHoliday = function(){
	var holidays = [];
	for(var i=0; i<365; i++){
		holidays[i] = this.holidays[(i-7+365)%365];
	}
	this.holidays = holidays;
}

Calendar.prototype.resetHoliday = function(){
	for (var i = 0; i < this.holidays.length; i++){
		this.holidays[i] = '0';
    }
}

Calendar.prototype.markHoliday = function(idx){
	var d = new Date(this.startDate);
	d.setDate(1);
	d.setMonth(0); //d is the first day of the year
	for(var i=0; i<this.holidays.length; i++){
		if(d.getDay() == idx){
			this.setHoliday(d, true);
		}
		d.setDate(d.getDate() + 1);
	}
}

Calendar.prototype.unmarkHoliday = function(idx){
	var d = new Date(this.startDate);
	d.setDate(1);
	d.setMonth(0); //d is the first day of the year
	for(var i=0; i<this.holidays.length; i++){
		if(d.getDay() == idx)
			this.setHoliday(d, false);
		d.setDate(d.getDate() + 1);
	}
}

Calendar.prototype.initialButtons = function(){
	var calendar = this;
	var b1 = Util.button("<<", null, null, function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() - 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b2 = Util.button("<", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() - 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b3 = Util.button(">", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() + 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b4 = Util.button(">>", null, null, function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() + 1);
		calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
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
    return div;
}

/**
 * d is the date in which month you want to draw an month calendar;
 * optional id indicates which month you are drawing if you have a year view of the calendar;
 */
Calendar.prototype.month = function(d, id) {
	id = (typeof id !== "undefined") ? id : "cal0";
	var div = Util.div("calMonth", id);
    
	if(this.monthView){
		div.appendChild(this.initialButtons());
	}
	div.appendChild(this.drawMonth(d, id));
    return div;
}

Calendar.prototype.drawMonth = function(d, id){
	var calendar = this;
	
	// generate header of one month    
    var t = Util.make("table", {className : "calendar", id : "calendar"});
    var h = t.insertRow(0);
    var th = Util.make("th", {
        scope : "col",
        innerHTML : d.getFullYear() + " " + this.monthAbbr[d.getMonth()],
        colSpan : 7
    });
    h.appendChild(th);
    
    h = t.insertRow(1);
    fillRowText(h, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    d.setDate(1);
    var monthId = d.getMonth();
    var dayOfWeek = d.getDay();
    d.setDate(d.getDate() - dayOfWeek); // go back to Sunday
    
    // generate a calendar month week by week (5 is the most possible weeks contained by one month)
	for (var i = 2; i <= 7; i++) {
        var r = t.insertRow(i);
        var rowFlag = false; // indicates whether it is the last week of this month
        
        // generate one week of a month
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
            		if(!calendar.monthView){
            			date.setMonth(parseInt(id.substring(3)));
            		}
            		date.setDate(this.innerHTML);
            		calendar.toggleHoliday(date);
            		calendar.removeCalendar();
            		calendar.body.appendChild(calendar.showCalendar());
            		};
            	
            	var holidayFlag = this.holidays[this.getDateOfYear(d) - 1];
            	// here is the place we can do other things for marked holidays, turning red for illustration purpose
            	if(holidayFlag == '1'){
            		c.style.color = "red";
            	}
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
    div.appendChild(this.initialButtons());
    for (var month = 0; month < 12; month++){
    	var id = "cal" + month;
    	div.appendChild(this.month(d, id));
    	d.setMonth(d.getMonth() + 1);
    }
    d.setMonth(d.getMonth() - 1);//back to the last year of the working calendar
    return div;
}

Calendar.prototype.showCalendar = function(){
	var d = new Date(this.startDate);
	if(this.monthView){
		return this.month(d);
	}
	else{
		d.setMonth(0);
		return this.year(d);
	}
}

Calendar.prototype.toolBar = function(){
	var calendar = this;
	var div = Util.div("toolbar", null);
	var b1 = Util.button("show month", "toolButton", "b1", function(){
		if(!calendar.monthView){
			calendar.removeCalendar();
			calendar.monthView = true;
			calendar.body.appendChild(calendar.showCalendar());
		}
	});
	
	var b2 = Util.button("show year", "toolButton", "b2", function(){
		if(calendar.monthView){
			calendar.removeCalendar();
			calendar.monthView = false;
			calendar.body.appendChild(calendar.showCalendar());
		}
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
		calendar.removeCalendar();
		calendar.body.appendChild(calendar.showCalendar());
	});
	
	var b4 = Util.button("unmark holidays", "toolButton", "b4", function(){
		var idx = document.getElementById("s1").selectedIndex;
		calendar.unmarkHoliday(idx);
		calendar.removeCalendar();
		calendar.body.appendChild(calendar.showCalendar());
	});
	
	var b5 = Util.button("reset holidays", "toolButton", "b5", function(){
		calendar.resetHoliday();
		calendar.removeCalendar();
		calendar.body.appendChild(calendar.showCalendar());
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
	this.body.appendChild(this.toolBar());
	this.body.appendChild(this.showCalendar());
}