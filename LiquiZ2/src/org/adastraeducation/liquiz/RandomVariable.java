package org.adastraeducation.liquiz;

public abstract class RandomVariable extends DisplayElement {
	private int id;
	String name;
	public RandomVariable(int id, String name) {
		this.id = id;
		this.name = name;
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
	
	// When eval is called the random variable is randomized.
	public abstract void eval();
	public void writeHTML(DisplayContext dc) {
		dc.append("Unimplemented Random Variable");
	}
	public void writeXML(StringBuilder b) {
		b.append("Unimplemented Random Variable");
	}
}
