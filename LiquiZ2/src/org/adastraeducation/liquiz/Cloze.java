package org.adastraeducation.liquiz;

import java.util.ArrayList;

/**
 * Question with text and multiple fill-ins
 * @author yijinkang
 *
 */
public class Cloze extends Question implements java.io.Serializable{
	/************for testing************/
	public void printAll() {
		System.out.println(wAns);
		System.out.println(noAns);
		System.out.println("Correct Answers: ");
		for (Answer ans : getAns()) {
			System.out.println(ans.getName());
		}
	}
	
	public static void main(String[] args) {
		Cloze test = new Cloze(1, 1, "This is a [[test]] that will [[hopefully]] work!");
		
		DisplayContext dc = new DisplayContext();
		test.writeJS(dc);
		System.out.println(dc.toString());
		
		String[] testAns = {"test", "hopefully"};
		System.out.println("Points earned: " + test.grade(testAns));
	}
	
	/**
	 * wAns includes answers in brackets and is what gets stored in the database (Ex: "public [[class]] A{ }")
	 * noAns just has brackets (Ex: public [[]] A{ })
	 */
	private String noAns, wAns;
	
	public Cloze() {
	}
	
	public Cloze(int points, int level, String ques) {
		super(points, level, new ArrayList<Answer>());
		this.wAns = ques;
		removeAns();
		//printAll();
	}
	
	public Cloze(int id, int points, int level, String ques) {
		super(id, points, level, new ArrayList<Answer>());
		this.wAns = ques;
		removeAns();
		//printAll();
	}
	
	/**
	 * Uses the wAns String to assign noAns String and answers ArrayList<String>
	 */
	
	public void removeAns() {
		String string = wAns;
		int index = 0;
		while (index<string.length()) {
			int begin = string.indexOf("[[", index); 
			if (begin == -1) {
				break;
			}
			index = begin + 2;
			int end = string.indexOf("]]", index);
			String left = string.substring(0, begin+2);
			addAns(new Answer(new TextAnswer(string.substring(begin+2, end))));
			String right = string.substring(end);
			
			string = left + right;
		}
		noAns = string;
	}

	public void writeHTML(DisplayContext dc) {
		// TODO Auto-generated method stub
		
	}

	public void writeJS(DisplayContext dc) {
		if (dc.isDisplayResponses()) { // TODO how to store responses?
			if (dc.isDisplayAnswers()) {
				
			}
		} else {
			dc.append(",\n\t\t\t[\"cloze\", ").append(getId()).append(", ").appendQuotedJS(noAns).append("]");
		}
	}

	public void writeXML(StringBuilder b) {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * Answers from each fillin must be entered into a String array 
	 */
	public double grade(String[] s) {
		double pointsEach = (double) getPoints() / getAns().size();
		double earned = 0;
		for (int index = 0; index < getAns().size(); index++) {
			if (s[index].equals(getAns().get(index).getName())) {
				earned+=pointsEach;
			}
		}
		
		return earned;
	}

	public String getNoAns() {
		return noAns;
	}

	public void setNoAns(String noAns) {
		this.noAns = noAns;
	}

	public String getwAns() {
		return wAns;
	}

	public void setwAns(String wAns) {
		this.wAns = wAns;
	}

	@Override
	public String toString() {
		return "Cloze [id= " + getId() + ", noAns=" + noAns +"]";
	}

	
}
