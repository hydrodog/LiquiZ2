package org.adastraeducation.liquiz.servlet;

/*
 * Author: Yingzhu
 */
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class runCode extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String s = request.getParameter("code_text");
		String language = request.getParameter("code_type");
		
		String location_path="/Users/wyz/git/LiquiZ2/LiquiZ2/";
		
		FileOutput.output(location_path, s,language);
		//FileOutput.output(System.getProperty("user.dir"), s,language);
		request.setAttribute("path", System.getProperty("user.dir"));
		try {
			if(language.equals("Java")){
				runProcess("javac "+location_path+"code.java");
				String[] command={"bash","-c", "cd "+location_path+" ; java code"};
				String result = runProcess(command);
				request.setAttribute("result", result);
			}
			else{
				runProcess("g++ code.cpp");
				String result = runProcess("./a.out");
				request.setAttribute("result", result);
			}
			RequestDispatcher dispatcher = request.getRequestDispatcher("codeResult.jsp");
			dispatcher.forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	private  String printLines(String name, InputStream ins) throws Exception {
		String line = null;
		BufferedReader in = new BufferedReader(new InputStreamReader(ins));
		StringBuilder sb = new StringBuilder();
		while ((line = in.readLine()) != null) {
			sb.append(name + " " + line);
		}
		return sb.toString();
	}

	private  String runProcess(String command) throws Exception {
		Process pro = Runtime.getRuntime().exec(command);
		StringBuilder sb = new StringBuilder();
		sb.append(printLines(command + " stdout:", pro.getInputStream()));
		sb.append(printLines(command + " stderr:", pro.getErrorStream()));
		pro.waitFor();
		sb.append(command + " exitValue() " + pro.exitValue());
		return sb.toString();
	}
	
//	private  String runProcessBuilder(String command) throws Exception {
//		ProcessBuilder pb = new ProcessBuilder( command );
//		
//		pb.directory(new File("/Users/wyz/git/LiquiZ2/LiquiZ2/"));
//		Process pro = pb.start();
//		StringBuilder sb = new StringBuilder();
//		sb.append(printLines(command + " stdout:", pro.getInputStream()));
//		sb.append(printLines(command + " stderr:", pro.getErrorStream()));
//		pro.waitFor();
//		sb.append(command + " exitValue() " + pro.exitValue());
//		return sb.toString();
//	}
	
	private  String runProcess(String[] command) throws Exception {
		ProcessBuilder pb = new ProcessBuilder( command );
		Process pro = pb.start();
		StringBuilder sb = new StringBuilder();
		sb.append(printLines(command + " stdout:", pro.getInputStream()));
		sb.append(printLines(command + " stderr:", pro.getErrorStream()));
		pro.waitFor();
		sb.append(command + " exitValue() " + pro.exitValue());
		return sb.toString();
	}

}
