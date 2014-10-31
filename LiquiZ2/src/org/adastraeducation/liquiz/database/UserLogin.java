package org.adastraeducation.liquiz.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

public class UserLogin {
	public static boolean checkLogin(HttpServletRequest request) {
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("SELECT UserID, Password FROM Users WHERE UserID=? AND Password=?");
			p.setString(1, request.getParameter("id")); 
			p.setString(2, request.getParameter("passwd"));
			ResultSet rs = p.executeQuery();
			if(rs.next()) {
				rs.close();
				return true;
			} else {
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
