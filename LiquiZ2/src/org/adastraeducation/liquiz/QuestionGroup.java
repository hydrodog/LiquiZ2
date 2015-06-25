package org.adastraeducation.liquiz;

import java.util.ArrayList;

/**
 * To allow students to choose x number of questions out of y possible 
 * @author yijinkang
 *
 */
public class QuestionGroup implements Displayable {
	int id, toAnswer, pointsPerQues;
	String name;
	ArrayList<QuestionContainer> quesCons; // TODO should it have question containers or questions?
	
	public QuestionGroup(int id, int toAnswer, int pointsPerQues, String name, ArrayList<QuestionContainer> quesCons) {
		this.id = id;
		this.toAnswer = toAnswer;
		this.pointsPerQues = pointsPerQues;
		this.name = name;
		this.quesCons = quesCons;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getToAnswer() {
		return toAnswer;
	}
	
	public void setToAnswer(int toAnswer) {
		this.toAnswer = toAnswer;
	}
	
	public int getTotal() {
		return quesCons.size();
	}
	
	public int getPointsPerQues() {
		return pointsPerQues;
	}

	public void setPointsPerQues(int pointsPerQues) {
		this.pointsPerQues = pointsPerQues;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<QuestionContainer> getQuesCons() {
		return quesCons;
	}

	public void setQuesCons(ArrayList<QuestionContainer> quesCons) {
		this.quesCons = quesCons;
	}
	
	public void addQuesCons(QuestionContainer qc) {
		quesCons.add(qc);
	}
	
	@Override
	public void writeHTML(DisplayContext dc) { 
		// TODO How to format it and make it work as a form?
		dc.append("<div class='quesHeader'>").append(getName()).append(": ").append(getToAnswer() * getPointsPerQues()).append(" points</div>");
		dc.append("<div class='question' name='").append(getId()).append(">");
		dc.append("Choose ").append(getToAnswer()).append(" questions out of the following ").append(getTotal());
		for (QuestionContainer qc : quesCons) {
			qc.writeHTML(dc);
		}
		dc.append("</div>\n\n");
	}

	@Override
	public void writeXML(StringBuilder b) {
		// TODO Auto-generated method stub

	}

	@Override
	public void writeJS(DisplayContext dc) {
		// TODO Auto-generated method stub
		
	}

}
