package xml;

import java.io.*;
import java.util.*;
import java.util.zip.*;

public class ReadZip {

	public static void main(String[] args) throws IOException {
	    ZipFile zipFile = null;
	    try {
	    	zipFile = new ZipFile(args[0]);
	    	Enumeration<? extends ZipEntry> entries = zipFile.entries();

	    	while(entries.hasMoreElements()){
	    		ZipEntry entry = entries.nextElement();
	    		System.out.println(entry.getName());
//	        InputStream stream = zipFile.getInputStream(entry);
	    	}
	    } catch (Exception e) {
	    	e.printStackTrace(); 
	    } finally {
	    	if (zipFile != null)
	    		zipFile.close();
	    }
	}
}
