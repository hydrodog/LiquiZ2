//choices is the global object variable where reusable lists are stored
var choices = {};
//tabIndex is so that we can bounce from question to question using the tab button. tabIndex is basically a counter so that we can set the next index.
var tabIndex = 1;

//This is needed to store the show/hide lists until the end so we can hide everything!
//This is for sections that need to be hidden unless certain choices are made.
var showHideList=[];

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
  return buttonWithLabelAndOnClick("Add Choice",buttonAddChoice);
}

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
  //console.log(childs);
  if(childs.length>0)
  $(childs[childs.length-1]).remove();
}

/*
This function returns a button that is used to remove
choices from the drop down questions
*/
removechoicesbutton = function(){
  return buttonWithLabelAndOnClick("Remove Choice",buttonRemoveChoice);
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
var clone = function (obj,i){
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
  return temp;
};

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

function Q(questionHTML,question){
  
  var container = document.createElement("DIV");
  $(container).append(questionText(questionHTML));
  
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
    $(textarea).attr("placeholder",placeholder||"Your Answer Here...");
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
function showHideClassChangeCall(event){
      if(event.data.showHide[parseInt($(this).data("index"))].length > 0)
        $("."+event.data.showHide[parseInt($(this).data("index"))]).hide();
      $("."+event.data.showHide[this.selectedIndex]).show();
      $(this).data("index",""+this.selectedIndex);
}

/*
this is called to set up show/ hide list capabilities
*/
function showHideClass(question,showHide){
  $(question).data("index","0");
  if(showHide){
    showHideList.push(showHide);
    $(question).change({showHide:showHide},showHideClassChangeCall);
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
  if(typeof answerList == 'string'){
    answerList = choices[answerList];
  }
  if(typeof showHide == 'string'){
    showHide = choices[showHide];
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
    if(answerList[i].url){
      answerList[i]=answerList[i].url;
      if(answerList[i].length>0){
        $(option).html((i)+"<br/><img src='"+answerList[i]+"' />");
      }
    }else{
      if(answerList[i].length>0){
        $(option).text(answerList[i]);
      }
    }
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
series=function(args){
  var questionHTML = object.qHTML,
      eachQuestionText = object.qText;
  var questionList = [];
  for(var i = 0; i < 10; i++){
    questionList.push(questionsFromText(eachQuestionText,i));
  }
  
  var container = Q(questionHTML,
                    questionSet('series',questionList));
  
  return container;
  
};

/*
returns a number fillin question
*/
number=function(object){
  var questionHTML = object.qHTML,
      cols = object.cols,
      placeholder = object.pHold;
  var container = Q(questionHTML,
                    textArea(1,cols,placeholder||"...","number"));
  
  return container;
  
};


/*
 Equation question where randomized values are sent to change
 question every time
*/
equation=function (quest){
  var container = Q(quest.qHTML,
                    textArea(1,quest.cols,quest.pHold||"...","equation"));
  return container;
  
};





/*
returns a new multiquestion object
*/
multiquestion=function(tempObject){
  var object = {qHTML:"",qMakeArry:[],qArry:[]};
  merge(object,tempObject);
  var questionHTML = object.qHTML,
      questionMakeArray = object.qMakeArry,
      questionArray = object.qArry;
  //generate entire Object div
  var container = document.createElement("DIV");
  //gen question text
  $(container).append(questionText(questionHTML));
  //gen textarea
  $(container).addClass('inlineParent');
  $(container).addClass('multiquestion');
  
  //if we have any questions in object format, we make them into divs.
    for(var i = 0; i < questionMakeArray.length; i++){
        questionArray.push(question(questionMakeArray[i]));
    }
  
  
  //adds question to multiquestion (to be added to the quiz)
  for(var i = 0; i < questionArray.length; i++){
    $(container).append(questionArray[i]);
    
    /*
    To find the 'question' of each 'container' div,
    first check for div, all questions are inside of divs (html is a span)
    then child at index 1 (index 0 is question text)
    this may have to be redone later.
    
    */
    
    if($(questionArray[i]).is('div')){
      $(questionArray[i]).children().each(function(){
        if($(this).index()==1){
          $(this).addClass("question");
        }
      });
    }
    $(questionArray[i]).addClass('insidemulti');
    
  }
  
  
  //make sure we can read the answer later (for recursion if desired)
  return container;
  
};

/*
returns a new html span to be inserted wherever a question could
*/
html=function(object){
  var objectHTML = object.HTML;
  //generate entire Object span
  var container = document.createElement("SPAN");
  //gen question text
  $(container).html(objectHTML);
  $(container).addClass("nonquestion");
  
  
  //for multiquestions
  return container;
  
};

/*
returns a 
code question
*/
code=function(object){
  var questionHTML = object.qHTML,
      rows = object.rows || object.rowsE,//rowsEditor
      cols = object.cols || object.colsE,//colsEditor
      placeholder = object.pHold || object.pHoldE,//pHoldEditor
      rows2 = object.rows2 || object.rowsC,//rowsConsole
      cols2 = object.cols2 || object.rowsC,//colsConsole
      placeholder2 = object.pHold2 || object.pHoldC;//pHoldConsole
  
  //generate entire Object div
  var container = Q(questionHTML,
                    textArea(rows||20,cols||60,placeholder||"Your Code Here...","code"),
                    textArea(rows2||20,cols2||30,placeholder2||"Server Response","code nonquestion"));
  
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
  
  return container;   
  
  
  
};

/*
returns an essay question
*/
essay=function(object){
  var questionHTML = object.qHTML,
      rows = object.rows,
      cols = object.cols,
      placeholder = object.pHold;
  
  var container = Q(questionHTML,
                    textArea(rows,cols,placeholder||"Your Essay Here...","essay"));
  
  return container;   
  
};

/*
returns a dropdown question
*/
dropdown=function(object){
  var questionHTML = object.qHTML,
      answerList = object.ansrL,
      placeholder = object.pHold,
      showHide = object.hideL;
  //generate entire Object div
  var container = Q(questionHTML,
                    dropDown(placeholder,answerList,showHide,false));
  
  
  return container;
};

/*
returns a dropdown with multiple selection 
*/
dropdownmultiple=function(object){
  var questionHTML = object.qHTML,
      answerList = object.ansrL,
      placeholder = object.pHold,
      showHide = object.hideL;
  //generate entire Object div
  var container = Q(questionHTML,
                    dropDown(placeholder,answerList,showHide,true));
  
  
  return container;
  
};




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
returns quesiton span if img, returns
<span><img /></span>
else fills span with html from 'text'

*/
function questionText(text){
  if(text){
    var questionTextContainer;
    if(typeof text == 'string'){
      questionTextContainer = document.createElement("PRE");
      $(questionTextContainer).html(text);
    }else if(text.url){
      questionTextContainer = document.createElement("PRE");
      $(questionTextContainer).html("<img src='"+text.url+"' />");
    }else if(text.fromText){
      questionTextContainer = questionsFromText(text.fromText,text.index,"PRE");
    }
    $(questionTextContainer).addClass("qHTML");
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
  //console.log(onThis[rename]);
}


/*
This sends a generated question to the new tab/ window
*/
function sendQuestion(obj){
  var questionParams = {};
  var i = 1;
  while(obj["choices:"+i]){
    if(i == 1){
      questionParams.ansrL = [""];
      questionParams.correctL = ["Incorrect"];
    }
    questionParams.ansrL.push(obj["choices:"+i]);
    questionParams.correctL.push(obj["correct:"+i]);
    
    i++;
  }
  console.log(obj["placeholderText"]);
  paramSet (obj["questionHTML"],questionParams,"qHTML");
  paramSet (obj["placeholderText"],questionParams,"pHold");
  paramSet (typeFromChoice[obj["questionType"]],questionParams,"type");
  paramSet (obj["baseCode"]?new solidText(obj["baseCode"]):null,questionParams,"pHold");
  
  for(var key in questionParams){
   // console.log(key+":"+questionParams[key]);
  }
  for(var key in obj){
    //console.log(key+":"+obj[key]);
  }
  var q = question(questionParams);
  var qParent = document.createElement("DIV");
//  var qDisabler = document.createElement("DIV");
  $(qParent).append(q);
  //$(qDisabler).addClass("qDisabler");
  //$(qParent).addClass("qDisablerParent");
  //$(qDisabler).html("&nbsp;");
  //$(qParent).append(qDisabler);
  console.log(q);
  console.log($fakeTest);
  $($fakeTest).append( qParent);
  $(q).addClass('Q');
  
  $(q).find('.chosen-select').chosen({});
  //$().parent().before($submit);
  $($submit).before(qParent);

}
/*
  Add a new choice and is called by
  the addchoicebutton() object on click
*/
function buttonAddChoice (e){
 // console.log();
  var len = ($(e.target).parent().find(".question").length)/2-1;
  var ques = question({type:'multiquestion',qHTML:'',qMakeArry:[
      {type:'essay',rows:3,cols:30,pHold:'Your text here...',qID:"choices:"+len},
      {type:'dropdown',qHTML:'',ansrL:choices['incorrect'],qID:"correct:"+len}
    ]});
 // $(ques).addClass('Q');
  console.log($(ques).find('.drop'));
  $(e.target).parent().append(ques  );
    $(ques).find('.chosen-select').chosen({});
    $(e.target).parent().find(".nonquestion").last().before(ques);

}

/*
  Add a named button with a given css style
*/
function button (text, css) {
   var b = document.createElement("BUTTON");
    $(b).attr("value", text);
    $(b).addClass(css);
   return b;
}

/*
  Create standard buttons: Edit, Delete, Copy
  These are the same in many contexts to effect "least surprise"
*/
function editBar (css){
   var d = document.createElement("DIV");
    $(d).addClass(css);
    $(d).append(button("", "editbut but"));
    $(d).append(button("", "delbut but"));
    $(d).append(button("", "copybut but"));
console.log(d);
   return d;
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
  if(object.qID){
    $(quest).attr("id",object.qID);
      //  console.log($(quest).attr("id"));
  }
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
merge function to merge objects
*/

var merge = function (obj,objM){
  for(var key in objM) {
    obj[key]= objM[key];
  }
};
/*
sets up a new quiz choices list
TODO: add submit button to the end of each quiz
*/
function quiz(object){
  var questions = object.qList;
  var options={
    timed:false,
    submit:"SUBMIT"
  };
  merge(options,object.opts);
  var timeDiv;
  var quizContainer = document.createElement("DIV");
  if(options.timed){
    timeDiv = document.createElement("DIV");
  }
  
  var SUBMIT = document.createElement("BUTTON");
  $(SUBMIT).text(options.submit);
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

  $(SUBMIT).on("click",function(){
    SUBMIT_ONE_QUIZ(quizContainer);
  });
  
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
  
  //will be removed on TODO completion
}

