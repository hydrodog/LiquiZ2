function PolicyDef (global, school, subject, local){
	this.global = global || {};
	this.school = school || {};
	this.subject = subject || {};
	this.local = local || {};
	this.collection = [this.local, this.subject, this.school, this.global];
}

PolicyDef.prototype.search = function (thing) {	
	var ret;
	for(var i = 0; i < this.collection.length; i++){
		ret = this.collection[i][thing];
		if(ret)
			return ret;
	}
	return undefined;
};

PolicyDef.prototype.searchAll = function () {	
	var rets = [];
	for(var i = 0; i < this.collection.length; i++){
		var ret = this.collection[i];
		if(ret)
			rets.push(ret);
	}
	return rets;
};

