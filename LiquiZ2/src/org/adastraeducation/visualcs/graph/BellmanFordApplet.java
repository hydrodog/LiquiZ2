package org.adastraeducation.visualcs.graph;

import jogamp.graph.curve.tess.GraphOutline;

@SuppressWarnings("serial")
public class BellmanFordApplet extends BasePApplet {
	public void setup() {
		super.setup();
		Graph graph = new Graph(6, 8, 0.1, 3, 1);
		System.out.println(graph);
		setDrawer(new PGraphicsGraphDisplayer(this, null, graph));
	}
}
