package org.adastraeducation.visualcs.algorithms;

import org.adastraeducation.visualcs.BasePApplet;
import org.adastraeducation.visualcs.DrawOnPGraphics;
import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.*;

import java.io.*;

import processing.core.PApplet;
import processing.core.PGraphics;

public class PGraphicsGraphDisplayer extends DrawOnPGraphics {
	private static final long serialVersionUID = 1L;
	private ArrayDisplayer displayer; // has the array
	private int n;   		// number of elements
	private int[] colors;
	private Array arr;
	public PGraphicsGraphDisplayer(BasePApplet parent, PGraphics g, Array arr) {
		super(parent, g, arr);
		this.arr = arr;
		displayer = new ArrayDisplayer(arr) {			
			public void display() {
				draw();	
				PGraphicsGraphDisplayer.this.parent.interactive();
			}
		};
		arr.addObserver(displayer);
		this.n = displayer.getArray().length;
		colors = new int[] {
			fgColor,
			0xC0D000, // yellow for visited vert/edges
			0xFF0000
		};
   	}
	
	public void thisDraw() {
		/*
		g.background(bgColor);
	    g.translate(g.width/2, g.height/2);
	    g.textSize(txtHeight);
	    g.stroke(fgColor);
	    g.fill(fgColor);
	    */
    	g.rectMode(3);	//center mode
    	g.clear();
    	g.background(255);
    	g.fill(255);
	    // TODO: change to draw grid
	    drawGrid();
	    drawText();
	    drawPointer();
	    
	    if (true)
	    	return;
	    if (Visualize.start) {
	    	Visualize.start = false;
	    	//g.save(dir + problem + "_q_" + SerialNumber.serialno() + ".png");
	    }

	    if (Visualize.terminate) {
	    	//g.save(dir + problem + "_sol_" + SerialNumber.serialno() + ".png" );
	    	Visualize.terminate = false;
	    	Visualize.start = true;
	    }
	}
	
	// TODO: merge the color into fill(), getArr or just arr[] ?
	private void drawText() {
		for (int x_axis = 0; x_axis < n; x_axis++) {
			if (displayer.getMainArrayStyle(x_axis) == 1) {
    			g.fill(100);
    			g.text(displayer.arr[x_axis], 45+56*x_axis, 210); 
    			// TODO: if I need to add getArrElement() since arr is protected? 	
    		} else if (displayer.arrStyle[x_axis] == 0){
    			g.fill(200);
    			g.text(displayer.arr[x_axis], 45+56*x_axis, 210);
    		} else {
    			g.fill(204, 102, 0);
    			g.text(displayer.arr[x_axis], 45+56*x_axis, 210);
    		}
    		// check if the sub array exists
    		if (displayer.getSubArrayStatus(x_axis) == 1) {
    			g.fill(100);
    			g.text(displayer.subArr[x_axis], 45+56*x_axis, 410);
    		}
		}
	}

	private void drawPointer() {
		if (displayer.left != -1) {
			g.fill(100);
			g.line(55+56*displayer.left, 270, 55+56*displayer.left, 330);
		}
		if (displayer.right != -1) {
			g.fill(100);
			g.line(55+56*displayer.right, 270, 55+56*displayer.right, 330);
		}
	}

	public void drawGrid() {
		for (int x_axis = 0; x_axis < n; x_axis++) {
    		g.rect(55+56*x_axis, 200, 56, 56);
    		// check if the sub array exists
    		if (displayer.getSubArrayStatus(x_axis) == 1) {
        		g.rect(55+56*x_axis, 400, 56, 56);
    		}
		}
	}
	
	public void setPGraphics(PGraphics g) {
		super.setPGraphics(g);
	}
}