package org.adastraeducation.visualcs.graph;

public abstract class GraphDisplayer implements GraphObserver {
	protected Graph g;
	protected int[] highlightVertex;
	protected int[] highlightEdge;
	// when the array is first connected to the displayer, display it
	public GraphDisplayer(Graph g) {
		this.g = g;
		int v = g.getVertices();
		highlightVertex = new int[v];
		for (int i = 0; i < highlightVertex.length; i++)
			highlightVertex[i] = 0;
		highlightEdge = new int[v*v];
		for (int i = 0; i < highlightEdge.length; i++)
			highlightEdge[i] = 0;
		display();
	}
	public void setHighlightVertex(int v, int highlight) {
		highlightVertex[v] = highlight;
	}
}
