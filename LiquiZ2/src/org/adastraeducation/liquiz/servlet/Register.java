package org.adastraeducation.liquiz.servlet;

import java.io.IOException;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
 * Authour:Yingzhu
 * Logic for register.
 * It will send an email to users' email-address. To click the url in the email will finish
 * the whole registration
 */

public class Register extends HttpServlet{
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		StringBuilder sb = new StringBuilder();
		
		String passwd1 = request.getParameter("passwd");
		String passwd2 = request.getParameter("passwd2");
		String emailAddress = request.getParameter("email-address");
		
		if(passwd1.equals(passwd2)&&testEmail(emailAddress)){
			sb.append("Please check the confirm email to finish the registeration!");
			sendEmail(request);
		}
		else{
			sb.append("Your password or emailAddress are wrong." +
					"Please check whether you input password two times correctly or" +
					"whether you have used your Stevens email!");
		}
		request.setAttribute("check", sb.toString());
		RequestDispatcher dispatcher = request.getRequestDispatcher("RegisterCheck.jsp");
		dispatcher.forward(request, response);
	}
	
	//Here is the function to send email
	
	public void sendEmail(HttpServletRequest request){
		//your host
		String host = "smtp.gmail.com";
		
		//email from
		String from = "banboonwang@gmail.com";
		
		//email to
		String to = request.getParameter("email-address");
		String userName = request.getParameter("userName");
		String password = request.getParameter("passwd");
		
		
		// Get system properties
		Properties properties = System.getProperties();
		properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.setProperty("mail.smtp.host", host);
		properties.put("mail.smtp.starttls.enable","true");
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.socketFactory.port", "465");
		properties.put("mail.smtp.port", "465");
		
		// Get the default Session object.
		Session session = Session.getDefaultInstance(properties);
		
		try{
			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(from));

			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO,
					new InternetAddress(to));

			// Set Subject: header field
			message.setSubject("Registeration Confirm");

			// Send the actual HTML message, as big as you like
			message.setContent("<h1>Congradulations to register successfully!</h1></br>" +
					"<p>Your username is:  "+userName+"</p>"+
					"<p>Your password is:  "+password+"</p>"+"PleaseRemeber!",
					"text/html" );

			// Send message
			Transport transport=session.getTransport("smtp");
			transport.connect("smtp.gmail.com","banboonwang","********"); 
			transport.sendMessage(message,message.getAllRecipients());
			transport.close();
			System.out.println("Sent message successfully....");
		}catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
	
	public boolean testEmail(String s){
		String rule = "[a-zA-z0-9]+@gmail.com";
		Pattern p = Pattern.compile(rule);
		Matcher m = p.matcher(s);
		if(m.matches())
			return true;
		else
			return false;
	}
}


