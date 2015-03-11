package org.adastraeducation.liquiz;

import java.util.ArrayList;


public class MultiAnswer extends MultiChoiceDropdown {
		
	/**********************Added getter and setter for serialization********************************/
//	TODO: change serialization to use getAnsAsArray() and setAns() in Question class

	public MultiAnswer() {
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
		
		Answer[] ans = this.getAnsAsArray();
		
		if (stdchoice != null) {

			stdchoice.writeHTMLMultiSelection(b);

		} else {

		
			b.append("<select multiple>\n");
			for (int i = 0; i < ans.length; i++){
				b.append("<option value= '");
				ans[i].getGAns().writeHTML(b);
				b.append("'>");
				ans[i].getGAns().writeHTML(b);
				b.append("  </option>\n ");
			 }
			b.append("</select>\n");
			b.append("</br>\n");
		}
       
	}
	public void writeJS(StringBuilder b ){
		Answer[] ans = this.getAnsAsArray();
		for (int i = 0; i < ans.length; i++){
			b.append("new MultipleChoice(");
			ans[i].getGAns().writeHTML(b);
			b.append(")");
		}
	}	
}
