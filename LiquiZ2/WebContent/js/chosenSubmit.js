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

function SUBMIT_ONE_QUIZ(quiz){

  var i = 0;
  var allSend = "";
  $("*").each(function(){
    i++;
    if(!$(this).attr("id"))
      $(this).attr("id","$"+i);
  });
 

  $(quiz).find(".question").each(function(){

    if($(this).parent().is(':visible')){
      var val = $(this).val();

      //BTW we will escape the val of each answer so that students can't mess server parsing up
      if(!(val==null||val.length < 1))
        allSend+=(allSend.length>0?",\n":"")+("{"+$(this).attr("id")+":"+val+"}");
      
    }

  });
  alert(allSend);
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