package org.adastraeducation.visualcs.list;

public abstract class SortDisplayer extends ArrayDisplayer {
	protected int swapi, swapj;
	
	public SortDisplayer(int[] x) {
		super(x);
	}
	
	public void compare(int i, int j) {
		setObserver(0, i);
		setObserver(1, j);
	}
	public void rotate(int i, int j, int dir) {}
	public void swap(int i, int j) {
		swapi = i; swapj = j;
	}
	public void grow(int[] newArray, int newSize) {}
	public void copy(int from, int to) {}
	public void set(int i, int temp) {}
}
