import java.util.*;
public class Graph {
	private double[] w; // weights from each vertex to every other
	private int v; // number of vertices
	public Graph(int v) {
		this.v = v;
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = Double.POSITIVE_INFINITY;
	}
	public Graph(Scanner s) {
		v = s.nextInt();
		w = new double[v*v];
		for (int i = 0; i < v*v; i++)
			w[i] = s.nextDouble();
	}
	public int getV() { return v; }
	private int index(int i, int j) { return i * v + j; }
	void setCost(int from, int to, double cost) {
		w[index(from,to)] = cost;
	}
	double getCost(int from, int to) {
		return w[index(from,to)];
	}

	public void BellmanFord(int vStart, int[] pred) {
		double[] cost = new double[v];
		for (int i = 0; i < cost.length; i++) {
			cost[i] = Double.POSITIVE_INFINITY;
			pred[i] = -1;
		}
		cost[vStart] = 0;
		for (int i = 0; i < v; i++)
			for (int j = 0; j < v; j++)
				for (int k = 0; k < v; k++)
					if (cost[j] + getCost(j,k) < cost[k]) {
						cost[k] = cost[j] + getCost(j,k);
					}

	}

	public boolean Prim(int[] edges) {
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
}    