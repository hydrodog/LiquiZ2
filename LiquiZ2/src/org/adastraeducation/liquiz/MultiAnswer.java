package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;


public class MultiAnswer extends MultiChoiceDropdown {
		
	/**********************Added getter and setter for serialization********************************/
//	TODO: change serialization to use getAnsAsArray() and setAns() in Question class

	public MultiAnswer() {
	}
	
	public MultiAnswer(int id, int points, int level, ArrayList<Answer> answers) {
		super(id, points, level, answers);
	}
	public MultiAnswer(int points, int level, ArrayList<Answer> answers) {
		super(points, level, answers);
	}
	
	public MultiAnswer(int points, int level, String stdChoiceName, int [] rightAns) {
		super(points, level, stdChoiceName);
		for (int i : rightAns) {
			this.getAns().get(i).setCorrect(true);
		}
	}
	
	public MultiAnswer(int id, int points, int level) {
		super (id, points, level);
	}

	//TODO: Override IsCorrect()
	
	public void writeHTML(StringBuilder b ){
		
		b.append("<select name='").append(getId()).append("' form='quizForm' multiple>\n");
		for (Answer ans : getAns()){
			b.append("<option value= '").append(ans.getName()).append("'>");
			ans.writeHTML(b);
			b.append("  </option>\n ");
		 }
		b.append("</select>\n");
       
	}
	public void writeJS(StringBuilder b ){
		Util.writeAnsListAsJS("multiAnswer", getAns(), b);
	}	
}
