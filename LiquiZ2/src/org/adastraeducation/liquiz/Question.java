package org.adastraeducation.liquiz;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import org.adastraeducation.liquiz.database.Database;

public abstract class Question implements Displayable {
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
		Database.setQues(id, this);
	}
	
	public Question (int id, int points, int level, Answer ans) {
		this(id, points, level, makeListFromAnswer(ans));
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
	
	public abstract boolean isCorrect(String s);
	public boolean isAutomaticGrading() {
		return true;
	}
}
