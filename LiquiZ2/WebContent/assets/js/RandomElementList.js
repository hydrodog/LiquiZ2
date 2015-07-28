/**
 * author: Ethan Murad
 * Explanation pending
 */

window.RandomElementList={
	getRandomElement: function(randomElementVariableName) {
		if (this[randomElementVariableName]===undefined) {
			alert("Error: you tried to acess window.RandomElementList['"+randomElementVariableName+"]', which does not exist."); 
		}
		console.log(this[randomElementVariableName]);
		if (this[randomElementVariableName].constructor.substring(9,22)!=="randomElement") {
			alert("Error: you tried to use the following randomElement: "+randomElementVariableName+"  That randomElement does appear to.");
		}
		else {
			return this[randomElementVariableName];
		}
	}
};

function randomElement(availableValueList) {
	this.availableValueList=availableValueList;
	this.extractRandomValue=function() {
		return availableValueList[Math.floor(Math.random()*availableValueList.length)];
	}
}

//preloaded randomElements
window.RandomElementList['a']=new randomElement([1,2,3,4]);
window.RandomElementList['b']=new randomElement([1,1,2,3,5,8,13,21,34,55]);
