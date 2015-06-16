package org.adastraeducation.visualcs.numerics;

public abstract class Integration {	
	// start trapezoidal with n slices
	public abstract double integrate(FuncOneVar func, double a, double b, int n, double eps);
	
	public static void testFunc(FuncOneVar func, Integration method) {
		for (double ε = 0.01; ε > 0.0000001; ε /= 100) {
			double ans = method.integrate(func, 0.0, 1.0, 4, ε);
			System.out.println("trapezoidal: " + ans + " ε=" + ε);
		}
	}
	public static void main(String arg[]) {
		// create some test functions
		FuncOneVar f1 = new FuncOneVar() {
			public double f(double x) { return 1; }
		};
		FuncOneVar f2 = new FuncOneVar() { 
			public double f(double x) { return x; }
		};
		FuncOneVar f3 = new FuncOneVar() {
			public double f(double x) { return x*x; }
		};
		FuncOneVar f4 = new FuncOneVar() {
			public double f(double x) { return x*x*x; }
		};
		FuncOneVar f5 = new FuncOneVar() {
			public double f(double x) { return Math.exp(-x)*Math.cos(x); }
		};

		Trapezoidal trap = new Trapezoidal();
		Romberg romb = new Romberg();
		//testFunc(f1, trap);
		testFunc(f2, trap);
		//testFunc(f3, trap);
		//testFunc(f4, trap);
		//testFunc(f5, trap);
		testFunc(f2, romb);
	}
}
