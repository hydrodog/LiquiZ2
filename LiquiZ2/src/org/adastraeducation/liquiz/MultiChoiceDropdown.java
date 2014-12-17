package org.adastraeducation.liquiz;

import java.util.ArrayList;



public class MultiChoiceDropdown extends Question {
	protected Answer[] answers;
	protected StdChoice stdchoice;
	protected StdChoiceTwo sc;

	public MultiChoiceDropdown() {
	}
	public MultiChoiceDropdown(int level, int points) {
		super(level, points);
	}
	public MultiChoiceDropdown(int id, int level, int points, Answer[] answers) {
		super(id, level, points);
		this.answers = answers.clone();
	}

	public MultiChoiceDropdown(int level, int points, Answer[] answers) {
		super(level, points);
		this.answers = answers.clone();
	}
	
	//constructors with ArrayList<Answer> instead of Answer[]
	public MultiChoiceDropdown(int id, int level, int points, ArrayList<Answer> answers) {
		super(id, level, points, answers);
	}
	public MultiChoiceDropdown(int level, int points, ArrayList<Answer> answers) {
		super(level, points, answers);
	}

	public MultiChoiceDropdown(int level, int points, String stdChoiceName) {
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName);
	}
	// added a new method to accommodate the right answer choice
	public MultiChoiceDropdown(int level, int points, String stdChoiceName, int rightAns) {
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName, rightAns);
	}
	//constructors with StdChoiceTwo
	public MultiChoiceDropdown(int level, int points, StdChoiceTwo sc) {
		super(level, points);
		this.sc = sc;
	}
	public MultiChoiceDropdown(int id, int level, int points, StdChoiceTwo sc) {
		super(id, level, points);
		this.sc = sc;
	}

	public static MultiChoiceDropdown createRandomNum(int level, int points, Answer ans, int index, int choices) {
		// something to randomize the other Answer choices and put in ans among the array
		Answer answers[] = new Answer[choices];
		answers[index] = ans;
		for(int i = 0; i < answers.length; i++){
			if (answers[i].equals(null)) {
//				answers[i] = TODO: generate something random
			} else {
				continue;
			}
		}
		
		return new MultiChoiceDropdown(level, points, answers);
	}

	public String getTagName() {
		return "MultiChoice";
	}

	public Answer[] getAnswers() {
		return answers;
	}
	public void setAnswers(Answer[] ans) {
		this.answers = ans;
	}

	public void writeHTML(StringBuilder b) {
		// Standard Choice options
		if (stdchoice != null) {

			stdchoice.writeHTMLDropdown(b);

		} else {

			// Regular options
			b.append("<select>");
			for (int i = 0; i < answers.length; i++) {
				b.append("<option value='" + answers[i].getAnswer() + "'> "
						+ answers[i].getAnswer() + " </option> ");
			}
			b.append("</select>");
			b.append("</br>");
			b.append("</br>");
		}

	}

	public void writeJS(StringBuilder b) {
		b.append("multichoice([");
		for (int i = 0; i < answers.length; i++) {
			answers[i].writeJS(b);
		}
	}

	public void writeXML(StringBuilder b) {
		for (int i = 0; i < answers.length; i++)
			answers[i].writeXML(b);
	}
	@Override
	public boolean isCorrect(String s) {
		// TODO Auto-generated method stub
		return false;
	}
}
