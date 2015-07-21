package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public class QuestionTextFactory extends DisplayElementFactory {
	public Text create(ResultSet rs) throws SQLException {
		return new TextQuestion(rs.getString("TextElement"));
	}
}
