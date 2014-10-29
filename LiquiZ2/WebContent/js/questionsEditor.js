//must have a blank option one for question of type dropdown

standard('qTypes',['','Drop Down', 'Multidrop-down', 'Number Fillin', 'Essay', 'Code']);

standard('qTypes2',['','dropdowns', 'multidropdowns', 'numfillins', 'essays', 'codes']);
standard('correct',['Correct','Incorrect']);
standard('incorrect',['Incorrect','Correct']);


quiz({qList:[
  
  question({
    type:'dropdown',
    qHTML:'Type of Question:',
    ansrL:choices['qTypes'],
    pHold:'Choose a type...',
    hideL:choices['qTypes2']
  }),
  question({type:'essay',qHTML:'Question Text:',rows:3,cols:30,pHold:'Your text here...'}),
  questionSet({class:'dropdowns multidropdowns',qList:[
    question({type:'essay',qHTML:'Placeholder Text:',rows:3,cols:30,pHold:'Your text here...'}),
    question({type:'multiquestion',qHTML:'',qArry:[
      question({type:'essay',qHTML:new fromText('Answer Choice [list:nums]:',1),rows:3,cols:30,pHold:'Your text here...'}),
      question({type:'dropdown',qHTML:'',ansrL:choices['correct']})
    ]}),
    question({type:'multiquestion',qHTML:'',qArry:[
      question({type:'essay',qHTML:new fromText('Answer Choice [list:nums]:',2),rows:3,cols:30,pHold:'Your text here...'}),
      question({type:'dropdown',qHTML:'',ansrL:choices['incorrect']})
    ]}),
    question({type:'multiquestion',qHTML:'',qArry:[
      question({type:'essay',qHTML:new fromText('Answer Choice [list:nums]:',3),rows:3,cols:30,pHold:'Your text here...'}),
      question({type:'dropdown',qHTML:'',ansrL:choices['incorrect']})
    ]})
  ]}),
  
  questionSet({class:'codes',qList:[
    question({type:'essay',qHTML:'Base Code:',rows:3,cols:30,pHold:'Your base code here...'})
  ]}),
  questionSet({class:'numfillins essays',qList:[
    question({type:'essay',qHTML:'Placeholder Text:',rows:3,cols:30,pHold:'Your placeholder text here...'})
  ]})
  
],opts:{timed:false}});
