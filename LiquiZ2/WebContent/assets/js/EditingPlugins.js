/**
 * Creates an instance of Random.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @this {Random}
 * @param {String} type The type of the random variable.
 */
function Random(type) {
	this.current = undefined;
	this.type = type;
}

/** the list of all Random extending constructors */
Random.cons = [RandInt, RandFloat, RandListElement, RandString, RandWord];
/** the English list of all Random extending constructors */
Random.conNames = ["Int", "Float", "List", "String", "Word"];

/**
Turns variable into HTMLElement

@return {HTMLElement} New Span
*/
Random.prototype.toHTML = function () {
	if (this.current === undefined)
		this.choose();
	var span = Util.span(this.current);
	return span;
};

/**
Turns variable into JSON

@return {String} JSON object
*/
Random.prototype.valueOf = function () {
	if (this.current === undefined)
		this.choose();
	return JSON.stringify(this.current);
};

/**
 * Creates an instance of RandInt.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @extends {Random}
 * @this {RandInt}
 * @param {int} min Minimum value.
 * @param {int} max Maximum value.
 * @param {int} step Distance between possible values.
 */
function RandInt(min, max, step) {
	Random.call(this, "int");
	this.min = min || 0;
	this.max = max;
	if (this.max === undefined) {
		this.max = this.min + 1;
	}
	this.step = step;
	if (this.step === undefined) {
		this.step = 1;
	}
	this.choices = Math.floor((max - min) / step + 1);
}

Util.subClass(Random, RandInt);

/**
@return {RandInt} a new copy
*/
RandInt.prototype.copy = function () {
	return new this.constructor(this.min, this.max, this.step);
};


/**
Sets chosen value
@return {int} chosen value
*/
RandInt.prototype.choose = function () {
	return this.current = (this.min + this.step * (Math.random() * this.choices << 0)) << 0;
};

/**
 * Creates an instance of RandFloat.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @extends {Random}
 * @this {RandFloat}
 * @param {float} min Minimum value.
 * @param {float} max Maximum value.
 * @param {float} step Distance between possible values.
 * @param {float} precision Decimals past zero to keep.
 */
function RandFloat(min, max, step, precision) {
	Random.call(this, "float");
	this.min = min;
	if (this.min === undefined) {
		this.min = 1;
	}
	this.max = max;
	if (this.max === undefined) {
		this.max = this.min + 1;
	}
	this.step = step;
	if (this.step === undefined) {
		this.step = 0.1;
	}
	this.precision = precision;
	if (this.precision === undefined) {
		this.precision = 1;
	}
	this.choices = Math.floor((max - min) / step) + 1;
}

Util.subClass(Random, RandFloat);

/**
@return {RandFloat} a new copy
*/
RandFloat.prototype.copy = function () {
	return new this.constructor(this.min, this.max, this.step, this.precision);
};

/**
Sets chosen value
@return {float} chosen value
*/
RandFloat.prototype.choose = function () {
	return this.current = this.min + this.step * (Math.random() * this.choices << 0);
};

/**
 * Creates an instance of RandString.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @extends {Random}
 * @this {RandString}
 * @param {Array} list Set of strings possible.
 */
function RandString(list) {
	Random.call(this, "string");
	this.list = list || [];
	this.choices = this.list.length;
}

Util.subClass(Random, RandString);

/**
@return {RandString} a new shallow copy
*/
RandString.prototype.copy = function () {
	return new this.constructor(this.list);
};

/**
Sets chosen value
@return {String} chosen value
*/
RandString.prototype.choose = function () {
	return this.current = this.list[Math.random() * this.list.length << 0];
};

/**
 * Creates an instance of RandWord.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @extends {Random}
 * @this {RandWord}
 * @param {Array} dict Set of words possible.
 */
function RandWord(dict) {
	Random.call(this, "word");
	this.dict = dict || [];
}

Util.subClass(Random, RandWord);

/**
@return {RandWord} a new shallow copy
*/
RandWord.prototype.copy = function () {
	return new this.constructor(this.dict);
};

/**
Sets chosen value
@return {String} chosen value
*/
RandWord.prototype.choose = function () {
	return this.current = this.dict[(Math.random() * this.dict.length / 2 << 0) * 2];
};

