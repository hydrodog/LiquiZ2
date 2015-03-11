//TODO List:
/*
blankQuiz() : Radio and checkboxes.
quiz() : fair timer starting.
code() : interact with java server to run code.
setTabIndex() : insert at tabindex
key down event for radio & checkboxes to make sure they accept enter as an option
solidText() gets blanked on blank quiz fix, but make sure it supports images.
DRAGGING: make sure to scroll when elem is at the bottom or top of screen, also maybe add a index box to change without dragging.
ADD delete button for regexes


REGEX - there's a bug with the naming

Reformat for optimal server interaction

Get around &quot; nonsense

FYIs:
The following will make a quiz out of what we send to the server
quiz(JSON.parse(formatQuestionJSONsForExportAJAX())) 

*/

//choices is the global object variable where reusable lists are stored
var choices = {};
//tabIndex is so that we can bounce from question to question using the tab button. tabIndex is basically a counter so that we can set the next index.
var tabIndex = 1;

//Sel IDs collided, this fixes it
var selIDNoConflict = 0;

//this is for dragging, b/c we need global support
var dragBar = null;
var mousePosition = {x:-1,y:-1};
var offset = {x:-1,y:-1};

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
gets and sets any kind of element we have, just call ValueOf.get/set on it!
*/
var ValueOf={
  get:function(element){
    if(this[element.localName.toLowerCase()])
      return this[element.localName.toLowerCase()](element);
    else
      return $(element).val();
  },
  set:function(element,value){
    console.log(element);
if(this[element.localName.toLowerCase()])
      this[element.localName.toLowerCase()](element,value);
    else
      $(element).val(value);
  },
  textarea:function(element,value){
    if(arguments.length==1){
      return $(element).val();
    }else{
      if(value === false)
        value = "";
      $(element).val(value);
    }
  },
  select:function(element,value){
    if(arguments.length==1){
          return $(element).val();
    }else{
      if(value===false)
         value = $(element).find('option:first').val();
      if(!value)
        value = false;
      if(value != $(element).val()){
      $(element).val(value);
        $(element).trigger("chosen:updated.chosen");
        $(element).trigger("change");
      }
    }
  },
  form:function(element,value){
    var val;
    if($(element).is('.checkbox')){
      var checked = $(element).find("input[type='checkbox']"+(arguments.length==1?":checked":""));
      val = [];
           for(var i = 0; i < checked.length; i++){
             if(arguments.length==1){
             val.push($(checked[i]).val());
           }else{
             if(typeof value == "object"){
             if(value.indexOf($(checked[i]).val())!=-1){
                 checked[i].checked=true;
             }else{
                 checked[i].checked=false;
             }
             }else{
               if($(checked[i]).val()==value || typeof value == "boolean")
                 checked[i].checked=value?true:false;
             }
             }
               
           }
          return val.length > 0 ? val : null;

         }else{
           if(arguments.length==1){
           return $(element).find("input[type='radio']:checked").val();
           }else{
                   var inputs = $(element).find("input");
                for(var i = 0; i < inputs.length; i++){
                  if($(inputs[i]).val()==value){
                                     inputs[i].checked=true;
                  }else{
                                     inputs[i].checked=false;

                  }
           }
           }
         }
  },
  div:function(element,value){
    if($(element).is(".singular")){
      var editingArea = $(element).find("#singular-editing-area")[0];
      if(arguments.length==1){
      if($(editingArea).attr("textis")=="HTML"){
        return editingArea.textContent;
      }else{
        return editingArea.innerHTML;
      }
      }else{
        if(value===false){
          value="";
        }
        if($(editingArea).attr("textis")=="HTML"){
        editingArea.textContent=value;
      }else{
        editingArea.innerHTML=value;
      }
      }
    }else{
    return null;
    }
  }
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
button that saves the regex so that it can be used for this quiz only
*/
saveregexlocalbutton = function(){
  return buttonWithLabelAndOnClick("Save for this quiz",saveLocalRegex);
};

/*
button that saves the regex so that it can be used for all future quizzes
*/
saveregexglobalbutton = function(){
  return buttonWithLabelAndOnClick("Save to server",saveGlobalRegex);
};

/*
actually saves regex to quiz
*/
function saveLocalRegex(e){
  var regexFillin = $(e.target).parent().parent().find("#regexFillin").find('textarea');
  var regexName = $(e.target).parent().parent().find("#regexName").find('textarea');
  var regexPattern = $(e.target).parent().parent().find("#regexPattern").find('select');
  $(regexPattern).append(makeOption(0,true,[regexName.val()]))
    $(regexPattern).val(regexName.val());
  $(regexPattern).trigger("chosen:updated.chosen");
  $(regexPattern).trigger("change");
  saveRegexToServer(regexName.val(),regexFillin.val());
  
}

/*
NOTE NO SERVER CONNECTION, SO THE FOLLOWING IS A LIE!
BUT IT WILL SAVE TOLOCAL STORAGE
actually saves regex to server
*/
function saveGlobalRegex(e){
  saveLocalRegex(e);
  //saveRegexToServer($(e.target).parent().parent().find("#regexFillin").find('textarea').val());
}

/*
save regex to local storage
*/
function saveRegexToServer (name,pattern){
  pushThisToThatLS(name,"localRegexName");
  pushThisToThatLS(pattern,"localRegexPattern");
}

/*
pushes to a json array in local storage. Testing purposes mainly
*/
function pushThisToThatLS(pushThis, toThat){
  var localValue = localStorage.getItem(toThat);
  var currentPatterns =localValue?JSON.parse(localValue):[];
  //if(currentPatterns.indexOf(pushThis)==-1)
  currentPatterns.splice(0,0,pushThis);
  localStorage.setItem(toThat,JSON.stringify(currentPatterns));
}

/*
This function returns a button that is used to add
more choices to the drop down questions
*/
addchoicesbutton = function(){
  var but = buttonWithLabelAndOnClick("Add Choice",buttonAddChoice);
  $(but).addClass('addChoice');
  return but;
};

/*
generic make a button with a onclick
*/
buttonWithLabelAndOnClick = function(label,onclick){
  var button = document.createElement("BUTTON");
  $(button).text(label);
  $(button).on("click",onclick);
  setTabIndex(button);
  return button;
};

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
};

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
  var qClass = object.Class;
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
  var qClass = object.Class,
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
  if(showHide[parseInt($(this).data("index"))] && showHide[parseInt($(this).data("index"))].length > 0)
    $("."+showHide[parseInt($(this).data("index"))]).hide();
  if(showHide[this.selectedIndex] && showHide[this.selectedIndex].length>0)
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

