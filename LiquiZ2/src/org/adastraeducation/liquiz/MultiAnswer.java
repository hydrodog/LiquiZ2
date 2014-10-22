package org.adastraeducation.liquiz;


public class MultiAnswer extends MultiChoiceDropdown {
	private Answer [] answers;

	public MultiAnswer() {
	}

	public MultiAnswer(int id, int level, int points, 
			Answer[] answers) {
		super(id, level, points, answers);
	}
	public MultiAnswer(int level, int points, 
			Answer[] answers) {
		super(level, points, answers);
	}
	
	public MultiAnswer(int level, int points, String stdChoiceName, int [] rightAns) {
		// TODO Auto-generated constructor stub
		super(level, points);
		stdchoice = new StdChoice(stdChoiceName, rightAns);
	}

	public String getTagName() {
		return "MultiAnswer";
	}

	//TODO: the html is wrong here, you need values between <option> and </option>
	public void writeHTML(StringBuilder b ){	
		if (stdchoice != null) {

			stdchoice.writeHTMLMultiSelection(b);

		} else {

		
			b.append("<select multiple>");
			for (int i = 0; i < answers.length; i++){
				b.append("<option value= '" + answers[i].getAnswer() + "'>"+ answers[i].getAnswer() +"  </option> ");
			 }
			b.append("</select>");
			b.append("</br>");
		}
       
	}
	public void writeJS(StringBuilder b ){
		for (int i = 0; i < answers.length; i++){
			b.append("new MultipleChoice(" +answers[i].getAnswer() +")");
		}
	}	
}
