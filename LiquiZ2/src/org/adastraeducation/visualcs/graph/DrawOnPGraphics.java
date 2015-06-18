package org.adastraeducation.visualcs.graph;

import processing.core.PApplet;
import processing.core.PGraphics;

public abstract class DrawOnPGraphics {
	protected PGraphics g;	// surface to draw on
	protected int bgColor; 	// background color
	protected int fgColor;	// default foreground color
	protected int txtHeight;	// text size?
	protected PApplet parent;	// if not null, wait interactively
							// this can be a delay or wait for keyboard
	public final static String dir = "data/img/";

	public DrawOnPGraphics(PApplet parent, PGraphics g, int bgColor, int fgColor, int txtHeight) {
		this.parent = parent;
		if (parent == null)
			this.g = g;
		else
			this.g = parent.g;
		this.bgColor = bgColor;
		this.fgColor = fgColor;
		this.txtHeight = txtHeight;
	}
	public abstract void draw();
}
