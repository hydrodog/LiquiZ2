package org.adastraeducation.liquiz.servlet;
import javax.servlet.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GradeQuiz extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp) {
		try {
			String line;
			BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));
			while ((line = br.readLine()) != null)
				System.out.println(line);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
