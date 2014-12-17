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
	private static ArrayList<User> users = new ArrayList<User>();
	private static ArrayList<Course> courses = new ArrayList<Course>();
	private static ArrayList<Policy> policies = new ArrayList<Policy>();
	private static ArrayList<Quiz> quizzes = new ArrayList<Quiz>(); 
	private static ArrayList<QuestionContainer> quesCons = new ArrayList<QuestionContainer>();
	private static ArrayList<Question> questions = new ArrayList<Question>();
	private static ArrayList<Answer> answers = new ArrayList<Answer>();
	private static ArrayList<StdChoiceTwo> stdChoices = new ArrayList<StdChoiceTwo>(); 
	private static ArrayList<Displayable> displayables = new ArrayList<Displayable>();
	
	/**
	 * "Adders" and Getters - consider that id starts at 1 and index starts at 0, not that it's terrible
	 */
	public static void setUser(int id, User u) {
		users.set(id, u);
	}
	public static User getUser(int id) {
		return users.get(id);
	}
	public static void setCourse(int id, Course c) {
		courses.set(id, c);
	}
	public static Course getCourse(int id) {
		return courses.get(id);
	}
	public static void setPolicy(int id, Policy p) {
		policies.set(id, p);
	}
	public static Policy getPolicy(int id) {
		return policies.get(id);
	}
	public static void setQuiz(int id, Quiz q) {
		quizzes.set(id, q);
	}
	public static Quiz getQuiz(int id) {
		return quizzes.get(id);
	}
	public static void setQuesCon(int id, QuestionContainer qc) {
		quesCons.set(id, qc);
	}
	public static QuestionContainer getQuesCon(int id) {
		return quesCons.get(id);
	}
	public static void setQues(int id, Question q) {
		questions.set(id, q);
	}
	public static Question getQues(int id) {
		return questions.get(id);
	}
	public static void setAns(int id, Answer a) {
		answers.set(id, a);
	}
	public static Answer getAns(int id) {
		return answers.get(id);
	}
	public static void setStdChoice(int id, StdChoiceTwo sc) {
		stdChoices.set(id, sc);
	}
	public static StdChoiceTwo getStdChoice(int id) {
		return stdChoices.get(id);
	}
	public static void setDisp(int id, Displayable d) {
		displayables.set(id, d);
	}
	public static Displayable getDisp(int id) {
		return displayables.get(id);
	}
}
