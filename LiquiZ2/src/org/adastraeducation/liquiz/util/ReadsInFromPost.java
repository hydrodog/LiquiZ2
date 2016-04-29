package org.adastraeducation.liquiz.util;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.adastraeducation.liquiz.JsonTranslator;
import org.adastraeducation.liquiz.Quiz;

public class ReadsInFromPost {

	public static void printOut(HttpServletRequest request) throws IOException{

	BufferedReader r = new BufferedReader(request.getReader());
	String line;
	while ((line=r.readLine()) != null){
		System.out.println(line);
		line += line;
		
	}
		
	
	Quiz quiz1 = new JsonTranslator().getGson().fromJson(line, Quiz.class);
	System.out.println("Quiz Object: ");
	System.out.println(quiz1);

	}
	
}

	