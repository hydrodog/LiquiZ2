package org.adastraeducation.liquiz;

public class PayLoad implements java.io.Serializable{


	private Policy policy;
	private Title title;
	private int points;
	private int timeLimit;
	private int remainingTries;
	private String dataDir;
	private boolean editMode;
	
	public PayLoad(Policy policy, Title title, int points, int timeLimit, int remainingTries, String dataDir, boolean editMode) {
		this.policy = policy;
		this.title = title;
		this.points = points;
		this.timeLimit = timeLimit == 0? timeLimit : policy.getDuration();
		this.remainingTries = remainingTries;
		this.dataDir = dataDir;
		this.editMode = editMode;
	}

	public Policy getPolicy() {
		return policy;
	}

	public Title getTitle() {
		return title;
	}

	public int getPoints() {
		return points;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public int getRemainingTries() {
		return remainingTries;
	}

	public String getDataDir() {
		return dataDir;
	}

	public boolean isEditMode() {
		return editMode;
	}
	
	
	
	
}
