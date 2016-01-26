/**A GlobalPolicyManager singleton*/
var QuizPolicies = new GlobalPolicyManager();

/**
Holds the policies for a class.
At the moment simply an object wrapper that
is accesed by the name of an object's policy.
@author Stephen Oro
@constructor
@this {GlobalPolicyManager}
*/
function GlobalPolicyManager() {
	this.policies = {};
}

/**
Adds a policy to the manager's list

@param {PolicyDef} def The policy to be added.
*/
GlobalPolicyManager.prototype.add = function (def) {
	this.policies[def.name] = def;
};

/**
gets a policy from the manager's list by name

@param {string} name The name of the desired policy.
@return {PolicyDef} the desired policy or undefined
*/
GlobalPolicyManager.prototype.get = function (name) {
	return this.policies[name];
};

/**
removes a policy from the manager's list by name

@param {string} name The name of the desired policy to remove.
*/
GlobalPolicyManager.prototype.delete = function (name) {
	this.policies[name] = undefined;
	delete(this.policies[name]);
};

/**
@author Stephen Oro
@constructor
@this {PolicyDef}
@param {string} name
@param {object} global Global-level objects
@param {object} school School-level objects
@param {object} subject Subject-level objects
@param {object} local Local-level objects

@property {array} collection The levels of objects
stored lowest-level to highest-level.
@property {array} labels The English names of the levels
stored lowest-level to highest-level
*/
function PolicyDef(name, global, school, subject, local) {
	this.name = name;
	this.global = global || {};
	this.school = school || {};
	this.subject = subject || {};
	this.local = local || {};
	this.collection = [this.local, this.subject, this.school, this.global];
	this.labels = ["Local", "Subject", "School", "Global"];
}

/**
Get a html wrapped object to manage a select element of an
PolicyDef's values
@return {SelectOptGrouped} select element with the values
opt-grouped by level.
*/
PolicyDef.prototype.toSelect = function (onselect) {
	var newVar = "New " + this.name;
	var list = {
		[newVar]: {
			value: newVar
		}
	};
	for (var i = 0; i < this.collection.length; i++) {
		var obj = {};
		var col = this.collection[i];
		for (var key in col) {
			obj[key] = {value:key};
		}
		list[this.labels[i]] = {value:obj,isOptGroup:1};
	}

	var sel = new SelectOptGrouped(list);
	sel.onchange = onselect;
	return sel;
};

/**
Select from the PolicyDef a the value that is found matching
a key in any collection. This returns on
a lowest-level first-match basis.

@return {object} the value found at a key or undefined.
*/
PolicyDef.prototype.search = function (key) {
	var ret;
	for (var i = 0; i < this.collection.length; i++) {
		ret = this.collection[i][key];
		if (ret)
			return ret;
	}
	return undefined;
};

/**
Deletes from the PolicyDef a the value that is found matching
a key in any collection. This deletes on
a lowest-level first-match basis.

@return {object} the value found at a key or undefined.
*/
PolicyDef.prototype.delete = function (key) {
	var ret;
	for (var i = 0; i < this.collection.length; i++) {
		ret = this.collection[i][key];
		if (ret) {
			this.collection[i][key] = undefined;
			delete(this.collection[i][key]);
			return ret;
		}
	}
	return undefined;
};

/**
Deletes from the PolicyDef a the value that is found matching
the key in the collection at the specified level.

@return {object} the value found at the key or undefined.
*/
PolicyDef.prototype.deleteInLevel = function (key, level) {
	var ret;
	var index = this.labels.indexOf(level);
	if (index != -1) {
		if (this.collection[index].hasOwnProperty(key)) {
			var ret = this.collection[index];
			this.collection[index][key] = undefined;
			delete(this.collection[index][key]);
			return ret;
		}
	}
	return undefined;
};

/**
Gets from the PolicyDef a the value that is found matching
the key in the collection at the specified level.

@return {object} the value found at the key or undefined.
*/
PolicyDef.prototype.getInLevel = function (key, level) {
	var ret;
	var index = this.labels.indexOf(level);
	if (index != -1) {
		if (this.collection[index].hasOwnProperty(key)) {
			var ret = this.collection[index][key];
			return ret;
		}
	}
	return undefined;
};

/**
Sets in the PolicyDef a the value at
the key in the collection at the specified level.

@return {object} the value found at the key or undefined.
*/
PolicyDef.prototype.addInLevel = function (key, level, value) {
	var ret;
	var index = this.labels.indexOf(level);
	if (index != -1) {
		this.collection[index][key] = value;
	}
};

/**
Get all occurences of a key in all levels.

@return {array} all values matching the key in all levels.
*/
PolicyDef.prototype.searchAll = function (key) {
	var rets = [];
	for (var i = 0; i < this.collection.length; i++) {
		var ret = this.collection[i][key];
		if (ret)
			rets.push(ret);
	}
	return rets;
};


//START TESTING BLOCK
GlobalTestHandler.add(function () {
	var testPolicy = new PolicyDef("Variable", {
		rand1: new RandInt(1, 11, 2),
		rand2: new RandInt(12, 20, 1)
	}, {
		rand3: new RandFloat(1.0, 5.0, 0.1),
		rand1: new RandFloat(1.0, 2.0, 1 / 3),
		rand5: new RandWord(["hello", 0, "test", 0, "goodbye", 0, "alpha", 0]),
		rand6: new RandListElement([2, 3, 5, 7, 11, 13, 17]),
		rand7: new RandListElement(["Stephen", "Yijin", "Asher", "Ethan"]),
		carith: new RandString(["+", "-", "/", "*", "%"]),
		modops: new RandString(["+=", "-=", "/=", "*=", "%="]),
		comparators: new RandString([">=", "<=", "==", "<", ">"])
	});
	GlobalTestHandler.assert(testPolicy.global.rand2 == testPolicy.search("rand2"), "Search fails! [1]");
	GlobalTestHandler.assert(testPolicy.school.carith == testPolicy.search("carith"), "Search fails! [2]");

	var search = testPolicy.searchAll("rand1");
	GlobalTestHandler.assert(search.length == 2 && (search.indexOf(testPolicy.global.rand1) != -1) && (search.indexOf(testPolicy.school.rand1) != -1), "SearchALL fails! [3]");

	GlobalTestHandler.assert(testPolicy.school.carith == testPolicy.delete("carith"), "Delete fails! [4]");

	GlobalTestHandler.assert(testPolicy.search("carith") === undefined, "Delete fails! [5]");

	//var selectEl = testPolicy.toSelect();
	//GlobalTestHandler.assert(selectEl.type == "select-one", "To Select fails! [6]");
	//GlobalTestHandler.assert(selectEl.children.length == 14, "To Select fails! [7]"); // Trust me, this should work

	var testSet = new GlobalPolicyManager();
	testSet.add(testPolicy);
	GlobalTestHandler.assert(testPolicy == testSet.get(testPolicy.name), "GlobalPolicyManager.get / add fail! [6]");
	testSet.delete(testPolicy.name);
	GlobalTestHandler.assert(testSet.get(testPolicy.name) === undefined, "GlobalPolicyManager.delete fail! [6]");
	return true;
}, "Policy.js Fails");
//END TESTING BLOCK