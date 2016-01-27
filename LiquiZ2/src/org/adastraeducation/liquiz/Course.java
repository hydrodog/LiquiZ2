/**
 * Quizzes are organized into courses
 */

package org.adastraeducation.liquiz;

import java.util.ArrayList;

public class Course implements Displayable, java.io.Serializable{
	private int id;
	private String name;
	// private String classname, qListClassName; // for user to override HTML class for style
	// TODO: is this classname needed? would users want to customize their list of quizzes?
	private ArrayList<Quiz> quizzes;

	public Course() {
		quizzes = new ArrayList<Quiz>();
	}
	
	public Course(String name) {
		this.name = name;
		quizzes = new ArrayList<Quiz>();
	}

	public Course(int id, String name) {
		this.id = id;
		this.name = name;
		quizzes = new ArrayList<Quiz>();
	}

	public int getID() {
		return id;
	}
	
	public void setID(int id) {
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
	 * <div class='courseName'>NAME</div>
	 * <div class='quizList'>
	 *    <div class='quizName'>QUIZNAME</div>
	 *    <div class='quizName'>QUIZNAME</div>
	 * </div>
	 */
	
	public void writeHTML(DisplayContext dc) {
		dc.append("<h2 class='courseName'>" + name + "</h2>\n");
		dc.append("<div class='quizList'>\n");
		for (Quiz q : quizzes) {
			dc.append("<div class='quizName'>" + q.getName() + "</div>\n"); 
		}
		dc.append("</div>");
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
	
	public void writeJS(DisplayContext dc) {
		dc.append("quizList([");
		for (Quiz q : quizzes) {
			dc.append("quizref('" + q.getName() + "'");
			dc.append(',').append(q.getId()).append(")");
			if (quizzes.indexOf(q)+1 < quizzes.size()) {
				dc.append(',');
			}
		}
		dc.append("])");
	}
	
	public String toString(){
		return "Course Id: " + id + "\nCourse Name: " + name;
	}
}