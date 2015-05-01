package org.adastraeducation.liquiz;
import java.util.ArrayList;

/**
 * Represents a rubric for a single assignment.  A rubric is a standardized way of measuring outcomes.
 * @author Dov Kruger
 *
 */
public class Rubrik {
	private int id;
	private String name;
	private ArrayList<Category> categories;
	
	public Rubrik() {
		categories = new ArrayList<Category>();
	}
	public void addCategory(String name, int points) {
		categories.add(new Category(name, points));
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Category> getCategories() {
		return categories;
	}
	public void setCategories(ArrayList<Category> categories) {
		this.categories = categories;
	}
}
