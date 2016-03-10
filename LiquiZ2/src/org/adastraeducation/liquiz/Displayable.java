package org.adastraeducation.liquiz;
/**
 * Represents a single element to be displayed on the screen
 * @author yijinkang
 *
 */

public interface Displayable extends java.io.Serializable{
	public void writeHTML(DisplayContext dc);
	public void writeJS(DisplayContext dc);
	public void writeXML(StringBuilder b);	//TODO: might delete. will use XML serialization 
}
