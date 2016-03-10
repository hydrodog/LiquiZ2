package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;
import org.mongodb.morphia.annotations.Entity;
@Entity("questions")
public class Code extends Question implements java.io.Serializable{
	private int rows, cols;
	private String defaultText;
	public Code() {
		defaultText = "";
	}
	/*********************Added getter and setter for serialization********************************/
	public String getDefaultText(){
		return defaultText;
	}
	
	public void setDefaultText(String defaultText) {
		this.defaultText=defaultText;
	}

	public Code(int id, int points, int level, String defaultText) {
		this(id, points, level, 10, 50, defaultText);
	}
	
	public Code(int id, int points, int level, int rows, int cols, String defaultText) {
		super(id, points, level, (ArrayList<Answer>) null);
		this.rows = rows;
		this.cols = cols;
		this.defaultText = defaultText;
	}
	
	//TODO: compile button, compile & run button; compare with desired output

	public void writeHTML(DisplayContext dc ){
		if (dc.isDisplayResponses()) {
			dc.append("<br>Choose your language:");
			dc.append("<select disabled>\n")
				.append("<option value='C++'>C++</option>\n")
				.append("<option value='Java'>Java</option>\n")
				.append("</select>\n"); // TODO: how to deal with the language?? say "selected" for whichever option is selected
			
			dc.append("<textarea disabled rows='10' cols='50' class='code'>");
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
			dc.append("<br>Choose your language:");
			dc.append("<select name='selectLang").append(getId()).append("' form='quizForm'>\n")
				.append("<option value='C++'>C++</option>\n")
				.append("<option value='Java'>Java</option>\n")
				.append("</select>\n");
			//TODO: make list of languages defined in object
			dc.append("<textarea name='").append(getId()).append("' rows='10' cols='50' form='quizForm' class='code'>");
			//TODO: check that this text is properly escaped for HTML
			dc.append(defaultText);
			dc.append("</textarea>");
		}
		
 	}

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
	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"code\", ").append(getId()).append(", ").appendQuotedJS(defaultText).append(", ").append(rows).append(", ").append(cols).append("]\n");
		//TODO default text?
	}
	public void writeXML(StringBuilder b) {
		b.append("<code>").append(Util.escapeXML(defaultText))
			.append("</code>");
	}
	
	public boolean isAutomaticGrading() {
		return false;
	}

	@Override
	public double grade(String[] s) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public String toString() {
		return "Code [id = " + getId() + ", defaultText=" + defaultText + ", rows=" + rows + ", cols=" + cols + "]";
	}
	
	
	
}
