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
public class EquationQuestion extends Question {
	
	private Equation eq;
	
	private String questionText;
	private List<String> stringList;
	
	private List<Map.Entry<String, Var>> variablesList;
	private int questionIndex;
	
	public EquationQuestion()
	{
		super();
	}
	
	public EquationQuestion(String text)
	{
		super();
		questionText = text;
	}
	
	public EquationQuestion(Equation equation,String text)
	{
		super();
		questionText = text;
		setEq(equation);
		generateAquestion();
	}
	
	
	public EquationQuestion(Equation equation)
	{
		super();
		setEq(equation);
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
	
	public void generateAquestion()
	{
		if(eq != null && questionText != null)
		{
			eq.randomVar();
			HashMap<String,Var> variables = eq.getVariables();
			variablesList = new ArrayList<Map.Entry<String, Var>>();
			Iterator<Entry<String, Var>> it = variables.entrySet().iterator();
		    while (it.hasNext()) {
		        Map.Entry<String, Var> pair = (Map.Entry<String, Var>)it.next();
		        variablesList.add(pair);
		    }
			int size = variables.size();
			questionIndex = Quiz.random(0, size);
			stringList = new ArrayList<String>();
			
			System.out.println(getCorrectAnswer());
			Boolean newStrFlag = true;
			String textArr[] = questionText.split("\\[[^\\] ]+\\]");
			Matcher matcher = Pattern.compile("\\[([^\\] ]+?)\\]").matcher(questionText);
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
					
					if(questionIndex == size)
					{
						if(valStr.equals(eq.getEquation()) || valStr.equals("?"))
							newStrFlag = true;
						else
						{
							double operand = variables.get(valStr).getOperand();
							stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + operand);
						}
					}
					else if(questionIndex < size)
					{
						if(valStr.equals(eq.getEquation()) || valStr.equals("?"))
						{

							double operand = eq.getCorrectAnswer();
							stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + operand);
						}
						else if(variablesList.get(questionIndex).getKey().equals(valStr))
							newStrFlag = true;
						else{
							double operand = variables.get(valStr).getOperand();
							stringList.set(stringList.size() - 1, stringList.get(stringList.size() - 1) + operand);
						}
					}
				}
			}
			if(newStrFlag)
			{
				stringList.add("");
			}
		}
	}

	@Override
	public void writeHTML(DisplayContext dc) {
		// TODO Auto-generated method stub
		for(int i = 0; i < stringList.size() - 1; ++i)
		{
			dc.append(stringList.get(i));
			dc.append("<input name='").append(getId()).append("' class='fillin' type='text' />\n");
		}
		dc.append(stringList.get(stringList.size() - 1));
	}
	
	@Override
	public void writeJS(StringBuilder b) {
		// TODO Auto-generated method stub
		for(int i = 0; i < stringList.size() - 1; ++i)
		{
			b.append('\'').append(stringList.get(i)).append('\'');
			b.append("fillin()");
		}
		b.append('\'').append(stringList.size() - 1).append('\'');
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
	
	public double getCorrectAnswer()
	{
		double val = 0;
		if(variablesList != null)
		{
			if(questionIndex == variablesList.size())
			{
				val = eq.getCorrectAnswer();
			}
			else
			{
				val = variablesList.get(questionIndex).getValue().getOperand();
			}
		}
		return val;
	}

	@Override
	public double grade(String[] s) {
		// TODO Auto-generated method stub
		if(variablesList != null)
		{
			double val = 0;
			if(questionIndex == variablesList.size())
			{
				val = eq.getCorrectAnswer();
			}
			else
			{
				val = variablesList.get(questionIndex).getValue().getOperand();
			}
			double ans = Double.valueOf(s[0]);
			if(ans == val)
				return (double) getPoints();
		}
		return 0;
	}
}
