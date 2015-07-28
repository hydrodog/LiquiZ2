/**
 * author: Ethan Murad
 * This class contains all the functions and data concerning random elements.
 * It saves the object RandomElementData as a variable on the window itself.
 * Within the RandomElementData object are two fields: the first is another
 * object, called functions. The functions object contains all functions that 
 * have to do with random elements.  The second field in RandomElementData is another
 * object called objectList, which is a list of randomElements that are loaded onto
 * the page.  randomElements are accessed in objectList by their handles.
 */

function randomElement(availableValueList, pronouns) {
	var availableValueList = availableValueList;   // list of values (any type) that this random element can choose from. examples: [1,2,3,4], [1,1,2,3,5,8,13], [-1,1,5,10,10,10,2], ["stacy","george","name3"], ["potato","pasta","chicken"]
	var pronouns = undefined;				       // list of pronoun strings, should correspond 1 to 1 with availableValueList.  For example, if availableValueList is ["George","Rachel","Lenny"] then pronouns should be ["he","she","he"], TODO add support for ["him","her","him"], ["his","her","his"] as well. note that if availableValueList is a list of numbers, pronouns should just be undefined.
	
	//returns a random value from availableValueList
	this.extractRandomValue = function() {
		return availableValueList[Math.floor(Math.random()*availableValueList.length)];
	};
	this.getAvailableValueList = function() {
		return availableValueList;
	};
	this.getPronouns = function() {
		return pronouns;
	}
	this.setAvailableValueList = function(new_availableValueList) {
		availableValueList = new_availableValueList;
	};
	this.setPronouns = function(new_pronouns) {
		pronouns = new_pronouns;
	}
} 


window.RandomElementData={
	functions: {
		/*returns the random element attached to the given handle-string,
		 * if that random element exists.  If that random element doesn't exist, 
		 * undefined is returned and an appropriate error message is logged.
		 */
		getRandomElement: function(randomElementHandleString) {
			if (RandomElementData.functions.randomElementExists(randomElementHandleString)) {
				return RandomElementData.objectList[randomElementHandleString];
			}
			else {
				console.log("Error: you tried to access the random element with the handle "+randomElementHandleString+", but that random element does not exist on this page."); 
			}
		},
		//adds a random element to window.RandomElementData.objectList given a handle (string) and a random element object.
		//If a random element attached to that handle already exists, nothing happens and an error message is logged.
		addRandomElement: function(randomElementHandleString, randomElementObject) {
			if (window.RandomElementData.objectList[randomElementHandleString]===undefined) {
				window.RandomElementData.objectList[randomElementHandleString] = randomElementObject;
			}
			else {
				console.log("You tried to add a new random element with the handle "+randomElementHandleString+" to the page, but a random element with that handle already exists on the page, so adding the new one was aborted.");
			}
		},
		//checks to see if a given handle points to a random element.  Returns boolean true or false
		randomElementExists: function(randomElementHandleString) {
			return Boolean(RandomElementData.objectList[randomElementHandleString]);
		},
		//checks to see if a given text contains random element "substring."
		//random element substring looks like this: '{{___insert handle here___}}'
		textContainsRandomElementSubstring: function(text) {
			if (text.search(/{{.+}}/)!==-1) {
				return true;
			}
			else {
				return false;
			}
		},
		//given "pure" text containing random element substrings, will
		//derive new text from that pure text and return the new text. 
		//That new text is the actual text that will be dislpayed on the quiz 
		//window.  If the pure text does not contain any random element substrings,
		//then the pure text is returned
		pureTextToQuestionText: function(text) {
			if (window.RandomElementData.functions.textContainsRandomElementSubstring(text)===false) {
				return text;
			}
			else {
				questionTextPart1 = text;
				questionTextPart2 = text;
				while (questionTextPart1.match(/{{[^}]+}}/)!==null) {
					randomElementSubstring = questionTextPart1.match(/{{[^}]+}}/)[0];
					randomElementHandleString = randomElementSubstring.slice(2,-2);
					randomElementObject = RandomElementData.functions.getRandomElement(randomElementHandleString);
					if (randomElementObject === undefined) {
						return text;
					}
					extractedRandomValue = randomElementObject.extractRandomValue();
					while (questionTextPart1.indexOf(randomElementSubstring)!==-1) {
						questionTextPart1 = questionTextPart1.replace(randomElementSubstring, randomElementHandleString);
						questionTextPart2 = questionTextPart2.replace(randomElementSubstring, extractedRandomValue);
					}
				}
				return questionTextPart1 + " (possible example: " + questionTextPart2 + ")";
			}
		}
	},
	objectList: [],
};



//preloaded randomElements
window.RandomElementData.functions.addRandomElement('a',new randomElement([1,2,3,4],undefined));
window.RandomElementData.functions.addRandomElement('b',new randomElement([1,1,2,3,5,8,13,21,34,55],undefined));
window.RandomElementData.functions.addRandomElement('c',new randomElement(['stacy','george','adrian','lawanda','jessica','justin'],["she","he","he","she","she","he"]));

