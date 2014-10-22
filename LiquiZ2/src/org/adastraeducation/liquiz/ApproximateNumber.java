package org.adastraeducation.liquiz;

/*
 * author:Yingzhu
 * This is for Number question
 * Useless temporarily. Do not use them, Use Fillin instead.
 */

public class ApproximateNumber extends FillIn {
	private double number;
	private double appro;
	
	public ApproximateNumber(int id, int points, int level, double number, double appro){
		super(id,points,level);
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
	
	public double getApproximate(){
		return appro;
	}
	
	public void setApproximate(double appro){
		this.appro = appro;
	}
}
