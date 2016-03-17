package org.adastraeducation.liquiz.database;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.adastraeducation.liquiz.Answer;
import org.adastraeducation.liquiz.Audio;
import org.adastraeducation.liquiz.Cloze;
import org.adastraeducation.liquiz.Code;
import org.adastraeducation.liquiz.Course;
import org.adastraeducation.liquiz.DisplayElement;
import org.adastraeducation.liquiz.Displayable;
import org.adastraeducation.liquiz.Essay;
import org.adastraeducation.liquiz.FileUpload;
import org.adastraeducation.liquiz.FillIn;
import org.adastraeducation.liquiz.Image;
import org.adastraeducation.liquiz.Match;
import org.adastraeducation.liquiz.Matrix;
import org.adastraeducation.liquiz.MatrixQuestion;
import org.adastraeducation.liquiz.MultiChoiceRadio;
import org.adastraeducation.liquiz.Policy;
import org.adastraeducation.liquiz.Question;
import org.adastraeducation.liquiz.QuestionContainer;
import org.adastraeducation.liquiz.Quiz;
import org.adastraeducation.liquiz.TextAnswer;
import org.adastraeducation.liquiz.TextInstruction;
import org.adastraeducation.liquiz.TextP;
import org.adastraeducation.liquiz.User;
import org.adastraeducation.liquiz.Video;
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
	    Datastore question_Database = morphia.createDatastore(mongoClient, "question_Database");
	    Datastore quiz_Database = morphia.createDatastore(mongoClient, "quiz_Database");
	    Datastore user_Database = morphia.createDatastore(mongoClient, "user_Database");
	    Datastore course_Database = morphia.createDatastore(mongoClient, "course_Database");
	    Datastore policy_Database = morphia.createDatastore(mongoClient, "policy_Database");
	    Datastore qContainer_Database = morphia.createDatastore(mongoClient, "qContainer_Database");
	    Datastore answer_Database = morphia.createDatastore(mongoClient, "answer_Database");
	    Datastore displayElement_Database = morphia.createDatastore(mongoClient, "displayElement_Database");
	    /**Time test for loading 100k objects in Test_database */
//	    long t0 = System.currentTimeMillis();
//	    Datastore Test_database = morphia.createDatastore(new MongoClient(), "Test_database");
//	    long t00 = System.currentTimeMillis();
//		System.out.println("loading time for 100k objects"); // about 0.001s
//		System.out.println((t00-t0)/1e3);
//		Question_database.ensureIndexes();
	    
	   
		int qid=1;
		int qcid=0;
		/**Time test for saving 10k/100k objects in Test_database */
