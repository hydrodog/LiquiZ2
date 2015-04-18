package org.adastraeducation.liquiz;
import java.util.ArrayList;
import java.util.Arrays;

public class Response implements Displayable {
	private ArrayList<DisplayElement> displayEls;

	public Response() {
		displayEls = new ArrayList<DisplayElement>();
	}
	// not sure why it's a list so I'm making a new one...
	public Response(ArrayList<DisplayElement> list) {
		displayEls = list;
	}
	
	public Response(DisplayElement d) {
		displayEls.add(d);
	}
	
	public ArrayList<DisplayElement> getDisplayables() {
		return this.displayEls;
	}

	public void add(DisplayElement d){
		displayEls.add(d);
	}

	public void delete(DisplayElement d){
		displayEls.remove(d);
	}

	public void writeHTML (StringBuilder b) {
		b.append("<div class='response'>\n");
		for (Displayable d : displayEls) {
			d.writeHTML(b);
		}
		b.append("</div>\n");
	}

	public void writeXML (StringBuilder b) {
		b.append("<R>");
		for (Displayable d : displayEls) {
			d.writeXML(b);
		}
		b.append("</R>");
	}

	public void writeJS (StringBuilder b) {
		b.append("{title: 'Response', content:[");
		if (displayEls.size() > 0) {
			displayEls.get(0).writeJS(b);
			if (displayEls.size() > 1) {
				for (int i = 1; i < displayEls.size(); i++) {
					b.append(',');
					displayEls.get(i);
				}
			}
		}
		b.append("] };");
	}
}
