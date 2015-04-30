package org.adastraeducation.liquiz;

public class Video extends RectangularMedia {	
	public Video() {
		super();
	}
	//TODO: is it alright to leave width and height 0?
//	public Video(String video){
//		super(video);
//	}
	public Video(String video, int width, int height){
		super(video, width, height);
	}
	//<source src="movie.mp4" type="video/mp4">
	//<source src="movie.ogg" type="video/ogg">
	public void writeHTML(DisplayContext dc){
		dc.append("\n<video controls width=\""+ getWidth() +"\" height=\""+ getHeight() +"\">\n");
		dc.append("<source src=\"" + getSource() +  "\" type =\"video/"+ getType() + "\"/>\n");
		dc.append("</video>\n");
	}
	// to do : how to represent image in JavaScript
	public void writeJS(StringBuilder b){
		b.append("video(1, '" + getSource() + "')");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + getSource() + "\"> </A>");
	}

}
