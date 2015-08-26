/**
 * Calendar
 * author: Yue
 * 
 * Represents a year or more calendar
 * Can define holidays, select a date
 * shift dates by a fixed number of days
 * and compute a fallback if that day falls on a holiday.
 */

function Calendar(payload) {
    for ( var k in payload) {
        this[k] = payload[k];
    }
    this.startDate = new Date();
    //this.startDate = (typeof this.startDate === null) ? new Date() : this.startDate;
    this.currentDate = this.startDate;

	this.render = this.renderMonth; // default view is monthly
    this.holidays = new Array(366);
    for (var i = 0; i < this.holidays.length; i++){
    	this.holidays[i] = false;
    }
    this.container = document.getElementById("container");
}

Calendar.monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Calendar.DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Calendar.WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
Calendar.REGULAR_STYLE = "cal";
Calendar.HOLIDAY_STYLE = "calhol";
Calendar.HIGHLIGHT_STYLE ="calhi";

Calendar.prototype.getDateOfYear = function(d) {
	var dateOfYear = 0;
	var month = d.getMonth();
	for(var i=0; i<month; i++){
		dateOfYear += Calendar.DAYS_PER_MONTH[i];
	}
	dateOfYear += d.getDate();
	return dateOfYear;
}

Calendar.prototype.clearHolidays = function(){
    for (var i = 0; i < this.holidays.length; i++) {
        this.holidays[i] = false;
    }
}

/*
 * set holiday status of date d to true or false
 */
Calendar.prototype.setHoliday = function(d, flag){
	this.holidays[this.getDateOfYear(d) - 1] = flag;
}

Calendar.prototype.isHoliday = function(d){
    return this.holidays[this.getDateOfYear(d) - 1];
}

/*
 * set holiday status of date d, d+x,d+2x,... to true or false
 */
Calendar.prototype.setHolidays = function(d, delta, count, flag){
    var ind = this.getDateOfYear(d) - 1;
    for (var i = 0; i < count; i++) {
        this.holidays[ind] = flag;
        ind += delta;
    }
}

// Reverse holiday status of a date
Calendar.prototype.toggleHoliday = function(d){
    this.holidays[this.getDateOfYear(d) - 1] ^= 1;
}

Calendar.prototype.shiftHoliday = function(){
	var holidays = [];
	for(var i=0; i<365; i++){
		holidays[i] = this.holidays[(i-7+365)%365];
	}
	this.holidays = holidays;
}

//Calendar.prototype.

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

Calendar.prototype.setMonthly = function() {
    this.startDate.setFullYear(this.startDate.getFullYear() - 1);
    this.exec();
}

Calendar.prototype.renderButtons = function(){
	var calendar = this;
	var b1 = Util.button("<<", function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() - 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b2 = Util.button("<", function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() - 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b3 = Util.button(">", function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() + 1);
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    var b4 = Util.button(">>", function(){
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
	var div = Util.div("calMonth", id);
    
	if(this.monthView){
		div.appendChild(this.initialButtons());
	}
	div.appendChild(this.drawMonth(d, id));
    return div;
}

// draw a monthly calendar with the buttons needed to traverse through time
Calendar.prototype.renderMonth = function(d){
    this.renderButtons();
    this.body.appendChild(this.drawMonth(d));
}

//internal function used by renderMonth and renderYear
// draw the table for a monthly calendar with no external decoration
Calendar.prototype.drawMonth = function(d){
    var dayOfWeek = d.getDay();
    d.setDate(1);
    var monthId = d.getMonth();
    var start = d.setDate(d.getDate() - dayOfWeek); // go back to Sunday

    var t = Util.table();
    var r = t.appendRow();
    r.appendChild(Util.td(
        Util.make("th", {
            innerHTML : d.getFullYear() + " " + Calendar.monthAbbr[d.getMonth()],
            colSpan : 7
        }) ));

    for (var j = 0; j < 5; j++) {
        r = t.appendRow();
        for (var i = 0; i < 7; i++) {
            var c = r.appendChild();
            c.innerHTML = d;
            c.className = this.isHoliday(d) ? Calendar.HOLIDAY_STYLE : Calendar.REGULAR_STYLE;
            d.setDate(d.getDate() + 1);
        }
        if (d.getMonth() > monthId)
            break; // stop at row 4 if it's a short month (only Feb? only if 1 is top-left?)
    }
}

Calendar.prototype.renderYear = function(d) {
    this.renderButtons();

    var t = Util.table();
    for (var i = 0; i < 4; i++) {
        var r = t.insertRow(i);
        for (var j = 0; j < 3; j++) {
            var c = r.appendCell();
            c.appendChild(this.drawMonth());
        }
    }

    div.appendChild(this.initialButtons());
    //var months = [];
    for (var month = 0; month < 12; month++){
    	var id = "cal" + month;
    	div.appendChild(this.month(d, id));
        //months.push(this.month(d, id));
    	d.setMonth(d.getMonth() + 1);
    }
    //var t = Util.table(months, false);
    //div.appendChild(t);
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
    var b1 = Util.button("show month", function(){
	    calendar.render = calendar.renderMonth;
	    calendar.exec();
	}, "toolButton", "b1");
    
    var b2 = Util.button("show year", function(){
	if(calendar.monthView){	   
	    calendar.render = calendar.renderYear;
	    calendar.exec();
	}
    }, "toolButton", "b2");
    
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday",
		"Thusday", "Friday", "Saturday"];
    var s1 = Util.select("holiday indicator", false, days, "toolSelect", "s1");	
    var b3 = Util.button("mark holidays", function(){
	var idx = document.getElementById("s1").selectedIndex;
	calendar.markHoliday(idx);
	calendar.removeCalendar();
	calendar.body.appendChild(calendar.showCalendar());
    }, "toolButton", "b3");
    
    var b4 = Util.button("unmark holidays", function(){
	var idx = document.getElementById("s1").selectedIndex;
	calendar.unmarkHoliday(idx);
	calendar.removeCalendar();
	calendar.body.appendChild(calendar.showCalendar());
    }, "toolButton", "b4");
    
    var b5 = Util.button("reset holidays", function(){
	calendar.resetHoliday();
	calendar.removeCalendar();
	calendar.body.appendChild(calendar.showCalendar());
    }, "toolButton", "b5");
	
    var b6 = Util.button("shift holidays", "toolButton", "b6", function(){
    	calendar.shiftHoliday();
    	calendar.removeCalendar();
    	calendar.body.appendChild(calendar.showCalendar());
    });
    return Util.divadd("toolbar", b1, b2, s1, b3, b4, b5, b6);
}

Calendar.prototype.exec = function() {
    this.container.innerHTML = "";
    this.body = Util.divadd("calendar", this.toolBar());
    this.container.appendChild(this.body);
	this.render();
}