/**
 * Creates an instance of RandListElement.
 *
 * @author Dov Kruger
 * @author Stephen Oro
 * @constructor
 * @extends {Random}
 * @this {RandListElement}
 * @param {Array} list Set of objects possible.
 */
function RandListElement(list) {
	Random.call(this, "listelement");
	this.list = list || [];
	this.choices = this.list.length;
}

Util.subClass(Random, RandListElement);

/**
@return {RandListElement} a new shallow copy
*/
RandListElement.prototype.copy = function () {
	return new this.constructor(this.list);
};

/**
Sets chosen value
@return {Object} chosen value
*/
RandListElement.prototype.choose = function () {
	return this.current = this.list[Math.random() * this.list.length << 0];
};

/** 
In the future, all editing will occur through 'EditingPlugin',
like:
new EditingPlugin.RandomVar(callingEditor);

*/
var EditingPlugin = {};

EditingPlugin.methods = {};

/**
Event bound function to change the min

@name changeMin
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changeMin = function (e) {
	this.ele.min = parseFloat(e.target.value) || 0;
};

/**
Event bound function to change the step

@name changeMin
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changeStep = function (e) {
	this.ele.step = parseFloat(e.target.value) || 0;
};

/**
Event bound function to change the precision

@name changeMin
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changePrecision = function (e) {
	this.ele.precision = parseFloat(e.target.value) || 0;
};

/**
Event bound function to change the max

@name changeMax
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changeMax = function (e) {
	this.ele.max = parseFloat(e.target.value) || 0;
};

/**
Event bound function to change the list

@name changeList
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changeList = function (e) {
	this.ele.list = e.target.value.split(/,/g);
	this.ele.choices = this.ele.list.length;
};

/**
Event bound function to change the dict

@name changeDict
@this {RandomTypeEditor}
@param {Event} e the event of the calling field's onchange
*/
EditingPlugin.methods.changeDict = function (e) {
	this.ele.dict = e.target.value.split(/\,/g);
};

/**
Creates an editor that will modify the values of a RandInt.
	
@author Stephen Oro
@constructor
@this {RandIntEditor}
@param {RandInt} randInt Element to be edited
*/
EditingPlugin.methods.RandIntEditor = function (randInt) {
	this.ele = randInt;
	var u = undefined;
	var min = Util.input("number", u, u, u, (EditingPlugin.methods.changeMin).bind(this));
	var max = Util.input("number", u, u, u, (EditingPlugin.methods.changeMax).bind(this));
	var step = Util.input("number", u, u, u, (EditingPlugin.methods.changeStep).bind(this));
	min.value = this.ele.min;
	max.value = this.ele.max;
	step.value = this.ele.step;
	this.container = Util.divadd("",
		"Min: ", min, Util.br(),
		"Max: ", max, Util.br(),
		"Step: ", step, Util.br()
	);
};

/**
Creates an editor that will modify the values of a RandFloat.
	
@author Stephen Oro
@constructor
@this {RandFloatEditor}
@param {RandFloat} randFloat Element to be edited
*/
EditingPlugin.methods.RandFloatEditor = function (randFloat) {
	this.ele = randFloat;
	var u = undefined;
	var min = Util.input("number", u, u, u, (EditingPlugin.methods.changeMin).bind(this));
	var max = Util.input("number", u, u, u, (EditingPlugin.methods.changeMax).bind(this));
	var step = Util.input("number", u, u, u, (EditingPlugin.methods.changeStep).bind(this));
	var precision = Util.input("number", u, u, u, (EditingPlugin.methods.changePrecision).bind(this));
	min.value = this.ele.min;
	max.value = this.ele.max;
	step.value = this.ele.step;
	precision.value = this.ele.precision;
	this.container = Util.divadd("",
		"Min: ", min, Util.br(),
		"Max: ", max, Util.br(),
		"Step: ", step, Util.br(),
		"Precision: ", precision, Util.br()
	);
};

/**
Creates an editor that will modify the values of a RandWord.
	
@author Stephen Oro
@constructor
@this {RandWordEditor}
@param {RandWord} randWord Element to be edited
*/
EditingPlugin.methods.RandWordEditor = function (randWord) {
	this.ele = randWord;
	var u = undefined;
	this.container = Util.divadd("",
		"Dictionary: ", Util.input("text", u, u, this.ele.dict.join(","), (EditingPlugin.methods.changeDict).bind(this)), Util.br()
	);
};

