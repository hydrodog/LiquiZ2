package org.adastraeducation.liquiz;

import org.mongodb.morphia.annotations.Entity;

/**
 * Includes Text and Media
 * @author yijinkang
 *
 */

@Entity("displayElements")
public abstract class DisplayElement extends BaseEntity implements Displayable, java.io.Serializable{
	private int id;
	public abstract String getName();
	public int getID() {
		return id;
	}
	@Override
	public String toString() {
		return "DisplayElement [text=" + getName() + "]";
	}
	
	
}
