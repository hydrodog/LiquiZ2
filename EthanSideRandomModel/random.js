"use strict";
// js for random.html
var util={															//object with references to some useful functions
	emptyAllInnerHTML: function(element) {							//given a DOM element object, will recursively remove everything within that element;
		while (element.firstChild) {
			this.emptyAllInnerHTML(element.firstChild);
			element.removeChild(element.firstChild);
		}
	},
	range: function(start,stop,skip) {
		if (isNaN(start)){
				alert("Error: in util.range(start, stop, skip) function, NaN value was passed into start argument.  Please fix.");
		}
		else if (isNaN(stop)) {
			alert("Error: in util.range(start, stop, skip) function, NaN value was passed into stop argument.  Please fix.");
		}
		else if (isNaN(skip)) {
			alert("Error: in util.range(start, stop, skip) function, NaN value was passed into skip argument.  Please fix.");
		}
		else if (skip<0) {
			alert("Error: in util.range(start, stop, skip) function, negative value was passed into skip argument.  That could lead to infinite loop.  Please fix.");
		}
		else {
			var range_list=[];
			var editable_start=start;
			while (editable_start<stop) {
				range_list.push(editable_start);
				editable_start+=skip;
			}
			return range_list
		}
	},
	arrayRemove: function(arraylist,value) {
		for (var i=0; i<arraylist.length; i++) {
			if (arraylist[i]===value) {
				arraylist.splice(i,1);
				break;
			}
		}
	},
	arrayCopy: function(arraylist) {
		return arraylist.slice();
	},
	listComprehend(arraylist,evaluatable_str) {				//evaluatable_str can comprehend if evaluatable_str contains element keyword
		var comprehended_arraylist=[];
		for (var i=0; i<arraylist.length; i++) {
			var element=arraylist[i];
			comprehended_arraylist.push(eval(evaluatable_str));
		}
		return comprehended_arraylist;
	},
	/*eval: function(str) {									//for example, util.eval("4+5*3") will return 19.  Takes care of brackts recursively, and can also deal with random elements.  Note that this function does not error check at all so you must error check before passing a string into this function
		var expression=[];
		var initializing=true;
		var index=0;
		while(initializing) {
			if (str.charAt(index)==="(") {										//TODO
				var open_bracket_count=1;
				for (var j=index+1;j<str.length;j++) {
					if (str.charAt(j)==="(") {
						open_bracket_count+=1;
					}
					else if (str.charAt(j)===")") {
						open_bracket_count-=1;
						if (open_bracket_count===0) {
							expression.push(eval(str.substring(index+1,j)));
							expression.push([str.charAt(j)]);
							index=j+1;
							break;
						}
					}
				}
			}
			else if ()
		}
	},*/
	questionTextIsEvaluatable: function(question_type,question_text_to_check) {
		if (question_type==="arithmetic") {
			var question_text_evaluatable=true;
			var operation_acceptable=false;
			var period_acceptable=true;
			var minus_acceptable=true;
			var left_bracket_acceptable=true;
			var right_bracket_acceptable=false;
			var open_bracket_count=0;
			var number_acceptable=true;
			for (var i=0; i<question_text_to_check.length;i++) {
				var local_char=question_text_to_check.charAt(i);
				if (local_char==="0"||local_char==="1"||local_char==="2"||local_char==="3"||local_char==="4"||local_char==="5"||local_char==="6"||local_char==="7"||local_char==="8"||local_char==="9") {
					if (number_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check illegally contains a number after a right bracket.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					operation_acceptable=true;
					minus_acceptable=true;
					left_bracket_acceptable=false;
					right_bracket_acceptable=true;
				}
				else if (local_char===".") {
					if (period_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check contains a decimal point in an illegal spot.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					period_acceptable=false;
					if (operation_acceptable===false) {
						minus_acceptable=false;
					}
					left_bracket_acceptable=false;
				}
				else if (local_char==="+"||local_char==="*"||local_char==="/") {
					if (operation_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check contains an operator in an illegal spot.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					operation_acceptable=false;
					period_acceptable=true;
					left_bracket_acceptable=true;
					right_bracket_acceptable=false;
					number_acceptable=true;
				}
				else if (local_char==="-") {
					if (minus_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check contains a minus sign in an illegal spot.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					operation_acceptable=false;
					period_acceptable=true;
					minus_acceptable=false;
					left_bracket_acceptable=true;
					right_bracket_acceptable=false;
					number_acceptable=true;
				}
				else if (local_char==="(") {
					if (left_bracket_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check illegally contains a left bracket after a number.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					operation_acceptable=false;
					period_acceptable=true;
					minus_acceptable=true;
					open_bracket_count+=1;
				}
				else if (local_char===")") {
					if (right_bracket_acceptable===false) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check contains a right bracket in an illegal spot.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					else if (open_bracket_count===0) {
						question_text_evaluatable=false;
						alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check illegally contains a right bracket before a corresponding left bracket was opened.  The substring looks like this: "+question_text_to_check.substring(i-2,i+2)+".  Please fix question_text_to_check.");
						break;
					}
					period_acceptable=false;
					open_bracket_count-=1;
					number_acceptable=false;
				}
				else {
					question_text_evaluatable=false;
					alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check contains an unrecognizable character: "+local_char+". Please fix question_text_to_check.");
					break;
				}
			}
			if (question_text_evaluatable&&open_bracket_count!==0) {
				question_text_evaluatable=false;
				alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check does not have the same number of left brackets as it does right brackets.  Please fix question_text_to_check.");
			}
			if (question_text_evaluatable&&operation_acceptable===false) {
				question_text_evaluatable=false;
				alert("Alert: util.questionTextIsEvaluatable method failed because question_text_to_check illegally contains an operation at the end of the expression. Please fix question_text_to_check, which was passed in as "+question_text_to_check);
			}
			return question_text_evaluatable;
		}
		else {
			alert("Error: util.questionTextIsEvaluatable failed because question_type, "+question_type+" is unrecognizable");
			return false;
		}
	},
	questionTextIntermediateIsInterperetable: function(question_type,question_text_intermediate_to_check) {
		if (question_type==="arithmetic") {
			var rrr_instances=[];
			var question_text_intermediate_no_rrr=question_text_intermediate_to_check;
			while (question_text_intermediate_no_rrr.indexOf("<RRR>")!==-1&&question_text_intermediate_no_rrr.indexOf("</RRR>")!==-1) {
				var lo=question_text_intermediate_no_rrr.indexOf("<RRR>");
				var hi=question_text_intermediate_no_rrr.indexOf("<\/RRR>")+6;
				if (lo>hi) {
					alert("Error: util.questionTextIntermediateIsInterperetable returned false because you have an occurence of </RRR> without an open occurence of <RRR>.  Please fix.")
					return false;
				}
				rrr_instances.push(question_text_intermediate_no_rrr.substring(lo+5,hi-6));
				question_text_intermediate_no_rrr=question_text_intermediate_no_rrr.replace(question_text_intermediate_no_rrr.substring(lo,hi),"0");
			}
			if (util.questionTextIsEvaluatable("arithmetic",question_text_intermediate_no_rrr)===false) {
				return false;
			}
			for (var i=0; i<rrr_instances.length; i++) {
				var rrr_instance=rrr_instances[i];
				if (!isNaN(rrr_instance)){
					if (Number(rrr_instance)%1!==0) {
						alert("error: util.questionTextIntermediateIsInterperetable returned false because in question_text_intermediate_to_check string passed into function ("+question_text_intermediate_to_check+"), rrr occurence #"+(i+1)+" was interpereted as a random_element_id, attempt, but it cannot be a random_element_id because it is not a whole number");
						return false;
					}
					else if (Number(rrr_instance)<1) {
						alert("error: util.questionTextIntermediateIsInterperetable returned false because in question_text_intermediate_to_check string passed into function ("+question_text_intermediate_to_check+"), rrr occurence #"+(i+1)+" was interpereted as a random_element_id, attempt, but it cannot be a random_element_id because it is less than 1.  random_element ids start at 1.");
						return false;
					}
					else if (Number(rrr_instance)>database1.getRandomElementList().length) {
						alert("error: util.questionTextIntermediateIsInterperetable returned false because in question_text_intermediate_to_check string passed into function ("+question_text_intermediate_to_check+"), rrr occurence #"+(i+1)+" was interpereted as a random_element_id, attempt, but it is not a valid random_element_id because it is too high.  currently, highest random_element_id in database1 is "+database1.getRandomElementList().length);
						return false;
					}
				}
				else if (rrr_instance.charAt(0)==="("&&rrr_instance.indexOf(",")!==-1&&rrr_instance.charAt(rrr_instance.length-1)===")") {
					var rrr_instance_part2=rrr_instance.substring(rrr_instance.indexOf(",")+1,rrr_instance.length-1);
					try {
						eval(rrr_instance_part2);
					}
					catch (e){
						alert("error: util.questionTextIntermediateIsInterperetable returned false because in question_text_intermediate_to_check string passed into function ("+question_text_intermediate_to_check+"), rrr occurence #"+(i+1)+" was interpereted as a new random_element constructor attempt, but it was an invalid attempt because part 2 of the constructor (after the comma) must evaluate to an array.  Yours wasn't evaluatable at all.");
						return false;
					}
					if (eval(rrr_instance_part2).constructor.toString().substring(9,16)!=="Array()") {
						alert("error: util.questionTextIntermediateIsInterperetable returned false because in question_text_intermediate_to_check string passed into function ("+question_text_intermediate_to_check+"), rrr occurence #"+(i+1)+" was interpereted as a new random_element constructor attempt, but it was an invalid attempt because part 2 of the constructor (after the comma) must evaluate to an array.  Yours didn't");
						return false;
					}
				}
				else {
					alert("Error: util.questionTextIntermediateIsInterperetable returned false because rrr_instance #"+(i+1)+"in question_text_intermediate_to_check ("+question_text_intermediate_to_check+") did not follow the correct syntax.  An rrr instance must be either a random_element_id (a number) or a ( followed by a display_text (any string) followed by a comma, followed by available_value_list (something that will evaluate to an array), followed by a )");
				}
			}
			return true;
		}
		else {
			alert("Error: util.questionTextIntermediateIsInterperetable failed because question_type, "+question_type+" is unrecognizable");
			return false;
		}
	},
};


var random_element=function(display_text, available_value_list) {
	//variables passed into object as arguments in constructor
	var display_text=display_text;										//string, can change
	var available_value_list=available_value_list;						//list, can change
	
	//independent variables set by the fact that this is a random_element object
	var random_element_id=database1.nextAvailableRandomElementId(); 	//number, can change
	var corresponding_question_family_list=[]							//list of question_family objects, can change
	
	//independent methods set by the fact that this is a random_element object, I will just define them here
	var extractRandomValue=function() {
		return available_value_list[Math.floor(Math.random()*available_value_list.length)];
	};
	
	
	//getter methods
	this.getDisplayText=function(){
		return display_text;
	};
	this.getAvailableValueList=function() {
		return util.arrayCopy(available_value_list);        			//returns a copy because otherwise this get function could be used to edit the array object reference, which should only be possible using setter methods
	};
	this.getRandomElementId=function() {
		return random_element_id;
	};
	this.getCorrespondingQuestionFamilyList=function() {				//returns a copy because otherwise this get function could be used to edit the array object reference, which should only be possible using setter methods
		return util.arrayCopy(corresponding_question_family_list);
	};
	this.extractRandomValue=function() {
		return extractRandomValue();
	};
	
	//setter methods, note that not all start with word set
	this.setDisplayText=function(new_display_text) {
		display_text=new_display_text;
		database1.makeDatabaseRandomLiDisplayTextHTML(random_element_id);
	};
	this.addAvailableValue=function(available_value) {
		available_value_list[available_value_list.length]=available_value;
		database1.makeDatabaseRandomLiAvailableValueListHTML(random_element_id);
	};
	this.removeAvailableValue=function(available_value) {
		util.arrayRemove(available_value_list,available_value);
		database1.makeDatabaseRandomLiAvailableValueListHTML(random_element_id);
	};
	this.setAvailableValueList=function(new_available_value_list) {
		available_value_list=new_available_value_list;
		database1.makeDatabaseRandomLiAvailableValueListHTML(random_element_id);
	};
	this.setRandomElementId=function(new_random_element_id) {								//please don't call this function, because backend is not prepared to deal with it being called
		random_element_id=new_random_element_id;
		database1.makeDatabaseRandomLiRandomElementIdHTML(random_element_id);
	};
	this.addCorrespondingQuestionFamily=function(corresponding_question_family) {
		corresponding_question_family_list[corresponding_question_family_list.length]=corresponding_question_family;
	};
	this.removeCorrespondingQuestionFamily=function(corresponding_question_family) {
		util.arrayRemove(corresponding_question_family_list,corresponding_question_family);
	};
	
	
	//also must be called to add this random_element to database1
	database1.addRandomElement(this);
};


var question=function(question_type, instruction_text, question_text) {
	
	//(somewhat) independent variables initialized by arguments passed into constructor:
	var question_type=question_type;					//String, can change
	var instruction_text=instruction_text;				//String, can change
	var question_text=question_text;					//String, can change
	
	//independent variables/methods set due to the fact that this is a question
	var question_id=database1.nextAvailableQuestionId();//Number, can change
	var corresponding_quiz_element=undefined;			//quiz_element object or undefined, can change
	var questionlike_type="question";   				//String, never changes
	var generateChildQuestion=function(){return undefined;};//function, returns undefined because a question cannot generate a child question, only a question family can generate a child question
	
	//dependent variables/methods that are set based on the somewhat independent variables, and will change if the somewhat independent variables change.  These variables are rendered at the end of this constructor.
	var answer;											//Number, value depends on question_type and question_text
	var renderAnswer;                                	//=function(){...}, body of function depends on question_type
	var checkAnswer;									//=function(input_answer){...}, body of function depends on question_type, note that this method has a public accessor with the same name, called checkAnswer(input_answer).
	
	//independent methods that set (aka render) the dependent variables mentioned above
	//var renderAnswer	;								//renders answer based on question_text, commented out because "var renderAnswer" was already hard-coded above in the dependent variables/methods section.  No reason to hard code twice.  The reason it was hard-coded twice is that renderAnswer() is special because not only does it dynamically render another field (answer) but also it must get dynamically set by another method (renderRenderAnswer()).
	var renderRenderAnswer;								//renders renderAnswer based on question_type
	var renderCheckAnswer;								//renders checkAnswer based on question_type
	
	
	//hard code for the independent render methods mentioned immediately above
	renderRenderAnswer=function(){
		if (question_type==="arithmetic") {
			renderAnswer=function() {
				if (util.questionTextIsEvaluatable(question_type,question_text)) {
					answer=eval(question_text);
				}
			};
		}
		else {
			alert("question_type for question id "+question_id+" not recognized.  As a result, renderRenderAnswer function was not set properly.  Please fix this");
		}
	};
	renderCheckAnswer=function(){
		if (question_type==="arithmetic") {
			checkAnswer=function(input_answer) {
				if (Number(input_answer)===answer) {
					return true;
				}
				else {
					return false;
				}
			};
		}
		else {
			alert("question_type for question id "+question_id+" not recognized.  As a result, renderCheckAnswer function was not set properly.  Please fix this");
		}
	};
	
	
	//calling the independent render methods in the right order
	renderRenderAnswer();								//now renderAnswer() has been rendered
	renderAnswer();										//now answer has been rendered, note that this line must be called after renderRenderAnswer();
	renderCheckAnswer();								//now checkAnswer has been rendered
	
	
	
	
	//getter methods
	this.getQuestionType=function() {
		return question_type;
	};
	this.getInstructionText=function() {
		return instruction_text;
	};
	this.getQuestionText=function() {
		return question_text;
	};
	this.getQuestionId=function() {
		return question_id;
	};
	this.getQuestionlikeTypeNonSpecificId=function() {          //Trans-questionlike method that will return the question_id
		return question_id;
	};
	this.getCorrespondingQuizElement=function() {
		return corresponding_quiz_element;
	};
	this.getQuestionlikeType=function() {
		return questionlike_type;
	};
	this.getAnswer=function() {
		return answer;
	};
	this.checkAnswer=function(input_answer) {					//Public accessor for var checkAnswer(input_answer) method
		return checkAnswer(input_answer);
	};
	this.generateChildQuestion=function() {
		return generateChildQuestion();
	};
	
	
	//setter methods; note 3 things:
        // 1) setter methods do not exist for every variable, because some variables are immutable, and others are dependently mutable, meaning that they will only change if other variables change
		      // questionlike_type: immutable
			  // answer: dependent on question_type and question_text
		// 2) setter method for a variable that other variables are dependent on will automatically re-render those other variables
		// 3) if corresponding_quiz_element is set to a real quiz_element_object (as opposed to undefined), then setter methods will automatically jump in to that quiz_element object and re-make the html.
	this.setQuestionType=function(new_question_type) {
		question_type=new_question_type;
		renderRenderAnswer();
		renderCheckAnswer();
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.renderEditQuestionOnclick();
			corresponding_quiz_element.renderObtainAnswerInput();
			corresponding_quiz_element.renderMakeQuizElementInputAnswerContainerHTML();
			corresponding_quiz_element.makeQuizElementInputAnswerContainerHTML();
		}
		database1.makeDatabaseLiQuestionTypeHTML(question_id);
	};
	this.setInstructionText=function(new_instruction_text) {
		instruction_text=new_instruction_text;
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.makeQuizElementInstructionsHTML();
		}
		database1.makeDatabaseLiInstructionTextHTML(question_id);
	};
	this.setQuestionText=function(new_question_text) {
		question_text=new_question_text;
		renderAnswer();
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.makeQuizElementQuestionTextHTML();
		}
		database1.makeDatabaseLiQuestionTextHTML(question_id);
		database1.makeDatabaseLiAnswerHTML(question_id);
	};
	this.setQuestionId=function(new_question_id) {
		question_id=new_question_id;
		alert('please dont call this function.  behavior has not really been thought out and calling this function might cause some problems');
		//database1.makeDatabaseLiQuestionIdHTML(question_id);                commented because I'm not really sure if I should call this function
	};
	this.setCorrespondingQuizElement=function(new_corresponding_quiz_element) {
		corresponding_quiz_element=new_corresponding_quiz_element;
	};
	
	
	
	//Finally, the following function also has to be called so that when you construct a question object, it automatically gets added to database1.
	database1.addQuestion(this);
};


var question_family=function(question_type, instruction_text, question_text_intermediate) {
	
	var _this=this;													//so that this is available within functions as well
	
	//(somewhat) independent variables initialized by arguments passed into constructor:
	var question_type=question_type;								//String, can change
	var instruction_text=instruction_text;							//String, can change
	var question_text_intermediate=question_text_intermediate;		//String, can change
	
	//independent variables/methods set due to the fact that this is a question_family
	var question_family_id=database1.nextAvailableQuestionFamilyId();		//Number, can change
	var corresponding_quiz_element=undefined;								//quiz_element object or undefined, can change
	var questionlike_type="question_family";   								//String, never changes
	var generateChildQuestion=function() {
		var child_question_question_type=question_type;
		var child_question_instruction_text=instruction_text;
		var child_question_question_text=question_text;
		for (var i=0; i<random_element_references.length; i++) {
			var random_element_object=random_element_references[i];
			while(child_question_question_text.indexOf(random_element_object.getDisplayText())!==-1) {
				child_question_question_text=child_question_question_text.replace(random_element_object.getDisplayText(),random_element_object.extractRandomValue());
			}
		}
		return new question(child_question_question_type,child_question_instruction_text,child_question_question_text);
	};
	
	
	//dependent variables/methods that are set based on the somewhat independent variables, and will change if the somewhat independent variables change.  These variables are rendered at the end of this constructor.
	var random_element_references=[];					//List of random_elements that exist in this question_family, depends on question_text_intermediate
	var question_text;									//String, depends on question_text_intermediate
	var answer;											//Number, value depends on question_type and question_text
	var renderAnswer;                                	//=function(){...}, body of function depends on question_type
	var checkAnswer;									//=function(input_answer){...}, body of function depends on question_type
	
	//independent methods that set (aka render) the dependent variables mentioned above
	var renderRandomElementReferences;					//renders random_element_references based on question_text_intermediate
	var renderQuestionText;								//renders question_text based on question_text_intermediate
	//var renderAnswer;									//renders answer based on question_text, commented out because "var renderAnswer" was already hard-coded above in the dependent variables/methods section.  No reason to hard code twice.  The reason it was hard-coded twice is that renderAnswer() is special because not only does it dynamically render another field (answer) but also it must get dynamically set by another method (renderRenderAnswer()).
	var renderRenderAnswer;								//renders renderAnswer based on question_type
	var renderCheckAnswer;								//renders checkAnswer method based on question_type
	
	
	//hard code for the independent render methods mentioned immediately above
	renderRandomElementReferences=function() {
		if (util.questionTextIntermediateIsInterperetable(question_type,question_text_intermediate)) {
			var question_text_intermediate_editable=question_text_intermediate;
			for (var i=0; i<random_element_references.length; i++) {
				random_element_references[i].removeCorrespondingQuestionFamily(_this);
			}
			random_element_references=[];
			while(question_text_intermediate_editable.indexOf("<RRR>")!==-1) {
				var index_of_next_RRR_open=question_text_intermediate_editable.indexOf("<RRR>");
				var index_of_next_RRR_close=question_text_intermediate_editable.indexOf("</RRR>");
				if (question_text_intermediate_editable[index_of_next_RRR_open+5]==="(") {
					var new_random_element_argument_input_string=question_text_intermediate_editable.substring(index_of_next_RRR_open+6,index_of_next_RRR_close-1);
					var display_text=new_random_element_argument_input_string.substring(0,new_random_element_argument_input_string.indexOf(","));
					var available_value_list_string=new_random_element_argument_input_string.substring(new_random_element_argument_input_string.indexOf(",")+1,new_random_element_argument_input_string.length);
					var available_value_list=eval(available_value_list_string);
					var new_random_element=new random_element(display_text,available_value_list);
					random_element_references.push(new_random_element);
					new_random_element.addCorrespondingQuestionFamily(_this);
					question_text_intermediate_editable=question_text_intermediate_editable.substring(index_of_next_RRR_close+6,question_text_intermediate_editable.length);
				}
				else if (isNaN(question_text_intermediate_editable[index_of_next_RRR_open+5])===false) {
					var random_element_id_string=question_text_intermediate_editable.substring(index_of_next_RRR_open+5,index_of_next_RRR_close);
					var random_element_object=database1.getRandomElement(Number(random_element_id_string));
					random_element_references.push(random_element_object);
					random_element_object.addCorrespondingQuestionFamily(_this);
					question_text_intermediate_editable=question_text_intermediate_editable.substring(index_of_next_RRR_close+6,question_text_intermediate_editable.length);
				}
			}
		}
	};
	renderQuestionText=function() {
		if (util.questionTextIntermediateIsInterperetable(question_type,question_text_intermediate)) {
			question_text=question_text_intermediate;
			var replace_count=0;
			while(question_text.indexOf("<RRR>")!==-1) {
				var index_of_next_RRR_open=question_text.indexOf("<RRR>");
				var index_of_next_RRR_close=question_text.indexOf("</RRR>");
				question_text=question_text.replace(question_text.substring(index_of_next_RRR_open,index_of_next_RRR_close+6),random_element_references[replace_count].getDisplayText());
				replace_count+=1;
			}
		}
	};
	renderRenderAnswer=function(){
		if (question_type==="arithmetic") {
			renderAnswer=function() {
				answer=question_text;
			};
		}
		else {
			alert("error: question_type for question_family_id "+question_family_id+" not recognized.  As a result, renderRenderAnswer function was not set properly.  Please fix this");
		}
	};
	renderCheckAnswer=function(){
		if (question_type==="arithmetic") {
			checkAnswer=function(input_answer) {
				if (input_answer===answer) {
					return true;
				}
				else {
					return false;
				}
			};
		}
		else {
			alert("question_type for question_family_id "+question_family_id+" not recognized.  As a result, renderCheckAnswer function was not set properly.  Please fix this");
		}
	};
	
	
	//calling the render functions in the right order
	renderRandomElementReferences();
	renderQuestionText();
	renderRenderAnswer();
	renderAnswer();
	renderCheckAnswer();

	
	//getter methods
	this.getQuestionType=function() {
		return question_type;
	};
	this.getInstructionText=function() {
		return instruction_text;
	};
	this.getQuestionTextIntermediate=function() {
		return question_text_intermediate;
	};
	this.getQuestionFamilyId=function() {
		return question_family_id;
	};
	this.getQuestionlikeTypeNonSpecificId=function() {          //Trans-questionlike method that will return the question_id
		return question_family_id;
	};
	this.getCorrespondingQuizElement=function() {
		return corresponding_quiz_element;
	};
	this.getQuestionlikeType=function() {
		return questionlike_type;
	};
	this.getRandomElementReferences=function() {
		return util.arrayCopy(random_element_references);
	};
	this.getQuestionText=function() {
		return question_text;
	};
	this.getAnswer=function() {
		return answer;
	};
	this.checkAnswer=function(input_answer) {					//Public accessor for var checkAnswer(input_answer) method
		return checkAnswer(input_answer);
	};
	this.generateChildQuestion=function() {
		return generateChildQuestion();
	};
	
	
	//setter methods; note 3 things:
        // 1) setter methods do not exist for every variable, because some variables are immutable, and others are dependently mutable, meaning that they will only change if other variables change
		      // questionlike_type: immutable
			  // answer: dependent on question_type and question_text
		// 2) setter method for a variable that other variables are dependent on will automatically re-render those other variables
		// 3) if corresponding_quiz_element is set to a real quiz_element_object (as opposed to undefined), then setter methods will automatically jump in to that quiz_element object and re-make the html.
	this.setQuestionType=function(new_question_type) {
		question_type=new_question_type;
		renderRenderAnswer();
		renderCheckAnswer();
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.renderEditQuestionOnclick();
			corresponding_quiz_element.renderObtainAnswerInput();
			corresponding_quiz_element.renderMakeQuizElementInputAnswerContainerHTML();
			corresponding_quiz_element.makeQuizElementInputAnswerContainerHTML();
		}
		database1.makeDatabaseQuestionFamilyLiQuestionTypeHTML(question_family_id);
	};
	this.setInstructionText=function(new_instruction_text) {
		instruction_text=new_instruction_text;
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.makeQuizElementInstructionsHTML();
		}
		database1.makeDatabaseQuestionFamilyLiInstructionTextHTML(question_family_id);
	};
	this.setQuestionTextIntermediate=function(new_question_text_intermediate) {
		question_text_intermediate=new_question_text_intermediate;
		renderRandomElementReferences();
		renderQuestionText();
		renderAnswer();
		if (corresponding_quiz_element!==undefined) {
			corresponding_quiz_element.makeQuizElementQuestionTextHTML();
		}
		database1.makeDatabaseQuestionFamilyLiQuestionTextIntermediateHTML(question_family_id);
		database1.makeDatabaseQuestionFamilyLiQuestionTextHTML(question_family_id);
		database1.makeDatabaseQuestionFamilyLiRandomElementReferencesHTML(question_family_id);
		database1.makeDatabaseQuestionFamilyLiAnswerHTML(question_family_id);
	};
	this.setQuestionFamilyId=function(new_question_family_id) {
		question_family_id=new_question_family_id;
		alert('please dont call this function.  behavior has not really been thought out and calling this function might cause some problems');
		//database1.makeDatabaseLiQuestionIdHTML(question_id);                commented because I'm not really sure if I should call this function
	};
	this.setCorrespondingQuizElement=function(new_corresponding_quiz_element) {
		corresponding_quiz_element=new_corresponding_quiz_element;
	};
	
	
	
	//Finally, the following function also has to be called so that when you construct a question_family object, it automatically gets added to database1.
	database1.addQuestionFamily(this);
};


