package org.adastraeducation.liquiz.test;


import java.util.ArrayList;

import org.adastraeducation.liquiz.*;
public class TestQuizJavascript {
	public static void main(String[] a) {
		int qid=1;
		int qcid=1;
		Policy p = new Policy();
		Quiz quiz = new Quiz(1, "Java1", "Java Quiz 1", p);
		QuestionContainer qc = 
				new QuestionContainer(qcid++, "Operators", "fillin", new ArrayList<Displayable>());
		qc.add(new Text("What is 2+2?"));
		qc.add(new Image("dinosaur.jpg", 100, 100));
		ArrayList<Answer> answers = new ArrayList<Answer>();
		answers.add(new Answer(new Text("4"), true));
		qc.add(new FillIn(qid++, 1, 1, answers));
		DisplayContext dc = new DisplayContext();
		qc=new QuestionContainer(qcid++,"Java","code",new ArrayList<Displayable>());
		
		qc.add(new Text("Complete the code below so that it prints 'hello'"));
		qc.add(new Code(qid++,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n"));
		quiz.addQuestion(qc);
		quiz.writeJS(dc);
		System.out.println(dc.toString());
	}
	
}
