package org.adastraeducation.liquiz;

public class TextSpan extends Text implements java.io.Serializable{
	public TextSpan() {
		super();
	}
	
	public TextSpan(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"Util.span\",").appendQuotedJS(getText()).append("]");
	}
	
	public void writeXML(StringBuilder b) {
	}
	

}
