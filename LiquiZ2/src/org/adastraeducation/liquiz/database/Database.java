package org.adastraeducation.liquiz.database;

import java.sql.*;
import java.util.ArrayList;

import org.adastraeducation.liquiz.*;

/**
 * In order to pre-load everything from database
 * @author yijinkang
 *
 */

public class Database {
	private static ArrayList<User> users;
	private static ArrayList<Course> courses;
	private static ArrayList<Policy> policies;
	private static ArrayList<Quiz> quizzes;
	private static ArrayList<QuestionContainer> quesCons;
	private static ArrayList<Question> questions;
	private static ArrayList<Answer> answers;
	private static ArrayList<DisplayElement> displayElements;
	
	private static int getMaxOf(String sql) {
		Connection conn = null;
		ResultSet rs = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p1 = conn.prepareStatement(sql); 
			rs = p1.executeQuery();
			
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (rs!=null) {
					rs.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DatabaseMgr.returnConnection(conn);
			}
		}
		return 0;
	}
	
	private static <T> ArrayList<T> getMax(String column, String table, Class<T> type) {
		int max = getMaxOf("select max(" + column + ") from " + table);
		System.out.println(max);
		ArrayList<T> a = new ArrayList<T>(max);
		a.add(null);
		return a;
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
	}
	
	/**
	 * Setters and Getters
	 * Note that id starts at 1 and index starts at 0, so the first space in each ArrayList is empty
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
	public static void addDisp(DisplayElement d) {
		displayElements.add(d);
	}
	public static void setDisp(int id, DisplayElement d) {
		displayElements.set(id, d);
	}
	public static DisplayElement getDisp(int id) {
		return displayElements.get(id);
	}
}
