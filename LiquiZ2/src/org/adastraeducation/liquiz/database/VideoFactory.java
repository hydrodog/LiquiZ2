package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public class VideoFactory extends DisplayElementFactory {
	public Video create(ResultSet rs) throws SQLException {
		return new Video(rs.getString("Path"), rs.getInt("Width"), rs.getInt("Height"));
	}
}
