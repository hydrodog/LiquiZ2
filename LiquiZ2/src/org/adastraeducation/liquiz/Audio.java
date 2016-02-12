package org.adastraeducation.liquiz;

public class Audio extends Media implements java.io.Serializable{
	public Audio() {
		super();
	}

	public Audio(String source) {
		super(source);
	}

	// <source src="horse.ogg" type="audio/ogg">
	// <source src="horse.mp3" type="audio/mpeg">
	public void writeHTML(DisplayContext dc) {
		dc.append("\n<audio controls>");
		// TODO should src prepend a directory? where will the audio be?
		dc.append("<source src=\"" + getSource() + "\"type =\"audio/"
				+ getType() + "\">");
		dc.append("</audio>\n");
	}

	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"Util.audio\", ").appendQuotedJS(getSource()).append("]");
	}

	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + getSource() + "\"> </A>");
	}

}
