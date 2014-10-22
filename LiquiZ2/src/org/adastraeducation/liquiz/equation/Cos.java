package org.adastraeducation.liquiz.equation;

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
	
	public void infixReplaceVar(StringBuilder b){
		b.append("cos(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("cos");
	}
}
