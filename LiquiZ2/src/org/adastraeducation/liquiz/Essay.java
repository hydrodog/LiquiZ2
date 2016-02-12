package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class Essay extends Question implements java.io.Serializable{
	private int rows, cols, maxWords;
	private String defaultText;
	public Essay() {
		defaultText = "";
	}

	public Essay(int id, int points, int level, String defaultText) {
		this(id, points, level, 10, 50, 0, defaultText);
	}
	
	public Essay(int id, int points, int level, int rows, int cols, int maxWords, String defaultText) {
		super(id, points, level, (ArrayList<Answer>) null);
		this.rows = rows;
		this.cols = cols;
		this.maxWords = maxWords; // if 0, no limit
		this.defaultText = defaultText;
	}
	/*******************Added getter and setter for serialization*************************/
	
	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getCols() {
		return cols;
	}

	public void setCols(int cols) {
		this.cols = cols;
	}

	public int getMaxWords() {
		return maxWords;
	}

	public void setMaxWords(int maxWords) {
		this.maxWords = maxWords;
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
			dc.append("<textarea disabled rows='").append(rows).append("' cols='").append(cols).append("'>");
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
			dc.append("<textarea name='").append(getId()).append("' rows='").append(rows).append("' cols='").append(cols).append("' form='quizForm' class='essay'>");
			//TODO: check that this text is properly escaped for HTML
			dc.append(defaultText);
			dc.append("</textarea>");
		}
 	}
	
	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"essay\", ").append(getId()).append(", ").append(rows).append(", ").append(cols).append(", ").append(maxWords).append("]");
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
