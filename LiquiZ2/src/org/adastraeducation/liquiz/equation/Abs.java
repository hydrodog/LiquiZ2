package org.adastraeducation.liquiz.equation;

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
	
	public void infixReplaceVar(StringBuilder b){
		b.append("abs(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("abs");
	}
}
