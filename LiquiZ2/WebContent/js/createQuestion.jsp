<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
        <title>CreateQuestions</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js">
        </script>
        <script src="assets/func.js"></script>
    </head>
    <body>
    	 Choose your color for blank
         <select name="question_type" size="1" onchange="setColor(this)">
            <option value="default" selected>default</option>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
        </select>
        <form method="GET" action="addQuestion.jsp">
            <div id="div_title" align="left">
                Title  <input type="text" name="title">
                QuestionType
                <select name="question_type" size="1" onchange="changeQuestion(this)">
                    <option value="FillIn" selected>FillIn</option>
                    <option value="MultiChoice">MultiChoice</option>
                </select>
            </div>
            <div id="common_attribute" align="left">
                Level<input type="text" name="level" value="1">
                Points<input type="text" name="points" = value="1">
                Answer<input type="text" name="answer">   
            </div>
            <div id="question_text" align="left">
                Question Text</br>
                <textarea name="question_text" rows="6" cols="40"></textarea>
            </div>
            <div id="fillin_attribute" align="left" >
                <div style="float:left">
                    <input type="checkbox" name="warningPattern" onclick="showWarningPatternAttribute(this)">WarningPattern</br>
                </div>
                <div id="warningPattern_attribute" style="float:left;display:none; margin-left:60px;">
                    <select name="warning_type" size="1">
                        <option value="NumberWarningPattern" selected>FillIn</option>
                    </select>
                    Number Limits<input type="text" name="warningNumberLimit">
                </div>
                
                <div style="clear:both"></div>             
                <div style="float:left">
                    <input type="checkbox" name="regex" onclick="showRegexQuestionAttribute(this)">RegexQuestion</br>
                </div>
                <div id="regexQuestion_attribute" style="float:left;display: none; margin-left:60px;">
                    Input your Regex<input type="text" name="regexString">
                </div>
                <div style="clear:both"></div>
                
                <div style="float:left">
                    <input type="checkbox" name="number" onclick="showNumberQuestionAttribute(this)">NumberQuestion</br>
                </div>
                <div id="numberQuestion_attribute" style="float:left;display:none; margin-left:60px;">
                    Input your exact number<input type="text" name="NumberQuestion_ExactNumber">
                    Input your approximate<input type="text" name="NumberQuestion_Approximate">
                </div>
                 <div style="clear:both"></div>
            </div>
            
            <div id="multichoice_attribute" align="left" style= "display:none">
                <div>
                    Numbers of choices
                    <input type="text" name="multichoice_number" onchange="createChoices(this)">
                </div>
                <div id="choices"></div>
            </div>
            
            
            <div align="left">
                    <input type="submit" value="Submit" size="12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="reset" value="Cancel" size="12">
            </div>
        </form>
    </body>
</html>