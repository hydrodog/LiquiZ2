package org.adastraeducation.visualcs.graph;
/**
 * Base Interface containing all necessary methods to animate a graph algorithm 
 * 
 * @author dkruger
 */
//TODO: Currently only one observer is supported.  Really should be a list of observers?
public interface GraphObserver {
	public void display();   // when the entire graph changes and must be displayed		
	public void setVertexStyle(int v, int style);	// visiting a vertex that should be highlighted
	public int getVertexStyle(int v);	 				// get the current status of a particular vertex   
	public void setEdgeStyle(int from, int to, int style);
	public int getEdgeStyle(int from, int to);
}
