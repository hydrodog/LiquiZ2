package org.adastraeducation.liquiz;

public class TextP extends Text implements java.io.Serializable{

	public TextP() {
		super();
	}
	
	public TextP(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append("\n\t\t\t[\"Util.p\",").appendQuotedJS(getText()).append("]");
	}
	
	public void writeXML(StringBuilder b) {
	}
}
