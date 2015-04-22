package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class MultiChoiceDropdown extends Question {
	public MultiChoiceDropdown(int id, int points, int level, ArrayList<Answer> answers) {
		super(id, points, level, answers);
	}
	
	public MultiChoiceDropdown(int id, int points, int level, String stdChoiceName) {
		super(id, points, level, NamedObjects.getStdChoice(stdChoiceName));
	}
	
	public MultiChoiceDropdown() {
	}
	
	public MultiChoiceDropdown(int points, int level) {
		super(points, level);
	}
	
	public MultiChoiceDropdown(int points, int level, ArrayList<Answer> answers) {
		super(points, level, answers);
	}

	public MultiChoiceDropdown(int points, int level, String stdChoiceName) {
		this(points, level, NamedObjects.getStdChoice(stdChoiceName));
	}
	// added a new method to accommodate the right answer choice
	public MultiChoiceDropdown(int points, int level, String stdChoiceName, int rightAns) {
		this(points, level, NamedObjects.getStdChoice(stdChoiceName));
		this.getAns().get(rightAns).setCorrect(true);
	}
	
	public MultiChoiceDropdown(int id, int points, int level) {
		super(id, points, level);
	}
	
	public double grade(String[] s) {
		ArrayList<Answer> answers = this.getAns();
		for (int i = 0; i < answers.size(); i++) {
			if (answers.get(i).getCorrect() && s[0].equals(answers.get(i).getName())) {
				return (double) getPoints();
			}
		}
		return 0;
	}

	public void writeHTML(StringBuilder b) {
		// Regular options
		b.append("<select name='").append(getId()).append("' form='quizForm'>\n");
		for (Answer ans : getAns()) {
			b.append("<option value='" + ans.getName() + "'> ");
			ans.writeHTML(b);
			b.append(" </option> \n");
		}
		b.append("</select>\n");
	}

	public void writeJS(StringBuilder b) {
		Util.writeAnsListAsJS("dropdown", getAns(), b);
	}

	public void writeXML(StringBuilder b) {
		for (Answer ans : getAns())
			ans.writeXML(b);
	}
}
