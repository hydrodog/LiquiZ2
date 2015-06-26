package org.adastraeducation.visualcs.algorithms;

public abstract class ArrayDisplayer implements ArrayObserver {
	protected int[] arr;
	protected int[] subArr;
	protected int left = -1, right = -1;	//show the position of a line which present the selected element 
	protected int[] arrStyle;// main array style 
	protected int[] subArrStatus;// sub array existence
	
	// when the array is first connected to the displayer, display it
	public ArrayDisplayer(Array arr2) {
		this.arr = arr2.getArr();
		
		// initialize the style of array
		arrStyle = new int[arr.length];
		subArrStatus = new int[arr.length];
		
		for(int i = 0; i < arr.length; i++){
			arrStyle[i] = 0;
			subArrStatus[i] = 0;
		}
		
		//display();
	}
	// when the displayer changes to a new array, display it
	public void setArray(int[] x) {
		this.arr = x;
		display();
	}
	public int[] getArray() { return arr; }
	
	//set left and right pointer position which present the selected element
	public void setLeftPointer(int position) { left = position;}
	public void setRightPointer(int position) { right = position;}
	
	public int getLeftPointer() { return left; }
	public int getRightPointer() { return right; }
	
	public int getMainArrayStyle(int position) {
		return arrStyle[position];
	}
	
	//if dangerous with no delete[]?
	public void setSubArr(int[] x) {
		this.subArr = x;
		display();
	}
	
	public void swap(int i, int j) {
		int temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	
	public int compare(int i, int j) {
		if (arr[i] > arr[j])
			return 1;
		if (arr[i] == arr[j])
			return 0;
		else 
			return -1;
	}
	
	public void setMainArrayStyle(int position, int style) {
		arrStyle[position] = style;
	}

	public void setSubArrayStatus(int position, int style) {
		subArrStatus[position] = style;
	}

	public int getSubArrayStatus(int position) {
		return subArrStatus[position];
	}

}
