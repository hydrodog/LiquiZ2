package org.adastraeducation.liquiz;
/**
 * Includes Text and Media
 * @author yijinkang
 *
 */
public abstract class DisplayElement implements Displayable, java.io.Serializable{
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
