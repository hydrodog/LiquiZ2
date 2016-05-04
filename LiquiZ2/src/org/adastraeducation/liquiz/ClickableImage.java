package org.adastraeducation.liquiz;

public class ClickableImage extends RectangularMedia implements java.io.Serializable{
	private int id;
	
	public ClickableImage(){
		super();		
	}
	
	public ClickableImage(String image, int width, int height){
		super(image, width, height);
	}
	
	public ClickableImage(String image){
		super(image);
	}

	public void writeHTML(DisplayContext dc){
		//TODO should src prepend a directory? where will the images be?
		dc.append("<img src='" + getSource() + "' style = width:"+ getWidth() + "px;height:"+ getHeight() + "px>");
	}

	public void writeJS(DisplayContext dc){
		dc.append(",\n\t\t\t[\"Util.img\", ").appendQuotedJS(getSource()).append("]");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<image id='???' name='/>");
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
}


/* 
 <select id="pic-changer">
  <option value="none">None selected</option>
  <option value="cat" data-picture="cat.png">cat</option>
  <option value="dog" data-picture="dog.jpg">dog</option>
</select>

*/
