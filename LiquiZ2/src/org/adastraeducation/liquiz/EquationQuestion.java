package org.adastraeducation.liquiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.adastraeducation.liquiz.equation.Equation;
import org.adastraeducation.liquiz.equation.Var;

/*
 * Yujie
 * 2015-04-11 16:39:08
 * 
 * The new type of question, that contain complex content. And generate the html dynamicly
 * 
 */
public class EquationQuestion extends Question implements java.io.Serializable{
	
	private Equation eq;
	
	private String questionText;
	private List<String> stringList;
	
	private List<Map.Entry<String, Var>> variablesList;
	private int questionIndex;
	
	private boolean randomPosition;
	private double currentCorrectAnswer;
	
	public EquationQuestion()
	{
		super();
		setRandomPosition(true);
	}
	
	/**
	 * initialize the question with text
	 * @param equation
	 * @param text
	 * @param rpos:	is randomly ask question
	 */
	public EquationQuestion(Equation equation,String text, boolean rpos)
	{
		super();
		setRandomPosition(rpos);
		questionText = text;
		setEq(equation);
		generateAquestion();
	}
	
	/**
	 * initialize the question without text, the question would be formed by equation itself
	 * @param equation 
	 * @param rpos 		is randomly ask question
	 */
	public EquationQuestion(Equation equation, boolean rpos)
	{
		super();
		questionText = null;
		setRandomPosition(rpos);
		setEq(equation);
		generateAquestion();
	}
	/**
	 * initialize the question with text
	 * @param equation
	 * @param text
	 */
	public EquationQuestion(Equation equation,String text)
	{
		super();
		setRandomPosition(true);
		questionText = text;
		setEq(equation);
		generateAquestion();
	}
	
	/**
	 * initialize the question without text, the question would be formed by equation itself
	 * @param equation 
	 */
	public EquationQuestion(Equation equation)
	{
		super();
		questionText = null;
		setRandomPosition(true);
		setEq(equation);
		generateAquestion();
	}
	public Equation getEq() {
		return eq;
	}

	public void setEq(Equation eq) {
		this.eq = eq;
	}
	
	public String getQuestionText(){
		return this.questionText;
	}
	
	public void setQuestionText(String text)
	{
		questionText = text;
	}
	
	/**
	 * generate a question with new random parameter
	 */
	public void generateAquestion()
	{
		if(eq != null)
		{
			try {
				eq.randomVar();
				if(questionText == null){
					questionText = eq.getFormedEquation();
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			HashMap<String,Var> variables = eq.getVariables();
			variablesList = new ArrayList<Map.Entry<String, Var>>();
			Iterator<Entry<String, Var>> it = variables.entrySet().iterator();
		    while (it.hasNext()) {
		        Map.Entry<String, Var> pair = (Map.Entry<String, Var>)it.next();
		        variablesList.add(pair);
		    }
			stringList = new ArrayList<String>();
			
			//if newStrFlag is true, start a new string, or continue append on the last one.
			Boolean newStrFlag = true;
			String textArr[] = questionText.split("\\[[^\\] ]+\\]");
			Matcher matcher = Pattern.compile("\\[([^\\] ]+?)\\]").matcher(questionText);

			if(randomPosition)
				questionIndex = Quiz.random(0, textArr.length - 1);
			else
				questionIndex = eq.getNumberVariable();
			for(int i = 0; i < textArr.length; ++i)
			{
				String text = textArr[i];
				if(newStrFlag)
				{
					stringList.add(text);
					newStrFlag = false;
				}
				else
				{
					stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + text);
				}
				if(matcher.find())
				{
					String valStr = matcher.group(1);
					if(i == questionIndex)
					{
						newStrFlag = true;
						if(valStr.equals(eq.getEquation()) || valStr.equals("?")){
							currentCorrectAnswer = eq.getCorrectAnswer();
						}
						else{
							currentCorrectAnswer = variables.get(valStr).getOperand();
						}
					}
					else if(valStr.equals(eq.getEquation()) || valStr.equals("?")){
						double operand = eq.getCorrectAnswer();
						stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + operand);
					}
					else{
						double operand = variables.get(valStr).getOperand();
						stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + operand);
					}
				}
			}
			if(newStrFlag)
			{
				stringList.add("");
			}
			System.out.println(currentCorrectAnswer);

			ArrayList<Answer> ans = new ArrayList<Answer>();
			ans.add(new Answer(new TextAnswer(String.valueOf(currentCorrectAnswer))));
			setAns(ans);
		}
	}

	@Override
	public void writeHTML(DisplayContext dc) {
		for(int i = 0; i < stringList.size() - 1; ++i)
		{
			dc.append(stringList.get(i));

			if (dc.isDisplayResponses()) {
				String[] answer = {"Your answer here"};
				if (dc.getStudentResponses() != null) {
					answer = dc.getStudentResponses().getLatestResponse(getId());
				}
				
				dc.append("<input type='text' disabled value='");
				dc.append(answer[0]);
				dc.append("'> ");
				
				if(dc.isDisplayAnswers()) {
					Response res = getResponseFor(answer[0]);
					if (res != null) { 
						if (Score.correctQues(getId(), answer) == getPoints()) {
							dc.append("<span class='response correct'>");
						} else {
							dc.append("<span class='response'>");
						}
						writeHTML(dc);
						dc.append("</span>");
					}
					
					boolean hasAnswer = false;
					for (Answer ans : getAns()) {
						if (ans.getCorrect()) {
							hasAnswer = true;
							break;
						}
					}
					if (hasAnswer) {
						dc.append("\n<br>Possible answers:<br>");
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

		dc.append(stringList.get(stringList.size() - 1));
	}
	
	@Override
	public void writeJS(DisplayContext dc) {
		writeJS("fillin", dc);
		for(int i = 0; i < stringList.size() - 1; ++i)
		{
			dc.append('\'').append(stringList.get(i)).append('\'');
			dc.append("fillin()");
		}
		dc.append('\'').append(stringList.size() - 1).append('\'');
	}

	@Override
	public void writeXML(StringBuilder b) {
		// TODO Auto-generated method stub

		for(int i = 0; i < stringList.size() - 1; ++i)
		{
			b.append("<text>").append(stringList.get(i)).append("</text>");
			b.append("<fillin/>");
		}
		b.append("<text>").append(stringList.size() - 1).append("</text>");
	}
	
	/**
	 * get the correct answer for current 
	 * @return
	 */
	public double getCorrectAnswer()
	{
		return currentCorrectAnswer;
	}

	@Override
	public double grade(String[] s) {
		// TODO Auto-generated method stub
		if(variablesList != null)
		{
			double ans = Double.valueOf(s[0]);
			if(ans == currentCorrectAnswer)
				return (double) getPoints();
		}
		return 0;
	}

	public boolean isRandomPosition() {
		return randomPosition;
	}

	public void setRandomPosition(boolean randomPosition) {
		this.randomPosition = randomPosition;
	}
}
