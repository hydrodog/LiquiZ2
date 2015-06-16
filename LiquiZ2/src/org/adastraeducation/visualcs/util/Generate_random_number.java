package org.adastraeducation.visualcs.util;

import java.util.Random;

public class Generate_random_number {
	
	private static Random random=new Random();
	
	public static int RandomInteger(int start, int end){
		if(start>end)
			throw new IllegalArgumentException("Start could not exceed End");
		int range=end-start+1;
		
		return start+(int)(range*random.nextDouble());
	}
	
	public static double RandomDouble(double start, double end, int digit){  //accuracy  
		
		double reserveNumber = Math.pow(10, digit);
		if(start>end)
			throw new IllegalArgumentException("Start could not exceed End");
		double range=end-start+1;
		return Math.round((start+range*random.nextDouble())*  (int)reserveNumber  )/ reserveNumber;
		
	}
}
