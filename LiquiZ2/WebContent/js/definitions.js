//TODO List:
/*
blankQuiz() : Radio and checkboxes.
quiz() : fair timer starting.
code() : interact with java server to run code.
setTabIndex() : insert at tabindex
*/

//choices is the global object variable where reusable lists are stored
var choices = {};
//tabIndex is so that we can bounce from question to question using the tab button. tabIndex is basically a counter so that we can set the next index.
var tabIndex = 1;

//This is needed to store the show/hide lists until the end so we can hide everything!
//This is for sections that need to be hidden unless certain choices are made.
var showHideList=[];

//JSON Object Storage for the Quiz Creator
var questionJSONs = [];
//when we want to edit or delete a question,
//we have to make sure that we don't edit
//a quesiton that stringifies in a similar fashion.
var questionJSONsUIDs = [], questionJSONsUIDsCounter=0;
//This is in case we want to edit a question, we have to know its index
var questionEditingIndex = -1;//-1 = no question

//this is just here for reference!! No effect yet!
var opts = {
  timed : false,
  showAnswers: false,
  scored: true,
  shuffle: false,
  allowMultipleAttempts: true,
  scoring: "highest",
  firstRepeatPenalty: 10,
  repeatPenalty: 0,
  showResponsesAfterEachAttempt: true,
  showResponsesAfterFinalAttempt: true,
  showCorrectAnswers: true,
  showCorrectAnswersStartingAt: "datestamp",
  hideCorrectAnswersStartingAt: "datestamp",
  displayAllQuestions: true
};


/*
the actual setting of the tab index needs updating, and this
is the beginning of that method. The problem is if you need
to set a tab index and higher indexes are already set, you
must run through $('*').each(function(){}); and reset tab
indexes to their value + 1 only if they are higher than the
value you wish to set.
*/
function setTabIndex(ques,index){
  //TODO: make sure we can insert something at a tabindex (run through with a $().each() and update)
  if(!index)
      index = tabIndex;
  $(ques).attr("tabindex",""+tabIndex);
  tabIndex++;
}

/*
This function returns a button that is used to add
more choices to the drop down questions
*/
addchoicesbutton = function(){
  var but = buttonWithLabelAndOnClick("Add Choice",buttonAddChoice);
  $(but).addClass('addChoice');
  return but;}

/*
generic make a button with a onclick
*/
buttonWithLabelAndOnClick = function(label,onclick){
  var button = document.createElement("BUTTON");
  $(button).text(label);
  $(button).on("click",onclick);
  setTabIndex(button);
  return button;
}

/*
This function removes choices and is called on click of
the removechoicebutton() object
*/
function buttonRemoveChoice (e){
  var childs = $(e.target).parent().find('.multiquestion');
  if(childs.length>0)
  $(childs[childs.length-1]).remove();
}

/*
This function returns a button that is used to remove
choices from the drop down questions
*/
removechoicesbutton = function(){
  var but = buttonWithLabelAndOnClick("Remove Choice",buttonRemoveChoice);
  $(but).addClass('removeChoice');
  return but;
}

/*
this was for the infinite questions which should 
be done later and returns a question element along
with any children elements needed
*/
var construct = function (obj,i){
  var temp = {};
  
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(obj[key].change_me){
        temp[key] = construct(obj[key],i);
      }else{
        temp[key] = clone(obj[key],i);
      }
    }
  }
  return question(temp);
};

/*
This purely clones an object, but does work with
the construct function
*/
function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = [];// changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}

/*
FROMTEXT marks an string for mutation into an
infinite object (those should be done later)
*/
function mutable(text,index){
  this.change_me=true;
  this.mutable=text;
  this.index=index;
}

/*
This is the infinite question generator
*/
function questionInf(object){
  var qClass = object.class;
  var questions = object.qList;
  var container = document.createElement("DIV");
  
  for (var i = 0; i < questions.length; i++){
    $(container).append(questions[i]);
    //for CSS and for sending quiz to the server
    if($(questions[i]).is('div')){
      $(questions[i]).children().each(function(){
        if($(this).index()==1){
          $(this).addClass("question");
        }
      });
    }
  }
  $(container).addClass(qClass); 
  
  
  return container;
}