var quiz_element=function(questionlike) {
	if (questionlike.getCorrespondingQuizElement()!==undefined) {
		alert("Error: quiz_element object construction for "+questionlike.getQuestionlikeType()+"_id="+questionlike.getQuestionlikeTypeNonSpecificId()+" failed because that questionlike object passed into the constructor already has a corresponding quiz_element.  Please do not try to make a new one without first deleting the old one");
	}
	else {
		
		var _this=this;
		
		//(somewhat) independent variables initialized by arguments passed into constructor:
		var questionlike=questionlike;							//question object or question_family object, can change
	
		//independent variables/methods set just due to the fact that this is a quiz_element
		var quiz_element_id=page1.nextAvailableQuizElementId();	//Number, can change
		var quiz_element_container_html_reference=undefined;	//Undefined or object reference to the quiz_element_container object on the quiz, will change from undefined to object reference as part of this constructor but after that can never change again
		var submitAnswer;										//function(), attached to "submit" button click event handler, locates answer given on quiz by user and uses questionlike.checkAnswer(answer_input) to see if user got question right, then renders approproate html changes for correct or incorrect
		var displayAnswer;										//function(), attached to "See answer" button click event handler, makes appropriate html changes to make answer visible to user
		var makeQuizElementContainerHTML;						//function(), creates div object instance of quiz_element_container and sets quiz_element_container_html_reference to that object, note that this make function must be called before any other make function can be called, because all the others depend on quiz_element_container_html_reference being set
		var makeQuizElementSkeletonHTML;						//function(), creates basic html skeleton for the quiz_element on the actual document.  basic skeleton refers to all things that will not change on the html page, even if variables change. Basic skeleton will only ever have to be made once, while other things may or may not have to be made multiple times.  basic skeleton consists of: all divs, elements text nodes, and class names, except for anything inside input_answer_container.  Text nodes are created but set to "", which means they are not done.  only visual elements that basic skeleton fully comprises is the answer_feedback class and the submit and display answer buttons.
		var makeQuizElementInstructionsHTML;					//function(), creates instruction textnode html for the quiz_element on the actual document.  Note that the textnode should already exist, because of makeQuizElementSkeletonHTML(), this function just sets it to whatever it should be.  This function should also be called if questionlike.setInstructionText is ever called or this.setQuizElementId is ever called, has public accessor
		var makeQuizElementQuestionTextHTML;					//function(), creates question_text textnode html for the quiz_element on the actual document.  Note that the textnode should already exist, because of makeQuizElementSkeletonHTML(), this function just sets it to whatever it should be.  This function should also be called if questionlike.setQuestionText is ever called or, has public accessor.
		
		//dependent variables/methods that are set based on the somewhat independent variables, and will change if the somewhat independent variables change.  These variables are rendered at the end of this constructor.
		var obtainAnswerInput;									//=function(){...}, body depends on questionlike.getQuestionType(), returns user's answer based on how user interacted with page's html elements
		var makeQuizElementInputAnswerContainerHTML;			//=function() {...}, body depends on questionlike.getQuestionType(), deletes any pre-existing input_answer_container elements(s) and then creates the input_answer_conatiner element(s) on the actual document.  Must be called if questionlike.setQuestionType is ever called, has public accessor
		var editQuestionOnclick;								//=function() {...}, body depends on questionlike.getQuestionType(), click event handler for edit button
		
		//independent render methods that set the dependent variables/methods mentioned immediately above
		var renderEditQuestionOnclick;							//function(), renders the editQuestionOnclick function based on questionlike.getQuestionType()
		var renderObtainAnswerInput;							//function(), renders the obtainAnswerInput function based on questionlike.getQuestionType
		var renderMakeQuizElementInputAnswerContainerHTML;		//function(), renders the makeQuizElementInputAnswerContainerHTML function based on questionlike.getQuestionType
		
		
		
		
		//hard code for independent render methods mentioned above
		renderEditQuestionOnclick=function() {
			if (questionlike.getQuestionType()==="arithmetic") {
				editQuestionOnclick=function() {
					document.getElementById("onclick_screen_overlay").style.display="block";
					var message=document.getElementById("onclick_message");
					message.parentNode.style.display="block";
					var message_head=document.createElement("h1");
					message_head.appendChild(document.createTextNode("Edit quiz_element with quiz_element_id="+quiz_element_id));
					message_head.style.color="white";
					message_head.style.textAlign="center";
					message.appendChild(message_head);
					message.appendChild(document.createElement("br"));
					var message_instruction1=document.createElement("p");
					message_instruction1.appendChild(document.createTextNode("First, please specify how you would like to edit this quiz_element.  You can either edit it by syncing it to an already existing question/question_family, or you can edit it by editing the components of the question/question_family that this quiz_element is already synced to"));
					message_instruction1.style.marginLeft="5px";
					message_instruction1.style,marginRight="10px";
					message.appendChild(message_instruction1);
					var message_edit_method_dropdown=document.createElement("select");
					message_edit_method_dropdown.style.marginTop="10px";
					message_edit_method_dropdown.style.width="400px";
					message_edit_method_dropdown.style.height="30px";
					var option_1=document.createElement("option");
					option_1.value="sync_to_already_existing_question";
					option_1.appendChild(document.createTextNode("Sync to already existing question"));
					message_edit_method_dropdown.appendChild(option_1);
					var option_2=document.createElement("option");
					option_2.value="sync_to_already_existing_question_family";
					option_2.appendChild(document.createTextNode("Sync to already existing question_family"));
					message_edit_method_dropdown.appendChild(option_2);
					var option_3=document.createElement("option");
					option_3.value="leave_sync_edit_components";
					option_3.appendChild(document.createTextNode("Leave current sync and edit inner components"));
					message_edit_method_dropdown.appendChild(option_3);
					message.appendChild(message_edit_method_dropdown);
					var message_instruction2=document.createElement("h4");
					message_instruction2.appendChild(document.createTextNode("In that case, please identify the new question_id"));
					message_instruction2.style.marginLeft="5px";
					message_instruction2.style.display="none";
					message.appendChild(message_instruction2);
					var message_newquestionid_textarea=document.createElement("textarea");
					message_newquestionid_textarea.placeholder="Type new question_id here";
					message_newquestionid_textarea.style.width="200px";
					message_newquestionid_textarea.style.marginLeft="5px";
					message_newquestionid_textarea.style.display="none";
					message.appendChild(message_newquestionid_textarea);
					var message_instruction3=document.createElement("h4");
					message_instruction3.appendChild(document.createTextNode("In that case, please identify the new question_family_id"));
					message_instruction3.style.marginLeft="5px";
					message_instruction3.style.display="none";
					message.appendChild(message_instruction3);
					var message_newquestionfamilyid_textarea=document.createElement("textarea");
					message_newquestionfamilyid_textarea.placeholder="Type new question_family_id here";
					message_newquestionfamilyid_textarea.style.width="250px";
					message_newquestionfamilyid_textarea.style.marginLeft="5px";
					message_newquestionfamilyid_textarea.style.display="none";
					message.appendChild(message_newquestionfamilyid_textarea);
					var message_instruction4=document.createElement("h4");
					message_instruction4.appendChild(document.createTextNode("If you want to edit either question_type, instruction_text, or question_text, type in the new value that you want in the corresponding textareas.  If you leave a textarea blank, it will be interpreted that you do not wish to make any changes to those fields."));
					message_instruction4.style.marginLeft="5px";
					message_instruction4.style.display="none";
					message.appendChild(message_instruction4);
					var message_instruction5=document.createElement("h4");
					message_instruction5.appendChild(document.createTextNode("If you want to edit either question_type, instruction_text, or question_text_intermediate, type in the new value that you want in the corresponding textareas.  If you leave a textarea blank, it will be interpreted that you do not wish to make any changes to those fields."));
					message_instruction5.style.marginLeft="5px";
					message_instruction5.style.display="none";
					message.appendChild(message_instruction5);
					var message_newquestiontype_textarea=document.createElement("textarea");
					message_newquestiontype_textarea.placeholder="type new question_type here or leave blank for no changes";
					message_newquestiontype_textarea.style.width="500px";
					message_newquestiontype_textarea.style.marginLeft="5px";
					message_newquestiontype_textarea.style.marginTop="10px";
					message_newquestiontype_textarea.style.display="none";
					message.appendChild(message_newquestiontype_textarea);
					var message_newinstructiontext_textarea=document.createElement("textarea");
					message_newinstructiontext_textarea.placeholder="type new instruction_text here or leave blank for no changes";
					message_newinstructiontext_textarea.style.width="500px";
					message_newinstructiontext_textarea.style.marginLeft="5px";
					message_newinstructiontext_textarea.style.marginTop="5px";
					message_newinstructiontext_textarea.style.display="none";
					message.appendChild(message_newinstructiontext_textarea);
					var message_newquestiontext_textarea=document.createElement("textarea");
					message_newquestiontext_textarea.placeholder="type new question_text here or leave blank for no changes";
					message_newquestiontext_textarea.style.width="500px";
					message_newquestiontext_textarea.style.marginLeft="5px";
					message_newquestiontext_textarea.style.marginTop="5px";
					message_newquestiontext_textarea.style.display="none";
					message.appendChild(message_newquestiontext_textarea);
					var message_newquestiontextintermediate_textarea=document.createElement("textarea");
					message_newquestiontextintermediate_textarea.placeholder="type new question_text_intermediate here or leave blank for no changes";
					message_newquestiontextintermediate_textarea.style.width="500px";
					message_newquestiontextintermediate_textarea.style.marginLeft="5px";
					message_newquestiontextintermediate_textarea.style.marginTop="5px";
					message_newquestiontextintermediate_textarea.style.display="none";
					message.appendChild(message_newquestiontextintermediate_textarea);
					message.appendChild(document.createElement("br"));
					message.appendChild(document.createElement("br"));
					var cancel_button=document.createElement("button");
					cancel_button.innerHTML="Cancel";
					cancel_button.style.float="right";
					cancel_button.style.width="70px";
					cancel_button.style.height="30px";
					cancel_button.onclick=function() {page1.removeOnclickFeatures();};
					message.appendChild(cancel_button);
					var continue_button=document.createElement("button");
					continue_button.innerHTML="Continue";
					continue_button.style.float="right";
					continue_button.style.width="90px";
					continue_button.style.height="30px";
					continue_button.onclick=function() {
						message_instruction1.style.display="none";
						message_edit_method_dropdown.style.display="none";
						continue_button.style.display="none";
						ok_button.style.display="inline-block";
						back_button.style.display="inline-block";
						if (message_edit_method_dropdown.value==="sync_to_already_existing_question") {
							message_instruction2.style.display="block";
							message_newquestionid_textarea.style.display="block";
							ok_button.onclick=function(){
								var question_id=message_newquestionid_textarea.value;
								if (isNaN(question_id)) {
									alert("Error: You typed "+question_id+". That is not a number.  Please try again.");
								}
								else if (Number(question_id)%1!==0) {
									alert("Error: You typed "+question_id+". That is not an integer.  Every question_id in the database is an integer.  Please try again.");
								}
								else if (Number(question_id)<=0) {
									alert("Error: You typed "+question_id+". That number is too low.  The lowest question_id in the database is 1.  Please try again.");
								}
								else if (Number(question_id)>database1.getQuestionList().length) {
									alert("Error: You typed "+question_id+". That number is too high.  Currently the largest valid question_id in the database is "+database1.getQuestionList().length+". Please try again.");
								}
								else if (database1.getQuestion(Number(question_id)).getCorrespondingQuizElement()!==undefined) {
									alert("Error: You typed "+question_id+". That question is already on the quiz.  You can't add it again.  Please try again.")
								}
								else {
									page1.getQuizElement(quiz_element_id).setQuestionlike(database1.getQuestion(Number(question_id)));
									page1.removeOnclickFeatures();
									alert("Quiz element successfully synced to new question_id");
								}
							};
							back_button.onclick=function() {
								message_instruction1.style.display="block";
								message_edit_method_dropdown.style.display="block";
								continue_button.style.display="inline-block";
								ok_button.style.display="none";
								back_button.style.display="none";
								message_instruction2.style.display="none";
								message_newquestionid_textarea.style.display="none";
							};
						}
						else if (message_edit_method_dropdown.value==="sync_to_already_existing_question_family") {
							message_instruction3.style.display="block";
							message_newquestionfamilyid_textarea.style.display="block";
							ok_button.onclick=function(){
								var question_family_id=message_newquestionfamilyid_textarea.value;
								if (isNaN(question_family_id)) {
									alert("Error: You typed "+question_family_id+". That is not a number.  Please try again.");
								}
								else if (Number(question_family_id)%1!==0) {
									alert("Error: You typed "+question_family_id+". That is not an integer.  Every question_family_id in the database is an integer.  Please try again.");
								}
								else if (Number(question_family_id)<=0) {
									alert("Error: You typed "+question_family_id+". That number is too low.  The lowest question_family_id in the database is 1.  Please try again.");
								}
								else if (Number(question_family_id)>database1.getQuestionFamilyList().length) {
									alert("Error: You typed "+question_family_id+". That number is too high.  Currently the largest valid question_family_id in the database is "+database1.getQuestionFamilyList().length+". Please try again.");
								}
								else if (database1.getQuestionFamily(Number(question_family_id)).getCorrespondingQuizElement()!==undefined) {
									alert("Error: You typed "+question_family_id+". That question_family is already on the quiz.  You can't add it again.  Please try again.")
								}
								else {
									page1.getQuizElement(quiz_element_id).setQuestionlike(database1.getQuestionFamily(Number(question_family_id)));
									page1.removeOnclickFeatures();
									alert("Quiz element successfully synced to new question_family_id");
								}
							};
							back_button.onclick=function() {
								message_instruction1.style.display="block";
								message_edit_method_dropdown.style.display="block";
								continue_button.style.display="inline-block";
								ok_button.style.display="none";
								back_button.style.display="none";
								message_instruction3.style.display="none";
								message_newquestionfamilyid_textarea.style.display="none";
							};
						}
						else if (message_edit_method_dropdown.value==="leave_sync_edit_components") {
							if (questionlike.getQuestionlikeType()==="question") {
								message_instruction4.style.display="block";
								message_newquestiontype_textarea.style.display="block";
								message_newinstructiontext_textarea.style.display="block";
								message_newquestiontext_textarea.style.display="block";
								ok_button.onclick=function() {
									var new_question_type_input=message_newquestiontype_textarea.value;
									var new_instruction_text_input=message_newinstructiontext_textarea.value;
									var new_question_text_input=message_newquestiontext_textarea.value;
									if (new_question_type_input!=="") {
										if (new_question_type_input==="arithmetic") {
											questionlike.setQuestionType(new_question_type_input);
										}
										else {
											alert("Error: question_type for quiz_element's questionlike reference with quiz_element_id="+quiz_element_id+" not reset because the question_type typed in was not recognized.");
										}
									}
									if (new_instruction_text_input!=="") {
										questionlike.setInstructionText(new_instruction_text_input);
									}
									if (new_question_text_input!=="") {
										if (util.questionTextIsEvaluatable("arithmetic",new_question_text_input)) {
											questionlike.setQuestionText(new_question_text_input);
										}
										else {
											alert("Error: edit attempt for question_text failed because util.questionTextIsEvaluatable('arithmetic',whatever you typed for question_text) evaluated to false");
										}
									}
									page1.removeOnclickFeatures();
								};
								back_button.onclick=function() {
									message_instruction1.style.display="block";
									message_edit_method_dropdown.style.display="block";
									continue_button.style.display="inline-block";
									ok_button.style.display="none";
									back_button.style.display="none";
									message_instruction4.style.display="none";
									message_newquestiontype_textarea.style.display="none";
									message_newinstructiontext_textarea.style.display="none";
									message_newquestiontext_textarea.style.display="none";
								};
							}
							else if (questionlike.getQuestionlikeType()==="question_family") {
								message_instruction5.style.display="block";
								message_newquestiontype_textarea.style.display="block";
								message_newinstructiontext_textarea.style.display="block";
								message_newquestiontextintermediate_textarea.style.display="block";
								ok_button.onclick=function() {
									var new_question_type_input=message_newquestiontype_textarea.value;
									var new_instruction_text_input=message_newinstructiontext_textarea.value;
									var new_question_text_intermediate_input=message_newquestiontextintermediate_textarea.value;
									if (new_question_type_input!=="") {
										if (new_question_type_input==="arithmetic") {
											questionlike.setQuestionType(new_question_type_input);
										}
										else {
											alert("Error: question_type for quiz_element's questionlike reference with quiz_element_id="+quiz_element_id+" not reset because the question_type typed in was illegal.");
										}
									}
									if (new_instruction_text_input!=="") {
										questionlike.setInstructionText(new_instruction_text_input);
									}
									if (new_question_text_intermediate_input!=="") {
										if (util.questionTextIntermediateIsInterperetable("arithmetic",new_question_text_intermediate_input)) {
											questionlike.setQuestionTextIntermediate(new_question_text_intermediate_input);
										}
									}
									page1.removeOnclickFeatures();
								};
								back_button.onclick=function() {
									message_instruction1.style.display="block";
									message_edit_method_dropdown.style.display="block";
									continue_button.style.display="inline-block";
									ok_button.style.display="none";
									back_button.style.display="none";
									message_instruction5.style.display="none";
									message_newquestiontype_textarea.style.display="none";
									message_newinstructiontext_textarea.style.display="none";
									message_newquestiontextintermediate_textarea.style.display="none";
								};
							}
							else {
								alert("Error: questionlike.getQuestionlikeType for quiz_element "+quiz_element_id+" not recognized.  It should be either 'question' or 'question_family'.  Please fix.");
							}
						}
					};
					message.appendChild(continue_button);
					var ok_button=document.createElement("button");
					ok_button.innerHTML="OK";
					ok_button.style.float="right";
					ok_button.style.width="90px";
					ok_button.style.height="30px";
					ok_button.style.display="none";
					message.appendChild(ok_button);
					var back_button=document.createElement("button");
					back_button.innerHTML="Back";
					back_button.style.float="right";
					back_button.style.width="90px";
					back_button.style.height="30px";
					back_button.style.display="none";
					message.appendChild(back_button);
					message.appendChild(document.createElement("br"));
					message.appendChild(document.createElement("br"));
				};
			}
		};
		renderObtainAnswerInput=function() {
			if (questionlike.getQuestionType()==="arithmetic") {
				obtainAnswerInput=function() {
					return quiz_element_container_html_reference.getElementsByClassName("input_answer_field")[0].value;
				};
			}
			else {
				alert("questionlike.getQuestionType() for quiz_element id "+quiz_element_id+" not recognized.  As a result, renderObtainAnswerInput function was not set properly.  Please fix this");
			}
		};
		renderMakeQuizElementInputAnswerContainerHTML=function() {
			if (questionlike.getQuestionType()==="arithmetic") {
				makeQuizElementInputAnswerContainerHTML=function() {
					util.emptyAllInnerHTML(quiz_element_container_html_reference.getElementsByClassName("input_answer_container")[0]);
					var html_input_answer_field_textarea=document.createElement("textarea");
					html_input_answer_field_textarea.className="input_answer_field";
					html_input_answer_field_textarea.placeholder="Type answer here";
					quiz_element_container_html_reference.getElementsByClassName("input_answer_container")[0].appendChild(html_input_answer_field_textarea);
				};
			}
			else {
				alert("questionlike.getQuestionType() for quiz_element id "+quiz_element_id+" not recognized.  As a result, renderMakeQuizElementInputAnswerContainerHTML function was not set properly.  Please fix this");
			}
		};
		
		
		//calling the independent render methods in the right order
		renderEditQuestionOnclick();
		renderObtainAnswerInput();
		renderMakeQuizElementInputAnswerContainerHTML();
		
		
		//hard code for independent methods mentioned above, before the dependent variables/methods were even mentioned
		submitAnswer=function() {
			var answer_input=obtainAnswerInput();
			if (questionlike.checkAnswer(answer_input)) {
				quiz_element_container_html_reference.getElementsByClassName("correct")[0].style.display="inline-block";
				quiz_element_container_html_reference.getElementsByClassName("incorrect")[0].style.display="none";
			}
			else {
				quiz_element_container_html_reference.getElementsByClassName("correct")[0].style.display="none";
				quiz_element_container_html_reference.getElementsByClassName("incorrect")[0].style.display="inline-block";
			}
		};
		displayAnswer=function() {
			if (quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0]===undefined) {
				quiz_element_container_html_reference.appendChild(document.createElement("br"));
				quiz_element_container_html_reference.appendChild(document.createElement("br"));
				var answer_text_element=document.createElement("h5");
				var answer_text_node=document.createTextNode("The answer is "+questionlike.getAnswer());
				answer_text_element.appendChild(answer_text_node);
				answer_text_element.className="see_answer_text";
				answer_text_element.style.color="blue";
				answer_text_element.style.display="block";
				answer_text_element.style.marginLeft="40px";
				quiz_element_container_html_reference.appendChild(answer_text_element);
			}
			else if (quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0].style.display==="block") {
				quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0].style.display="none";
			}
			else if (quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0].style.display==="none") {
				quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0].innerHTML="The answer is "+questionlike.getAnswer();
				quiz_element_container_html_reference.getElementsByClassName("see_answer_text")[0].style.display="block";
			}
			else {
				alert("Error!  When the .displayAnswer() function was called for quiz_element with id "+quiz_element_id+", an else statement that should never have been arrived at was executed.");
			}
		};
		
		makeQuizElementContainerHTML=function() {
			quiz_element_container_html_reference=document.createElement("div");
			quiz_element_container_html_reference.className="quiz_element_container";
			document.getElementsByClassName("quiz_element_containers_container")[0].appendChild(quiz_element_container_html_reference);
		};
		makeQuizElementSkeletonHTML=function() {
			var html_instructions_h3=document.createElement("h3");
			html_instructions_h3.className="instructions_text";
			html_instructions_h3.appendChild(document.createTextNode(""));
			quiz_element_container_html_reference.appendChild(html_instructions_h3);
			var html_question_text_h4=document.createElement("h4");
			html_question_text_h4.className="question_text";
			html_question_text_h4.appendChild(document.createTextNode(""));
			quiz_element_container_html_reference.appendChild(html_question_text_h4);
			var html_input_answer_container_div=document.createElement("div");
			html_input_answer_container_div.className="input_answer_container";
			quiz_element_container_html_reference.appendChild(html_input_answer_container_div);
			var html_answer_feedback_div=document.createElement("div");
			html_answer_feedback_div.className="answer_feedback";
			quiz_element_container_html_reference.appendChild(html_answer_feedback_div);
			var html_correct_img=document.createElement("img");
			html_correct_img.className="correct";
			html_correct_img.src="http://images.all-free-download.com/images/graphiclarge/check_mark_clip_art_11058.jpg";
			html_answer_feedback_div.appendChild(html_correct_img);
			var html_incorrect_img=document.createElement("img");
			html_incorrect_img.className="incorrect";
			html_incorrect_img.src="http://renovahandcare.com/wp-content/uploads/2013/07/x-mark1.png";
			html_answer_feedback_div.appendChild(html_incorrect_img);
			var html_input_answer_button=document.createElement("button");
			html_input_answer_button.className="input_answer_button";
			html_input_answer_button.onclick=function() {submitAnswer();};
			html_input_answer_button.appendChild(document.createTextNode("Submit"));
			quiz_element_container_html_reference.appendChild(html_input_answer_button);
			var html_see_answer_button=document.createElement("button");
			html_see_answer_button.className="see_answer_button";
			html_see_answer_button.onclick=function() {displayAnswer();};
			html_see_answer_button.appendChild(document.createTextNode("See Answer"));
			quiz_element_container_html_reference.appendChild(html_see_answer_button);
			var html_edit_button=document.createElement("button");
			html_edit_button.className="edit_button";
			html_edit_button.onclick=function() {editQuestionOnclick();};
			html_edit_button.appendChild(document.createTextNode("Edit"));
			quiz_element_container_html_reference.appendChild(html_edit_button);
			var html_remove_button=document.createElement("button");
			html_remove_button.className="remove_button";
			html_remove_button.onclick=function() {page1.removeQuizElement(quiz_element_id);};
			html_remove_button.appendChild(document.createTextNode("Remove"));
			quiz_element_container_html_reference.appendChild(html_remove_button);
		};
		makeQuizElementInstructionsHTML=function() {
			quiz_element_container_html_reference.getElementsByClassName("instructions_text")[0].innerHTML=quiz_element_id+") "+questionlike.getInstructionText();
		};
		makeQuizElementQuestionTextHTML=function() {
			quiz_element_container_html_reference.getElementsByClassName("question_text")[0].innerHTML=questionlike.getQuestionText();
		};

		
		//calling the makeQuizElement functions in the right order
		makeQuizElementContainerHTML();
		makeQuizElementSkeletonHTML();
		makeQuizElementInstructionsHTML();
		makeQuizElementQuestionTextHTML();
		makeQuizElementInputAnswerContainerHTML();
		
		
		
		
		//getters for variables and methods
		this.getQuestionlike=function() {
			return questionlike;
		};
		this.getQuizElementId=function() {
			return quiz_element_id;
		};
		this.renderEditQuestionOnclick=function() {
			renderEditQuestionOnclick();
		};
		this.renderObtainAnswerInput=function() {
			renderObtainAnswerInput;
		};
		this.renderObtainAnswerInput=function() {
			renderObtainAnswerInput();
		};
		this.renderMakeQuizElementInputAnswerContainerHTML=function() {
			renderMakeQuizElementInputAnswerContainerHTML();
		};
		this.getQuizElementContainerHTMLReference=function(){
			return quiz_element_container_html_reference;
		};
		this.makeQuizElementInstructionsHTML=function(){
			makeQuizElementInstructionsHTML();
		};
		this.makeQuizElementQuestionTextHTML=function(){
			makeQuizElementQuestionTextHTML();
		};
		this.makeQuizElementInputAnswerContainerHTML=function(){
			makeQuizElementInputAnswerContainerHTML();
		};

		
		
		//setters; note 3 things:
        // 1) setter methods do not exist for every variable, only exist for questionlike and quiz_element_id.  No setter for quiz_element_container_html_reference because that variable is immutable. 
		// 2) setter methods that change a variable on which renderable methods are dependent on automatically re-renders those methods
		// 3) setter method for a variable that html is dependent on will automatically re-make that html
		this.setQuestionlike=function(new_questionlike) {
			questionlike.setCorrespondingQuizElement(undefined);
			new_questionlike.setCorrespondingQuizElement(this);
			questionlike=new_questionlike;
			renderEditQuestionOnclick();
			renderObtainAnswerInput();
			renderMakeQuizElementInputAnswerContainerHTML();
			makeQuizElementInstructionsHTML();
			makeQuizElementQuestionTextHTML();
			makeQuizElementInputAnswerContainerHTML();
			page1.makePageLiQuesionlikeHTML(quiz_element_id);
		};
		this.setQuizElementId=function(new_quiz_element_id) {
			quiz_element_id=new_quiz_element_id;
			makeQuizElementInstructionsHTML();                  //not really sure how to handle this one
			page1.makePageLiQuizElementIdHTML(quiz_element_id);
		};
		
		
		
		//Finally, the following code also has to be called so that when you construct a quiz_element object, questionlike.corresponding_quiz_element gets set to this.  Also, the subsequent line must be called to add this to page1.quiz_element_list
		questionlike.setCorrespondingQuizElement(this);
		page1.addQuizElement(this);
	}
};