*/
function makeOption(i,isSolid,answerList){
  var option = document.createElement("OPTION");
  if(i>0 || isSolid)
    $(option).html(textObject(answerList[i]) +"&nbsp;");
  $(option).attr("value",answerList[i]);
  return option;
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
    $(question).append(makeOption(i,isSolid,answerList));   
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
radio - single select
checkbox - multiselect
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
  var defaults = {HTML:"",makeL:[],qList:[]};
  quest = merge(defaults,quest);
  //generate entire Object div
  var container = document.createElement("DIV");
  //gen question text
  $(container).append(questionText(quest.HTML));
  //gen textarea
  $(container).addClass('inlineParent');
  $(container).addClass('multiquestion');
  
  //if we have any questions in object format, we make them into divs.
  for(var i = 0; i < quest.makeL.length; i++){
    quest.qList.push(question(quest.makeL[i]));
  }
  
  
  //adds question to multiquestion (to be added to the quiz)
  for(var i = 0; i < quest.qList.length; i++){
    $(container).append(quest.qList[i]);
    
    /*
    To find the 'question' of each 'container' div,
    first check for div, all questions are inside of divs (html is a span)
    then child at index 1 (index 0 is question text)
    this may have to be redone later.
    
    */
    
    if($(quest.qList[i]).is('div')){
      $(quest.qList[i]).children().each(function(){
        if($(this).index()==1){
          $(this).addClass("question");
        }
      });
    }
    $(quest.qList[i]).addClass('insidemulti');
    
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
           textArea(question.rows,question.cols,question.pHold||"","essay"));  
};

