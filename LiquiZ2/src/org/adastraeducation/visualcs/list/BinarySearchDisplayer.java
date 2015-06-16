package org.adastraeducation.visualcs.list;

public abstract class BinarySearchDisplayer extends SearchDisplayer {
	public int loc[];
	public BinarySearchDisplayer(int[] x) {
		super(x);
		loc = new int[]{ 0, x.length-1, -1 };
	}
	public void compare(int i, int j) {}
	public void rotate(int i, int j, int dir) {}
	public void swap(int i, int j) {}
	public void grow(int[] newArray, int newSize) {}
	public void copy(int from, int to) {}
	public void set(int i, int temp) {}
	public void changed(int pos) {}
	public void setObserver(int which, int pos) {
		loc[which] = pos;
	}
}
