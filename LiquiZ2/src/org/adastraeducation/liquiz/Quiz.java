package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.Random;

public class Quiz implements Displayable {
	public static Random r;
	
	static {
		/*
		 *  if there are any random numbers to be gotten,
		 *  everyone should get them out of the quiz like:
		 *  Quiz.r.nextInteger()
		 */
		r = new Random();
	}
	public static int random(int a, int b) {
		return a + r.nextInt(b-a);
	}
	public static double random(double a, double b) {
		return a + r.nextDouble() * (b-a);
	}
	public static double random(double a, double b, double step) {
		int n = (int)((b-a)/step) + 1;
		return a + r.nextInt(n) * step;
	}
	// TODO: make this escape strings in single quotes
	public static String escapeJS(String s) {
		return s;
	}
	// TODO: make this escape strings in single quotes
	public static String escapeXML(String s) {
		return s;
	}
	private int id; // unique id for db and XML
	private String name; // display name, possibly per Course?
	private ArrayList<QuestionContainer> qContainers;
	private Policy policy ; 
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<QuestionContainer> getQContainers() {
		return qContainers;
	}
	
	public void setQContainers(ArrayList<QuestionContainer> c){
		qContainers = c;
	}
	
	public int getQuestionContainerCount() {
		return qContainers.size();
	}
	public int getQuestionCount() {
		int count = 0;
		for (QuestionContainer q : qContainers) {
			count += q.getQuestionCount();
		}
		return count;
	}
	
	public Policy getPolicy(){
		return policy;
	}
	
/*	public void setPolicy(int num,boolean timed, int duration, 
			boolean showAns,boolean scored,int grade, boolean shuffleQues, boolean shuffleAns, String accessCode){
		policy.setAttemptNum(num);
		policy.setTimed(timed);
		policy.setDuration(duration);
		policy.setShowAns(showAns);
		policy.setScored(scored);
		policy.setGrade(grade);
		policy.setShuffleQues(shuffleQues);
		policy.setShuffleAns(shuffleAns);
		policy.setAccessCode(accessCode);
	}*/
	
	public void setPolicy(Policy p){
		this.policy = p;
	}
	
	public Quiz() {
/*		this.id = 0;
		this.name = "defaultName";
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = new Policy();*/
	}
	
	public Quiz(Policy plc) {
		this.qContainers = new ArrayList<QuestionContainer>();
		policy = plc;
	}
	
	public void addQuestionContainer(QuestionContainer qc) {
		if(this.qContainers == null)
			this.qContainers = new ArrayList<QuestionContainer>();
		qContainers.add(qc);
	}
	
	public void deleteQuestionContainer(int Index) {
		qContainers.remove(Index);
	}
	

	public void writeHTML (StringBuilder b)	{
		//TODO: everyone add className to each object
		// if it is null, don't add a classname
		// if it is a string, append (as below)
		b.append("<div class='quiz classname'>\n");
		for(QuestionContainer qc : this.qContainers) {
			qc.writeHTML(b);
		}
		b.append("</div>\n");
	}
	
	public void writeXML (StringBuilder b) {
		b.append("<quiz id='' title=''>");
		for(QuestionContainer qc: this.qContainers) {
			qc.writeXML(b);
		}
		b.append("</quiz>");
	}
	
	public void writeJS (StringBuilder b) {
		b.append("{ title: 'A new quiz', className: 'class', content: [");
		for(QuestionContainer qc: this.qContainers) {
			qc.writeJS(b);
		}
		b.append("]}");
	}
}
