package org.adastraeducation.liquiz;
/**
 * Contains flags and information that writeHTML will need
 * @author yijinkang
 *
 */
public class DisplayContext {
	private StringBuilder b;
	StudentResponses sr;
	boolean displayResponses; // Shows student's response
	boolean displayAnswers; // Shows student's response and the Response (feedback) and correct answers
	
	public DisplayContext() { // use getters/setters to set individual flags
		b = new StringBuilder();
		displayResponses = false;
		displayAnswers = false;
	}
	
	public DisplayContext append(String s) {
		b.append(s);
		return this;
	}
	public DisplayContext append(char c) {
		b.append(c);
		return this;
	}
	public DisplayContext append(int i) {
		b.append(i);
		return this;
	}
	public DisplayContext append(double d) {
		b.append(d);
		return this;
	}
	public String toString() {
		return b.toString();
	}
	public boolean isDisplayResponses() {
		return displayResponses;
	}
	public void setDisplayResponses(boolean displayResponses) {
		this.displayResponses = displayResponses;
	}
	public boolean isDisplayAnswers() {
		return displayAnswers;
	}
	public void setDisplayAnswers(boolean displayAnswers) {
		this.displayAnswers = displayAnswers;
		if(displayAnswers) {
			displayResponses = true; // if displaying answers, display responses as well
		}
	}

	public StudentResponses getStudentResponses() {
		return sr;
	}

	public void setStudentResponses(StudentResponses sr) {
		this.sr = sr;
	}
	
}
