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
	public void writeHTML(DisplayContext dc) {
		dc.append("<table class='matquest'>\n");
		final String EL = "<textarea name='" +
				getId() + "' class='matquest' form='quizForm' rows='1' cols='2'></textarea>"; 
		for (int i = 0; i < rows; i++) {
			dc.append("<tr>");
			for (int j = 0; j < cols; j++) {
				dc.append("<td>").append(EL).append("</td>");
			}
			dc.append("</tr>\n");
		}		
		dc.append("</table>");
	}

	@Override
	public void writeJS(DisplayContext dc) {
		dc.append("page.emptyGrid(").append(super.getId()).append(",").append(rows).append(",").append(cols).append(",null);");
	}

	@Override
	public void writeXML(StringBuilder b) {
		b.append("<matquest rows='").append(rows)
		.append("' cols='").append(cols).append("'/>");
	}
	public static void main(String[] args){
		MatrixQuestion a = new MatrixQuestion(4, 1, 3,4);
		DisplayContext dc = new DisplayContext();
		a.writeHTML(dc);
		dc.append("\n\n\n");
		StringBuilder buf = new StringBuilder();
		a.writeXML(buf);
		System.out.println(buf);
	}
	@Override
	public double grade(String[] s) {
		// TODO Auto-generated method stub
		return 0;
	}

}
