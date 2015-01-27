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
      var val = $(this).val();
       if($(this).is('form')){
         if($(this).is('.checkbox')){
           var checked = $(this).find("input[type='checkbox']:checked");
           val = [];
           for(var i = 0; i < checked.length; i++){
             val.push($(checked[i]).val());
           }
         }else{
           val = $(this).find("input[type='radio']:checked").val();
         }
       }
      //BTW we will escape the val of each answer so that students can't mess server parsing up
      if(!(val==null||val.length < 1)){
        if(!$(this).parent().attr("id"))
           $(this).parent().attr("id","-"+i++);
        allSend+=(allSend.length>0?",\n":"")+("{"+$(this).parent().attr("id")+":"+val+"}");
        sendData[$(this).parent().attr("id")]=val;
      }
      
    }

  });
      console.log(allSend);

  if($(quiz).attr("isEditor") != "true"){
    alert(allSend);
  }else if(sendData){
    sendQuestion(sendData,quiz,(questionEditingIndex||questionEditingIndex===0)?questionEditingIndex:false);
  }
}

/*Will send all quizes if need be
$("#sendAll").on("click",function(){
var i = 0;
$(".quiz").find(".question").each(function(){
var val = $(this).val();
if(val==null){
val = "No Answer";
}
if(val.length < 1){
val = "No Answer";
}
alert("q"+i+": "+val);
i++;
});

});
*/
