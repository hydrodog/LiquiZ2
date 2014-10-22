package org.adastraeducation.liquiz;
import java.util.ArrayList;
import java.util.Arrays;

public class Response implements Displayable {
	private ArrayList<Displayable> displayables;

	public Response() {
		displayables = new ArrayList<Displayable>();
	}
	public Response(Displayable[] list) {
		displayables = new ArrayList<Displayable>(Arrays.asList(list));
	}

	public ArrayList<Displayable> getDisplayables() {
		return this.displayables;
	}

	public void add(Displayable d){
		displayables.add(d);
	}

	public void delete(Displayable d){
		displayables.remove(d);
	}

	public void writeHTML (StringBuilder b) {
		b.append("<div class='response'>\n");
		for (Displayable d : displayables) {
			d.writeHTML(b);
		}
		b.append("</div>\n");
	}

	public void writeXML (StringBuilder b) {
		b.append("<R>");
		for (Displayable d : displayables) {
			d.writeXML(b);
		}
		b.append("</R>");
	}

	public void writeJS (StringBuilder b) {
		b.append("{title: 'Response', content:[");
		if (displayables.size() > 0) {
			displayables.get(0).writeJS(b);
			if (displayables.size() > 1) {
				for (int i = 1; i < displayables.size(); i++) {
					b.append(',');
					displayables.get(i);
				}
			}
		}
		b.append("] };");
	}
}
