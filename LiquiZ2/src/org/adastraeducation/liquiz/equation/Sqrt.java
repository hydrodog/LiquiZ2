package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Sqrt implements Expression{
	private Expression op;
	
	public Sqrt(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.sqrt(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("sqrt(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("sqrt");
	}
	
	public void infixReplaceVar(DisplayContext dc){
		dc.append("sqrt(");
		op.infixReplaceVar(dc);
		dc.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("sqrt");
	}
}
