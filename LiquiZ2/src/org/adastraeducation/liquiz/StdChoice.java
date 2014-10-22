package org.adastraeducation.liquiz;


import java.util.HashMap;


public class StdChoice {
	private String name;
	private Answer[] answers;
	private HashMap<String, Answer[]> opinion = new HashMap<String, Answer[]>();
	

	public StdChoice(String name ) {
		this.name = name;
		hashMapStdChoice();
		this.answers =  opinion.get(name);
	}


	public StdChoice(String name, int rightAns) {
		this.name = name;
		hashMapStdChoice();
		this.answers =  opinion.get(name);
		setAnswer(rightAns);
	}

	 public StdChoice(String name, int[] rightAns) {
    	this.name = name;
		hashMapStdChoice();
		this.answers =  opinion.get(name);
		setmultiAnswer(rightAns);	}



	// this method will set the right answer to multidropdown and multiradio
	public void setAnswer(int rightAns) {
		for (Answer ans: answers){
			if (ans.getIndex()== rightAns){
				ans.setCorrect(true);
				break;
			}
		}
	}
	// this method will set the multiple right answers 
	private void setmultiAnswer(int[] rightAns) {
		for (Answer ans: answers){
			for (int i :rightAns){
				if (ans.getIndex()== i){
					ans.setCorrect(true);
					break;
				}
			}
		}		
	}


	private void hashMapStdChoice() {
		opinion = new HashMap<String, Answer[]>();

		opinion.put("Poll", new Answer[] {new Answer("Strongly Agree"),
			    new Answer("Agree"), new Answer("No Opinion"),
			    new Answer("Disagree"),new Answer("Strongly Disagree")
			  });
		opinion.put("Complexity",  new Answer[] {
			    new Answer(1,"O(1)"),new Answer(2,"O(n)"),new Answer(3,"O(n^2)"),
			    new Answer(4,"O(n^3)"),new Answer(5,"O(n logn)")
			  });
		opinion.put("Colors",  new Answer[] {
			    new Answer(1,"Blue"),new Answer(2,"Red"),new Answer(3,"Green"),
			    new Answer(4,"Orange"),new Answer(5,"Purple")
			  });
		opinion.put("Insects",  new Answer[] {
			    new Answer(1,"Dog"),new Answer(2,"Cat"),new Answer(3,"Grasshopper"),
			    new Answer(4,"Butterfly"),new Answer(5,"Ladybug")
			  });
	}
	
	public void writeHTMLDropdown(StringBuilder b){
		b.append("<select>");
		for (int i = 0; i < answers.length; i++) {
			b.append("<option value='" + answers[i].getAnswer() + "'> "
					+ answers[i].getAnswer() + " </option> ");
		}
		b.append("</select>");
		b.append("</br>");
		
	}
	public void writeHTMLRadio(StringBuilder b) {
		
		for (int i = 0; i < answers.length; i++){
			b.append("<input type=\"radio\" name='").append(name).append("'>")
					.append(answers[i].getAnswer()).append("<br>");}
		
	}

	

	public void writeHTMLMultiSelection(StringBuilder b) {
		b.append("<select multiple>");
		for (int i = 0; i < answers.length; i++){
			b.append("<option value= '" + answers[i].getAnswer() + "'>"+ answers[i].getAnswer() +"  </option> ");
		 }
		b.append("</select>");
		b.append("</br>");
		// TODO Auto-generated method stub
		
	}
	public void writeXML(StringBuilder b) {
		for (int i = 0; i < answers.length; i++)
			answers[i].writeXML(b);
	}

}
