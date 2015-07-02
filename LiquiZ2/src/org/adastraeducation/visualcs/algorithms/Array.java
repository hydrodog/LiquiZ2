package org.adastraeducation.visualcs.algorithms;
import org.adastraeducation.visualcs.*;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.util.*;

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.*;

public class Array extends ArrayData{
	private int[] arr;	// the array
	private int n;	//	the length of array
	
	/**
	 * Create an array with n elements
	 *
	 *	@param n
	 */
	public Array(String answerFile, int n) {
		super(answerFile);
		arr = new int[n];
		this.n = n;
	}
	
	/**
	 * Create an array with n elements and
	 * initialize the random value
	 *
	 *	@param v
	 */
	public Array(String answerFile, int n, int min, int max) {
		this(answerFile, n);

		// initialize the elements
		for (int i = 0; i < n; i++) {
			arr[i] = RandomUtil.integerRange(min, max);
        }
		setArray(arr);
	}
	
	public void print(int[] arr) {
		for (int i = 0; i < n; i++)
			System.out.print(arr[i] + " ");
		System.out.println();
	}
	
	public void HeapSort() {
		for (int i = 0; i < n; i++) {
			createMaxdHeap(n - 1 - i);
			setMainArrayStyle(n - 1 - i, 1);
			setMainArrayStyle(0, 1);
			setMainArrayStyle(0, 0);
			swap(0, n - 1 - i);
			setMainArrayStyle(n - 1 - i, 2);
			print(arr);
		}
		if (Visualize.storeAnswer) {
			for (int i = 0; i < n; i++)
				print(arr[i]);
			print('\n');
		}
		Visualize.terminate = true;
	}
	
	public void createMaxdHeap(int lastIndex) {
		for (int i = (lastIndex - 1) / 2; i >= 0; i--) {
			// save the current position
			int k = i;
			if (Visualize.visualize){ 
				setMainArrayStyle(k, 1);
			}
			
			// if k has children
			while (2 * k + 1 <= lastIndex) {
				// biggerIndex is the bigger one among the children, set to left child first
				if (Visualize.visualize){ 
					setMainArrayStyle(k, 1);
				}
				int biggerIndex = 2 * k + 1;
				if (biggerIndex < lastIndex) {	//if right child exists, or biggerIndex == lastIndex
					if (Visualize.visualize){ 
						setMainArrayStyle(biggerIndex, 1);
						setMainArrayStyle(biggerIndex+1, 1);
					}
//					x.display();
					setArray(arr);
					if (compare(biggerIndex, biggerIndex + 1) == -1) {
						// if right child > left child, biggerIndex = right child
						if (Visualize.visualize){ 
							setMainArrayStyle(biggerIndex, 0);
						}
						biggerIndex++;
//						x.display();
						setArray(arr);
					} else {
						if (Visualize.visualize){ 
							setMainArrayStyle(biggerIndex+1, 0);
						}
//						x.display();
						setArray(arr);
					}
				} else {
					setMainArrayStyle(biggerIndex, 1);
//					x.display();
					setArray(arr);
				}
				if (compare(k, biggerIndex) == -1) {
					// if k < biggerIndex, swap them, then iterate downwards 
					swap(k, biggerIndex);
					int tempk = k;
					k = biggerIndex;
//					x.display();
					setArray(arr);
					if (Visualize.visualize){ 
						setMainArrayStyle(tempk, 0);
						setMainArrayStyle(biggerIndex, 0);
					}
				} else {
//					x.display();
					setArray(arr);
					if (Visualize.visualize){ 
						setMainArrayStyle(k, 0);
						setMainArrayStyle(biggerIndex, 0);
					}
					break;
				}
			}
		}
	}
	
	public void MergeSort() {
		for (int width = 1; width < n; width = width * 2) {
//			System.out.println(width);
			for (int i = 0; i < n; i += width * 2) 
				merge(i, Math.min(i+width, n), Math.min(i+2*width, n));
			print(arr);
		}
		if (Visualize.storeAnswer) {
			for (int i = 0; i < n; i++)
				print(arr[i]);
			print('\n');
		}
		Visualize.terminate = true;
	}
	
	public void merge(int left, int center, int right) {	//center means left end
		int[] tmpArr;// temp array for record merge result
		int leftP, rightP;	// leftPointer and rightPointer
		if (center == right)
			return;

		tmpArr = new int[n];
		rightP = center;	//the iterator of the right array 
		int third = left;	//the iterator of the sub array
		leftP = left;	//the iterator of the left array
		int tmp = left;		//the head of sub array for copy back 
		
		if (Visualize.visualize){
			setLeftPointer(leftP);
			setRightPointer(rightP);
			for (int i = left; i < right; i++) {
				setSubArrayStatus(i, 1);
				setMainArrayStyle(i, 1);
			}
		}
		//display();
		
		while (leftP < center && rightP < right) {
			// choose the min one
			if (compare(leftP, rightP) <= 0) {
				tmpArr[third++] = arr[leftP];
				if (Visualize.visualize){
					setSubArr(tmpArr);
					//display();
					setLeftPointer(++leftP);
				}
			} else {
				tmpArr[third++] = arr[rightP];
				if (Visualize.visualize){
					setSubArr(tmpArr);
					//display();	//keep original x.right for display
					setRightPointer(++rightP);
				}
			}
		}
		//now one iterator has gone to the end, the following two while will deal with the other iterator
		while (rightP < right) {
			leftP = -1;
			tmpArr[third++] = arr[rightP];
			if (Visualize.visualize){
				setLeftPointer(-1);
				setSubArr(tmpArr);
				//display();
				setRightPointer(++rightP);
			}
		}
		while (leftP < center && leftP != -1) {	//remove the influence by previous while loop
			rightP = -1;
			tmpArr[third++] = arr[leftP];
			if (Visualize.visualize){
				setRightPointer(-1);
				setSubArr(tmpArr);
				//display();
				setLeftPointer(++leftP);
			}
		}
		if (Visualize.visualize){
			setLeftPointer(-1);
			setRightPointer(-1);
		}
		//display();

		// copy the temp array back to the original one
		while (tmp < right) {
			if (Visualize.visualize)
				setMainArrayStyle(tmp, 2);
			arr[tmp] = tmpArr[tmp++];
		}
		if (Visualize.visualize) {
			setArray(arr);
			//display();
			for (int i = 0; i < n; i++)
				setSubArrayStatus(i, 0);
		}
	}

	public int[] getArr() {
		return arr;
	}

	public void setArr(int[] arr) {
		this.arr = arr;
	}

	public int compare(int i, int j) {
		if (arr[i] > arr[j])
			return 1;
		else if (arr[i] == arr[j]) 
			return 0;
		else 
			return -1;
	}
	
	public void swap(int i, int j) {
		int temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	
}
