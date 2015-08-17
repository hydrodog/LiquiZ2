package org.adastraeducation.liquiz.database;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

import org.adastraeducation.liquiz.*;
import org.adastraeducation.liquiz.test.Test;

/**
 * Loading objects to ArrayLists in Database class based on database information
 * @author yijinkang
 *
 */
public class Load {
	
	public static void main(String[] args) throws IOException {
		Database.start(); // the static initializer in Database will load everything
		for (int i = 1; i <= 1; i++) { // there is currently 1 quiz in the database
			Test.testOutput("output/dbtest"+i, Database.getQuiz(i));
		}
	}

	public static void loadAll() {
		loadDispEls();
		loadAns();
		loadQues();
		loadPolicies();
		loadQuesCons();
		loadQuizzes();
		loadCourses();
		loadUsers();
		
		Database.reportSizes();
	}
	
	static HashMap<String, DisplayElementFactory> displayElementTypeMap;
	static {
		displayElementTypeMap = new HashMap<String, DisplayElementFactory>();
		displayElementTypeMap.put("itxt", new InstructionTextFactory());
		displayElementTypeMap.put("qtxt", new QuestionTextFactory());
		displayElementTypeMap.put("atxt", new AnswerTextFactory());
		displayElementTypeMap.put("rtxt", new ResponseTextFactory());
		displayElementTypeMap.put("img", new ImageFactory());
		displayElementTypeMap.put("aud", new AudioFactory());
		displayElementTypeMap.put("vid", new VideoFactory());
	}
	//TODO: QuestionFactories?
	
