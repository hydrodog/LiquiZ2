package org.adastraeducation.liquiz.test;
import org.adastraeducation.liquiz.equation.*;
import org.adastraeducation.liquiz.util.NumberWarningPattern;
import org.adastraeducation.liquiz.util.SpecializedPattern;

import java.io.*;
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
	public static Quiz test1() {
		Quiz quiz = new Quiz();
		quiz.setId(1);
		quiz.setName("Animals");
		// for multiChoiceDropDown
		QuestionContainer qc = new QuestionContainer(
			new Displayable[] {
				new Text("What is a dinosaur?"),
				new MultiChoiceDropdown(1, 1,
						new Answer[]{
							new Answer("T-Rex", true),
							new Answer("Shark"),
							new Answer("mouse")
						}
				)
			}
		);
		quiz.addQuestionContainer(qc);
		
		//for Equation and Fillin, no WarningPattern
		Var x = new Var("x", 0, 99, 1);
		Var y = new Var("y", 0, 99, 1);
		HashMap<String,Var> map = new HashMap<String,Var>();
		map.put("x",x);
		map.put("y", y);
		Equation eq = new Equation(	"x+y",map);
		
		qc = new QuestionContainer(
			new Displayable[] {
				new Text("What is "),
				eq,
				new Text("?"),
				new FillIn(3, 1, 1)
			}
			);
		quiz.addQuestionContainer(qc);
		
		//for Equation and Fillin, with WarningPattern
		Var x1 = new Var("x1", 0, 99, 1);
		Var y1 = new Var("y1", 0, 99, 1);
		HashMap<String,Var> map1 = new HashMap<String,Var>();
		map.put("x1",x1);
		map.put("y1", y1);
		Equation eq1 = new Equation(	"x1+y1",map);
		
		qc = new QuestionContainer(
			new Displayable[] {
				new Text("What is "),
				eq1,
				new Text("?"),
				new FillIn(40, 1, 1, null, new NumberWarningPattern(3),null,null)
			}
			);
		quiz.addQuestionContainer(qc);

		qc = new QuestionContainer(
				new Displayable[] {
					new Video("1.mpg"),
					new Text("Describe the main character in the video in 200 words or less"),
					new Essay()
				}
			);
		quiz.addQuestionContainer(qc);
		
		qc = new QuestionContainer(
				new Displayable[] {
					new Text("Listen to the audio clip and write down the words"),
					new Audio("1.mp3"),
					new FillIn(5,1,1)
				}
			);
		quiz.addQuestionContainer(qc);

		// create two random 3x3 matrices filled with integers [-3..3]
		Matrix m1 = new Matrix(3,3,-3,3);
		Matrix m2 = new Matrix(3,3,-3,3);
		// create a 3x3 matrix worth 1 point, level 1
		MatrixQuestion m3 = new MatrixQuestion(1, 1, 3, 3);
		quiz.addQuestionContainer(qc = new QuestionContainer(
			new Displayable[] {
				new Text("Solve the matrix addition"),
				m1,
				new Text("+"),
				m2,
				m3
			}
		));

		return quiz;
	}
	
	public static Quiz test2() {
		Quiz quiz = new Quiz();
		quiz.setName("This has responses");
		Response r1 = new Response(
			new Displayable[] {
				new Text("Great job!"),
				new Video("1.mpg")
			}
		);
		Response r2 = new Response(
			new Displayable[] {
				new Text("Not quite right"), 
				new Video("2.mpg"),
			}
		);
		/*
		QuestionContainer qc = new QuestionContainer(
			new Displayable[] {
				new Text("Fill in the following code"),
				new FillIn(1, 1, 1),
				new Text("class A "),
				new FillIn(2, 1, 1, "{"),
				new Text("\n  "),
				new FillIn(3, 1, 1, "private"),
				new Text(" int x;\n  "),
				new FillIn(4, 1, 1, "public"),
				new FillIn(5, 1, 1, "A"),
				new Text("() {\n"),
				new Text("  x = 2;\n}\n")
			}
		);
		quiz.addQuestionContainer(qc);
		*/
		return quiz;
	}
	/*
	 * Create a multimedia quiz (video, audio, and questions)
	 */
	
	public static Quiz test3() {
		Quiz quiz = new Quiz();
		quiz.setName("Multimedia Quiz");
		QuestionContainer qc = new QuestionContainer(
			new Displayable[] {
				new Video("video1.mp4",480, 360,"video/mp4"),
				new Text("What is this video about ?"),
				new MultiChoiceDropdown(4, 5,
				new Answer[] {new Answer("Train"),
				    new Answer("Cable Car"), new Answer("Bus")
				  }),
				new Audio("audio1.mp3", "audio/mpeg"),
				new Text("What animal sounds like this ?"),
				new MultiChoiceDropdown(4, 5,
						new Answer[] {new Answer("Cat"),
						    new Answer("Dog"), new Answer("Horse")
				})
			}
		);
		quiz.addQuestionContainer(qc);
		return quiz;
	}
	// Standard Choice with multipledropdown, multiple radio and multianswers 
	public static Quiz test4() {
		Quiz quiz = new Quiz();
		quiz.setName("Multiple- Quiz");
		QuestionContainer qc = new QuestionContainer(
			new Displayable[] {
				new Text("Can all birds fly ?"),
				new MultiChoiceDropdown(1, 5, "Poll"),
				new Text("What is the complexity of BubbleSort ?"),
				new MultiChoiceDropdown(1, 5, "Complexity", 2),
				new Text("What is the complexity of QuickSort?"),
				new MultiChoiceRadio(1, 5, "Complexity"),
				new Text("What are the colors of an apple ?"),
				new MultiAnswer(1, 5, "Colors", new int []{2,3}),
				new Text("Name the insects:"),
				new MultiAnswer(1, 5, "Insects", new int []{3,4,5})
	
			}
		);
		quiz.addQuestionContainer(qc);
		return quiz;
	}

	public static void writeHTML(String filename, Displayable d)
			throws IOException {
		FileWriter fw = new FileWriter(filename);
		fw.write(header);
		StringBuilder b = new StringBuilder(65536);
		d.writeHTML(b);
		fw.write(b.toString());
		fw.write(trailer);
		fw.close();
	}
	public static void writeJS(String filename, Displayable d) throws IOException {
		FileWriter fw = new FileWriter(filename);
		StringBuilder b = new StringBuilder(65536);
		d.writeJS(b);
		fw.write(b.toString());
		fw.close();		
	}

	public static void writeXML(String filename, Quiz quiz) throws IOException {
		XMLEncoder enc = new XMLEncoder(new BufferedOutputStream(new FileOutputStream(filename)));
		enc.writeObject(quiz);
		enc.close();
	}

	public static Quiz readXML(String filename) throws IOException {
		XMLDecoder dec = new XMLDecoder(new BufferedInputStream(new FileInputStream(filename)));
		Quiz q = (Quiz)dec.readObject();
		dec.close();
		return q;
	}
	public static void testOutput(String baseName, Displayable d) throws IOException {
		writeHTML(baseName + ".html", d); 
		writeJS(baseName + ".js", d);
		if (d instanceof Quiz)
			writeXML(baseName + ".xml", (Quiz)d); 
	}
	
	public static void main(String[] args) throws IOException {
		testOutput("output/test1", test1());
//		testOutput("output/test2", test2());
		testOutput("output/test3", test3());
		
		/*testing Course*/
		Course testCourse = new Course("ID", "Test Course");
		testCourse.addQuiz(test1());
		testCourse.addQuiz(test2());
		testCourse.addQuiz(test3());
		testCourse.addQuiz(test4());
		testOutput("output/testCourse", testCourse);
	}

}
