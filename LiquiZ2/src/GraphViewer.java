import processing.core.PApplet;
//import processing.pdf.*;
public class GraphViewer extends PApplet {
	private static final long serialVersionUID = 1L;
	private int n;
	private float[] x, y;
	private float vSize;
	float r;
	public void setup() {
    	size(600,600);
    	vSize = 50;
    	n = 6;
    	x = new float[n];
    	y = new float[n];
    	r = 600/2 - vSize;
    	for (int i = 0; i < n; i++) {
    		x[i] = r * cos(i * TWO_PI / n);
    		y[i] = r * sin(i * TWO_PI / n);
    	}
   // 	beginRecord(PDF, "test.pdf");
    	background(0);
    }
    
    public void draw() {
    	translate(width/2, height/2);
    	float txtHeight = 20; 
    	textSize(txtHeight);
       	stroke(255);
        for (int i = 0; i < n; i++) {
    		for (int j = 0; j < n; j++)
    			if (i != j)
    				line(x[i], y[i], x[j], y[j]);
        }
        for (int i = 0; i < n; i++) {        
        	noStroke();
    		fill(255);
    		ellipse(x[i], y[i], vSize,vSize);
    		fill(0);
    		text(i+1, x[i]-txtHeight/3, y[i]+txtHeight/3);
    	}
    	//save("test.png");
   // 	endRecord();
    //	System.exit(0);
    }
}