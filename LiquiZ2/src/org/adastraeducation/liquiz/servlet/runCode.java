package org.adastraeducation.liquiz.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class runCode extends HttpServlet {
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String s = request.getParameter("code_text");
		FileOutput.output(System.getProperty("user.dir"), s);
	}


	private static void printLines(String name, InputStream ins) throws Exception {
		String line = null;
		BufferedReader in = new BufferedReader(
				new InputStreamReader(ins));
		while ((line = in.readLine()) != null) {
			System.out.println(name + " " + line);
		}
	}

	private static void runProcess(String command) throws Exception {
		Process pro = Runtime.getRuntime().exec(command);
		printLines(command + " stdout:", pro.getInputStream());
		printLines(command + " stderr:", pro.getErrorStream());
		pro.waitFor();
		System.out.println(command + " exitValue() " + pro.exitValue());
	}

	public static void main(String[] args) {
		try {
			runProcess("javac code.java");
			runProcess("java code");
		} catch (Exception e) {
			e.printStackTrace();
		}
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
