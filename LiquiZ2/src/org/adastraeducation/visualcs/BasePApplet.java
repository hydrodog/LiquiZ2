package org.adastraeducation.visualcs;

import org.adastraeducation.visualcs.util.RandomUtil;

import processing.core.PApplet;

public abstract class BasePApplet extends PApplet implements Runnable {
	protected DrawOnPGraphics drawer;
	private int delayTime;
	private int keyWait;
	private int mouseWait;
	/*public BasePApplet(DrawOnPGraphics d) {
		drawer = d;
	}*/
	public void setup() {	
		size(900,600);
		background(255);
		delayTime = 500;
		Visualize.storeAnswer = false;
		Thread t = new Thread(this) {
			public void run(){
				for (;;) {
					algorithm();
					interactive();
					if(Visualize.terminate == true) exit();
				}
			}			
		};
		t.start();
	}
	public abstract void algorithm();
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
