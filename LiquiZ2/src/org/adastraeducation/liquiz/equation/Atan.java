package org.adastraeducation.liquiz.equation;

public class Atan implements Expression{
	private Expression op;
	
	public Atan(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.atan(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("atan(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("atan");
	}
	
	public void infixReplaceVar(StringBuilder b){
		b.append("atan(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("atan");
	}
}
