/*
 * Efficient Implementation of a Matrix.
 * @author Dov Kruger
 * @created 2014-02-04
 * This comment shows that you can put a comment before the
 * package statement.
 * The first statement in the file must be package.
 */
package org.adastraeducation.visualcs.matrix;

import javax.management.RuntimeErrorException;

public class Matrix {
	private double[] m; // one dimensional data, faster
	private int rows, cols; // store size in each dimension
	public Matrix(int rows, int cols) {
		this.rows = rows; this.cols = cols;
		m = new double[rows*cols];
	}
	public Matrix add(Matrix b) {
		if (rows != b.rows || cols != b.cols) {
			throw new RuntimeErrorException(null);
		}
		Matrix ans = new Matrix(rows, cols);
		for (int i = 0; i < ans.m.length; i++)
			ans.m[i] = m[i] + b.m[i];
		return ans;
	}
	public Matrix sub(Matrix b) {
		if (rows != b.rows || cols != b.cols) {
			throw new RuntimeErrorException(null);
		}
		Matrix ans = new Matrix(rows, cols);
		for (int i = 0; i < ans.m.length; i++)
			ans.m[i] = m[i] - b.m[i];
		return ans;
	}
	public Matrix mult(Matrix b) {
		if (rows != b.rows || cols != b.cols) {
			throw new RuntimeErrorException(null);
		}
		Matrix ans = new Matrix(rows, cols);
		for (int i = 0; i < ans.m.length; i++)
			ans.m[i] = m[i] + b.m[i];
		return ans;
	}
	// TODO: invert
	public Matrix invert() {
		return this;
	}
	// TODO: determinant
	public double det() {
		return 0;
	}
	
	// TODO: condition of the matrix?
	public double cond() {
		return 0;
	}
	
	public void gauss(double[] x) {
		for (int i = 0; i < rows-1; i++) {
			int corner = i * cols + i;
			double ratio = -x[corner]/x[corner + cols];
			x[corner+cols] = 0;
			final int lim = corner+cols + cols;
			for (int j = corner+cols; j < lim; j++)
				x[j] += x[j-cols]* ratio;
		}
	}
	
}
