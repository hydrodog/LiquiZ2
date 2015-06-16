package org.adastraeducation.visualcs.list;

public abstract class ArrayDisplayer implements ArrayObserver {
	protected int[] arr;
	// when the array is first connected to the displayer, display it
	public ArrayDisplayer(int[] x) {
		this.arr = x;
		display();
	}
	// when the displayer changes to a new array, display it
	public void setArray(int[] x) {
		this.arr = x;
		display();
	}
	public int[] getArray() { return arr; }
}
