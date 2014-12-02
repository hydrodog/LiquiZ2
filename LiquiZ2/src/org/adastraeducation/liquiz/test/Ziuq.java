package org.adastraeducation.liquiz.test;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;


public class Ziuq {
	private int id;
	private String name;
	private ArrayList<Contain> c;
	
	public int getId(){
		return this.id;
	}
	
	public void setId(int i){
		this.id = i;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String n){
		this.name = n;
	}
	
	public ArrayList<Contain> getC(){
		return c;
	}
	
	public void setC(ArrayList<Contain> cc){
		c = cc;
	}
	
	public Ziuq(){
		
	};
	
	public void add(Contain cnt){
		if(this.c == null){
			c=new ArrayList<Contain>();
			}
		c.add(cnt);
	}
	
	public static Ziuq oneZiuq(){
		Ziuq zz = new Ziuq();
		
		Contain cnt = new Contain(
				new displayInterface[]{
						new Contain(9,"Nested container "),
						new display(11,"Nested displayable "),
						new Contain(10,"Nested container "),
						new display(13,"Nested displayable ")
				}
				);
		zz.add(cnt);
		
		for(int i = 1; i<=5; i++){
			display d = new display(i,"I am quiz "+ Integer.toString(i) );
			Contain cnt2 = new Contain(i,"Conatainer ");
			cnt.add(d);
			zz.add(cnt2);
			}
		zz.setId(2014);
		zz.setName("LiquiZ");
		return zz;
	}
	
	public static void writeXML (String filename, Ziuq zz) throws IOException{
		XMLEncoder enc = new XMLEncoder(new BufferedOutputStream(new FileOutputStream(filename)));
		enc.writeObject(zz);
		enc.close();
	}

	public static Ziuq readXML(String filename) throws IOException {
		XMLDecoder dec = new XMLDecoder(new BufferedInputStream(new FileInputStream(filename)));
		Ziuq q = (Ziuq)dec.readObject();
		dec.close();
		return q;
	}
	
	public static void main(String[] args) throws IOException{
		writeXML("expResult.xml",oneZiuq());
		Ziuq res = readXML("expResult.xml");
		writeXML("compareRes.xml",res);
	}
}
