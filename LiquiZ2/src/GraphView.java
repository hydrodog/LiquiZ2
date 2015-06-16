import processing.core.*;
//import processing.pdf.*;

public class GraphView extends PApplet {
    private Graph g;
    private float[] coords;
    public static String CIRCLE = "circle";
    public static String RECTANGLE = "rect";
    public static String GRID = "grid";
    private String filename;
    public GraphView(String filename, int width, int height, Graph g, String layout) {
    	this.filename = filename;
    	int v = g.getV();
    	coords = new float[v*2];
    	if (layout.equals(CIRCLE)) {
    		float r = width/2;
    		float dt = TWO_PI / v;
    		float t = 0;
    		for (int i = 0, c = 0; i < v; i++, t += dt) {
    			coords[c++] = r * cos(t); coords[c++] = r * sin(t);
    		}
    	} else if (layout.equals(RECTANGLE)) {
    		
    		
    	}
    }

    public void setup() {
    	size(600,600);
    	background(0);
   // 	beginRecord(PDF, filename);
    }
    
    public void draw() {
    	translate(width/2, height/2);
    	final float vsize = 50;
    	for (int i = 0, c = 0; i < g.getV(); i++) {
    		ellipse(coords[c], coords[c+1], vsize,vsize);
    		text(i+1, coords[c], coords[c+1]);
    	}
    	
    	//save("x.png");
    	//exit();

    //	endRecord();
    }
}