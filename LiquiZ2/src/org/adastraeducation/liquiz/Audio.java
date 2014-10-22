package org.adastraeducation.liquiz;

public class Audio implements Displayable {
	private String source;
	private String type;

	public Audio(String source){
		this.source = source;		
	}

	public Audio(String source, String type){
		this.source = source;		
	}
	//<source src="horse.ogg" type="audio/ogg">
	//<source src="horse.mp3" type="audio/mpeg">
	public void writeHTML(StringBuilder b){
		b.append("<audio controls>");
		b.append("<source src=\"" + source + "\"type =\""+ type + "\">");
		b.append("</audio>");
	}
	// to do : how to represent image in JavaScript
	public void writeJS(StringBuilder b){
		b.append("new Audio(1, \"" + source + "\")");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + source + "\"> </A>");
	}

}
