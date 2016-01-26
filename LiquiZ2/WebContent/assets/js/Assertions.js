/**
TestHandler will:
store assertions
run a set of assertions
run a single assertion
run a stored assertion
run a set of stored assertion
add new stored assertions

@author Stephen Oro
@constructor
@this {TestHandler}
*/
function TestHandler() {
	this.testCases = {};
}

/**
Stores a test case function to be run.

@param {function} val A predicate whether
a feature works or not.
@param {string} key The key to store it at.
*/
TestHandler.prototype.add = function (val, key) {
	this.testCases[key] = val;
};

/**
Runs all stored test cases or simply the specified one.

@param {string} key The key to test, or pass undefined to run all.
@example this.runStored("test01"); // run only one test.
@example this.runStored(); // run all tests.
*/
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

/**
Asserts a condition with a message, or multiple
conditions with multiple assertions.

@param {array} the predicates to test.
@param {array} the fail messages of the tests.
@example this.assert(predicateFunction, "Single Fail Messsage"); // run only one test.
@example this.assert([fn1, fn2, fn3], // run multiple tests.
            ["fail1", "fail2", "fail3"]);
*/
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

window.addEventListener("load", function () {
	//you should look for the error, but uncommenting this line will stop it (but something's still wrong!)
	console.log(GlobalTestHandler.runStored() ? "all tests have passed" : "something went wrong");
});