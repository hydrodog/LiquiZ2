package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public class ResponseTextFactory extends DisplayElementFactory {
	public Text create(ResultSet rs) throws SQLException {
		return new TextResponse(rs.getString("TextElement"));
	}
}
