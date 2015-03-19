package org.adastraeducation.liquiz;
/**
 * Represents a single element to be displayed on the screen
 * @author yijinkang
 *
 */
public interface Displayable {
	public void writeHTML(StringBuilder b);
	public void writeJS(StringBuilder b);
	public void writeXML(StringBuilder b);	//TODO: might delete. will use XML serialization 
}
