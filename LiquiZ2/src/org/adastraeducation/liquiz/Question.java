package org.adastraeducation.liquiz;
import java.util.HashMap;

public abstract class Question implements Displayable {
	private int id,points,level;

	private static int count; // for general unique id
	static {
		count = 0;
	}
	
	private static HashMap<Integer,Question> questionDictionary = new HashMap<Integer,Question>();
	private void setHashId(int id){
		this.id = id;
		questionDictionary.put(this.id, this);
	}
	public Question() {}
	public Question (int id, int points, int level) {
		this.points= points;
		this.level= level;
		setHashId(id);
	}	
	
	public Question(int points, int level) {
		this.id = count++;
		this.points = points;
		this.level = level;
		setHashId(id);
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
	
	public abstract String getTagName();
	
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
}
