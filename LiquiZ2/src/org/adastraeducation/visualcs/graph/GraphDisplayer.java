package org.adastraeducation.visualcs.graph;


public abstract class GraphDisplayer implements GraphObserver {
	protected Graph g;
	protected int[] highlightvertex;// the main vertex
	protected int[] highlightvertex2;  // the iterate according to main vertex
	
	protected int[] highlightedge;
	
	public GraphDisplayer(Graph g){
			this.g=g;
			int v=g.getV();
			
			highlightvertex=new int[v];
			highlightvertex2=new int[v];
			
			for(int i=0;i<highlightvertex.length;i++){
				highlightvertex[i]=0;
				highlightvertex2[i]=0;
			}
			
			
			
			
			highlightedge=new int[v*v];
			for(int i=0;i<highlightedge.length;i++){
				highlightedge[i]=0;
		}
			display();	
			
	}
	
	
	public int getHighlightVertex2(int v){
		return highlightvertex2[v];
	}
	
	public int getHighlightVertex(int v){
		
		return highlightvertex[v];
	}
	
	public int getHighlightEdge(int From, int To){
		return highlightedge[From*g.getV()+To];
	}
	

}
