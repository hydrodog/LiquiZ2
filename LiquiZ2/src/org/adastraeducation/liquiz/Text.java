package org.adastraeducation.liquiz;

public class Text implements Displayable {
	private String text;
	
	public Text(String text) {
		this.text = text;
	}
	public String getTagName() { return "Text"; }
	
	@Override
	public void writeHTML(StringBuilder b) {
		b.append(text);
	}
	@Override
	public void writeJS(StringBuilder b) {
		b.append('\'').append(text).append('\'');
	}
	@Override
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(text).append("</text>");
	}
}
