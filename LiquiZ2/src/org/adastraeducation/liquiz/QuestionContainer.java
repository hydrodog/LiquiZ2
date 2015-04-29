package org.adastraeducation.liquiz;
import java.util.ArrayList;
import java.util.Arrays;

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
	
	public void writeHTML (StringBuilder b) {
		b.append("<div class='quesHeader'>").append(getName()).append(": ").append(getTotalPoints()).append(" points</div>");
		b.append("<div class='question'>\n");
		for (Displayable d : displayables) {
			d.writeHTML(b);
			b.append("\n");
			// TODO: should there be a new line or a space separating each? 
			// should we create objects to represent spaces & newlines?
		}
		b.append("</div>\n\n");
	}

	public void writeXML (StringBuilder b) {
		b.append("<Q>");
		for (Displayable d : displayables) {
			d.writeXML(b);
		}
		b.append("</Q>");
	}

	public void writeJS (StringBuilder b) {
		b.append("{title: 'foo', className: 'claz' , content:[");
		if (displayables.size() > 0) {
			displayables.get(0).writeJS(b);
			if (displayables.size() > 1) {
				for (int i = 1; i < displayables.size(); i++) {
					b.append(',');
					displayables.get(i).writeJS(b);;
				}
			}
		}
		b.append("] };");
	}
}
