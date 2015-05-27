package org.adastraeducation.liquiz;

import java.util.HashMap;

/**
 * Object to go into session's StudentResponses attribute
 * @author yijinkang
 *
 */
public class StudentResponses {
	//TODO have multiple answer attempts in one object? or create a new one each time?
	private HashMap<String, String[]> quesResponses;
	// key is a concatenation of quesID and attempt number (ex 1.1)
	private HashMap<String, Double> quizScores; //TODO NOT SURE THIS IS NEEDED
	// key is a concatenation of quizID and attempt number (ex 1.1)
	
	public StudentResponses() {
		quesResponses = new HashMap<String, String[]>();
		quizScores = new HashMap<String, Double>();
	}
	
	public String[] getResponse(String quesAttempt) {
		return quesResponses.get(quesAttempt);
	}
	
	public String[] getLatestResponse(int quesID) {
		return quesResponses.get(quesID + "." + getNumAttemptsOfQues(quesID));
	}
	
	public void addResponse(int quesID, String[] response) {
		int attempt = getNumAttemptsOfQues(quesID) + 1;
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
	
	public void addScore(int quizID, double score) {
		int attempt = getNumAttemptsOfQuiz(quizID);
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
