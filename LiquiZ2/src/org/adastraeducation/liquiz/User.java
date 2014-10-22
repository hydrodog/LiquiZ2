package org.adastraeducation.liquiz;

public class User {
	// superuser uses bit 1, ADMIN has the right to change
	// permissions on anything
	public static final int ADMIN = 1;
	
	// if this user has the right to delegate privileges
	// that is, any privilege user has can be given to another
	public static final int DELEGATE = 2;
	
	//TODO: Do we need CREATEUSER privilege?
	
	private String id; // unique User for this system
	private String passwd;
	private int role; // lookup into Role table?
	private int permissions;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	/**
	 * Each bit of permissions represents the ability to do something
	 * @return permissions bits
	 */
	public int getPermissions() {
		return permissions;
	}
	public void setPermissions(int permissions) {
		this.permissions = permissions;
	}
	/**
	 * Returns true if this user is permitted to do ALL
	 * of the actions specified by the permissions bits
	 * @param permissions
	 * @return true if the user is permitted all the actions
	 */
	public boolean allAllowed(int requestedPerm) {
		return (permissions & requestedPerm) == requestedPerm;		
	}
	/**
	 * Returns true if any of the requested	permissions are
	 * allowed
	 * @param requestedPerm
	 * @return
	 */
	public boolean anyAllowed(int requestedPerm) {
		return (permissions & requestedPerm) != 0;		
	}
	public boolean isLoggedIn() {
		if (id == null || passwd == null)
			return false;
		return id.equals("test") && passwd.equals("test");
	}
	public static void main(String[]a) {
		System.out.println("test");
	}
}
