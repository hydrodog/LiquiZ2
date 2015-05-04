package org.adastraeducation.liquiz.util;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.adastraeducation.liquiz.*;

public class Util {
	public static void writeListAsJS(ArrayList<Displayable> list, StringBuilder b) {
		b.append("[");
		if (list.size() > 0) {
			list.get(0).writeJS(b);
		}
		for (int i = 1; i < list.size(); i++) {
			b.append(',');
			list.get(i).writeJS(b);
		}
		b.append("]");
	}
	
	public static void writeListAsJS(String name, ArrayList<Displayable> list, StringBuilder b) {
		b.append(name).append('(');
		writeListAsJS(list, b);
		b.append(')');
	}
	
	public static void writeAnsListAsJS(ArrayList<Answer> list, StringBuilder b) {
		b.append("[");
		if (list.size() > 0) {
			list.get(0).writeJS(b);
		}
		for (int i = 1; i < list.size(); i++) {
			b.append(',');
			list.get(i).writeJS(b);
		}
		b.append("]");
	}
	
	public static void writeAnsListAsJS(String name, ArrayList<Answer> list, StringBuilder b) {
		b.append(name).append('(');
		writeAnsListAsJS(list, b);
		b.append(')');
	}
	
	public static String escapeRegex(String s) {
		return s; //TODO
	}
	
	// TODO: make this escape strings in single quotes
	public static String escapeJS(String s) {
		return s;
	}
	// TODO: make this escape strings in single quotes
	public static String escapeXML(String s) {
		return s;
	}
	public static String standardAJAXHeader(HttpSession session) {
		StringBuilder b = new StringBuilder(1024);
		b.append("{\n").append("css:'").append
		(session.getAttribute("css")).append('\'');	
		return b.toString();
	}

}
