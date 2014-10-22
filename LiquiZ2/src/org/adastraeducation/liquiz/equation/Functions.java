package org.adastraeducation.liquiz.equation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;



public class Functions {
	public static final ArrayList<String> MATHFUNCTIONS = new ArrayList<String>(
			Arrays.asList("+","-","*","/","abs","asin","atan","cos","neg","sin","sqrt","tan"));
	
	public static final HashMap<String,Integer> LEVEL = new HashMap<String,Integer>() {
		{
			put("+",1);
			put("-",1);
			put("*",2);
			put("/",2);
			put("abs",3);
			put("asin",3);
			put("atan",3);
			put("cos",3);
			put("sin",3);
			put("sqrt",3);
			put("tan",3);
			put("neg",3);
		}
	};
}