	/**
	 * loads all DisplayElements stored in the database to the ArrayLists in the Database class
	 */
	public static void loadDispEls() {
		System.out.println("Entered loadDispEl");
		ResultSet rs = null;
		try {
			rs = DatabaseMgr.execQuery("SELECT DisplayElements.DispElID, DisplayElements.DispType, Text.TextType, Text.TextElement, Media.Path, Media.MediaType, Media.Width, Media.Height "+
							"FROM DisplayElements "+
							"LEFT JOIN Text ON DisplayElements.DispElID = Text.TextID "+
							"LEFT JOIN Media ON DisplayElements.DispElID = Media.MediaID "+
							"ORDER BY DispElID ASC");
			
			/*
			 * DispElID | DispType | TextType | TextElement | Path | MediaType | Width | Height
			 */
			
			while(rs.next()) {
				String dType = rs.getString("DispType");
				String type; // the text or media type
				DisplayElementFactory f;
				
				if (dType.equals("txt")) {
					type = rs.getString("TextType");
				} else { //dType is med
					type = rs.getString("MediaType");
				}
				
				f = displayElementTypeMap.get(type);
				if (f == null) {
					System.out.println("Factory not found, type = " + type);
				} else {
					Database.addDispEl(f.create(rs));
				}
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
//	/**
//	 * Load specific DisplayElement -- not anymore
//	 */
//	public static DisplayElement loadDispEl(ResultSet rs) {
//		DisplayElement d = null;
//		try {
//			// Figure out what type of Displayable to load
//			String type = rs.getString("DispType");
//			DisplayElementFactory f = displayElementTypeMap.get(type);
//			if (f == null) {
//				System.out.println("Factory not found, type = " + type);
//			} else {
//				d = f.create(rs);
//				Database.addDisp(d);
//			}
//		} catch(SQLException e) {
//			e.printStackTrace();
//		} finally {
//			DatabaseMgr.closeResultSet(rs);
//			
//		}
//		return d;
//	}
	
	/**
	 * loads all Answers stored in the database to the ArrayLists in the Database class
	 */
	public static void loadAns() {
		System.out.println("Entered loadAns");
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * FROM Answers ORDER BY AnsID ASC");
			
//			| AnsID     | int(11) | NO   | PRI | NOT NULL    | auto_increment |
//			| Response  | int(11) | YES  |     |     NULL    |                |
//			| Element   | int(11) | YES  |     | NOT NULL    |                |
			
			while(rs.next()) {
				int ansID = rs.getInt("AnsID");
				int resID = rs.getInt("Response");
				int elemID = rs.getInt("DispElID");
				boolean correct = false;
				
				Answer a = new Answer(ansID, Database.getDispEl(elemID), correct, null);
				if (rs.getInt("Response") != 0) {
					Response res = new Response(Database.getDispEl(resID));
					a.setResponse(res);
				}
				Database.addAns(a);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	// Load all StdChoices to HashMap in NamedObjects - does not run; currently hardcoded into NamedObjects
	// TODO: is this needed? is StdChoice going into the database?
	public static void loadStdChoices() {
		System.out.println("Entered loadStdChoices");
		ResultSet rs = null;
		ArrayList<Answer> ans = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT StdSet.StdSetID, StdSet.Name, StdChoices.Answer FROM StdSet LEFT JOIN StdChoices ON StdSet.StdSetID = StdChoices.StdSetID ORDER BY StdSet.StdSetID ASC");

			if (rs.next()){
				String name = rs.getString("Name");
				ans = new ArrayList<Answer>();
				
				do {
					if (!name.equals(rs.getString("Name"))) {
						// Next is new StdSet
						NamedObjects.addStdChoice(name, new ArrayList<Answer>(ans));
						name = rs.getString("Name");
						ans.clear();
					}
					ans.add(Database.getAns(rs.getInt("Answer")));
				} while (rs.next());
				
				//add last stdchoice
				NamedObjects.addStdChoice(name, new ArrayList<Answer>(ans));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}

	/**
	 * loads all Questions stored in the database to the ArrayLists in the Database class
	 */
	public static void loadQues() {
        //TODO: if QuestionFactories are completed
		ResultSet rs = null;
		int quesID, points, level;
		String type;
		
		Question q = null;

		try {
			DatabaseMgr.printRemainingConns();
			String sql = 
				"SELECT Questions.QuesID, Questions.QuesType, Questions.Points, Questions.Level, Ques_Ans.AnsID, Ques_Ans.Correct, " + 
				"Ques_Ans.StdSetName, Ques_Ans.StdCorrectIndex, Questions.CaseSensitive, Questions.Pattern, Questions.Warning, Questions.DefaultText, Questions.Rows, Questions.Cols, Questions.MaxWords, Questions.LowBound, Questions.HighBound, Questions.ClozeString " +
				"FROM Questions LEFT JOIN Ques_Ans ON Questions.QuesID = Ques_Ans.QuesID " +
				"ORDER BY Questions.QuesID, Ques_Ans.Sequence ASC";
			DatabaseMgr.printRemainingConns();
			rs = DatabaseMgr.execQuery(sql);
			
			/*
			 * QuesID | QuesType | Points | Level | AnsID | Correct | StdSetName | StdCorrectIndex | CaseSensitive | Pattern | Warning | DefaultText | Rows | Cols | MaxWords | LowBound | HighBound | ClozeString
			 */
            
			if (rs.next()) {
				quesID = -1;
				
				do {
					if(quesID != rs.getInt("QuesID")) { // if the next row is a new question, create new question
						// reset ID, points, level, type for new question
						quesID = rs.getInt("QuesID"); 
						points = rs.getInt("Points");
						level = rs.getInt("Level");
						type = rs.getString("QuesType");
						
						// create appropriate question type
						if (type.equals("Fill")) {
							q = new FillIn(quesID, points, level);
							((FillIn) q).setCaseSensitive(rs.getBoolean("CaseSensitive"));
						} else if (type.equals("Mult")) {
							q = new MultiAnswer(quesID, points, level);
						} else if (type.equals("MCDD")) {
							q = new MultiChoiceDropdown(quesID, points, level);
						} else if (type.equals("MCRa")) {
							q = new MultiChoiceRadio(quesID, points, level);
						} else if (type.equals("Code")) {
							int rows = rs.getInt("Rows");
							int cols = rs.getInt("Cols");
							String defaultText = rs.getString("DefaultText");
							if (rs.wasNull()) {
								defaultText = "";
							}
							q = new Code(quesID, points, level, rows, cols, defaultText); 
						} else if (type.equals("NumR")) {
							double min = rs.getDouble("LowBound");
							double max = rs.getDouble("HighBound");
							q = new NumberRange(quesID, points, level, min, max);
						} else if (type.equals("RegX")) { //int id, int points, int level, String regex, String warning
							if(!rs.getString("Pattern").equals(null)) { // Contains the pattern directly
								q = new RegexQuestion(quesID, points, level, rs.getString("Pattern"), rs.getString("Warning"), false);
							} else { // Contains only the stored regex's name
								q = new RegexQuestion(quesID, points, level, rs.getString("PatternName"), rs.getString("Warning"), true);
							}
						} else if (type.equals("Essa")) {
							int rows = rs.getInt("Rows");
							int cols = rs.getInt("Cols");
							int maxWords = rs.getInt("MaxWords");
							String defaultText = rs.getString("DefaultText");
							if (rs.wasNull()) {
								defaultText = "";
							}
							q = new Essay(quesID, points, level, rows, cols, maxWords, defaultText);
						} else if (type.equals("Cloz")) {
							String clozeString = rs.getString("ClozeString");
							q = new Cloze(quesID, points, level, clozeString);
						}
						
						Database.addQues(q); // add question to database

					}
					
					//add answer to q
					if (rs.getInt("AnsID") != 0) { // for DisplayElement answers
						Answer a = Database.getAns(rs.getInt("AnsID"));
						a.setCorrect(rs.getBoolean("Correct"));
						q.addAns(a);
					} else if (rs.getString("StdSetName") != null) { // for Standard Answers
						// load the StdSet to answers
						q.setAns(NamedObjects.getCloneOfStdChoice(rs.getString("StdSetName"))); 
						// set the correct one
						if(rs.getInt("StdCorrectIndex") != 0) {
							q.getAns().get(rs.getInt("StdCorrectIndex")).setCorrect(true);
						}
					} 
				} while(rs.next());

			}

		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}

	/**
	 * loads all Policies stored in the database to the ArrayLists in the Database class
	 */
	public static void loadPolicies() {
		Policy pol = null;
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * FROM Policies ORDER BY PolID ASC");

			// set fields of the policy
			pol = new Policy();
			while(rs.next()) {
				pol.setID(rs.getInt("PolID"));
				pol.setAttemptNum(rs.getInt("Attempts"));
				pol.setTimed(rs.getBoolean("Timed"));
				if (rs.getBoolean("Timed")) {
					pol.setDuration(rs.getInt("TimeLimit"));
				}
				pol.setShowAns(rs.getBoolean("ShowAns"));
				pol.setShowAnsOnLastAtt(rs.getBoolean("ShowAnsOnLastAtt"));
				pol.setScored(rs.getBoolean("Scored"));
				pol.setShuffleQues(rs.getBoolean("ShuffleQues"));
				pol.setShuffleAns(rs.getBoolean("ShuffleAns"));
				if (rs.getString("AccessCode") != null) {
					pol.setAccessCode(rs.getString("AccessCode"));
				}
				Database.addPolicy(pol);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}

	/**
	 * Loads all QuesCons stored in the database to the ArrayLists in the Database class
	 */
	public static void loadQuesCons() {
		ResultSet rs = null;

		try {
			rs = DatabaseMgr.execQuery("SELECT QuesCon.QuesConID, QuesCon.QuesConName, QuesCon.CssClass, QuesConElements.Type, QuesConElements.DispElID, QuesConElements.QuesID " +
					"FROM QuesCon " +
					"LEFT JOIN QuesConElements " +
					"ON QuesCon.QuesConID = QuesConElements.QuesConID " +
					"ORDER BY QuesCon.QuesConID, QuesConElements.Sequence ASC ");

/*
 * SELECT QuesCon.QuesConID, QuesCon.QuesConName, QuesCon.CssClass, QuesConElements.Type, QuesConElements.DispElID, QuesConElements.QuesID
 * FROM QuesCon
 * LEFT JOIN QuesConElements 
 * ON QuesCon.QuesConID = QuesConElements.QuesConID
 * ORDER BY QuesCon.QuesConID, QuesConElements.Sequence ASC;
 * 
 * QuesConID | QuesConName | CssClass | Type | DispElID | QuesID
 * 	
 */
			int QCID;
			String quesConName, cssClass;
			ArrayList<Displayable> disps = new ArrayList<Displayable>();
			QuestionContainer qc = null;
			
			if (rs.next()) {
				QCID = rs.getInt("QuesConID");
				quesConName = rs.getString("QuesConName");
				cssClass = rs.getString("CssClass");
				
				do {
					if (rs.getInt("QuesConID") != QCID) {
						// copy disps into another ArrayList and create QuesCon 
						qc = new QuestionContainer(QCID, quesConName, cssClass, new ArrayList<Displayable>(disps));
						Database.addQuesCon(qc); 
						QCID = rs.getInt("QuesConID");
						quesConName = rs.getString("QuesConName");
						disps.clear();
					}
					// load element in the QuestionContainer and put it in dispEls ArrayList
					if (rs.getString("Type").equals("Elem")) { // load DisplayElement
						disps.add(Database.getDispEl(rs.getInt("DispElID")));
					} else { // load Question
						disps.add(Database.getQues(rs.getInt("QuesID")));
					}
				} while (rs.next());
				//put last QuesCon in Database ArrayList
				qc = new QuestionContainer(QCID, quesConName, cssClass, new ArrayList<Displayable>(disps));
				Database.addQuesCon(qc);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Quizzes stored in the database to the ArrayLists in the Database class
	 */
	public static void loadQuizzes() {
		ResultSet rs = null;
		try {
			rs = DatabaseMgr.execQuery("SELECT Quizzes.QuizID, Quizzes.Name, Quizzes.Desc, Quizzes.PolID, Quizzes.Privacy, Quizzes_QuesCons.QuesConID FROM Quizzes LEFT JOIN Quizzes_QuesCons ON Quizzes.QuizID = Quizzes_QuesCons.QuizID ORDER BY Quizzes.QuizID, Quizzes_QuesCons.Sequence ASC");
			
			/*
			 * SELECT Quizzes.QuizID, Quizzes.Name, Quizzes.Desc, Quizzes.PolID, Quizzes.Privacy, Quizzes_QuesCons.QuesConID 
			 * FROM Quizzes 
			 * LEFT JOIN Quizzes_QuesCons ON Quizzes.QuizID = Quizzes_QuesCons.QuizID 
			 * ORDER BY Quizzes.QuizID, QuizzesQuesCons.Sequence ASC
			 * 
			 * QuizID | Name | Desc | PolId | Privacy | QuesConID
			 */
			
			int quizID = 0;
			while (rs.next()) {
				if (quizID != rs.getInt("QuizID")) { // if new quiz
					Policy policy = Database.getPolicy(rs.getInt("PolID"));
					String name = rs.getString("Name");
					String desc = rs.getString("Desc");
					Database.addQuiz(new Quiz(rs.getInt("QuizID"), name, desc, policy));
					quizID = rs.getInt("QuizID");
				}
				Database.getQuiz(quizID).addQuestionContainer(Database.getQuesCon(rs.getInt("QuesConID")));
			} 
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Courses stored in the database to the ArrayLists in the Database class
	 */
	public static void loadCourses() {
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT Courses.CourseID, Courses.Name, Courses.Privacy, Courses_Quizzes.QuizID  FROM Courses LEFT JOIN Courses_Quizzes ON Courses.CourseID = Courses_Quizzes.CourseID ORDER BY Courses.CourseID, Courses_Quizzes.Sequence ASC");
			
			/*
			 * SELECT Courses.CourseID, Courses.Name, Courses.Privacy, CoursesQuizzes.Quiz 
			 * FROM Courses
			 * LEFT JOIN CoursesQuizzes ON Courses.CourseID = CoursesQuizzes.Course
			 * ORDER BY Courses.CourseID, CoursesQuizzes.Sequence ASC
			 * 
			 * CourseID | Name | Privacy | Quiz
			 */
			
			int courseID = 0;
			Course course = null;
			
			while (rs.next()) {
				if (rs.getInt("CourseID") != courseID) {
					course = new Course(rs.getInt("CourseID"), rs.getString("Name"));
					Database.addCourse(course);
				}
				course.addQuiz(Database.getQuiz(rs.getInt("QuizID")));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Users stored in the database to the ArrayLists in the Database class
	 */
	public static void loadUsers() {
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * from Users ORDER BY UserID");
			
			User user = null;
			while (rs.next()) {
				int id = rs.getInt("UserID");
				String un = rs.getString("Username");
				String pw = rs.getString("Password");
				String fn = rs.getString("FirstName");
				String ln = rs.getString("LastName");
				String email = rs.getString("Email");
				user = new LiquiZUser(id, un, pw, fn, ln, email); // TODO: is this LiquiZUser or User?
				Database.addUser(user);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * Find out how many times a student has taken a quiz
	 * @param studentID
	 * @param quizID
	 * @return
	 */
	public static int getTakenTimes(int studentID, int quizID) {
		ResultSet rs = null;
		int attempts = 0;
		try {
			String query = "SELECT max(AttemptNum) FROM StudentQuizScores WHERE UserID=" + studentID + " AND QuizID=" + quizID;
			rs = DatabaseMgr.execQuery(query);
			attempts = rs.getInt(0);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
		return attempts;
	}
	
	//TODO while loop
	public static double loadStudentGrade(int id) {
		Connection conn = DatabaseMgr.getConnection();
		double grade = 0;
		try {
			PreparedStatement p = conn.prepareStatement("SELECT * FROM StudentGrades WHERE Student=?");
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			
			if (rs.next()) {
				grade = rs.getDouble("Grade");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return grade;
	}
	
	//TODO while loop
	public static int loadStudentQuizScore(int sid, int qid) {
		Connection conn = null;
		int score = 0;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM StudentQuizScore WHERE Student=? AND Quiz=?");
			p.setInt(1, sid);
			p.setInt(2, qid);
			ResultSet rs = p.executeQuery();
			
			if (rs.next()) {
				score = rs.getInt("Score");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return score;
	}
	
	//TODO while loop
	public static Displayable loadStudentResponse(int sid, int qid) {
		Connection conn = null;
		Displayable d = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM StudentResponses WHERE Student=? AND Ques=?");
			p.setInt(1, sid);
			p.setInt(2, qid);
			ResultSet rs = p.executeQuery();
			
			if (rs.next()) {
				d = Database.getDispEl(rs.getInt("Response"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return d;
	}
}
