package org.adastraeducation.liquiz.util;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.adastraeducation.liquiz.JsonTranslator;
import org.adastraeducation.liquiz.Quiz;
import org.adastraeducation.liquiz.database.MongoDB_Quiz;

import com.google.gson.Gson;

public class ReadsInFromPost{

	public static void printOut(HttpServletRequest request) throws IOException{

		StringBuilder sb = new StringBuilder();
		BufferedReader reader = request.getReader();
		try{
			String line;
			while((line = reader.readLine()) != null){
				sb.append(line).append('\n');
			}
		}finally{
			reader.close();
		}
		
		String jsonString = sb.toString();
		System.out.println(jsonString);
		
		
		Gson gson = JsonTranslator.getGson();
		Quiz quiz1 = gson.fromJson(jsonString, Quiz.class);
		System.out.println("Quiz Object: ");
		System.out.println(quiz1);
		
		
//		MongoDB_Quiz.saveQuiz(quiz1);
		
		
//		new JsonTranslator();
//		Quiz quiz = TestQuizJavascript.test2();
//		String je = "";
//		je = gson.toJson(quiz);
//		System.out.println(je);
//		
//		Quiz quiz1 = gson.fromJson(je, Quiz.class);
//		System.out.println("Quiz Object: ");
//		System.out.println(quiz1);

	}
	
}

	