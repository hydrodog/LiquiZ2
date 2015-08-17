package org.adastraeducation.liquiz;

public class TextResponse extends Text {
	public TextResponse() {
		super();
	}
	
	public TextResponse(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append(getText()); 
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
