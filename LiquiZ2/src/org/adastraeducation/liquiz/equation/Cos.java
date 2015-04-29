package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Cos implements Expression{
	private Expression op;
	
	public Cos(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.cos(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("cos(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("cos");
	}
	
	public void infixReplaceVar(DisplayContext dc){
		dc.append("cos(");
		op.infixReplaceVar(dc);
		dc.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("cos");
	}
}
