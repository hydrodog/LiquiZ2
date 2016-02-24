package org.adastraeducation.liquiz;

import com.google.gson.annotations.SerializedName;

/**
 * A StyleSheet gives information about the css file of the quiz.
 * 
 * @author Ying Zhao
 *
 */
public class StyleSheet implements java.io.Serializable
 {
	private String stylesheetName;
	
	public StyleSheet(){
		this.stylesheetName = null;
	}
	
	public StyleSheet(String css){
		this.stylesheetName = css;
	}
	
	public String toString(){
		return stylesheetName;
	}

	public String getStylesheetName() {
		return stylesheetName;
	}

	public void setStylesheetName(String stylesheetName) {
		this.stylesheetName = stylesheetName;
	}
	
	
}
