package org.adastraeducation.visualcs;

import java.io.IOException;
import processing.core.*;

/*
 * Given a problem inheriting from AnswerStore, create the problem
 * write out the file of answers, and close it.
 */
public abstract class ProblemSet {
	protected static final String dir = "output/visualcs/";
	protected AnswerStore answerStore;
	protected DrawOnPGraphics d;
	protected String problem;
	protected String answerFile;
	protected int n;
	protected int w1, h1, w2, h2;
	private static int defaultW1 = 2000, defaultH1 = 2000;
	private static int defaultW2 = 1000, defaultH2 = 1000;
	public ProblemSet(String problem, int n,
			int w1, int h1, int w2, int h2) {
		this.w1 = w1; this.h1 = h1;
		this.w2 = w2; this.h2 = h2;
		try {
			this.problem = problem;
			this.n = n;
			answerFile = dir + problem + n + ".txt";
			construct();	// create the problem
			answerStore = d.getAnswerStore();
			drawProblem();	// draw graphical rep before solution
			algorithm();	// compute solution
			drawProblem();	// draw again after solution
			answerStore.end();		// close the answer file
		} catch (IOException e) {
			System.out.println("Problem: " + problem + " answerFile: " + answerFile + " exception:" + e);
		}
	}
	public ProblemSet(String problem, int n) {
		this(problem, n, defaultW1, defaultH1, defaultW2, defaultH2);
	}
	private static class BogusPApplet extends PApplet {
		public void setup() {
			size(600,600);
		}
		public void draw(){}
	}
	
	//private static BogusPApplet bogus = new BogusPApplet();
	private static PGraphics makePGraphics(int w, int h) {
		//bogus.init();
		//PGraphics g = bogus.createGraphics(w,h);
		PGraphics g = new Layer(500,500, null, "test");
		g.setPrimary(true);
		g.setSize(w,h);
		return g;
	}

	public final void drawProblem() {
		PGraphics g = makePGraphics(w1,h1);
		d.setPGraphics(g);
		d.draw(); // draw on image
		g.save(dir + problem + n + ".png");
		g = makePGraphics(w2,h2); // create the small image
		d.setPGraphics(g);
		d.draw(); // draw on image
		g.save(dir + problem + "small" + n + ".png");		
	}
	public abstract void construct() throws IOException;
	public abstract void algorithm();

	private static class Layer extends PGraphicsJava2D {
	  public Layer(int w, int h, PApplet p, String s) {
	    initialize(w, h, p, s);
	    ignite();
	  }
	 
	  public void initialize(int w, int h, PApplet p, String s) {
	    setParent(p);
	    setPrimary(false);
	    setPath(s);
	    setSize(w, h);
	  }
	 
	  public void ignite() {
	    beginDraw();
	    smooth(4);
	    fill(-1);
	    stroke(0);
	    endDraw();
	  }
	 
	  @ Override public String toString() {
	    return "Width: " + width + "\t Height: " + height
	      + "\nPath:  " + path;
	  }
	}
}