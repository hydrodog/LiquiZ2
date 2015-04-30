package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Tan implements Expression{
	private Expression op;
	
	public Tan(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.tan(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("tan(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("tan");
	}
	
	public void infixReplaceVar(DisplayContext dc){
		dc.append("tan(");
		op.infixReplaceVar(dc);
		dc.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("tan");
	}
}
