/**
   Holds the Policies for a quiz that do not belong in individual quizzes 
   because they are so often shared.  For example, a teacher who gives students
   3 tries to get a perfect score will do so for most if not all quizzes, not just one.

   @author Dov Kruger
   @constructor
   @this {Policy}
*/
function Policy(data) {
    for (var x in data)
	this[x] = data[x];
}

Policy.prototype.edit = function(div) {
    this.policyEditor = new PolicyEditor(this);
    this.editor = new GoodEditor.GoodEditorContainer(this.policyEditor, "Policy Editor", null,
						     this.close.bind(this), "Close");
    this.container = Util.divadd("policy-container", this.editor);
    if (div) {
	Util.append(div, this);
    }
    return this.editor;
}

Policy.prototype.close = function() {
    var p = this.container.parentElement;
    if (p)
	p.removeChild(this.container);
    this.policyEditor.change(this);
    this.policyEditor = this.editor = this.container = null;
}

function PolicyEditor(policy) {
    this.editor = new PolicyMultipleFields
    (0, 1, 3,
     ["Attempts permitted", "Duration (min)","Show Student Answers", "Show Correct Answers", 
      "One question per page", "Scored", "Shuffle Questions", "Shuffle Answers", "Access Code", 
      "Filter IP"],
     [0, 0, 0, 0, 0, 0, 0, 0, "", ""],
     [this.toArray(policy)],
     ["number", "number", "checkbox", "checkbox", "checkbox", "checkbox", "checkbox", "checkbox", "text", "text"], 
     []);
    this.bonus = new PolicyBonusEditor("Early Bonus", policy.bonus);
    this.penalty = new PolicyBonusEditor("Late Penalty", policy.penalty);

    this.container = Util.divadd("policy-editor",
				 [this.editor, this.bonus, this.penalty]);
}

PolicyEditor.keys = ["attempts","duration", "showStudentAnswers", "showCorrectAnswers",
		     "showafter", "oneQuestionPerPage", "scored", "shuffleQuestions",
		     "shuffleAnswers", "accessCode", "filterIP"];
PolicyEditor.prototype.toArray = function(policy) {
    var keys = PolicyEditor.keys;
    var ret = new Array(keys.length);
    for (var i = 0; i < keys.length; i++)
	ret[i] = policy[keys[i]];
    return ret;
}

PolicyEditor.prototype.change = function(policy) {
    var keys = PolicyEditor.keys;
    var ret = this.valueOf();
    for (var i = 0; i < keys.length; i++)
	policy[keys[i]] = ret[i];
    this.bonus.change(policy.bonus);
    this.penalty.change(policy.penalty);
}

function PolicyBonusEditor(titleText, bonus) {
    this.editor = new PolicyMultipleFields(0, 1, 3, ["Absolute", "Daily", "Continuous"], [0, 0, false], [this.toArray(bonus)], ["number", "number", "checkbox"], []);
    var title = Util.div("bonus-editor-title");
    title.innerHTML = titleText;
    this.container = Util.divadd("policy-bonus-editor", [title, this.editor]);
}

PolicyBonusEditor.keys = ["absolute", "daily", "continuous"];

PolicyBonusEditor.prototype.valueOf = function() {
    return this.editor.valueOf();
};

PolicyBonusEditor.prototype.toArray = function(bonus) {
    var keys = PolicyBonusEditor.keys;
    var ret = new Array(keys.length);
    for (var i = 0; i < keys.length; i++)
	ret[i] = bonus[keys[i]];
    return ret;
}

PolicyBonusEditor.prototype.change = function(bonus) {
    var keys = PolicyBonusEditor.keys;
    var ret = this.valueOf();
    for (var i = 0; i < keys.length; i++)
	bonus[keys[i]] = ret[i];
}

function PolicyMultipleFields() {
  GoodEditor.MultipleFields.apply(this, arguments);
}

PolicyMultipleFields.prototype = GoodEditor.MultipleFields.prototype;

PolicyMultipleFields.prototype.constructor = PolicyMultipleFields;

PolicyMultipleFields.prototype.valueOf = function() {
    var ret = new Array(this.num);
    for (var i = 0; i < this.num; i++) {
	ret[i] = this.editors[i].valueOf();
    }
    return ret;
}


