package org.adastraeducation.visualcs.graph;

import org.adastraeducation.visualcs.BasePApplet;

import jogamp.graph.curve.tess.GraphOutline;

@SuppressWarnings("serial")
public class BellmanFordApplet extends BasePApplet {
	private Graph graph = null;
	public void setup() {
		super.setup();
		graph = new Graph(null, 6, 8, 0.1, 3, 1);
		System.out.println(graph);
		setDrawer(new PGraphicsGraphDisplayer(this, null, graph));		
	}
	public void algorithm() {
		if (graph == null)
			return;
		graph.BellmanFord(0, 5);		
	}
}
