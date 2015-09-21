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
Calendar.DAYS_PER_MONTH =   [31, 28, 31, 30,  31,  30,  31,  31,  30,  31,  30, 31];
Calendar.JULDATE =          [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
Calendar.WEEKDAY_ABBR =     ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
Calendar.WEEKDAY =          ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];

Calendar.REGULAR_STYLE = "cal";
Calendar.HOLIDAY_STYLE = "calhol";
Calendar.HIGHLIGHT_STYLE ="calhi";

Calendar.prototype.getJulDate = function(d) {
    return Calendar.JULDATE[d.getMonth()-1] + d.getDate(); // TODO: Check might be off by 1 day.
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
	this.holidays[this.getJulDate(d) - 1] = flag;
}

Calendar.prototype.isHoliday = function(d){
    return this.holidays[this.getJulDate(d) - 1];
}

Calendar.add = function(d, offset) {
    d.setDate(d.getDate() + offset);    
    return d;
}

Calendar.prototype.addSkipHolidays = function(d, offset) {
    for (var ind = d.getDate(); offset > 0; ind++)
        if (!this.holidays[ind]) 
            offset--;
    return d.setDate(ind);
}

//load a list of holidays in an array form yyyymmdd
Calendar.prototype.loadHolidays = function(list) {
    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var d = new Date(Number(s.substr(0,4)), Number(s.substr(5,2)), Number(s.substr(7,2)));
        this.setHoliday(d, true);
    }
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
	var cal = this;
	var b1 = Util.button("<<", function(){
		cal.startDate.setFullYear(cal.startDate.getFullYear() - 1);
        cal.exec();
    });
    var b2 = Util.button("<", function(){
    	cal.startDate.setMonth(cal.startDate.getMonth() - 1);
        cal.exec();
    });
    var b3 = Util.button(">", function(){
    	cal.startDate.setMonth(cal.startDate.getMonth() + 1);
        cal.exec();
    });
    var b4 = Util.button(">>", function(){
		cal.startDate.setFullYear(calendar.startDate.getFullYear() + 1);
        cal.exec();
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
		div.appendChild(this.renderButtons());
	}
	div.appendChild(this.drawMonth(d, id));
    return div;
}

// draw a monthly calendar with the buttons needed to traverse through time
Calendar.prototype.renderMonth = function(){
    this.renderButtons();
    this.body.appendChild(this.drawMonth(this.currentDate));
}

Calendar.prototype.renderYear = function(){
    this.renderButtons();
    this.body.appendChild(this.drawYear(this.currentDate));
}

//internal function used by renderMonth and renderYear
// draw the table for a monthly calendar with no external decoration
Calendar.prototype.drawMonth = function(d){
    var dayOfWeek = d.getDay();
    d.setDate(1);
    var monthId = d.getMonth();
    var start = d.setDate(d.getDate() - dayOfWeek); // go back to Sunday
    var t = document.createElement("table");
    var r = t.insertRow();
    var c = r.insertCell();
    c.colSpan = 7;
    c.innerHTML = d.getFullYear() + " " + Calendar.monthAbbr[d.getMonth()];

    r = t.insertRow();
    for (var i = 0; i < Calendar.WEEKDAY_ABBR.length; i++) {
        c = r.insertCell();
        c.innerHTML = Calendar.WEEKDAY_ABBR[i];
    }

	//go until the next month, but avoid mod12 issues
    var pr = d.getMonth() > 7?5:0;

	for (var j = 0; ((d.getMonth()+pr)%12-(monthId+pr)%12) < 1; j++) {
        r = t.insertRow();

        for (var i = 0; i < 7; i++) {
            var c = r.insertCell();
            var dd = d.getDate();
            c.innerHTML = dd;
            c.className = this.isHoliday(d) ? Calendar.HOLIDAY_STYLE : Calendar.REGULAR_STYLE;
            d.setDate(dd + 1);
        }
    }
    return t;
}

Calendar.prototype.drawYear = function(d) {
    var div = Util.div("calendar");
    var t = document.createElement("table");
	console.log(t);
    for (var i = 0; i < 3; i++) {
        var r = t.insertRow(i);
        for (var j = 0; j < 4; j++) {
            var c = r.insertCell();
			var dpass = new Date(d);
            c.appendChild(this.drawMonth(dpass));
			d.setMonth(d.getMonth()+1);
        }
    }

    div.appendChild(this.renderButtons());
    //var months = [];
    for (var month = 0; month < 12; month++){
//    	var id = "cal" + month;
    	//div.appendChild(this.month(d));
        //months.push(this.month(d, id));
    	//d.setMonth(d.getMonth() + 1);
    }
    //var t = Util.table(months, false);
    div.appendChild(t);
    d.setMonth(d.getMonth() - 1);//back to the last year of the working calendar
    return div;
}

Calendar.prototype.toolBar = function(){
    var calendar = this;
    var b1 = Util.button("show month", function(){
	    calendar.render = calendar.renderMonth;
	    calendar.exec();
	}, "toolButton", "b1");
    
    var b2 = Util.button("show year", function(){
	    calendar.render = calendar.renderYear;
	    calendar.exec();
	}, "toolButton", "b2");
    
    var s1 = Util.select("holiday indicator", false, Calendar.WEEKDAY, "toolSelect", "s1");	
    var b3 = Util.button("mark holidays", function(){
        var idx = document.getElementById("s1").selectedIndex;
        calendar.markHoliday(idx);
        calendar.exec();
    }, "toolButton", "b3");
    
    var b4 = Util.button("unmark holidays", function() {
        var idx = document.getElementById("s1").selectedIndex;
        calendar.unmarkHoliday(idx);
        calendar.exec();
    }, "toolButton", "b4");
    
    var b5 = Util.button("reset holidays", function() {
        calendar.resetHoliday();
        calendar.exec();
    }, "toolButton", "b5");
	
    var b6 = Util.button("shift holidays", "toolButton", "b6", function(){
    	calendar.shiftHoliday();
        calendar.exec();
    });
    return Util.divadd("toolbar", b1, b2, s1, b3, b4, b5, b6);
}

Calendar.prototype.exec = function() {
    this.container.innerHTML = "";
    this.body = Util.divadd("calendar", this.toolBar());
    this.container.appendChild(this.body);
	this.render();
}
