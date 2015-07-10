package org.adastraeducation.liquiz;

public class InstructionText extends Text {
	public InstructionText() {
		super();
	}
	
	public InstructionText(String text) {
		super(text);
	}
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<p class='instructions'>");
		dc.append(getText());
		dc.append("</p>");
	}
	
	public void writeJS(DisplayContext dc) {
		//q.appendChild(page.instructions("[text]"));
		dc.append("q.appendChild(page.instructions(").appendQuotedJS(getText()).append("));");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(getText()).append("</text>");
		//TODO, if this is still going to be used
	}
}
