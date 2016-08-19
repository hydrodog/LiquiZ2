function create(kind, className, innerHTML, appendTo) {
	var elem = document.createElement(kind);
	if (className !== undefined)
		elem.className = className;
	if (innerHTML !== undefined)
		elem.innerHTML = innerHTML;
	if (appendTo)
		appendTo.appendChild(elem);
	return elem;
}

function button(func, className, innerHTML, appendTo) {
	var elem = create("BUTTON", className, innerHTML, appendTo);
	if (func)
		elem.onclick = func;
}

function bindList(self, fields) {
	for (var i = 0; i < fields.length; i++) {
		self[fields[i]] = self[fields[i]].bind(self);
	}
}

function fromValue(value, context) {
	var args = value.slice(1);
	value = value[0];
	value = new this[value](context);
	value.initWithArgs.apply(value, args);
	return value;
}

function Quiz() {
	this.id = null;
	this.children = [];
	this.editingHolders = [];
	this.container = create("DIV", "quiz");
	this.editingDiv = null;
	this.container.contained = this;
	this.isEditing = false;
	this.allowsEditing = false;
}

Quiz.prototype.valueOf = function () {
	var ret = new Array(4);
	ret[0] = "Quiz";
	ret[1] = this.id;
	ret[2] = this.allowsEditing?1:0;
	var childs = ret[3] = new Array(this.children.length);
	for (var i = 0; i < this.children.length; i++) {
		childs[i] = this.children[i].valueOf();
	}
	return ret;

};
//expects all children to be questions
Quiz.prototype.addChild = function (question, i) {
	if (i === undefined)
		this.children.push(question);
	else
		this.children[i] = question;
	var div = create("DIV","question-editor-container")
	this.editingHolders.push(div);
	this.container.appendChild(question.container);
	question.setEditingDiv(div);
	this.container.appendChild(div);
};

Quiz.prototype.removeChild = function (child) {
	var i = this.children.indexOf(child);
	this.children.splice(i, 1);
	var holder = this.editingHolders.splice(i, 1)[0];
	this.container.removeChild(child.container);
	this.container.removeChild(holder);
};

Quiz.prototype.toString = function () {
	return JSON.stringify(this.valueOf());
};

Quiz.prototype.getAnswer = function (index) {
	var answers = [];
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i].getAnswer)
			answers.push(this.children[i].getAnswer(i));
	}
	return [this.id, answers];
};

Quiz.prototype.initWithArgs = function (id, allowsEditing, children) {
	this.id = id;
	this.allowsEditing = allowsEditing;
	var lenChildren = children ? children.length : 0;
	this.children = new Array(lenChildren);
	this.container.innerHTML = "";
	for (var i = 0; i < lenChildren; i++) {
		this.addChild(fromValue(children[i], this), i);
	}
	return this;
};

function TitledEditor(edit) {
	this.container = create("DIV", "editor-titled");
	var title = create("DIV", "title");
	title.innerHTML = edit.kind;
	this.container.appendChild(title);
	edit.edit(this.container);
}

function QuestionEditTrigger(question, quiz) {
	this.question = question;
	this.quiz = quiz;
	this.container = create("DIV", "qedit-header");
	bindList(this, ["edit", "delete"]);

	this.buttonEdit = button(this.edit, "qedit-button", "Edit", this.container);
	this.buttonDelete = button(this.delete, "qedit-button", "Delete", this.container);
}

QuestionEditTrigger.prototype.edit = function () {
	this.question.edit();
};

QuestionEditTrigger.prototype.delete = function () {
	this.quiz.removeChild(this.question);
};

function Question(context) {
	this.id = null;
	this.children = [];
	this.container = create("DIV", "question");
	this.editingDiv = null;
	this.container.contained = this;
	this.isEditing = false;
	this.quiz = context;
}

Question.prototype.initWithArgs = function (id, children) {
	this.id = id;
	this.container.innerHTML = "";
	if (this.quiz.allowsEditing) {
		var trigger = new QuestionEditTrigger(this, this.quiz);
		this.container.appendChild(trigger.container);
		bindList(this, ["closeEditor"]);
	}
	var lenChildren = children ? children.length : 0;
	this.children = new Array(lenChildren);
	for (var i = 0; i < lenChildren; i++) {
		this.addChild(fromValue(children[i]), i);
	}
	return this;
};

