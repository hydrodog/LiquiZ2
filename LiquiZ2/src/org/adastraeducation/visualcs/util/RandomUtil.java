package org.adastraeducation.visualcs.util;

import java.util.ArrayList;
import java.util.Random;

public class RandomUtil {
	
	private static Random random=new Random();
	
	public static int integerRange(int start, int end){
		if(start>end)
			throw new IllegalArgumentException("Start could not exceed End");
		int range=end-start+1;
		
		return start+(int)(range*random.nextDouble());
	}

	public static ArrayList<Integer> generateRandomSet(int start, int end, int v) {  // avoid to set weight for vertex itself
		ArrayList<Integer> list = new ArrayList<Integer>(end - start + 1);
		for (int i = start; i <= end; i++){
			if(i % v != i / v)  list.add(i);			
		}
		return list;
	}
	public static int removeRandomFromSet(ArrayList<Integer> set) {
		int i = random.nextInt(set.size());
		int val = set.get(i);
		set.set(i, set.get(set.size()-1));
		set.remove(set.size()-1);
		return val;
	}
	public static double RandomDouble(double start, double end, int digit){  //accuracy  		
		double reserveNumber = Math.pow(10, digit);
		if(start>end)
			throw new IllegalArgumentException("Start could not exceed End");
		double range=end-start+1;
		return Math.round((start+range*random.nextDouble())*  (int)reserveNumber  )/ reserveNumber;
		
	}
}
