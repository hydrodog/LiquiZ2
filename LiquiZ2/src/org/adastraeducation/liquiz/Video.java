package org.adastraeducation.liquiz;

public class Video implements Displayable {
	private String video;
	private int width;
	private int height;
	private String type;
	
	public Video(String video){
		this.video = video;		
	}
	public Video(String video, int width, int height, String type){
		this.video= video;
		this.height= height;
		this.width= width;
		this.type = type;
	}
	//<source src="movie.mp4" type="video/mp4">
	//<source src="movie.ogg" type="video/ogg">
	public void writeHTML(StringBuilder b){
		b.append("<video controls width=\""+ width +"\" height=\""+ height +"\">");
		b.append("<source src=\"" + video +  "\" type =\""+ type + "\"/>");
		b.append("</video>");
		
	}
	// to do : how to represent image in JavaScript
	public void writeJS(StringBuilder b){
		b.append("video(1, '" + video + "')");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<A correct=\"" + video + "\"> </A>");
	}

}
