/**
 * 
 * View Quizzes Part
 * 
 * @Author: Jack Ziqi Tan
 * 
 */

function QuizList(payload) {
    for (var k in payload) {
        this[k] = payload[k];
    }
    //this.months = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec " ];
    this.body = document.getElementById("container");
    this.body.className = "quizlist";
}

QuizList.prototype.exec = function() {
    this.body.appendChild(this.qtoolbar());
    this.body.appendChild(this.renderTable());
}

QuizList.prototype.dayshift = function(datetype, rowID, rowNum, NOD) {
    var cell = document.getElementById(rowID).cells[datetype];
    var date = new Date(this.data[rowNum][datetype]);
    date.setDate(date.getDate() + NOD);
    this.data[rowNum][datetype] = date.toString();
    cell.innerHTML = Calendar.monthAbbr[date.getMonth()] + date.getDate() + " at "
    + date.getHours() + ":" + date.getMinutes();
    if (this.checkDates(rowNum)) {
    this.dayshift(datetype, rowID, rowNum, -NOD);
    }
}
/*
 * Return true for an illegal date 
 * Open date must be <=  due date and close date;
 * Due date <= close date;
 */
QuizList.prototype.checkDates = function(rowNum) {
    var opendate = new Date(this.data[rowNum][2]);
    var closedate = new Date(this.data[rowNum][3]);
    var duedate = new Date(this.data[rowNum][4]);
    if (closedate.getTime() <= opendate.getTime()) {
    alert("Open date must be earlier than close date.");
    return true;
    }
    if (closedate.getTime() < duedate.getTime()) {
    alert("Close date must be no earlier than due date.");
    return true;
    }
    if (opendate.getTime() >= duedate.getTime()) {
    alert("Open date must be earlier than due date.");
    return true;
    }
    return false;
}
// Conditional day shift.
QuizList.prototype.condDayShift = function(rowID, rowNum, NOD) {
    if (document.getElementById("selectOpenDate").checked) {
        this.dayshift(2, rowID, rowNum, NOD);
    }
    if (document.getElementById("selectCloseDate").checked) {
        this.dayshift(3, rowID, rowNum, NOD);
    }
    if (document.getElementById("selectDueDate").checked) {
        this.dayshift(4, rowID, rowNum, NOD);
    }
}
// make day shift buttons i.e. (-7, -1, +1, +7)
QuizList.prototype.mkDSButtons = function(rowID, rowNum) {
    var d = document.createElement("div");
    var ql = this;
    Util.add(d, [ Util.button("-7", function() {
    ql.condDayShift(rowID, rowNum, -7)
    }), Util.button("-1", function() {
    ql.condDayShift(rowID, rowNum, -1)
    }), Util.button("+1", function() {
    ql.condDayShift(rowID, rowNum, +1)
    }), Util.button("+7", function() {
    ql.condDayShift(rowID, rowNum, +7)
    }) ]);
    return d;
}
/*
 * The following arbiDayShift function is to shift the dates by entering the
 * date point and the number of days. The parameter, "direction" can be -1 or 1,
 * which indicates to advance or to postpone the close and due dates whose
 * original open dates are beyond the date point. -1 for advancing and 1 for
 * postponing.
 */
QuizList.prototype.arbiDayShift = function(direction) {
    var dp = new Date(document.getElementById("quizlist-datepoint").value);
    var nod = parseInt(document.getElementById("quizlist-numofdays").value);
    if (isNaN(dp.getTime()))
    alert("Please enter a valid date point.");
    else if (isNaN(nod))
    alert("Please enter the number of days you want to shift.");
    else {
    for (var i = 1; i < this.data.length; i++) {
        var date = new Date(this.data[i][2]);
        if (date >= dp) {
        this.dayshift(3, this.data[i][0], i, nod * direction);
        this.dayshift(4, this.data[i][0], i, nod * direction);
        }
    }
    }
}
QuizList.prototype.qtoolbar = function() {
    var ql = this;
    var qtoolbar = Util.div();
    /* **************** search div **************** */
    var srch_div = Util.div();
    qtoolbar.appendChild(srch_div);
    srch_div.appendChild(Util.make("input", {
    type : "search",
    placeholder : "Search for Quiz"
    }));
    
    srch_div.appendChild(Util.button("Search"));
    /* **************** search div **************** */
    /* **************** buttons div **************** */
    if (this.editMode) {
    var btns_div = Util.div();
    qtoolbar.appendChild(btns_div);
    btns_div.appendChild(Util.button("all", function() {
        ql.checkAll()
    }));
    btns_div.appendChild(Util.button("invert", function() {
        ql.invertCheck()
    }));
    btns_div.appendChild(Util.button("none", function() {
        ql.uncheckAll()
    }));
    btns_div.appendChild(Util.make("input", { // enter a date for date
        // shift
        type : "text",
        id : "quizlist-datepoint",
        placeholder : "Enter a date point"
    }));
    btns_div.appendChild(Util.make("input", { // enter the number of days
        // for date shift
        type : "text",
        id : "quizlist-numofdays",
        placeholder : "Number of days"
    }));
    btns_div.appendChild(Util.button("Advance", function() {
        ql.arbiDayShift(-1)
    }));
    btns_div.appendChild(Util.button("Postpone", function() {
        ql.arbiDayShift(1)
    }));
    btns_div.appendChild(Util.button("test", function() {
        var txt = document.getElementById("quizlist-datepoint").value;
        alert(txt);
    }));
    }
    /* **************** buttons div **************** */
    return qtoolbar;
}

