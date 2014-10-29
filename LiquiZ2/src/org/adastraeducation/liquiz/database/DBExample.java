package org.adastraeducation.liquiz.database;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBExample {
	public static void main(String[] args) {
		print(System.out, "<br/>");
	}
	public static void print(PrintStream out, String sep) {
		Connection conn = null;
		try {
			// first, the simple way...
			// This is not good because: 
			conn = DatabaseMgr.getConnection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT qid,qtype,title,image,text FROM Questions");
			while (rs.next()) {
				int id = rs.getInt("qid");
				int qtype = rs.getInt("qtype");
				String title = rs.getString("title");
				String image = rs.getString("image");
				String text = rs.getString("text");
				
				out.println(id + "\t" + qtype + "\t" + title + "\t" + image + "\t" + text + sep);
				
			}
			
			rs.close();
			stmt.close();
			
			//PreparedStatements are more secure. and faster too
			PreparedStatement p = conn.prepareStatement
					("SELECT qid,qtype,title,image,text FROM Questions WHERE title like ?");
			p.setString(1, "java");
			rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("qid");
				int qtype = rs.getInt("qtype");
				String title = rs.getString("title");
				String image = rs.getString("image");
				String text = rs.getString("text");
				
				System.out.println(id + "\t" + qtype + "\t" + title + "\t" + image + "\t" + text);
				
			}
			
			rs.close();
			stmt.close();
		
		
			
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		
	}
	/*
	 * 
	public static ArrayList<Question> exampleOfQuestionQueryPseudocode () {
		
		 This example shows how to create a MultiChoice object for now...
		 
		conn = DatabaseMgr.getConnection();
		conn2 = DatabaseMgr...
		PreparedStatement p = conn.prepareStatement(" SELECT ... FROM Questions");
		
		// DO A JOIN Above!

		 ArrayList<Question> questions = new ArrayList<Question>();
		 
		ResultSet rs = p.executeQuery();
		while (rs.next()) {
			int qid = rs.getInt("qid");
			int qtype = rs.getInt("qtype");
			String title = rs.getString("title");
			String image = rs.getString("image");
			String text = rs.getString("text");
			
			//switch(qtype) {
			//case 1:
			 * 
				MultiChoice m = new MultiChoice(.....); // but NO ANSWERS
			questions.add(m);
			System.out.println(id + "\t" + qtype + "\t" + title + "\t" + image + "\t" + text);
			p2.setInt(1, qid);
			ResultSet rs2 = p2.executeQuery();
			
			PreparedStatement p2 = conn2.prepareStatement(" SELECT  ,... FROM Answers WHERE ");	
			
			while (rs2.next() ) {
			   m.addAnswer(  answer, isitright);
			
			}
			rs2.close();
			p2.close()

		}
		
		rs.close();
		p.close();
		
		
	}
		*/

}
