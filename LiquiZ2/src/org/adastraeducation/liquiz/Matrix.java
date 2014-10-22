package org.adastraeducation.liquiz;

public class Matrix implements Displayable {

	private double[][] data;
	private int row;
	private int col;
	
	/**
	 * Construct a matrix with all zeros
	 */
	public Matrix(int row, int col){
		this.row=row;
		this.col=col;
		data = new double[row][col];
	}
	
	/**
	 *  Create a random matrix of row x col with random elements
	 *  between min and max inclusive
	 */
	public Matrix(int row, int col, int min, int max){
		this.row=row;
		this.col=col;
		
		data = new double[row][col];
		for(int i = 0; i < row; i++){
			for(int j = 0; j < col; j++){
				data[i][j] = Quiz.random(min,max);
			}
		}
	}
	
	//Matrix get element
	public double get(int row, int col){
		return data[row][col];
	}
	
	//Matrix addition
	public Matrix add(Matrix right) {
		Matrix result = new Matrix(row,col);
		for (int i = 0; i < row; i++){
			for (int j = 0; j < col; j++){
				result.data[i][j] = data[i][j]+right.data[i][j];
			}
		}
		return result;
	}
	
	//Matrix subtraction
	public Matrix minus(Matrix right) {
		Matrix result = new Matrix(row,col);
		for(int i = 0; i < row; i++){
			for(int j = 0; j < col; j++){
				result.data[i][j]=data[i][j]-right.data[i][j];
			}
		}
		return result;
	}
	
	/**
	 * Matrix multiply: left must have the same number
	 * of columns as the right as rows
	 * @param right
	 * @return the product of the two
	 */
	public Matrix multiply(Matrix right){
		Matrix result = new Matrix(row, right.col);
		if(col != right.row){
			// TODO: Put in exception handling for errors
			System.out.println("Invalid Matrix!");
			return result;
		}
		for (int i = 0; i < row;i++) {
			for(int j = 0; j < right.col; j++){
				int sum = 0;
				for(int k = 0; k < col; k++){
					sum += data[i][k] * right.data[k][j];
				}
				result.data[i][j]=sum;
			}
		}
		return result;
	}
	
	public String toString() {
		StringBuilder b = new StringBuilder(row*col*6);
		for (int i = 0; i < row; i++) {
			for (int j = 0; j < col; j++) {
				b.append(data[i][j]).append('\t');
			}
			b.append('\n');
		}
		return b.toString();
	}
	@Override
	public void writeHTML(StringBuilder b) {
		b.append("<table class='mat'>\n");
		for (int i = 0; i < row; i++) {
			b.append("<tr>");
			for (int j = 0; j < col; j++) {
				b.append("<td>").append(data[i][j]).append("</td>");
			}
			b.append("</tr>\n");
		}		
		b.append("</table>");
	}

	//TODO: Fix the commas after each row, they aren't there!
	@Override
	public void writeJS(StringBuilder b) {
		b.append('[');
		for (int i = 0; i < row; i++) {
			b.append('[').append(data[i][0]);
			for (int j = 1; j < col; j++) {
				b.append(',').append(data[i][j]);
			}
			b.append(']');
		}		
		b.append(']');
	}

	@Override
	public void writeXML(StringBuilder b) {
		b.append("<matrix rows='").append(row)
		.append("' cols='").append(col).append("'>");
		for (int i = 0; i < row; i++) {
			for (int j = 0; j < col; j++) {
				b.append(data[i][j]).append(' ');
			}
		}		
		b.append("</matrix>");
	}
	public static void main(String[] args){
		Matrix a = new Matrix(2,3,-3,3);
		Matrix b = new Matrix(3,2,-3,3);
		Matrix c = a.multiply(b);
		System.out.println(a);
		System.out.println(b);
		System.out.println(c);
		StringBuilder buf = new StringBuilder();
		c.writeHTML(buf);
		System.out.println(buf);
	}

}
