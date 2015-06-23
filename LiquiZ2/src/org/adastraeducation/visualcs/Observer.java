package org.adastraeducation.visualcs;
/**
 * All visualizing components implement observer, which can receive
 * messages about displaying aspects of questions and answers
 * 
 * @author dkruger
 *
 */
public interface Observer {
	public void display();   	// Visually display the algorithm in current state
}
