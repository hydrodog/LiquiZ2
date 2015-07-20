package org.adastraeducation.liquiz;

public class SpanText extends Text {
	public SpanText() {
		super();
	}
	
	public SpanText(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
	}
	
	public void writeJS(DisplayContext dc) {
		dc.append("\n\t\t\t['Util.span',").appendQuotedJS(getText()).append("],");
	}
	
	public void writeXML(StringBuilder b) {
	}
	

}
