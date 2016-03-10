package org.adastraeducation.liquiz;

public class RandomInteger extends RandomVariable {
	private int min, max;
	public RandomInteger(int id, String name, int min, int max) {
		super(id, name);
		this.min = min; this.max = max;
	}
	public void writeJS(DisplayContext dc) {
		dc.append(Quiz.random(min, max));
	}
	@Override
	public void eval() {
		// TODO Auto-generated method stub
		
	}
}
