package org.adastraeducation.liquiz;

public class ResponseText extends Text {
	public ResponseText() {
		super();
	}
	
	public ResponseText(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<div class='response'");
		dc.append(getText()); 
		dc.append("</div>");
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append(getText());
		//TODO - JS is not written yet
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
