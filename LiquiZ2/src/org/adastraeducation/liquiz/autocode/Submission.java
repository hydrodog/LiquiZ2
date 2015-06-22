package org.adastraeducation.liquiz.autocode;

import java.util.HashMap;

public class Submission {
	private String id;
	private HashMap<String, String> files;
	
	public Submission() {
		files = new HashMap<String, String>();
	}
	public void add(String filename, String text) {
		files.put(filename, text);
	}

	/**
	 * Compute the computation required to turn this code into another code
	 * The returned number is the similarity index.
	 * The lower the number, the more similar the two files
	 * @param otherText
	 * @return
	 */
	public static int LCS(String x, String y) {
		final int M = x.length();
		final int N = y.length();

		// opt[i][j] = length of LCS of x[i..M] and y[j..N]
		int[][] opt = new int[M+1][N+1];
		
		// compute length of LCS and all subproblems via dynamic programming
		for (int i = M-1; i >= 0; i--) {
			for (int j = N-1; j >= 0; j--) {
				if (x.charAt(i) == y.charAt(j))
					opt[i][j] = opt[i+1][j+1] + 1;
				else 
					opt[i][j] = Math.max(opt[i+1][j], opt[i][j+1]);
			}
		}

		// recover LCS itself and print it to standard output
		int i = 0, j = 0;
		while(i < M && j < N) {
			if (x.charAt(i) == y.charAt(j)) {
				System.out.print(x.charAt(i));
				i++;
				j++;
			}
			else if (opt[i+1][j] >= opt[i][j+1]) i++;
			else                                 j++;
		}
		System.out.println();
		return 0;
	}
	public static void main(String[] a) {
		String x = "Hello there";
		String y = "bellow therefore";
		LCS(x,y);
	}
}
