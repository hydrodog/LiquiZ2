package org.adastraeducation.visualcs.graph;

import org.adastraeducation.visualcs.util.RandomUtil;

import processing.core.PApplet;

public class BasePApplet extends PApplet {
	private DrawOnPGraphics drawer;
	private int delayTime;
	private int keyWait;
	private int mouseWait;
	/*public BasePApplet(DrawOnPGraphics d) {
		drawer = d;
	}*/
	public void setup() {
		size(1000,1000);
		delayTime = 500;
	}
	public void draw() {
		getDrawer().draw();
	}
	
	public void mousePressed() {
		delayTime *= 2;
	}
	
	public void keyPressed() {
		
	}
	
	public void interactive() {
		if (keyWait != 0) {
			;
			return;
		}
		if (mouseWait != 0) {
			;
			return;
		}
		delay(delayTime);
	}
	public DrawOnPGraphics getDrawer() {
		return drawer;
	}
	public void setDrawer(DrawOnPGraphics drawer) {
		this.drawer = drawer;
	}

}