//		Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
//		Test_database.delete(Test_database.createQuery(Question.class));
//		long t1 = System.currentTimeMillis();
//		long size = (int)1e4;
//		for(long i = 0; i < size ; i++){
//			Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
//		}
//		long t2 = System.currentTimeMillis();
//		System.out.println("saving time for 10k objects");  // about 1.477s
//		System.out.println((t2-t1)/1e3);
//		
//		Test_database.delete(Test_database.createQuery(Question.class));
//		System.out.println(Test_database.getCount(Question.class));
//		long t3 = System.currentTimeMillis();
//		long size1 = (int)1e5;
//		for(long i = 0; i < size1 ; i++){
//			Test_database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
//		}
//		long t4 = System.currentTimeMillis();
//		System.out.println("saving time for 100k objects"); // about 9.737s
//		System.out.println((t4-t3)/1e3);
		
		
		/**
		 * Content in user_Database
		 */
		user_Database.delete(user_Database.createQuery(User.class));
	    User user1 = new User(1, "Dov");
	    User user2 = new User(2, "Ying");
	    User user3 = new User(3, "Joe");
	    User user4 = new User(4, "Dannis");
	    user_Database.save(user1);
	    user_Database.save(user2);
	    user_Database.save(user3);
	    user_Database.save(user4);
	    
	    
	    /** Test for user_Database*/
	    final Query<User> userQuery = user_Database.createQuery(User.class);
		final List<User> users = userQuery.asList();
		
		System.out.println("There are " + users.size() + " items in user_Database :" );
		for(User u : users){
			System.out.println(u.getUsername());
		}
		System.out.println();
	    
	    
		/**
		 * Content in quiz_Database
		 */
		quiz_Database.delete(quiz_Database.createQuery(Quiz.class));
	    Quiz quiz1 = TestQuizJavascript.test1();
		Quiz quiz2 = TestQuizJavascript.test2();
		Quiz quiz3 = TestQuizJavascript.test3();
		quiz_Database.save(quiz1);
		quiz_Database.save(quiz2);
		quiz_Database.save(quiz3);
		
		
		/** Test for quiz_Database*/
	    final Query<Quiz> quizQuery = quiz_Database.createQuery(Quiz.class);
		final List<Quiz> quizzes = quizQuery.asList();
		
		System.out.println("There are " + quizzes.size() + " items in quiz_Database :" );
		for(Quiz q : quizzes){
			System.out.println(q.quizName);
		}
		System.out.println();
		
		/**
		 * Content in question_Database
		 */
		question_Database.delete(question_Database.createQuery(Question.class));
		question_Database.save(new MatrixQuestion(qcid, qid++,10,100,1,8));
		question_Database.save(new Code(qid++,1,1,10,80,"public A {\n  void   (String[] args) {\n  System.\n  }\n}\n"));
		question_Database.save(new FillIn(qcid,10,100));
		question_Database.save(new MultiChoiceRadio(qcid,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(
				new TextAnswer("stegosaurus")),new Answer(new TextAnswer("dimetrodon")),new Answer(new TextAnswer("plesiosaurus"))))));
		Matrix m = new Matrix(qcid, qid++, 10, 100, 1, 9);
		m.setData(new double[][]{new double[]{9,8,7,6,5,4,3,2,1}});
		question_Database.save(m);
		question_Database.save(new Cloze(qid++,1,1,"public [[class]] A {\n  [[public]] static [[void]] main([[String]] [] args) {\n  System.[[out]].[[println]](\\\"hello \\\");\n  }\n}"));
		question_Database.save(new Match(qid++,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("Class")),new Answer(new TextAnswer("Object")),new Answer(new TextAnswer("Method")),new Answer(new TextAnswer("Message")),new Answer(new TextAnswer("Polymorphism")),new Answer(new TextAnswer("Encapsulation")))),new ArrayList<Answer>(Arrays.asList(new Answer(new TextAnswer("A concrete instance of a class")),new Answer(new TextAnswer("A request made to an object")),new Answer(new TextAnswer("Hiding the internal details of a class or object")),new Answer(new TextAnswer("Sending the same message to different objects and getting different results")),new Answer(new TextAnswer("A specification of an object")),new Answer(new TextAnswer("A function that is applied to an object")))),new ArrayList<Integer>(Arrays.asList(1,2,3))));
		question_Database.save(new FileUpload(qid++,10,100,".java"));
		question_Database.save(new FillIn(qcid,10,100));
		question_Database.save(new MultiChoiceRadio(qcid,10,100,new ArrayList<Answer>(Arrays.asList(new Answer(new Image("cat2.jpg",1,1)),new Answer(new Image("fish2.png",1,1)),new Answer(new Image("trex.jpg",1,1))))));
		question_Database.save(new Essay(qcid,1,1,10,80,200,""));
		
		
		/** Test for question_Database*/
		final Query<Question> questionQuery = question_Database.createQuery(Question.class);
		final List<Question> questions = questionQuery.asList();
		
		System.out.println("There are " + questions.size() + " items in question_Database :" );
		for(Question q : questions){
			System.out.println(q.getClass().getName());
		}
		System.out.println();
		/** Without Morphia, polymorphism is achieved using the code below */
