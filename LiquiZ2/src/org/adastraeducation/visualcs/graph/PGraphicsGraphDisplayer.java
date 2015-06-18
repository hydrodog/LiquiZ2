package org.adastraeducation.visualcs.graph;

//1  how to repaint after finish one animation?  store that image and then give out certain solution.  
//2  how to output solution in txt file the, name
//3  what's next step?  build on the web server? save png     graph1 png  sloution1 txt  batch

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.*;

import processing.core.PApplet;
import processing.core.PGraphics;

public class PGraphicsGraphDisplayer extends DrawOnPGraphics {
	private static final long serialVersionUID = 1L;
	private final String problem = "BellmanFord";
	private GraphDisplayer displayer; // has the graph
	private float[] x, y;	// location of each vertex
	private float vSize;	// size of each vertex in pixels
	private int[] colors;	// colors for different types of vertices
	private int v;   		// number of vertices
	private Graph graph;
	public PGraphicsGraphDisplayer(PApplet parent, PGraphics g, 
			Graph graph) {
		super(parent, g, 0xFFFFFF, 0x000000, 30);
		this.graph = graph;
		displayer = new GraphDisplayer(graph) {			
			public void display() {
				draw();	
			}
		};
		this.v = displayer.getGraph().getV();
		colors = new int[] {
			fgColor,
			0xC0D000, // yellow for visited vert/edges
			0xFF0000
		};
		vSize = 50;     //each vertex is a circle, vsize is a radius   
		
    	x = new float[v];    //series x location of in a circle(vertex.x )
    	y = new float[v];    //series y location of in a circle(vertex.y)
    	setVertexPositions();    	
	}
	private void setVertexPositions() {
    	float r = Math.min(g.width, g.height)/2 - vSize;
    	for (int i = 0; i < v; i++) {
    		x[i] = (float)(r * Math.cos(i * Math.PI*2 / v));	// draw a circle  uniformly distribute 
    		y[i] = (float)(r * Math.sin(i * Math.PI*2 / v));
    	}
	}
	
	public void draw() {
	    g.beginDraw();
		g.background(bgColor);

	    if (displayer == null)
	    	return;
	    g.translate(g.width/2, g.height/2);
	    g.textSize(txtHeight);
	    g.stroke(fgColor);
	    g.fill(fgColor);
	    drawEdges(); 	// draw edges first 
	    drawVertices();	// then draw vertices on top

	    if (Visualize.start) {
	    	Visualize.start = false;
	    	g.endDraw();
	    	g.save(dir + problem + "_q_" + SerialNumber.serialno() + ".png");
	    }

	    if (Visualize.terminate) {
	    	g.endDraw();
	    	g.save(dir + problem + "_sol_" + SerialNumber.serialno() + ".png" );
	    	Visualize.terminate = false;
	    	Visualize.start = true;
	    }
	}
	
	private void drawEdges() {
	    for (int i = 0; i < v; i++) {
	    	for(int j = i; j < v; j++) {
	    		if(graph.getW(i,j) != Double.POSITIVE_INFINITY) {
	    			g.stroke(displayer.getEdgeStyle(i,j));
	    			g.fill(displayer.getEdgeStyle(i,j));
	    			g.line(x[i],y[i],x[j],y[j]);
	    			g.fill(255,0,0);
	    			g.text( Double.toString(graph.getW(i,j)),  (x[i]+x[j])/2,  (y[i]+y[j])/2   ) ;	
	    		}
	    	}
	    }
	}
	private void drawVertices() {
    	g.noStroke();	
	    for (int i = 0; i < v; i++) {
	    	g.fill(displayer.getVertexStyle(i));
	    	g.ellipse(x[i], y[i], vSize,vSize);
	    	g.fill(displayer.getVertexStyle(i));
	    	g.fill(255,255,0);
	    	g.text(i+1, x[i]-txtHeight/3, y[i]+txtHeight/3);
	    }
	}
}