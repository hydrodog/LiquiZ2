package org.adastraeducation.liquiz;

public class Category {
	private String name;
	private int points;
	public Category(String name, int points) {
		this.name = name; this.points = points;
	}
	public String toString() { return "Category " + name + " points=" + points; }
	public String getName() { return name; }
	public int getPoints() { return points; }
}
