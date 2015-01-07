package org.adastraeducation.liquiz;

import java.util.ArrayList;


public class MultiAnswer extends MultiChoiceDropdown {
	private Answer [] answers; // would like to switch to ArrayList<Answer> in Question class
	
	// There are duplicate getters and setters now plus the one in the Question parent class -Yijin
	
	/**********************Added getter and setter for serialization********************************/
	public Answer[] getAnswer(){
		return answers;
	}
	
	public void setAnswer(Answer[] a){
		answers = a;
	}
	
//	public Answer[] getAnswers() {
//		return answers;
//	}
//	public void setAnswers(Answer[] answers) {
//		this.answers = answers;
//	}

	public MultiAnswer() {
	}

	public MultiAnswer(int id, int level, int points, 
			Answer[] answers) {
		super(id, level, points, answers);
	}
	public MultiAnswer(int level, int points, 
			Answer[] answers) {
		super(level, points, answers);
	}
	
	// same as above two constructors but with ArrayList
	public MultiAnswer(int id, int level, int points, ArrayList<Answer> answers) {
		super(id, level, points, answers);
	}
	public MultiAnswer(int level, int points, ArrayList<Answer> answers) {
		super(level, points, answers);
	}
	
	public MultiAnswer(int level, int points, String stdChoiceName, int [] rightAns) {
		// TODO Auto-generated constructor stub
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName, rightAns);
	}
	

	//TODO: Override IsCorrect()
	
	public String getTagName() {
		return "MultiAnswer";
	}
	
	public void writeHTML(StringBuilder b ){	
		if (stdchoice != null) {

			stdchoice.writeHTMLMultiSelection(b);

		} else {

		
			b.append("<select multiple>");
			for (int i = 0; i < answers.length; i++){
				b.append("<option value= '" + answers[i].getAnswer() + "'>"+ answers[i].getAnswer() +"  </option> ");
			 }
			b.append("</select>");
			b.append("</br>");
		}
       
	}
	public void writeJS(StringBuilder b ){
		for (int i = 0; i < answers.length; i++){
			b.append("new MultipleChoice(" +answers[i].getAnswer() +")");
		}
	}	
}
