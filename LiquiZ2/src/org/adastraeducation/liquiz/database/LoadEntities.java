package org.adastraeducation.liquiz.database;

import java.sql.*;
import java.util.ArrayList;

import org.adastraeducation.liquiz.*;

public class LoadEntities {
	public static void main(String[] args) {
		//StringBuilder s = new StringBuilder();
		//loadQuiz(1).writeXML(s);
		//System.out.print(s.toString());
		
		System.out.print(loadText(1));
	}
	
	public static String loadText(int DispElID) {
		Connection conn = null;
		StringBuilder sb = new StringBuilder();
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT Element, Type FROM DispElSeq WHERE DispEl=? ORDER BY Sequence ASC");
			p.setInt(1, DispElID);
			ResultSet rs = p.executeQuery();
			
			if (rs.getString("Type").equals("text")) {
				// Longer Strings are split up
				while (rs.next()) {
					sb.append(rs.getString("Element"));
				}
			} else {
				//TODO: Exception
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		
		return sb.toString();
	}

	public static Displayable loadDispEl(int DispElID) {
		Connection conn = null;
		Displayable d;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT Element, Type FROM DispElSeq WHERE DispEl=? ORDER BY Sequence ASC");
			p.setInt(1, DispElID);
			ResultSet rs = p.executeQuery();

			// Figure out what type of Displayable to load
			String type = rs.getString("Type");
			
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

			rs.close();
			return d;
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}

	public static Answer loadAns(int AnsID) {
		Connection conn = null;
		Answer a;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Answers WHERE AnsID=?");
			p.setInt(1, AnsID);
			ResultSet rs = p.executeQuery();

			if (rs.getInt("Element") != 0) {
				a = new Answer(loadDispEl(rs.getInt("Element"))); 
			} else {
				// TODO Range
				a = null; // CHANGE THIS!!!
			}
			
			rs.close();
			return a;
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}
	
	// Loads all the answers in the StdSet requested
	public static StdChoiceTwo loadStdChoices(int SetID) {
		Connection conn = null;
		ArrayList<Answer> ans = new ArrayList<Answer>();
		
		try {
			conn = DatabaseMgr.getConnection();
			
			// load the set
			PreparedStatement p1 = conn.prepareStatement("SELECT * FROM StdSet WHERE StdSetID=?");
			p1.setInt(1, SetID);
			ResultSet rs1 = p1.executeQuery();
			String name = null;
			if (rs1.next()) {
				name = rs1.getString("Name");
			}
			
			// load the individual choices
			PreparedStatement p2 = conn.prepareStatement("SELECT * FROM StdChoices WHERE StdSetID=?");
			p2.setInt(1, SetID);
			ResultSet rs2 = p2.executeQuery();
			// add the choices to the ans ArrayList<Answer>
			while (rs2.next()) {
				ans.add(new Answer(loadDispEl(rs2.getInt("Element"))));
			}
			return new StdChoiceTwo(name, ans);
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
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
			
			//select answer(s)
			PreparedStatement selAns = conn.prepareStatement("SELECT * FROM Answers WHERE AnsID=?");
			
			// Figure out what type of Question to load
			String type = ques.getString("QType");
			if (type.equals("Fill")) {
				String s = null;
				while(QA.next()) {
					// find the answer
					int ansID = QA.getInt("Ans");
					selAns.setInt(1, ansID);
					ResultSet ans = selAns.executeQuery();
					// find the element to load
					int elID = ans.getInt("Element");
					ans.close();
					// load answer as a String
					s = loadText(elID);
				}
				q = new FillIn(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), s); 
				//TODO: shouldn't it take an Answer instead of a String?
			} else if (type.startsWith("M")) {
				//all types of multi
				while (QA.next()) {
					if (QA.getInt("Ans") != 0) {
						// find the answer
						int ansID = QA.getInt("Ans");
						Answer a = loadAns(ansID);
						// set correct true or false
						a.setCorrect(QA.getBoolean("Correct"));
						// add the answer to the ArrayList
						answers.add(a);
					} else {					
						if (sc.equals(null)) {
							sc = loadStdChoices(QA.getInt("StdSet"));
						}
						if (QA.getBoolean("Correct")) {
							sc.setAnswer(QA.getInt("Sequence"));
						}
						answers = sc.getAnswers();
					}
				}
				if (type.equals("Mult")) {
					q = new MultiAnswer(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else if (type.equals("MCDD")) {
					q = new MultiChoiceDropdown(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else if (type.equals("MCRa")) {
					q = new MultiChoiceRadio(ques.getInt("QuesID"), ques.getInt("Points"), ques.getInt("Level"), (Answer[]) answers.toArray());
				} else {
					//TODO: anything else?
				}
			}
			//TODO: else if(type.equals("")) ...
			
			//TODO: make ArrayList<Answers> in Question class and single-answer questions will have only 1

			ques.close();
			QA.close();
			return q;
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}

	public static Policy loadPolicy(int PolID) {
		Connection conn = null;
		Policy pol = new Policy();
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Policies WHERE PolID=?");
			p.setInt(1, PolID);
			ResultSet rs = p.executeQuery();

			// set fields of the policy
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

			rs.close();
			return pol;
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}

	public static QuestionContainer loadQuesCon(int QCID) {
		Connection conn = null;
		ArrayList<Displayable> dispEls = new ArrayList<Displayable>();

		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT * FROM QuesConElements WHERE QuesCon=? ORDER BY Sequence ASC");
			p.setInt(1, QCID);
			ResultSet rs = p.executeQuery();

			// load all of the elements in the QuestionContainer and put it in dispEls
			while (rs.next()) {
				String element = rs.getString("Type");
				if (element.equals("disp")) {
					dispEls.add(loadDispEl(rs.getInt("Element")));
				} else {
					dispEls.add(loadQues(rs.getInt("Ques")));
				}
			}
			// turn dispEls into a QuestionContainer

			rs.close();
			return new QuestionContainer((Displayable[])dispEls.toArray());
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}
	
	public static Quiz loadQuiz(int QuizID) {
		Connection conn = null;
		Quiz quiz;
		
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p1 = conn.prepareStatement("SELECT * FROM Quizzes WHERE QuizID=?");
			p1.setInt(1, QuizID);
			ResultSet rs1 = p1.executeQuery();
			//set Policy
			Policy policy = loadPolicy(rs1.getInt("Policy"));
			quiz = new Quiz(policy);
			//find QuestionContainers
			PreparedStatement p2 = conn.prepareStatement("SELECT * FROM QuizzesQuesCons WHERE Quiz=? ORDER BY Sequence ASC");
			p2.setInt(1, QuizID);
			ResultSet rs2 = p2.executeQuery();
			while(rs2.next()) {
				quiz.addQuestionContainer(loadQuesCon(rs2.getInt("QuesCon")));
			}

			rs1.close();
			rs2.close();
			return quiz;
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}

		return null;
	}
	
	public static Course loadCourse(int id) {
		Connection conn = DatabaseMgr.getConnection();
		try {
			PreparedStatement p = conn.prepareStatement("SELECT * FROM Courses WHERE CourseID=?");
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			String name = rs.getString("Name");
			
			return new Course(id, name);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return null;
	}
	
	/*
	 * TODO:
	 * loadStudentGrade
	 * loadStudentGradeOnQuiz
	 * loadStudentResponse
	 * loadUser
	 */
}
