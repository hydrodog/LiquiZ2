package org.adastraeducation.visualcs.algorithms;

import org.adastraeducation.visualcs.BasePApplet;
import org.adastraeducation.visualcs.DrawOnPGraphics;
import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.*;

import java.io.*;

import processing.core.PApplet;
import processing.core.PGraphics;

public class PGraphicsArrayDisplayer extends DrawOnPGraphics {
	private static final long serialVersionUID = 1L;
	private ArrayDisplayer displayer; // has the array
	private int n, h1 = 200, h2 = 400;   		// number of elements, the y axis location for array and sub array
	private int[] colors;
	private Array arr;
	public PGraphicsArrayDisplayer(BasePApplet parent, PGraphics g, Array arr) {
		super(parent, g, arr);
		this.arr = arr;
		displayer = new ArrayDisplayer(arr) {			
			public void display() {
				if (PGraphicsArrayDisplayer.this.parent != null)
					PGraphicsArrayDisplayer.this.parent.interactive();
				draw();
			}
		};
		arr.addObserver(displayer);
		this.n = displayer.getArray().length;
		colors = new int[] {
			//fgColor,
			200,
			100,
			0xFFCC6600, // orange for visited elements, Note that FF represent alpha component and other six digits means color 
			0xFF0000
		};
   	}
	
	public void thisDraw() {
		
	    //g.translate(g.width/2, g.height/2);

	    g.rectMode(3);	//center mode
    	g.clear();
    	g.background(bgColor);
    	g.fill(bgColor);
    	g.textSize(txtHeight);
    	g.stroke(fgColor);
	    // TODO: change to draw grid
	    drawGrid();
	    drawText();
	    drawPointer();
	    
	    if (true)
	    	return;
	    if (Visualize.start) {
	    	Visualize.start = false;
	    }

	    if (Visualize.terminate) {
	    	Visualize.terminate = false;
	    	Visualize.start = true;
	    }
	}
	
	// TODO: merge the color into fill(), getArr or just arr[] ?
	private void drawText() {
		for (int x_axis = 0; x_axis < n; x_axis++) {
			g.fill(colors[displayer.arrStyle[x_axis]]);	//style means color
			//the expression may be ugly, but it guarantee the text in the center of grids 
			g.text(displayer.arr[x_axis], g.width*x_axis/n + g.width/(2*n) - g.textWidth(String.valueOf(displayer.arr[x_axis]))/2, h1+txtHeight/2);
			
			
			// TODO: if I need to add getArrElement() since arr is protected? 	

    		// check if the sub array exists
    		if (displayer.getSubArrayStatus(x_axis) == 1) {
    			g.fill(100);
    			//g.text(displayer.subArr[x_axis], 45+56*x_axis, 410);
    			g.text(displayer.subArr[x_axis], g.width*x_axis/n + g.width/(2*n) - g.textWidth(String.valueOf(displayer.arr[x_axis]))/2, h2+txtHeight/2);
    		}
		}
	}

	private void drawPointer() {
		if (displayer.left != -1) {
			g.fill(100);
			g.line(g.width*displayer.left/n + g.width/(2*n), h1+70, g.width*displayer.left/n + g.width/(2*n), h2-70);
		}
		if (displayer.right != -1) {
			g.fill(100);
			//g.line(55+56*displayer.right, 270, 55+56*displayer.right, 330);
			g.line(g.width*displayer.right/n + g.width/(2*n), h1+70, g.width*displayer.right/n + g.width/(2*n), h2-70);
		}
	}

	public void drawGrid() {
		for (int x_axis = 0; x_axis < n; x_axis++) {
    		//g.rect(55+56*x_axis, 200, 56, 56);
    		g.rect(g.width*x_axis/n + g.width/(2*n), h1, g.width/n, g.width/n);
    		// check if the sub array exists
    		if (displayer.getSubArrayStatus(x_axis) == 1) {
        		//g.rect(55+56*x_axis, 400, 56, 56);
    			g.rect(g.width*x_axis/n + g.width/(2*n), h2, g.width/n, g.width/n);
    		}
		}
	}
	
	public void setPGraphics(PGraphics g) {
		super.setPGraphics(g);
	}
}