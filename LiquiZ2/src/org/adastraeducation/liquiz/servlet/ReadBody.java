package org.adastraeducation.liquiz.servlet;
import javax.servlet.http.*;
import java.io.*;
@SuppressWarnings("serial")
public class ReadBody extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) {
		String body = getBody(req);
		resp.setContentType("text/plain");
		PrintWriter out;
		try {
			out = resp.getWriter();
			out.println(body);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	 public static String getBody(HttpServletRequest request)  {

		    String body = null;
		    StringBuilder stringBuilder = new StringBuilder();
		    BufferedReader bufferedReader = null;

		    try {
		        InputStream inputStream = request.getInputStream();
		        if (inputStream != null) {
		            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
		            char[] charBuffer = new char[128];
		            int bytesRead = -1;
		            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
		                stringBuilder.append(charBuffer, 0, bytesRead);
		            }
		        } else {
		            stringBuilder.append("");
		        }
		    } catch (IOException ex) {
		        
		    } finally {
		        if (bufferedReader != null) {
		            try {
		                bufferedReader.close();
		            } catch (IOException ex) {
		            	
		            }
		        }
		    }

		    body = stringBuilder.toString();
		    return body;
	 }
}
