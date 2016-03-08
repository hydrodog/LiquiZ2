package org.adastraeducation.liquiz.database;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

import org.adastraeducation.liquiz.*;

/**
 * Contains ArrayLists that pre-load everything from the database and hold it in RAM
 * Call functions from here when entities must be accessed
 * @author yijinkang
 *
 */

public class Database {
	private static ArrayList<User> users;
	private static HashMap<Integer, User> userById;
	private static ArrayList<Course> courses;
	private static HashMap<Integer, Course> courseById;
	private static ArrayList<Policy> policies;
	private static HashMap<Integer, Policy> policyById;
	private static ArrayList<Quiz> quizzes;
	private static HashMap<Integer, Quiz> quizById;
	private static ArrayList<QuestionContainer> quesCons;
	private static HashMap<Integer, QuestionContainer> quesConById;
	private static ArrayList<Question> questions;
	private static HashMap<Integer, Question> questionById;
	private static ArrayList<Answer> answers;
	private static HashMap<Integer, Answer> answerById;
	private static ArrayList<DisplayElement> displayElements;
	private static HashMap<Integer, DisplayElement> displayElementById;
	private static int currentId;
	
	static{
		userById = new HashMap<>();
		courseById = new HashMap<>();
		policyById = new HashMap<>();
		quizById = new HashMap<>();
		quesConById = new HashMap<>();
		questionById = new HashMap<>();
		answerById = new HashMap<>();
		displayElementById = new HashMap<>();
		currentId = 0;
	}
	
	/**
	 * Below is the original static initializer 
	 * 
	 */
	
//	static {
//		users = getMax("UserID","Users", User.class);
//		courses = getMax("CourseID","Courses", Course.class);
//		policies = getMax("PolID","Policies", Policy.class);
//		quizzes = getMax("QuizID","Quizzes", Quiz.class); 
//		quesCons = getMax("QuesConID", "QuesCon", QuestionContainer.class);
//		questions = getMax("QuesID","Questions", Question.class);
//		answers = getMax("AnsID","Answers",Answer.class);
//		displayElements = getMax("DispElID","DisplayElements", DisplayElement.class);
//		System.out.println("Now loading all");
//		Load.loadAll();
//	
//	}

	public static int getUniqueId() {
		return ++currentId;
	}
	/**
	 * Find out the maximum value in a column
	 * @param sql 'select max([column_name]) from [table]'
	 * @return maximum value in [column_name]
	 */
	private static int getMaxOf(String sql) {
		ResultSet rs = null;
		try {
			rs = DatabaseMgr.execQuery(sql);
			
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
		return 0;
	}
	
	/**
	 * Find out the maximum value in the column of a table and return an ArrayList of that size
	 * @param column the column name
	 * @param table the table name
	 * @param type the ArrayList type
	 * @return an ArrayList with enough space to have each entity in the index of its ID number
	 */
	private static <T> ArrayList<T> getMax(String column, String table, Class<T> type) {
		int max = getMaxOf("select max(" + column + ") from " + table);
		System.out.println(max);
		ArrayList<T> a = new ArrayList<T>(max);
		a.add(null);
		return a;
	}
	
	/**
	 * static initializer will load everything when this is called
	 */
	public static void start() {
		
	}
	

	
	

	/**
	 * Print the size of each ArrayList to the console
	 */
	public static void reportSizes() {
		System.out.println("Users: " + (users.size()-1));
		System.out.println("Courses: " + (courses.size()-1));
		System.out.println("Policies: " + (policies.size()-1));
		System.out.println("Quizzes: " + (quizzes.size()-1));
		System.out.println("Question Containers: " + (quesCons.size()-1));
		System.out.println("Questions: "+ (questions.size()-1));
		System.out.println("Answers: "+ (answers.size()-1));
		//std choices
		System.out.println("DisplayElements: " + (displayElements.size()-1));
	}
	
	/*
	 * Adders, Setters and Getters
	 * Note that id starts at 1 and index starts at 0, so the first space in each ArrayList is empty
	 */
	
	public static void addUser(User u) {
//		users.add(u);
		userById.put(u.getID(), u);
	}
	public static void setUser(int id, User u) {
		users.set(id, u);
	}
	public static User getUser(int id) {
//		return users.get(id);
		return userById.get(id);
	}
	public static void addCourse(Course c) {
//		courses.add(c);
		courseById.put(c.getID(), c);
	}
	public static void setCourse(int id, Course c) {
		courses.set(id, c);
	}
	public static Course getCourse(int id) {
//		return courses.get(id);
		return courseById.get(id);
	}
	public static void addPolicy(Policy p) {
//		policies.add(p);
		policyById.put(p.getID(), p);
	}
	public static void setPolicy(int id, Policy p) {
		policies.set(id, p);
	}
	public static Policy getPolicy(int id) {
//		return policies.get(id);
		return policyById.get(id);
	}
	public static void addQuiz(Quiz q) {
//		quizzes.add(q);
		quizById.put(q.getId(), q);
	}
	public static void setQuiz(int id, Quiz q) {
		quizzes.set(id, q);
	}
	public static Quiz getQuiz(int id) {
//		return quizzes.get(id);
		return quizById.get(id);
	}
	public static void addQuesCon(QuestionContainer qc) {
//		quesCons.add(qc);
		quesConById.put(qc.getId(), qc);
	}
	public static void setQuesCon(int id, QuestionContainer qc) {
		quesCons.set(id, qc);
	}
	public static QuestionContainer getQuesCon(int id) {
//		return quesCons.get(id);
		return quesConById.get(id);
	}
	public static void addQues(Question q) {
//		questions.add(q);
		questionById.put(q.getId(), q);
	}
	public static void setQues(int id, Question q) {
		questions.set(id, q);
	}
	public static Question getQues(int id) {
//		return questions.get(id);
		return questionById.get(id);
	}
	public static void addAns(Answer a) {
//		answers.add(a);
		answerById.put(a.getID(), a);
	}
	public static void setAns(int id, Answer a) {
		answers.set(id, a);
	}
	public static Answer getAns(int id) {
//		return answers.get(id);
		return answerById.get(id);
	}
	public static void addDispEl(DisplayElement d) {
//		displayElements.add(d);
		displayElementById.put(d.getID(), d);
	}
	public static void setDispel(int id, DisplayElement d) {
		displayElements.set(id, d);
	}
	public static DisplayElement getDispEl(int id) {
//		return displayElements.get(id);
		return displayElementById.get(id);
	}
	
	public static void main(String[] args) {
		/*
		 * test addUser/getUser function
		 */
		Database.addUser(new User(1,"Ying"));
		Database.addUser(new User(2,"Zhao"));
		
		System.out.println(Database.getUser(1));
		System.out.println(Database.getUser(2));
		
		/*
		 * test add/getCourse function
		 */
		Database.addCourse(new Course(593,"Data Structure & Algorithm"));
		Database.addCourse(new Course(810,"Intro to Java"));
		
		System.out.println(Database.getCourse(593));
		System.out.println(Database.getCourse(810));
		/*
		 * test add/getPolicy function
		 */
		Database.addPolicy(new Policy(1,"Dov's Policy"));
		
		System.out.println(Database.getPolicy(1));
		
		
	}
}
