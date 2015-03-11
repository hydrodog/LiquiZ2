package org.adastraeducation.liquiz;

/*
 * author: together
 * It is for answers for every question
 */

public class Answer implements Displayable {
	private int id;
	private String ans;
	private Displayable gAns;
	private boolean correct;
	private int index;// for standard choice
	private String width; // for graphical answer
	private String height;// for graphical answer	
	private Response res; // Response
	
	
	public Answer(String ans, boolean correct) {
		this.ans = ans;
		this.correct = correct;
	}
	public Answer(String ans) {
		this(ans, false);
	}
	public Answer(Displayable ans, boolean correct, Response r) {
		gAns = ans;
		this.correct = correct;
		res = r;
	}
	public Answer(Displayable ans, boolean correct) {
		gAns = ans;
		this.correct = correct;
	}
	public Answer(int id, Displayable ans, boolean correct) {
		this.id = id;
		gAns = ans;
		this.correct = correct;
	}
	public Answer(Displayable ans) {
		this(ans, false);
	}
	//public Answer() { this(null, false); }
	
	public Answer(String ans, int index) {
		this.ans = ans;
		this.index = index;
		this.correct = false;
	}
	public Answer(Displayable ans, int index) {
		gAns = ans;
		this.index = index;
		this.correct = false;
	}
	public Answer(String ans, int index, boolean correct) {
		this.ans = ans;
		this.index = index;
		this.correct = correct;
	}
    public Answer(Displayable ans, int index, boolean correct) {
    	gAns = ans;
		this.index = index;
		this.correct = correct;
	}
    
    public String getAnswer() {
    	return ans;
    }
    public void setAnswer(String ans) {
    	this.ans = ans;
    }
	public Displayable getGAns() {
		return gAns;
	}
	public void setGAns(Displayable ans) {
		gAns = ans;
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

	public void setCorrect(boolean correct){
		this.correct = correct;
	}
	public  boolean getCorrect(){
		return correct;
	}
	
	public void setResponse(Response r) {
		res = r;
	}
	
	public Response getResponse() {
		return res;
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
