package org.adastraeducation.liquiz.servlet;
import javax.servlet.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import com.google.gson.*;

public class GradeQuiz extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp) {
		try {
			String line;
			BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));
			while ((line = br.readLine()) != null)
				System.out.println(line);
			Gson gson = new Gson();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
