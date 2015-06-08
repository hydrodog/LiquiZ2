package org.adastraeducation.liquiz;

public class Text extends DisplayElement {
	private String text;
	
	public Text(){
		
	}
	
	public Text(String text) {
		this.text = text;
	}
	
	public String getText(){
		return text;
	}
	
	public void setText(String t){
		text = t;
	}
	
	public String getName() {
		return text;
	}
	
	@Override
	public void writeHTML(DisplayContext dc) {
		dc.append(text);
	}
	@Override
	public void writeJS(DisplayContext dc) {
		writeJS("txt", dc);
		Util.   dc.append('\'').append(text).append('\'');
	}
	@Override
	public void writeXML(StringBuilder b) {
		b.append("<text>").append(text).append("</text>");
	}
}
