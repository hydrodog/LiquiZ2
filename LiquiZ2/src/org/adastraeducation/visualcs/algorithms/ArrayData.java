package org.adastraeducation.visualcs.algorithms;

import org.adastraeducation.visualcs.AnswerStore;
import org.adastraeducation.visualcs.Observer;
import org.adastraeducation.visualcs.graph.GraphObserver;

public class ArrayData extends AnswerStore implements ArrayObserver{

	public ArrayData(String answerFile) {
		super(answerFile);
	}

	@Override
	public int compare(int i, int j) {
		// TODO: change
		return 0;
	}

	@Override
	public void setMainArrayStyle(int position, int style) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setMainArrayStyle(position,style);		
	}

	@Override
	public void setSubArrayStatus(int position, int style) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setSubArrayStatus(position,style);
	}

	@Override
	public int getMainArrayStyle(int position) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getSubArrayStatus(int position) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void setLeftPointer(int position) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setLeftPointer(position);		
	}

	@Override
	public void setRightPointer(int position) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setRightPointer(position);		
	}

	@Override
	public int getLeftPointer() {
		return 0;
	}

	@Override
	public int getRightPointer() {
		return 0;
	}

	@Override
	public void setArray(int[] x) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setArray(x);
		
	}

	@Override
	public void setSubArr(int[] x) {
		for (Observer obs : observers)
			((ArrayObserver)obs).setSubArr(x);		
	}
	
	
}
