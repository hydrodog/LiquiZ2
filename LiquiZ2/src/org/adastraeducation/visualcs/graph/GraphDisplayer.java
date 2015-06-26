package org.adastraeducation.visualcs.graph;

import java.io.IOException;

import org.adastraeducation.visualcs.AnswerStore;

public abstract class GraphDisplayer implements GraphObserver {
	protected Graph graph;
	// each style 0 = default, 1 and beyond can look different
	// typically 1= candidate, 2 = found
	protected int[] vertexStyle;// each number corresponds to a different look
	protected int[] edgeStyle;  // edge look
	protected boolean firstDraw;
	
	public GraphDisplayer(Graph graph) {
		this.graph = graph;
		int v = graph.getV();
		firstDraw = true;
		
		vertexStyle = new int[v];
		edgeStyle = new int[v*v];
		for (int i = 0; i < vertexStyle.length; i++) {
			vertexStyle[i] = 0;// set all to zero by default
		}
		for(int i=0;i<edgeStyle.length;i++){
			edgeStyle[i]=0;
		}
		//display();
	}

	public Graph getGraph() { return graph; }
	public void setVertexStyle(int v, int style){
		vertexStyle[v] = style;
		display();
	}
	public int getVertexStyle(int v) {
		return vertexStyle[v];
	}
			
	public int getEdgeIndex(int from, int to) {
		return from * graph.getV() + to;
	}
	public void setEdgeStyle(int from, int to, int style){
		edgeStyle[getEdgeIndex(from,to)] = style;
		edgeStyle[getEdgeIndex(to,from)] = style;
		display();
	}
	
	public int getEdgeStyle(int from, int to){
		return edgeStyle[getEdgeIndex(from,to)];
	}
}
