package org.adastraeducation.liquiz;

public class Page implements Displayable, java.io.Serializable{
	public String name;
	private Type type;
	private StyleSheet css;
	
	public Page(){
		
	}
	
	
	public Page(Type type, StyleSheet css){
		this.type = type;
		this.css = css;
	}
	
	public Page(String name, Type type, StyleSheet css){
		this.name = name;
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
		return name;
	}

	

}
