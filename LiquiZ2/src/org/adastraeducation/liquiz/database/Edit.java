package org.adastraeducation.liquiz.database;

import java.sql.*;
import org.adastraeducation.liquiz.*;

/**
 * Edits rows when entities are edited
 * @author yijinkang
 *
 */
public class Edit {
	public void updateCourse() { 
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("UPDATE Users SET ?=? WHERE ?=?");
			//TODO! What parameters? 
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
}
