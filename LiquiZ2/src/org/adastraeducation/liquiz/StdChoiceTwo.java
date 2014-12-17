package org.adastraeducation.liquiz;

import java.util.ArrayList;

/**
 * A full set of answers that go together
 * Differences with StdChoice: answers is an ArrayList, no HashMap (because stored in database)
 * @author yijinkang
 *
 */


public class StdChoiceTwo {
	private int id;
	private String name;
	private ArrayList<Answer> answers = new ArrayList<Answer>();
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String s){
		name = s;
	}
	
	public ArrayList<Answer> getAnswers(){
		return answers;
	}
	
	public void addAnswer(Answer a) {
		answers.add(a);
	}

	public StdChoiceTwo(String name) {
		this.name = name;
	}
	
	public StdChoiceTwo(String name, ArrayList<Answer> answers) {
		this.name = name;
		this.answers = answers;
	}
	
	public StdChoiceTwo(int id, String name, ArrayList<Answer> answers) {
		this.id = id;
		this.name = name;
		this.answers = answers;
	}

	public StdChoiceTwo(String name, ArrayList<Answer> answers, int rightAns) {
		this.name = name;
		this.answers = answers;
		setAnswer(rightAns);
	}

	public StdChoiceTwo(String name, ArrayList<Answer> answers, int[] rightAns) {
		this.name = name;
		this.answers = answers;
		setmultiAnswer(rightAns);	
	}

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


/*	private void hashMapStdChoice() {
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
	}*/
	
	public void writeHTMLDropdown(StringBuilder b){
		b.append("<select>");
		for (int i = 0; i < answers.size(); i++) {
			b.append("<option value='" + answers.get(i).getAnswer() + "'> "
					+ answers.get(i).getAnswer() + " </option> ");
		}
		b.append("</select>");
		b.append("</br>");
		
	}
	public void writeHTMLRadio(StringBuilder b) {
		
		for (int i = 0; i < answers.size(); i++){
			b.append("<input type=\"radio\" name='").append(name).append("'>")
					.append(answers.get(i).getAnswer()).append("<br>");}
		
	}

	

	public void writeHTMLMultiSelection(StringBuilder b) {
		b.append("<select multiple>");
		for (int i = 0; i < answers.size(); i++){
			b.append("<option value= '" + answers.get(i).getAnswer() + "'>"+ answers.get(i).getAnswer() +"  </option> ");
		 }
		b.append("</select>");
		b.append("</br>");
		// TODO Auto-generated method stub
		
	}
	public void writeXML(StringBuilder b) {
		for (int i = 0; i < answers.size(); i++)
			answers.get(i).writeXML(b);
	}

}