/*
This is like 'Q', but a multiquestion variant,
with the intent to take a class to
be added
*/
function questionSet(object){
  var qClass = object.class,
      questions = object.qList;
  var container = document.createElement("DIV");
  
  for (var i = 0; i < questions.length; i++){
    $(container).append(questions[i]);
    //for CSS and for sending quiz to the server
    if($(questions[i]).is('div')){
      $(questions[i]).children().each(function(){
        if($(this).index()==1){
          $(this).addClass("question");
        }
      });
    }
  }
  $(container).addClass(qClass); 
  
  
  return container;
}

/*
question factory 'Q'
Takes html (or url img()) and a html element
puts them into a div like so:

<div>
<span>html</span>
question elem here
</div>

returns the containing div to be added to a quiz or multiquestion

*/

function Q(params,question){
  
  var container = document.createElement("DIV");
  $(container).append(questionText(params.HTML));
  questionSuper(container,params);
  
  for (var i = 1; i < arguments.length; i++){
    $(container).append(arguments[i]);
    //for CSS and for sending quiz to the server
    $(arguments[i]).addClass("question");
  }
  
  
  
  return container;
}
/*
Makes a new textarea and returns it
rows: rows="" attribute
cols: cols="" attribute
placeholder (often preset by sender function): placeholder text
hasclass - useful for adding the classes for the different types of textareas:
number passes hasclass=number
essay and code do the same

returns html element textarea
*/
function textArea(rows,cols,placeholder,hasclass){
  //gen textarea
  var textarea = document.createElement("TEXTAREA");
  //set sizing
  $(textarea).attr("rows",""+rows);
  
  
  
  
  
  $(textarea).attr("cols",""+cols);
  
  //optional placeholder or pre assigned value
  //if placeholder has placevalue, make the text editable
  if(placeholder.placevalue){
    $(textarea).val(placeholder.placevalue);
  }else{
    $(textarea).attr("placeholder",placeholder||"");
  }
  
  if(hasclass){
    //for CSS
    $(textarea).addClass(hasclass);
    
  }
  setTabIndex(textarea);
  
  
  return textarea;
}
/*
This is called on the value change of a radio or drop down
when that object must show or hide stuff
*/
function showHideClassChangeCall(showHide){  
  if(showHide[parseInt($(this).data("index"))])
      if(showHide[parseInt($(this).data("index"))].length > 0)
        $("."+showHide[parseInt($(this).data("index"))]).hide();
      $("."+showHide[this.selectedIndex]).show();
      $(this).data("index",""+this.selectedIndex);
}

/*
this is called to set up show/ hide list capabilities
*/
function showHideClass(question,showHide){
  $(question).data("index","0");
  if(showHide){
    showHideList.push(showHide);
    question.onchange=function(){
      showHideClassChangeCall.call(question,showHide);
    };
  }
}


/*
dropDown
placeholder - does not accept placeholder.placevalue
answerlist - list of possible options
isMultiple - differentiates between dropdown and dropdownmultiple

returns the created select (drop down) html element

*/
function  dropDown(placeholder,answerList,showHide,isMultiple){
  if(!answerList) return;
  if(typeof answerList == 'string'){
    answerList = choices[answerList];
  }
  answerList=clone(answerList);
  if(typeof showHide == 'string'){
    showHide = choices[showHide];
  }
  var isSolid = typeof answerList.placevalue != "undefined"?true:false;
  if(answerList.placevalue){
    answerList = answerList.placevalue;
  }else{
    answerList.unshift("");
  }
  var question = document.createElement("SELECT");
  $(question).addClass("question");

  //placeholder
  $(question).attr("data-placeholder",placeholder||"Pick an Answer...");
  //stuff to make chosen recoginze this
  $(question).addClass("chosen-select");
  $(question).addClass("drop");
  if(isMultiple){
    //for CSS  
    $(question).addClass("multidrop");
    //for chosen js
    $(question).attr("multiple","");
  }else{
    //for CSS
    $(question).addClass("singledrop");
    
  }
  
  
  //adds the possible answers as 'options' in a 'select' element
  for(var i = 0; i < answerList.length; i++){
    
    var option = document.createElement("OPTION");
    if(i>0 || isSolid)
      $(option).html(textObject(answerList[i]) +"&nbsp;");
    $(option).attr("value",answerList[i]);
    $(question).append(option);   
    
  }
  
  showHideClass(question,showHide);
  
  setTabIndex(question);

  return question;
}