var database=function(){
	
	//independent variables set by the fact that this is a database object
	var question_list=[];                        		 //list of question objects, can change
	var question_family_list=[];                         //list of question_family objects, can change
	var random_element_list=[]                           //list of random_element object, can change
	
	
	//independent methods set by the fact that this is a database object, I'm just going to initialize them all here
	this.nextAvailableQuestionId=function() {           			 //returns question_list.length+1, gets called in backend for question object construction
		return question_list.length+1;
	};
	var obtainDatabaseLiHTMLReference=function(question_id) {		 //returns object reference to html li element detailing fields of any given question_id
		return document.getElementById("backend_questions_list").getElementsByTagName("li")[question_id-1];
	};		
	var makeDatabaseLiElementHTML=function() {						 //creates the li element and creates the proper class name for it.  Note that this function must be called in order for obtainDatabaseLiHTMLReference() to obtain the right reference, and obtainDatabaseLiHTMLReference() must obtain the right reference for the rest of the make functions to work.
		var html_backend_question_li=document.createElement("li");
		html_backend_question_li.className="backend_element";
		document.getElementById("backend_questions_list").appendChild(html_backend_question_li);
	};
	var makeDatabaseLiSkeletonHTML=function(question_id) {			 //creates all the text nodes and breaks on the html doc, doesnt set the text nodes though
		var database_li_html_reference=obtainDatabaseLiHTMLReference(question_id);
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
	};
	var makeDatabaseLiQuestionIdHTML=function(question_id) {		 //sets the question_id line in the html
		obtainDatabaseLiHTMLReference(question_id).childNodes[0].nodeValue="question_id: "+question_id;
	};
	var makeDatabaseLiQuestionTypeHTML=function(question_id) {		 //sets the question_type line in the html
		obtainDatabaseLiHTMLReference(question_id).childNodes[2].nodeValue="question_type: \""+question_list[question_id-1].getQuestionType()+"\"";
	};
	var makeDatabaseLiInstructionTextHTML=function(question_id) {	 //sets the instruction_text line in the html
		obtainDatabaseLiHTMLReference(question_id).childNodes[4].nodeValue="instruction_text: \""+question_list[question_id-1].getInstructionText()+"\"";
	};
	var makeDatabaseLiQuestionTextHTML=function(question_id) {		 //sets the question_text line in the html
		obtainDatabaseLiHTMLReference(question_id).childNodes[6].nodeValue="question_text: \""+question_list[question_id-1].getQuestionText()+"\"";
	};
	var makeDatabaseLiAnswerHTML=function(question_id) {			 //sets the answer line in the html
		obtainDatabaseLiHTMLReference(question_id).childNodes[8].nodeValue="answer: "+question_list[question_id-1].getAnswer();
	};
	this.addQuestion=function(question) {							 //adds a question to question_list and makes all the html in the right side backend stuff
		question_list.push(question);
		var question_id=question.getQuestionId();
		makeDatabaseLiElementHTML();
		makeDatabaseLiSkeletonHTML(question_id);
		makeDatabaseLiQuestionIdHTML(question_id);
		makeDatabaseLiQuestionTypeHTML(question_id);
		makeDatabaseLiInstructionTextHTML(question_id);
		makeDatabaseLiQuestionTextHTML(question_id);
		makeDatabaseLiAnswerHTML(question_id);
	};
	this.nextAvailableRandomElementId=function() {					 //returns random_element_list.length+1, gets called in backend for random_element object construction
		return random_element_list.length+1;
	};
	var makeDatabaseRandomLiElementHTML=function() {
		var html_backend_random_li=document.createElement("li");
		html_backend_random_li.className="backend_element";
		document.getElementById("backend_random_elements_list").appendChild(html_backend_random_li);
	};
	var obtainDatabaseRandomLiHTMLReference=function(random_element_id) {		 //returns object reference to html li element detailing fields of any given random_element_id
		return document.getElementById("backend_random_elements_list").getElementsByTagName("li")[random_element_id-1];
	};
	var makeDatabaseRandomLiSkeletonHTML=function(random_element_id) {			 //creates all the text nodes and breaks on the html doc, doesnt set the text nodes though
		var database_li_html_reference=obtainDatabaseRandomLiHTMLReference(random_element_id);
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
	};
	var makeDatabaseRandomLiRandomElementIdHTML=function(random_element_id) {
		obtainDatabaseRandomLiHTMLReference(random_element_id).childNodes[0].nodeValue="random_element_id: "+random_element_id;
	};
	var makeDatabaseRandomLiDisplayTextHTML=function(random_element_id) {
		obtainDatabaseRandomLiHTMLReference(random_element_id).childNodes[2].nodeValue="display_text: \""+random_element_list[random_element_id-1].getDisplayText()+"\"";
	};
	var makeDatabaseRandomLiAvailableValueListHTML=function(random_element_id) {
		obtainDatabaseRandomLiHTMLReference(random_element_id).childNodes[4].nodeValue="available_value_list: ["+random_element_list[random_element_id-1].getAvailableValueList()+"]";
	};
	this.addRandomElement=function(random_element) {							 //adds a random_element to random_element_list and makes all the html in the right side backend stuff
		random_element_list.push(random_element);
		var random_element_id=random_element.getRandomElementId();
		makeDatabaseRandomLiElementHTML();
		makeDatabaseRandomLiSkeletonHTML(random_element_id);
		makeDatabaseRandomLiRandomElementIdHTML(random_element_id);
		makeDatabaseRandomLiDisplayTextHTML(random_element_id);
		makeDatabaseRandomLiAvailableValueListHTML(random_element_id);
	};
	this.nextAvailableQuestionFamilyId=function() {           			 //returns question_family_list.length+1, gets called in backend for question_family object construction
		return question_family_list.length+1;
	};
	var makeDatabaseQuestionFamilyLiElementHTML=function() {
		var html_backend_question_family_li=document.createElement("li");
		html_backend_question_family_li.className="backend_element";
		document.getElementById("backend_question_families_list").appendChild(html_backend_question_family_li);
	};
	var obtainDatabaseQuestionFamilyLiHTMLReference=function(question_family_id) {		 //returns object reference to html li element detailing fields of any given question_family_id
		return document.getElementById("backend_question_families_list").getElementsByTagName("li")[question_family_id-1];
	};
	var makeDatabaseQuestionFamilyLiSkeletonHTML=function(question_family_id) {			 //creates all the text nodes and breaks on the html doc, doesnt set the text nodes though
		var database_li_html_reference=obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id);
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
		database_li_html_reference.appendChild(document.createElement("br"));
		database_li_html_reference.appendChild(document.createTextNode(""));
	};
	var makeDatabaseQuestionFamilyLiQuestionFamilyIdHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[0].nodeValue="question_family_id: "+question_family_id;
	};
	var makeDatabaseQuestionFamilyLiQuestionTypeHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[2].nodeValue="question_type: \""+question_family_list[question_family_id-1].getQuestionType()+"\"";
	};
	var makeDatabaseQuestionFamilyLiInstructionTextHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[4].nodeValue="instruction_text: \""+question_family_list[question_family_id-1].getInstructionText()+"\"";
	};
	var makeDatabaseQuestionFamilyLiQuestionTextIntermediateHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[6].nodeValue="question_text_intermediate: \""+question_family_list[question_family_id-1].getQuestionTextIntermediate()+"\"";
	};
	var makeDatabaseQuestionFamilyLiQuestionTextHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[8].nodeValue="question_text: \""+question_family_list[question_family_id-1].getQuestionText()+"\"";
	};
	var makeDatabaseQuestionFamilyLiRandomElementReferencesHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[10].nodeValue="random_element_references (by id): ["+util.listComprehend(question_family_list[question_family_id-1].getRandomElementReferences(),"element.getRandomElementId()")+"]";
	};
	var makeDatabaseQuestionFamilyLiAnswerHTML=function(question_family_id) {
		obtainDatabaseQuestionFamilyLiHTMLReference(question_family_id).childNodes[12].nodeValue="answer: "+question_family_list[question_family_id-1].getAnswer();
	};
	this.addQuestionFamily=function(question_family) {					//adds a question_family to question_family_list and makes all the html in the right side backend stuff
		question_family_list.push(question_family);
		var question_family_id=question_family.getQuestionFamilyId();
		makeDatabaseQuestionFamilyLiElementHTML();
		makeDatabaseQuestionFamilyLiSkeletonHTML(question_family_id);
		makeDatabaseQuestionFamilyLiQuestionFamilyIdHTML(question_family_id);
		makeDatabaseQuestionFamilyLiQuestionTypeHTML(question_family_id);
		makeDatabaseQuestionFamilyLiInstructionTextHTML(question_family_id);
		makeDatabaseQuestionFamilyLiQuestionTextIntermediateHTML(question_family_id);
		makeDatabaseQuestionFamilyLiQuestionTextHTML(question_family_id);
		makeDatabaseQuestionFamilyLiRandomElementReferencesHTML(question_family_id);
		makeDatabaseQuestionFamilyLiAnswerHTML(question_family_id);
	};
	
	
	
	//getters for variables and methods
	this.getQuestionList=function() {
		return question_list;
	};
	this.getQuestion=function(question_id) {
		return question_list[question_id-1];
	};
	this.getQuestionFamilyList=function() {
		return question_family_list;
	};
	this.getQuestionFamily=function(question_family_id) {
		return question_family_list[question_family_id-1];
	};
	this.getRandomElementList=function() {
		return random_element_list;
	};
	this.getRandomElement=function(random_element_id) {
		return random_element_list[random_element_id-1];
	};
	this.makeDatabaseLiQuestionIdHTML=function(question_id) {
		makeDatabaseLiQuestionIdHTML(question_id);
	};
	this.makeDatabaseLiQuestionTypeHTML=function(question_id) {
		makeDatabaseLiQuestionTypeHTML(question_id);
	};
	this.makeDatabaseLiInstructionTextHTML=function(question_id) {
		makeDatabaseLiInstructionTextHTML(question_id);
	};
	this.makeDatabaseLiQuestionTextHTML=function(question_id) {
		makeDatabaseLiQuestionTextHTML(question_id);
	};
	this.makeDatabaseLiAnswerHTML=function(question_id) {
		makeDatabaseLiAnswerHTML(question_id);
	};
	this.makeDatabaseRandomLiRandomElementIdHTML=function(random_element_id) {
		makeDatabaseRandomLiRandomElementIdHTML(random_element_id);
	};
	this.makeDatabaseRandomLiDisplayTextHTML=function(random_element_id) {
		makeDatabaseRandomLiDisplayTextHTML(random_element_id);
	};
	this.makeDatabaseRandomLiAvailableValueListHTML=function(random_element_id) {
		makeDatabaseRandomLiAvailableValueListHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiQuestionFamilyIdHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiQuestionFamilyIdHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiQuestionTypeHTML=function(random_element_id){
		makeDatabaseQuestionFamilyLiQuestionTypeHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiInstructionTextHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiInstructionTextHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiQuestionTextIntermediateHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiQuestionTextIntermediateHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiQuestionTextHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiQuestionTextHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiRandomElementReferencesHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiRandomElementReferencesHTML(random_element_id);
	};
	this.makeDatabaseQuestionFamilyLiAnswerHTML=function(random_element_id) {
		makeDatabaseQuestionFamilyLiAnswerHTML(random_element_id);
	};
};


