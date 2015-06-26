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
	
	public void MergeSort() {
		for (int width = 1; width < n; width = width * 2) {
//			System.out.println(width);
			for (int i = 0; i < n; i += width * 2) 
				merge(i, Math.min(i+width, n), Math.min(i+2*width, n));
			for (int i1 = 0; i1 < n; i1++)
				System.out.print(arr[i1] + " ");
			System.out.println();
		}
		if (Visualize.storeAnswer) {
			for (int i = 0; i < n; i++)
				print(arr[i]);
			print('\n');
		}
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
		
		setLeftPointer(leftP);
		setRightPointer(rightP);

		for (int i = left; i < right; i++) {
			setSubArrayStatus(i, 1);
			setMainArrayStyle(i, 1);
		}
		//display();
		
		while (leftP < center && rightP < right) {
			// choose the min one
			if (compare(leftP, rightP) <= 0) {
				tmpArr[third++] = arr[leftP];
				setSubArr(tmpArr);
				//display();
				setLeftPointer(++leftP);
			} else {
				tmpArr[third++] = arr[rightP];
				setSubArr(tmpArr);
				//display();	//keep original x.right for display
				setRightPointer(++rightP);
			}
		}
		//now one iterator has gone to the end, the following two while will deal with the other iterator
		while (rightP < right) {
			setLeftPointer(-1);
			leftP = -1;
			tmpArr[third++] = arr[rightP];
			setSubArr(tmpArr);
			//display();
			setRightPointer(++rightP);
		}
		while (leftP < center && leftP != -1) {	//remove the influence by previous while loop
			setRightPointer(-1);
			rightP = -1;
			tmpArr[third++] = arr[leftP];
			setSubArr(tmpArr);
			//display();
			setLeftPointer(++leftP);
		}
		setLeftPointer(-1);
		setRightPointer(-1);
		//display();

		// copy the temp array back to the original one
		while (tmp < right) {
			setMainArrayStyle(tmp, 2);
			arr[tmp] = tmpArr[tmp++];
		}
		setArray(arr);
		//display();

		for (int i = 0; i < n; i++)
			setSubArrayStatus(i, 0);
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
	
}
