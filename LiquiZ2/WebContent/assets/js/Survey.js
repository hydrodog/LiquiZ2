/**
 * 
 * @Author: Jack Ziqi Tan
 * 
 */

function Survey(input) {
	this.questions = input.questions;
	this.ans = input.ans;
	this.body = document.getElementById("container");
	this.body.className = "survey";
};

Survey.prototype.exec = function() {
	this.body.appendChild(this.display());
}

Survey.prototype.display = function() {
	var head = this.ans.slice();
	head.unshift("");
	var t = [ head ];
	for (var i = 0; i < this.questions.length; i++) {
		var r = [ this.questions[i].question ];
		r.id = this.questions[i].id;
		for (var j = 0; j < this.ans.length; j++)
			r.push(Util.radio(r.id + "-" + j, r.id, 'multichoiceradio', r.id
					+ "-" + j));
		t.push(r);
	}
	return Util.table(t, true);
}
