package org.adastraeducation.liquiz;
/**
 * A Policy represents how a quiz is modified and accessed.
 * See also Assignment which controls when a Quiz is visible.
 * 
 * @author Tim Ding
 *
 */
public class Policy implements java.io.Serializable
{
	private int id;				// unique id in database
	public String name; 		// display name of the policy
	private int attemptNum;		// number of times students are allowed to take the quiz
	private boolean timed;		// true if timed, false otherwise
	private int duration;		// if timed is true, duration is the time allotted in seconds.
	private boolean showAns;	// if true, then after grading display the answers
	private boolean showAnsOnLastAtt;	// if true, then display answers on last attempt
	private boolean scored;		// if true, then this quiz is scored (otherwise do not score)
	// TODO have a policy to do something IF grade < x???
	private boolean shuffleQues;// if true, randomly shuffle the question order
	private boolean shuffleAns;	// if true, randomly shuffle the order of multiple choice answers
	//TODO: require access from specific access point??
	private String accessCode;	// if not null, this code is used to take the quiz
	//TODO: restrict to local range of addresses, ie in class?
	
	public Policy() {
		attemptNum = 3;
		timed = false;
		duration = 300;
		showAns = false;
		scored = true;
		shuffleQues = true;
		shuffleAns = true;
		accessCode = "";
	}

	public Policy(String name){
		this();
		this.name = name;
	}
	
	public Policy(int id, String name){
		this.id = id;
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getID() {
		return id;
	}
	
	public void setID(int id) {
		this.id=id;
	}
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
	
	public boolean getShowAnsOnLastAtt() {
		return showAnsOnLastAtt;
	}

	public void setShowAnsOnLastAtt(boolean showAnsOnLastAtt) {
		this.showAnsOnLastAtt = showAnsOnLastAtt;
	}

	public boolean getScored() {
		return this.scored;
	}
	
	public void setScored(boolean value) {
		this.scored = value;
	}
	
	public boolean getShuffleQues() {
		return this.shuffleQues;
	}
	
	public void setShuffleQues(boolean value) {
		this.shuffleQues = value;
	}
	
	public boolean getShuffleAns() {
		return this.shuffleAns;
	}
	
	public void setShuffleAns(boolean value) {
		this.shuffleAns = value;
	}
	
	public String getAccessCode() {
		return this.accessCode;
	}
	
	public void setAccessCode(String code) {
		this.accessCode = code;
	}
	
	public String toString(){
		return "Policy Name: " + name;
	}

}
