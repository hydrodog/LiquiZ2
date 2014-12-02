package org.adastraeducation.liquiz.test;

public class display implements displayInterface{
	private int id;
	private String name;
	
	public int getId(){
		return id;
	}
	
	public void setId(int i){
		id = i;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String s){
		name = s;
	}
	
	public display(){};
	
	public display(int i, String n){
		id=i;
		name=n;
	}

	@Override
	public void foo() {
		// TODO Auto-generated method stub
		
	}
}
