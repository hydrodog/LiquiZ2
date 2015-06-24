package org.adastraeducation.liquiz;
import java.util.ArrayList;

public class QuestionContainer implements Displayable {
	private int id;
	private String name;
	private ArrayList<Displayable> displayables;

	public QuestionContainer() {
		displayables = new ArrayList<Displayable>();
	}
	public QuestionContainer(ArrayList<Displayable> list) {
		displayables = list;
	}
	public QuestionContainer(String name, ArrayList<Displayable> list) {
		this.name = name;
		displayables = new ArrayList<Displayable>(list);
	}
	public QuestionContainer(int id, String name, ArrayList<Displayable> list) {
		this.id = id;
		this.name = name;
		displayables = list;
	}
	
	public ArrayList<Displayable> getDisplayables() {
		return displayables;
	}
	
	public void setDisplayables(ArrayList<Displayable> d){
		displayables = d;
	}
	
	public int getQuestionCount() {
		int count = 0;
		for (Displayable d : displayables) {
			if (d instanceof Question) {
				count++;
			}
		}
		return count;
	}

	public void add(Displayable d){
		displayables.add(d);
	}

	public void delete(Displayable d){
		displayables.remove(d);
	}
	
	public String getName() {
		return name;
	}

	public int getTotalPoints() {
		int totalPoints = 0;
		for (Displayable d : displayables) {
			if (d instanceof Question) {
				Question q = (Question) d;
				totalPoints += q.getPoints();
			}
		}
		return totalPoints;
	}
	
	public void writeHTML (DisplayContext dc) {
		dc.append("<div class='quesHeader'>").append(getName()).append(": ").append(getTotalPoints()).append(" points</div>");
		dc.append("<div class='question'>\n");
		for (Displayable d : displayables) {
			d.writeHTML(dc);
			dc.append("\n");
			// TODO: should there be a new line or a space separating each? 
			// should we create objects to represent spaces & newlines?
		}
		dc.append("</div>\n\n");
	}

	public void writeXML (StringBuilder b) {
		b.append("<Q>");
		for (Displayable d : displayables) {
			d.writeXML(b);
		}
		b.append("</Q>");
	}

	public void writeJS (DisplayContext dc) {
		/*
		

		// question 1
		q = page.addQuestion(1, "Mergesort", "grid", 0);
		q.appendChild(page.instructions("Show the first pass of Mergesort below"));
		q.appendChild(page.grid("1_1", [[9, 8, 7, 6, 5, 4, 3, 1]]));
		q.appendChild(Util.br());
		q.appendChild(page.emptyGrid("1_2", 1, 8));
		page.container.appendChild(q);
		*/
		dc.append("");
		for (Displayable d : displayables) {
			d.writeJS(dc);
			dc.append(",\n");
		}
	}
}
