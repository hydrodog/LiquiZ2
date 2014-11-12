package org.adastraeducation.liquiz.database;

import java.sql.*;

import org.adastraeducation.liquiz.*;

public class Create {
	
	public static void createUser(String fName, String lName, String id, String pw, String email) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Users(FirstName, LastName, Username, Password, Email) VALUES('?','?','?','?','?')");
			p.setString(1, fName);
			p.setString(2, lName);
			p.setString(3, id);
			p.setString(4, pw);
			p.setString(5, email);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createCourse(String name, String privacy) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Courses(Name, Privacy) VALUES ('?','?')");
			p.setString(1, name);
			p.setString(2, privacy);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createPolicy(String name, int timed, int showAns, int scored, int grade, int shuffleQues, int shuffleAns) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Policies(Name, Timed, ShowAns, Scored, Grade, ShuffleQues, ShuffleAns) VALUES('?',?,?,?,?,?,?)");
			p.setString(1, name);
			p.setInt(2, timed);
			p.setInt(3, showAns);
			p.setInt(4, scored);
			p.setInt(5, grade);
			p.setInt(6, shuffleQues);
			p.setInt(7, shuffleAns);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createQuiz(String name, int pol, String priv) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Quizzes(Name, Policy, Privacy) VALUES('?',?,'?'");
			p.setString(1, name);
			p.setInt(2, pol);
			p.setString(3, priv);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createDispEl(int id, String element, int seq, String type) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO DispElSeq VALUES(?,'?',?,'?')");
			p.setInt(1, id);
			p.setString(2, element);
			p.setInt(3, seq);
			p.setString(4, type);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createQues(int points, int level, String type) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Questions(Points,Level,QType) VALUES (?,?,'?')");
			p.setInt(1, points);
			p.setInt(2, level);
			p.setString(3, type);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void createAns() {
		
	}
}
