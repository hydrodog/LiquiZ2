package org.adastraeducation.liquiz;

public class TextInstruction extends Text implements java.io.Serializable{
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
		dc.append("\n\t\t\t[\"instructions\", ").appendQuotedJS(getText()).append("]");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}

	@Override
	public String toString() {
		return "TextInstruction [instructions: " + getText() + "]";
	}
	
	
}
