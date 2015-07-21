package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Pattern;
/**
 * Contains static HashMaps of all named, shared items
 * 
 * Standard choices are named sets of answers
 * Poll: strongly agree, agree, neutral, disagree, strongly disagree
 * YesNo: Yes, No
 * 
 * Patterns are named answer patterns
 * This allows non-programmers to look up patterns rather than writing their own
 * Mass: (\d{0,2}(\.\d{0,2}))(kg|kilogram)
 * @author yijinkang
 *
 */
public class NamedObjects {
	private static HashMap<String, ArrayList<Answer>> lookUpStdChoice;
	private static HashMap<String, HashMap<String,Pattern>> lookUpPattern;
	
	static {
		lookUpStdChoice = new HashMap<String, ArrayList<Answer>>();
		
		ArrayList<Answer> comp = new ArrayList<Answer>();
		comp.add(new Answer(new TextAnswer("O(1)")));
		comp.add(new Answer(new TextAnswer("O(n)")));
		comp.add(new Answer(new TextAnswer("O(n^2)")));
		comp.add(new Answer(new TextAnswer("O(n log(n))")));
		lookUpStdChoice.put("Complexity", comp);
		
		ArrayList<Answer> yesNo = new ArrayList<Answer>();
		yesNo.add(new Answer(new TextAnswer("Yes")));
		yesNo.add(new Answer(new TextAnswer("No")));
		lookUpStdChoice.put("Yes/No", yesNo);
		
//		lookUpPattern = new HashMap<String, Pattern>();
//		public static QuestionPattern MASS = new QuestionPattern("([0-9|\.]+)(kg|kilogram)");
//		public static QuestionPattern LENGTH = new QuestionPattern("([0-9|\.]+)(m|meter)");
//		public static QuestionPattern TIME = new QuestionPattern("([0-9|\.]+)(s|second)");
//		public static QuestionPattern VELOCITY = new QuestionPattern("([0-9|\.]+)(m\\/s|meter\\/second)");
//		lookUpPattern.put("Mass", Pattern.compile("(\\d{0,2}(\\.\\d{0,2}))(kg|kilogram)"));
//		lookUpPattern.put("Length", Pattern.compile("(\\d{0,2}(\\.\\d{0,2}))(m|meter)"));
	}

	public static void addStdChoice(String name, ArrayList<Answer> answers) {
		for (Answer ans : answers) {
			ans.setCorrect(false);
		}
		lookUpStdChoice.put(name, answers);
	}
	public static ArrayList<Answer> getStdChoice(String name) {
		return lookUpStdChoice.get(name);
	}
	public static ArrayList<Answer> getCloneOfStdChoice(String name) {
		ArrayList<Answer> copy = new ArrayList<Answer>();
		ArrayList<Answer> orig = lookUpStdChoice.get(name);
		
		for (Answer ans : orig) {
			copy.add(ans.clone());
		}
		
		return copy;
	}
	
	public static Pattern getRegexPattern(String patName) {
		// Iterate through the categories and look for the pattern name
		for (HashMap<String, Pattern> cat : lookUpPattern.values()) {
			if(cat.containsKey(patName)) {
				return cat.get(patName);
			}
		}
		return null; 
	}
	
	public static Pattern getRegexPattern(String catName, String patName) {
		return lookUpPattern.get(catName).get(patName);
	}
	
	public static void addRegexPatternSet(String catName, String patName, Pattern pat) {
		lookUpPattern.get(catName).put(patName, pat);
	}
	public static void addRegexPattern(String name, HashMap<String,Pattern> map) {
		lookUpPattern.put(name, map);
	}
	

	
	//TODO: write methods to write out hashmaps to database
}
