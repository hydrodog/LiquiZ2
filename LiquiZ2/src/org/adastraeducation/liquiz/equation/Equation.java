package org.adastraeducation.liquiz.equation;
import java.util.*;
import java.util.regex.*;

import org.adastraeducation.liquiz.*;

/**
 * Present equations with random variables.
 * It has two ways to parse the equations in string[]. One is in infix, and the other is in the RPN.
 * @author Yingzhu Wang
 *
 */

public class Equation implements Displayable {
	private Expression func;
	private double correctAnswer;
	private HashMap<String,Var> variables;
	
	public Equation(String equation, HashMap<String,Var> variables){
		this.variables=variables;
		ArrayList<String> equationSplit = this.parseQuestion(equation);
		this.func = this.parseInfix(equationSplit);
		correctAnswer = func.eval();
	}
	
	public Equation(Expression func, HashMap<String,Var> variables){
		this.func = func;
		this.variables = variables;
		correctAnswer=func.eval();
	}
	
	public Equation(Expression func){
		this.func = func;
		this.variables = new HashMap<String,Var>();
		correctAnswer=func.eval();
	}
	public void setExpression(Expression e){
		this.func=e;
		correctAnswer=func.eval();
	}
	
	public void setVariables(HashMap<String,Var> variables){
		this.variables = variables;
	}
	

	public String getTagName() { return "Equation"; }


	public  Expression parseInfix(ArrayList<String> s){
		Tree t = new Tree(s);
		ArrayList<String> rpn = t.traverse();

		return parseRPN(rpn);
	}
	// Precompile all regular expressions used in parsing
	private static final Pattern parseDigits =
			Pattern.compile("^[0-9]+$");
    private static final Pattern wordPattern =
    		Pattern.compile("[\\W]|([\\w]*)");

    /*TODO: We can do much better than a switch statement,
    * but it would require a hash map and lots of little objects
    */
    //TODO: Check if binary ops are backgwards? a b - ????
	public  Expression parseRPN(ArrayList<String> s) {
		Stack<Expression> stack = new Stack<Expression>();
		for(int i = 0; i<s.size(); i++){
			String temp = s.get(i);
			if (Functions.MATHFUNCTIONS.contains(temp)) {
				Expression op1 ;
				Expression op2 ;
				switch(temp){
				case "+": 
					op2=stack.pop();
					op1=stack.pop();
					stack.push(new Plus(op1,op2));
					break;
				case "-": 
					op2=stack.pop();
					op1=stack.pop();
					stack.push( new Minus(op1,op2));
					break;
				case "*": 
					op2=stack.pop();
					op1=stack.pop();
					stack.push( new Multi(op1,op2));break;
				case "/": 
					op2=stack.pop();
					op1=stack.pop();
					stack.push( new Div(op1,op2));break;
				case "sin":
					op1=stack.pop();
					stack.push(new Sin(op1));break;
				case "cos":
					op1=stack.pop();
					stack.push(new Cos(op1));break;
				case "tan":
					op1=stack.pop();
					stack.push(new Tan(op1));break;
				case "abs":
					op1=stack.pop();
					stack.push(new Abs(op1));break;
				case "Asin":
					op1=stack.pop();
					stack.push(new Asin(op1));break;
				case "Atan":
					op1=stack.pop();
					stack.push(new Atan(op1));break;
				case "neg":
					op1=stack.pop();
					stack.push(new Neg(op1));break;
				case "sqrt":
					op1=stack.pop();
					stack.push(new Sqrt(op1));break;	
				default:break;
				}

			}
			//deal with the space
			else if(temp.equals(""))
				;
			else{
				Matcher m = parseDigits.matcher(temp);
				if (m.matches()){
					double x = Double.parseDouble(temp);
					stack.push(new Constant(x));
				}
				else{
					stack.push(variables.get(temp));
				}
			}
		}
		return stack.pop();
	}
	
	public ArrayList<String> parseQuestion(String question){
		ArrayList<String> s = new ArrayList<String>();
	    Matcher m = wordPattern.matcher(question);    
	    while(m.find()){
	    	s.add(m.group());
	    }
		return s;
	}
	
//	public ResultSet readDatabase(String sql){
//		return DatabaseMgr.select(sql);
//	}
//	
//	public void writeDatabase(String sql){
//		DatabaseMgr.update(sql);
//	}
	
	public Expression getExpression(){
		return func;
	}
	
	public double getCorrectAnswer(){
		return correctAnswer;
	}



	@Override
	public void writeHTML(StringBuilder b) {	
		func.infixReplaceVar(b);
	}

	@Override
	public void writeXML(StringBuilder b) {
		b.append("<Equation question='");
		func.infix(b);
		b.append("'></Equation>");
	}

	@Override
	public void writeJS(StringBuilder b) {
		
	}
	
}
