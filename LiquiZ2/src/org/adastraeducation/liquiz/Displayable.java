package org.adastraeducation.liquiz;

public interface Displayable {
	public void writeHTML(StringBuilder b);
	public void writeJS(StringBuilder b);
	public void writeXML(StringBuilder b);
}
