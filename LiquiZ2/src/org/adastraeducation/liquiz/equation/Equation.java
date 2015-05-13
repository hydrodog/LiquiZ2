package org.adastraeducation.liquiz.equation;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @author Yujie Liu
 *
 */

public class Equation{
	private double correctAnswer;
	private HashMap<String,Var> variables;
	private String equation;
	private String formedEquation;		// formed equation bracket the variable into square bracket
	private int numberVariable;
	
	// value of function is the priority.
	protected static HashMap<String,Integer> defaultFunction = null;
	protected static HashMap<String,Double> defaultNumbers = null;
	static {
		defaultFunction = new HashMap<String,Integer>();
		defaultNumbers = new HashMap<String,Double>();
		defaultFunction.put("sin", 100);
		defaultFunction.put("cos", 100);
		defaultFunction.put("tan", 100);
		defaultFunction.put("abs", 100);
		defaultFunction.put("asin", 100);
		defaultFunction.put("acos", 100);
		defaultFunction.put("atan", 100);
		defaultFunction.put("sqrt", 100);
		defaultFunction.put("sin", 100);
		defaultFunction.put("log", 100);
		defaultFunction.put("ln", 100);
		defaultFunction.put("exp", 100);
		defaultFunction.put("ceil", 100);
		defaultFunction.put("floor", 100);
		defaultFunction.put("round", 100);
		defaultFunction.put("^", 50);
		defaultFunction.put("*", 20);
		defaultFunction.put("/", 20);
		defaultFunction.put("+", 10);
		defaultFunction.put("-", 10);
		defaultFunction.put("(", 1);
		defaultFunction.put(")", 1);
		defaultFunction.put(",", 1);
		defaultNumbers.put("pi", Math.PI);
		defaultNumbers.put("e", Math.E);
    }

	// Precompile all regular expressions used in parsing
	private static final Pattern parseDigits =
			Pattern.compile("^([0-9]+\\.?[0-9]*)");
    private static final Pattern wordPattern =
    		Pattern.compile("^(\\w[\\w\\d]*?)[^\\w\\d]");

    /**
     * get correct answer, correct answer cannot be set outside the class.
     * @return
     */
	public double getCorrectAnswer(){
		return this.correctAnswer;
	}
	
	/**
	 * return the variables map
	 * @return
	 */
	public HashMap<String,Var> getVariables(){
		return variables;
	}
	
	/**
	 * set the varaibles map
	 * @param h
	 */
	public void setVariables(HashMap<String,Var> h){
		variables = h;
	}
	
	public Equation(){
		
	}
	
