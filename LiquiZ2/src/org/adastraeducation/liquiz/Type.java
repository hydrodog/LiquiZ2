package org.adastraeducation.liquiz;

import com.google.gson.annotations.SerializedName;

/**
 * A Type gives information about the type of the quiz.
 * 
 * @author Ying Zhao
 *
 */
public class Type implements java.io.Serializable
{
	public String typeName;
	
	public Type(){
		this.typeName = "Quiz";
	}
	
	public Type(String name){
		this.typeName = name;
	}
	
	public String toString(){
		return typeName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	
	
}
