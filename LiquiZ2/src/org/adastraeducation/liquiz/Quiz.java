package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import org.adastraeducation.liquiz.util.*;
/**
 * 
 * Represent a quiz on the server
 * Every quiz is displayable, and can therefore 
 * write itself as HTML, Javascript or XML
 * We are currently working only on Javascript,
 * we may ditch the other two
 * @author yijkang
 *
 */
public class Quiz extends Page implements Displayable, java.io.Serializable
 {
	private int id; // unique id for db and XML
	private String desc; // display name & description, TODO possibly per Course? or copy renamed quiz
	private ArrayList<QuestionContainer> qContainers;
	private Policy policy ; 
	private boolean editMode;  //depending on editMode, different html elements will be rendered (if true, there will be options on the html document to edit the quiz)
	public static Random r;
	private PayLoad payLoad;
	public String name;
	
	
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
	public static void random(double[] arr, double a, double b, double step) {
		for (int i = 0; i < arr.length; i++) {
			int n = (int)((b-a)/step) + 1;
			arr[i] = a + r.nextInt(n) * step;	
		}
	}

	
	
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
	
	public String getDesc() {
		return desc;
	}
	
	public void setDesc(String desc) {
		this.desc = desc;
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
	
	public boolean getEditMode() {
		return editMode;
	}
	
	public void setEditMode(boolean editMode) {
		this.editMode=editMode;
	}
	
	public int getTotalPoints() {
		int totalPoints = 0;
		for (QuestionContainer quesCon : qContainers) {
			totalPoints += quesCon.getTotalPoints();
		}
		return totalPoints;
	}
	
	public boolean needsGrading() {
		for (QuestionContainer quesCon : qContainers) {
			for (Displayable d : quesCon.getDisplayables()) {
				if (d instanceof Question && ! ((Question) d).isAutomaticGrading()) {
					return true;
				}
			}
		}
		return false;
	}
	
	public Quiz() {
		super();
/*		this.id = 0;
		this.name = "defaultName";
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = new Policy();
		this.editMode=false;*/
	}
	
	public Quiz(int id, String title, String desc, ArrayList<QuestionContainer> qContainers, Policy plc, boolean editMode) {
		super();
		this.id = id;
		this.name = title;
		this.desc = desc;
		this.qContainers = qContainers;
		policy = plc;
		this.editMode=editMode;
	}
	
	public Quiz(int id, String title, String desc, Policy plc, boolean editMode) {
		super();
		this.id = id;
		this.name = title;
		this.desc = desc;
		this.qContainers = new ArrayList<QuestionContainer>();
		policy = plc;
		this.editMode=editMode;
	}
	
	public Quiz(int id, Type type, StyleSheet css, String name, String desc, Policy plc, boolean editMode) {
		super(type, css);
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.qContainers = new ArrayList<QuestionContainer>();
		policy = plc;
		this.editMode=editMode;
	}
	
	public Quiz(Policy plc) {
		super();
		this.qContainers = new ArrayList<QuestionContainer>();
		policy = plc;
	}
	
	public Quiz(int id, Type type, StyleSheet css, PayLoad pl) {
		super(type, css);
		this.id = id;
		this.payLoad = pl;
		this.qContainers = new ArrayList<QuestionContainer>();
	}
	
	public void addQuestionContainer(QuestionContainer qc) {
		if(this.qContainers == null)
			this.qContainers = new ArrayList<QuestionContainer>();
		qContainers.add(qc);
	}
	
	public void deleteQuestionContainer(int Index) {
		qContainers.remove(Index);
	}
	
	public void addQuestion(QuestionContainer qc) {
		qContainers.add(qc);
	}
	public void addQuestion(HttpServletRequest req) {
		String questionType = req.getParameter("question_type");
		if (questionType.equals("fillin")) {
			/*
			Fillin f = new Fillin( ....);
			QuestionContainer qc = new QuestionContainer();
			qc.add
			addQuestionContainer();
			*/
		}
	}
	public void writeHTML (DisplayContext dc) {
		//TODO: everyone add className to each object
		// if it is null, don't add a classname
		// if it is a string, append (as below)
		if (!dc.isDisplayResponses()) { // print quiz for taking
			dc.append("<h2>").append(getName()).append("</h2>");
			dc.append("<form id='quizForm' class='quiz classname' action='quizSubmit.jsp' method='post'>\n");
		} else {
			if(dc.isDisplayAnswers()) {
				dc.append("<h4>Your answers and the correct answers</h4>");
			} else { //DisplayResponses (only)
				dc.append("<h4>Your answers</h4>");
			}
			dc.append("<div class='quiz'>"); // TODO: class is quiz for style for now
		}
		
		for(QuestionContainer qc : this.qContainers) {
			qc.writeHTML(dc);
		}
		
		if (!dc.isDisplayResponses()) { // print quiz for taking
			dc.append("\n<input type='hidden' name='quizID' value='").append(getId()).append("'>\n");
			dc.append("\n<input type='submit' value='Submit'>\n");
			dc.append("</form>\n");
		} else {
			dc.append("</div>");
		}
 	}
	
	public void writeXML (StringBuilder b) {
		b.append("<quiz id='' title=''>");
		for(QuestionContainer qc: this.qContainers) {
			qc.writeXML(b);
		}
		b.append("</quiz>");
	}

	public void writeJS (DisplayContext dc) {
		//TODO: add data for point values, calculate remaining tries
		//TODO: do something about directory
		int points = 100; //TODO: add points to quiz?
		//yijinkang: getTotalPoints() will return the total number of points of the questions in the quiz
		super.writeJS(dc);
		
//			dc.appendQuotedJS("payload").append(": ").appendJS(payLoad).
			dc.appendQuotedJS("payload").append(": {\n\t\t\t").append("\"policy\": ").appendQuotedJS(policy.name).
							append("\n\t\t\t\"title\": ").appendQuotedJS(name).
			 				append(",\n\t\t\tpoints: ").append(points).
			 				append(",\n\t\t\ttimeLimit: ").append(policy.getDuration()).
			 				append(",\n\t\t\tremainingTries: ").append(1). //TODO: need count of user's tries
			 				append(",\n\t\t\tdataDir: ").append("\"assets/\"").
			 				append(",\n\t\t\teditMode: ").append(editMode).
				append(",\n\t\t\tquestions: ").append("\t[");
		for(QuestionContainer qc: this.qContainers) {
			qc.writeJS(dc);
		}
		dc.append
			("\n\t]").
		append("\n);");
	}
}
