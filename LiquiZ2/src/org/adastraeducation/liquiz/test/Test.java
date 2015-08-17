package org.adastraeducation.liquiz.test;
import org.adastraeducation.liquiz.database.Database;
import org.adastraeducation.liquiz.database.Load;
import org.adastraeducation.liquiz.equation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;
import java.beans.XMLEncoder;
import java.beans.XMLDecoder;

import org.adastraeducation.liquiz.*;
public class Test {
	private static String header, trailer;
	private static char[] buf;
	private static String load(String filename) throws IOException {
		FileReader fr = new FileReader(filename);
		int len = 16384;
		StringBuilder b = new StringBuilder(len);
		int charsRead;
		while ((charsRead = fr.read(buf)) > 0) {
			b.append(buf, 0, charsRead-1);
		}
		return b.toString();
	}
	static {
		buf = new char[4096];
		try {
			header = load("header.html");
			trailer = load("trailer.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static Quiz test() {
		//for Equation and Fillin, no WarningPattern
		Quiz quiz = new Quiz();
		Var x = new Var("xx1", 3, 3, 1);
		Var y = new Var("y1", 2, 3, 1);
		HashMap<String,Var> map = new HashMap<String,Var>();
		map.put(x.getName(),x);
		map.put(y.getName(), y);
		Equation eq = new Equation("xx1^y1 * y1^xx1",map);
		EquationQuestion eqQ1 = new EquationQuestion(eq);
		QuestionContainer qc1 = new QuestionContainer(new ArrayList<Displayable>(Arrays.asList(eqQ1)));
		Var a = new Var("a", 0, 99, 1);
		Var b = new Var("b", 0, 99, 1);
		map = new HashMap<String,Var>();
		map.put("a", a);
		map.put("b", b);
		eq = new Equation("a+b-1",map);
		EquationQuestion eqQ2 = new EquationQuestion(eq,"int a = [a];<br>int b = [b];<br>cout<< (a++) + (--b) << endl;<br>//result:[?];");
		QuestionContainer qc2 = new QuestionContainer(new ArrayList<Displayable>(Arrays.asList(eqQ2)));
		
		quiz.addQuestionContainer(qc1);
		quiz.addQuestionContainer(qc2);
		return quiz;
	}
	public static Quiz test1() {
		Quiz quiz = new Quiz();
		quiz.setId(1);
		quiz.setName("Animals");
		// for multiChoiceDropDown
		QuestionContainer qc = new QuestionContainer("Dinosaurs",
			new ArrayList<Displayable> (Arrays.asList(
				new TextQuestion("Which is a dinosaur?"),
				new MultiChoiceDropdown(1, 1,
						new ArrayList<Answer>(Arrays.asList(
							new Answer(new TextAnswer("T-Rex"), true),
							new Answer(new TextAnswer("Shark")),
							new Answer(new TextAnswer("mouse"))
						))
				)
			))
		);
		
		quiz.addQuestionContainer(qc);
		
		//for Equation and Fillin, no WarningPattern
		Var x = new Var("x", 0, 99, 1);
		Var y = new Var("y", 0, 99, 1);
		HashMap<String,Var> map = new HashMap<String,Var>();
		map.put("x",x);
		map.put("y", y);
		Equation eq = new Equation(	"x+y",map);
		
		qc = new QuestionContainer("Math",
			new ArrayList<Displayable> (Arrays.asList(
				new TextQuestion("What is "),
				new EquationQuestion(eq),
				new TextQuestion("?")
			))
		);
		quiz.addQuestionContainer(qc);
		
		//for Equation and Fillin, with WarningPattern
		Var x1 = new Var("x1", 0, 99, 1);
		Var y1 = new Var("y1", 0, 99, 1);
		HashMap<String,Var> map1 = new HashMap<String,Var>();
		map1.put("x1",x1);
		map1.put("y1", y1);
		Equation eq1 = new Equation("x1+y1",map1);
		
		qc = new QuestionContainer("Math",
			new ArrayList<Displayable> (Arrays.asList(
				new TextQuestion("What is "),
				new EquationQuestion(eq1)
			)
			)
		);
		quiz.addQuestionContainer(qc);

		qc = new QuestionContainer("Characterization",
			new ArrayList<Displayable> (Arrays.asList(
				new Video("1.mpg",0,0),
				new TextInstruction("Describe the main character in the video in 200 words or less"),
				new Essay()
			))
		);
		quiz.addQuestionContainer(qc);
		
		qc = new QuestionContainer("Listening Skills",
			new ArrayList<Displayable> (Arrays.asList(
				new TextInstruction("Listen to the audio clip and write down the words"),
				new Audio("1.mp3"),
				new FillIn(5,1,new Answer(new TextAnswer("words, words, words")))
			))
		);
		quiz.addQuestionContainer(qc);

		// create two random 3x3 matrices filled with integers [-3..3]
		Matrix m1 = new Matrix(3,3,-3,3);
		Matrix m2 = new Matrix(3,3,-3,3);
		// create a 3x3 matrix worth 1 point, level 1
		MatrixQuestion mq = new MatrixQuestion(1, 1, 3, 3);
		quiz.addQuestionContainer(qc = new QuestionContainer("Matrix Math",
				new ArrayList<Displayable> (Arrays.asList(
				new TextInstruction("Solve the matrix addition"),
				m1,
				new TextQuestion("+"),
				m2,
				mq
			))
		));

		return quiz;
	}
	
	public static Quiz test2() {
		Quiz quiz = new Quiz();
		quiz.setName("This has responses");
		Response r1 = new Response(
			new ArrayList<DisplayElement>(Arrays.asList(
				new TextResponse("Great job!"),
				new Video("1.mpg",0,0)
			))
		);
		Response r2 = new Response(
			new ArrayList<DisplayElement>(Arrays.asList(
				new TextResponse("Not quite right"), 
				new Video("2.mpg",0,0)
			))
		);
		
		QuestionContainer qc = new QuestionContainer(
			new ArrayList<Displayable> (Arrays.asList(
				new TextInstruction("Fill in the following code<br>"),
				new FillIn(1, 1, 1, new ArrayList<Answer>(Arrays.asList(
						new Answer(new TextAnswer("public"), true, r1)
				))),
				new TextQuestion("class A "),
				new FillIn(2, 1, 1, new ArrayList<Answer>(Arrays.asList(
						new Answer(new TextAnswer("{"), true, r1)
				))),
				new TextQuestion("<br>&nbsp;&nbsp;&nbsp;"),
				new FillIn(3, 1, 1, new ArrayList<Answer>(Arrays.asList(
						new Answer(new TextAnswer("private"), true, r1),
						new Answer(new TextAnswer("public"), false, r2)
				))),
				new TextQuestion(" int x;<br>&nbsp;&nbsp;&nbsp;"),
				new FillIn(4, 1, 1, new ArrayList<Answer>(Arrays.asList(
						new Answer(new TextAnswer("public"), true, r1)
				))),
				new FillIn(5, 1, 1, new ArrayList<Answer>(Arrays.asList(
						new Answer(new TextAnswer("A"), true, r1)
				))),
				new TextQuestion("() {<br>&nbsp;&nbsp;&nbsp;"),
				new TextQuestion("x = 2;<br>}")
			))
		);
		quiz.addQuestionContainer(qc);
		
		return quiz;
	}
	/*
	 * Create a multimedia quiz (video, audio, and questions)
	 */
	
	public static Quiz test3() {
		Quiz quiz = new Quiz();
		quiz.setName("Multimedia Quiz");
		QuestionContainer qc = new QuestionContainer("Multimedia Questions",
			new ArrayList<Displayable> (Arrays.asList(
				new Video("video1.mp4",480, 360),
				new TextQuestion("What is this video about?"),
				new MultiChoiceDropdown(4, 5,
					new ArrayList<>(Arrays.asList(
						new Answer(new TextAnswer("Train")),
						new Answer(new TextAnswer("Cable Car")), 
						new Answer(new TextAnswer("Bus"))
					))
				),
				new Audio("audio1.mp3"),
				new TextQuestion("What animal sounds like this?"),
				new MultiChoiceDropdown(4, 5,
					new ArrayList<>(Arrays.asList(
						new Answer(new TextAnswer("Cat")),
						new Answer(new TextAnswer("Dog")), 
						new Answer(new TextAnswer("Horse"))
					))
				)
			))
		);
		quiz.addQuestionContainer(qc);
		return quiz;
	}
	// Standard Choice with multipledropdown, multiple radio and multianswers 
	public static Quiz test4() {
		Quiz quiz = new Quiz();
		quiz.setName("Multiple- Quiz");
		QuestionContainer qc = new QuestionContainer("Complexity",
			new ArrayList<Displayable> (Arrays.asList(
//				new Text("Can all birds fly?"),
//				new MultiChoiceDropdown(1, 5, "Poll"),
				new TextQuestion("What is the complexity of BubbleSort?"),
				new MultiChoiceDropdown(1, 5, "Complexity", 2),
				new TextQuestion("<br>What is the complexity of QuickSort?"),
				new MultiChoiceRadio(1, 5, "Complexity") //,
//				new Text("What are the colors of an apple ?"),
//				new MultiAnswer(1, 5, "Colors", new int []{2,3}),
//				new Text("Name the insects:"),
//				new MultiAnswer(1, 5, "Insects", new int []{3,4,5})
	
			))
		);
		quiz.addQuestionContainer(qc);
		return quiz;
	}

	public static void writeHTML(String filename, Displayable d)
			throws IOException {
		FileWriter fw = new FileWriter(filename);
		fw.write(header);
		DisplayContext dc = new DisplayContext();
		d.writeHTML(dc);
		fw.write(dc.toString());
		fw.write(trailer);
		fw.close();
	}
	public static void writeJS(String filename, Displayable d) throws IOException {
		FileWriter fw = new FileWriter(filename);
		DisplayContext dc = new DisplayContext();
		d.writeJS(dc);
		fw.write(dc.toString());
		fw.close();		
	}

	public static void writeXML(String filename, Quiz quiz) throws IOException {
		XMLEncoder enc = new XMLEncoder(new BufferedOutputStream(new FileOutputStream(filename)));
		enc.writeObject(quiz);
		enc.close();
	}
//
//	public static Quiz readXML(String filename) throws IOException {
//		XMLDecoder dec = new XMLDecoder(new BufferedInputStream(new FileInputStream(filename)));
//		Quiz q = (Quiz)dec.readObject();
//		dec.close();
//		return q;
//	}
	public static void testOutput(String baseName, Displayable d) throws IOException {
		writeHTML(baseName + ".html", d); 
		writeJS(baseName + ".js", d);
//		if (d instanceof Quiz)
//			writeXML(baseName + ".xml", (Quiz)d); 
	}
	
	public static void main(String[] args) throws IOException {
//		testOutput("output/test1", test1());
//		testOutput("output/test2", test2());
//		testOutput("output/test3", test3());
//		testOutput("output/test4", test4());

		/*testing Course*/
//		Course testCourse = new Course(1, "Test Course");
//		testCourse.addQuiz(test1());
//		testCourse.addQuiz(test2());
//		testCourse.addQuiz(test3());
//		testCourse.addQuiz(test4());
//		testOutput("output/quizList", testCourse);
		Quiz q =  test();
		testOutput("output/quiz1",q);
	}

}
