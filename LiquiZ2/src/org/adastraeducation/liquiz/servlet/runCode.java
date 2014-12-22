package org.adastraeducation.liquiz.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class runCode extends HttpServlet {
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String s = request.getParameter("code_text");
		FileOutput.output(System.getProperty("user.dir"), s);
		try {
			runProcess("javac code.java");
			String result = runProcess("java code");
			request.setAttribute("result", result);
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

	//		public static void main(String[] args){
	//			
	//	        Process ps;
	//			try {
	//				ps = Runtime.getRuntime().exec("javac /Users/wyz/Documents/eclipse_workspace/CPE642/src/codeTest/Solution.java");
	//				ps = Runtime.getRuntime().exec("java .\\src\\codeTest.Solution");
	//				
	//				InputStreamReader isr = new InputStreamReader(ps.getInputStream());
	//				BufferedReader br = new BufferedReader(isr);
	//				
	//				String line;
	//				
	//				while((line=br.readLine())!=null){
	//					System.out.println(line);
	//				}
	//			
	//			} catch (IOException e) {
	//				// TODO Auto-generated catch block
	//				e.printStackTrace();
	//			}
	//		}



}