var page=function() {
	
	//independent variables set by the fact that this is a page object
	var quiz_element_list=[];                  							//list of quiz_element objects
	
	//independent methods set by the fact that this is a page object, I'm just going to initialize them all here
	this.nextAvailableQuizElementId=function() {						//returns quiz_element_list.length+1, gets called in backend for quiz_element construction
		return quiz_element_list.length+1;
	};
	var obtainPageLiHTMLReference=function(quiz_element_id) {			//returns object reference to html li element detailing fields of any given quiz_element id
		return document.getElementById("backend_quiz_elements_list").getElementsByTagName("li")[quiz_element_id-1];
	};
	var makePageLiElementHTML=function() {								//creates the li element and creates the proper class name for it.  Note that this function must be called in order for obtainPageLiHTMLReference() to obtain the right reference, and obtainPageLiHTMLReference() must obtain the right reference in order for the rest of the make functions to work.
		var html_backend_quiz_element_li=document.createElement("li");
		html_backend_quiz_element_li.className="backend_element";
		document.getElementById("backend_quiz_elements_list").appendChild(html_backend_quiz_element_li);
	};
	var makePageLiSkeletonHTML=function(quiz_element_id) {				//creates all the text nodes and breaks on the html doc, doesnt set the text nodes though
		var page_li_html_reference=obtainPageLiHTMLReference(quiz_element_id);
		page_li_html_reference.appendChild(document.createTextNode(""));
		page_li_html_reference.appendChild(document.createElement("br"));
		page_li_html_reference.appendChild(document.createTextNode(""));
	};
	var makePageLiQuizElementIdHTML=function(quiz_element_id) {			//creates the quiz_element_id line in the html DOM
		obtainPageLiHTMLReference(quiz_element_id).childNodes[0].nodeValue="quiz_element_id: "+quiz_element_id;
	};
	var makePageLiQuesionlikeHTML=function(quiz_element_id) {			//creates the questionlike line in the html DOM
		obtainPageLiHTMLReference(quiz_element_id).childNodes[2].nodeValue="questionlike: "+quiz_element_list[quiz_element_id-1].getQuestionlike().getQuestionlikeType()+" with "+quiz_element_list[quiz_element_id-1].getQuestionlike().getQuestionlikeType()+"_id="+quiz_element_list[quiz_element_id-1].getQuestionlike().getQuestionlikeTypeNonSpecificId();
	};
	this.addQuizElement=function(quiz_element){							//adds a quiz_element to quiz_element_list and makes all the html in the right side backend stuff
		quiz_element_list.push(quiz_element);
		var quiz_element_id=quiz_element.getQuizElementId();
		makePageLiElementHTML();
		makePageLiSkeletonHTML(quiz_element_id);
		makePageLiQuizElementIdHTML(quiz_element_id);
		makePageLiQuesionlikeHTML(quiz_element_id);
	};
	this.removeQuizElement=function(quiz_element_id) {
		var quiz_element_to_remove=quiz_element_list[quiz_element_id-1];
		var quiz_element_container_html_reference=quiz_element_to_remove.getQuizElementContainerHTMLReference();
		var page_li_html_reference=obtainPageLiHTMLReference(quiz_element_id);
		quiz_element_to_remove.getQuestionlike().setCorrespondingQuizElement(undefined);
		util.emptyAllInnerHTML(quiz_element_container_html_reference);
		quiz_element_container_html_reference.parentNode.removeChild(quiz_element_container_html_reference);
		util.emptyAllInnerHTML(page_li_html_reference);
		page_li_html_reference.parentNode.removeChild(page_li_html_reference);
		for (var i=quiz_element_id;i<quiz_element_list.length;i++) {
			quiz_element_list[i].setQuizElementId(i);
		};
		quiz_element_list.splice(quiz_element_id-1,1);
	};
	//page button-related functions
	var removeOnclickFeatures=function() {								//removes all onclick button DOM features so that you can continue interacting with rest of screen once you are done with an onclick teacher interaction feature.  This function gets called if you click cancel, or finish with the teacher interaction and click ok.
		document.getElementById("onclick_screen_overlay").style.display="none";
		util.emptyAllInnerHTML(document.getElementById("onclick_message"));
		document.getElementById("onclick_message_container").style.display="none";
	};
	this.createQuestionOnclick=function() {
		document.getElementById("onclick_screen_overlay").style.display="block";
		var message=document.getElementById("onclick_message");
		message.parentNode.style.display="block";
		var message_head=document.createElement("h1");
		message_head.appendChild(document.createTextNode("Create a new question to add to database"));
		message_head.style.color="white";
		message_head.style.textAlign="center";
		message.appendChild(message_head);
		message.appendChild(document.createElement("br"));
		var message_instruction1=document.createElement("h4");
		message_instruction1.appendChild(document.createTextNode("First, choose which question_type you want to create:"));
		message.appendChild(message_instruction1);
		var message_question_type_dropdown=document.createElement("select");
		message_question_type_dropdown.style.position="relative";
		message_question_type_dropdown.style.bottom="25px";
		message_question_type_dropdown.style.left="375px";
		message_question_type_dropdown.style.width="100px";
		message_question_type_dropdown.style.height="30px";
		var option_1=document.createElement("option");
		option_1.value="arithmetic";
		option_1.appendChild(document.createTextNode("arithmetic"));
		message_question_type_dropdown.appendChild(option_1);
		message.appendChild(message_question_type_dropdown);
		var message_instruction2=document.createElement("h4");
		message_instruction2.appendChild(document.createTextNode("Next, fill in the following additional information:"));
		message_instruction2.style.display="none";
		message.appendChild(message_instruction2);
		message.appendChild(document.createElement("br"));
		var message_instruction_text_text=document.createElement("h5");
		message_instruction_text_text.appendChild(document.createTextNode("instruction_text:"));
		message_instruction_text_text.style.marginLeft="10px";
		message_instruction_text_text.style.display="none";
		message.appendChild(message_instruction_text_text);
		var message_instruction_text_textarea=document.createElement("textarea");
		message_instruction_text_textarea.placeholder="Type instruction_text for question here";
		message_instruction_text_textarea.style.marginLeft="5px";
		message_instruction_text_textarea.style.width='75%';
		message_instruction_text_textarea.style.position='relative';
		message_instruction_text_textarea.style.top='10px';
		message_instruction_text_textarea.style.display="none";
		message.appendChild(message_instruction_text_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var message_question_text_text=document.createElement("h5");
		message_question_text_text.appendChild(document.createTextNode("question_text:"));
		message_question_text_text.style.marginLeft="10px";
		message_question_text_text.style.display="none";
		message.appendChild(message_question_text_text);
		var message_question_text_textarea=document.createElement("textarea");
		message_question_text_textarea.placeholder="Type question_text for question here";
		message_question_text_textarea.style.marginLeft="5px";
		message_question_text_textarea.style.width='75%';
		message_question_text_textarea.style.position='relative';
		message_question_text_textarea.style.top='10px';
		message_question_text_textarea.style.display="none";
		message.appendChild(message_question_text_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var message_add_question_text=document.createElement("h5");
		message_add_question_text.appendChild(document.createTextNode("Do you also want to add this question to the quiz?"));
		message_add_question_text.style.marginLeft="10px";
		message_add_question_text.style.marginRight="5px";
		message_add_question_text.style.display="none";
		message.appendChild(message_add_question_text);
		var message_add_question_dropdown=document.createElement("select");
		message_add_question_dropdown.style.width="100px";
		message_add_question_dropdown.style.height="30px";
		message_add_question_dropdown.style.display="none";
		var option_11=document.createElement("option");
		option_11.value="yes";
		option_11.appendChild(document.createTextNode("yes"));
		message_add_question_dropdown.appendChild(option_11);
		var option_12=document.createElement("option");
		option_12.value="no";
		option_12.appendChild(document.createTextNode("no"));
		message_add_question_dropdown.appendChild(option_12);
		message.appendChild(message_add_question_dropdown);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var cancel_button=document.createElement("button");
		cancel_button.innerHTML="Cancel";
		cancel_button.style.float="right";
		cancel_button.style.width="70px";
		cancel_button.style.height="30px";
		cancel_button.onclick=function() {removeOnclickFeatures();};
		message.appendChild(cancel_button);
		var continue_button=document.createElement("button");
		continue_button.innerHTML="Continue";
		continue_button.style.float="right";
		continue_button.style.width="90px";
		continue_button.style.height="30px";
		continue_button.onclick=function() {
			if (message_question_type_dropdown.value==="arithmetic") {
				message_instruction1.style.display="none";
				message_question_type_dropdown.style.display="none";
				message_instruction2.style.display="block";
				message_instruction_text_text.style.display="inline-block";
				message_instruction_text_textarea.style.display="inline-block";
				message_question_text_text.style.display="inline-block";
				message_question_text_textarea.style.display="inline-block";
				message_add_question_text.style.display="inline-block";
				message_add_question_dropdown.style.display="inline-block";
				continue_button.style.display="none";
				ok_button.style.display="inline-block";
				back_button.style.display="inline-block";
			}
		};
		message.appendChild(continue_button);
		var ok_button=document.createElement("button");
		ok_button.innerHTML="OK";
		ok_button.style.float="right";
		ok_button.style.width="70px";
		ok_button.style.height="30px";
		ok_button.style.display="none";
		ok_button.onclick=function() {
			if (util.questionTextIsEvaluatable(message_question_type_dropdown.value,message_question_text_textarea.value)) {
				var new_question=new question(message_question_type_dropdown.value,message_instruction_text_textarea.value,message_question_text_textarea.value);
				if (message_add_question_dropdown.value==="yes") {
					new quiz_element(new_question);
				}
				removeOnclickFeatures();
				alert("Question successfully added to database.");
			}
			else {
				alert("Error: question object construction dumped because question_text is not evaluatable.  Please try again.");
			}
		};
		message.appendChild(ok_button);
		var back_button=document.createElement("button");
		back_button.innerHTML="Back";
		back_button.style.float="right";
		back_button.style.width="70px";
		back_button.style.height="30px";
		back_button.style.display="none";
		back_button.onclick=function() {
			if (message_question_type_dropdown.value==="arithmetic") {
				message_instruction1.style.display="block";
				message_question_type_dropdown.style.display="inline-block";
				message_instruction2.style.display="none";
				message_instruction_text_text.style.display="none";
				message_instruction_text_textarea.style.display="none";
				message_question_text_text.style.display="none";
				message_question_text_textarea.style.display="none";
				message_add_question_text.style.display="none";
				message_add_question_dropdown.style.display="none";
				continue_button.style.display="block";
				ok_button.style.display="none";
				back_button.style.display="none";
			}};
		message.appendChild(back_button);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
	};
	this.addQuestionOnclick=function() {								//onclick handler function for the add question button, creates a div to deactivate rest of screen and a message that can be interacted with
		document.getElementById("onclick_screen_overlay").style.display="block";
		var message=document.getElementById("onclick_message");
		message.parentNode.style.display="block";
		var message_head=document.createElement("h1");
		message_head.appendChild(document.createTextNode("Add a pre-existing question to the quiz"));
		message_head.style.color="white";
		message_head.style.textAlign="center";
		message.appendChild(message_head);
		message.appendChild(document.createElement("br"));
		var message_instruction=document.createElement("h4");
		message_instruction.appendChild(document.createTextNode("Type the question_id for the question that you want to add in the area below:"));
		message.appendChild(message_instruction);
		var message_textarea=document.createElement("textarea");
		message_textarea.style.width='100%';
		message_textarea.placeholder="Type question_id here";
		message.appendChild(message_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var cancel_button=document.createElement("button");
		cancel_button.innerHTML="Cancel";
		cancel_button.style.float="right";
		cancel_button.style.width="70px";
		cancel_button.style.height="30px";
		cancel_button.onclick=function() {removeOnclickFeatures();};
		message.appendChild(cancel_button);
		var ok_button=document.createElement("button");
		ok_button.innerHTML="OK";
		ok_button.style.float="right";
		ok_button.style.width="70px";
		ok_button.style.height="30px";
		ok_button.onclick=function() {
			var question_id=message_textarea.value;
			if (isNaN(question_id)) {
				alert("Error: You typed "+question_id+". That is not a number.  Please try again.");
			}
			else if (Number(question_id)%1!==0) {
				alert("Error: You typed "+question_id+". That is not an integer.  Every question_id in the database is an integer.  Please try again.");
			}
			else if (Number(question_id)<=0) {
				alert("Error: You typed "+question_id+". That number is too low.  The lowest question_id in the database is 1.  Please try again.");
			}
			else if (Number(question_id)>database1.getQuestionList().length) {
				alert("Error: You typed "+question_id+". That number is too high.  Currently the largest valid question_id in the database is "+database1.getQuestionList().length+". Please try again.");
			}
			else if (database1.getQuestion(Number(question_id)).getCorrespondingQuizElement()!==undefined) {
				alert("Error: You typed "+question_id+". That question is already on the quiz.  You can't add it again.  Please try again.")
			}
			else {
				new quiz_element(database1.getQuestion(question_id));
				removeOnclickFeatures();
				alert("Question successfully added to quiz.");
			}
		};
		message.appendChild(ok_button);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
	};
	this.createQuestionFamilyOnclick=function() {
		document.getElementById("onclick_screen_overlay").style.display="block";
		var message=document.getElementById("onclick_message");
		message.parentNode.style.display="block";
		var message_head=document.createElement("h1");
		message_head.appendChild(document.createTextNode("Create a new question_family to add to database"));
		message_head.style.color="white";
		message_head.style.textAlign="center";
		message.appendChild(message_head);
		message.appendChild(document.createElement("br"));
		var message_instruction1=document.createElement("h4");
		message_instruction1.appendChild(document.createTextNode("First, choose which question_type you want to create:"));
		message.appendChild(message_instruction1);
		var message_question_type_dropdown=document.createElement("select");
		message_question_type_dropdown.style.position="relative";
		message_question_type_dropdown.style.bottom="25px";
		message_question_type_dropdown.style.left="375px";
		message_question_type_dropdown.style.width="100px";
		message_question_type_dropdown.style.height="30px";
		var option_1=document.createElement("option");
		option_1.value="arithmetic";
		option_1.appendChild(document.createTextNode("arithmetic"));
		message_question_type_dropdown.appendChild(option_1);
		message.appendChild(message_question_type_dropdown);
		var message_instruction2=document.createElement("h4");
		message_instruction2.appendChild(document.createTextNode("Next, fill in the following additional information:"));
		message_instruction2.style.display="none";
		message.appendChild(message_instruction2);
		message.appendChild(document.createElement("br"));
		var message_instruction_text_text=document.createElement("h5");
		message_instruction_text_text.appendChild(document.createTextNode("instruction_text:"));
		message_instruction_text_text.style.marginLeft="10px";
		message_instruction_text_text.style.display="none";
		message.appendChild(message_instruction_text_text);
		var message_instruction_text_textarea=document.createElement("textarea");
		message_instruction_text_textarea.placeholder="Type instruction_text for question here";
		message_instruction_text_textarea.style.marginLeft="5px";
		message_instruction_text_textarea.style.width='75%';
		message_instruction_text_textarea.style.position='relative';
		message_instruction_text_textarea.style.top='10px';
		message_instruction_text_textarea.style.display="none";
		message.appendChild(message_instruction_text_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var message_question_text_intermediate_text=document.createElement("h5");
		message_question_text_intermediate_text.appendChild(document.createTextNode("question_text_intermediate:"));
		message_question_text_intermediate_text.style.marginLeft="10px";
		message_question_text_intermediate_text.style.display="none";
		message.appendChild(message_question_text_intermediate_text);
		var message_question_text_intermediate_textarea=document.createElement("textarea");
		message_question_text_intermediate_textarea.placeholder="Type question_text_intermediate for question here";
		message_question_text_intermediate_textarea.style.marginLeft="5px";
		message_question_text_intermediate_textarea.style.width='75%';
		message_question_text_intermediate_textarea.style.position='relative';
		message_question_text_intermediate_textarea.style.top='10px';
		message_question_text_intermediate_textarea.style.display="none";
		message.appendChild(message_question_text_intermediate_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var message_add_question_family_text=document.createElement("h5");
		message_add_question_family_text.appendChild(document.createTextNode("Do you also want to add this question_family to the quiz?"));
		message_add_question_family_text.style.marginLeft="10px";
		message_add_question_family_text.style.marginRight="5px";
		message_add_question_family_text.style.display="none";
		message.appendChild(message_add_question_family_text);
		var message_add_question_family_dropdown=document.createElement("select");
		message_add_question_family_dropdown.style.width="100px";
		message_add_question_family_dropdown.style.height="30px";
		message_add_question_family_dropdown.style.display="none";
		var option_11=document.createElement("option");
		option_11.value="yes";
		option_11.appendChild(document.createTextNode("yes"));
		message_add_question_family_dropdown.appendChild(option_11);
		var option_12=document.createElement("option");
		option_12.value="no";
		option_12.appendChild(document.createTextNode("no"));
		message_add_question_family_dropdown.appendChild(option_12);
		message.appendChild(message_add_question_family_dropdown);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var cancel_button=document.createElement("button");
		cancel_button.innerHTML="Cancel";
		cancel_button.style.float="right";
		cancel_button.style.width="70px";
		cancel_button.style.height="30px";
		cancel_button.onclick=function() {removeOnclickFeatures();};
		message.appendChild(cancel_button);
		var continue_button=document.createElement("button");
		continue_button.innerHTML="Continue";
		continue_button.style.float="right";
		continue_button.style.width="90px";
		continue_button.style.height="30px";
		continue_button.onclick=function() {
			if (message_question_type_dropdown.value==="arithmetic") {
				message_instruction1.style.display="none";
				message_question_type_dropdown.style.display="none";
				message_instruction2.style.display="block";
				message_instruction_text_text.style.display="inline-block";
				message_instruction_text_textarea.style.display="inline-block";
				message_question_text_intermediate_text.style.display="inline-block";
				message_question_text_intermediate_textarea.style.display="inline-block";
				message_add_question_family_text.style.display="inline-block";
				message_add_question_family_dropdown.style.display="inline-block";
				continue_button.style.display="none";
				ok_button.style.display="inline-block";
				back_button.style.display="inline-block";
			}
		};
		message.appendChild(continue_button);
		var ok_button=document.createElement("button");
		ok_button.innerHTML="OK";
		ok_button.style.float="right";
		ok_button.style.width="70px";
		ok_button.style.height="30px";
		ok_button.style.display="none";
		ok_button.onclick=function() {
			if (util.questionTextIntermediateIsInterperetable(message_question_type_dropdown.value,message_question_text_intermediate_textarea.value)) {
				var new_question_family=new question_family(message_question_type_dropdown.value,message_instruction_text_textarea.value,message_question_text_intermediate_textarea.value);
				if (message_add_question_family_dropdown.value==="yes") {
					new quiz_element(new_question_family);
				}
				removeOnclickFeatures();
				alert("Question_family successfully added to database.");
			}
			else {
				alert("Error: question_family object construction dumped because question_text_intermediate is not interperetable.  Please try again.");
			}
		};
		message.appendChild(ok_button);
		var back_button=document.createElement("button");
		back_button.innerHTML="Back";
		back_button.style.float="right";
		back_button.style.width="70px";
		back_button.style.height="30px";
		back_button.style.display="none";
		back_button.onclick=function() {
			if (message_question_type_dropdown.value==="arithmetic") {
				message_instruction1.style.display="block";
				message_question_type_dropdown.style.display="inline-block";
				message_instruction2.style.display="none";
				message_instruction_text_text.style.display="none";
				message_instruction_text_textarea.style.display="none";
				message_question_text_intermediate_text.style.display="none";
				message_question_text_intermediate_textarea.style.display="none";
				message_add_question_family_text.style.display="none";
				message_add_question_family_dropdown.style.display="none";
				continue_button.style.display="block";
				ok_button.style.display="none";
				back_button.style.display="none";
			}
		};
		message.appendChild(back_button);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
	};
	this.addQuestionFamilyOnclick=function() {								//onclick handler function for the add question family button, creates a div to deactivate rest of screen and a message that can be interacted with
		document.getElementById("onclick_screen_overlay").style.display="block";
		var message=document.getElementById("onclick_message");
		message.parentNode.style.display="block";
		var message_head=document.createElement("h1");
		message_head.appendChild(document.createTextNode("Add a pre-existing question_family to the quiz"));
		message_head.style.color="white";
		message_head.style.textAlign="center";
		message.appendChild(message_head);
		message.appendChild(document.createElement("br"));
		var message_instruction=document.createElement("h4");
		message_instruction.appendChild(document.createTextNode("Type the question_family_id for the question that you want to add in the area below:"));
		message.appendChild(message_instruction);
		var message_textarea=document.createElement("textarea");
		message_textarea.style.width='100%';
		message_textarea.placeholder="Type question_family_id here";
		message.appendChild(message_textarea);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
		var cancel_button=document.createElement("button");
		cancel_button.innerHTML="Cancel";
		cancel_button.style.float="right";
		cancel_button.style.width="70px";
		cancel_button.style.height="30px";
		cancel_button.onclick=function() {removeOnclickFeatures();};
		message.appendChild(cancel_button);
		var ok_button=document.createElement("button");
		ok_button.innerHTML="OK";
		ok_button.style.float="right";
		ok_button.style.width="70px";
		ok_button.style.height="30px";
		ok_button.onclick=function() {
			var question_family_id=message_textarea.value;
			if (isNaN(question_family_id)) {
				alert("Error: You typed "+question_family_id+". That is not a number.  Please try again.");
			}
			else if (Number(question_family_id)%1!==0) {
				alert("Error: You typed "+question_family_id+". That is not an integer.  Every question_family_id in the database is an integer.  Please try again.");
			}
			else if (Number(question_family_id)<=0) {
				alert("Error: You typed "+question_family_id+". That number is too low.  The lowest question_family_id in the database is 1.  Please try again.");
			}
			else if (Number(question_family_id)>database1.getQuestionFamilyList().length) {
				alert("Error: You typed "+question_family_id+". That number is too high.  Currently the largest valid question_family_id in the database is "+database1.getQuestionFamilyList().length+". Please try again.");
			}
			else if (database1.getQuestionFamily(Number(question_family_id)).getCorrespondingQuizElement()!==undefined) {
				alert("Error: You typed "+question_family_id+". That question_family is already on the quiz.  You can't add it again.  Please try again.")
			}
			else {
				new quiz_element(database1.getQuestionFamily(question_family_id));
				removeOnclickFeatures();
				alert("Question_family successfully added to quiz.");
			}
		};
		message.appendChild(ok_button);
		message.appendChild(document.createElement("br"));
		message.appendChild(document.createElement("br"));
	};
	this.generateSampleQuiz=function() {
		var sample_quiz=window.open();
		var head=sample_quiz.document.firstChild.firstChild;
		var body=sample_quiz.document.firstChild.lastChild;
		var title=sample_quiz.document.createElement("title");
		title.appendChild(sample_quiz.document.createTextNode("Developing Sample Quiz"));
		head.appendChild(title);
		var css_link=sample_quiz.document.createElement("link");
		css_link.href="file:///C:/Users/Ethan/Documents/website_runnables/random/random.css";
		css_link.rel="stylesheet";
		head.appendChild(css_link);
		var top_header=sample_quiz.document.createElement("h1");
		top_header.className="top_header";
		top_header.appendChild(sample_quiz.document.createTextNode("Sample Quiz"));
		body.appendChild(top_header);
		var quiz_element_containers_container=sample_quiz.document.createElement("div");
		quiz_element_containers_container.className="quiz_element_containers_container";
		body.appendChild(quiz_element_containers_container);
		var local_question_list=[];
		var input_answer_field_list=[];
		var answer_feedback_list=[];
		for (var i=0; i<quiz_element_list.length; i++) {
			var local_question=quiz_element_list[i].getQuestionlike();
			if (local_question.getQuestionlikeType()==="question_family") {
				local_question=local_question.generateChildQuestion();
			}
			local_question_list.push(local_question);
			var quiz_element_container=sample_quiz.document.createElement("div");
			quiz_element_container.className="quiz_element_container";
			quiz_element_containers_container.appendChild(quiz_element_container);
			var instructions_text=sample_quiz.document.createElement("h3");
			instructions_text.className="instructions_text";
			instructions_text.appendChild(sample_quiz.document.createTextNode(local_question.getInstructionText()));
			quiz_element_container.appendChild(instructions_text);
			var question_text=sample_quiz.document.createElement("h4");
			question_text.className="question_text";
			question_text.appendChild(sample_quiz.document.createTextNode(local_question.getQuestionText()));
			quiz_element_container.appendChild(question_text);
			var input_answer_container=sample_quiz.document.createElement("div");
			input_answer_container.className="input_answer_container";
			quiz_element_container.appendChild(input_answer_container);
			var input_answer_field=sample_quiz.document.createElement("textarea");
			input_answer_field.className="input_answer_field";
			input_answer_field.placeholder="Type answer here";
			input_answer_container.appendChild(input_answer_field);
			input_answer_field_list.push(input_answer_field);
			var answer_feedback=sample_quiz.document.createElement("div");
			answer_feedback.className="answer_feedback";
			quiz_element_container.appendChild(answer_feedback);
			answer_feedback_list.push(answer_feedback);
			var correct=sample_quiz.document.createElement("img");
			correct.className="correct";
			correct.src="http://images.all-free-download.com/images/graphiclarge/check_mark_clip_art_11058.jpg";
			answer_feedback.appendChild(correct);
			var incorrect=sample_quiz.document.createElement("img");
			incorrect.className="incorrect";
			incorrect.src="http://renovahandcare.com/wp-content/uploads/2013/07/x-mark1.png";
			answer_feedback.appendChild(incorrect);
			var input_answer_button=sample_quiz.document.createElement("button");
			input_answer_button.className="input_answer_button";
			input_answer_button.id=i+1;
			input_answer_button.onclick=function() {
				if(local_question_list[this.id-1].checkAnswer(input_answer_field_list[this.id-1].value)===true) {
					answer_feedback_list[this.id-1].getElementsByClassName("incorrect")[0].style.display="none";
					answer_feedback_list[this.id-1].getElementsByClassName("correct")[0].style.display="inline-block";
				}
				else {
					answer_feedback_list[this.id-1].getElementsByClassName("correct")[0].style.display="none";
					answer_feedback_list[this.id-1].getElementsByClassName("incorrect")[0].style.display="inline-block";
				}
			};
			input_answer_button.appendChild(document.createTextNode("Submit"));
			quiz_element_container.appendChild(input_answer_button);
		}
		console.log("got to bottom of generate sample quiz function");
	};
	
	
	
	//getters for fields and methods
	this.getQuizElementList=function() {
		return quiz_element_list;
	};
	this.getQuizElement=function(quiz_element_id) {
		return quiz_element_list[quiz_element_id-1];
	};
	this.makePageLiQuizElementIdHTML=function(quiz_element_id) {
		makePageLiQuizElementIdHTML(quiz_element_id);
	};
	this.makePageLiQuesionlikeHTML=function(quiz_element_id) {
		makePageLiQuesionlikeHTML(quiz_element_id);
	};
	this.removeOnclickFeatures=function() {
		removeOnclickFeatures();
	};
};




var database1=new database();
var page1=new page();
new random_element("a",[1,1,2,3,5,8,13,21,34,55]);
new random_element("b",util.range(-10,10,1));
new question("arithmetic", "Please evaulate the following expression:", "93-7*8");
new quiz_element(new question("arithmetic","Please Evaluate the following expression:", "2+4"));
new question_family("arithmetic", "Please Evaluate the following expression:", "2*(<RRR>1</RRR>+<RRR>1</RRR>)");
new quiz_element(new question_family("arithmetic", "Please Evaluate the following expression:", "2+<RRR>1</RRR>"));
console.log("got to end of js doc");





