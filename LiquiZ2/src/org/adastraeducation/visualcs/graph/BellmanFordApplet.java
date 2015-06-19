package org.adastraeducation.visualcs.graph;

import org.adastraeducation.visualcs.BasePApplet;

import jogamp.graph.curve.tess.GraphOutline;

@SuppressWarnings("serial")
public class BellmanFordApplet extends BasePApplet {
	public void setup() {
		super.setup();
		Graph graph = new Graph(5, 5, 0.1, 3, 1);
		System.out.println(graph);
		setDrawer(new PGraphicsGraphDisplayer(this, null, graph));
	}
}
