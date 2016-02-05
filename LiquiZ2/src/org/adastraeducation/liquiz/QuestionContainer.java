package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class QuestionContainer implements Displayable, java.io.Serializable{
	private int id;
	private String name;
	private ArrayList<Displayable> displayables;
	private String cssClass; // the display for this container

	public QuestionContainer() {
		displayables = new ArrayList<Displayable>();
	}

	public QuestionContainer(ArrayList<Displayable> list) {
		displayables = new ArrayList<Displayable>(list);
	}

	public QuestionContainer(String name, ArrayList<Displayable> list) {
		this.name = name;
		displayables = new ArrayList<Displayable>(list);
	}

	public QuestionContainer(int id, String name, String cssClass,
			ArrayList<Displayable> list) {
		this.id = id;
		this.name = name;
		this.cssClass = cssClass;
		displayables = new ArrayList<Displayable>(list);
	}

	public ArrayList<Displayable> getDisplayables() {
		return displayables;
	}

	public void setDisplayables(ArrayList<Displayable> d) {
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

	public void add(Displayable d) {
		displayables.add(d);
	}

	public void delete(Displayable d) {
		displayables.remove(d);
	}

	public String getName() {
		return name;
	}
	
	public int getID() {
		return id;
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

	public void writeHTML(DisplayContext dc) {
		dc.append("<div class='quesHeader'>").append(getName()).append(": ")
				.append(getTotalPoints()).append(" points</div>");
		dc.append("<div class='question'>\n");
		for (Displayable d : displayables) {
			d.writeHTML(dc);
			dc.append("\n");
			// TODO: should there be a new line or a space separating each?
			// should we create objects to represent spaces & newlines?
		}
		dc.append("</div>\n\n");
	}

	public void writeXML(StringBuilder b) {
		b.append("<Q>");
		for (Displayable d : displayables) {
			d.writeXML(b);
		}
		b.append("</Q>");
	}

	public void writeJS(DisplayContext dc) {
		dc.append("\n\t\t{\t").append("\n\t\t\t\"id\": ").append(id).
		   append(",\n\t\t\t\"title\": ").appendQuotedJS(name).
		   append(",\n\t\t\t\"type\": ").appendQuotedJS(cssClass).
		   append(",\n\t\t\t\"content\": [");
			for (Displayable d : displayables) {
				d.writeJS(dc);
			}
		dc.append(" ]\n\t\t},");
	}

	public String getCssClass() {
		return cssClass;
	}

	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}
}
