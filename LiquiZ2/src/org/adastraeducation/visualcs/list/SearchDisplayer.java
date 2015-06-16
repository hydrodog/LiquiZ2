package org.adastraeducation.visualcs.list;

public abstract class SearchDisplayer extends ArrayDisplayer {
	public SearchDisplayer(int[] x) {
		super(x);
	}
	
	public void compare(int i, int j) {}
	public void rotate(int i, int j, int dir) {}
	public void swap(int i, int j) {}
	public void grow(int[] newArray, int newSize) {}
	public void copy(int from, int to) {}
	public void set(int i, int temp) {}
	public void changed(int pos) {}
}
