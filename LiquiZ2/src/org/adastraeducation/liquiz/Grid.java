package org.adastraeducation.liquiz;

import org.adastraeducation.liquiz.util.*;
import java.util.*;

public class Grid extends DisplayElement implements java.io.Serializable{
	private ArrayList< ArrayList<Object>> grid;
	
	public Grid(){
		
	}
	
	public Grid(ArrayList< ArrayList <Object> > grid) {
		this.grid = grid;
	}
		
	public String getName() {
		return "?";
	}
	
	@Override
	public void writeHTML(DisplayContext dc) {
	}
	@Override
	public void writeJS(DisplayContext dc) {
//	dc.append("page.grid(").append(grid).append(");\n");  TODO: fix this error
	}
	@Override
	public void writeXML(StringBuilder b) {
		
	}
}
