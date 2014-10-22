package org.adastraeducation.liquiz;
import org.adastraeducation.liquiz.util.*;

import java.util.ArrayList;

/*
 * Yingzhu 
 *  * Useless temporarily. Do not use them, Use Fillin instead.
 */

public class RegexQuestion extends FillIn {	
	
	private QuestionPattern pattern; //The regex pattern that will be used
	
	//constructors
	public RegexQuestion(int id, int points, int level, String answer, QuestionPattern pattern) {
		super(id,points,level, answer);
		this.pattern = pattern;
	}
	
	public RegexQuestion(int id, int points, int level, Answer answer, QuestionPattern pattern) {
		super(id,points,level, answer);
		this.pattern = pattern;
	}
	
	

	
	public String getTagName() { return "RegexQuestion"; }
	
	public void setPattern(QuestionPattern pattern){
		this.pattern = pattern;
	}
	
	public QuestionPattern getPattern(){
		return pattern;
	}
	
	/*
	 * For regexQuestion, the answer will only store the value. It is necessary for it to store the pattern
	 */
	public boolean isCorrect(String s) {
		String temp = this.getAnswer().getAns();
		String ans = pattern.getValue(s);
		if(ans==null)
			return false;
		else{
			if(temp.equals(ans))
				return true;
			else
				return false;
		}
	}
	

}