/*Type defs
number - number fillin
multiquestion - constructor for questions
html - html in a span
code - code textarea
essay - essay textarea
dropdown - select list single response
dropdownmultiple - select list multiple response
*/


/*
returns a series question set
*/
series=function(question){

  var questionList = [];
  for(var i = 0; i < 10; i++){
    questionList.push(questionsFromText(question.qText,i));
  }
  
return Q(question,
         questionSet('series',questionList));  
};

/*
returns a number fillin question
*/
number=function(question){

  return Q(question,
           textArea(1,question.cols,question.pHold||"","number"));;
  
};

/*
returns a new multiquestion object
*/
multiquestion=function(quest){
  var defaults = {HTML:"",MakeArry:[],Arry:[]};
  quest = merge(defaults,quest);
  //generate entire Object div
  var container = document.createElement("DIV");
  //gen question text
  $(container).append(questionText(quest.HTML));
  //gen textarea
  $(container).addClass('inlineParent');
  $(container).addClass('multiquestion');
  
  //if we have any questions in object format, we make them into divs.
    for(var i = 0; i < quest.MakeArry.length; i++){
        quest.Arry.push(question(quest.MakeArry[i]));
    }
  
  
  //adds question to multiquestion (to be added to the quiz)
  for(var i = 0; i < quest.Arry.length; i++){
    $(container).append(quest.Arry[i]);
    
    /*
    To find the 'question' of each 'container' div,
    first check for div, all questions are inside of divs (html is a span)
    then child at index 1 (index 0 is question text)
    this may have to be redone later.
    
    */
    
    if($(quest.Arry[i]).is('div')){
      $(quest.Arry[i]).children().each(function(){
        if($(this).index()==1){
          $(this).addClass("question");
        }
      });
    }
    $(quest.Arry[i]).addClass('insidemulti');
    
  }
  
      questionSuper(container,quest);

  //make sure we can read the answer later (for recursion if desired)
  return container;
  
};

/*
returns a new html span to be inserted wherever a question could
*/
html=function(question){
  //generate entire Object span
  var container = document.createElement("SPAN");
  //gen question text
  $(container).html( question.HTML);
  $(container).addClass("nonquestion");
    questionSuper(container,question);

  
  //for multiquestions
  return container;
  
};

/*
returns a 
code question
*/
code=function(question){

  
  //generate entire Object div
  var container = Q(question,
                    textArea(question.rows || question.rowsE||20,question.cols || question.colsE||60,question.pHold || question.pHoldE||"","code"),
                    textArea(question.rows2 || question.rowsC||20,question.cols2 || question.rowsC||30,question.pHold2 || question.pHoldC||"Server Response","code nonquestion"));
  
  /*
  This only applies to code containers
  This allows us to stop run and comiple java code
  TODO: link buttons to function to send code to server
  */
  var stop = document.createElement("BUTTON");
  $(stop).text("stop");
  $(stop).addClass("button stop");
  $(container).append(stop);
  
  var run = document.createElement("BUTTON");
  $(run).text("run");
  $(run).addClass("button run");
  $(container).append(run);
  
  var compile = document.createElement("BUTTON");
  $(compile).text("compile");
  $(compile).addClass("button compile");
  $(container).append(compile);
      questionSuper(container,question);

  return container;   
  
  
  
};

/*
returns an essay question
*/
essay=function(question){
  return Q(question,
           textArea(question.rows,question.cols,question.pHold||"","essay"));;   
};

/*
returns a dropdown question
*/
dropdown=function(question){
  return Q(question,
           dropDown(question.pHold,question.ansrL,question.hideL,false));
};

/*
returns a dropdown with multiple selection 
*/
dropdownmultiple=function(question){

  return Q(question,
           dropDown(question.pHold,question.ansrL,question.hideL,true));;
  
};

