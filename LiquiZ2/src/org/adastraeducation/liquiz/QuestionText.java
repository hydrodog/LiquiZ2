package org.adastraeducation.liquiz;

public class QuestionText extends Text {
	public QuestionText() {
		super();
	}
	
	public QuestionText(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<span>"); //TODO classname?
		dc.append(getText());
		dc.append("</span>");
	}
	
	public void writeJS(DisplayContext dc) {
		//q.appendChild(Util.span("[text]"));
		dc.append("q.appendChild(Util.span(").appendQuotedJS(getText()).append("));");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
