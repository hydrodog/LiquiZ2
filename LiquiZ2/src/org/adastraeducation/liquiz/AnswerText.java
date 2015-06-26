package org.adastraeducation.liquiz;

public class AnswerText extends Text {
	public AnswerText() {
		super();
	}
	
	public AnswerText(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append(getText()); 
		//If showing answers for MC, nothing else needed
		//If showing correct fill-in answer, this might need a tag&classname
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append(getText());
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
