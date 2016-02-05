package org.adastraeducation.liquiz;
/**
 * Represent a user with permission to access some or all pages.
 * The ADMIN priviledge is equivalent to root in Linux, able to change permissions
 * The DELEGATE priviledge enables giving others any priviledge the user has
 * All other priviledges are not built in but user-defined per application
 * @author Dov Kruger
 *
 */
public class User {
	// superuser uses bit 1, ADMIN has the right to change
	// permissions on anything
	public static final int ADMIN = 1;
	
	// if this user has the right to delegate privileges
	// that is, any privilege user has can be given to another
	public static final int DELEGATE = 2;
	
	//TODO: Do we need CREATEUSER privilege?
	
	private int id;
	private String username; // unique User for this system
	private String passwd;
	private String fName;
	private String lName;
	private String email;
	private int role; // lookup into Role table?
	private int permissions;
	
	public User() {
		
	}
	
	public User(int id, String name ) {
		this.id = id;
		username = name;
	}
	
	public User(String username, String passwd, String fName, String lName, String email, int permissions) {
	}
		
	public User(int id, String username, String passwd, String fName, String lName, String email, int permissions) {
		this.id = id;
		this.username = username;
		this.passwd = passwd;
		this.fName = fName;
		this.lName = lName;
		this.email = email;
		this.permissions = permissions;
	}
	
	public int getID() {
		return id;
	}
	
	public void setID(int id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public String getFirstName() {
		return fName;
	}
	public void setFirstName(String firstName) {
		fName = firstName;
	}
	public String getLastName() {
		return lName;
	}
	public void setLastName(String lastName) {
		lName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
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
		if (username == null || passwd == null)
			return false;
		return username.equals("test") && passwd.equals("test");
	}
	
	public String toString(){
		return "username: " + username;
	}
}
