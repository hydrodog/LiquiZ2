package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class Essay extends Question {
	private String defaultText;
	public Essay() {
		defaultText = "";
	}

	public Essay(int id, int level, int points,
				String defaultText) {
		super(id, level, points, (ArrayList<Answer>) null);
		this.defaultText = defaultText;
	}
	
	/*******************Added getter and setter for serialization*************************/
	public String getdefaultText(){
		return defaultText;
	}
	
	public void setdefaultText(){
		this.defaultText = "";
	}

	public String getDefaultText() {
		return defaultText;
	}

	public void setDefaultText(String defaultText) {
		this.defaultText = defaultText;
	}

	public String getTagName() {
		return "Essay";
	}

	public void writeHTML(DisplayContext dc ){
		if (dc.isDisplayResponses()) {
			dc.append("<textarea disabled rows='10' cols='50'>");
			String[] answer = {"Your answer here"};
			if (dc.getStudentResponses() != null) {
				answer = dc.getStudentResponses().getLatestResponse(getId());
			}
			dc.append(answer[0]);
			dc.append("</textarea>");
			
			if(dc.isDisplayAnswers()) {
				//TODO what to display as answer?
			}
		} else {
			dc.append("<textarea name='").append(getId()).append("' rows='10' cols='50' form='quizForm' class='essay'>");
			//TODO: check that this text is properly escaped for HTML
			dc.append(defaultText);
			dc.append("</textarea>");
		}
 	}
	
	public void writeJS(DisplayContext dc) {
		dc.append("page.essay(").appendQuotedJS(defaultText).append(");\n");
	}
	public void writeXML(StringBuilder b ) {
		b.append("<essay>").append(Util.escapeXML(defaultText))
			.append("</essay>");
	}
	
	@Override
	public double grade(String[] s) {
		return 0;
	}
	
	public boolean isAutomaticGrading() {
		return false;
	}
}
