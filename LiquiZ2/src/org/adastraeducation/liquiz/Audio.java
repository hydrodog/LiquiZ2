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
	public void writeHTML(DisplayContext dc){
		dc.append("\n<audio controls>");
		dc.append("<source src=\"" + getSource() + "\"type =\"audio/"+ getType() + "\">");
		dc.append("</audio>\n");
	}
	// to do : how to represent image in JavaScript
	public void writeJS(StringBuilder b){
		b.append("new Audio(1, \"" + getSource() + "\")");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + getSource() + "\"> </A>");
	}

}
