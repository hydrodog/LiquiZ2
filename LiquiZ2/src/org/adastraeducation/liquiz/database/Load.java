package org.adastraeducation.liquiz.database;

import java.sql.*;
import java.util.ArrayList;

import org.adastraeducation.liquiz.*;

/**
 * Loading objects based on database information
 * Need to work on where the objects go after being created...
 * @author yijinkang
 *
 */
public class Load {
	/**
	 * 
	 * @param DispElID
	 * @return one String of all the parts combined
	 */
	public static String loadText(int DispElID) {
		Connection conn = null;
		StringBuilder sb = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT Element, Type FROM DispElSeq WHERE DispEl=? ORDER BY Sequence ASC");
			p.setInt(1, DispElID);
			ResultSet rs = p.executeQuery();
			
			rs.next();
			if (rs.getString("Type").equals("text")) {
				// Longer Strings are split up
				sb = new StringBuilder();
				while (rs.next()) {
					sb.append(rs.getString("Element"));
				}
			} else {
				// DisplayElement requested is not text
				// TODO: Exception
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		
		return sb.toString();
	}

	public static Displayable loadDispEl(int DispElID) {
		//TODO should these load with ID?
		Connection conn = null;
		Displayable d = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT Element, Type FROM DispElSeq WHERE DispEl=? ORDER BY Sequence ASC");
			p.setInt(1, DispElID);
			ResultSet rs = p.executeQuery();
			
			String type = null;
			// Figure out what type of Displayable to load
			if (rs.next()) {
				type = rs.getString("Type");
			} else {
				System.out.print("No Displayables found");
			}
			
			if (type.equals("text")) {
				String s = loadText(rs.getInt("DispEl"));
				d = new Text(s);
			} else if (type.equals("img")) {
				d = new Image(rs.getString("Element"));
			} else if (type.equals("aud")) {
				d = new Audio(rs.getString("Element"));
			} else if (type.equals("vid")) {
				d = new Video(rs.getString("Element"));
			} else {
				d = null;
			}
			Database.setDisp(DispElID, d);
			rs.close();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return d;
	}

	public static Answer loadAns(int AnsID, boolean correct) {
		Connection conn = null;
		Response res = null;
		Answer a = null;

		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Answers WHERE AnsID=?");
			p.setInt(1, AnsID);
			ResultSet rs = p.executeQuery();

			if (rs.getInt("Element") != 0) {
				a = new Answer(AnsID, loadDispEl(rs.getInt("Element")), correct);
				if (rs.getInt("Response") != 0) {
					res = new Response(loadDispEl(rs.getInt("Response")));
					a.setResponse(res);
				}
			} else {
				// TODO Range
			}
			
			rs.close();
			Database.setAns(AnsID, a);
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return a;
	}
	
	// Loads all the answers in the StdSet requested
	public static StdChoiceTwo loadStdChoices(int SetID) {
		Connection conn = null;
		String name = null;
		ArrayList<Answer> ans = new ArrayList<Answer>();
		StdChoiceTwo sc = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			
			// load the set
			PreparedStatement p1 = conn.prepareStatement("SELECT * FROM StdSet WHERE StdSetID=?");
			p1.setInt(1, SetID);
			ResultSet rs1 = p1.executeQuery();
			if (rs1.next()) {
				name = rs1.getString("Name");
			}
			
			// load the individual choices
			PreparedStatement p2 = conn.prepareStatement("SELECT * FROM StdChoices WHERE StdSetID=?");
			p2.setInt(1, SetID);
			ResultSet rs2 = p2.executeQuery();
			// add the choices to the ans ArrayList<Answer>
			while (rs2.next()) {
				ans.add(new Answer(loadDispEl(rs2.getInt("Element")),rs2.getInt("Sequence")));
			}
			
			rs1.close();
			rs2.close();
			sc = new StdChoiceTwo(SetID, name, ans);
			Database.setStdChoice(SetID, sc);
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return sc;
	}

	public static Question loadQues(int QuesID) {
		Connection conn = null;
		Question q = null;
		ArrayList<Answer> answers = new ArrayList<Answer>();
		StdChoiceTwo sc = null;

		try {
			conn = DatabaseMgr.getConnection();
			
			//select the question
			PreparedStatement selQues = conn.prepareStatement("SELECT * FROM Questions WHERE QuesID=?");
			selQues.setInt(1, QuesID);
			ResultSet ques = selQues.executeQuery();
			
			//find the corresponding answers
			PreparedStatement selQA = conn.prepareStatement("SELECT * FROM QuesAnsSeq WHERE Ques=? ORDER BY Sequence ASC");
			selQA.setInt(1, QuesID);
			ResultSet QA = selQA.executeQuery();
			
			// Figure out what type of Question to load
			String type = ques.getString("QType");
			if (type.equals("Fill")) {
				while(QA.next()) {
					// find the answer
					int ansID = QA.getInt("Ans");
					Answer a = loadAns(ansID, QA.getBoolean("Correct"));
					// add it to the answers ArrayList
					answers.add(a);
				}
				q = new FillIn(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), answers); 
			} else if (type.startsWith("M")) {
				//all types of multi
				if (QA.getInt("Ans") != 0) {
					while(QA.next()) {
						// find the answer
						int ansID = QA.getInt("Ans");
						Answer a = loadAns(ansID, QA.getBoolean("Correct"));
						// add the answer to the ArrayList
						answers.add(a);
					}
				} else {
					// load the StdSet
					sc = loadStdChoices(QA.getInt("StdSet"));
					while (QA.next()) {
						// go through the StdSet and check for answers to be marked correct
						if (QA.getBoolean("Correct")) {
							sc.setAnswer(QA.getInt("Sequence"));
						}
					}
					// match the answers ArrayList to the StdSet answers ArrayList
					answers = sc.getAnswers();
				}
				// load the appropriate question type
				if (type.equals("Mult")) {
					q = new MultiAnswer(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else if (type.equals("MCDD")) {
					q = new MultiChoiceDropdown(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else if (type.equals("MCRa")) {
					q = new MultiChoiceRadio(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else {
					//TODO: any other multis?
				}
			}
			//TODO: else if(type.equals("")) ...
			
			ques.close();
			QA.close();
			Database.setQues(QuesID, q);
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return q;
	}

	public static Policy loadPolicy(int PolID) {
		Connection conn = null;
		Policy pol = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Policies WHERE PolID=?");
			p.setInt(1, PolID);
			ResultSet rs = p.executeQuery();

			// set fields of the policy
			pol = new Policy();
			pol.setID(PolID);
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

			Database.setPolicy(PolID, pol);
			rs.close();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return pol;
	}

	public static void loadQuesCon() {
		Connection conn = null;

		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM QuesConElements ORDER BY Sequence ASC");
			ResultSet rs = p.executeQuery();

			ArrayList<Displayable> dispEls = new ArrayList<Displayable>();
			QuestionContainer qc = null;
			
			while (rs.next()) {
				// load all of the elements in the QuestionContainer and put it in dispEls ArrayList
				String element = rs.getString("Type");
				if (element.equals("disp")) {
					dispEls.add(loadDispEl(rs.getInt("Element")));
				} else {
					dispEls.add(loadQues(rs.getInt("Ques")));
				}
				// turn dispEls into a QuestionContainer & put it in the database
				int QCID = rs.getInt("QCID");
				qc = new QuestionContainer(QCID, (Displayable[])dispEls.toArray());
				Database.setQuesCon(QCID, qc);
			}
			rs.close();
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void loadQuiz() {
		Connection conn = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p1 = conn.prepareStatement("SELECT * FROM Quizzes");
			ResultSet rs1 = p1.executeQuery();
			
			Quiz quiz = null;
			// load all quizzes
			while (rs1.next()) {
				Policy policy = loadPolicy(rs1.getInt("Policy")); //set Policy
				quiz = new Quiz(rs1.getInt("QuizID"), policy);
				
				//find & load QuestionContainers
				PreparedStatement p2 = conn.prepareStatement("SELECT * FROM QuizzesQuesCons WHERE Quiz=? ORDER BY Sequence ASC");
				p2.setInt(1, rs1.getInt("QuizID"));
				ResultSet rs2 = p2.executeQuery();
				while(rs2.next()) {
					quiz.addQuestionContainer(Database.getQuesCon(rs2.getInt("QuesCon")));
				}
				Database.setQuiz(rs1.getInt("QuizID"), quiz);
				rs2.close();
			}

			rs1.close();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void loadCourse() {
		Connection conn = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p1 = conn.prepareStatement("SELECT * FROM Courses"); 
			ResultSet rs1 = p1.executeQuery();
			
			Course course = null;
			while (rs1.next()) {
				int id = rs1.getInt("CourseID");
				String name = rs1.getString("Name");
				course = new Course(id, name);
				
				// Add all quizzes
				PreparedStatement p2 = conn.prepareStatement("SELECT * FROM CoursesQuizzes WHERE Course=?");
				p2.setInt(1, id);
				ResultSet rs2 = p2.executeQuery();
				
				while (rs2.next()) {
					course.addQuiz(Database.getQuiz(rs2.getInt("Quiz")));
				}
				rs2.close();
				
				Database.setCourse(id, course);
			}
			rs1.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
	
	public static void loadUser() {
		Connection conn = null;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Users");
			ResultSet rs = p.executeQuery();
			
			User user = null;
			while (rs.next()) {
				int id = rs.getInt("UserID");
				String un = rs.getString("Username");
				String pw = rs.getString("Password");
				String fn = rs.getString("FirstName");
				String ln = rs.getString("LastName");
				String email = rs.getString("Email");
				user = new User(id, un, pw, fn, ln, email);
				Database.setUser(id, user);
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
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
				d = loadDispEl(rs.getInt("Response"));
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
	 * TODO: two types of methods
	 * questions, answers, StdChoices, DispEls load one at a time and return
	 * Users, Courses, quizzes, policies, question containers,  load everything (they'll call the above methods so the needed ones will be loaded as well)
	 * Student Grade/QuizScore/Response load everything too but where to put it? 2D array?
	 */
}
