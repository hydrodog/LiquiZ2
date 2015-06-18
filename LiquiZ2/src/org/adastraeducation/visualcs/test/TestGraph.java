package org.adastraeducation.visualcs.test;
import java.io.*;
import java.util.Scanner;
import org.adastraeducation.visualcs.graph.*;

public class TestGraph {
	public static void main(String[] a) throws Exception {	
		System.out.println(file.getAbsolutePath());
		System.exit(0);
		Scanner s = new Scanner(new File("../data/graphtests.inp"));
		Graph g = new Graph(s);
		System.out.println(g); // test toString() method
		g.BellmanFord(0, g.getV()-1);
		//g.prim();
		//g.TSP();
		s.close();
	}
}
