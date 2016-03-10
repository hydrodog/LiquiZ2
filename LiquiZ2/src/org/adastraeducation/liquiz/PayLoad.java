package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.mongodb.morphia.annotations.Embedded;
@Embedded
public class PayLoad implements java.io.Serializable{

	
	private Policy policy;
	private String title;
	private int points;
	private int timeLimit;
	private int remainingTries;
	private String dataDir;
	private boolean editMode;
	private ArrayList<QuestionContainer> questions;
	
	public PayLoad(){
		questions = new ArrayList<QuestionContainer>();
	}
	public PayLoad(Policy policy, String title, int points, int timeLimit, int remainingTries, String dataDir, boolean editMode) {
		this.policy = policy;
		this.title = title;
		this.points = points;
		this.timeLimit = timeLimit == 0? timeLimit : policy.getDuration();
		this.remainingTries = remainingTries;
		this.dataDir = dataDir;
		this.editMode = editMode;
		this.questions = new ArrayList<QuestionContainer>();
	}

	public Policy getPolicy() {
		return policy;
	}
	
	public String getPolicyName() {
		return policy.getName();
	}
	
	

	public void setPolicy(Policy policy) {
		this.policy = policy;
	}
	
	public void setPolicyName(String policyName) {
		this.policy.policyName= policyName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}

	public int getRemainingTries() {
		return remainingTries;
	}

	public void setRemainingTries(int remainingTries) {
		this.remainingTries = remainingTries;
	}

	public String getDataDir() {
		return dataDir;
	}

	public void setDataDir(String dataDir) {
		this.dataDir = dataDir;
	}

	public boolean isEditMode() {
		return editMode;
	}

	public void setEditMode(boolean editMode) {
		this.editMode = editMode;
	}

	public ArrayList<QuestionContainer> getQuestions() {
		return questions;
	}

	public void setQuestions(ArrayList<QuestionContainer> questions) {
		this.questions = questions;
	}
	@Override
	public String toString() {
		return "PayLoad [policy=" + policy + ", title=" + title + ", points=" + points + ", timeLimit=" + timeLimit
				+ ", remainingTries=" + remainingTries + ", dataDir=" + dataDir + ", editMode=" + editMode
				+ ", questions=" + questions + "]";
	}

	
	
	
	
}
