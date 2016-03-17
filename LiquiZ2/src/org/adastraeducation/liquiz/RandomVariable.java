package org.adastraeducation.liquiz;

public abstract class RandomVariable extends DisplayElement {
	private int rvId; // rvId is id for RandomVariable, don't use id as variable since it would conflict with field name 'id' in MongoDB
	String name;
	public RandomVariable(int id, String name) {
		this.rvId = id;
		this.name = name;
	}
	public int getId() {
		return rvId;
	}
	public void setId(int id) {
		this.rvId = id;
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
