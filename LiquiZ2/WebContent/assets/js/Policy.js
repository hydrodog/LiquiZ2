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

function PolicyDef (global, school, subject, local){
	this.global = global || {};
	this.school = school || {};
	this.subject = subject || {};
	this.local = local || {};
	this.collection = [this.local, this.subject, this.school, this.global];
}

PolicyDef.prototype.search = function (key) {	
	var ret;
	for(var i = 0; i < this.collection.length; i++){
		ret = this.collection[i][key];
		if(ret)
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

