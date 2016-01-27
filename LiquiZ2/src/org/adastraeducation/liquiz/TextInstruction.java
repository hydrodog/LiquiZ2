package org.adastraeducation.liquiz;

public class TextInstruction extends Text {
	public TextInstruction() {
		super();
	}
	
	public TextInstruction(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<p class='instructions'>");
		dc.append(getText());
		dc.append("</p>");
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append("\n\t\t\t[\"instruction\", ").appendQuotedJS(getText()).append("],");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