/* headtype: 0 for current quizzes; 1 for closed quizzes */
QuizList.prototype.qtablehead = function(headtype) {
    var thead = document.createElement("tr");
    var type = [ "Current Quizzes", "Closed Quizzes" ];
    mkth(thead, type[headtype], 2);
    mkth(thead, "Open", "1");
    mkth(thead, "Close", "1");
    mkth(thead, "Due", "1");
    mkth(thead, "Points", "1");
    mkth(thead, "Questions", "1");
    return thead;
}

QuizList.prototype.renderTable = function() {
    var t = document.createElement("table");
//    t.border = "1";
    // table head for current quizzes
    var h1 = this.qtablehead(0);
    t.appendChild(h1);
    // table head for closed quizzes
    var h2 = this.qtablehead(1);
    t.appendChild(h2);
    /* **************** table body **************** */
    for (var i = 1; i < this.data.length; i++) {
        var tr = t.insertRow(i);
        tr.id = this.data[i][0];
        var cell0 = tr.insertCell(0);
        for (var j = 1; j < this.data[i].length; j++) {
            var c = tr.insertCell(-1);
            c.innerHTML = this.data[i][j];
        }
        var opendate = new Date(this.data[i][2]);
        tr.cells[2].innerHTML = Calendar.monthAbbr[opendate.getMonth()]
                + opendate.getDate() + " at " + opendate.getHours() + ":"
                + opendate.getMinutes();
        var closedate = new Date(this.data[i][3]);
        tr.cells[3].innerHTML = Calendar.monthAbbr[closedate.getMonth()]
                + closedate.getDate() + " at " + closedate.getHours() + ":"
                + closedate.getMinutes();
        var duedate = new Date(this.data[i][4]);
        tr.cells[4].innerHTML = Calendar.monthAbbr[duedate.getMonth()]
                + duedate.getDate() + " at " + duedate.getHours() + ":"
                + duedate.getMinutes();
    }
    /* **************** table body **************** */
    /* **************** edit functions for edit mode **************** */
    if (this.editMode) {
        h1.cells[1].appendChild(Util.checkbox(null, null, null,
                          "selectOpenDate", false));
        h1.cells[2].appendChild(Util.checkbox(null, null, null,
                          "selectCloseDate", true));
        h1.cells[3].appendChild(Util.checkbox(null, null, null,
                          "selectDueDate", true));
        h2.cells[1].appendChild(Util.checkbox(null, null, null,
                          "selectOpenDate", false));
        h2.cells[2].appendChild(Util.checkbox(null, null, null,
                "selectCloseDate", true));
        h2.cells[3].appendChild(Util.checkbox(null, null, null,
                          "selectDueDate", true));
        for (var i = 1; i < this.data.length; i++) {
        t.rows[i].cells[0].appendChild(Util.checkbox(null, null, null,
                    t.rows[i].id + '-check', false));
        t.rows[i].cells[1].appendChild(Util.br());
        t.rows[i].cells[1].appendChild(this.mkDSButtons(t.rows[i].id, i));
        t.rows[i].insertCell(-1);
        t.rows[i].cells[7].appendChild(Util.button("edit"));
        t.rows[i].cells[7].appendChild(Util.button("delete"));
            t.rows[i].cells[7].appendChild(Util.button("copy"));
        }
    }
    /* **************** edit functions for edit mode **************** */
    return t;
}
QuizList.prototype.checkAll = function() {
    for (var i = 1; i < this.data.length; i++)
        document.getElementById(this.data[i][0] + '-check').checked = true;
}
QuizList.prototype.uncheckAll = function() {
    for (var i = 1; i < this.data.length; i++)
        document.getElementById(this.data[i][0] + '-check').checked = false;
}
QuizList.prototype.invertCheck = function() {
    for (var i = 1; i < this.data.length; i++) {
        var cb = document.getElementById(this.data[i][0] + '-check');
        cb.checked = cb.checked == true ? false : true;
    }
}
function mkth(parent, txt, colspan) { // make table head cell
    var th = document.createElement("th");
    th.innerHTML = txt;
    th.colSpan = colspan;
    parent.appendChild(th);
    return th;
}
/** ******************** View Quizzes Part ******************** * */
