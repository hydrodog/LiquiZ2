package org.adastraeducation.liquiz;

public class Essay extends Question {
	private String defaultText;
	public Essay() {
		defaultText = "";
	}

	public Essay(int id, int level, int points,
				String defaultText) {
		super(id, level, points);
		this.defaultText = defaultText;
	}

	public String getTagName() {
		return "Essay";
	}

	public void writeHTML(StringBuilder b ){		
		b.append("<textarea name='' class='essay'>");
		//TODO: check that this text is properly escaped for HTML
		b.append(defaultText);
		b.append("</textarea>");
 	}

	public void writeJS(StringBuilder b ) {
		b.append("essay('").append(Quiz.escapeJS(defaultText))
			.append("')");
	}
	public void writeXML(StringBuilder b ) {
		b.append("<essay>").append(Quiz.escapeXML(defaultText))
			.append("</essay>");
	}

	@Override
	public boolean isCorrect(String s) {
		// TODO Auto-generated method stub
		return false;
	}
	
	
}
