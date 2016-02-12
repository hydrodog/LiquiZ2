package org.adastraeducation.liquiz;

public class LineBreak implements Displayable, java.io.Serializable{

	/* This class does not have any instance variables or methods other than
	 * writeHTML, writeJS, and writeXML.  The only reason that this class exists
	 * is that so if x is a QuestionContainer object, you can call 
	 * x.add(new LineBreak()); .  Then if you generate the JS DisplayContext for x,
	 * the generated JS will include a "['Util.br']".
	 */
	
	public LineBreak() {
		//do nothing
	}
	
	public void writeHTML(DisplayContext dc) {
		// TODO Auto-generated method stub
		
	}

	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"Util.br\"]");
	}

	public void writeXML(StringBuilder b) {
		// TODO Auto-generated method stub
		
	}
	

}
