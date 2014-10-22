package org.adastraeducation.liquiz;
public class Policy {
	private int attemptNum;
	private boolean timed;
	private int duration;
	private boolean showAns;
	private boolean scored;
	private int grade;
	private boolean shuffle;
	private String accessCode;
	
	public int getAttemptNum() {
		return this.attemptNum;
	}
	
	public void setAttemptNum(int value) {
		this.attemptNum = value;
	}
	
	public boolean getTimed() {
		return this.timed;
	}
	
	public void setTimed(boolean value) {
		this.timed = value;
	}
	
	public int getDuration() {
		return this.duration;
	}
	
	public void setDuration(int value) {
		this.duration = value;
	}
	
	public boolean getShowAns() {
		return this.showAns;
	}
	
	public void setShowAns(boolean value) {
		this.showAns = value;
	}
	
	public boolean getScored() {
		return this.scored;
	}
	
	public void setScored(boolean value) {
		this.scored = value;
	}
	
	public int getGrade() {
		return this.grade;
	}
	
	public void setGrade(int value) {
		this.grade = value;
	}
	
	public boolean getShuffle() {
		return this.shuffle;
	}
	
	public void setShuffle(boolean value) {
		this.shuffle = value;
	}
	
	public String getAccessCode() {
		return this.accessCode;
	}
	
	public void setAccessCode(String code) {
		this.accessCode = code;
	}
	
	public Policy() {
		attemptNum = 3;
		timed = false;
		duration = 300;
		showAns = false;
		scored = true;
		grade = 0;
		shuffle = true;
		accessCode = "";
	}

}
