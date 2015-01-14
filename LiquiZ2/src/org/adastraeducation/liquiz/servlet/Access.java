package org.adastraeducation.liquiz.servlet;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Access {
	
	private String accessToken;
	
	public Access(String token){
		this.accessToken = token;
	}
	
	public void connect() throws Exception{
		String apiURL = "https://canvas.test.instructure.com/api/v1/courses";
		URL url = new URL(apiURL);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.disconnect();

		con.setDoOutput(true);
		con.setDoInput(true);
		con.setRequestMethod("GET");
		String authorization = "Bearer " + accessToken;
		con.setRequestProperty("Authorization",authorization);

		con.connect();

		int responseCode = con.getResponseCode();
		System.out.println(responseCode);
		
		InputStream is = con.getInputStream();
		BufferedInputStream bis = new BufferedInputStream(is);
		
		byte[] bytes = new byte[100];
		while(bis.read(bytes)!=-1){
			String str = new String(bytes);
			System.out.println(str);
		}
		
	}

}
