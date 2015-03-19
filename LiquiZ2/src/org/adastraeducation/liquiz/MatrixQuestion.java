package org.adastraeducation.liquiz;

import java.util.ArrayList;
/*
 * @author Dov Kruger
 * Represents a matrix of numeric fillin questions to quickly
 * enter a matrix of answers from the user
 */
public class MatrixQuestion extends Question {
	private int rows;
	private int cols;
	
	public int getRows(){
		return rows;
	}
	
	public void setRows(int r){
		rows = r;
	}
	
	public int getCols(){
		return cols;
	}
	
	public void setCols(int c){
		cols = c;
	}
	
	public MatrixQuestion(){}
	
	public MatrixQuestion(int id, int points, int level, int rows, int cols) {
		super(id, points, level, (ArrayList<Answer>) null);
		this.rows = rows;
		this.cols = cols;
	}
	public MatrixQuestion(int points, int level, int rows, int cols) {
		super(points, level);
		this.rows = rows;
		this.cols = cols;
	}
	
	@Override
	public void writeHTML(StringBuilder b) {
		b.append("<table class='matquest'>\n");
		final String EL = "<input name='" +
				getId() + "' class='matquest'/>"; 
		for (int i = 0; i < rows; i++) {
			b.append("<tr>");
			for (int j = 0; j < cols; j++) {
				b.append("<td>").append(EL).append("</td>");
			}
			b.append("</tr>\n");
		}		
		b.append("</table>");
	}

	//TODO: Fix the commas after each row, they aren't there!
	@Override
	public void writeJS(StringBuilder b) {
		b.append("matquest(").append(rows)
			.append(',').append(cols).append(')');
	}

	@Override
	public void writeXML(StringBuilder b) {
		b.append("<matquest rows='").append(rows)
		.append("' cols='").append(cols).append("'/>");
	}
	public static void main(String[] args){
		MatrixQuestion a = new MatrixQuestion(4, 1, 3,4);
		StringBuilder buf = new StringBuilder();
		a.writeHTML(buf);
		buf.append("\n\n\n");
		a.writeXML(buf);
		System.out.println(buf);
	}
	@Override
	public boolean isCorrect(String s) {
		// TODO Auto-generated method stub
		return false;
	}
	public boolean isCorrect(DisplayElement d) {
		// TODO
		return false;
	}
}
