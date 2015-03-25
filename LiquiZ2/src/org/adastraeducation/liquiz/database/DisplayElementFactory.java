package org.adastraeducation.liquiz.database;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.adastraeducation.liquiz.*;

public abstract class DisplayElementFactory {
	public abstract DisplayElement create(ResultSet rs) throws SQLException;
}
