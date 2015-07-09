/**
 * Calendar
 * author: Yue
 * 
 * Represents a year or more calendar
 * Can define holidays, select a date
 * shift dates by a fixed number of days
 * and compute a fallback if that day falls on a holiday.
 */
function getWorkingId(button){
	return button.parentNode.parentNode.parentNode.parentNode.id;
}

function Calendar(startDate, days) {
	this.monthView = true;
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

/**
 * d is the day you want to mark
 * id is used for identifing a month in year view
 */
Calendar.prototype.markCell = function(d, id){
	this.setEvent(d);
	this.refreshMonth(d, id);
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
    		var id = "cal0";
        	calendar.refreshMonth(d, id);
    	}
    	else{
        	calendar.refreshYear(d);
    	}
    });
    var b2 = Util.button("<", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() - 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		var id = "cal0";
        	calendar.refreshMonth(d, id);
    	}
    	else{
        	calendar.refreshYear(d);
    	}
    });
    var b3 = Util.button(">", null, null, function(){
    	calendar.startDate.setMonth(calendar.startDate.getMonth() + 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		var id = "cal0";
        	calendar.refreshMonth(d, id);
    	}
    	else{
        	calendar.refreshYear(d);
    	}
    });
    var b4 = Util.button(">>", null, null, function(){
		calendar.startDate.setFullYear(calendar.startDate.getFullYear() + 1);
		var d = new Date(calendar.startDate);
    	if(calendar.monthView){
    		var id = "cal0";
        	calendar.refreshMonth(d, id);
    	}
    	else{
        	calendar.refreshYear(d);
    	}
    });
    var b5 = Util.button("shift", null, null, function(){
    	var s = "";
    	for(var i=0; i<365; i++){
    		var flag = calendar.events.charAt((i-7+365)%365);
    		s += flag;
    	}
    	calendar.events = s;
    	var div = document.getElementById("cal");
    	if(div != null){
    		div.parentNode.replaceChild(calendar.month(d, calendar), div);
    	}
    });
    var b6 = Util.button("mark holiday", null, null, function(){
    	var dd = new Date(); //dd is the first day of the year
    	dd.setDate(1);
    	dd.setMonth(0);
    	dd.setFullYear(d.getFullYear());
    	for(var i=0; i<365; i++){
    		if(dd.getDay() == 0 || dd.getDay() == 6)
    			calendar.setHoliday(dd);
    		dd.setDate(dd.getDate() + 1);
    	}
    	var div = document.getElementById("cal");
    	if(div != null){
    		div.parentNode.replaceChild(calendar.month(d, calendar), div);
    	}
    });
    
    
    var t = document.createElement("table");
    t.className = "buttons";
    t.id = "buttons";
    var h = t.insertRow(0);
    fillRow(h, [b1, b2, b3, b4])
    return t;
}

/**
 * d is the date in which month you want to draw an month calendar;
 * calendar is the object you currently working with;
 * monthView is a boolean to show whether month view or year view;
 * id indicates which month you may want to change if you have a year view of the calendar;
 */
Calendar.prototype.month = function(d, calendar, id) {
    //d = (typeof d !== "undefined") ? d : this.startDate;
	//monthView = (typeof monthView !== "undefined") ? monthView : true;
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
            		var id = getWorkingId(this);
            		var date = new Date(calendar.startDate);
            		if(!calendar.monthView)
            			date.setMonth(date.getMonth() + parseInt(id.substring(3)));
            		date.setDate(this.innerHTML);
            		calendar.markCell(date, id);
            		};
            	
            	var holidayFlag = this.holidays.charAt(this.getDateOfYear(d) - 1);
            	var eventFlag = this.events.charAt(this.getDateOfYear(d) - 1);
            	if(holidayFlag == '1'){
            		if(eventFlag == '1'){
            			c.style.color = "blue";
            		}
            		else{
            			c.style.color = "red";
            		}
            	}
            	else if(eventFlag == '1'){
            		c.style.color = "green";
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
	if(this.monthView)
		return this.month(d, this, id);
	return this.year(d);
}

Calendar.prototype.exec = function() {
	document.getElementById("container").appendChild(this.month(new Date(), this));
}