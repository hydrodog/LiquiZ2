package org.adastraeducation.liquiz;

public class DisplayContext {
	private StringBuilder b;
	boolean displayResponses;
	boolean displayAnswers;
	
	public DisplayContext() { // use getters/setters to set individual flags
		b = new StringBuilder();
		displayResponses = false;
		displayAnswers = false;
	}
	
	public DisplayContext append(String s) {
		b.append(s);
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
	}
}
