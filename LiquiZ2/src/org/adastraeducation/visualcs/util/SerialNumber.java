package org.adastraeducation.visualcs.util;

public class SerialNumber {
	
	private static int i=0;
	
	public static int serialno() {
		return i;
	}

	public  static int increment(){
		return	++i;
	}
	
	

}
