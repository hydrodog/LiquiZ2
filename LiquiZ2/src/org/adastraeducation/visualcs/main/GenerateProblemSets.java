package org.adastraeducation.visualcs.main;

import org.adastraeducation.visualcs.DrawOnPGraphics;
import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.graph.Graph;
import org.adastraeducation.visualcs.graph.PGraphicsGraphDisplayer;

import processing.pdf.PGraphicsPDF;
import processing.core.PApplet;
import processing.core.PGraphics;
import processing.core.PImage;

import java.io.*;

public class GenerateProblemSets {
	private static int w1, h1, w2, h2;
	private static String dir = "output/visualcs/";
	public static void generateBellmanFord(int n) throws IOException {
		final String problem = "BellmanFord";
		Graph graph = new Graph(7, 10, 0.1, 3.0, 1);
		String answerFile = dir + problem + n + ".txt";
		PGraphicsGraphDisplayer graphDisp = 
			new PGraphicsGraphDisplayer(null, null, answerFile, graph);
		writeProblem(graphDisp, problem, n, false);
		Visualize.storeAnswer = true;
		graph.BellmanFord(0, 6);
		writeProblem(graphDisp, problem + "_sol", n, true);
	}
	private static class BogusPApplet extends PApplet {
		public void setup() {
			size(600,600);
		}
		public void draw(){}
	}
	private static BogusPApplet bogus = new BogusPApplet();
	private static PGraphics makePGraphics(int w, int h) {
		bogus.init();
		PGraphics g = bogus.createGraphics(w,h);
		g.setPrimary(true);
		g.setSize(w,h);
		return g;
	}
	public static void writeProblem(DrawOnPGraphics d, String problem, int n,
			boolean writeTextAnswer) {
		PGraphics g = makePGraphics(w1,h1);
		d.setPGraphics(g);
		d.draw(); // draw on image
		Visualize.storeAnswer = false;
		g.save(dir + problem + n + ".png");
		g = makePGraphics(w2,h2); // create the small image
		d.setPGraphics(g);
		d.draw(); // draw on image
		g.save(dir + problem + "small" + n + ".png");		
	}

	public static void main(String[] args) throws IOException {
		w1 = h1 = 2000;
		w2 = h2 = 1000;
		for (int i = 0; i < 10; i++)
			generateBellmanFord(i);
	}
}
