package org.adastraeducation.liquiz;

/*
 * author: together
 * It is for answers for every question
 */

public class Answer implements Displayable {
	private String ans;
	private boolean correct;
	private int index;// for standard choice
	private String width; // for graphical answer
	private String height;// for graphical answer	
	
	public Answer(String ans, boolean correct) {
		this.ans = ans;
		this.correct = correct;
	}
	public Answer(String ans) {
		this(ans, false);
	}
	public Answer() { this(null, false); }
	
    public Answer(int index, String ans) {
		this.ans = ans;
		this.index = index;
		this.correct = false;
	}
    public Answer(int index, String ans, boolean correct) {
		this.ans = ans;
		this.index = index;
		this.correct = correct;
	}
    
	public String getAns() {
		return ans;
	}
	public void setAns(String ans) {
		this.ans = ans;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public void setAnswer(String answer){
		ans = answer;
	}
	public String getAnswer(){
		return ans;
	}
	public void setCorrect(boolean correct){
		this.correct = correct;
	}
	public  boolean getCorrect(){
		return correct;
	}
	
	//TODO: Dov says add graphical answer back in here once it works
	public String graphanswer(){
		return "<input type=\"radio\" value = " + ans + "\" alt=\"" + ans + "\" width=\""+ width+"\" height=\""+height+"\"><br>";
	}

	public void writeHTML(StringBuilder b) {
		b.append("<input type='radio' name='")
				.append(ans).append("'>").append("<br>");
		
	}
	public void writeJS(StringBuilder b) {
		b.append('\'').append(ans).append('\'');
	}
	public void writeXML(StringBuilder b) {
		if (correct) {
			b.append("<A correct = 't'>");
		} else {
			b.append("<A>");
		}
		b.append(ans).append("</A>");
	}
}
