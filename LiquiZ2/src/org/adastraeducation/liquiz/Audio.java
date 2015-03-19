package org.adastraeducation.liquiz;

public class Audio extends Media {
	public Audio(){
		super();	
	}
	public Audio(String source){
		super(source);
	}

	//<source src="horse.ogg" type="audio/ogg">
	//<source src="horse.mp3" type="audio/mpeg">
	public void writeHTML(StringBuilder b){
		b.append("<audio controls>");
		b.append("<source src=\"" + getSource() + "\"type =\"audio/"+ getType() + "\">");
		b.append("</audio>");
	}
	// to do : how to represent image in JavaScript
	public void writeJS(StringBuilder b){
		b.append("new Audio(1, \"" + getSource() + "\")");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + getSource() + "\"> </A>");
	}

}
