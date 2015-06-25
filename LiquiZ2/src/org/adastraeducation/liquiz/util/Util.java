package org.adastraeducation.liquiz.util;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.adastraeducation.liquiz.*;

public class Util {
	public static void writeListAsJS(ArrayList<Displayable> list, DisplayContext b) {
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
	
	public static void writeListAsJS(String name, ArrayList<Displayable> list, DisplayContext b) {
		b.append(name).append('(');
		writeListAsJS(list, b);
		b.append(')');
	}
	
	public static void writeAnsListAsJS(ArrayList<Answer> list, DisplayContext dc) {
		dc.append("[");
		for (int i = 0; i < list.size(); i++) {
			list.get(i).writeJS(dc);
			dc.append(',');
		}
		dc.append("]");
	}
		
	public static String escapeRegex(String s) {
		return s; //TODO
	}
	
	// TODO: make this escape strings in single quotes
	public static void escape(String s, DisplayContext b) {
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= mlEscapeMap.length) {
				b.append(c);
			} else {
				String esc = mlEscapeMap[s.charAt(i)];
				if (esc == null)
					b.append(c);
				else
					b.append(esc);
			}
		}

	}

	private static String[] mlEscapeMap;
	private static String[] quotedEscapeMap;
	static {
		mlEscapeMap = new String[256];
		quotedEscapeMap = new String[256];
		mlEscapeMap['\\'] = "\\\\";
		mlEscapeMap['&'] = "&amp;";
		mlEscapeMap['<'] = "&lt;";
		mlEscapeMap['>'] = "&gt;";
		System.arraycopy(mlEscapeMap, 0, quotedEscapeMap, 0, mlEscapeMap.length);
		quotedEscapeMap['\''] = "\\'";  // this is the preferred quote to use in our javascript since we use " in java
		quotedEscapeMap['"'] = "\\\""; // escape quoted strings, we prefer single quotes ' but just in case...
	}
	public static void escapeQuotedJS(String s, DisplayContext b) {
		b.append('\'');
		escape(s, b);
		b.append('\'');
	}

	// TODO: make this escape strings in single quotes
	public static String escapeXML(String s) {
		return s;
	}
	public static StringBuilder standardAJAXHeader(HttpSession session) {
		StringBuilder b = new StringBuilder(1024);
		b.append("{\n").append("css:'").append
		(session.getAttribute("css")).append("',\n");	
		return b;
	}

}
