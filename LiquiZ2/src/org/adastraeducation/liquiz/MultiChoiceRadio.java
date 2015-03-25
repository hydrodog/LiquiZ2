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
	
	public void writeHTML(StringBuilder b) {
	
		for (Answer ans : this.getAns()) {
			b.append("<input type='radio' value= '" + ans.getName() + "'> ");
			ans.writeHTML(b);
			b.append(" </br>\n ");
		}
		
		b.append("</br>");
		b.append("</br>\n");

	}

	public void writeJS(StringBuilder b ) {
		Util.writeAnsListAsJS("radio", getAns(), b);
	}
	
	
}
