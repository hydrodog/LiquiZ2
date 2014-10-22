package org.adastraeducation.liquiz.util;

/*
 * author: Yingzhu
 * I create some patterns that users can directly use.
 */

public class SpecializedPattern {
	public static QuestionPattern MASS = new QuestionPattern("([0-9|.]+)(kg|kilogram)");
	public static QuestionPattern LENGTH = new QuestionPattern("([0-9|.]+)(m|meter)");
	public static QuestionPattern TIME = new QuestionPattern("([0-9|.]+)(s|second)");
	public static QuestionPattern VELOCITY = new QuestionPattern("([0-9|.]+)(m\\/s|meter\\/second)");
}
