package org.adastraeducation.liquiz.database;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import org.adastraeducation.liquiz.*;

/**
 * Loading objects based on database information
 * @author yijinkang
 *
 */
public class Load {
	
	public static void main(String[] args) {
		loadDispEl();
		loadAns();
		loadQues();
		loadPolicies();
		loadQuesCon();
		loadQuiz();
		loadCourse();
		loadUser();
		Database.reportSizes();
	}
	static HashMap<String, DisplayElementFactory> displayElementTypeMap;
	static {
		displayElementTypeMap = new HashMap<String, DisplayElementFactory>();
		displayElementTypeMap.put("text", new TextFactory());
		displayElementTypeMap.put("img", new ImageFactory());
		displayElementTypeMap.put("aud", new AudioFactory());
		displayElementTypeMap.put("vid", new VideoFactory());
		
		//TODO: question types
	}
	
	public static void loadDispEl() {
		ResultSet rs = null;
		try {
			rs = DatabaseMgr.execQuery("SELECT * FROM DisplayElements");
			
			while(rs.next()) {
				String type = null;
				// Figure out what type of Displayable to load
				type = rs.getString("DispType");
				DisplayElementFactory f = displayElementTypeMap.get(type);
				if (f == null) {
					System.out.println("Factory not found, type = " + type);
				} else {
					Database.addDisp(f.create(rs));
				}
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
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
	
	public static void loadAns() {
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * FROM Answers");
			
//			| AnsID     | int(11) | NO   | PRI | NULL    | auto_increment |
//			| Response  | int(11) | YES  |     | NULL    |                |
//			| Element   | int(11) | YES  |     | NULL    |                |
//			| LowBound  | int(11) | YES  |     | NULL    |                |
//			| HighBound | int(11) | YES  |     | NULL    |                |
			
			while(rs.next()) {
				int ansID = rs.getInt("AnsID");
				int resID = rs.getInt("Response");
				int elemID = rs.getInt("Element");
				int lowBound = rs.getInt("LowBound"); //TODO: make double in tables
				int highBound = rs.getInt("HighBound");
				boolean correct = false;
				
				if (elemID != 0) {
					Answer a = new Answer(ansID, Database.getDisp(elemID), correct, null);
					if (rs.getInt("Response") != 0) {
						Response res = new Response(Database.getDisp(resID));
						a.setResponse(res);
					}
					Database.addAns(a);
				} else {
					// TODO Range
				}
			}
			
			rs.close();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}

//	/**
//	 * @param AnsID
//	 * @param correct
//	 * @return requested Answer
//	 */
//	public static Answer loadAns(int AnsID, boolean correct) {
//		Connection conn = null;
//		Response res = null;
//		Answer a = null;
//
//		try {
//			conn = DatabaseMgr.getConnection();
//			PreparedStatement p = conn.prepareStatement("SELECT * FROM Answers WHERE AnsID=?");
//			p.setInt(1, AnsID);
//			ResultSet rs = p.executeQuery();
//
//			if(rs.next()) {
//				if (rs.getInt("Element") != 0) {
//					a = new Answer(AnsID, Database.getDisp(rs.getInt("Element")), correct, null);
//					if (rs.getInt("Response") != 0) {
//						res = new Response(Database.getDisp(rs.getInt("Response")));
//						a.setResponse(res);
//					}
//				} else {
//					// TODO Range
//				}
//			}
//			
//			rs.close();
//			Database.addAns(a);
//		} catch(SQLException e) {
//			e.printStackTrace();
//		} finally {
//			DatabaseMgr.returnConnection(conn);
//		}
//		return a;
//	}
	
	// Load all StdChoices to HashMap in NamedObjects
	public static void loadStdChoices() {
		ResultSet rs = null;
		ArrayList<Answer> ans = new ArrayList<Answer>();
		
		try {
			rs = DatabaseMgr.execQuery("SELECT StdSet.StdSetID, StdSet.Name, StdChoices.Answer");
			
			rs.next();
			String name = rs.getString("Name");
			do {
				if (!name.equals(rs.getString("Name"))) {
					// Next is new StdSet
					NamedObjects.addStdChoice(name, ans);
					name = rs.getString("Name");
					ans.clear();
				}
				ans.add(Database.getAns(rs.getInt("Answer")));
			} while (rs.next());
			
			//add last stdchoice
			NamedObjects.addStdChoice(name, ans);
			name = rs.getString("Name");
			ans.clear();
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}

	public static Question loadQues() {
		ResultSet rs = null;
		int quesID, points, level;
		Question q = null;
		ArrayList<Answer> answers = new ArrayList<Answer>();

		try {
			rs = DatabaseMgr.execQuery("SELECT Questions.QuesID, Questions.QType, Questions.Points, Questions.Level, QuesAnsSeq.Ans, QuesAnsSeq.Correct, QuesAnsSeq.StdSet, QuesAnsSeq.StdCorrect FROM Questions LEFT JOIN QuesAnsSeq ON Questions.QuesID = QuesAnsSeq.Ques");
			
			/*
			 * SELECT Questions.QuesID, Questions.QType, Questions.Points, Questions.Level, QuesAnsSeq.Ans, QuesAnsSeq.Correct,  QuesAnsSeq.StdSet, QuesAnsSeq.StdCorrect 
			 * FROM Questions 
			 * LEFT JOIN QuesAnsSeq 
			 * ON Questions.QuesID = QuesAnsSeq.Ques
			 * 
			 * QuesID | Points | Level | Ans | Correct | StdSet | StdCorrect
			 * TODO maybe load range here and directly add it to the question
			 */
			while(rs.next()) {
				// Figure out what type of Question to load
				String type = rs.getString("QType");
				if (type.equals("Fill")) {
					do {
						// find the answer
						Answer a = Database.getAns(rs.getInt("Ans"));
						a.setCorrect(rs.getBoolean("Correct"));
						// add it to the answers ArrayList
						answers.add(a);
						quesID = rs.getInt("QuesID");
						points = rs.getInt("Points");
						level = rs.getInt("Level");
					} while(rs.next() && rs.getInt("QuesID") == quesID);
					q = new FillIn(quesID, points, level, answers); 
				} else if (type.startsWith("M")) {
					//all types of multi
					if (rs.getInt("Ans") != 0) {
						do {
							// find the answer
							Answer a = Database.getAns(rs.getInt("Ans"));
							a.setCorrect(rs.getBoolean("Correct"));
							// add it to the answers ArrayList
							answers.add(a);
							quesID = rs.getInt("QuesID");
							points = rs.getInt("Points");
							level = rs.getInt("Level");
						} while(rs.next() && rs.getInt("QuesID") == quesID); 
					} else {
						// load the StdSet to answers
						answers = NamedObjects.getCloneOfStdChoice(rs.getString("StdSet")); //TODO 
						// set the correct one
						answers.get(rs.getInt("StdCorrect")).setCorrect(true);
						
						quesID = rs.getInt("QuesID");
						points = rs.getInt("Points");
						level = rs.getInt("Level");
					}
					
					// load the appropriate question type
					if (type.equals("Mult")) {
						q = new MultiAnswer(quesID, points, level, answers);
					} else if (type.equals("MCDD")) {
						q = new MultiChoiceDropdown(quesID, points, level, answers);
					} else if (type.equals("MCRa")) {
						q = new MultiChoiceRadio(quesID, points, level, answers);
					} else {
						//TODO: any other multis?
					}
				} else if (type.equals("code")) {
					
				}
				//TODO: else if(type.equals("")) ...
				Database.addQues(q);
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
		return q;
	}

	public static void loadPolicies() {
		Policy pol = null;
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * FROM Policies");

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
				pol.setScored(rs.getBoolean("Scored"));
				pol.setGrade(rs.getInt("Grade"));
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
	 * loads all QuesCons to Database.quesCons
	 */
	public static void loadQuesCon() {
		ResultSet rs = null;

		try {
			rs = DatabaseMgr.execQuery("SELECT QuesConElements.QuesCon, QuesConElements.Type, QuesConElements.Element, QuesConElements.Ques, QuesAnsSeq.Ans, QuesAnsSeq.Correct FROM QuesConElements LEFT JOIN QuesAnsSeq ON QuesConElements.Ques = QuesAnsSeq.Ques ORDER BY QuesConElements.QuesCon, QuesConElements.Sequence, QuesAnsSeq.Sequence ASC;");

/*
 * SELECT QuesConElements.QuesCon, QuesConElements.Type, QuesConElements.Element, QuesConElements.Ques, QuesAnsSeq.Ans, QuesAnsSeq.Correct 
 * FROM QuesConElements 
 * LEFT JOIN QuesAnsSeq ON QuesConElements.Ques = QuesAnsSeq.Ques 
 * ORDER BY QuesConElements.QuesCon, QuesConElements.Sequence, QuesAnsSeq.Sequence ASC;
 * 
 * QuesCon | Type | Element | Ques | Ans | Correct	
 * 	
 */
			ArrayList<Displayable> disps = new ArrayList<Displayable>();
			QuestionContainer qc = null;
			
			int QCID = 1;
			
			while (rs.next()) {
				if (rs.getInt("QuesCon") != QCID) {
					// turn dispEls into displayables array and create QuesCon 
					Displayable[] displayables = Arrays.copyOf(disps.toArray(), disps.size(), Displayable[].class);
					
					qc = new QuestionContainer(QCID, displayables);
					Database.addQuesCon(qc); //TODO add
					disps.clear();
				}
				// load element in the QuestionContainer and put it in dispEls ArrayList
				String element = rs.getString("Type");
				if (element.equals("Elem")) { // load DisplayElement
					disps.add(Database.getDisp(rs.getInt("Element")));
				} else { // load Question
					disps.add(Database.getQues(rs.getInt("Ques")));
				}
				
				QCID = rs.getInt("QuesCon");
			}
			//put last QuesCon in Database ArrayList
			Displayable[] displayables = Arrays.copyOf(disps.toArray(), disps.size(), Displayable[].class);
			
			qc = new QuestionContainer(QCID, displayables);
			Database.addQuesCon(qc);
			rs.close();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Quizzes to Database.quizzes
	 */
	public static void loadQuiz() {
		ResultSet rs = null;
		try {
			rs = DatabaseMgr.execQuery("SELECT Quizzes.QuizID, Quizzes.Name, Quizzes.Desc, Quizzes.Policy, Quizzes.Privacy, QuizzesQuesCons.QuesCon FROM Quizzes LEFT JOIN QuizzesQuesCons ON Quizzes.QuizID = QuizzesQuesCons.Quiz ORDER BY Quizzes.QuizID, QuizzesQuesCons.Sequence ASC");
			
			/*
			 * SELECT Quizzes.QuizID, Quizzes.Name, Quizzes.Desc, Quizzes.Policy, Quizzes.Privacy, QuizzesQuesCons.QuesCon 
			 * FROM Quizzes 
			 * LEFT JOIN QuizzesQuesCons ON Quizzes.QuizID = QuizzesQuesCons.Quiz 
			 * ORDER BY Quizzes.QuizID, QuizzesQuesCons.Sequence ASC
			 * 
			 * QuizID | Name | Desc | Policy | Privacy | QuesCon
			 */
			
			Quiz quiz = null;
			int quizID = 0;
			while (rs.next()) {
				if (quizID != rs.getInt("QuizID")) { // if new quiz
					Policy policy = Database.getPolicy(rs.getInt("Policy"));
					quiz = new Quiz(rs.getInt("QuizID"), policy);
					Database.addQuiz(quiz);
					quizID = rs.getInt("QuizID");
				}
				quiz.addQuestionContainer(Database.getQuesCon(rs.getInt("QuesCon")));
			} 
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Courses to Database.courses
	 */
	public static void loadCourse() {
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT Courses.CourseID, Courses.Name, Courses.Privacy, CoursesQuizzes.Quiz  FROM Courses LEFT JOIN CoursesQuizzes ON Courses.CourseID = CoursesQuizzes.Course ORDER BY Courses.CourseID, CoursesQuizzes.Sequence ASC");
			
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
				course.addQuiz(Database.getQuiz(rs.getInt("Quiz")));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
	}
	
	/**
	 * loads all Users to Database.users
	 */
	public static void loadUser() {
		ResultSet rs = null;
		
		try {
			rs = DatabaseMgr.execQuery("SELECT * from USERS");
			
			User user = null;
			while (rs.next()) {
				int id = rs.getInt("UserID");
				String un = rs.getString("Username");
				String pw = rs.getString("Password");
				String fn = rs.getString("FirstName");
				String ln = rs.getString("LastName");
				String email = rs.getString("Email");
				user = new User(id, un, pw, fn, ln, email);
				Database.addUser(user);
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.closeResultSet(rs);
		}
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
			rs.close();
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
			rs.close();
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
				d = Database.getDisp(rs.getInt("Response"));
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return d;
	}
	
	/*
	 * two types of methods:
	 * questions, answers, DispEls load one at a time and return
	 * Users, Courses, Policies, Quizzes, Question Containers, StdChoicess load everything 
	 * (they'll call the above methods so the needed ones will be loaded as well)
	 * TODO: Student Grade/QuizScore/Response load everything too but where to put it? 
	 * 2D array?
	 */
}
