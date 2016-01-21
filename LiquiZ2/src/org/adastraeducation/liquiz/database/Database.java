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
	private static ArrayList<Course> courses;
	private static ArrayList<Policy> policies;
	private static ArrayList<Quiz> quizzes;
	private static HashMap<String, Quiz> quizByName;
	private static ArrayList<QuestionContainer> quesCons;
	private static ArrayList<Question> questions;
	private static ArrayList<Answer> answers;
	private static ArrayList<DisplayElement> displayElements;
	
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
	
	static {
		users = getMax("UserID","Users", User.class);
		courses = getMax("CourseID","Courses", Course.class);
		policies = getMax("PolID","Policies", Policy.class);
		quizzes = getMax("QuizID","Quizzes", Quiz.class); 
		quesCons = getMax("QuesConID", "QuesCon", QuestionContainer.class);
		questions = getMax("QuesID","Questions", Question.class);
		answers = getMax("AnsID","Answers",Answer.class);
		displayElements = getMax("DispElID","DisplayElements", DisplayElement.class);
		System.out.println("Now loading all");
		Load.loadAll();
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
		users.add(u);
	}
	public static void setUser(int id, User u) {
		users.set(id, u);
	}
	public static User getUser(int id) {
		return users.get(id);
	}
	public static void addCourse(Course c) {
		courses.add(c);
	}
	public static void setCourse(int id, Course c) {
		courses.set(id, c);
	}
	public static Course getCourse(int id) {
		return courses.get(id);
	}
	public static void addPolicy(Policy p) {
		policies.add(p);
	}
	public static void setPolicy(int id, Policy p) {
		policies.set(id, p);
	}
	public static Policy getPolicy(int id) {
		return policies.get(id);
	}
	public static void addQuiz(Quiz q) {
		quizzes.add(q);
	}
	public static void setQuiz(int id, Quiz q) {
		quizzes.set(id, q);
	}
	public static Quiz getQuiz(int id) {
		return quizzes.get(id);
	}
	public static void addQuesCon(QuestionContainer qc) {
		quesCons.add(qc);
	}
	public static void setQuesCon(int id, QuestionContainer qc) {
		quesCons.set(id, qc);
	}
	public static QuestionContainer getQuesCon(int id) {
		return quesCons.get(id);
	}
	public static void addQues(Question q) {
		questions.add(q);
	}
	public static void setQues(int id, Question q) {
		questions.set(id, q);
	}
	public static Question getQues(int id) {
		return questions.get(id);
	}
	public static void addAns(Answer a) {
		answers.add(a);
	}
	public static void setAns(int id, Answer a) {
		answers.set(id, a);
	}
	public static Answer getAns(int id) {
		return answers.get(id);
	}
	public static void addDispEl(DisplayElement d) {
		displayElements.add(d);
	}
	public static void setDispel(int id, DisplayElement d) {
		displayElements.set(id, d);
	}
	public static DisplayElement getDispEl(int id) {
		return displayElements.get(id);
	}
}