/*
returns a radio button question
*/
radiocheckbox=function(quest) {
    var placeholder = quest.pHold;
    var answerList = quest.ansrL;
    answerList=answerList.placevalue?answerList.placevalue:answerList;
    var showHide = quest.hideL;
    var isMultiple = quest.isCheck;
    if(typeof answerList == 'string'){
	answerList = choices[answerList];
    }
    if(typeof showHide == 'string'){
	showHide = choices[showHide];
    }
    var question = document.createElement("FORM");
    if(isMultiple){
	//for CSS  
	$(question).addClass("checkbox");
    }else{
	//for CSS
	$(question).addClass("radio");
    }
  
    
    //adds the possible answers as 'input' inside the 'form' element
    for(var i = 0; i < answerList.length; i++){
    
    var input = document.createElement("INPUT");

	$(input).attr("name","sel");
	$(input).attr("id","sel"+i);
      $(input).attr("type",isMultiple?"checkbox":"radio");
	$(input).attr("value",answerList[i]);
	$(question).append(input);   
      
    var label = document.createElement("LABEL");
    $(label).append(textObject(answerList[i]));
    $(label).append("<br>");
    $(label).attr("for","sel"+i);
    $(question).append(label);
    
  }
  showHideClass(showHide);
    setTabIndex(question);
    return Q(quest,
                    question);
  //return container;
};

/*
returns a radio elem
*/
radio = function(quest) {
    quest.isCheck = false;
    return radiocheckbox(quest);
}

/*
returns a checkbox elem
*/
checkbox = function(quest) {
    quest.isCheck = true;
    return radiocheckbox(quest);
}



/*
Eventually I plan to use json and each array in json becomes an object so
[object,[object2, ...],[object3,[object4,...]...]...]
would make something like
<object>
<object2>
...
</object2>
<object3>
<object4>
...
</object4>
...
</object3>
...
</object>
*/
choices.nums=['0','1','2','3','4','5','6','7','8','9'];
choices.nums.repeats=true;

/*
Generate text with the format of text and then [x]
*/
function objectFromText(object,index){
  if(object[0]=='list'){
    return textIndex(object[1],index);
  }else{
    var type = object.shift();
    for(var i = 0; i < object.length; i++){
      object[i] = unescape(object[i]);
      
    }
    return question(unescape(type),object);
  }
}

function questionsFromText(text,index,QType){
  var container = document.createElement(QType||"DIV");
  //gen question text
  if(!index){
    index=0;
  }
  if(text.indexOf(']')!=-1){
    var textArray = text.split(']');
    for(var i = 0; i < textArray.length; i++){
      if(textArray[i].indexOf('[')!=-1){
        var innerArray = textArray[i].split('[');
        if(innerArray[1].indexOf(':')!=-1){
          var object = innerArray[1].split(':');
          $(container).append(innerArray[0]);
          $(container).append(objectFromText(object,index));
          
        }else{
          $(container).append(innerArray);
          
        } 
      }else{
        $(container).append(textArray[i]);
        
      }
    }
  }else{
    $(container).append(text);
  }
  return $(container);
}



/*
Returns the value at index for a standard- for example
the standard of:
'0','1' would return the binary representation of a number
*/
function textIndex (strd,index) {
  if(choices[strd].length>index){
    return choices[strd][index];
  }else{
    //115
    // 115 > 10
    
    if(choices[strd].repeats){
      var returnStr = "";
      while(index>=choices[strd].length){
        returnStr = choices[strd][index%choices[strd].length] + returnStr;
        index -= index%choices[strd].length;
        index /= choices[strd].length;
      }
      returnStr = choices[strd][index] + returnStr;
      return returnStr;
    }else{
      return choices[strd][index%choices[strd].length];
    }
  }
}

/*attempting to make fromText into a constructor method.

var consTop={},
consObj={};

function constructorTop(object){

}
function constructorObj(object){

}
*/
/*
makes sure that images are displayed properly
*/
function textObject(text){
if(text.url){
	    text=text.url;
	    if(text.length>0){
		    return "<img src='"+text+"' />";
	    }
	}else{
	    if(text.length>0){
            return text;
        }
	}
}

