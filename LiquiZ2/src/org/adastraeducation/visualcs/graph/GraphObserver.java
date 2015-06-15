package org.adastraeducation.visualcs.graph;
/*
 * ArrayObserver
 * Set of calls that define how an array-based algorithm can display itself graphically
 * @author: Dov Kruger
 * 
 */
//TODO: How does a listobserver work differently?
public interface GraphObserver {
	// display the entire graph
	public void display();
	
	public void setHighlightVertex(int v, int highlight);

	public void setHighlightEdge(int v1, int v2, int highlight);
}
