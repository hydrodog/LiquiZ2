package org.adastraeducation.liquiz;

/*
 * author: together
 * It is for answers for every question
 */

public class Answer implements Displayable, Cloneable, java.io.Serializable{
	private int id;
	private DisplayElement ans;
	private boolean correct;
	private int index;// for standard choice
	private Response res; // Response
	
	public Answer(int id, DisplayElement ans, boolean correct, Response r) {
		this.id = id;
		this.ans = ans;
		this.correct = correct;
		res = r;
	}
	
	public Answer(DisplayElement ans, boolean correct, Response r) {
		this(-1, ans, correct, r);
	}
	public Answer(DisplayElement ans, boolean correct) {
		this(ans, correct, null);
	}
	public Answer(DisplayElement ans) {
		this(ans, false, null);
	}
	public Answer() { this(null, false, null); }
	
	public Answer(DisplayElement ans, int index) {
		this.ans = ans;
		this.index = index;
		this.correct = false;
	}

    public Answer(DisplayElement ans, int index, boolean correct) {
    		this.ans = ans;
		this.index = index;
		this.correct = correct;
	}
    
	public DisplayElement getAnswer() {
		return ans;
	}
	public void setAnswer(DisplayElement ans) {
		this.ans = ans;
	}
	public String getName() {
		return ans.getName();
	}
	public int getIndex() {
		return index;
	}
	public int getID() {
		return id;
	}
	public void setIndex(int index) {
		this.index = index;
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
	
	public Answer clone() {
		return new Answer(id, ans, correct, res);
	}

	public void writeHTML(DisplayContext dc) {
		ans.writeHTML(dc);
		
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append('\'').append(ans.getName()).append('\'');
	}
	public void writeXML(StringBuilder b) {
		if (correct) {
			b.append("<A correct = 't'>");
		} else {
			b.append("<A>");
		}
		ans.writeXML(b);
		b.append("</A>");
	}

	@Override
	public String toString() {
		return "Answer [ans=" + ans + "]";
	}
	
	
}
