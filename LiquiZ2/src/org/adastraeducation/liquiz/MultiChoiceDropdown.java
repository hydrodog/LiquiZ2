package org.adastraeducation.liquiz;



public class MultiChoiceDropdown extends Question {
	protected Answer[] answers;
	protected StdChoice stdchoice;
	

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

	public MultiChoiceDropdown(int level, int points, String stdChoiceName) {
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName);
	}
	// added a new method to accommodate the right answer choice
	public MultiChoiceDropdown(int level, int points, String stdChoiceName, int rightAns) {
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName, rightAns);
	}

	public String getTagName() {
		return "MultiChoice";
	}

	public Answer[] getAnswers() {
		return answers;
	}
	public void setAnswers(Answer[] answers) {
		this.answers = answers;
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
