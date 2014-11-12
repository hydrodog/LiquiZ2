package org.adastraeducation.liquiz.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserLogin {
	public static boolean checkLogin(String un, String pw) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT UserID, Password FROM Users WHERE UserID=? AND Password=?");
			p.setString(1, un); 
			p.setString(2, pw);
			ResultSet rs = p.executeQuery();
			if(rs.next()) {
				System.out.print("Login successful");
				rs.close();
				return true;
			} else {
				System.out.print("Username or password incorrect");
				rs.close();
				return false;
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
		return false;
	}
}
