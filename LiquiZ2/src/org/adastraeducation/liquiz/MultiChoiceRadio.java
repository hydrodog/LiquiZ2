package org.adastraeducation.liquiz;

import java.util.ArrayList;

public class MultiChoiceRadio extends MultiChoiceDropdown {
	public MultiChoiceRadio() {
	}

	public MultiChoiceRadio(int id, int level, int points,
				Answer[] answers) {
		super(id, level, points, answers);
	}
	public MultiChoiceRadio(int level, int points,
			Answer[] answers) {
	super(level, points, answers);
	}
	// same as above two constructors with ArrayList
	public MultiChoiceRadio(int id, int level, int points, ArrayList<Answer> answers) {
		super(id, level, points, answers);
	}
	public MultiChoiceRadio(int level, int points, ArrayList<Answer> answers) {
		super (level, points, answers);
	}
	
	public MultiChoiceRadio(int level, int points, String stdChoiceName) {
		super(level, points, stdChoiceName);

	}
	//constructors with StdChoiceTwo
	public MultiChoiceRadio(int level, int points, StdChoiceTwo sc) {
		super(level, points, sc);
	}
	public MultiChoiceRadio(int id, int level, int points, StdChoiceTwo sc) {
		super(id, level, points, sc);
	}

	public String getTagName() {
		return "MultiChoiceRadio";
	}

	
	public void writeHTML(StringBuilder b) {
		// Standard Choice options
		if (stdchoice != null) {

			stdchoice.writeHTMLRadio(b);

		} else {

			// Regular options
			b.append("<select>");
			for (int i = 0; i < answers.length; i++) {
				b.append("<option> <input type='radio' value= '" + answers[i].getAnswer() + "'> "+ answers[i].getAnswer() +" </option> ");
			}
			b.append("</select>");
			b.append("</br>");
			b.append("</br>");
		}

	}


	public void writeJS(StringBuilder b ) {
		for (int i = 0; i < answers.length; i++) {
			b.append("multichoice(").append(answers[i].getAnswer()).append(')');
		}
	}
	
	
}