//		List<Code> questions_code = question_Database.find(Code.class).disableValidation().filter("className", Code.class.getName()).asList();
//		List<FillIn> questions_fillin = question_Database.find(FillIn.class).disableValidation().filter("className", FillIn.class.getName()).asList();
//		List<MultiChoiceRadio> questions_mcdp = question_Database.find(MultiChoiceRadio.class).disableValidation().filter("className", MultiChoiceRadio.class.getName()).asList();
//		List<MatrixQuestion> questions_mq = question_Database.find(MatrixQuestion.class).disableValidation().filter("className", MatrixQuestion.class.getName()).asList();
//		List<Matrix> questions_matrix = question_Database.find(Matrix.class).disableValidation().filter("className", Matrix.class.getName()).asList();
//		List<Cloze> questions_cloze = question_Database.find(Cloze.class).disableValidation().filter("className", Cloze.class.getName()).asList();
//		List<Match> questions_match = question_Database.find(Match.class).disableValidation().filter("className", Match.class.getName()).asList();
//		List<FileUpload> questions_fu = question_Database.find(FileUpload.class).disableValidation().filter("className", FileUpload.class.getName()).asList();
//		List<FillIn> questions_fl = question_Database.find(FillIn.class).disableValidation().filter("className", FillIn.class.getName()).asList();
//		List<Essay> questions_essay = question_Database.find(Essay.class).disableValidation().filter("className", Essay.class.getName()).asList();
//		for(Question q : questions_code){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_mq){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_fillin){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_mcdp){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_matrix){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_cloze){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_fu){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_fl){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_match){
//			System.out.println(q.getClass().getName());
//		}
//		for(Question q : questions_essay){
//			System.out.println(q.getClass().getName());
//		}
		
		
		/**
		 * Content in course_Database
		 */
		course_Database.delete(course_Database.createQuery(Course.class));
		Course course1 = new Course(1, "Data Structure");
		Course course2 = new Course(2, "Intro to Java Programming");
		Course course3 = new Course(3, "Intro to C++ Programming");
		course_Database.save(course1);
		course_Database.save(course2);
		course_Database.save(course3);
		
		
		/** Test for course_Database*/
	    final Query<Course> courseQuery = course_Database.createQuery(Course.class);
		final List<Course> courses = courseQuery.asList();
		
		System.out.println("There are " + courses.size() + " items in course_Database :" );
		for(Course c : courses){
			System.out.println(c.getName());
		}
		System.out.println();
		
		
		/**
		 * Content in policy_Database
		 */
		policy_Database.delete(policy_Database.createQuery(Policy.class));
		Policy policy1 = new Policy(1, "Dov");
		Policy policy2 = new Policy(2, "Kim");
		Policy policy3 = new Policy(3, "David");
		policy_Database.save(policy1);
		policy_Database.save(policy2);
		policy_Database.save(policy3);
		
		
		/** Test for policy_Database */
	    final Query<Policy> policyQuery = policy_Database.createQuery(Policy.class);
		final List<Policy> policies = policyQuery.asList();
		
		System.out.println("There are " + policies.size() + " items in policy_Database :" );
		for(Policy p : policies){
			System.out.println(p.getName());
		}
		System.out.println();
		
		
		/**
		 * Content in qContainer_Database
		 */
		qContainer_Database.delete(qContainer_Database.createQuery(QuestionContainer.class));
		QuestionContainer qc1 = new QuestionContainer(++qcid,"Mergesort","grid",new ArrayList<Displayable>());
		QuestionContainer qc2 = new QuestionContainer(++qcid,"Java","code",new ArrayList<Displayable>());     
		QuestionContainer qc3 = new QuestionContainer(++qcid,"Java","cloze", new ArrayList<Displayable>());
		qContainer_Database.save(qc1);
		qContainer_Database.save(qc2);
		qContainer_Database.save(qc3);
		
		
		/** Test for qContainer_Database */
	    final Query<QuestionContainer> qcQuery = qContainer_Database.createQuery(QuestionContainer.class);
		final List<QuestionContainer> qcs = qcQuery.asList();
		
		System.out.println("There are " + qcs.size() + " items in qContainer_Database :" );
		for(QuestionContainer qc : qcs){
			System.out.println(qc.getName());
		}
		System.out.println();
		
		
		/**
		 * Content in answer_Database
		 */
		answer_Database.delete(answer_Database.createQuery(Answer.class));
		Answer ans1 = new Answer(new TextAnswer("Class"));
		Answer ans2 = new Answer(new TextAnswer("Object"));
		Answer ans3 = new Answer(new Image("cat2.jpg",1,1));
		Answer ans4 = new Answer(new TextAnswer("dimetrodon"));
		answer_Database.save(ans1);
		answer_Database.save(ans2);
		answer_Database.save(ans3);
		answer_Database.save(ans4);
		
		
		/** Test for answer_Database */
	    final Query<Answer> ansQuery = answer_Database.createQuery(Answer.class);
		final List<Answer> answers = ansQuery.asList();
		
		System.out.println("There are " + answers.size() + " items in answer_Database :" );
		for(Answer a : answers){
			System.out.println(a.getName());
		}
		System.out.println();
		

		/**
		 * Content in displayElement_Database
		 */
		displayElement_Database.delete(displayElement_Database.createQuery(TextP.class));
		displayElement_Database.delete(displayElement_Database.createQuery(TextInstruction.class));
		displayElement_Database.delete(displayElement_Database.createQuery(Audio.class));
		displayElement_Database.delete(displayElement_Database.createQuery(Video.class));
		DisplayElement de1 = new TextP("Which one is the dinosaur?");
		DisplayElement de2 = new TextInstruction("listen to the following audio file and pick the name of the main character.");
		DisplayElement de3 = new Audio("clip1.mp3");
		DisplayElement de4 = new Video("Tacoma Narrows Bridge Collapse.mp4",10,10);
		displayElement_Database.save(de1);
		displayElement_Database.save(de2);
		displayElement_Database.save(de3);
		displayElement_Database.save(de4);
		
		
		List<TextP> de_TextP = displayElement_Database.find(TextP.class).disableValidation().filter("className", TextP.class.getName()).asList();
		List<TextInstruction> de_TextInst = displayElement_Database.find(TextInstruction.class).disableValidation().filter("className", TextInstruction.class.getName()).asList();
		List<Audio> de_Audio = displayElement_Database.find(Audio.class).disableValidation().filter("className", Audio.class.getName()).asList();
		List<Video> de_Video = displayElement_Database.find(Video.class).disableValidation().filter("className", Video.class.getName()).asList();
		/** Test for displayElement_Database */
	    final Query<DisplayElement> deQuery = displayElement_Database.createQuery(DisplayElement.class);
		final List<DisplayElement> des = deQuery.asList();
		/** With Morphia for MongoDB polymorphism can achieved easily*/
		System.out.println(des.size());
		for(DisplayElement de : des){
			System.out.println(de.getClass().getName());
		}
		
		/** Without Morphia we can only do like below */
//		System.out.println("There are " +(de_TextP.size() + de_TextInst.size() + de_Audio.size() + de_Video.size())+ " items in displayElement_Database :" );
//		for(TextP tp : de_TextP){
//			System.out.println(tp.getClass().getName());
//		}
//		for(TextInstruction tp : de_TextInst){
//			System.out.println(tp.getClass().getName());
//		}
//		for(Audio tp : de_Audio){
//			System.out.println(tp.getClass().getName());
//		}
//		for(Video tp : de_Video){
//			System.out.println(tp.getClass().getName());
//		}
		System.out.println();
		
		mongoClient.close();
		
		
	}

}