/*
returns a stgular textarea
*/
singular=function(question){
  
  var textEditor = Singular.create({width:question.width, height:question.height});
  questionSuper(textEditor,question);
return Q(question,
           textEditor);    
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

function checkToggleKeyDown(e){
  if(e.which == 13){
    $(this).prop("checked",!$(this).is(":checked"));
  }
}


/*
returns a radio button question
*/
radiocheckbox=function(quest) {
  var placeholder = quest.pHold;
  var answerList = quest.ansrL;
  answerList=answerList||[];
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
    $(input).attr("id","sel"+i+"no"+selIDNoConflict);
    $(input).attr("type",isMultiple?"checkbox":"radio");
    $(input).attr("value",answerList[i]);
    $(question).append(input);   
    
    var label = document.createElement("LABEL");
    $(label).append(textObject(answerList[i]));
    $(label).append("<br>");
    $(label).attr("for","sel"+i+"no"+selIDNoConflict);
    $(question).append(label);
    $(input).on("keydown",checkToggleKeyDown);
    $(input).on("focus",function(){  console.log("SDF");});
  }
  selIDNoConflict++;
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
};

/*
returns a checkbox elem
*/
checkbox = function(quest) {
  quest.isCheck = true;
  return radiocheckbox(quest);
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
typeFromChoice={'Single Response':'dropdown', 'Multiple Response':'dropdownmultiple', 'Number Fillin':'number', 'Essay':'essay', 'Code':'code'};
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
  var JSONobj = formatAsEditable(JSON.parse(questionJSONs[questionJSONsUIDs.indexOf(stringObjID)]));
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
      /*if(JSONobj[key].constructor.toString().indexOf("Array")!=-1 && $(this).is("form")){
        var checked = $(this).find("input[type='checkbox']");
        for(var i = 0; i < checked.length; i++){
          if(JSONobj[key].indexOf($(checked[i]).val())!=-1){
            $(checked[i]).prop("checked",true);
          }
        }
      }
      if(JSONobj[key])
        $(this).val(JSONobj[key]);
      if($(this).is("select")){
        $(this).trigger("chosen:updated.chosen");
        $(this).trigger("change");
      }else if($(this).is("form")){
        var checked = $(this).find("input[type='radio']");
        for(var i = 0; i < checked.length; i++){
          if(JSONobj[key] == $(checked[i]).val()){
            $(checked[i]).prop("checked",true);
          }
        } 
      }*/
      ValueOf.set(this,JSONobj[key]);

    });
    
  }
}

/*
duplicates a question held in JSON storage
*/
function duplicateQuestion(stringObjID,quiz){
  var JSONobj = formatAsEditable(JSON.parse(questionJSONs[questionJSONsUIDs.indexOf(stringObjID)]));
  
  sendQuestion(JSONobj,quiz);
}

/*
sets up dragBar vars
*/
function dragBarVarSetUp(e,addclass){
  
  var container = $(dragBar).parent().parent()[0];
  var rect = container.getBoundingClientRect();
  offset.x=rect.left;
  offset.y=rect.top+$(newtab.window).scrollTop();
  if(addclass){
    mousePosition.x = e.pageX || e.clientX;
    mousePosition.y = e.pageY || e.clientY;
    $(container).css("width",$(container).width());
    
    $(container).css("left",offset.x);
    $(container).css("top",offset.y);
    $(dragBar).parent().parent().addClass("moving");
  }
}
/*
Global Drag
*/