/**
Creates an editor that will modify the values of a RandListElement.

@author Stephen Oro
@constructor
@this {RandListElemenEditor}
@param {RandListElement} randListElement Element to be edited
*/
EditingPlugin.methods.RandListElemenEditor = function (randListElement) {
	this.ele = randListElement;
	var u = undefined;
	this.container = Util.divadd("",
		"List: ", Util.input("text", u, u, this.ele.list.join(","), (EditingPlugin.methods.changeList).bind(this)), Util.br()
	);
};

/**
Creates an editor that will modify the values of a RandString.

@author Stephen Oro
@constructor
@this {RandStringEditor}
@param {RandString} randString Element to be edited
*/
EditingPlugin.methods.RandStringEditor = function (randString) {
	this.ele = randString;
	var u = undefined;
	this.container = Util.divadd("",
		"Strings: ", Util.input("text", u, u, this.ele.list.join(","), (EditingPlugin.methods.changeList).bind(this)), Util.br()
	);
};

//Provides access to Random editors by index in Random.cons
EditingPlugin.RandomEditors = new Array(Random.cons.length);
EditingPlugin.RandomEditors[Random.cons.indexOf(RandInt)] = EditingPlugin.methods.RandIntEditor;
EditingPlugin.RandomEditors[Random.cons.indexOf(RandFloat)] = EditingPlugin.methods.RandFloatEditor;
EditingPlugin.RandomEditors[Random.cons.indexOf(RandWord)] = EditingPlugin.methods.RandWordEditor;
EditingPlugin.RandomEditors[Random.cons.indexOf(RandListElement)] = EditingPlugin.methods.RandListElemenEditor;
EditingPlugin.RandomEditors[Random.cons.indexOf(RandString)] = EditingPlugin.methods.RandStringEditor;



/**
 * Creates an instance of RandomVar.
 *
 * @author Stephen Oro
 * @constructor
 * @this {EditingPlugin.RandomVar}
 * @param {QuizEditor} callingEditor The calling Editor.
 */
EditingPlugin.RandomVar = function (callingEditor) {
	this.q = {};
	this.q.selVar = variablePolicy.toSelect((this.selectVar).bind(this));
	this.q.selScope = this.scopeSelector(variablePolicy);
	this.q.selTypes = this.varEditorTypes();
	this.q.editingField = Util.div();
	this.q.editingVar = new Random.cons[0]();
	callingEditor.addFields(callingEditor.buildRandomVar,
		"Var Name:", this.q.varName = Util.input("text", QuizEdit.EDITCTRL, "varname"),
		this.q.selScope,
		callingEditor.editButton("Create", (this.createVar).bind(this)),
		callingEditor.editButton("Delete", (this.deleteVar).bind(this)),
		this.q.selVar.element,
		Util.br(),
		"Type: ", this.q.selTypes,
		this.q.editingField
	);
	this.selectVar();
	this.selectType();
};

/**
Event bound function to create a new random variable
*/
EditingPlugin.RandomVar.prototype.createVar = function () {
	var name = this.q.varName.value,
		scope = this.q.selScope.value;
	variablePolicy.addInLevel(name, scope, this.q.editingVar.copy());
	this.q.selVar.set(scope, {
				[name]: {
			value: name
		}
	});
	var opts = this.q.selVar.element.options;
	var found = false;
	var i = 0;
	while (!found) {
		if (opts[i].value == name && opts[i].parentElement.label == scope) {
			found = true;
		} else {
			i++;
		}
	}
	this.q.selVar.element.selectedIndex = i;
};

