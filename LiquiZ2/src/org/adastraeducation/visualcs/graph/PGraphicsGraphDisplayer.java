package org.adastraeducation.visualcs.graph;

//1  how to repaint after finish one animation?  store that image and then give out certain solution.  
//2  how to output solution in txt file the, name
//3  what's next step?  build on the web server? save png     graph1 png  sloution1 txt  batch

import org.adastraeducation.visualcs.BasePApplet;
import org.adastraeducation.visualcs.DrawOnPGraphics;

import processing.core.PGraphics;

public class PGraphicsGraphDisplayer extends DrawOnPGraphics {
	private static final long serialVersionUID = 1L;
	private GraphDisplayer displayer; // has the graph
	private float[] x, y;	// location of each vertex
	private float vSize;	// size of each vertex in pixels
	private int[] colors;	// colors for different types of vertices
	private int v;   		// number of vertices
	private Graph graph;
	public PGraphicsGraphDisplayer(BasePApplet parent, PGraphics g, 
			Graph graph) {
		super(parent, g, graph);
		this.graph = graph;
		displayer = new GraphDisplayer(graph) {			
			public void display() {
				if (PGraphicsGraphDisplayer.this.parent != null)
					PGraphicsGraphDisplayer.this.parent.interactive();
				draw();	
			}
		};
		graph.addObserver(displayer);
		this.v = displayer.getGraph().getV();
				
		colors = new int[]{0, 0, 0, 205, 190, 112, 255, 0, 0};
					
		vSize = 50;     //each vertex is a circle, vsize is a radius   
		
    	x = new float[v];    //series x location of in a circle(vertex.x )
    	y = new float[v];    //series y location of in a circle(vertex.y)
   	}
	private void setVertexPositions() {
    	float r = Math.min(g.width, g.height)/2 - vSize;
    	for (int i = 0; i < v; i++) {
    		x[i] = (float)(r * Math.cos(i * Math.PI*2 / v));	// draw a circle  uniformly distribute 
    		y[i] = (float)(r * Math.sin(i * Math.PI*2 / v));
    	}
	}
	
	public void thisDraw() {
		//if(displayer.firstDraw){
		g.background(bgColor);
		g.textSize(txtHeight);
		g.stroke(fgColor);
		g.fill(fgColor);
		//	displayer.firstDraw = false;

		g.translate(g.width/2, g.height/2);

		setVertexPositions();
		//  

		drawEdges(); 	// draw edges first 
		drawVertices();	// then draw vertices on top    
//	    if (true)
//	    	return;
//	    if (Visualize.start) {
//	    	Visualize.start = false;
//	    	//g.save(dir + problem + "_q_" + SerialNumber.serialno() + ".png");
//	    }
//
//	    if (Visualize.terminate) {
//	    	//g.save(dir + problem + "_sol_" + SerialNumber.serialno() + ".png" );
//	    	Visualize.terminate = false;
//	    	Visualize.start = true;
//	    }
	}
	
//	public void setPGraphics(PGraphics g) {
//		super.setPGraphics(g);
//		setVertexPositions();    	// why define setVertex here?
//	}
	// Try all positions for a label and pick the one that is the farthest from collision
	private void labelWeight(double w, int i, int j) {
		double bestDistance = 0;
		double bestX, bestY;
		for (double t = 1.0/16; t <= 1-1.0/16; t += 1.0/16) {
			double candidateX = t * x[i] + (1-t) * x[j];
			double candidateY = t * y[i] + (1-t) * y[j];
			
			double minDistance = g.width;
			for (int i2 = 0; i2 < v-1; i2++)
				for (int j2 = i2+1; j2 < v; j2++) {
					if (i2 == i && j2 == j)
						continue;
					double denom = (y[j2] - y[i2]) * (x[j] - x[i]) - (x[j2] - x[i2]) * (y[j] - y[i]);
					double ua = ((x[j2] - x[i2]) * (y[i] - y[i2]) - (y[j2] - y[i2]) * (x[i] - x[i2]))/denom;
					double ub = ((x[j] - x[i]) * (y[i] - y[i2]) - (y[j] - y[i]) * (x[i] - x[i2]))/denom;
					if (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0) {
						double xIntersect = x[i] + ua * (x[j]-x[i]);
						double yIntersect = y[i] + ub * (y[j]-y[i]);
						double dist = Math.hypot(xIntersect - candidateX, yIntersect - candidateY);
						if (dist < minDistance)
							minDistance = dist;
					}
				}
			if (minDistance > bestDistance) {
				bestX = candidateX;
				bestY = candidateY;
			}
		}
		g.text( Double.toString(graph.getW(i,j)),  (x[i]+x[j])/2,  (y[i]+y[j])/2   ) ;	
	}
	
	private void drawEdges() {
	    for (int i = 0; i < v; i++) {
	    	for(int j = i; j < v; j++) {
	    		if(graph.getW(i,j) != Double.POSITIVE_INFINITY) {
	    			int styleIndex = displayer.getEdgeStyle(i, j) * 3;  			
	    			g.stroke(colors[styleIndex], colors[styleIndex + 1], colors[styleIndex + 2]); 			
	    			g.line(x[i],y[i],x[j],y[j]);	    			
	    			g.fill(colors[displayer.getEdgeStyle(i,j)]);	    			
	    			labelWeight(graph.getW(i,j), i, j); 
//	    			g.fill(255,0,0);
//	    			g.text( Double.toString(graph.getW(i,j)),  (x[i]+x[j])/2,  (y[i]+y[j])/2   ) ;	
	    		}
	    	}
	    }
	}
	private void drawVertices() {
    	g.noStroke();	
	    for (int i = 0; i < v; i++) {
	    	int styleIndex = displayer.getVertexStyle(i) * 3;
	    	g.fill(  colors[styleIndex], colors[styleIndex + 1], colors[styleIndex + 2]);    		    	
	    	g.ellipse(x[i], y[i], vSize,vSize);
	    	g.fill(255);
	    	g.text(i+1, x[i]-txtHeight/3, y[i]+txtHeight/3);
	    }
	}
}