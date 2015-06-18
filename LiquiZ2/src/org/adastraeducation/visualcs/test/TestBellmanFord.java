package org.adastraeducation.visualcs.test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.graph.PAppletGraphDisplayer;
import org.adastraeducation.visualcs.util.SerialNumber;

public class TestBellmanFord {
	public static void main(String[] a) throws Exception {
			PrintStream out = new PrintStream(
				new FileOutputStream(PAppletGraphDisplayer.dir + "Bellmanford_textsoulution_" +
					SerialNumber.serialno() + ".txt"));
				for (int i = 0; i < cost.length; i++) {     //start here
					System.out.println(i+" "+cost[i]+" "+pred[i]);					
/*					if(pred[i]==-1)
						 out.println((i+1)+" "+Math.round(cost[i]*10)/10.0+" "+(pred[i]));
					else
						 out.println((i+1)+" "+Math.round(cost[i]*10)/10.0+" "+(pred[i]+1));
						 */
				}
			out.close();
/*
			int j=0;
			for(int i=0;i<2*(cost.length)-2;i+=2){
				if(j==vStart)
					j+=1;	
				 solutionway[i]=pred[j];
				 solutionway[i+1]=j; 
				 j++;	 
			}
			solutionway[2*v-2]=vStart;
			System.out.println();
			for(int i=0;i<2*(cost.length)-2;i++){
				System.out.print(solutionway[i]+" ");	
			}			
*/
	}
}
