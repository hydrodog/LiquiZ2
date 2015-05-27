<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
        <title>CreateQuestions</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js">
        </script>
        <script src="assets/js1/func.js"></script>
        <style>
			.invisible {
				display: none;
			}
	    </style>
    </head>
    <body>
    <!-- This style will later go into CSS..-->

 
    	<h2> Questions </h2>
        <form method="GET" action="addQuestion.jsp">
            <div id="div_title" align="left">
                <br>
            
                Title <input type="text" name="title">
                QuestionType
                 <select id="target" name="question_type" size="1">
                    <option value = "QuestionType">(Select a question type)</option>
                    <option value="FillIn" >Fill-In</option>
                    <option value="Essay" >Essay</option> 
                    <option value="Code" >Code</option>                
                    <option value="MultiChoiceDropdown">MultiChoice-Dropdown</option>
                    <option value="MultiChoiceRadio">MultiChoice-Radio</option>
                    <option value="MultiAnswer">MultiAnswer</option>
                    <option value="Regex">Regex</option>
                    <option value="Matrix">Matrix</option>
                </select>
            </div>
            
            <br>
            
            <div id="common_attribute" align="left">
                Level<input type="text" name="level" value="1">
                Points<input type="text" name="points" value="1">
            </div>
           
            <br>
            <div id="question_text" align="left">
                Question Text<br>
                <textarea name="question_text" rows="6" cols="40"></textarea>
            </div>
            <br>
            
            
           
            <div>
            	Image Upload
				<input type="file" name = "image_src" id="image-input">
				<input type="button" value="Load Selected Image" id="load-image" />
				<br>
				
			</div>

			<div>
			    <br>
       			<img id="image-container" class="invisible"/>
    		</div>
    		
    		<br>
    		
    		<script>
    		(function(){

    		    var fileInput = document.getElementById('image-input');
    		    var image = document.getElementById('image-container');

    		    document.getElementById('load-image').addEventListener('click', function(){
    		    	var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    		        image.src = fileUrl;
    		        image.show();
    		    });

    		})();   

			</script>
           
			<div>
                Audio Upload
				<input type="file" name= "audio_src" id="audio-input">
				<input type="button" value="Load Selected Audio" id="load-audio" />
			
			</div>

			<div>
				<br>
       			<audio id="audio-container" class="invisible" controls></audio>
       			<br>
       			<br>
    		</div>
    		
    		<script>
    		(function(){

    		    var fileInput = document.getElementById('audio-input');
    		    var audio = document.getElementById('audio-container');

    		    document.getElementById('load-audio').addEventListener('click', function(){

    		    	var fileUrl = window.URL.createObjectURL(fileInput.files[0]);

    		        audio.src = fileUrl;
    		        audio.show();

    		    });

    		})();   

			</script>
			
			 <div>
                Video Upload
				<input type="file" name= "video_src" id="video-input">
				<input type="button" value="Load Selected Video" id="load-video" />
			</div>

			<div>
				<br>
       			<video id="video-container" class="invisible" controls></video>
       			<br>
       			<br>
    		</div>
    		<script>
    		(function(){

    		    var fileInput = document.getElementById('video-input');
    		    var video = document.getElementById('video-container');

    		    document.getElementById('load-video').addEventListener('click', function(){
    		    	var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    		        video.src = fileUrl;
					video.show();
    		    });

    		})();   

			</script>
               
            <br>
                
           <div id="FillIn" class="invisible" align="left" >
            Answer<input type="text" name="answer">   
            	<br>
                <br>
                <div>
                <div style="float:left">
                    <input type="checkbox" name="warningPattern" onclick="showWarningPatternAttribute(this)">Warning Pattern<br>
                </div>
                <br>
                <div id="warningPattern_attribute" style="float:left;display:none; ">
                    <select name="warning_type" size="1">
                        <option value="NumberWarningPattern" selected>Fill-In</option>
                    </select>
                    Number Limits<input type="text" name="warningNumberLimit">
                </div>
                </div>
                <br>
                <br>
                
                <div style="float:left">
                    <input type="checkbox" name="number" onclick="showNumberQuestionAttribute(this)">Number Question<br>
                </div>
                <br>
                <div id="numberQuestion_attribute" style="float:left;display:none;">
                    Input your exact number<input type="text" name="NumberQuestion_ExactNumber">
                    Input your approximate<input type="text" name="NumberQuestion_Approximate">
                </div>
                 <div style="clear:both"></div>
            </div>
            
             <div id="Essay" class="invisible" align="left" >
                <div>
                    Type your Essay<br>
               		<textarea name="essay_text" rows="10" cols="100" onkeypress=" return check_length(this, document.getElementById('count_number_words'), document.getElementById('show_remaining_words'));"></textarea>
					<br>
					<font color="black">Word count:</font><font color="red"> 
  					<span id="count_number_words">0</span>
					</font>
					<br>
					<font color="black">Words remaining: </font><font color="red"> 
   					<span id="show_remaining_words">120</span>
					</font>

    
                </div>
            </div>
            
            <div id="Code" class="invisible"align="left" >
            Programming Language
                <select name="code_type" size="1">
                    <option value="C++">C++</option>
                    <option value="Java" >Java</option> 
                </select>
                <br><br>
                
                <div>
                    Type your Code<br>
               		<textarea name="code_text" rows="10" cols="100" onkeypress=" return check_length(this, document.getElementById('count_number_words'), document.getElementById('show_remaining_words'));"></textarea>
					<br>
					<font color="black">Word count:</font><font color="red"> 
  					<span id="count_number_words">0</span>
					</font>
					<br>
					<font color="black">Words remaining: </font><font color="red"> 
   					<span id="show_remaining_words">120</span>
					</font>
                </div>
            </div>
            
            
             <div id="MultiChoiceDropdown" class="invisible" align="left" >
                <div>
                    Multiple choice - Dropdown :
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; Correct Answer  
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 
                    Add more options <input type="text" name="multichoice_dropdown_number" onchange="createDropDownChoices(this)" style="width: 30px;"  >
                   <br>
                   <form>
                   <br> Option 1: <input type="text" name="dropdown_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="dropdown_choices" value ="choice_1" ><br>
                   <br> Option 2: <input type="text" name="dropdown_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="dropdown_choices" value ="choice_2" ><br>
                   <br> Option 3: <input type="text" name="dropdown_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="dropdown_choices" value ="choice_3" ><br>
                   <br> Option 4: <input type="text" name="dropdown_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="dropdown_choices" value ="choice_4" ><br>
                   </form>
                </div>
                <div id="dropdown"></div>
            </div>
            
            
             <div id="MultiChoiceRadio" class="invisible" align="left" >
                <div>
                    Multiple choice - Radio :
                    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; Correct Answer  
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 
                    Add more options <input type="text" name="multichoice_radio_number" onchange="createRadioChoices(this)" style="width: 30px;"  >
                    <br>
                    <form>
                   <br> Option 1: <input type="text" name="radio_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="radio_choices" value ="choice_1" ><br>
                   <br> Option 2: <input type="text" name="radio_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="radio_choices" value ="choice_2" ><br>
                   <br> Option 3: <input type="text" name="radio_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="radio_choices" value ="choice_3" ><br>
                   <br> Option 4: <input type="text" name="radio_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="radio_choices" value ="choice_4" >
                	</form>
                   
                </div>
                
                <div id="radio"></div>
          	</div>
            	
            
          <div id="MultiAnswer" class="invisible" align="left" >
                <div>
                   Multiple Answer Choices:
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; Correct Answer  
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 
                    Add more options <input type="text" name="multianswer_number" onchange="createMultiChoices(this)" style="width: 30px;"   >
                    <br>
                    <form>
                   <br> Option 1: <input type="text" name="multi_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="multi_choices" value ="choice_1" ><br>
                   <br> Option 2: <input type="text" name="multi_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="multi_choices" value ="choice_2" ><br>
                   <br> Option 3: <input type="text" name="multi_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="multi_choices" value ="choice_3" ><br>
                   <br> Option 4: <input type="text" name="multi_choices">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="checkbox" name="multi_choices" value ="choice_4" >
                	</form>
                   
                </div>
                <br>
                
                <div id="multichoices"></div>
            </div>
            
            <div id="Regex" class="invisible" align="left"  >
            Answer<input type="text" name="answer">   
            	<br>
                <br>
                
                <div style="clear:both"></div>             
                <div style="float:left">
                    Input your Regex<input type="text" name="regexString">
                </div>
                <div style="clear:both"></div>
                <br>
            </div>
            <script src="assets/js1/displayChange.js"></script>
            
            <br>
            
            <div align="left">
            <br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
                    <input type="submit" value="Submit" size="12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="reset" value="Cancel" size="12">
            </div>
        </form>
    </body>
</html>
