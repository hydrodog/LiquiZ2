package org.adastraeducation.liquiz;

public class Code extends Question {
	private String defaultText;
	public Code() {
		defaultText = "";
	}

	public Code(int id, int level, int points,
				String defaultText) {
		super(id, level, points);
		this.defaultText = defaultText;
	}

	public String getTagName() {
		return "Code";
	}

	public void writeHTML(StringBuilder b ){
		b.append("<select name='selectLang'>\n")
			.append("<option value='c++'>c++</option>\n")
			.append("<option value='Java'>Java</option>\n")
			.append("</select>\n<br/>\n");
		
		b.append("<textarea name='' class='code'>");
		//TODO: check that this text is properly escaped for HTML
		b.append(defaultText);
		b.append("</textarea>");
 	}

	public void writeJS(StringBuilder b ) {
		b.append("code('").append(Quiz.escapeJS(defaultText))
			.append("')");
	}
	public void writeXML(StringBuilder b ) {
		b.append("<code>").append(Quiz.escapeXML(defaultText))
			.append("</code>");
	}

	@Override
	public boolean isCorrect(String s) {
		// TODO Auto-generated method stub
		return false;
	}
}
