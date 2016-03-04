package org.adastraeducation.liquiz;

public abstract class RectangularMedia extends Media {
	private int width;
	private int height;
	
	public RectangularMedia(){
		super();
	}
	
	/*********************Added getters and setters for serialization*************************************/
	public final int getWidth(){
		return width;
	}
	
	public final void setWidth(int w){
		this.width = w;
	}
	
	public final int getHeight(){
		return height;
	}
	
	public final void setHeight(int h){
		this.height = h;
	}
	
//	public RectangularMedia(String source){
//		super(source);
//	}
	
	public RectangularMedia(String source, int width, int height){
		super(source);
		this.height= height;
		this.width= width;
	}
	
	public RectangularMedia(String source){
		super(source);
	}
}
