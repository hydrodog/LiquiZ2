package org.adastraeducation.liquiz.equation;

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
	
	public void infixReplaceVar(StringBuilder b){
		b.append("sqrt(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("sqrt");
	}
}
