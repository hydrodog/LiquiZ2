package org.adastraeducation.liquiz;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

public abstract class BaseEntity {
	@Id
	@Property("id")
	protected ObjectId id_database;

	public ObjectId getId_database() {
		return id_database;
	}

	public void setId_database(ObjectId id_database) {
		this.id_database = id_database;
	}

	
	
}
