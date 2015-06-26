package org.adastraeducation.visualcs.algorithms;

import org.adastraeducation.visualcs.Observer;

/*
 * ArrayObserver
 * Set of calls that define how an array-based algorithm can display itself graphically
 * @author: Dov Kruger
 * 
 */
//TODO: How does a listobserver work differently?
public interface ArrayObserver extends Observer{
	// show that we are comparing two elements at positions i,j
	// TODO: compare should return a value to show the result of comparison
	// i>j: 1; i=j: 0; i<j: -1;
	public int compare(int i, int j);
	
	/* the following is not used now, just omit  
	 * 
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
	*/
	//show the main array style (for sorting)
	public void setMainArrayStyle(int position, int style);
	//show the sub array existence (0:none 1:exist) (for comparing and swapping display)
	public void setSubArrayStatus(int position, int style);

	//get the main array style 
	public int getMainArrayStyle(int position);
	//get the sub array style 
	public int getSubArrayStatus(int position);
	
	//set left and right pointer position which present the selected element
	public void setLeftPointer(int position);
	public void setRightPointer(int position);
	
	public int getLeftPointer();
	public int getRightPointer();
	
	public void setArray(int[] x);
	public void setSubArr(int[] x);
}
