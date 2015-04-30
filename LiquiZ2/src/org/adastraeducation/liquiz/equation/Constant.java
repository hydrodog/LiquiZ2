package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Constant implements Expression {
	
	private double operand;
	
	public Constant(double operand){
		this.operand=operand;
	}


	public double eval() {
		
		return operand;
	}


	public void infix(StringBuilder b) {
		b.append(operand);
		
	}


	public void rpn(StringBuilder b) {
		b.append(operand);		
	}


	public void infixReplaceVar(DisplayContext dc) {
		dc.append(operand);
		
	}

	@Override
	public void rpnReplaceVar(StringBuilder b) {
		b.append(operand);	
	}

}
