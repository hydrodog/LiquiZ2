package org.adastraeducation.liquiz;

/*
 * author: Yingzhu
 * This is for Fillin question
 * I decide the merge regexQuestion and NumberQuestion with Fillin instead of extending it. 
 * I will temporarily save the original class. If it is proved that they are useless, 
 * I will delete them at last.
 */
/*
 * Regex Questions and Number Questions are now merged with Fillin Questions.
 */
/*
 * for ApproximateNumber Question, only 1 number is allowed to appear in the question.
 * For instance, "12 fadasd" is right. However, "13 KJKAJD 24" is wrong. Only 13 may be detected and 24 may be ignored. 
 */

import java.util.ArrayList;

public class FillIn extends Question implements java.io.Serializable{
	boolean caseSensitive;
	
	public FillIn(int id, int points, int level, ArrayList<Answer> answers) {
		super(id, points, level, answers);
	}
	
	// the new constructor including all of the elements
	public FillIn(int id, int points, int level, Answer answer){
		super(id, points, level, answer);
	}

	// the new constructor including all of the elements
	public FillIn(int points, int level, Answer answer){
		super(points, level, answer);
	}
	
	public FillIn(int id, int points, int level) {
		super (id, points, level);
	}

	/**
	 * Convenience Constructor: create a fillin question with a 
	 * single (correct) string answer (and convert to internal Answer)
	 * @param id
	 * @param points
	 * @param level
	 * @param answer
	 */
	
	public FillIn(){}
	
	public boolean isCaseSensitive() {
		return caseSensitive;
	}

	public void setCaseSensitive(boolean caseSensitive) {
		this.caseSensitive = caseSensitive;
	}

	/*
	 * Returns true if typed answer exactly matches a correct answer
	 */
	@Override
	public double grade(String[] s) {
		for (Answer a : getAns()) {
			if(caseSensitive) {
				if(s[0].equals(a.getName())) {
					return (double) getPoints();
				}
			} else {
				if(s[0].equalsIgnoreCase(a.getName())) {
					return (double) getPoints();
				}
			}
		}
		return 0;
	}

	@Override
	//<input name='123' class='fillin' type='text' onblur='showNumberWarning(this, "\\d\\d\\d")'/> 
	public void writeHTML(DisplayContext dc) {
		if (dc.isDisplayResponses()) {
			String[] answer = {"Your answer here"};
			if (dc.getStudentResponses() != null) {
				answer = dc.getStudentResponses().getLatestResponse(getId());
			}
			
			dc.append("<input type='text' disabled value='");
			dc.append(answer[0]);
			dc.append("'> ");
			
			if(dc.isDisplayAnswers()) {
				if(answer.length > 0) {
					Response res = getResponseFor(answer[0]);
					if (res != null) { 
						if (Score.correctQues(getId(), answer) == getPoints()) {
							dc.append("<span class='response correct'>");
						} else {
							dc.append("<span class='response'>");
						}
						res.writeHTML(dc);
						dc.append("</span>");
					}
				}
				
				boolean hasAnswer = false;
				for (Answer ans : getAns()) {
					if (ans.getCorrect()) {
						hasAnswer = true;
						break;
					}
				}
				if (hasAnswer) {
					dc.append("\n<div class='answersHead'>Possible answers:</div>");
					for (Answer ans : getAns()) {
						ans.writeHTML(dc);
						dc.append("<br>");
					}
				}
			}
		} else { // just show the empty box
			dc.append("<input name='").append(getId()).append("' class='fillin' type='text' />");
		}
	}

	@Override
	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"fillin\", ").append(getId()).append("]");
	}

	@Override
	public void writeXML(StringBuilder b) {
		b.append("<fillin/>");
	}

}
