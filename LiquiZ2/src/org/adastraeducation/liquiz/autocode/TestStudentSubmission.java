package org.adastraeducation.liquiz.autocode;

import java.util.ArrayList;

/**
 * Represent a single homework, with multiple student submissions
 * @author dkruger
 *
 */
public class TestStudentSubmission {
	private String name;
	private ArrayList<Submission> submissions;
	public TestStudentSubmission(String name) {
		this.name = name;
	}
	public void submit(String id, String name, String fileName, String text) {
		
	}
}
