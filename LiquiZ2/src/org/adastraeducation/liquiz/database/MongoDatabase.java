package org.adastraeducation.liquiz.database;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.adastraeducation.liquiz.Answer;
import org.adastraeducation.liquiz.Code;
import org.adastraeducation.liquiz.FillIn;
import org.adastraeducation.liquiz.MatrixQuestion;
import org.adastraeducation.liquiz.MultiChoiceRadio;
import org.adastraeducation.liquiz.Question;
import org.adastraeducation.liquiz.Quiz;
import org.adastraeducation.liquiz.TextAnswer;
import org.adastraeducation.liquiz.test.TestQuizJavascript;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;

public class MongoDatabase {

	public static void main(String[] args) {
		
		final Morphia morphia = new Morphia();
		morphia.mapPackage("org.adastraeducation.liquiz"); 
		
		MongoClient mongoClient = new MongoClient("127.0.0.1", 27017);
	    Datastore Question_database = morphia.createDatastore(mongoClient, "Question_database");
	    Datastore Quiz_database = morphia.createDatastore(new MongoClient(), "Quiz_database");
	    long t0 = System.currentTimeMillis();
	    Datastore Test_database = morphia.createDatastore(new MongoClient(), "Test_database");
	    long t00 = System.currentTimeMillis();
		System.out.println("loading time for 100k objects");
		System.out.println((t00-t0)/1e3);
		Question_database.ensureIndexes();
	    
	   
		int qid=1;
		int qcid=0;
		Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
		Test_database.delete(Test_database.createQuery(Question.class));
		long t1 = System.currentTimeMillis();
		long size = (int)1e4;
		for(long i = 0; i < size ; i++){
			Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
		}
		long t2 = System.currentTimeMillis();
		System.out.println("saving time for 10k objects");
		System.out.println((t2-t1)/1e3);
		
		Test_database.delete(Test_database.createQuery(Question.class));
		System.out.println(Test_database.getCount(Question.class));
		long t3 = System.currentTimeMillis();
		long size1 = (int)1e5;
		for(long i = 0; i < size1 ; i++){
			Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
		}
		long t4 = System.currentTimeMillis();
		System.out.println("saving time for 100k objects");
		System.out.println((t4-t3)/1e3);
		
		/**
		 * Content in Quiz_database
		 */
//	    Quiz quiz1 = TestQuizJavascript.test1();
//		Quiz quiz2 = TestQuizJavascript.test2();
//		Quiz quiz3 = TestQuizJavascript.test3();
//		Quiz_database.save(quiz1);
//		Quiz_database.save(quiz2);
//		Quiz_database.save(quiz3);
//		
		/**
		 * Content in Question_database
		 */
//		Question q1 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		Question q2 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		Question q3 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		Question q4 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		Question q5 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		Question q6 = new MatrixQuestion(qcid, qid++,10,100,1,8);
//		
//		Question q7 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		Question q8 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		Question q9 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		Question q10 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		Question q11 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		Question q12 = new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n");
//		
//		Question_database.save(q1);
//		Question_database.save(q2);
//		Question_database.save(q3);
//		Question_database.save(q7);
//		Question_database.save(q8);
//		Question_database.save(new FillIn(qcid,10,100));
//		Question_database.save(new FillIn(qcid,10,100));
//		Question_database.save(new FillIn(qcid,10,100));
//		Question_database.save(new FillIn(qcid,10,100));
//		Question_database.save(new MultiChoiceRadio(qcid,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("stegosaurus")),new Answer(new TextAnswer("dimetrodon")),new Answer(new TextAnswer("plesiosaurus"))))));
//	    Question_database.save(new MultiChoiceRadio(qcid,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("stegosaurus")),new Answer(new TextAnswer("dimetrodon")),new Answer(new TextAnswer("plesiosaurus"))))));
//	    Question_database.save(new MultiChoiceRadio(qcid,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("stegosaurus")),new Answer(new TextAnswer("dimetrodon")),new Answer(new TextAnswer("plesiosaurus"))))));
//		List<Question> questions = Question_database.find(Question.class).disableValidation().filter("className", Question.class.getName())
//				 .asList();
		
	    final Query<Quiz> query = Quiz_database.createQuery(Quiz.class);
		final List<Quiz> quizzes = query.asList();
		
		for(Quiz q : quizzes){
			System.out.println(q.quizName);
		}
		System.out.println(quizzes.size());
		List<Code> questions_code = Question_database.find(Code.class).disableValidation().filter("className", Code.class.getName()).asList();
		List<FillIn> questions_fillin = Question_database.find(FillIn.class).disableValidation().filter("className", FillIn.class.getName()).asList();
		List<MultiChoiceRadio> questions_mcdp = Question_database.find(MultiChoiceRadio.class).disableValidation().filter("className", Code.class.getName()).asList();
		List<MatrixQuestion> questions_mq = Question_database.find(MatrixQuestion.class).disableValidation().filter("className", MatrixQuestion.class.getName()).asList();

		for(Question q : questions_code){
			System.out.println(q.getClass().getName());
		}
		
		for(Question q : questions_mq){
			System.out.println(q.getClass().getName());
		}
		for(Question q : questions_fillin){
			System.out.println(q.getClass().getName());
		}
		for(Question q : questions_mcdp){
			System.out.println(q.getClass().getName());
		}
		
		
		
		
		mongoClient.close();
		
		
	}

}
