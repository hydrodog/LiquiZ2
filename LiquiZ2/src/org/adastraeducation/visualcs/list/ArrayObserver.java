package org.adastraeducation.visualcs.list;
/*
 * ArrayObserver
 * Set of calls that define how an array-based algorithm can display itself graphically
 * @author: Dov Kruger
 * 
 */
//TODO: How does a listobserver work differently?
public interface ArrayObserver {
	// display the entire array
	public void display();
	
	// show that we are comparing two elements at positions i,j
	public void compare(int i, int j);
	
	// rotate a range in the array [i,j] by direction dir
	// rotate(1,5, +1)?? Not sure...
	public void rotate(int i, int j, int dir);
	
	// exchange two elements at positions (i,j)
	public void swap(int i, int j);
	
	// show that the array has just grown
	public void grow(int[] newArray, int newSize);
	
	public void copy(int from, int to);
	public void set(int i, int temp);
	
	// one element at position pos just changed
	public void changed(int pos);
	//show that observer "which" is now looking at position
	public void setObserver(int which, int position);
	// TODO: add an iterator?
}
