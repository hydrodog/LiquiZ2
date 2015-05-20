package org.adastraeducation.liquiz.database;

import java.sql.*;
import org.adastraeducation.liquiz.*;

/**
 * Makes changes to database entries to reflect edits to entities
 * @author yijinkang
 *
 */
public class Edit {
	/**
	 * update course information (NOT DONE)
	 * @param name the name of the course
	 * @param privacy the course's privacy
	 */
	public void updateCourse(String name, String privacy) { 
		Connection conn = null;
		try {
			conn = DatabaseMgr.getConnection();
			PreparedStatement p = conn.prepareStatement("UPDATE Users SET Name = ? WHERE Privacy = ?");
			//TODO! What parameters? 
			p.setString(1, name);
			p.setString(2, privacy);
			p.execute();
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseMgr.returnConnection(conn);
		}
	}
}
