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
	
	public static int createDispEl(String type) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p1 = conn.prepareStatement("INSERT INTO DisplayElements(Type) VALUES('?')");
			p1.setString(1, type);
			p1.execute();
			
			ResultSet rs = p1.getGeneratedKeys();
			
			if (rs.next()) {
				key = rs.getInt(1);
			} else {
				// throw something;
			}
			
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return key;
	}
	
	public static void fillDispEl (int id, String element, int seq) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p2 = conn.prepareStatement("INSERT INTO DispElSeq VALUES(?,'?',?)");
			p2.setInt(1, id);
			p2.setString(2, element);
			p2.setInt(3, seq);
			p2.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static int createQues(int points, int level, String type) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Questions(Points,Level,QType) VALUES (?,?,'?')");
			p.setInt(1, points);
			p.setInt(2, level);
			p.setString(3, type);
			p.execute();
			
			ResultSet rs = p.getGeneratedKeys();
			if (rs.next()) {
				key = rs.getInt(1);
			} else {
				// throw
			}
			
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return key;
	}
	
	public static int createAns(int res, int el) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Answers(Response, Element) VALUES(?, ?)");
			p.setInt(1, res);
			p.setInt(2, el);
			p.execute();
			
			ResultSet rs = p.getGeneratedKeys();
			if (rs.next()) {
				key = rs.getInt(1);
			} else {
				//throw
			}
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return key;
	}
	
	public static int createNumAns(int res, int low, int high) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Answers(Response, LowBound, HighBound) VALUES(?, ?, ?)");
			p.setInt(1, res);
			p.setInt(2, low);
			p.setInt(3, high);
			p.execute();
			
			ResultSet rs = p.getGeneratedKeys();
			if (rs.next()) {
				key = rs.getInt(1);
			} else {
				//throw
			}
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return key;
	}
	
	public static int createStdSet(String name) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO StdSet(Name) VALUES(?)");
			p.setString(1, name);
			
			ResultSet rs = p.getGeneratedKeys();
			if(rs.next()) {
				key = rs.getInt(1);
			} else {
				//throw
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return key;
	}
	
	public static void fillStdChoices(int setId, int element, int seq) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO StdChoice VALUES (?, ?, ?)");
			p.setInt(1, setId);
			p.setInt(2, element);
			p.setInt(3, seq);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void linkQuesAns(int qid, int aid, int seq, boolean correct) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO QuesAnsSeq(Ques, Ans, Sequence, Correct) VALUES (?, ?, ?, ?)");
			p.setInt(1, qid);
			p.setInt(2, aid);
			p.setInt(3, seq);
			p.setBoolean(4, correct);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void linkQuesStd(int qid, int sid, int seq, boolean correct) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO QuesAnsSeq(Ques, StdSet, Sequence, Correct) VALUES (?, ?, ?, ?)");
			p.setInt(1, qid);
			p.setInt(2, sid);
			p.setInt(3, seq);
			p.setBoolean(4, correct);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/*
	 * TODO:
	 * linkCourseQuiz
	 * createQuesCon
	 * linkQuizQuesCon
	 * linkQuesConElements
	 * UserPermissions???
	 * recordStudentResp
	 * recordStudentGradesOnQuizzes
	 * recordStudentGrades
	 */
}
