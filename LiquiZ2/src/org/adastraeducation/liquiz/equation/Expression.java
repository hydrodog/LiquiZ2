package org.adastraeducation.liquiz.equation;

public interface Expression {
	public double eval();
	public void infix(StringBuilder b);
	public void rpn(StringBuilder b);
	public void infixReplaceVar(StringBuilder b);
	public void rpnReplaceVar(StringBuilder b);
}
