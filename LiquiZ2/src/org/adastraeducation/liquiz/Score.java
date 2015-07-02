package org.adastraeducation.liquiz;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.adastraeducation.liquiz.database.*;

public class Score {
	
	public static double correctQues(int quesID, String[] res) {
		System.out.println("in correctQues");
		Question ques = Database.getQues(quesID);
		return ques.grade(res);
	}
	
	public static double gradeQuiz(HttpServletRequest request, HttpSession session) {
		System.out.println("in gradeQuiz");
		int userID = -1;
		if (session.getAttribute("userID") != null) {
			userID = Integer.parseInt((String) session.getAttribute("userID"));
		}
		StudentResponses sr = new StudentResponses();
		if (session.getAttribute("StudentResponses") != null) {
			sr = (StudentResponses) session.getAttribute("StudentResponses");
		}
		int quizID = Integer.parseInt(request.getParameter("quizID"));
		Enumeration<String> quesIDs = request.getParameterNames();
		double score = 0;
		
		while (quesIDs.hasMoreElements()) {
			String id = quesIDs.nextElement(); //TODO: regarding below, it shouldn't be >= 10. just >10. but weird errors rn
			if (!id.equals("quizID") && !(id.length()>=10 && id.substring(0, 10).equals("selectLang"))) { // Questions only
				String[] res = request.getParameterValues(id);
				double addPoints = correctQues(Integer.parseInt(id), res);
				if(session != null) {
					saveStudentResponse(userID, Integer.parseInt(id), res, addPoints != 0, addPoints, sr);
				}
				score += addPoints;
				//TODO: code ques lang: request.getParameter("selectLang" + quesID)
			}
		}
		saveStudentQuizScore(userID, quizID, score, sr);
		return score;
	}
	public static int getTotalPoints(int quizID) {
		return Database.getQuiz(quizID).getTotalPoints();
	}
	
	public static boolean needsGrading(int quizID) {
		return Database.getQuiz(quizID).needsGrading();
	}
	
	public static void saveStudentResponse(int userID, int quesID, String[] res, boolean correct, double score, StudentResponses sr) {
		System.out.println("in saveStudentResponse");
		sr.addResponse(quesID, res);
		Create.recordStudentResponses(userID, quesID, res, correct, score, sr.getNumAttemptsOfQues(quesID)+1);
	}
	
	public static void saveStudentQuizScore(int userID, int quizID, double score, StudentResponses sr) {
		System.out.println("in saveStudentQuizScore");
		sr.addScore(quizID, score); // TODO will this be used?
		Create.recordStudentQuizScores(userID, quizID, score, sr.getNumAttemptsOfQuiz(quizID)+1);
	}
}
