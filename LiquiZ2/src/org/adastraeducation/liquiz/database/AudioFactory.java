package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public class AudioFactory extends DisplayElementFactory {
	public Audio create(ResultSet rs) throws SQLException {
		return new Audio(rs.getString("Path"));
	}
}
