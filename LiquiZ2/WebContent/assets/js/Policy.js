/*
 * Author: Stephen Oro
 * Makes a "PolicyDef" that has various scopes
 *
 * Overall: The PolicyDef must
 * Be searchable by lowest scope returns first
 * Be searchable by return all instances
 * Store values by scope.
 *  
 * Solution(s):
 * 
 * 
 */
//Scope Policy

/*
 * interface: 
 * PolicyDef (global, school, subject, local)
 *	parameters are key value object pairs
 *
 * this.search(key)
 *	returns first found instance of key in scope collection
 *	not found == undefined
 * 
 * this.search(key)
 *	returns all found instance of key in scope collection as array
 *	not found == []
 */
var QuizPolicies = new GlobalPolicyManager();

function GlobalPolicyManager() {
	this.policies = {};
}

GlobalPolicyManager.prototype.add = function (def) {
	this.policies[def.name] = def;
};

GlobalPolicyManager.prototype.get = function (name) {
	return this.policies[name];
};

GlobalPolicyManager.prototype.delete = function (name) {
	this.policies[name] = null;
	delete(this.policies[name]);
};

function PolicyDef(name, global, school, subject, local) {
	this.name = name;
	this.global = global || {};
	this.school = school || {};
	this.subject = subject || {};
	this.local = local || {};
	this.collection = [this.local, this.subject, this.school, this.global];
	this.labels = ["Local", "Subject", "School", "Global"];
}

PolicyDef.prototype.toSelect = function (onselect) {
	var list = ["New " + this.name];
	var indexesDisabled = [];
	var nextInd = 1;
	for (var i in this.collection) {
		list.push(this.labels[i]);
		indexesDisabled.push(nextInd);
		var keys = Object.keys(this.collection[i]);
		nextInd += 1 + keys.length;
		list.push.apply(list, keys);
	}
	var u = undefined;
	var sel = Util.sel(list, u, u, indexesDisabled);
	sel.onchange = onselect;
	return sel;
};

PolicyDef.prototype.search = function (key) {
	var ret;
	for (var i = 0; i < this.collection.length; i++) {
		ret = this.collection[i][key];
		if (ret)
			return ret;
	}
	return undefined;
};

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

	var selectEl = testPolicy.toSelect();
	GlobalTestHandler.assert(selectEl.type == "select-one", "To Select fails! [6]");
	GlobalTestHandler.assert(selectEl.children.length == 14, "To Select fails! [7]"); // Trust me, this should work

	var testSet = new GlobalPolicyManager();
	testSet.add(testPolicy);
	GlobalTestHandler.assert(testPolicy == testSet.get(testPolicy.name), "GlobalPolicyManager.get / add fail! [6]");
	testSet.delete(testPolicy.name);
	GlobalTestHandler.assert(testSet.get(testPolicy.name) === undefined, "GlobalPolicyManager.delete fail! [6]");
	return true;
}, "Policy.js Fails");
//END TESTING BLOCK