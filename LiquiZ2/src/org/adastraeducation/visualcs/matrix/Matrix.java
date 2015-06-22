package org.adastraeducation.visualcs.matrix;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import org.adastraeducation.visualcs.util.RandomUtil;

public class Matrix {
	private int rows;
	private int columns;
	private double[] m; 
	
	public Matrix(){
		rows = 0;  columns = 0;  m = null;
	}
	public Matrix(int rows, int columns){
		this.rows = rows;
		this.columns = columns;
		m = new double[rows * columns];
	}
	public Matrix(int rows, int columns, double min, double max, int digits){
		this.rows = rows;
		this.columns = columns;
		int size = rows * columns;
		m = new double[size];
		for(int i = 0 ; i < size ; i++)
			this.m[i] = RandomUtil.RandomDouble(min, max, digits);
	}
	public Matrix(Scanner s){
		rows = s.nextInt();
		columns = s.nextInt();
		int size = rows * columns;
		m = new double[size];
		for(int i = 0; i < size; i++)
			m[i] = s.nextDouble();
	}
	public Matrix clone() {
		Matrix newMatrix = new Matrix(this.rows, this.columns);
		int size = this.rows * this.columns;
		for(int i = 0; i < size; i++)
			newMatrix.m[i] = this.m[i];
		return newMatrix;
	}
	public static Matrix ident(int n) {
		Matrix identity = new Matrix(n, n);
		for(int i = 0; i < n; i++){
			for(int j = 0; j < n; j++){
				if(i == j)  identity.m[i*n + j] = 1;
			}
		}
		return identity;
	}
	public Matrix add(Matrix right){
		if(rows != right.rows || columns != right.columns)
			throw new IllegalArgumentException("illeagl operation ");
		int size = rows * columns;
		Matrix newMatrix = new Matrix(rows , columns);
		for(int i = 0; i < size; i++){
			newMatrix.m[i] = this.m[i] + right.m[i];
		}	
		return newMatrix;
	}
	public Matrix subtract(Matrix right){
		if(rows != right.rows || columns != right.columns)
			throw new IllegalArgumentException("illeagl operation ");
		int size = rows * columns;
		Matrix newMatrix = new Matrix(rows , columns);
		for(int i = 0; i < size; i++){
			newMatrix.m[i] = this.m[i] - right.m[i];
		}	
		return newMatrix;
	}
	public Matrix multiply(Matrix right){
		if(columns != right.rows) throw new IllegalArgumentException("illeagl operation ");
		Matrix newMatrix = new Matrix(rows , right.columns);
		int index = 0;
		for(int i = 0 ; i < rows; i++)
			for(int j = 0 ; j < right.columns; j++)
				for(int k = 0 ; k < right.rows ; k++)
					newMatrix.m[index++] = this.m[i * rows + k] * right.m[j + k * right.columns];			
		return newMatrix;
	}
	public double[] mulitply(double[] x){
		
		
		return null;
	}
	
	
	
	public double[] GaussJordan (double[] b){
		int size = b.length;
		double[] result = new double[size];
		for(int i = 0; i< size; i++)
			result[i] = b[i];			
		for(int rowi = 1 ; rowi < rows; rowi++){
			double originalOne = this.m[(rowi - 1) * columns + rowi - 1];
			for(int operateRow = rowi ; operateRow < rows ; operateRow++){				
				while(this.m[operateRow * columns + rowi - 1] == 0) operateRow++;
				double comparedOne = this.m[operateRow * columns + rowi - 1];
				
				double rate = originalOne / comparedOne;
				for(int operateColumns = rowi - 1; operateColumns < columns; operateColumns++){
					this.m[operateRow * rows + operateColumns] = this.m[operateRow * rows + operateColumns] * rate 
															   - this.m[(rowi - 1) * rows + operateColumns];						
				}
				result[operateRow] =  result[operateRow] * rate -  result[rowi - 1];
			}
		}	
		for(int rowi = rows - 1; rowi >= 0 ; rowi--){
			result[rowi] /= this.m[rowi * rows + rowi];
			this.m[rowi * rows + rowi] = 1;
			for(int operateRow = 0; operateRow < rowi; operateRow++){
				result[operateRow] -= this.m[operateRow * rows + rowi] * result[rowi]; 
				this.m[operateRow * rows + rowi] = 0; 
			}
		}
		return result;
	}
	
	
	public static void main(String[] a){
		File file = new File("case.txt");
		//System.out.println(file.getAbsolutePath());
		try {
			Scanner s = new Scanner(file);
			Matrix matri = new Matrix(s);
			double[] b = {9, 3, 8};
			double[] array = matri.GaussJordan(b);
			for(int i = 0 ; i< array.length;i++)
				System.out.print(array[i] + " ");
			//Matrix mat = new Matrix(3,3,1,4,1);
			//double y =mat.m[0];
			s.close();
		} catch (FileNotFoundException e) {	
			e.printStackTrace();
		}	
	}
}
