package org.adastraeducation.liquiz.equation;

public class Asin implements Expression{
	private Expression op;
	
	public Asin(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.asin(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("asin(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("asin");
	}
	
	public void infixReplaceVar(StringBuilder b){
		b.append("asin(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("asin");
	}
}
