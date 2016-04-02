package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;
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
@Entity("quizzes")
public class Quiz extends Page implements Displayable, java.io.Serializable
 {	
	
	private transient int id; // unique id for db and XML
	private transient String desc; // display name & description, TODO possibly per Course? or copy renamed quiz
	public String quizName;
	private transient ArrayList<QuestionContainer> qContainers;
	private transient Policy policy; 
	private String policyName;
	private transient boolean editMode;  //depending on editMode, different html elements will be rendered (if true, there will be options on the html document to edit the quiz)
	public transient static Random r;
	@Embedded
	private PayLoad payload;
	
	
	
	
	static {
		/*
		 *  if there are any random numbers to be gotten,
		 *  everyone should get them out of the quiz like:
		 *  Quiz.r.nextInteger()
		 */
		r = new Random();
	}
	
	public Quiz() {
		super();
/*		this.id = 0;
		this.name = "defaultName";
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = new Policy();
		this.editMode=false;*/
	}
	
	
	public Quiz(int id, String title, String desc, Policy plc, boolean editMode) {
		super();
		this.id = id;
		this.quizName = title;
		this.desc = desc;
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = plc;
		this.editMode=editMode;
	}
	
	public Quiz(int id, String type, String css, String name, String desc, Policy plc, boolean editMode) {
		super(type, css);
		this.id = id;
		this.quizName = name;
		this.desc = desc;
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = plc;
		this.editMode=editMode;
		this.payload = new PayLoad(plc, quizName, 100, 0, 1, "assets/", editMode);
	}
	
	public Quiz(Policy plc) {
		super();
		this.qContainers = new ArrayList<QuestionContainer>();
		this.policy = plc;
	}
	
	public Quiz(int id, String name, String desc, Policy policy) {
		this.id = id;
		this.quizName = name;
		this.desc = desc;
		this.policy = policy;
		this.qContainers = new ArrayList<QuestionContainer>();
	}
	
	
	
	@Override
	public String toString() {
		return "Quiz [" + "type=" + type + ", css=" + css + ", payload=" + payload +  "]";
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
		return quizName;
	}

	public void setName(String name) {
		this.quizName = name;
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
	
	public String getPolicy(){
		return policy.getName();
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
	
	
	public void addQuestionContainer(QuestionContainer qc) {
		if(this.qContainers == null)
			this.qContainers = new ArrayList<QuestionContainer>();
		qContainers.add(qc);
		payload.getQuestions().add(qc);
	}
	
	public void deleteQuestionContainer(int Index) {
		qContainers.remove(Index);
	}
	
	public void addQuestion(QuestionContainer qc) {
		qContainers.add(qc);
		payload.getQuestions().add(qc);
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
			dc.appendQuotedJS("payload").append(": {\n\t\t\t").append("\"policy\": ").appendQuotedJS(policy.getName()).
							append(",\n\t\t\t\"title\": ").appendQuotedJS(quizName).
			 				append(",\n\t\t\t\"points\": ").append(points).
			 				append(",\n\t\t\t\"timeLimit\": ").append(policy.getDuration()).
			 				append(",\n\t\t\t\"remainingTries\": ").append(1). //TODO: need count of user's tries
			 				append(",\n\t\t\t\"dataDir\": ").append("\"assets/\"").
			 				append(",\n\t\t\t\"editMode\": ").append(editMode).
				append(",\n\t\t\t\"questions\": ").append("\t[");
		for(QuestionContainer qc: this.qContainers) {
			qc.writeJS(dc);
			dc.append(',');
		}
			dc.remove();
		dc.append("\n\t\t]").
			append("\n\t}").
		append("\n}");
	}


	public String getQuizName() {
		return quizName;
	}


	public void setQuizName(String quizName) {
		this.quizName = quizName;
	}


	public static Random getR() {
		return r;
	}


	public static void setR(Random r) {
		Quiz.r = r;
	}


	public PayLoad getPayload() {
		return payload;
	}


	public void setPayload(PayLoad payload) {
		this.payload = payload;
	}
	
	
}
