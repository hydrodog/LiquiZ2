package org.adastraeducation.visualcs;
import java.io.*;

public class AnswerStore {
	private PrintWriter pw;
	public AnswerStore(String answerFile) throws IOException {
		if (answerFile == null) {
			pw = null;
			return;
		}
		pw = new PrintWriter(new FileWriter(answerFile));
	}
	public void print(Object obj) {
		pw.print(obj);
		System.out.print(obj);
	}
	public void end() {
		pw.close();
	}
}