Question.prototype.getAnswer = Quiz.prototype.getAnswer;

Question.prototype.setEditingDiv = function (div) {
	this.editingDiv = div;
	//this.editingDiv.style.display = "none";
};

Question.prototype.addChild = function (child, i) {
	if (i === undefined)
		this.children.push(child);
	else
		this.children[i] = child;
	this.container.appendChild(child.container);
};

Question.prototype.valueOf = function () {
	var ret = new Array(3);
	ret[0] = "Question";
	ret[1] = this.id;
	var childs = ret[2] = new Array(this.children.length);
	for (var i = 0; i < this.children.length; i++) {
		childs[i] = this.children[i].valueOf();
	}
	return ret;
};

Question.prototype.toString = Quiz.prototype.toString;

Question.prototype.edit = function () {
	//this.container.style.display = "none";
	if (!this.isEditing) {
		this.editingDiv.style.display = "block";
		this.isEditing = true;
		var closeEditor = button(this.closeEditor, "qedit-closer", "Close", this.editingDiv);
		for (var i = 0; i < this.children.length; i++) {
			var editor = new TitledEditor(this.children[i]);
			this.editingDiv.appendChild(editor.container);
		}
	}
};

Question.prototype.closeEditor = function () {
	this.container.style.display = "block";
	if (this.isEditing) {
		//this.editingDiv.style.display = "none";
		this.isEditing = false;
		for (var i = 0; i < this.children.length; i++) {
			this.children[0]._editors = [];
			this.children[0].editor = null;
		}
		this.editingDiv.innerHTML = "";
	}
};

/**
Title for a question
*/
function TitleElement() {
	TitleElement.initFields(this);
	this.kind = TitleElement.kindText;
	this.editor = null;
	this.container = create("H1");
	this.container.contained = this;
	bindList(this, ["changeTitle"]);
	this.title.onChange(this.changeTitle);
}
TitleElement.kindText = "Title";

MakeArchetypical(TitleElement);
(function () {
	var title = (new StringArchetype()).initWithFields("title", "", "Text: ");
	TitleElement.addField(title);
})();

TitleElement.prototype.initWithArgs = function (title) {
	this.title.set(title);
	this.changeTitle();
	return this;
};

TitleElement.prototype.valueOf = function () {
	var ret = new Array(2);
	ret[0] = "TitleElement";
	ret[1] = this.title.get();
	return ret;
};

TitleElement.prototype.toString = Question.prototype.toString;

TitleElement.prototype.end = function () {
	var parent = this.container.parentElement;
	if (parent)
		parent.removeChild(this.container);
	if (this.editor) {
		var c = this.editor.container;
		var p = c.parentElement;
		if (p)
			p.removeChild(c);
	}
};

TitleElement.prototype.changeTitle = function (event) {
	if (event && event.type != "change")
		return;
	this.container.innerHTML = this.title.get();
};


/**
Instruction for a question
*/
function Instruction() {
	Instruction.initFields(this);
	this.kind = Instruction.kindText;
	this.editor = null;
	this.container = create("H2");
	this.container.contained = this;
	bindList(this, ["changeText"]);
	this.text.onChange(this.changeText);
}
Instruction.kindText = "Instruction";

MakeArchetypical(Instruction);
(function () {
	var text = (new StringArchetype()).initWithFields("text", "", "Text: ");
	Instruction.addField(text);
})();

Instruction.prototype.initWithArgs = function (text) {
	this.text.set(text);
	this.changeText();
	return this;
};

Instruction.prototype.valueOf = function () {
	var ret = new Array(2);
	ret[0] = "Instruction";
	ret[1] = this.text.get();
	return ret;
};


Fillin.prototype.toString = TitleElement.prototype.toString;

Fillin.prototype.end = TitleElement.prototype.end;

Instruction.prototype.changeText = function (event) {
	if (event && event.type != "change")
		return;
	this.container.innerHTML = this.text.get();
};



/**
Fillin
*/
function Fillin() {
	Fillin.initFields(this);
	this.kind = Fillin.kindText;
	this.editor = null;
	this.container = create("input", "fillin");
	this.container.type = "text";
	this.container.contained = this;
}

