package org.adastraeducation.visualcs.list;

import sun.net.www.content.audio.x_aiff;

//TODO: How does a listobserver work differently?
public class TextArrayDisplayer extends SortDisplayer {
	public TextArrayDisplayer(int[] x) {
		super(x);
	}
	
	public void display() {
		StringBuilder b = new StringBuilder(arr.length * 4);
		b.append('[');
		if (arr.length > 0) {
			b.append(arr[0]);
			for (int i = 1; i < arr.length; i++) {
				b.append(',');
				b.append(arr[i]);
			}
		}
		b.append(']');
		System.out.println(b);
	}
	public void compare(int i, int j) {
		System.out.println("compare: " + i + "," + j);
	}
	public void rotate(int i, int j, int dir) {
		System.out.println("rotate: " + i + "," + j + "," + dir);		
	}
	public void swap(int i, int j) {
		System.out.println("swap(" + i + "," + j + ")");				
	}
	public void grow(int[] newArray, int newSize) {
		System.out.println("grow(" + newSize + ")");						
	}
	public void copy(int from, int to) {
		System.out.println("copy from " + from + " to " + to);
	}
	public void changed(int pos) {
		System.out.println("list[" + pos + "]=" + arr[pos]);		
	}
	public void set(int i, int temp) {
		System.out.println("set" + temp);
	}
}
