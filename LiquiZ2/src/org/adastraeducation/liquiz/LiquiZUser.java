package org.adastraeducation.liquiz;

/**
 * Represent a user's base information (from the parent User) 
 * plus preferences of the user for look and feel
 * @author Dov Kruger
 *
 */
public class LiquiZUser extends User {
	private String preferredStyle; // css style changing look and feel

	public LiquiZUser() {}

	public LiquiZUser(int id, String un, String passwd, String fName, String lName, String email) {
		super(id, un, passwd, fName, lName, email, 0);
	}
	public static final int CREATE = 4; // include edit and delete maybe?
	public static final int EDIT = 8; // only
	public static final int DELETE = 16; // delete only??? it seems unnecessary
	public static final int COPY = 32;
	public static final int GRADE = 64;
	public static final int READ = 128;

	public String getPreferredStyle() {
		return preferredStyle;
	}
	public void setPreferredStyle(String preferredStyle) {
		this.preferredStyle = preferredStyle;
	}
}