/**
Event bound function to select the propper information about the selected choice.
*/
EditingPlugin.RandomVar.prototype.selectVar = function () {
	var splits = this.q.selVar.value.split(".");
	this.q.varName.value = splits[splits.length - 1];
	if (splits.length > 1) {
		var opts = this.q.selScope.options;
		for (var i = 0; i < opts.length; i++) {
			if (opts[i].value == splits[0]) {
				this.q.selScope.selectedIndex = i;
			}
		}
		var get = variablePolicy.getInLevel(splits[splits.length - 1], splits[0]);
		if (get) {
			this.q.editingVar = get.copy();
			this.q.editingField.innerHTML = "";
			var EditClass = EditingPlugin.RandomEditors[Random.cons.indexOf(this.q.editingVar.constructor)];
			var editObj = new EditClass(this.q.editingVar);
			this.q.editingField.appendChild(editObj.container);
			this.q.selTypes.selectedIndex = Random.cons.indexOf(this.q.editingVar.constructor);
		}
	} else {
		this.q.selScope.selectedIndex = 0;
		this.q.selTypes.selectedIndex = 0;
		this.selectType();
	}

};

/**
Event bound function to delete the specified variable.
*/
EditingPlugin.RandomVar.prototype.deleteVar = function () {
	variablePolicy.deleteInLevel(this.q.varName.value, this.q.selScope.value);
	this.q.selVar.remove(this.q.selScope.value + "." + this.q.varName.value);
	this.q.selScope.selectedIndex = 0;
	this.q.selTypes.selectedIndex = 0;
	this.selectType();

};

/**
Event bound function to select the desired scope.
*/
EditingPlugin.RandomVar.prototype.scopeSelector = function (policy) {
	var list = policy.labels;
	var sel = Util.sel(list);
	return sel;
};

/**
Event bound function to select the desired type.
*/
EditingPlugin.RandomVar.prototype.selectType = function () {
	var val = this.q.selTypes.value;
	var i = Random.conNames.indexOf(val);
	if (i == -1) {
		console.warn("Warning: default");
		i = 0;
	}
	this.q.editingVar = new Random.cons[i]();
	this.q.editingField.innerHTML = "";
	var EditClass = EditingPlugin.RandomEditors[Random.cons.indexOf(this.q.editingVar.constructor)];
	var editObj = new EditClass(this.q.editingVar);
	this.q.editingField.appendChild(editObj.container);
};

/**
@return {HTMLElement} A select element containing the possible types of {Random} elements.
*/
EditingPlugin.RandomVar.prototype.varEditorTypes = function (policty) {
	var list = Random.conNames;
	var sel = Util.sel(list);
	sel.onchange = this.selectType.bind(this);
	return sel;
};

//START TESTING BLOCK
GlobalTestHandler.add(function () {
	function TESTVAR(trials, randVar, regex) {
		var s = '';
		for (var i = 0; i < trials; i++)
			s += randVar.choose() + '\t';
		return s.match(regex)[0] == s;
	}
	var trials = 10;
	var dict = ["hello", 0, "test", 0, "goodbye", 0, "alpha", 0];
	GlobalTestHandler.assert(TESTVAR(trials, new RandInt(1, 11, 2), /(1*(1|3|5|7|9)\t){10}/), "RandInt fails [1]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandInt(1, 10, 2), /((1|3|5|7|9)\t){10}/), "RandInt fails [2]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandFloat(1.0, 5.0, 0.1), /((1|2|3|4|5)(\.[0-9]*)*\t){10}/), "RandFloat fails [3]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandFloat(1.0, 2.0, 1 / 3), /((1|2)(\.[0-9]*)*\t){10}/), "RandFloat fails [4]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandWord(dict), /((hello|test|goodbye|alpha)\t){10}/), "RandWord fails [4]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandListElement([2, 3, 5, 7, 11, 13, 17]), /((2|3|5|7|11|13|17)\t){10}/), "RandListElement fails [4]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandListElement(["Stephen", "Yijin", "Asher", "Ethan"]), /((Stephen|Yijin|Asher|Ethan)\t){10}/), "RandListElement fails [4]");
	var list = ["Fred", "Norman", "Alice", "Mary", "Bob", "Dov", "Yu-Dong", "Ying Ying"];
	GlobalTestHandler.assert(TESTVAR(trials, new RandListElement(list), /((Fred|Norman|Alice|Mary|Bob|Dov|Yu\-Dong|Ying\sYing)\t){10}/), "RandListElement fails [4]");
	GlobalTestHandler.assert(TESTVAR(trials, new RandString(["+", "-", "/", "*", "%"]), /((\+|\-|\/|\*|\%)\t){10}/), "RandListElement fails [4]");
	return true;
}, "Random Vars Fails");
//END TESTING BLOCK