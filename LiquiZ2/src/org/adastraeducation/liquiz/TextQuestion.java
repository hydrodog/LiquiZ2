package org.adastraeducation.liquiz;

public class TextQuestion extends Text implements java.io.Serializable{
	public TextQuestion() {
		super();
	}
	
	public TextQuestion(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<span>"); //TODO classname?
		dc.append(getText());
		dc.append("</span>");
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append("\n\t\t\t[\"instructions\", ").appendQuotedJS(getText()).append("]");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
