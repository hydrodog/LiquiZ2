//must have a blank option one for question of type dropdown
standard('agree',["","strongly agree", "agree", "no opinion", "disagree", "strongly disagree"]);
standard('code_ques',["","print('hi');", "println()", "main", "String [] args", "strongly put on screen"]);


quiz({qList:[
  
  question({
    type:"dropdown",qHTML:"Choose the dinosaur!",ansrL:["",new img("http://www.iconshock.com/img_jpg/SUNNYDAY/animals/jpg/256/dinosaur_icon.jpg"),"A pig.",new img("http://www.clipartbest.com/cliparts/dT7/exK/dT7exK9ac.png")]
  }),
  
  question({
    type:"dropdown",qHTML:"What letter does 'apple' begin with?",ansrL:["","a","b","c"],pHold:"Pick a letter."
  }),
  
  question({
    type:"dropdown",qHTML:"Do you agree that red is awesome? ",ansrL:choices['agree']
  }),
  
  question({
    type:"dropdownmultiple",qHTML:"Pick the fruits:",ansrL:["","tomato","potato","onion","strawberry","raspberry","banana","cat"]
  }),
  
  question({
    type:"dropdownmultiple",qHTML:"Pick the fruits",ansrL:["",
                                                           new img("http://icons.iconarchive.com/icons/artbees/paradise-fruits/256/Tomato-icon.png"),
                                                           new img("http://png-4.findicons.com/files/icons/1187/pickin_time/256/potato.png"),
                                                           new img("http://png-3.findicons.com/files/icons/1187/pickin_time/128/onion.png"),
                                                           new img("http://www.primaldetox.com/wp-content/uploads/Aha-Soft-Torrent-X3-content.ico"),
                                                           new img("https://pbs.twimg.com/profile_images/3253620646/8031eb423b8d91cca462af4825cdfdb2.jpeg")
                                                          ],
    pHold:"Pick the fruits"
  }),
  
  question({type:"dropdownmultiple",qHTML:new img("http://stereo.gsfc.nasa.gov/beacon/latest_256/ahead_euvi_195_latest.jpg"),ansrL:["","an orange cat","a blue bat","a green sun"],pHold:"What is this?"}),
  
  question({type:"dropdownmultiple",qHTML:"Which of these look like Java?",ansrL:choices['code_ques']}),
  
  question({type:"essay",qHTML:"Question Text as HTML<br/>",rows:20,cols:50,pHold:"Please write your finest essay on pigs."}),
  
  question({type:"code",qHTML:"Find the error <br/>",rows:20,cols:50,pHold:new solidText("public static void main(String args[]){\nSystem.out.println('hi')\n}")}),
  
  question({type:"number",qHTML:"What is 7 x 5 ",cols:5}),
  
  question({type:"number",qHTML:"What is 7 x 5 ",cols:10,pHold:"Num..."}),
  
  question({type:"multiquestion",qHTML:"Choose the options to make the code work!<br/>",qArry:[
    question({type:"html",HTML: "public static void"}),
    
    question({type:"dropdown",ansrL:choices['code_ques']}),
    
    question({type:"html",HTML: "("}),
    
    question({type:"dropdown",ansrL:choices['code_ques']}),
    
    question({type:"html",HTML: "){<br/>System.out."}),
    
    question({type:"dropdown",ansrL:choices['code_ques']}),
    
    question({type:"html",HTML: "<br/>}"})
  ]})
],opts:{timed:false}});