package org.adastraeducation.visualcs.graphs;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.Generate_random_number;
import org.adastraeducation.visualcs.util.Serial_number;

public class BellmanFord implements Getpath   {
	private GraphDisplayer a;
	
	public BellmanFord(GraphDisplayer a){this.a=a;}
	
	
	public void getpath(Graph g) {
		
		
		int vStart=Generate_random_number.RandomInteger(0,g.getV()-1);
		int v=g.getV();
		
		double[] cost = new double[v];                  //in order to walk around the map, you need 
        												//number of v vertices  it is kind of wage array  
		int[] pred=new int[v];							// record the previous node value that sent to it,predecessor
														//	int[] solutionway=new int[2*v-2+1];
														//the last one store the vStart
		
		int[] comp_pred=new int[v];                   //try to improve, if this algorithm never relax, just break;
		
		
		int[] solutionway=new int[2*v-2+1];
		
		int count=1;  //count for j
		
		
		for (int i = 0; i < cost.length; i++) {
			cost[i] = Double.POSITIVE_INFINITY;
			pred[i] = -1;
		}
		cost[vStart] = 0;
		
		for (int i = 0; i < v-1; i++){   
										 
										 
			
			for (int j = vStart; count<=v; count++){			//1 need to start from Vstart
				if(Visualize.visualize){ 
					a.setHighlightVertex(j, 1);
					a.display();
				} 
				for (int k = 0; k < v; k++){
					if(j!=k){
						if(Visualize.visualize){
							a.setHighlightVertex2(k, 1);
							a.display();
						}
					}
					
					if (cost[j] + g.getW(j,k) < cost[k]) {
						if(Visualize.visualize){
							if(cost[k] != Double.POSITIVE_INFINITY){
								int erease= pred[k];						// need to erase the previous one after the highlight
								a.setHighlightEdge(erease, k, 0);
							}
						}
							
						cost[k] = cost[j] + g.getW(j,k) ;
						pred[k]=j;
						
						if(Visualize.visualize){
							a.setHighlightEdge(j, k, 1);
							a.display();
						}
						
					}
					
					if(Visualize.visualize){
						if(j!=k&&a.getHighlightVertex2(k)!=0)
							a.setHighlightVertex2(k, 0);
					}
					
				}
				if(Visualize.visualize){
					a.setHighlightVertex(j, 0);
				}
				
				if(j==v-1)
					j=0;
				else 
					j++;
				
			}
			
			if(i>0){													
				int z;
				for(z=0;z<v;z++){
					if(comp_pred[z]!=pred[z])							//if not match traverse again
						break;
				}
				if(z==v)
					break;												//if this algorithm never relax, just break;
				
			}
			
			for(int z=0;z<v;z++)
				comp_pred[z]=pred[z];
			
			
			count=1;
			System.out.println("*******************************************************************");
			
		}
	/*	
		for(int i=0;i<v*v;i++){
			System.out.print(g.getw(i)+" ");
			if((i+1)%v==0){
				System.out.println();
			}
			
		}
	*/	
		for(int j=0;j<v;j++){
			for(int k=0;k<v;k++){
				if(cost[j]+g.getW(j,k)<cost[k]){
					System.out.println("Graph contains a negative-weight cycle");
					return;	
				}	
			}
		}
		
		System.out.println(vStart);	
	/*	
		for(int i=0;i<v*v;i++){
			System.out.print(g.getw(i)+" ");
			if((i+1)%v==0){
				System.out.println();
			}
			
		}
	*/	
		/**/
	
		try{
		PrintStream out = new PrintStream(new FileOutputStream(PAppletGraphDisplayer.dir+"Bellmanford_textsoulution_"+Serial_number.serialno()+".txt"));
		 
			for (int i = 0; i < cost.length; i++) {     //start here
				System.out.println(i+" "+cost[i]+" "+pred[i]);
				
				if(pred[i]==-1)
					 out.println((i+1)+" "+Math.round(cost[i]*10)/10.0+" "+(pred[i]));
				else
					 out.println((i+1)+" "+Math.round(cost[i]*10)/10.0+" "+(pred[i]+1));
			}
		    out.close();
		}catch (FileNotFoundException e) {
		      e.printStackTrace();
		}    
		
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
		
		Visualize.terminate=true;
		
		
		
	
	}
	
	public static void main(String[] args){
		int n= Generate_random_number.RandomInteger(5,8);
		Graph graph=new Graph(n);
		
		BellmanFord bf=new BellmanFord(new TextgraphDisplayer(graph));
		
		bf.getpath(graph);
		
	}
/*
	public int[] BellmanFord(int vStart) {
		double[] cost = new double[v];                  //in order to walk around the map, you need 
		                                                //number of v vertices  it is kind of wage array  
		int[] pred=new int[v];							// record the previous node value that sent to it,predecessor
	//	int[] solutionway=new int[2*v-2+1];             //the last one store the vStart
		
		
		for (int i = 0; i < cost.length; i++) {
			cost[i] = Double.POSITIVE_INFINITY;
			pred[i] = -1;
		}
		cost[vStart] = 0;
		
		
		
		for (int i = 0; i < v-1; i++)
			for (int j = 0; j < v; j++)
				for (int k = 0; k < v; k++)
					if (cost[j] + getCost(j,k) < cost[k]) {
						cost[k] = cost[j] + getCost(j,k) ;
						pred[k]=j;
					}
		
	
		for(int j=0;j<v;j++)
			for(int k=0;k<v;k++){
				if(cost[j]+getCost(j,k)<cost[k]){
					System.out.println("Graph contains a negative-weight cycle");
					return null;	
				}	
			}
		
		
		
		
		for (int i = 0; i < cost.length; i++) {     //start here  just for test
			System.out.println(i+" "+cost[i]+" "+pred[i]);
			
		}
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
		
		return solutionway;
		
	}
	
	*/
	

}
