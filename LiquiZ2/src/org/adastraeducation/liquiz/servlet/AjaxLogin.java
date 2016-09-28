package org.adastraeducation.liquiz.servlet;

import javax.servlet.http.*;
import java.io.*;

public class AjaxLogin extends HttpServlet {

		public void doGet(HttpServletRequest req, HttpServletResponse resp) {
			resp.setContentType("application/json");
			resp.setCharacterEncoding("utf-8");
			{
				String userid = req.getParameter("userid");
				String s = readFully(userid + ".json");
				PrintWriter out = resp.getWriter();
				out.print(s);
			}
		}
		
		public static String readFully(String filename) throws IOException {
			File file = null;
			FileInputStream fis = null;
			try {
				file = new File(filename);
				fis = new FileInputStream(file);
				byte[] data = new byte[(int) file.length()];
				fis.read(data);
				return new String(data, "UTF-8"); 
			} catch(IOException e) {
				System.out.println(e);				
			} finally {
				try {
					if (fis == null)
						fis.close();
				}catch (IOException e2) {
					System.out.println(e2);
				}
			}
			
		}
}
