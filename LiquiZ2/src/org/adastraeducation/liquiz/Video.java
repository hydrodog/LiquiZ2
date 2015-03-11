package org.adastraeducation.liquiz;

public class Video extends DisplayElement {
	private String video;
	private int width;
	private int height;
	private String type;
	
	public String getName() {
		return video;
	}
	//TODO: the above & below overlap
	public String getVideo(){
		return this.video;
	}
	
	public void setVideo(String v){
		this.video = v;
	}
	
	public int getWidth(){
		return width;
	}
	
	public void setHeight(int h){
		height = h;
	}
	
	public int getHeight(){
		return height;
	}
	
	public void setWidth(int w){
		width = w;
	}
	
	public String getType(){
		return type;
	}
	
	public void setType (String t){
		type = t;
	}
	
	public Video() {
		video = null;
	}
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
		b.append("<video controls width=\""+ width +"\" height=\""+ height +"\">\n");
		b.append("<source src=\"" + video +  "\" type =\""+ type + "\"/>\n");
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
