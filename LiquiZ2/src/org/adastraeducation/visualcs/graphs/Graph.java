package org.adastraeducation.visualcs.graphs;
import java.util.*;

import org.adastraeducation.visualcs.util.Generate_random_number;

/*   
1.  randomly generate n nodes
2.  generate n*n matrix assign the infinity into it

3.  from each node(start from node:0 ), randomly generate n1 (n-1,max;1,min) nodes to be connected. when determine which 
	 	   to be connected using for loop n1 times to select the index. Assign random weight number into each string
    and update the matrix. iterate all the rest of nodes. but before generate new connection we should check up matrix
    delete the previous connected node from random generation pool in each line(just extract none connected potential node into new
    array), caz we do not wanna to duplicate the line.
	 
4.  combine the blleman ford function to work out the answer. 
function:  an specific array  pick up certain number(node)    
*/

public class Graph {
	private double[] w; //  weights from each vertex to every other, to represent a matrix n*n.
	private int v; // number of vertices, how many
	
	public Graph(int v) {   //random number transfer inside
		
		this.v = v;
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = Double.POSITIVE_INFINITY;
		
		ArrayList<Integer> checkrow=new ArrayList<Integer>();
		
		int m;         
       	
        for (int i = 0; i <v; i++) {    				  //draw the line     both direction have some vlaue
        	
    		for(int j=0; j<v; j++){
    		   if(w[i*v+j]==Double.POSITIVE_INFINITY){
    			   if(i!=j)
    			     checkrow.add(j);   
    		   }
    		 }  
    		
		    if(checkrow.size()!=0){
			  
			   if(checkrow.size()>=2)
				   m=2;        //determine the maximum lines need to be drawn
	    	   else
	    		   m=1;
				   
    		   int connection_num= Generate_random_number.RandomInteger(1,m);      // how many lines need to be connected from certain node
    		  
    		   
    		   while(connection_num!=0){
    		   
    			 int index=Generate_random_number.RandomInteger(0,checkrow.size()-1);
    			   
    			 w[i*v+checkrow.get(index)]= Generate_random_number.RandomDouble(0.1 , 3 , 1);   //set the weight for each line
    			 w[checkrow.get(index)*v+i]=w[i*v+checkrow.get(index)];
    			 
    			 checkrow.remove(index);   
    			   connection_num--;
    		   }
			}
		   checkrow.clear();
        }
		
	}
	public Graph(Scanner s) {
		v = s.nextInt();
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = s.nextDouble();
	}
	
	
/*	
	public static int[] solution(Graph g){
		
		g.printweight(); //for the weight for each edge
		
		System.out.println();

		return g.BellmanFord(4);// from 0.....v-1
		
	}
*/	
	
	
	
	
	/*
	
	public void printweight(){
		for(int i=0;i<v*v;i++){
			System.out.print(w[i]+" ");
			if((i+1)%v==0){
				System.out.println();
			}
			
		}	
		
	}
	*/
	
	public int getV() { return v; }
	
	private int index(int i, int j) { return i * v + j; }  //index in the array, representing in the matrix
	void setCost(int from, int to, double cost) {
		w[index(from,to)] = cost;
	}
	public double getW(int from, int to) {
		return w[index(from,to)];
	}
	public double getw(int i){
		
		return w[i];
	}

	
	
	
	
	
	
	/*  public static void main(String[] a){
		
		File file=new File("case.txt");
		//System.out.println(file.getAbsolutePath());
		try{
		Scanner s=new Scanner(file);
		Graph c=new Graph(s);
		c.printweight();
		
		System.out.println();
		c.BellmanFord(0);// from 0.....v-1
		
		
		
		s.close();   // could I construct a reverse data array  then link to each other
		}
		catch(FileNotFoundException e){
			
			e.printStackTrace();
		}
	}
	
	*/
	
	
	
	
	
	
	
	
	/* public boolean Prim(int[] edges) {
		double[] connected = new double[v];
		int[] edgeTo = new int[v];
		connected[0] = 0; // no cost for first vertex
		for (int i = 0; i < v; i++) {
			connected[i] = Double.POSITIVE_INFINITY;
			edgeTo[i] = -1;
		}
		for (int i = 0; i < v; i++) {
			for (int j = 0; j < v; j++) {
				if (i != j)
					continue;
				if (getCost(i,j) < connected[j]) {
					connected[j] = getCost(i,j);
					edgeTo[j] = i;
				}
			}
		}
		return true;
	}
	private boolean nextPerm(int[] order) {
		
		return true;
	}
	public final double computeCost(int[] order) {
		double tourCost = getCost(order[0], order[1]);
		for (int i = 1; i < v-1; i++) {
			double cost = getCost(order[i], order[i+1]);
			if (Double.isInfinite(cost))
				return Double.POSITIVE_INFINITY;
			tourCost += cost;
		}
		return tourCost;
	}

	public void bruteForceTSP() {
		int[] bestOrder = new int[v];
		int[] order = new int[v];
		for (int i = 0; i < order.length; i++)
			order[i] = i;
		double bestCost = Double.POSITIVE_INFINITY;
		do {
			double cost = computeCost(order);
			if (cost < bestCost) {
				bestCost = cost;
				System.arraycopy(order, 0, bestOrder, 0, order.length);
			}
		} while (nextPerm(order));	
	}
	*/
	
}    