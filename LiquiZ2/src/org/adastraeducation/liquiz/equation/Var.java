package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.Quiz;

public class Var{
	private double operand;
	private String name;
	private double min;
	private double step;
	private double max;
	
	public double getOperand(){
		return this.operand;
	}
	
	public void setOperand(double d){
		this.operand = d;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String s){
		this.name = s;
	}
	
	public double getMin(){
		return this.min;
	}
	
	public void setMin(double d){
		this.min = d;
	}
	
	public double getStep(){
		return this.step;
	}
	
	public void setStep(double d){
		this.step = d;
	}
	
	public double getMax(){
		return this.max;
	}
	
	public void setMax(double m){
		this.max = m;
	}
	
	public Var(){
		
	}
	
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
	
	public double randOperand()
	{
		operand=Quiz.random(min,  max, step);
		return operand;
	}
}