Fillin.kindText = "Fillin Question";

MakeArchetypical(Fillin);
(function () {
	var answer = (new StringArchetype()).initWithFields("answer", "", "Answer: ");
	Fillin.addField(answer);
	var caseSensitive = (new BooleanArchetype()).initWithFields("bools", 1, [false], ["caseSensitive"], ["Case Sensitive: "]);
	Fillin.addField(caseSensitive);
})();

Fillin.prototype.initWithArgs = function (answer, caseSensitive) {
	this.answer.set(answer);
	this.caseSensitive.set(caseSensitive);
	return this;
};

Fillin.prototype.getAnswer = function (i) {
	return [i, this.container.value];
};

Fillin.prototype.validateAnswer = function () {
	if (this.caseSensitive.get())
		return this.container.value == this.answer.get();
	return this.container.value.toLowerCase() == this.answer.get().toLowerCase();
};

Fillin.prototype.valueOf = function () {
	var ret = new Array(3);
	ret[0] = "Fillin";
	ret[1] = this.answer.get();
	ret[2] = this.caseSensitive.get()?1:0;
	return ret;
};

Fillin.prototype.toString = TitleElement.prototype.toString;

Fillin.prototype.end = TitleElement.prototype.end;

/**
Fillin
*/
function NumberFill() {
	NumberFill.initFields(this);
	this.kind = NumberFill.kindText;
	this.editor = null;
	this.container = create("input", "numberfill");
	this.container.type = "number";
	this.container.contained = this;
}

NumberFill.kindText = "Number Fillin Question";

MakeArchetypical(NumberFill);
(function () {
	var answer = (new NumberArchetype()).initWithFields("answer", 32, 0, "Answer: ");
	NumberFill.addField(answer);
})();

NumberFill.prototype.initWithArgs = function (answer) {
	this.answer.set(answer);
	return this;
};

NumberFill.prototype.getAnswer = function (i) {
	return [i, this.container.value];
};

NumberFill.prototype.validateAnswer = function () {
	return this.container.value == this.answer.get();
};

NumberFill.prototype.valueOf = function () {
	var ret = new Array(2);
	ret[0] = "NumberFill";
	ret[1] = this.answer.get();
	return ret;
};

NumberFill.prototype.toString = TitleElement.prototype.toString;

NumberFill.prototype.end = TitleElement.prototype.end;

/**
Essay
*/
function Essay() {
	Essay.initFields(this);
	this.kind = Essay.kindText;
	this.editor = null;
	this.container = create("textarea", "essay");
	this.container.contained = this;
}

Essay.kindText = "Essay Question";

MakeArchetypical(Essay);
(function () {

	var allowFormatting = (new BooleanArchetype()).initWithFields("bools", 1, [false], ["allowFormatting"], ["Allow Formatting: "]);
	Essay.addField(allowFormatting);

})();

Essay.prototype.initWithArgs = function (allowFormatting) {
	this.allowFormatting.set(allowFormatting);
	console.log(this.allowFormatting.get());
	return this;
};

Essay.prototype.getAnswer = function (i) {
	return [i, this.container.value];
};

Essay.prototype.validateAnswer = function () {
	if (this.caseSensitive.get())
		return this.container.value == this.answer.get();
	return this.container.value.toLowerCase() == this.answer.get().toLowerCase();
};

Essay.prototype.valueOf = function () {
	var ret = new Array(2);
	ret[0] = "Essay";
	ret[1] = this.allowFormatting.get()?1:0;
	return ret;
};

Essay.prototype.toString = TitleElement.prototype.toString;

Essay.prototype.end = TitleElement.prototype.end;



window.onload = function () {
	//test
	/*var quiz = fromValue(
	["Quiz", 0, true,
		[
			["Question", 0,
				[
					["TitleElement", "hello"],
					["Instruction", "What is 2+2?"],
					["NumberFill", 4],
					["Instruction", "Write the word \"cats\""],
					["Fillin", "cats", 0],
					["Instruction", "Write a short essay."],
					["Essay", true]
				]
			],
			["Question", 1,
				[
					["TitleElement", "Second question"],
					["Instruction", "Edit both at the same time!"],
					["NumberFill", 4]
				]
			]
		]
	]
	);
	document.body.appendChild(quiz.container);*/
}