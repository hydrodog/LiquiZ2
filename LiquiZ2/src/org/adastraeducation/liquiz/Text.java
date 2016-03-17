package org.adastraeducation.liquiz;

import org.adastraeducation.liquiz.util.*;

/**
 * DisplayElement representing Text
 * Children: InstructionText, QuestionText, AnswerText, ResponseText
 * @author yijinkang
 *
 */
public class Text extends DisplayElement implements java.io.Serializable{
	private String text;
	
	public Text(){
		
	}
	
	public Text(String text) {
		this.text = text;
	}
	
	public String getText(){
		return text;
	}
	
	public void setText(String t){
		text = t;
	}
	
	public String getName() {
		return text;
	}
	
	@Override
	public void writeHTML(DisplayContext dc) {
		dc.append(text);
	}
	@Override
	public void writeJS(DisplayContext dc) {
		dc.append("[\"instructions\",").appendQuotedJS(text).append("]");
	}
	@Override
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(text).append("</text>");
	}
}
