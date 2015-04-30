package org.adastraeducation.liquiz;

import java.util.HashMap;

public class StudentResponses {
	private HashMap<String, String[]> quesResponses;
	// key is a concatenation of quesID and attempt number (ex 1.1)
	private HashMap<String, Double> quizScores;
	// key is a concatenation of quizID and attempt number (ex 1.1)
	
	public StudentResponses() {
		quesResponses = new HashMap<String, String[]>();
		quizScores = new HashMap<String, Double>();
	}
	
	public String[] getResponse(String quesAttempt) {
		return quesResponses.get(quesAttempt);
	}
	
	public void addResponse(int quesID, int attempt, String[] response) {
		String quesAttempt = quesID + "." + attempt;
		quesResponses.put(quesAttempt, response);
	}
	
	public int getNumAttemptsOfQues(int quesID) {
		int attempts = 0;
		while (quesResponses.containsKey(quesID + "." + (attempts + 1))) {
			attempts++;
		}
		return attempts;
	}
	
	public double getScore(String quizAttempt) {
		return quizScores.get(quizAttempt);
	}
	
	public void addScore(int quizID, int attempt, double score) {
		String quizAttempt = quizID + "." + attempt;
		quizScores.put(quizAttempt, score);
	}
	
	public int getNumAttemptsOfQuiz(int quizID) {
		int attempts = 0;
		while(quizScores.containsKey(quizID + "." + (attempts+1))) {
			attempts++;
		}
		return attempts;
	}
}
