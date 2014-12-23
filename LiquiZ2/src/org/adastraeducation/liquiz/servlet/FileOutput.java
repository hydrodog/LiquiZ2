package org.adastraeducation.liquiz.servlet;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

public class  FileOutput {
	
	public static void output(String path, String s) throws IOException{
		File f = new File(path,"code.java");
		if(f.exists()){
			try{
				FileWriter fw = new FileWriter(f,false);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(s);
				bw.close();
				fw.close();
			}
			catch(FileNotFoundException e){
				e.printStackTrace();
			}
			catch(IOException e){
				e.printStackTrace();
			}
		}
		else{
			f.createNewFile();
			try{
				FileWriter fw = new FileWriter(f,false);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(s);
				bw.close();
				fw.close();
			}
			catch(FileNotFoundException e){
				e.printStackTrace();
			}
			catch(IOException e){
				e.printStackTrace();
			}
		}
	}
}