/*
returns quesiton span if img, returns
<span><img /></span>
else fills span with html from 'text'

*/
function questionText(text){
  if(text){
    var questionTextContainer;

      questionTextContainer = document.createElement("PRE");
      $(questionTextContainer).html(textObject(text));

    $(questionTextContainer).addClass("HTML");
    $(questionTextContainer).addClass("nonquestion");
    
    return questionTextContainer;
  }else{
    return "";
  }
}

/*question
fills in Type[]() function properly

*/
typeFromChoice={'Drop Down':'dropdown', 'Multidrop-down':'dropdownmultiple', 'Number Fillin':'number', 'Essay':'essay', 'Code':'code'};
function paramSet (set,onThis,rename){
  if(set)
    onThis[rename] = set;
}

/*
sets up everything for question editing
*/
function editQuestion(stringObjID,quiz){
 $(quiz).find("#saveAsNewQuestion").show();
  questionEditingIndex=stringObjID;
   var JSONobj = JSON.parse(questionJSONs[questionJSONsUIDs.indexOf(stringObjID)]);
  blankQuiz(quiz);
  var highnum = 3;
  for(var key in JSONobj){
    if(key.indexOf("choices-")==0){
      var num = parseInt(key.replace("choices-",""));
      if(num>highnum)
        highnum=num;
    }
  }
  makeChoiceCount(highnum,quiz);

  for(var key in JSONobj){
    $(quiz).find('#'+key).find(".question").each(function(){
      if(JSONobj[key])
        $(this).val(JSONobj[key]);
      if($(this).is("select")){
        $(this).trigger("chosen:updated.chosen");
        $(this).trigger("change");
      }
    });
    
  }
}

/*
duplicates a question held in JSON storage
*/
function duplicateQuestion(stringObjID,quiz){
   var JSONobj = JSON.parse(questionJSONs[questionJSONsUIDs.indexOf(stringObjID)]);
   sendQuestion(JSONobj,quiz);
}
/*
This sends a generated question to the new tab/ window
*/
function sendQuestion(obj,quiz,overrideID){
  if((overrideID || overrideID === 0) && questionJSONsUIDs.indexOf(overrideID)==-1)
    overrideID=false;
  
  var stringObjID=(overrideID||overrideID===0)?overrideID:questionJSONsUIDsCounter++;
  if(!overrideID && overrideID !== 0){
  questionJSONs.push(JSON.stringify(obj));
  questionJSONsUIDs.push(stringObjID);
  }else{
    questionJSONs.splice(questionJSONsUIDs.indexOf(stringObjID),1,JSON.stringify(obj));
  }
  var questionParams = {};
  var i = 1;
  for(var key in obj){
    if(key.indexOf("choices-")==0){
    if(i == 1){
      questionParams.ansrL = [];
      questionParams.correctL = [];
    }
    questionParams.ansrL.push(obj[key]);
    var correct = obj[key].replace("choices-","correct-");
    questionParams.correctL.push(correct);
    
    i++;
    }
  }
  paramSet (obj["questionHTML"],questionParams,"HTML");
  paramSet (obj["placeholderText"],questionParams,"pHold");
  paramSet (typeFromChoice[obj["questionType"]],questionParams,"type");
  paramSet (obj["baseCode"]?new solidText(obj["baseCode"]):null,questionParams,"pHold");
  
  var q = question(questionParams);
  var qParent = document.createElement("DIV");
  var deleteBtn = buttonWithLabelAndOnClick("",function(){
      questionJSONs.splice(questionJSONsUIDs.indexOf(stringObjID),1);
      questionJSONsUIDs.splice(questionJSONsUIDs.indexOf(stringObjID),1);
      
      $(qParent).remove();
    
  });
  $(deleteBtn).addClass("but delbut");
  var editBtn = buttonWithLabelAndOnClick("",function(){
      editQuestion(stringObjID,quiz);
    
  });
  $(editBtn).addClass("but editbut");
  var copyBtn = buttonWithLabelAndOnClick("",function(){
      duplicateQuestion(stringObjID,quiz);
    
  });
  $(copyBtn).addClass("but copybut");
  
  $(q).append(copyBtn);
  $(q).append(editBtn);
  $(q).append(deleteBtn);
//  var qDisabler = document.createElement("DIV");
  $(qParent).append(q);
  //$(qDisabler).addClass("qDisabler");
  //$(qParent).addClass("qDisablerParent");
  //$(qDisabler).html("&nbsp;");
  //$(qParent).append(qDisabler);

  if(!overrideID && overrideID !== 0)
    $($fakeTest).append( qParent);
  else
    $($fakeTest).find("#replacement-index-"+stringObjID).replaceWith(qParent);
  
  $(q).addClass('Q');
  
  $(q).find('.chosen-select').chosen({});
  $(qParent).attr('id',"replacement-index-"+stringObjID);

  //$().parent().before($submit);
    if(!overrideID && overrideID !== 0)
  $($submit).before(qParent);
  
}
/*
This adds a new choice and is called by
the addchoicebutton() object on click
*/
function buttonAddChoice (e,currentNumber){
  if(!currentNumber && currentNumber !== 0){
    currentNumber = 0;
    $(e.target).parent().find('*').each(function(){
    var id = $(this).attr('id');
    if(id && id.indexOf("choices-")==0)
      currentNumber++;
  });
  }
  var len = ($(e.target).parent().find(".question").length)/2-1;
  var ques = question({type:'multiquestion',HTML:'',MakeArry:[
      {type:'essay',rows:3,cols:30,pHold:'Your text here...',ID:"choices-"+len},
    {type:'dropdown',HTML:'',ansrL:choices[currentNumber?'incorrect':'correct'],ID:"correct-"+len}
    ]});
  var hiddenWorkaround = document.createElement("DIV");
  $(document.body).append(hiddenWorkaround);
     $(hiddenWorkaround).append(ques  );
    $(hiddenWorkaround).find('.chosen-select').chosen({});
    $(e.target).parent().append($(hiddenWorkaround).children());
    $(hiddenWorkaround).remove();
    $(e.target).parent().find(".nonquestion").last().before(ques);

}

