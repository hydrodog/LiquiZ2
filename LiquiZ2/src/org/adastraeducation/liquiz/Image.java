package org.adastraeducation.liquiz;

public class Image extends RectangularMedia {
	public Image(){
		super();		
	}
	//TODO: is it alright to leave width and height 0?
//	public Image(String image){
//		super(image);
//	}
	
	public Image(String image, int width, int height){
		super(image, width, height);
	}

	public void writeHTML(DisplayContext dc){
		//TODO should src prepend a directory? where will the images be?
		dc.append("<img src='" + getSource() + "' style = width:"+ getWidth() + "px;height:"+ getHeight() + "px>");
	}

	//TODO: how to represent image in JavaScript
	//TODO: image id should not be hardcoded to 1!!!
	public void writeJS(StringBuilder b){
		b.append("image('" + getSource() + "')");
	}
	
	public void writeXML(StringBuilder b) {
		b.append("<image id='???' name='/>");
	}

}


/* 
 <select id="pic-changer">
  <option value="none">None selected</option>
  <option value="cat" data-picture="cat.png">cat</option>
  <option value="dog" data-picture="dog.jpg">dog</option>
</select>

*/
