package org.adastraeducation.liquiz.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.adastraeducation.liquiz.JsonTranslator;
import org.adastraeducation.liquiz.Quiz;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.google.gson.Gson;
import com.mongodb.MongoClient;

public class ReadsInFromPost{

	public static String JsonString(HttpServletRequest request) throws IOException{

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
		
		String je = "";
		
			Gson gson = JsonTranslator.getGson();
			Quiz quiz1 = gson.fromJson(jsonString, Quiz.class);
			System.out.println("Quiz Object: ");
			System.out.println(quiz1);
			
			if(quiz1 != null){
				saveToMongoDB(quiz1);
			}
			
			
			je = toJsonString();
			System.out.println();
			System.out.println("begin");
			System.out.println(je);
		
		
		return je;
		
	}
		
		public static void saveToMongoDB(Quiz quiz){
			final Morphia morphia = new Morphia();
			morphia.mapPackage("org.adastraeducation.liquiz"); 
			
			MongoClient mongoClient = new MongoClient("127.0.0.1", 27017);
			
			
			Datastore quiz_Database = morphia.createDatastore(mongoClient, "quiz_Database");

			quiz_Database.save(quiz); 
			
		}
		
		
		public static String toJsonString(){
			final Morphia morphia = new Morphia();
			morphia.mapPackage("org.adastraeducation.liquiz"); 
			MongoClient mongoClient = new MongoClient("127.0.0.1", 27017);
			Datastore database = morphia.createDatastore(mongoClient, "quiz_Database");
			Query<Quiz> query = database.createQuery(Quiz.class);
			long count = query.countAll();
			System.out.println(count);
			String je = "";
			
			List<Quiz> quizzes = query.asList();
			
			Gson gson = JsonTranslator.getGson();
			je = gson.toJson(quizzes.get(quizzes.size()-1));
			
			
			return je;
			
//			printQuiz(query.field("quizName").equal("Algebra quiz").get());
//			System.out.println();
//			System.out.println();
//			printQuiz(query.field("quizName").equal("Quiz Demo #1").get());
		}
		

		
	
}

	