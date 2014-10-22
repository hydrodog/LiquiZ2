package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.Quiz;

public class Var implements Expression{
	private double operand;
	private String name;
	private double min;
	private double step;
	private double max;
	
	public Var(String name, double min, double max, double step){
		this.name = name;
		this.min=min;
		this.step=step;
		this.max=max;
		operand=Quiz.random(min,  max, step);

	}
	
	public Var(String name, double x){
		this.name=name;
		this.operand=x;
	}
	
	public double eval(){
		return operand;
	}
	
	public void infix(StringBuilder b){
		b.append(name);
	}
	
	public void rpn(StringBuilder b){
		b.append(name);
	}
	
	public void infixReplaceVar(StringBuilder b){
		b.append(operand);
	}
	
	public void rpnReplaceVar(StringBuilder b){
		b.append(operand);
	}
}
