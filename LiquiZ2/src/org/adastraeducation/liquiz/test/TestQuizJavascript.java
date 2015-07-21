package org.adastraeducation.liquiz.test;


import java.util.ArrayList;
import java.util.Arrays;

import org.adastraeducation.liquiz.*;
public class TestQuizJavascript {
	public static void main(String[] a) {
		int qid=0;
		int qcid=0;
		Policy p = new Policy();
		Quiz quiz = new Quiz(1, "Java1", "Java Quiz 1", p, true);
		QuestionContainer qc = 
				new QuestionContainer(qcid++, "Operators", "fillin", new ArrayList<Displayable>());
		qc.add(new TextQuestion("What is 2+2?"));
		qc.add(new Image("dinosaur.jpg", 100, 100));
		ArrayList<Answer> answers = new ArrayList<Answer>();
		answers.add(new Answer(new TextAnswer("4"), true));
		qc.add(new FillIn(qid++, 1, 1, answers));
		quiz.addQuestion(qc);
		
		
		//test for question 1 in QuizDemo_ajax.jsp, good as of 7/20/2015 except for 1_1 part.  Apparently the 1_1 part in QuizDemo_ajax.jsp was a mistake though, so the test is still good.
		qc=new QuestionContainer(qcid++,"Mergesort","grid",new ArrayList<Displayable>());
		qc.add(new TextInstruction("Show the first pass of Mergesort below"));
		Matrix m=new Matrix(1,9);
		m.setData(new double[][]{new double[]{9,8,7,6,5,4,3,2,1}});
		qc.add(m);
		qc.add(new LineBreak());
		qc.add(new MatrixQuestion(qid++,10,100,1,9));
		quiz.addQuestion(qc);
		
		
		//test for question 2 in QuizDemo_ajax.jsp, good as of 7/20/2015 except for 2_1, 2_2, and 2_ in 2_3 parts.  Apparently those parts in QuizDemo_ajax.jsp was a mistake though, so the test is still good.
		qc=new QuestionContainer(qcid++,"Matrix Multiplication","matrix",new ArrayList<Displayable>());
		qc.add(new TextInstruction("Show the result of matrix A * B"));
		Matrix m1=new Matrix(3,3);
		m1.setData(new double[][]{{1,0,2},{1,1,-2},{2,1,0}});
		qc.add(m1);
		qc.add(new TextSpan("*"));
		Matrix m2=new Matrix(3,3);
		m2.setData(new double[][]{{1,1,-1},{-2,1,0},{1,1,3}});
		qc.add(m2);
		qc.add(new TextSpan("="));
		qc.add(new MatrixQuestion(qid++,10,100,3,3));
		quiz.addQuestion(qc);
		
		
		// test for question 3 in QuizDemo_ajax.jsp, good as of 7/20/2015
		qc=new QuestionContainer(qcid++,"Java","code",new ArrayList<Displayable>());     
		qc.add(new TextInstruction("Complete the code below so that it prints 'hello'"));
		qc.add(new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n"));
		quiz.addQuestion(qc);
		
		
		
		//test for question 4 in QuizDemo_ajax.jsp, good as of 7/20/2015
		qc=new QuestionContainer(qcid++,"Java","code", new ArrayList<Displayable>());
		qc.add(new TextInstruction("Complete the following function so it computes factorial recursively."));
		qc.add(new Code(qid++,1,1,10,80,"public static void fact(int n) {\n\n\n\n}"));
		quiz.addQuestion(qc);
		
		
		//test for question 5 in QuizDemo_ajax.jsp, good as of 7/20/2015
		qc=new QuestionContainer(qcid++,"Java","cloze", new ArrayList<Displayable>());
		qc.add(new TextInstruction("Fill in the blanks to make the code correct"));
		qc.add(new Cloze(qid++,1,1,"public [[class]] A {\n  [[public]] static [[void]] main([[String]] [] args) {\n  System.[[out]].[[println]]('hello');\n  }\n}"));
		quiz.addQuestion(qc);
		
		
		//test for question 6 in QuizDemo_ajax.jsp,
		//not sure how to set up this test
		qc=new QuestionContainer(qcid++,"Object Oriented Terminology","Match",new ArrayList<Displayable>());
		qc.add(new TextInstruction("Match the object-oriented terminology to the meaning"));
		qc.add(new Match(qid++,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("Class")),new Answer(new TextAnswer("Object")),new Answer(new TextAnswer("Method")),new Answer(new TextAnswer("Message")),new Answer(new TextAnswer("Polymorphism")),new Answer(new TextAnswer("Encapsulation")))),new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("A concrete instance of a class")),new Answer(new TextAnswer("A request made to an object")),new Answer(new TextAnswer("Hiding the internal details of a class or object")),new Answer(new TextAnswer("Sending the same message to different objects and getting different results")),new Answer(new TextAnswer("A specification of an object")),new Answer(new TextAnswer("A function that is applied to an object")))),new ArrayList<Integer>(Arrays.asList(1,2,3))));
		quiz.addQuestion(qc);
		
		
		//test for question 7 in QuizDemo_ajax.jsp, good as of 7/21/2015
		qc=new QuestionContainer(qcid++,"File Upload","file",new ArrayList<Displayable>());       
		qc.add(new TextInstruction("Submit your homework for the 3n+1 problem as a single .java file"));
		qc.add(new FileUpload(qid++,10,100,".java"));
		quiz.addQuestion(qc);
		
		
		//test for question 8 in QuizDemo_ajax.jsp, good as of 7/21/2015, but in the ajax file emptyGrid syntax is inconsistent with emptyGrid syntax from question 2, so I left out the [1,2,3,4,5,6] part
		qc=new QuestionContainer(qcid++,"Graph Theory","matrix",new ArrayList<Displayable>());      
		qc.add(new TextInstruction("Find the shortest path from vertex 1 to 5.  Leave any cost blank if the vertex is unreachable."));
		qc.add(new Image("Bellmanford_3.png",4,4));
		qc.add(new LineBreak());
		qc.add(new MatrixQuestion(qid++,10,100,6,6));
		quiz.addQuestion(qc);
		
		
		//test for question 9 in QuizDemo_ajax.jsp, good as of 7/21/2015
		qc=new QuestionContainer(qcid++,"Arithmetic","fillin",new ArrayList<Displayable>());      
		qc.add(new TextSpan("What is 2+2"));
		qc.add(new FillIn(qid++,10,100));
		quiz.addQuestion(qc);
		
		
		//no question 10
		qcid++;
		qid++;
		
		
		//test for question 11 in QuizDemo_ajax.jsp, good as of 7/21/2015
		qc=new QuestionContainer(qcid++,"Dinosaur","mcRadioImg",new ArrayList<Displayable>());
		qc.add(new TextP("Which one is the dinosaur?"));
		qc.add(new MultiChoiceRadio(qid++,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new Image("cat2.jpeg",1,1)),new Answer(new Image("fish2.png",1,1)),new Answer(new Image("trex.jpeg",1,1))))));
		quiz.addQuestion(qc);
		
		
		//test for question 12 in QuizDemo_ajax.jsp, does not match ajax text because there is no "select" class.  I dont see why there needs to be a select class though, because there is already a MultiChoiceRadio class.  I currently have the java producing the same text as the previous question, using mcRadioImg, as of 7/21/2015
		qc=new QuestionContainer(qcid++,"Dinosaur","selectImg",new ArrayList<Displayable>());
		qc.add(new TextP("Which one is the dinosaur?"));
		qc.add(new MultiChoiceRadio(qid++,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new Image("cat2.jpeg",1,1)),new Answer(new Image("fish2.png",1,1)),new Answer(new Image("trex.jpeg",1,1))))));
		quiz.addQuestion(qc);
		
		
		//test for question 13 in QuizDemo_ajax.jsp, not sure if its good or not, I have it producing selectText instead of util.select, but from a practical point of view, they seem like the same thing, so why do they both have to be supported?  -7/21/2015
		qc=new QuestionContainer(qcid++,"Multimedia","audio", new ArrayList<Displayable>());
		qc.add(new TextInstruction("listen to the following audio file and pick the name of the main character."));
		qc.add(new Audio("clip1.mp3"));
		qc.add(new MultiChoiceRadio(qid++,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("Yijin")),new Answer(new TextAnswer("Asher")),new Answer(new TextAnswer("Ying"))))));
		quiz.addQuestion(qc);
		
		
		//test for question 14 in QuizDemo_ajax.jsp, good as of 7/21/2015
		qc=new QuestionContainer(qcid++,"Tacoma Narrows", "video", new ArrayList<Displayable>());
		qc.add(new TextInstruction("Watch the following video, then explain what caused the bridge to fail."));
		qc.add(new Video("Tacoma Narrows Bridge Collapse.mp4",10,10));
		qc.add(new Essay(qid++,1,1,10,80,200,""));
		quiz.addQuestion(qc);
		
		
		//test for question 15 in QuizDemo_ajax.jsp, not good as of 7/21/2015, fillin used instead of numeric (although I don't understand why you can't just use fillin)
		qc=new QuestionContainer(qcid++,"Arithmetic", "numeric", new ArrayList<Displayable>());
		qc.add(new TextInstruction("What is the square root of 2 (four digits is fine)?"));
		qc.add(new FillIn(qid++,100,10,new Answer()));
		quiz.addQuestion(qc);
		
		
		//test for question 16 in QuizDemo_ajax.jsp
		//not sure how to set up the test for this one
		qcid++;
		qid++;
		
		
		//test for question 17 in QuizDemo_ajax.jsp
		//not sure how to set up the test for this one
		
		
		
		
		DisplayContext dc = new DisplayContext();
		quiz.writeJS(dc);
		System.out.println(dc.toString());
		
	}
	
}
