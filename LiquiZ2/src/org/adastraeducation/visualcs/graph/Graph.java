package org.adastraeducation.visualcs.graph;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.util.*;

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.*;

/*  
 * @author: Shawn Xie 
 * Represent a graph using matrix of weights
 */
public class Graph {
	GraphObserver go;
	private double[] w; // weights from each vertex to every other, to represent a matrix n*n.
	private int v; 		// number of vertices, how many
	
	/**
	 * Create a graph with v vertices, initially all disconnected
	 * @param v
	 */
	public Graph(int v) {	
		this.v = v;
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = Double.POSITIVE_INFINITY;
		go = null;
	}

	/**
	 * Create a graph and read in from a Scanner.
	 * The first input is an integer number of vertices
	 * The next v*v numbers are the weights which are double precision
	 * @param s
	 */
	public Graph(Scanner s) {
		v = s.nextInt();
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = s.nextDouble();
		go = null;
	}

	/**
	 * Create a graph with v vertices and
	 * r random weights on random edges
	 *
	 *	@param v
	 */
	public Graph(int v, int r, double minWeight, double maxWeight, int precision) {
		this(v);
		// allConnect contains every possible edge
		// expressed as from->to where from < to
		ArrayList<Integer> chooseVertices = RandomUtil.generateRandomSet(0, (v - 1) * v / 2 - 1, v);
		for (int i = 0; i < r; i++) {
			// select a random edge
			int fromto = RandomUtil.removeRandomFromSet(chooseVertices);
			int from = fromto / v;
			int to = fromto % v;
    		// set the weight according to our parameters
			setW(from, to, RandomUtil.RandomDouble(minWeight, maxWeight, precision));
        }		
	}
	public void addGraphObserver(GraphObserver go) {
		this.go = go;
		go.display();
	}
	private static DecimalFormat df = new DecimalFormat("##.#");
	public String toString() {
		StringBuilder b = new StringBuilder(v*v*5);
		for (int i = 0, c = 0; i < v; i++){
			for (int j = 0; j < v; j++, c++){
				b.append(df.format(w[c])).append(' ');
			}
			b.append('\n');
		}
		return b.toString();
	}
	
	public int getV() { return v; }
	
	// return the position of the weight from vertex i to j
	private int getIndex(int i, int j) { return i * v + j; }  //index in the array, representing in the matrix

	void setW(int from, int to, double cost) {
		w[getIndex(from,to)] = cost;
	}
	// return the weight between vertex from and to
	public double getW(int from, int to) {
		return w[getIndex(from,to)];
	}
	// return the ith weight in sequence
	public double getw(int i){
		return w[i];
	}

	public void BellmanFord(int vStart, int vEnd) {
		double[] cost = new double[v];	//track cost to get to vertex v from vertex "from"
		int[] pred=new int[v];			// track how to get to each vertex from the preceding one

		// in the beginning..
		for (int i = 0; i < cost.length; i++) {
			cost[i] = Double.POSITIVE_INFINITY; // can't get anywhere
			pred[i] = -1;						// came from nowhere
		}
		cost[vStart] = 0;	// costs nothing to get here, we start here.

		// for v vertices, do v-1 passes
		for (int passes = 0; passes < v-1; passes++){
			// start with vStart, going v times to visit every vertex
			// note, it would be much simpler to visit: j = 0; j < v; j++
			// but this would not animate as well as starting with the start vertex.
			boolean changed = false; // so far, no better path found
			for (int count = 1, j = vStart; count <= v; count++, j = j == v ? 0 : j+1) {
				if (Visualize.visualize){ 
					go.setVertexStyle(j, 1);
				} 
				for (int k = 0; k < v; k++){
					if (j != k){
						if (Visualize.visualize){
							go.setVertexStyle(k, 1);
						}
						// if the cost through new vertex is lower
						if (cost[j] + getW(j,k) < cost[k]) {
							cost[k] = cost[j] + getW(j,k);	// compute new cost
							int prevPred = pred[k];				// save predecessor for graphics only
							pred[k] = j;						// store new predecessor
							changed = true;						// found better path, keep going
							if (Visualize.visualize){
								go.setEdgeStyle(prevPred, k, 0);	// erase previous highlighted edge
								go.setEdgeStyle(j, k, 1);			// highlight new best path (so far)
							}
						}
						if (Visualize.visualize) {
							go.setVertexStyle(k, 0);	// turn off the vertex just considered
						}
					}
					if(Visualize.visualize){
						go.setVertexStyle(j, 0);	// turn off the from vertex, get ready to consider the next
					}
				}
				if (Visualize.storeAnswer){
					for (int i = 0; i < v; i++)
						go.print(String.format("%4.1f ", cost[i]));
					go.print('\n');
					for (int i = 0; i < v; i++)
						go.print(pred[i] + " ");
					go.print("\n\n");
				}
				if (!changed)
					break; // no new paths found, so any further iterations will do nothing
			}
			for (int j = 0; j < v; j++) {
				for (int k = 0; k < v; k++) {
					if (cost[j] + getW(j,k) < cost[k]) {
						System.out.println("Graph contains a negative-weight cycle");
						return;	
					}
				}
			}
			Visualize.terminate = true;
		}
	}
	public boolean Prim(int[] edges) {
		double[] connected = new double[v];
		int[] edgeTo = new int[v];
		for (int i = 0; i < v; i++) {
			connected[i] = Double.POSITIVE_INFINITY;
			edgeTo[i] = -1;
		}
		connected[0] = 0; // no cost for first vertex
		edgeTo[0] = 0;
		for (int i = 0; i < v; i++) {
			double minCost = Double.POSITIVE_INFINITY;
			int minCostVertex = -1;
			for (int j = 0; j < v; j++) {
				if (i == j)
					continue;
				if (Double.isInfinite(connected[j]) && getW(i,j) < minCost) {
					minCost = getW(i,j);
					minCostVertex = j;
					if (Visualize.visualize) {
						go.setEdgeStyle(i, j, 1);
						go.setEdgeStyle(i, j-1, 0);
					}
				}
			}
			if (minCostVertex >= 0) {
				connected[minCostVertex] = minCost;
				if (Visualize.visualize)
					go.setEdgeStyle(i,minCostVertex, 2);
			}
		}
		return true;
	}
	
	private boolean nextPerm(int[] order) {
		return true;
	}
	public final double computeCost(int[] order) {
		double tourCost = getW(order[0], order[1]);
		for (int i = 1; i < v-1; i++) {
			double cost = getW(order[i], order[i+1]);
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
}    