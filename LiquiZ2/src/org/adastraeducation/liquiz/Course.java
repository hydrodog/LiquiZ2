/**
 * Quizzes are organized into courses
 */

package org.adastraeducation.liquiz;

import java.util.ArrayList;

public class Course implements Displayable {
	private String id, name;
	// private String classname, qListClassName; // for user to override HTML class for style
	// TODO: is this needed? would users want to customize their list of quizzes?
	private ArrayList<Quiz> quizzes;

	public Course() {
		quizzes = new ArrayList<Quiz>();
	}
	
	public Course(String name) {
		this.name = name;
		quizzes = new ArrayList<Quiz>();
	}

	public Course(String id, String name) {
		this.id = id;
		this.name = name;
		quizzes = new ArrayList<Quiz>();
	}

	public String getID() {
		return id;
	}
	
	public void setID(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addQuiz(Quiz q) {
		quizzes.add(q);
	}

	public void deleteQuiz(int i) {
		quizzes.remove(i);
	}

	
	/*
	 * <div class='coursename'>NAME</div>
	 * <div class='quizList'>
	 *    <div class='quizName'>QUIZNAME</div>
	 *    <div class='quizName'>QUIZNAME</div>
	 * </div>
	 */
	
	public void writeHTML(StringBuilder b) {
		b.append("<div class='coursename'>" + name + "</div>\n");
		b.append("<div class='quizList'>\n");
		for (Quiz q : quizzes) {
			b.append("<div class='quizName'>" + q.getName() + "</div>\n"); 
		}
		b.append("</div>");
	}
	
	/*
	 * <quizList id='ID' courseName='NAME'>
	 *    [quiz XML here]
	 * </quizList>
	 */
	
	//TODO: writing out only some quizzes?
	public void writeXML(StringBuilder b) {
		b.append("<quizList id='" + id + "' courseName='" + name + "'>\n");
		for (Quiz q : quizzes) {
			q.writeXML(b);
		}
		b.append("</quizList>");
	}
	
	/*
	 * quizlist([quizref('quizname1',1),quizref('quizname2',2)])
	 * TODO: or {title: name, content: []}
	 */
	
	public void writeJS(StringBuilder b) {
		b.append("quizList([");
		for (Quiz q : quizzes) {
			b.append("quizref('" + q.getName() + "'");
			b.append(',').append(q.getId()).append(")");
			if (quizzes.indexOf(q)+1 < quizzes.size()) {
				b.append(',');
			}
		}
		b.append("])");
	}
}