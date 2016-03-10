package org.adastraeducation.liquiz;

import org.mongodb.morphia.annotations.Entity;

@Entity("quizzes")
public class Page extends BaseEntity implements Displayable, java.io.Serializable{
	protected String pageName;
	protected String type;
	protected String css;
	
	public Page(){
		
	}
	
	
	public Page(String type, String css){
		this.type = type;
		this.css = css;
	}
	
	public Page(String name, String type, String css){
		this.pageName = name;
		this.type = type;
		this.css = css;
	}
	
	@Override
	public void writeHTML(DisplayContext dc) {
		// TODO 
		
	}
	
	@Override
	public void writeXML(StringBuilder b) {
		// TODO 
		
	}
	

	@Override
	public void writeJS(DisplayContext dc) {
				dc.append
				("{\n\t\t").appendQuotedJS("type").append(": ").appendQuotedJS(type.toString()).append(",\n\t\t").
						appendQuotedJS("css").append(": ").appendQuotedJS(css.toString()).append(",\n\t\t");
	}
	
	
	public String toString(){
		return pageName;
	}


	public String getPageName() {
		return pageName;
	}


	public void setPageName(String pageName) {
		this.pageName = pageName;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getCss() {
		return css;
	}


	public void setCss(String css) {
		this.css = css;
	}

	

}
