/**
 * 
 */
var ta;
var matchedStrings = [];
window.onload=function(){
	var convert = (function() {
		var convertElement = function(element) {
			switch(element.tagName) {
			case "BR": 
				return "\n";
			case "P": // fall through to DIV
			case "DIV": 
				return (element.previousSibling ? "\n" : "") + [].map.call(element.childNodes, convertElement).join("");
			default: 
				return element.textContent;
			}
		};

		return function(element) {
			return [].map.call(element.childNodes, convertElement).join("");
		};
	})();

	document.querySelector("#textArea").addEventListener("keyup", function() {
		ta = convert(document.querySelector("#textArea"));
	});

}

function check(){
	document.testPatterns.matched.value = "";
	document.testPatterns.notMatched.value = "";
	matchedStrings = [];
	var strings = ta.split('\n');
	console.log(strings);
	var expression = document.getElementById("Rpattern").value;
	var regex = new RegExp(expression);
	for(var i=0;i<strings.length;i++){
		if(strings[i].match(regex)){
			document.testPatterns.matched.value +=strings[i] + "\n";
			matchedStrings.push(strings[i]);
		}
		else
			document.testPatterns.notMatched.value += strings[i] + "\n";
	}
	console.log(matchedStrings);
}

function highlight(){
	var changed,
	lastValue = '',
	div = $('#textArea'),
	words = matchedStrings;
	function markWords() {
		var html = div.html().replace(/<\/?strong>/gi, ''),
		text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '),
		exp;
		$.each(words, function (i, word) {
			exp = new RegExp('\\b(' + word + ')\\b', 'gi');
			html = html.replace(exp, function (m) {
				return '<strong>' + m + '</strong>';
			});
		});
		div.html(html);
	}

	setInterval(function () {
		var html = div.html();
		if (lastValue != html && html) {
			lastValue = html;
			markWords();
			setEndOfContenteditable(div[0]);
		}
	}, 200);

	function setEndOfContenteditable(contentEditableElement) {
		var range, selection;
		if (document.createRange) // for Chrome,safari,IE9,firefox
		{
			range = document.createRange();
			range.selectNodeContents(contentEditableElement); 
			range.collapse(false);
			selection = window.getSelection(); 
			selection.removeAllRanges(); 
			selection.addRange(range);
		} else if (document.selection) //for IE 8 and lower
		{
			range = document.body.createTextRange(); 
			range.moveToElementText(contentEditableElement);
			range.collapse(false);
			range.select(); 

		}
	}
}

function specificAnswer(){
	var Rp = document.getElementById("Rpattern").value;
	if (document.getElementById("testing").checked) {
		var newRp = "^"+ Rp + "$";
		document.getElementById("Rpattern").value = newRp;
	}
	else{
		var prevRp = Rp.substr(1, Rp.length-2);
		document.getElementById("Rpattern").value =prevRp ;
	}
}
