package org.adastraeducation.liquiz;

import java.util.HashMap;

/**
 * Base class for all media with filenames (audio, video, image)
 * @author yijinkang
 *
 */
public abstract class Media extends DisplayElement {
	private String source;
	private String type;
	protected static HashMap<String, String> suffixToMime; 
	
	static {
		suffixToMime = new HashMap<String, String>();
		suffixToMime.put("ogg", "ogg");
		suffixToMime.put("mp3", "mpeg");
		suffixToMime.put("mp4", "mp4");

	}
	
	public Media() {
		source = null;
		type = null;
	}
	
	public Media(String source) {
		this.source = source;
		type = suffixToMime.get(source.substring(source.lastIndexOf('.')));
	}
	
	public final String getSource() {
		return source;
	}
	
	public final void setSource(String source) {
		this.source = source;
		type = suffixToMime.get(source.substring(source.lastIndexOf('.')));
	}
	
	public final String getName() {
		return source;
	}
	
	public final String getType() {
		return type;
	}
	
	public final void setName(String source){
		this.source = source;
	}
}
