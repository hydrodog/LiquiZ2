package org.adastraeducation.visualcs;

import processing.core.PApplet;
import processing.core.PGraphics;

public abstract class DrawOnPGraphics {
	protected PGraphics g;	// surface to draw on
	protected int bgColor; 	// background color
	protected int fgColor;	// default foreground color
	protected int txtHeight;	// text size?
	protected BasePApplet parent;	// if not null, wait interactively
							// this can be a delay or wait for keyboard
	public final static String dir = "data/img/";
	private AnswerStore prob;

	public DrawOnPGraphics(BasePApplet parent, PGraphics g, 
			int bgColor, int fgColor, int txtHeight,
			AnswerStore prob) {
		this.parent = parent;
		if (parent == null)
			this.g = g;
		else {
			setPGraphics(parent.g);
		}
		this.bgColor = bgColor;
		this.fgColor = fgColor;
		this.txtHeight = txtHeight;
		this.prob = prob;
	}
	public DrawOnPGraphics(BasePApplet parent, PGraphics g, AnswerStore prob) {
		this(parent, g, 0xFFFFFF, 0x000000, 30, prob);
	}
	public abstract void thisDraw();
	public void draw() {
		if (parent != null) {
			setPGraphics(g);	
		}
	    g.beginDraw();
	    thisDraw();
	    g.endDraw();
	}
	public void setPGraphics(PGraphics g) {
		this.g = g;
	}
	public AnswerStore getAnswerStore() { return prob; }
}
