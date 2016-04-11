package org.adastraeducation.liquiz.database;

import java.util.Iterator;
import java.util.List;

import org.adastraeducation.liquiz.Quiz;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.MorphiaIterator;
import org.mongodb.morphia.query.Query;
import static org.adastraeducation.liquiz.test.TestQuizJavascript.*;
import com.mongodb.MongoClient;

public class MongoDB_Quiz {

	public static void main(String[] args) {


		final Morphia morphia = new Morphia();
		morphia.mapPackage("org.adastraeducation.liquiz"); 
		
		MongoClient mongoClient = new MongoClient("127.0.0.1", 27017);
		
		
		Datastore quiz_Database = morphia.createDatastore(mongoClient, "quiz_Database");
//		quiz_Database.delete(quiz_Database.createQuery(Quiz.class));

		quiz_Database.save(test1()); 
		quiz_Database.save(test2()); 
		quiz_Database.save(test3()); 
		 
		Query<Quiz> query = quiz_Database.createQuery(Quiz.class);
		Quiz quiz = query.get();			// equivalent to findOne()
		
		List<Quiz> quizzes = query.asList();	// will have memory issues if it's a very large collection
		
		Iterable<Quiz> fetch = query.fetch();   // works when collection is large
		((MorphiaIterator) fetch).close();
		
		Iterator<Quiz> iterator = fetch.iterator();
		
//		while(iterator.hasNext()){
//			iterator.next();
//		}
//		
//		iterator = fetch.iterator();		// fetch is reusable
//		while(iterator.hasNext()){
//			iterator.next();
//		}
		
//		System.out.println(query.field("quizName").equal("Algebra quiz").get());
		printQuiz(query.field("quizName").equal("Algebra quiz").get());
								 
	}

}
