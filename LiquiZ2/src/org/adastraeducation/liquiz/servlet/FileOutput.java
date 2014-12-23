package org.adastraeducation.liquiz.servlet;

/*
 * Author: Yingzhu
 */

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

public class  FileOutput {
	
	public static void output(String path, String s, String language) throws IOException{
		File f;
		if(language.equals("Java")){
			f = new File(path,"code.java");
		}
		else{
			f = new File(path,"code.cpp");
		}
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
