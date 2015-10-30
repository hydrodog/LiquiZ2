/*
TestHandler will:
store assertions
run a set of assertions
run a single assertion
run a stored assertion
run a set of stored assertion
add new stored assertions
*/

function TestHandler() {
	this.testCases = {};
}

TestHandler.prototype.add = function (val, key) {
	this.testCases[key] = val;
};

TestHandler.prototype.runStored = function (key) {
	if (key) {
		return this.assert(this.testCases(key), key);
	}
	var TC = this.testCases;
	var keys = Object.keys(TC);
	var conditions = keys.map(function (x) {
		return TC[x];
	});
	return this.assert(conditions, keys);
};

TestHandler.prototype.assert = function (conditions, messages) {
	if (conditions.constructor !== Array) {
		conditions = [conditions];
		messages = [messages];
	}
	for (var i in conditions) {
		if (!conditions[i] || (typeof conditions[i] == "function" && !conditions[i]())) {
			console.warn(conditions[i]);
			var message = messages[i] || "Assertion failed";
			if (typeof Error !== "undefined") {
				throw new Error(message);
			}
			throw message; // Fallback
			return false; //Never called, just for friendliness
		}
	}
	return true;
};

var GlobalTestHandler = new TestHandler();

window.addEventListener("load",function(){
	//you should look for the error, but uncommenting this line will stop it (but something's still wrong!)
	console.log(GlobalTestHandler.runStored()? "all tests have passed" : "something went wrong");
});