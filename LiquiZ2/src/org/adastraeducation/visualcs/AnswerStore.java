package org.adastraeducation.visualcs;
import java.io.*;
/**
 * Store the answers to a problem in a text file.
 * The format is up to the individual problem
 * print methods are provided
 * @author dkruger
 *
 */
public abstract class AnswerStore extends Data {
	private PrintWriter pw;
	public AnswerStore(String answerFile) {
		if (answerFile == null) {
			pw = null;
			return;
		}
		try {
			pw = new PrintWriter(new FileWriter(answerFile));
		} catch(IOException e) {
			System.out.println("Failed to open " + answerFile + " exception: " + e);
		}
		System.out.println("opening " + answerFile);
	}
	public void print(Object obj) {
		pw.print(obj);
	}
	public void print(double v) {
		pw.print(String.format("%4.1f ", v));
	}
	public void print(int v) {
		pw.print(v + " ");
	}
	public void print(char c) {
		pw.print(c); 
	}
	public void end() {
		pw.close();
	}
}
