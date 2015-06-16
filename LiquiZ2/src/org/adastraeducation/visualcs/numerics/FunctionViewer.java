package org.adastraeducation.visualcs.numerics;
import processing.core.PApplet;
//import processing.pdf.*;
public class FunctionViewer extends PApplet {
	private static final long serialVersionUID = 1L;
	private FuncOneVar func;
	private double xMin, xMax, yMin, yMax;
	public void setup() {
    	size(600,600);
    	setXMin(-2*PI);
    	setXMax(2*PI);
    	setYMin(-1);
    	setYMax(+1);
    	setFunc(new FuncOneVar() {
    		public double f(double x) { return Math.sin(x); }
    	});
    }

	public void setFunc(FuncOneVar func) { this.func = func; }
	public FuncOneVar getFunc() { return func; }

	public void setXMin(double x) { xMin = x; }
	public double getXMin() { return xMin; }
	
	public void setXMax(double x) { xMax = x; }
	public double getXMax() { return xMax; }

	public void setYMin(double y) { yMin = y; }
	public double getYMin() { return yMin; }
	
	public void setYMax(double y) { yMax = y; }
	public double getYMax() { return yMax; }

    public void draw() {
    	background(0);
    	stroke(255);
    	strokeWeight(0);
    	translate(width/2, height/2);
    	double xRange = xMax - xMin; 
    	double yRange = yMax - yMin;
    	scale((float)(width/xRange), (float)(height/yRange));
    	float dx = (float)(xRange/width);
    	float lastX = (float)xMin, lastY = (float)yMin;
    	for (float x = (float)xMin; x <= xMax; x += dx) {
    		float y = (float)func.f(x);
    		line(lastX,lastY, x,y);
    		lastX = x; lastY = y;
    	}
    	//save("test.png");
    }
}