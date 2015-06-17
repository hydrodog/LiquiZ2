package org.adastraeducation.visualcs.numerics;

public interface FunctionObserver {
	// Called when an algorithm evaluates a function of one variable
	// Used to display where the function evaluation happens
	public double eval(double x);
	
	// graph the function itself
	public void graph(FuncOneVar func, double a, double b);
	
	// show  bounds of the algorithm on a region
	public void bracket(double a, double b);
	
	// use this to display a value on the same graph, as an integral
	//TODO: How do we display multiple values, as in trapezoidal or other integration?
	public void displayValue(double v);
	
}
