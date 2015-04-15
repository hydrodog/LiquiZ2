package org.adastraeducation.liquiz;
import org.adastraeducation.liquiz.util.*;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Represent a single question with regex pattern for right answer
 * Yingzhu 
 */
public class RegexQuestion extends FillIn {	
	private Pattern pattern; // match to determine if correct
	private String warning; // sent to client so javascript can check if answer is in the right form
	
	public RegexQuestion() {
		// TODO Auto-generated constructor stub
	}
	
	public RegexQuestion(int id, int points, int level, String regex, String warning) {
		super(id,points,level,(ArrayList<Answer>) null);
		this.pattern = Pattern.compile(regex);
		this.warning = warning;
	}

	public void setPattern(String regex){
		this.pattern=Pattern.compile(regex);
	}
	
	public String getPattern(){
		return pattern.toString();
	}
	
	public void setWarning(String warning) {
		this.warning = warning;
	}
	
	public String getWarning() {
		return warning;
	}

	/*
	 * Returns true if regex pattern matches typed answer
	 */
	public int grade(String s) {
		Matcher m = pattern.matcher(s);
		if(m.matches()) {
			return getPoints();
		}
		return 0;
	}
	
	//<input id='123' class='fillin' type='text' onblur='showWarningPattern(this, "\\d\\d\\d")'/> 
	public void writeHTML(StringBuilder b) {
		b.append("<input id='").append(getId()).append("' class='fillin' type='text' ");
		if(warning != null) {
			b.append("onblur='showWarningPattern(this, \"").append(Util.escapeRegex(warning)).append("\")'/>\n");
			b.append(" <div id=\"FW").append(this.getId()).append("\"");
		}
		b.append("/>\n");
	}
}
