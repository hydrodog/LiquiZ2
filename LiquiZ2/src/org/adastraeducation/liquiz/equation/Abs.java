package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Abs implements Expression {
	private Expression op;
	
	public Abs(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.abs(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("|");
		op.infix(b);
		b.append("|");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("abs");
	}
	
	public void infixReplaceVar(DisplayContext dc){
		dc.append("abs(");
		op.infixReplaceVar(dc);
		dc.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("abs");
	}
}
