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
		if(dc.isDisplayAnswers()) {
			
		} else if (dc.isDisplayResponses()) {
			
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
