package org.adastraeducation.liquiz.equation;

import org.adastraeducation.liquiz.DisplayContext;

public interface Expression {
	public double eval();
	public void infix(StringBuilder b);
	public void rpn(StringBuilder b);
	public void infixReplaceVar(DisplayContext dc);
	public void rpnReplaceVar(StringBuilder b);
}
