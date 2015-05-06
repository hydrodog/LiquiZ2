package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class MultiChoiceRadio extends MultiChoiceDropdown {
	public MultiChoiceRadio() {
	}

	public MultiChoiceRadio(int id, int points, int level, ArrayList<Answer> answers) {
		super(id, points, level, answers);
	}
	public MultiChoiceRadio(int points, int level, ArrayList<Answer> answers) {
		super (points, level, answers);
	}
	
	public MultiChoiceRadio(int points, int level, String stdChoiceName) {
		super(points, level, stdChoiceName);
	}

	public MultiChoiceRadio(int id, int points, int level, String stdChoiceName) {
		super(id, points, level, stdChoiceName);
	}
	
	public MultiChoiceRadio(int id, int points, int level) {
		super(id, points, level);
	}
	
	public void writeHTML(DisplayContext dc) {
		if (dc.isDisplayResponses()) {
			String[] answer = {"Your answer here"};
			if (dc.getStudentResponses() != null) {
				answer = dc.getStudentResponses().getLatestResponse(getId());
			}
			
			dc.append("<div class='radio'>\n");
			for (Answer ans : getAns()) {
				dc.append("<input type='radio' disabled");
				for (String res : answer) {
					if (res.equals(ans.getName())) {
						dc.append(" checked");
						break;
					}
				}
				dc.append(">");
				ans.writeHTML(dc);
				dc.append("<br>\n");
			}
			dc.append("</div>\n");
			
			//TODO teacher's response?
			
			boolean hasAnswer = false;
			for (Answer ans : getAns()) {
				if (ans.getCorrect()) {
					hasAnswer = true;
					break;
				}
			}
			if(dc.isDisplayAnswers() && hasAnswer) { //TODO think of a sleeker way to represent this
				dc.append("Correct answer(s): ");
				for (Answer ans : getAns()) {
					if(ans.getCorrect()) {
						dc.append("<br>");
						dc.append(ans.getName());
					}
				}
			} 
		} else {
			dc.append("<div class='radio'>\n");
			for (Answer ans : this.getAns()) {
				dc.append("<input type='radio' name='" + getId() + "' value='" + ans.getName() + "'> ");
				ans.writeHTML(dc);
				dc.append(" <br>\n ");
			}
			
			dc.append("</div>\n");
		}
	}

	public void writeJS(StringBuilder b ) {
		Util.writeAnsListAsJS("radio", getAns(), b);
	}
	
}
