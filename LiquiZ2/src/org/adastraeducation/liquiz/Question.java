package org.adastraeducation.liquiz;
import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

@Entity("questions")
public abstract class Question extends BaseEntity implements Displayable, java.io.Serializable
 {	
	private int id,points,level;
	private ArrayList<Answer> answers;

	private static int count; // for general unique id
	static {
		count = 0;
	}
	
	public Question (int id, int points, int level, ArrayList<Answer> answers) {
		this.id = id;
		this.points = points;
		this.level = level;
		this.answers = answers;
//		Database.setQues(id, this);
	}
	
	public Question (int id, int points, int level, Answer ans) {
		this(id, points, level, makeListFromAnswer(ans));
	}
	
	public Question (int id, int points, int level) {
		this.id = id;
		this.points = points;
		this.level = level;
		answers = new ArrayList<Answer>();
	}
	
	public Question (int points, int level, ArrayList<Answer> answers) {
		this(getUniqueID(), points, level, answers);
	}
	
	public Question (int points, int level, Answer ans) {
		this(getUniqueID(), points, level, makeListFromAnswer(ans));
	}
	
	public Question() {}
	
	public Question(int points, int level) {
		this(points, level, (ArrayList<Answer>) null);
	}
	
	public static int getUniqueID() {
		return count++;
	}
		
	private static ArrayList<Answer> makeListFromAnswer(Answer a) {
		ArrayList<Answer> answers = new ArrayList<Answer>();
		answers.add(a);
		return answers;
	}
	
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public void addAns(Answer ans) {
		answers.add(ans);
	}
	
	public void setAns(Answer ans) {
		ArrayList<Answer> ansList = new ArrayList<Answer>();
		ansList.add(ans);
		this.answers = ansList;
	}
	public void setAns(ArrayList<Answer> answers) {
		this.answers = answers;
	}
	public ArrayList<Answer> getAns() {
		return answers;
	}
	
	public Response getResponseFor(String answer) {
		for (Answer ans : getAns()) {
			if (answer.equals(ans.getName())) {
				return ans.getResponse();
			}
		}
		return null;
	}
	
	protected void writeAttrs(StringBuilder b) {
		writeAttr(b, "id", id);
		writeAttr(b, "level", String.valueOf(level));
		writeAttr(b, "points", String.valueOf(points));
	}

	protected static void writeAttr(StringBuilder b, String tag, String val) {
		b.append(tag).append("=\"").append(val).append("\" ");
	}

	protected static void writeAttr(StringBuilder b, String tag, int val) {
		b.append(tag).append("=\"").append(val).append("\" ");
	}

	protected static void writeOptAttr(StringBuilder b, String tag, boolean val) {
		if (val) {
			b.append(tag).append("=\"").append(val).append("\" ");
		}
	}
	
	public abstract double grade(String[] s);
	public boolean isAutomaticGrading() {
		return true;
	}
	public void writeJS(String funcName, DisplayContext dc) {
		dc.append(funcName).append('(').append(getId()).append(',');
	}

	@Override
	public String toString() {
		return "Question [id=" + id + ", points=" + points + ", level=" + level + ", answers=" + answers + "]";
	}
	
	
}
