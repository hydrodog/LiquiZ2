package org.adastraeducation.liquiz.test;

import java.util.Arrays;
import java.util.ArrayList;

public class Contain implements displayInterface{
	private int id;
	
	private String name;
	
	private ArrayList<displayInterface> displays;
	
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
	
	public ArrayList<displayInterface> getDisplays(){
		return displays;
	}
	
	public void setDisplays(ArrayList<displayInterface> lst){
		displays = lst;
	}
	
	public Contain(){
		/*name = "Container";
		displays = new ArrayList<display>();*/
	};
	
	public Contain(int i, String s){
		this.id = i;
		this.name = s + Integer.toString(i);
	}
	
	public Contain(displayInterface[] dlst){
		this.displays = new ArrayList<displayInterface>(Arrays.asList(dlst));
	}
	
	public void add(displayInterface d){
		if(displays == null)
			displays = new ArrayList<displayInterface>();
		this.displays.add(d);
	}
	
	public void foo(){
		System.out.println("Now Contain inherits from an interface");
	}
}
