package org.adastraeducation.visualcs.numerics;

public class Romberg extends Integration {
	
	private double sumMiddles(FuncOneVar func, double x, double h, int n) {
		double sum  = func.f(x);
		x += h;
		for (int i = 1; i < n; i++, x += h)
			sum += func.f(x);
		return sum;
	}
	public double integrate(FuncOneVar func, double a, double b, int n, double ε) {
		double h = (b-a)/n; // starting h
		double sum2 = (func.f(a) + func.f(b)) / 2 + sumMiddles(func, a + h, h, n-1);
		double I2 = sum2 * h;
		double h2 = h / 2;
		double sum3 = sumMiddles(func, a + h2, h, n) + sum2;
		double I3 = sum3 * h2;
		double sum1;
		double I1;
		double h4;
		double R1,R2;
		do {
			sum1 = sum2;
			I1 = I2;
			h4 = h / 4;
			sum2 = sum3;
			I2 = I3;
			n *= 2;
			sum3 = sumMiddles(func, a + h4, h2, n) + sum2;
			I3 = sum3 * h4;
			h2 = h4;
			R1 = (4*I2 - I1) / 3; // cancel leading h^2 error terms
			R2 = (4 * I3 - I2) / 3;
		} while (Math.abs(R2 - R1) > ε);
		return (16*R2 - R1) / 15; // 2nd order Romberg canceling h^4 error terms
	}
}
