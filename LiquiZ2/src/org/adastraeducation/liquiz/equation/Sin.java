package org.adastraeducation.liquiz.equation;

public class Sin implements Expression{
	private Expression op;
	
	public Sin(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return Math.sin(op.eval());
	}
	
	public void infix(StringBuilder b){
		b.append("sin(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("sin");
	}
	
	public void infixReplaceVar(StringBuilder b){
		b.append("sin(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("sin");
	}
}
