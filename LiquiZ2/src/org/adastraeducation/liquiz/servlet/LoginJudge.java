package org.adastraeducation.liquiz.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.adastraeducation.liquiz.database.Check;

/*
 * Author: Yingzhu
 * Logic for login page. Judge whether username and password are right
 */
public class LoginJudge extends HttpServlet {
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String user = request.getParameter("userName");
		String password = request.getParameter("passwd");
		if(user.equals("quiz")&&password.equals("123")){
		//if(Check.checkLogin(user,password)) {
			RequestDispatcher dispatcher = request.getRequestDispatcher("home.jsp");
			dispatcher.forward(request, response);
		}
		else{
			RequestDispatcher dispatcher = request.getRequestDispatcher("Login.jsp");
			dispatcher.forward(request, response);
		}
	}
}
