package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

public class FormInput implements java.io.Serializable{
	
	public static boolean ReadStdChoices(HttpServletRequest req){
		String name=req.getParameter("name");
		System.out.println("Name:" +name);
		if(name==null)
			return false;
		ArrayList<Answer> StdChoices = new ArrayList<Answer>();
		for(int i=1;;i++){
			String choice = req.getParameter("a"+i);
			if(choice==null||choice.equals("")){
				break;
			}
			StdChoices.add(new Answer(new TextAnswer(choice)));
		}
		for(int i=0;i<StdChoices.size();i++){
			System.out.println(StdChoices.get(i));
		}
	NamedObjects.addStdChoice(name,StdChoices);
		return true;
	}
	
	public static boolean ReadRegexPatterns(HttpServletRequest req){
		String category=req.getParameter("Category");
		if(category==null)
				return false;
		String name=req.getParameter("Rname");
		String Rpattern = req.getParameter("Rpattern");
		Pattern pattern = Pattern.compile(Rpattern);
		System.out.println(category);
		System.out.println(name);
		System.out.println(Rpattern);
		System.out.println(pattern);
		if(NamedObjects.getRegexPattern(category)==null){
		HashMap<String,Pattern> pat = new HashMap<String,Pattern>();
		pat.put(Rpattern, pattern);
		NamedObjects.addRegexPattern(name, pat) ;
		}
		else
		NamedObjects.addRegexPatternSet(category, name, pattern);
		
		
		return true;
	}
}
