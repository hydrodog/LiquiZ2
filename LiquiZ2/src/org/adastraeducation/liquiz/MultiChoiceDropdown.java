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

	public void writeHTML(DisplayContext dc) {
		if (dc.isDisplayResponses()) {
			String[] answer = {"Your answer here"};
			if (dc.getStudentResponses() != null) {
				answer = dc.getStudentResponses().getLatestResponse(getId());
			}
			
			dc.append("<select disabled>\n");
			for (Answer ans : getAns()) {
				dc.append("<option value='").append(ans.getName()).append("'");
				for (String res : answer) {
					if (res.equals(ans.getName())) {
						dc.append(" selected");
						break;
					}
				}
				dc.append(">");
				ans.writeHTML(dc);
				dc.append("</option>\n");
			}
			dc.append("</select><br>\n");
			
			// TODO How to format these responses better?
			if(answer.length > 0) {
				Response res = getResponseFor(answer[0]);
				if (res != null) { 
					if (Score.correctQues(getId(), answer) == getPoints()) {
						dc.append("<span class='response correct'>");
					} else {
						dc.append("<span class='response'>");
					}
					res.writeHTML(dc);
					dc.append("</span>");
				}
			}
			
			boolean hasAnswer = false;
			for (Answer ans : getAns()) {
				if (ans.getCorrect()) {
					hasAnswer = true;
					break;
				}
			}
			if(dc.isDisplayAnswers() && hasAnswer) { //TODO think of a sleeker way to represent this
				dc.append("<span class='answersHead'>Correct answer(s): </span>");
				for (Answer ans : getAns()) {
					if(ans.getCorrect()) {
						dc.append("<br>");
						dc.append(ans.getName());
					}
				}
			} 
		} else {
			// Regular options
			dc.append("<select name='").append(getId()).append("' form='quizForm'>\n");
			for (Answer ans : getAns()) {
				dc.append("<option value='" + ans.getName() + "'> ");
				ans.writeHTML(dc);
				dc.append(" </option> \n");
			}
			dc.append("</select>\n");
		}
	}

	public void writeJS(DisplayContext dc) {
		writeJS("mcRadio", dc);
		Util.writeAnsListAsJS(getAns(), dc);
		dc.append('(');
	}

	public void writeXML(StringBuilder b) {
		for (Answer ans : getAns())
			ans.writeXML(b);
	}
}
