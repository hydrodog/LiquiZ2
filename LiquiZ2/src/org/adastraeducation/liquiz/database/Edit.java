package org.adastraeducation.liquiz.database;

import java.sql.*;
import org.adastraeducation.liquiz.*;

/**
 * update course infomation
 * @param name course name
 * @param privacy A 4-character string representing a privacy setting
 * @author yijinkang
 *
 */
public class Edit {
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
