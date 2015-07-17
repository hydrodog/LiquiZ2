package org.adastraeducation.liquiz;

public class RandomDouble extends RandomVariable {
	private double min, max, step;
	private double val;
	public RandomDouble(int id, String name, double min, double max, double step) {
		super(id, name);
		this.min = min; this.max = max; this.step = step;
	}
	public void eval() {
		val = Quiz.random(min, max, step);
		//TODO: Rounding needed?
//		double round = Math.round(val / step) * step;
	}
	public void writeJS(DisplayContext dc) {
		dc.append(val);
	}
}
