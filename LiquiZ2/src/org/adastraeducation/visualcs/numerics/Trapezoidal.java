package org.adastraeducation.visualcs.numerics;

public class Trapezoidal extends Integration {
	public double integrate(FuncOneVar func, double a, double b, int n, double ε) {
		double h = (b-a)/n; // starting h
		double sum2 = (func.f(a) + func.f(b)) / 2;
		double x = a + h;
		for (int i = 0; i < n-1; i++, x += h)
			sum2 += func.f(x);
		double I2 = sum2 * h;
		double I1;
		double sum1;
		do {
			sum1 = sum2;
			I1 = I2;
			double h2 = h / 2;
			x = a + h2;
			sum2 = func.f(x);
			for (int i = 1; i < n; i++, x += h)
				sum2 += func.f(x);
			sum2 += sum1;
			I2 = sum2 * h2;
			h = h2;
		} while (Math.abs(I2 - I1) > ε);
		return I2;
	}
}
