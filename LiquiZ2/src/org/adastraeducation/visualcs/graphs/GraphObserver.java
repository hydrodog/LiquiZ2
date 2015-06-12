package org.adastraeducation.visualcs.graphs;



public interface GraphObserver{
	
	public void display();   //once loaded it would graphically show the image
		
	public void setHighlightVertex(int v,int highlight);
	public int getHighlightVertex(int v);
	 
	 
	public void setHighlightVertex2(int v,int highlight);    // show the square bracket in column do not overlap in the same row 
	public int getHighlightVertex2(int v);					 // same as the image show
   
    
    
	
	
	public void setHighlightEdge(int From, int To, int hightlight);
	public int getHighlightEdge(int From, int To);
}
