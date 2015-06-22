package org.adastraeducation.visualcs.list;
import  org.adastraeducation.visualcs.algorithms.*;
import processing.core.*;

//TODO: How does a listobserver work differently?
public class PAppletArrayDisplayer extends PApplet {
	private ArrayDisplayer displayer;
	private int comparei, comparej;
	private int swapi, swapj;
	
	public void setup() {
		size(1000,1000);
		comparei = comparej = -1;
		setArray(new int[] {5, 4, 3, 2, 1, 10, 9, 8, 7, 6, 5});
		textSize(28);
	}
	public void setArray(int[] arr) {
		displayer = new ArrayDisplayer(arr) {
			public void compare(int i, int j) {
				comparei = i; comparej = j;
				repaint();
				delay(1000);
			}
			public void rotate(int i, int j, int dir) {
			}
			public void swap(int i, int j) {
				swapi = i; swapj = j;
				repaint();
				delay(1000);
			}
			public void grow(int[] newArray, int newSize) {
			}
			public void copy(int from, int to) {
			}
			public void set(int i, int temp) {
			}
			public void display() {

			}
		};
		repaint();
	}
	public void draw() {
		background(255);
		if (displayer == null)
			return;
		int h = 30;
		fill(255);
		rect(0, 0, width-1, h);
		int[] arr = displayer.getArray();
		int w = width / arr.length;
		for (int i = 0, x = 0; i < arr.length; i++, x += w) {
			line(x, 0, x, h);
			if (i == swapi || i == swapj)
				fill(255,0,0);
			else
				fill(0);
			text(arr[i], x+w/2, h-4);
		}
		if (comparei >= 0) {
			int x = comparei * w + w/2;
			line(x, h+2, x,2*h+5);			
		}
		if (comparej >= 0) {
			int x = comparej * w + w/2;
			line(x, h+2, x,2*h+5);			
		}
	}
	public void mousePressed() {
		Thread t = new Thread() {
			public void run() {
				BubbleSort b = new BubbleSort(displayer);
				b.sort(displayer.getArray());
			}
		};
		t.start();
	}
}
