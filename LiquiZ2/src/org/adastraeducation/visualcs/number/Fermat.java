package org.adastraeducation.visualcs.number;
import java.util.*;

public class Fermat {
	private static Random r = new Random(0);
	private static long rand(long a, long b) { return a + Math.abs(r.nextLong() % (b-a+1)); }

	public static long powermod(long a, long n, long m) {
		long prod = 1;
		while (n > 0) {
			if ((n & 1) != 0) {
				prod = prod * a % m;
				//System.out.println(prod + ", n=" + n);
			}
			a = a * a % m;
			n >>= 1;
		}
		return prod;
	}

	public static boolean fermat(long n, int k) {
		for (int i = 0; i < k; i++) {
			long a = rand(2, n - 1);
			if (powermod(a, n - 1, n) != 1)
				return false;
		}
		return true; // probably prime
	}

	public static void main(String[] a) {
		System.out.println(fermat(1001, 3));
		System.out.println(fermat(997, 3));
		System.out.println(fermat(561, 3));
	}
}