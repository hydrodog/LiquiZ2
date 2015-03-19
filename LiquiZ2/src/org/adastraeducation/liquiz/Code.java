package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class Code extends Question {
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

	public Code(int id, int points, int level, 
				String defaultText) {
		super(id, points, level, (ArrayList<Answer>) null);
		this.defaultText = defaultText;
	}

	public void writeHTML(StringBuilder b ){
		b.append("<select name='selectLang'>\n")
			.append("<option value='c++'>c++</option>\n")
			.append("<option value='Java'>Java</option>\n")
			.append("</select>\n<br/>\n");
		//TODO: make list of languages defined in object
		b.append("<textarea name='' class='code'>");
		//TODO: check that this text is properly escaped for HTML
		b.append(defaultText);
		b.append("</textarea>");
 	}

	public void writeJS(StringBuilder b) {
		b.append("code('").append(Util.escapeJS(defaultText))
			.append("')");
	}
	public void writeXML(StringBuilder b) {
		b.append("<code>").append(Util.escapeXML(defaultText))
			.append("</code>");
	}
	
	public boolean isAutomaticGrading() {
		return false;
	}

	@Override
	public boolean isCorrect(String s) {
		// TODO Auto-generated method stub
		return false;
	}
}
