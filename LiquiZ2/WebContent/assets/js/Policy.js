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
QuizPolicies = new GlobalPolicyManager();

function GlobalPolicyManager(){
	this.policies = {};
}

GlobalPolicyManager.prototype.add = function(def){
	this.policies[def.name] = def;
};

GlobalPolicyManager.prototype.get = function(name){
	return this.policies[name];
};

GlobalPolicyManager.prototype.get = function(name){
	this.policies[name] = null;
	delete(this.policies[name]);
};

function PolicyDef (name, global, school, subject, local){
	this.name = name;
	this.global = global || {};
	this.school = school || {};
	this.subject = subject || {};
	this.local = local || {};
	this.collection = [this.local, this.subject, this.school, this.global];
	this.labels = ["Local", "Subject", "School", "Global"];
}

PolicyDef.prototype.toSelect = function(onselect){
	var list = ["New "+this.name];
	var indexesDisabled = [];
	var nextInd = 1;
	for(var i in this.collection){
		list.push(this.labels[i]);
		indexesDisabled.push(nextInd);
		var keys = Object.keys(this.collection[i]);
		nextInd += 1 + keys.length; 
		list.push.apply(list, keys);
	}
	var u = undefined;
	var sel = Util.sel(list,u,u,indexesDisabled);
	sel.onchange = onselect;
	return sel;
};

PolicyDef.prototype.search = function (key) {	
	var ret;
	for(var i = 0; i < this.collection.length; i++){
		ret = this.collection[i][key];
		if(ret)
			return ret;
	}
	return undefined;
};

PolicyDef.prototype.delete = function (key) {	
	var ret;
	for(var i = 0; i < this.collection.length; i++){
		ret = this.collection[i][key];
		if(ret)
			this.collection[i][key] = undefined;
			delete(this.collection[i][key]);
			return ret;
	}
	return undefined;
};

PolicyDef.prototype.searchAll = function (key) {	
	var rets = [];
	for(var i = 0; i < this.collection.length; i++){
		var ret = this.collection[i][key];
		if(ret)
			rets.push(ret);
	}
	return rets;
};

