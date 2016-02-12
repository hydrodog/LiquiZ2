{
		"type": "Quiz",
		"css": "demostyle.css",
		"payload": {
			"policy": "Dov",
			"title": "Programming Quiz",
			"points": 100,
			"timeLimit": 0,
			"remainingTries": 1,
			"dataDir": "assets/",
			"editMode": true,
			"questions": 	[
		{	
			"id": 1,
			"title": "Java",
			"type": "code",
			"content": [
			["instructions", "Complete the code below so that it prints \"hello \""],
			["code", 1, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80]
 ]
		},
		{	
			"id": 2,
			"title": "Java",
			"type": "code",
			"content": [
			["instructions", "Complete the following function so it computes factorial recursively."],
			["code", 2, "public static void fact(int n) {\n\n\n\n}", 10, 80]
 ]
		},
		{	
			"id": 3,
			"title": "Java",
			"type": "cloze",
			"content": [
			["instructions", "Fill in the blanks to make the code correct"],
			["cloze", 3, "public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]](\"hello \");\n  }\n}"] ]
		},
		{	
			"id": 4,
			"title": "Object Oriented Terminology",
			"type": "Match",
			"content": [
			["instructions", "Match the object-oriented terminology to the meaning"],
			["match", 4, ["Class", "Object", "Method", "Message", "Polymorphism", "Encapsulation"], 
			["A concrete instance of a class", 
			"A request made to an object", 
			"Hiding the internal details of a class or object", 
			"Sending the same message to different objects and getting different results", 
			"A specification of an object", 
			"A function that is applied to an object"]] ]
		}
		]
	}
}





<%@ page import = "Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.*" %>
<%@ page import = "Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.test.*" %>

<% 
//String id = request.getParameter("quizid");
//Quiz quiz = Quiz.find(id);
//DisplayContext
//quiz.writeJS();

//TestQuizJavascript.printQuiz(TestQuizJavascript.test1());

/*Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.DisplayContext dc = new Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.DisplayContext();
Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.Quiz quiz = Users.Ying.git.LiquiZ.LiquiZ2.build.classes.org.adastraeducation.liquiz.test.TestQuizJavascript.test1();
quiz.writeJS(dc);
System.out.println(dc.toString());  */

%>	  

