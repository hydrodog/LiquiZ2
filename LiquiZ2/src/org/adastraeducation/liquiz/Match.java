package org.adastraeducation.liquiz;

import java.util.ArrayList;

public class Match extends Question implements java.io.Serializable{
	private ArrayList<Answer> leftSide;					//leftSide is the prompt, so length of leftSide must be >= length of right side
	private ArrayList<Answer> rightSide;				//rightSide is the response to leftSide
	private ArrayList<Integer> matchReferences;		    //length of matchReferences must equal length of leftSide.  matchReferences should be set up so that the correct answer to leftSide.get(i) is rightSide.get(matchReferences.get(i)).

	
	public Match(){
		super();
	}
	public Match(int id, int points, int level, ArrayList<Answer> leftSide, ArrayList<Answer> rightSide, ArrayList<Integer> matchReferences) {
		super(id, points, level);
		this.leftSide=leftSide;
		this.rightSide=rightSide;
		this.matchReferences=matchReferences;
	}

	public void writeHTML(DisplayContext dc) {
		// TODO Auto-generated method stub
		
	}

	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"match\", ").append(getId()).append(", [");
		for (int i=0; i<leftSide.size(); i++) {
			if (i!=0) {
				dc.append(", ");
			}
			dc.appendQuotedJS(leftSide.get(i).getName());
		}
		dc.append("], \n\t\t\t[");
		for (int i=0; i<rightSide.size(); i++) {
			if (i!=0) {
				dc.append(", \n\t\t\t");
			}
			dc.appendQuotedJS(rightSide.get(i).getName());
		}
		dc.append("]]");
	}

	public void writeXML(StringBuilder b) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public double grade(String[] s) {
		// TODO Auto-generated method stub
		return 0;
	}
	public ArrayList<Answer> getLeftSide() {
		return leftSide;
	}
	public void setLeftSide(ArrayList<Answer> leftSide) {
		this.leftSide = leftSide;
	}
	public ArrayList<Answer> getRightSide() {
		return rightSide;
	}
	public void setRightSide(ArrayList<Answer> rightSide) {
		this.rightSide = rightSide;
	}
	public ArrayList<Integer> getMatchReferences() {
		return matchReferences;
	}
	public void setMatchReferences(ArrayList<Integer> matchReferences) {
		this.matchReferences = matchReferences;
	}
	@Override
	public String toString() {
		return "Match [id=" + getId() + ", leftSide=" + leftSide + ", rightSide=" + rightSide + "]";
	}
	
	
}