$(document).on("mousemove",function(e){
  if(dragBar){
    if(mousePosition.x < 0 || mousePosition.y < 0){
      dragBarVarSetUp(e,true);
      
    }else{
      var container = $(dragBar).parent().parent()[0];
      var currentPosition = {x:e.pageX || e.clientX,y:e.pageY || e.clientY};
      //offset.x+=currentPosition.x-mousePosition.x;
      offset.y+=currentPosition.y-mousePosition.y;
      mousePosition.x = e.pageX || e.clientX;
      mousePosition.y = e.pageY || e.clientY;
      $(container).css("left",offset.x);
      $(container).css("top",offset.y);
    }
  }
});
$(document).on("mouseup",function(){
  if(dragBar){
    var container = $(dragBar).parent().parent()[0];
    var thisID = $(container).attr("id");
    var i = 0, checkObj=true,shortestDistance = -1;
    var matchRect = container.getBoundingClientRect(),closestRect=matchRect,closestObj=container,closestI=0;
    while(checkObj){
      if("replacement-index-"+i!=thisID){
        checkObj = $($fakeTest).find("#replacement-index-"+i)[0];
        if(checkObj){
          var thisRect = checkObj.getBoundingClientRect();
          var thisDistance = getDistance(thisRect,matchRect);
          if(shortestDistance<0 || shortestDistance>thisDistance){
            shortestDistance=thisDistance;
            closestRect=thisRect;
            closestObj=checkObj;
            closestI=i;
          }
        }
      }
      i++;
    }
    
    
    
    if(closestObj!=container){
      var index = questionJSONsUIDs.indexOf(parseInt(thisID.replace("replacement-index-","")));
      var index2=index;
      
      if((matchRect.top+matchRect.bottom)/2<(closestRect.top+closestRect.bottom)/2){
        
        $(closestObj).before(container);
        index2 = questionJSONsUIDs.indexOf(closestI);
        
        
        
      }else{
        index2 = questionJSONsUIDs.indexOf(closestI)+1;
        
        $(closestObj).after(container);
        
      }
      questionJSONs.splice(index2,0,questionJSONs.splice(index,1)[0]);
      questionJSONsUIDs.splice(index2,0,questionJSONsUIDs.splice(index,1)[0]);
      
    }
    $(container).removeClass("moving");
    $(container).css("width","auto");
    $(container).css("left",0);
    $(container).css("top",0);
    
  }
  dragBar=null;
});
/*
gets the distance between the top left of two rects
*/
function getDistance(rect1,rect2){
  var xd = rect1.left-rect2.left;
  var yd = rect1.top-rect2.top;
  return Math.sqrt(xd*xd+yd*yd);
}


/*
This formats a question object from id:value to what gets thrown into the question() function
*/
function formatAsQuestion(obj){
  var questionParams = {};
  var i = 1;
  for(var key in obj){
    if(key.indexOf("choices-")==0){
      if(i == 1){
        questionParams.ansrL = [];
        questionParams.correctL = [];
      }
      questionParams.ansrL.push(obj[key]);
      var correct = obj[key.replace("choices-","correct-")];
      questionParams.correctL.push((correct=="Correct"));
      
      i++;
    }
  }
  paramSet (obj["questionHTML"],questionParams,"HTML");
  paramSet (obj["placeholderText"],questionParams,"pHold");
  paramSet (typeFromChoice[obj["questionType"]],questionParams,"type");
  
  if(questionParams["type"]=="dropdown"||questionParams["type"]=="dropdownmultiple"){
    if(!(obj["isDropDown"] && obj["isDropDown"][0] == "is drop-down")){
      
      if(questionParams["type"]=="dropdown")
        questionParams["type"]="radio";
      else
        questionParams["type"]="checkbox";
    }
  }
  
  paramSet (obj["baseCode"]?new solidText(obj["baseCode"]):null,questionParams,"pHold");
  return questionParams;
}
/*
inverts obj[key] (returns val)
to obj[val] (returns key)
*/
function getKey (obj, value){
  for(var key in obj){
    if(obj[key] == value){
      return key;
    }
  }
  return null;
};

/*
This formats a question() object to id:value
*/
function formatAsEditable(obj){
  
  var questionParams = {};
  var i = 1;
  if(obj.ansrL){
    for(var key in obj.ansrL){
      questionParams["choices-"+i]=obj.ansrL[key];
      questionParams["correct-"+i]=obj.correctL[key]?"Correct":"Incorrect";
      i++;
    }
  }
  paramSet (obj["HTML"],questionParams,"questionHTML");
  paramSet (obj["pHold"],questionParams,"placeholderText");
  if(obj["type"]=="dropdown"||obj["type"]=="dropdownmultiple"){
    questionParams["isDropDown"]=["is drop-down"];
  }
  if(obj["type"]=="radio"){
    obj["type"]="dropdown";
  }
  if(obj["type"]=="checkbox"){
    obj["type"]="dropdownmultiple";
  }
  paramSet (getKey(typeFromChoice,obj["type"]),questionParams,"questionType");
  if(obj["type"]=="code")
    paramSet ((obj["baseCode"]?obj["baseCode"].placevalue:null),questionParams,"pHold");
  return questionParams;
}

