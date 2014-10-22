package org.adastraeducation.liquiz.util;

/*
 * author:Yingzhu
 * This is for Number question
 */

public class Number {
	private double number;
	private double appro;
	
	public Number(double number, double appro){
		this.number=number;
		this.appro=appro;
	}
	
	
	public boolean equal(double target){
		return number-appro <= target && target <= number+appro;
	}
	
	public double getNumber(){
		return number;
	}
	
	public void setNumber(double number){
		this.number = number;
	}
	
	public double getAppro(){
		return appro;
	}
	
	public void setAppro(double appro){
		this.appro = appro;
	}
}
