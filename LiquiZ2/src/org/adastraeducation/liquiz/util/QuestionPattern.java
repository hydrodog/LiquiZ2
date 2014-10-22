package org.adastraeducation.liquiz.util;

/*
 * author: Yingzhu
 * This is QuizPattern to create the rules for limiting users' input
 */

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QuestionPattern {
	private String regex;
	Pattern p;
	
	public QuestionPattern(String regex){
		this.regex=regex;
		p=Pattern.compile(regex);
	}
	
	//match the input whether they are right
	public boolean isMatch(String input){
		Matcher m = p.matcher(input);
		if(m.matches())
			return true;
		else
			return false;
	}
	
	public String getValue(String input){    // get the number in the input
		Matcher m = p.matcher(input);
		if(m.matches()){
			Pattern p2 = Pattern.compile("[0-9]+|.");
			for(int i=1;i<=m.groupCount();i++){
				String temp = m.group(i);
				Matcher m2 = p2.matcher(temp);
				if(m2.matches())
					return temp;
			}
		}
		return null;
	}
}
