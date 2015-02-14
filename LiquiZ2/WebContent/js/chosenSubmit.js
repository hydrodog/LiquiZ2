var config = {
  '.chosen-select'           : {},
};
for (var selector in config) {
  $(selector).chosen(config[selector]);
}

for(var k = 0; k < showHideList.length; k++){
  // alert(showHide);
  var showHide=showHideList[k];
  for(var i = 0; i < showHide.length; i++){
  //  alert(showHide[i]);
    if(showHide[i].length>0)
      $("."+showHide[i]).hide();
  }
}



function SUBMIT_ONE_QUIZ(quiz,questionEditingIndex){

  var i = 1;
  var allSend = "";
  var sendData = {};

  $(quiz).find("*").each(function(){
    if(parseInt($(this).parent().attr("id"))<-i)
      i=-parseInt($(this).parent().attr("id"));
  });
 

  $(quiz).find(".question").each(function(){

     if($(this).parent().is(':visible')){
      var val = ValueOf.get(this);
       
      //BTW we will escape the val of each answer so that students can't mess server parsing up
      if(!(val==null||val.length < 1)){
        if(!$(this).parent().attr("id"))
           $(this).parent().attr("id","-"+i++);
        allSend+=(allSend.length>0?",\n":"")+("{"+$(this).parent().attr("id")+":"+val+"}");
        sendData[$(this).parent().attr("id")]=val;
      }
      
    }

  });

  if($(quiz).attr("isEditor") != "true"){
    alert(allSend);
  }else if(sendData){
    sendQuestion(sendData,quiz,(questionEditingIndex||questionEditingIndex===0)?questionEditingIndex:false);
  }
}
