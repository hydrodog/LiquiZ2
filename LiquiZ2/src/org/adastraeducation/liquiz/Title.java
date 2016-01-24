package org.adastraeducation.liquiz;

public class Title {
	public String name;
	
	public Title(){
		name = "";
	}
	
	public Title(String title){
		this.name = title;
	}
	
	public String toString(){
		return name;
	}
}