function questionSuper(element,params){
  if(params.ID){
    $(element).attr("id",params.ID);
  }
}

/*
this returns a new question and is the object returning
method that one adds to a quiz
*/
function question(obj){
  
  var object = {};
  var type;//filled in here
  if(arguments.length == 1 && typeof obj == 'object'){
    object = obj;
    type = object.type;
  }else if(arguments.length == 2){
    object = arguments[1];
    type = arguments[0]||object.type;
  }
  var quest = this[type.toLowerCase()](object);
  
  return quest;
  
}


/*
makes text solid
*/
function solidText(placevalue){
  this.placevalue=placevalue;
}
/*
makes text into an img 
*/
function img(url){
  this.url=url;
}
/*
sets up a new standard choices list
*/
function standard(name,array){
  
  choices[name]=array;
  
  return choices[name];
  
}

/*
blanks the quiz, primarily used for Editor interface
*/
function blankQuiz(quiz){
  if($(quiz).attr("isEditor")=="true")
    makeChoiceCount(3,quiz);
  $(quiz).find('textarea').each(function(){
    $(this).val("");
  });
  $(quiz).find('select').each(function(){
    var firstVal = $(this).find('option:first').val(),
        thisVal = $(this).val();
    if(firstVal!=thisVal){
        $(this).val(firstVal?firstVal:false);
        $(this).trigger("chosen:updated.chosen");
        $(this).trigger("change");
    }
  });
  //TODO: Radio and checkboxes.
}

/*
returns time in hh:mm:ss
used for human readable display
*/
function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  
  return (hrs<10?"0"+hrs:hrs) + ':' + (mins<10?"0"+mins:mins) + ':' + (secs<10?"0"+secs:secs);// + '.' + ms;
}

