package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public class ImageFactory extends DisplayElementFactory {
	public Image create(ResultSet rs) throws SQLException {
		return new Image(rs.getString("Path"), rs.getInt("Width"), rs.getInt("Height"));
	}
}