	public Equation(String equation, HashMap<String,Var> variables){
		
		this.variables=variables;
		this.setEquation(equation);
		// randomly generate variables
		
		try {
			randomVar();
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * compute the value of stack. and push the result into valstack.
	 * @param valStack
	 * @param funStack
	 * @param type 0: compute 1 function
	 * 		  type 1: compute until "("
	 * 		  type 2: compute until the end
	 * @param currentPriority: if type = 0 and top priority equal or bigger than current, then compute
	 * @throws Exception invalid function
	 */
	public void compute(Stack<Double> valStack,Stack<String> funStack, int type, int currentPriority) throws Exception{
		if(funStack.empty()){
			return;
		}
		String fun = funStack.pop();
		if(fun.equals("("))
		{
			if(type == 1){
				return;
			}
			else if(type == 0){
				funStack.push("(");
				return;
			}
		}
		if(type > 0 || defaultFunction.get(fun) >= currentPriority){
			if(fun.equals("(")){
				throw new Exception("invalid parenthesis");
			}
			else if(fun.equals("+")){
				double op2 = valStack.pop();
				double op1 = valStack.pop();
				valStack.push(op1 + op2);
			}
			else if(fun.equals("-")){
				double op2 = valStack.pop();
				double op1 = valStack.pop();
				valStack.push(op1 - op2);
			}
			else if(fun.equals("*")){
				double op2 = valStack.pop();
				double op1 = valStack.pop();
				valStack.push(op1 * op2);
			}
			else if(fun.equals("/")){
				double op2 = valStack.pop();
				double op1 = valStack.pop();
				valStack.push(op1 / op2);
			}
			else if(fun.equals("^")){
				double op2 = valStack.pop();
				double op1 = valStack.pop();
				valStack.push(Math.pow(op1, op2));
			}
			else if(fun.equals("abs")){
				double op1 = valStack.pop();
				valStack.push(Math.abs(op1));
			}
			else if(fun.equals("sin")){
				double op1 = valStack.pop();
				valStack.push(Math.sin(op1));
			}
			else if(fun.equals("cos")){
				double op1 = valStack.pop();
				valStack.push(Math.cos(op1));
			}
			else if(fun.equals("tan")){
				double op1 = valStack.pop();
				valStack.push(Math.tan(op1));
			}
			else if(fun.equals("asin")){
				double op1 = valStack.pop();
				valStack.push(Math.asin(op1));
			}
			else if(fun.equals("acos")){
				double op1 = valStack.pop();
				valStack.push(Math.acos(op1));
			}
			else if(fun.equals("atan")){
				double op1 = valStack.pop();
				valStack.push(Math.atan(op1));
			}
			else if(fun.equals("sqrt")){
				double op1 = valStack.pop();
				valStack.push(Math.sqrt(op1));
			}
			else if(fun.equals("ln")){
				double op1 = valStack.pop();
				valStack.push(Math.log(op1));
			}
			else if(fun.equals("log")){
				double op1 = valStack.pop();
				valStack.push(Math.log10(op1));
			}
			else if(fun.equals("exp")){
				double op1 = valStack.pop();
				valStack.push(Math.exp(op1));
			}
			else if(fun.equals("ceil")){
				double op1 = valStack.pop();
				valStack.push(Math.ceil(op1));
			}
			else if(fun.equals("floor")){
				double op1 = valStack.pop();
				valStack.push(Math.floor(op1));
			}
			else if(fun.equals("round")){
				double op1 = valStack.pop();
				valStack.push(1.0 * Math.round(op1));
			}
		}
		else{
			funStack.push(fun);
			return;
		}
		
		if(type == 1 || type == 2){
			if(funStack.empty() == false){
				compute(valStack,funStack,type,0);
			}
		}
	}

	/**
	 * return the equation string
	 * @return  the equation string
	 */
	public String getEquation() {
		return equation;
	}

	/**
	 * set equation, add the blank at the begin and end to use regular expression easier.
	 * @param equation
	 */
	public void setEquation(String equation) {
		this.equation = " " + equation  + " ";
	}
	
	/**
	 * get equation with [] automatically.
	 * @return
	 */
	public String getFormedEquation(){
		return formedEquation;
	}
	
	/**
	 * return the number of variables used in the equation, including the result.
	 * @return
	 */
	public int getNumberVariable(){
		return numberVariable;
	}
	
	/**
	 * randomly generate an equation with new variables
	 * @throws Exception
	 */
	public void randomVar() throws Exception
	{
		Iterator<Entry<String, Var>> it = variables.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry<String, Var> pair = (Map.Entry<String, Var>)it.next();
	        if(defaultFunction.containsKey(pair.getKey()) || defaultNumbers.containsKey(pair.getKey())){
	        	throw new Exception("Variable contains default key");
	        }
	        pair.getValue().randOperand();
	    }

	    formedEquation = equation;
	    numberVariable = 0;
		// check the formulas format and compute the inorder formula
		Stack<Double> valStack = new Stack<Double>();
		Stack<String> funStack = new Stack<String>();
		boolean start = true; // used to check - is negative or minus;
		for(int i = 0; i < equation.length(); ++i){
			char c = equation.charAt(i);
			switch(c){
				case '(':
					funStack.push("(");
					start = true;
					break;
				case ')':
					compute(valStack,funStack,1,0);
					break;
				case '+':
				case '-':
					if(start){
						valStack.push(0.0);
						start = false;
					}
				case '*':
				case '/':
				case '^':
					String words = String.valueOf(c);
					compute(valStack,funStack,0,defaultFunction.get(words));
					funStack.push(words);
					break;
				default:
					if(c >= '0' && c <= '9' )
					{
						Matcher matcher = parseDigits.matcher(equation.substring(i));
						if(matcher.find())
						{
							words = matcher.group(1);
							double value = Double.valueOf(words);
							i += words.length() - 1;
							valStack.push(value);
							start = false;
						}
					}
					else if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ){
						String subStr = equation.substring(i);
						Matcher matcher = wordPattern.matcher(subStr);
						if(matcher.find())
						{
							words = matcher.group(1);
							if(defaultFunction.containsKey(words)){
								compute(valStack,funStack,0,defaultFunction.get(words));
								funStack.push(words);
								start = false;
							}
							else if(variables.containsKey(words)){
								Var val = variables.get(words);
								valStack.push(val.getOperand());
								start = false;

								String s1= formedEquation.substring(0,numberVariable*2 + i);
								String s2 = formedEquation.substring(numberVariable*2 + i + words.length());
								formedEquation = s1 + "[" + words + "]" + s2;
								numberVariable++;
							}
							else if(defaultNumbers.containsKey(words)){
								valStack.push(defaultNumbers.get(words));
								start = false;
							}
							else{
								throw new Exception("No definition of words " + words);
							}
							i += words.length() - 1;
						}
					}
					break;
			}
		}
		numberVariable++;
		compute(valStack,funStack,2,0);
		correctAnswer = valStack.peek();
		formedEquation += "= [?] ";
	}
}
