package org.adastraeducation.liquiz;

import java.util.ArrayList;

/**
 * Accept a range of numerical answers
 * @author yijinkang
 *
 */
public class NumberRange extends FillIn {
	private double min;
	private double max;
	
	public NumberRange(int id, int points, int level, double min, double max){
		super(id,points,level,(ArrayList<Answer>) null);
		this.min = min;
		this.max = max;
	}
	
	/*
	 * Returns true if typed number is within correct range
	 */
	public boolean isCorrect(String s) {
		double d = Double.parseDouble(s);
		return min<=d && d<=max;
	}

	public double getMin() {
		return min;
	}

	public void setMin(double min) {
		this.min = min;
	}

	public double getMax() {
		return max;
	}

	public void setMax(double max) {
		this.max = max;
	}
	
	
}
