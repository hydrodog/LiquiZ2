<%@ page contentType="application/json" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
{
<%
	BufferedReader r = new BufferedReader(new InputStreamReader(request.getInputStream()));
	StringBuilder b = new StringBuilder(32768);
	String userid = r.readLine();
	String passwd = r.readLine();
	System.out.println(userid);
	System.out.println(passwd);
	r.close();
	File f = null;
	try {
 		f = new File(userid + ".json");
	} catch (Exception e) {
		System.out.println("Can't open file" + userid);
		return;
	}
	long len = f.length();
	FileInputStream fis = new FileInputStream(f);
	byte[] buf = new byte[(int)len];
	fis.read(buf);
	out.print(buf);
	fis.close();
//	out.print("\"xtc\": \"");
//	out.print(b);
//	out.println("\",");
%>

	"css" : "red.css",
	"stdchoice": {
		"tf" : ["true", "false"],
		"Likert3" : ["Agree", "Neutral", "Disagree"],
		"Likert3NA" : ["Agree", "Neutral", "Disagree", "N/A"],
	},
	"regex": {
		"c++": {
			"float" : "regex",
			"double" : "regex",
			"ident", : "[A_Za-z_][A_Za-z_0-9]*",
		
		
		}
	}
	"policies": {
	
	
	}
}