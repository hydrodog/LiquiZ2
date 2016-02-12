package org.adastraeducation.liquiz;

import java.util.ArrayList;

import org.adastraeducation.liquiz.util.Util;

public class FileUpload extends Question implements java.io.Serializable{

	private String label;

	public FileUpload() {
		label = "Submit";
	}
//qc.add(new FileUpload(qid++,10,100,".java"));
	public FileUpload(int id, int level, int points,String label) {
		super(id, level, points, (ArrayList<Answer>) null);
		this.label = label;
	}
	

	/*******************Added getter and setter for serialization*************************/
	public String getLabel(){
		return label;
	}
	
	public void setLabel(String label) {
		this.label = label;
	}
	
	public String getTagName() {
		return "Button";
	}

	public void writeHTML(DisplayContext dc ){	
		dc.append("<input type=\"file\" id=\"upload\" name=\"").append(getId()).append("\" style=\"visibility: hidden; width: 1px; height: 1px\" multiple />");
		dc.append("<button name='' class='button' onClick=document.getElementById('upload').click(); return false;>");
		//TODO: check that this text is properly escaped for HTML
		dc.append(label);
		dc.append("</button>");
 	}
	
	public void writeJS(DisplayContext dc) {
		dc.append(",\n\t\t\t[\"file\", \"Upload File\",").appendQuotedJS(label).append(", \"file-input\", ").append(getId()).append("]");	
	}
	public void writeXML(StringBuilder b ) {
		b.append("<fileUpload/>");
	}

	public boolean isAutomaticGrading() {
		return true;
	}
	
	@Override
	public double grade(String[] s) {
		return 0;
	}
}
