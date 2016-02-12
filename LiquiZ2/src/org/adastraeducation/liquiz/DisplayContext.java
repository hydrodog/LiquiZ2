package org.adastraeducation.liquiz;

import java.util.ArrayList;

/**
 * Contains flags and information that writeHTML will need
 * @author yijinkang
 * Also adds convenience functions for output
 *
 */
public class DisplayContext implements java.io.Serializable{
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
	public DisplayContext append(boolean bool) {
		b.append(bool);
		return this;
	}
	
	public DisplayContext remove(){
		b.deleteCharAt(b.length()-1);
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
	
	private static String[] mlEscapeMap;
	private static String[] quotedEscapeMap;
	static {
		mlEscapeMap = new String[256];
		quotedEscapeMap = new String[256];
		mlEscapeMap['\n'] = "\\n";
		mlEscapeMap['\\'] = "\\\\";
		mlEscapeMap['&'] = "&amp;";
		mlEscapeMap['<'] = "&lt;";
		mlEscapeMap['>'] = "&gt;";
		System.arraycopy(mlEscapeMap, 0, quotedEscapeMap, 0, mlEscapeMap.length);
		quotedEscapeMap['\\'] = "\\";  
		quotedEscapeMap['\''] = "\"";  // this is the preferred quote to use in our javascript since we use " in java
		quotedEscapeMap['"'] = "\""; // escape quoted strings, we prefer single quotes ' but just in case...
	}
	public final DisplayContext appendQuotedJS(String s) {
		append('\"');
		appendEscaped(s);
		append('\"');
		return this;
	}

	public final DisplayContext appendJS(PayLoad pl) {
		
		append("{").append("\n\t\t\tpolicy:").appendQuotedJS(pl.getPolicy().toString()).
		append(",\n\t\t\ttitle:").appendQuotedJS(pl.getTitle().toString()).
		append(",\n\t\t\tpoints:").append(pl.getPoints()).
		append(",\n\t\t\ttimeLimit:").append(pl.getTimeLimit()).
		append(",\n\t\t\tremainingTries:").append(pl.getRemainingTries()). //TODO: need count of user's tries
		append(",\n\t\t\tdataDir:").append(pl.getDataDir()).
		append(",\n\t\t\teditMode:").append(pl.isEditMode());
		return this;
	}
	// TODO: make this escape strings in single quotes
	public final DisplayContext appendEscaped(String s) {
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= quotedEscapeMap.length) {
				append(c);
			} else {
				String esc = quotedEscapeMap[s.charAt(i)];
				if (esc == null)
					append(c);
				else
					append(esc);
			}
		}
		return this;
	}
	public final DisplayContext append(ArrayList<Displayable> list) {
		append("[");
		for (Displayable d : list) {
			d.writeJS(this);
		}
		append("]");
		return this;
	}	
	public final DisplayContext append2D(ArrayList< ArrayList<Displayable> > list) {
		append("[");
		for (int i = 0; i < list.size(); i++)
			append(list.get(i)).append(",\n");
		append("]");
		return this;
	}	
}
