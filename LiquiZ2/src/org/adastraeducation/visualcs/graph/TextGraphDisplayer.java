package org.adastraeducation.visualcs.graph;


//TODO: How does a listobserver work differently?
public class TextGraphDisplayer extends GraphDisplayer {
	public TextArrayDisplayer(Graph g) {
		super(g);
	}

	
//		1	2	3	4	5
//	1	
//	2
//	3
//	4
//	5
	public void display() {
		int v = g.getVertices();
		StringBuilder b = new StringBuilder((v+1)*(v+1)*2);
		b.append('\t');
		for (int i = 0; i < v; i++) {
			if (highlightVertex[i])
				b.append("\t[").append(i+1).append(']');
			else
				b.append('\t').append(i+1);
		}
		b.append('\n');
		for (int i = 0; i < v; i++) {
			b.append('\t').append(i+1);
			for (int j = 0; j < v; j++) {
				double w = g.getW(i,j);
				if (w == Double.POSITIVE_INFINITY)
					if (getHighlightEdge(i,j) == 0)
						b.append("\t\u221e");
					else
						b.append('\t').append(getHighlightEdge(i,j).append("[\u221e]");
				else
					if (getHighlightEdge(i,j) == 0)
						b.append('\t').append(w);
					else
						b.append('\t').append(getHighlightEdge(i,j).append('[').append(w).append(']');
			}
			b.append('\n');
		}
		System.out.println(b);
	}
	
}
