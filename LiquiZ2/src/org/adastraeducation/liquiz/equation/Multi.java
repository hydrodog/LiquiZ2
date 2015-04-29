package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public class Multi implements Expression{
	private Expression op1;
	private Expression op2;
	
	public Multi(Expression op1, Expression op2){
		this.op1=op1;
		this.op2=op2;
	}

	public double eval(){
		return op1.eval()*op2.eval();
	}
	
	public void infix(StringBuilder b){
		op1.infix(b);
		b.append("*");
		if(op2 instanceof Var ){
			op2.infix(b);
		}
		else{
			b.append("(");
			op2.infix(b);
			b.append(")");
		}
	}
	
	public void rpn(StringBuilder b){
		op1.rpn(b);
		op2.rpn(b);
		b.append("*");
	}
	
	public void infixReplaceVar(DisplayContext dc){
		op1.infixReplaceVar(dc);
		dc.append("*");
		if(op2 instanceof Var ){
			op2.infixReplaceVar(dc);
		}
		else{
			dc.append("(");
			op2.infixReplaceVar(dc);
			dc.append(")");
		}
	}
	
	public void rpnReplaceVar(StringBuilder b){
		op1.rpnReplaceVar(b);
		op2.rpnReplaceVar(b);
		b.append("*");
	}
}
