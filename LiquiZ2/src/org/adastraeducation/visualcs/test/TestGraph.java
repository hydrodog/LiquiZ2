package org.adastraeducation.visualcs.test;
import java.io.*;
import java.util.Scanner;
import org.adastraeducation.visualcs.graph.*;

public class TestGraph {
	public static void main(String[] a) throws Exception {	
		File file = new File("data/graphtests.inp");
		System.out.println(file.getAbsolutePath());
		Scanner s = new Scanner(file);
		Graph g = new Graph(s);
		System.out.println(g); // test toString() method
		g.BellmanFord(0, g.getV()-1);
		int[] edges = new int[g.getV()];
		g.Prim(edges);
		//g.TSP();
		s.close();
	}
}
