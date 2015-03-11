//must have a blank option one for question of type dropdown

standard('qTypes',['Single Response', 'Multiple Response', 'Number Fillin', 'Essay', 'Code']);

standard('qTypes2',['','dropdowns', 'multidropdowns', 'numfillins', 'essays', 'codes']);//link to problem
standard('correct',new solidText(['Correct','Incorrect']));
standard('incorrect',new solidText(['Incorrect','Correct']));

//need to pull from server
possibleRegexes=new solidText(JSON.parse(localStorage.getItem("localRegexName")));
possibleRegexesHideL = [];

//Adds the new patter show hide as the last option
for(var key in possibleRegexes.placevalue){
  if(key<possibleRegexes.placevalue.length-1){
    possibleRegexesHideL.push("");
  }
}
possibleRegexesHideL.push("NewRegexMachine");

quiz({qList:[
  
  //choose question type
  dropdown({
    HTML:'Type of Question:',
    ansrL:choices['qTypes'],
    pHold:'Choose a type...',
    hideL:choices['qTypes2']
    ,ID:"questionType"
  }),

  //essay({HTML:'Question Text:',rows:3,cols:30,pHold:'Your text here...',ID:"questionHTML"}),
  singular({HTML:'Question Text:',width:480,height:100,pHold:'Your text here...',ID:"questionHTML"}),
  
  //question type choice determines which questionSet is shown
  questionSet({Class:'dropdowns multidropdowns',qList:[
    essay({HTML:'Placeholder Text:',rows:3,cols:30,pHold:'Your text here...',ID:"placeholderText"}),
    checkbox({HTML:'',ansrL:['is drop-down'],ID:"isDropDown"}),
    html({HTML:'<br>Choices:'}),
    multiquestion({HTML:'',qList:[
      essay({rows:3,cols:30,pHold:'Your text here...',ID:"choices-1"}),
      checkbox({HTML:'',ansrL:['Correct'],ID:"correct-1"})
    ]}),
    multiquestion({HTML:'',qList:[
      essay({rows:3,cols:30,pHold:'Your text here...',ID:"choices-2"}),
      checkbox({HTML:'',ansrL:['Correct'],ID:"correct-2"})
    ]}),
    multiquestion({HTML:'',qList:[
      essay({rows:3,cols:30,pHold:'Your text here...',ID:"choices-3"}),
      checkbox({HTML:'',ansrL:['Correct'],ID:"correct-3"})
    ]}),
    html({HTML:'<br>'}),
    question({type:'addchoicesbutton'}),
    question({type:'removechoicesbutton'})
  ]}),
  
  questionSet({Class:'codes',qList:[
    essay({HTML:'Base Code:',rows:3,cols:30,pHold:'Your base code here...',ID:"baseCode"})
  ]}),
  questionSet({Class:'numfillins',qList:[
    dropdown({HTML:'Regex Pattern',hideL:possibleRegexesHideL,ansrL:possibleRegexes,ID:"regexPattern"}),
    questionSet({Class:'NewRegexMachine',qList:[
        essay({HTML:'Pattern Name:',rows:3,cols:30,pHold:new solidText('Your Regex'),ID:"regexName"}),
        essay({HTML:'Your New Regex:',rows:3,cols:30,pHold:new solidText('/yourRegex/g'),ID:"regexFillin"}),
        question({type:'saveregexlocalbutton'}),
        question({type:'saveregexglobalbutton'})
    ]}),
    essay({HTML:'Placeholder Text:',rows:3,cols:30,pHold:'Your placeholder text here...',ID:"placeholderText"})
  ]}),
  questionSet({Class:'essays',qList:[
    essay({HTML:'Placeholder Text:',rows:3,cols:30,pHold:'Your placeholder text here...',ID:"placeholderText"})
  ]})

  
  ],opts:{submit:"Save Question", isEditor:true, timed:false}});