/*
This sends a generated question to the new tab/ window
*/
function sendQuestion(obj,quiz,overrideID){
  if((overrideID || overrideID === 0) && questionJSONsUIDs.indexOf(overrideID)==-1)
    overrideID=false;
  
  var stringObjID=(overrideID||overrideID===0)?overrideID:questionJSONsUIDsCounter++;
  
  
  
  appendEditable(formatAsQuestion(obj),overrideID,stringObjID,quiz);
}
/*
creates and appends a teacher editable question for the quiz
*/
function appendEditable(questionParams,overrideID,stringObjID,quiz){
  
  if(!overrideID && overrideID !== 0){
    questionJSONs.push(JSON.stringify(questionParams));
    questionJSONsUIDs.push(stringObjID);
  }else{
    questionJSONs.splice(questionJSONsUIDs.indexOf(stringObjID),1,JSON.stringify(questionParams));
  }
  
  
  var q = question(questionParams);
  var qParent = document.createElement("DIV");
  var dragQuestionBar = document.createElement("DIV");
  
  $(dragQuestionBar).on("mousedown",function(e){
    mousePosition = {x:-1,y:-1};
    offset = {x:-1,y:-1};
    dragBar=dragQuestionBar;
    dragBarVarSetUp(e);
    
  });
  
  $(dragQuestionBar).addClass("dragBar");
  
  $(dragQuestionBar).html("&nbsp;");
  
  
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
  
  $(q).prepend(dragQuestionBar);
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
  //var len = ($(e.target).parent().find(".question").length)/2-1;
  var ques = question({type:'multiquestion',HTML:'',makeL:[
    {type:'essay',rows:3,cols:30,pHold:'Your text here...',ID:"choices-"+(currentNumber+1)},
    {type:'checkbox',HTML:'',ansrL:['Correct'],ID:"correct-"+(currentNumber+1)}
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
  //just an fyi, quiz object comes through here
  if(params.ID){
    $(element).attr("id",params.ID);
  }
  if(params.Class){
    $(element).addClass(params.Class);
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
  /*$(quiz).find('textarea').each(function(){
    ValueOf.set(this,"");
  });
 
  $(quiz).find('select').each(function(){
    var firstVal = $(this).find('option:first').val(),
        thisVal = $(this).val();
    if(firstVal!=thisVal){
          ValueOf.set(this,firstVal||false);
    }
  });
  $(quiz).find('form').each(function(){
     ValueOf.set(this,false);
  });*/
  $(quiz).find('.question').each(function(){
    ValueOf.set(this,false);
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

*/
function formatQuestionJSONsForExportAJAX(){
  return '{"makeL":['+questionJSONs.join(",")+"]}"
}

/*
sets up a new quiz
*/
function quiz(object){
  var makeListQuestions = object.makeL||[];
  var questions = object.qList||[];
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
  
  
  
  for(var i = 0; i < makeListQuestions.length; i++){
    questions.push(question(makeListQuestions[i]));
  }
  for(var i = 0; i < questions.length; i++){
    $(questions[i]).addClass('Q');
    $(quizContainer).append(questions[i]);
  }
  
  $(quizContainer).append(SUBMIT);
  setTabIndex(SUBMIT);
  
  //on editor, send to server button
  if(options.isEditor){
    var serverSend = buttonWithLabelAndOnClick("Save Quiz",function(){
      var formatedText = formatQuestionJSONsForExportAJAX();
      alert("send to server:\n"+formatedText); 
      
      //when sending data to the server, we must change " to ' to avoid &quot waste.
      //must also join array by ","
      $.ajax({
        type: "POST",
        url: "http://bluecode.altervista.org/bean/response.php",
        data: "quiz="+formatedText,
        dataType: "text",
        success: function(data){prompt("returned",data);},
        failure: function(errMsg) {
          alert(errMsg);
        }}
      );
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
  questionSuper(quizContainer,options);
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
/*
sets up an array to a named localStorage space
*/
function setUpJSONArray(array,name){
  if(!localStorage.getItem(name))
    localStorage.setItem(name,JSON.stringify(array));
}

/*
in case regex has not yet been initialized
*/
function initRegexStorage(){
  setUpJSONArray(["No Checking","Mass","Length","New Pattern"],"localRegexName");
  setUpJSONArray(["/.*/g","/asdf/g","/sss/g","NOT_A_REGEX"],"localRegexPattern");
}
initRegexStorage();