/*
adds or removes choice options until quiz has desired amount
*/
function makeChoiceCount(targetNumber,quiz){
  if(targetNumber < 3) targetNumber = 3;
  var currentNumber = 0;
  $(quiz).find('*').each(function(){
    var id = $(this).attr('id');
    if(id && id.indexOf("choices-")==0)
      currentNumber++;
  });
  if(currentNumber < targetNumber){
    while(currentNumber!=targetNumber){
      buttonAddChoice({target:$(quiz).find('.addChoice')[0]},currentNumber);
      currentNumber++;
    }
  }else{
    while(currentNumber!=targetNumber){
      buttonRemoveChoice({target:$(quiz).find('.removeChoice')[0]},currentNumber);
      currentNumber--;
    }
  }
}

/*
sets up a new quiz with data recieved from the server
*/
function generateQuiz(textdata,quiz){

  var quizList = JSON.parse("["+textdata.replace(/\'/g,"\"")+"]");

  for(var key in quizList){
     sendQuestion(quizList[key],quiz);
  }
}
/*
merge function to merge objects
*/

var merge = function (obj,objM){
  for(var key in objM) {
    obj[key]= objM[key];
  }
  return obj;
};
/*
sets up a new quiz
*/
function quiz(object){
  var questions = object.qList;
  var options={
    timed:false,
    submit:"SUBMIT",
    isEditor:false
  };
  merge(options,object.opts);
  var timeDiv;
  var quizContainer = document.createElement("DIV");
  if(options.timed){
    timeDiv = document.createElement("DIV");
  }
  var saveAsNewQuestion;
  if(options.isEditor){
    saveAsNewQuestion = buttonWithLabelAndOnClick("Save as New Question",function(){
      $(saveAsNewQuestion).hide();
      questionEditingIndex = -1;
    SUBMIT_ONE_QUIZ(quizContainer);
    if(options.isEditor)
        blankQuiz(quizContainer);
    });
  }
  var SUBMIT = buttonWithLabelAndOnClick(options.submit,function(){
    if(saveAsNewQuestion)
      $(saveAsNewQuestion).hide();
    if(questionEditingIndex!=-1)
        SUBMIT_ONE_QUIZ(quizContainer,questionEditingIndex);
    else
        SUBMIT_ONE_QUIZ(quizContainer);
    if(options.isEditor)
        blankQuiz(quizContainer);
    questionEditingIndex = -1;
  });

  
  if(options.timed){
    $(timeDiv).text("Time Elapsed - 00:00:00");
    $(quizContainer).append(timeDiv);
  }
  $(quizContainer).addClass('quiz');
  for(var i = 0; i < questions.length; i++){
    $(questions[i]).addClass('Q');
    $(quizContainer).append(questions[i]);
  }
  
  $(quizContainer).append(SUBMIT);
  setTabIndex(SUBMIT);

  //on editor, send to server button
  if(options.isEditor){
    var serverSend = buttonWithLabelAndOnClick("Save Quiz",function(){
     alert("send to server:\n"+questionJSONs.join(",")); 
      
      //when sending data to the server, we must change " to ' to avoid &quot waste.
      //must also join array by ","
      $.ajax({
        type: "POST",
           url: "http://bluecode.altervista.org/bean/response.php",
        data: "quiz="+questionJSONs.join(",").replace(/\"/g,"'"),
        dataType: "text",
          success: function(data){prompt("returned",data);},
        failure: function(errMsg) {
            alert(errMsg);
        }});
    });

    
        $(saveAsNewQuestion).attr("id","saveAsNewQuestion");

    setTabIndex(saveAsNewQuestion);
    setTabIndex(serverSend);
    $(quizContainer).append("&nbsp;");
    $(quizContainer).append(saveAsNewQuestion);
    $(quizContainer).append("&nbsp;");
    $(quizContainer).append(serverSend);
    $(quizContainer).attr("isEditor","true");
          $(saveAsNewQuestion).hide();

  }
  
  
  document.body.appendChild(quizContainer);
  
  /*
  TODO, quiz starts hidden with a click to take quiz button.
  Then run the start function to make the quiz appear,
  and start the timer
  */
  if(options.timed){
    
    var start = function(){
      var startTime = (new Date()).getTime();
      setInterval(function(){
        var endTime = (new Date()).getTime();
        $(timeDiv).text("Time Elapsed - "+msToTime(endTime-startTime));
      },500);
    };
    start();
    
  }
  
  
}
