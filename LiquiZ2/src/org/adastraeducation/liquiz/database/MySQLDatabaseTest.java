package org.adastraeducation.liquiz.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.adastraeducation.liquiz.MatrixQuestion;


public class MySQLDatabaseTest {
			private static final String DB_DRIVER = "com.mysql.jdbc.Driver";
			private static final String DB_CONNECTION = "jdbc:mysql://localhost:3306/liquiz";
			/** username and password for */
			private static final String DB_USER = "root";
			private static final String DB_PASSWORD = "000000";
			

	public static void main(String[] args) {
		
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			
			
		} catch (Exception e) {

			System.out.println("Fail loading Driver!");
			e.printStackTrace();

		}
		
		
		try{
//						 1. Get a connection to database
						Connection myConn = DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
						

						long t1 = System.currentTimeMillis();
						test1(myConn, (int)1e5);
						long t2 = System.currentTimeMillis(); 
						System.out.println("saving time for 100k objects");  // about 16.916s
						System.out.println((t2-t1)/1e3);
//						 2. Create a statement
							Statement myStmt = myConn.createStatement();
//						 3. Excute SQL query
							ResultSet myRs = myStmt.executeQuery("select * from questions");
//						 4. Process the result set
						 	//writeResultSet(myRs);
						close(myRs, myStmt, myConn);
						
						
		}catch(SQLException e){
			System.out.println("Connection URL or username or password errors!");
			e.printStackTrace();
		}
		
	}
	
	public static void test1(Connection c, int n) throws SQLException {
		PreparedStatement p = c.prepareStatement("insert into liquiz.questions values(default, ?, ?, ?)");

		for (int i = 0; i < n; i++) {
			MatrixQuestion q = new MatrixQuestion(1,1,100,3, 8,10);
//			p.setInt(1, q.getQcid());
			p.setInt(1, q.getId());
			p.setInt(2, q.getRows());
			p.setInt(3, q.getCols());
			p.executeUpdate();
		}		

	}
	
	 private static void writeResultSet(ResultSet resultSet) throws SQLException {
		    while (resultSet.next()) {
		      int qcid = resultSet.getInt("qcid");
		      int mqid = resultSet.getInt("mqid");
		      int rows = resultSet.getInt("rows");
		      int cols = resultSet.getInt("cols");
		      System.out.println("qcid: " + qcid);
		      System.out.println("mqid: " + mqid);
		      System.out.println("rows: " + rows);
		      System.out.println("cols: " + cols);
		    }
		  }

		  private static void close(ResultSet resultSet, Statement statement, Connection connect) {
		    try {
		      if (resultSet != null) {
		        resultSet.close();
		      }

		      if (statement != null) {
		        statement.close();
		      }

		      if (connect != null) {
		        connect.close();
		      }
		    } catch (Exception e) {

		    }
		  }

}
