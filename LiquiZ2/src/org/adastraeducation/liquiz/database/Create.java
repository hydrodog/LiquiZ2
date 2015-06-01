package org.adastraeducation.liquiz.database;

import java.sql.*;

import org.adastraeducation.liquiz.*;

/**
 * Adds a row to tables with newly created entities
 * (Currently out of date with database)
 * @author yijinkang
 *
 */
public class Create {
	
	// TODO: add to Database ArrayLists as well!
	// TODO: use new DatabaseMgr.execStmt() method? Setting parameters though?
	// TODO: should the parameters be the objects themselves?
	
	/**
	 * Updates Users table when a new user registers
	 * Last updated Apr 29 2015
	 */
	public static void createUser(User user) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Users(FirstName, LastName, Username, Password, Email) VALUES(?,?,?,?,?)");
			p.setString(1, user.getFirstName());
			p.setString(2, user.getLastName());
			p.setInt(3, user.getID());
			p.setString(4, user.getPasswd());
			p.setString(5, user.getEmail());
			p.execute();
			
			Database.addUser(user);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/**
	 * Updates Courses table when a new course is created
	 * TODO: privacy?
	 */
	public static void createCourse(String name, String privacy) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Courses(Name, Privacy) VALUES (?,?)");
			p.setString(1, name);
			p.setString(2, privacy);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/**
	 * Updates Policies table when a policy type is created
	 * Last updated Apr 29 2015
	 */
	public static void createPolicy(Policy pol) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Policies(Name, Timed, ShowAns, Scored, ShuffleQues, ShuffleAns) VALUES(?,?,?,?,?,?,?)");
			p.setString(1, pol.getName());
			p.setBoolean(2, pol.getTimed());
			p.setBoolean(3, pol.getShowAns());
			p.setBoolean(4, pol.getScored());
			p.setBoolean(6, pol.getShuffleQues());
			p.setBoolean(7, pol.getShuffleAns());
			p.execute();
			
			Database.addPolicy(pol);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/**
	 * Updates Quizzes table when a new quiz is created
	 * TODO: privacy?
	 */
	public static void createQuiz(String name, int pol, String priv) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Quizzes(Name, Policy, Privacy) VALUES(?,?,?");
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
	
	/**
	 * Updates DisplayElements table and adds to Database ArrayList when a new one is created
	 * Last updated Apr 29 2015
	 */
	public static void createDispEl(DisplayElement dispEl) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			
			if (dispEl instanceof Text) {
				PreparedStatement p1 = conn.prepareStatement("INSERT INTO DisplayElements(TextElement, DispType) VALUES (?, 'txt')");
				p1.setString(1, dispEl.getName());
				p1.execute();
			} else { // dispEl is a type of Media
				PreparedStatement p1;
				if (dispEl instanceof Audio) {
					p1 = conn.prepareStatement("INSERT INTO Media(OrigName, Path, MediaType) VALUES (?,?,?)");
					p1.setString(3, "aud");
				} else { // dispEl is a type of RectangularMedia
					RectangularMedia rMed = (RectangularMedia) dispEl;
					p1 = conn.prepareStatement("INSERT INTO Media(OrigName, Path, MediaType, Width, Height) VALUES (?,?,?,?,?)");
					String mediaType = "";
					if (dispEl instanceof Image) {
						mediaType = "img";
					} else { // media type is video
						mediaType = "vid";
					}
					p1.setString(3, mediaType);
					p1.setInt(4, rMed.getWidth());
					p1.setInt(5, rMed.getHeight());
				}
				
				p1.setString(1, dispEl.getName()); // TODO: distinguish name & path/source
				p1.setString(2, dispEl.getName());
				p1.execute();
				
				ResultSet generatedKey = p1.getGeneratedKeys();
				int key = -1;
				if(generatedKey.next()) {
					key = generatedKey.getInt(1);
				} else {
					// TODO: throw something
				}
				generatedKey.close();
				
				PreparedStatement p2 = conn.prepareStatement("INSERT INTO DisplayElements(MediaID, DispType) VALUES (?, 'med')");
				p2.setInt(1, key);
				p2.execute();
				
				Database.addDispEl(dispEl);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/**
	 * Updates Questions table when a new one is created
	 * object parameter
	 * @return auto-generated key of new Question
	 */
	public static int createQues(int points, int level, String type) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Questions(Points,Level,QuesType) VALUES (?,?,?)");
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
	
	/**
	 * Updates Answers table when a new non-numerical one is created
	 * @return auto-generated key of new Answer
	 */
	public static int createAns(int res, int el) {
		Connection conn = null;
		int key = -1;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Answers(Response, DispElID) VALUES(?, ?)");
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
	
	/**
	 * Updates Answers table when a numerical one is needed
	 * @param res response when student chooses this answer
	 * @param low lower bound of range to be accepted
	 * @param high upper bound of range to be accepted 
	 * @return auto-generated key of new Answer
	 */
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
	
	/**
	 * Update StdSet table when a new Standard Choice Set is created.
	 * Does not fill in individual choices of the set.
	 * fillStdChoices does that
	 * @return auto-generated key of new StdSet
	 */
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
	
	/**
	 * Updates StdChoice table with choices for the specified StdSet
	 * @param setId ID of Standard Choice Set
	 * @param element ID of corresponding Display Element
	 * @param seq The sequence within the set
	 */
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
	
	/** 
	 * Updates QuesAnsSeq table in order to link Questions and Answers
	 */
	public static void linkQuesAns(int qid, int aid, int seq, boolean correct) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Ques_Ans(QuesID, AnsID, Sequence, Correct) VALUES (?, ?, ?, ?)");
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
	
	/**
	 * Updates QuesAnsSeq table in order to link Questions and StdSets
	 */
	public static void linkQuesStd(int qid, int sid, int seq, boolean correct) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO Ques_Seq(QuesID, StdSetName, Sequence, StdCorrectIndex) VALUES (?, ?, ?, ?)");
			p.setInt(1, qid);
			p.setInt(2, sid);
			p.setInt(3, seq);
			p.setInt(4, -1); // TODO: -1 as temp. index of correct answer must go here
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
	 * fillQuesConElements
	 * UserPermissions???
	 * recordStudentGrades
	 */
	
	/**
	 * Record a student's response to a question and points earned when a student takes a quiz
	 * @param userID the student's database ID
	 * @param quesID the ID of the question answered
	 * @param resp the student's response to the question
	 * @param correct whether the student answered correctly
	 * @param score the number of points earned by the student
	 * @param attemptNum the attempt number (number of previous attempts + 1)
	 */
	public static void recordStudentResponses(int userID, int quesID, String[] resp, boolean correct, double score, int attemptNum) {
		System.out.println("in recordStudentResponses");
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO StudentResponses VALUES(?,?,?,?,?,?");
			p.setInt(1, userID);
			p.setInt(2, quesID);
			// TODO parameter 3? 
			p.setBoolean(4, correct);
			p.setDouble(5, score);
			p.setInt(6, attemptNum);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	/**
	 * Record a student's score on a quiz
	 * @param userID the student's database ID
	 * @param quizID the ID of the quiz taken
	 * @param score the score earned by the student
	 * @param attemptNum the attempt number (number of previous attempts + 1)
	 */
	public static void recordStudentQuizScores(int userID, int quizID, double score, int attemptNum) {
		System.out.println("in recordStudentQuizScores");
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("INSERT INTO StudentQuizScores VALUES(?,?,?,?");
			p.setInt(1, userID);
			p.setInt(2, quizID);
			p.setDouble(3, score);
			p.setInt(4, attemptNum);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
}
