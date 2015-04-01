package org.adastraeducation.liquiz;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
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
	private static HashMap<String, Pattern> lookUpPattern;
	 private static String fileLocation;
	 
	static {
		lookUpStdChoice = new HashMap<String, ArrayList<Answer>>();
		ArrayList<Answer> comp = new ArrayList<Answer>();
		comp.add(new Answer(new Text("O(1)")));
		comp.add(new Answer(new Text("O(n)")));
		comp.add(new Answer(new Text("O(n^2)")));
		comp.add(new Answer(new Text("O(n log(n))")));
		lookUpStdChoice.put("Complexity", comp);
		
//		lookUpPattern = new HashMap<String, Pattern>();
//		public static QuestionPattern MASS = new QuestionPattern("([0-9|\.]+)(kg|kilogram)");
//		public static QuestionPattern LENGTH = new QuestionPattern("([0-9|\.]+)(m|meter)");
//		public static QuestionPattern TIME = new QuestionPattern("([0-9|\.]+)(s|second)");
//		public static QuestionPattern VELOCITY = new QuestionPattern("([0-9|\.]+)(m\\/s|meter\\/second)");
//		lookUpPattern.put("Mass", Pattern.compile("(\\d{0,2}(\\.\\d{0,2}))(kg|kilogram)"));
//		lookUpPattern.put("Length", Pattern.compile("(\\d{0,2}(\\.\\d{0,2}))(m|meter)"));
	}
	
	public static void regexHash() throws IOException{
		lookUpPattern = new HashMap<String, Pattern>();
		FileReader fr =new FileReader(fileLocation+File.separator+"regexPatterns.txt");
		fr.toString();
			BufferedReader inp =  new BufferedReader(fr);
			String line = "";
			while((line = inp.readLine()) != null){
				String parts[] = line.split("\\s+");
				lookUpPattern.put(parts[0], Pattern.compile(parts[1]));
			}
			inp.close();
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
	//These methods are to get the file location of "regexPatterns" into the bean through FileLocation.jsp file
	public String getFileLocation() {
	return fileLocation;
	}

	public void setFileLocation(String fileLocation) {
	this.fileLocation = fileLocation;
	}
	
	//TODO: write methods to write out hashmaps to database
}