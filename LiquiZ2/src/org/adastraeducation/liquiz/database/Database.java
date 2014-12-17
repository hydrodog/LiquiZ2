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
	private static ArrayList<Quiz> quizzes = new ArrayList<Quiz>(); 
	private static ArrayList<QuestionContainer> quesCons = new ArrayList<QuestionContainer>();
	private static ArrayList<Course> courses = new ArrayList<Course>();
	
	/**
	 * Load all quizzes and put them in quizzes ArrayList
	 */
	public static void loadQuizzes() {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Quizzes");
			ResultSet rs = p.executeQuery();
			
			while (rs.next()) {
				int quizID = rs.getInt("QuizID");
				quizzes.add(quizID, LoadEntities.loadQuiz(quizID));
				/*
				 * TODO: maybe create method to add to ArrayList and do so while loading it
				 * Will there be DispEl's & Questions not connected to a quiz?
				 */
			}
			
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	//TODO: Is there a need to load individual QCs, questions, displayables...?
	public static void loadQCs() {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM QuesCon");
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int qcID = rs.getInt("QuesConID");
				quesCons.add(qcID, LoadEntities.loadQuesCon(qcID));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void loadCourses() {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Courses");
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int courseID = rs.getInt("CourseID");
				courses.add(courseID, LoadEntities.loadCourse(courseID));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/*
	 * TODO: 
	 * find methods
	 * load 
	 */
}
