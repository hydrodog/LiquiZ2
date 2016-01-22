package org.adastraeducation.liquiz;
/**
 * A StyleSheet gives information about the css file of the quiz.
 * 
 * @author Ying Zhao
 *
 */
public class StyleSheet implements java.io.Serializable
 {
	public String name;
	
	public StyleSheet(){
		this.name = null;
	}
	
	public StyleSheet(String css){
		this.name = css;
	}
	
	public String toString(){
		return name;
	}
}
