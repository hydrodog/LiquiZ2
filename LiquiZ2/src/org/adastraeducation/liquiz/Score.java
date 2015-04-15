package org.adastraeducation.liquiz;
import org.adastraeducation.liquiz.database.*;

public class Score {
//	private int quesID;
//	private String res;
//	
//	public Score(int quesID, String res) {
//		this.quesID = quesID;
//		this.res = res;
//	}
	
//	public int
	
	public static int correctQues(int quesID, String res) {
		Question ques = Database.getQues(quesID);
		return ques.grade(res);
	}
	
	public static int getTotalPoints(int quizID) {
		return Database.getQuiz(quizID).getTotalPoints();
	}
	
	public static boolean needsGrading(int quizID) {
		return Database.getQuiz(quizID).needsGrading();
	}
	
	public static void saveScore(int userID, int quizID, int score) {
		// TODO: database storage
	}
}
