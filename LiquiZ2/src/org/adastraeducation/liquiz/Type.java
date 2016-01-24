package org.adastraeducation.liquiz;
/**
 * A Type gives information about the type of the quiz.
 * 
 * @author Ying Zhao
 *
 */
public class Type implements java.io.Serializable
{

	public String name;
	
	public Type(){
		this.name = "Quiz";
	}
	
	public Type(String name){
		this.name = name;
	}
	
	public String toString(){
		return name;
	}
	
}
