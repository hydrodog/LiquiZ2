package org.adastraeducation.liquiz.equation;

public class Neg implements Expression{
	private Expression op;
	
	public Neg(Expression op){
		this.op=op;
	}
	
	public double eval(){
		return -op.eval();
	}

	
	public void infix(StringBuilder b){
		b.append("neg(");
		op.infix(b);
		b.append(")");
	}
	
	public void rpn(StringBuilder b){
		op.rpn(b);
		b.append("neg");
	}
	
	public void infixReplaceVar(StringBuilder b){
		b.append("neg(");
		op.infixReplaceVar(b);
		b.append(")");
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op.rpnReplaceVar(b);
		b.append("neg");
	}
}
