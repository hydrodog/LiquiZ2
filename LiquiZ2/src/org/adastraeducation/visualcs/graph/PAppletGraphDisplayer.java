package org.adastraeducation.visualcs.graph;

//1  how to repaint after finish one animation?  store that image and then give out certain solution.  
//2  how to output solution in txt file the, name
//3  what's next step?  build on the web server? save png     graph1 png  sloution1 txt  batch

import org.adastraeducation.visualcs.Visualize;
import org.adastraeducation.visualcs.util.RandomUtil;
import org.adastraeducation.visualcs.util.SerialNumber;

import processing.core.PApplet;
import processing.core.PGraphics;

public class PAppletGraphDisplayer extends PApplet {   
	private static final long serialVersionUID = 1L;
	//public final static String dir = "/Users/funkyxym/visualCs/"; 
	public final static String dir = "data/img/"; 
	private GraphDisplayer displayer;
    private Graph g;
    private int delaytime=0;//300;			
    									//1 normal  2 red for main vertex  3 green for abounding vertex according to main vertex
	private int highlight_num_v1;       //for main vertex
	private int highlight_num_v2;		//for abounding vertex
	
	private int highlight_v_main;
	private int highlight_v2_boundary;
	
	private float[] x, y;
	private float vSize;
	float r;
	private int v;   //number of vertices
	private boolean interactive=true;
	private int required_num =10;
	
	private PGraphics genImage;
	
	
//	PAppletGraphDisplayer(int drawNumber){
//		required_num = drawNumber;
//	}
//	PAppletGraphDisplayer(){
//		required_num = 10;
//	}

	
	private void interact(){
		if(!interactive)
			return;
		else{
			repaint();
			delay(delaytime);
				
		}	
	}
	
	public void setGraph(Graph g){
		displayer=new GraphDisplayer(g){								    //how to repaint();	
			public void setVertexStyle(int v,int highlight){            //how to improve these to combine together
				highlightvertex[v]=highlight;
				highlight_num_v1=highlight;
				
				highlight_v_main=v;
				interact();
				//delay(1000);
			}
						
			public void setHighlightVertex2(int v,int highlight){
				highlightvertex2[v]=highlight;
				highlight_num_v2=highlight;
				highlight_v2_boundary=v;
				interact();
				//delay(1000);
			}
			
			public void setEdgeStyle(int From, int To, int highlight){
				highlightedge[From*g.getV()+To]=highlight;
				interact();
				//delay(1000);
			}
			public void display() {}
		};
	}

	public void setup() {
	      
    	size(600,600);
    	genImage = createGraphics(600,600);    	
    	//highlight_num_e=
    	highlight_num_v1=highlight_num_v2=-1;
    	g=new Graph(RandomUtil.integerRange(5,7));
    	setGraph(g);
    	
    	v=g.getV();
   
    	vSize = 50;     //each vertex is a circle, vsize is a radius   
    		
    	x = new float[v];    //series x location of in a circle(vertex.x )
    	y = new float[v];    //series y location of in a circle(vertex.y)
    	r = 600/2 - vSize;
    	for (int i = 0; i < v; i++) {
    		x[i] = r * cos(i * TWO_PI / v);			// draw a circle  uniformly distribute 
    		y[i] = r * sin(i * TWO_PI / v);
    	}
    	
    	//if(Serial_number.serialno()==0)
    	  background(0);
    }
    public void draw() {  
    	genImage.beginDraw();
    	
    	genImage.background(0);
    	
    	if(displayer==null)
    		return;
    	genImage.translate(width/2, height/2);
    	float txtHeight = 20; 
    	genImage.textSize(txtHeight);
       	genImage.stroke(255);
       	genImage.fill(255);
      
        
        for(int i=0;i<v;i++){
       		for(int j=i;j<v;j++){
       		
       		 if(g.getW(i,j)!=Double.POSITIVE_INFINITY){
       			 	genImage.line(x[i],y[i],x[j],y[j]);
       			 	genImage.text( Double.toString(g.getW(i,j)),  (x[i]+x[j])/2,  (y[i]+y[j])/2   ) ;	
       		 	}	 
       		  	
       		}
       	}
        for(int i=0;i<v;i++){
       		for(int j=0;j<v;j++){
       			if(displayer.getEdgeStyle(i, j)!=0){
       				genImage.stroke(255,0,0);
	        		genImage.line(x[i],y[i],x[j],y[j]);
		        }
       		}
       	}
        
        for (int i = 0; i < v; i++) {
        	genImage.noStroke();	
        	genImage.fill(255);        	
        	genImage.ellipse(x[i], y[i], vSize,vSize);
        	genImage.fill(0);
        	genImage.text(i+1, x[i]-txtHeight/3, y[i]+txtHeight/3);
    	}
        
        if(highlight_num_v1==1){
        	genImage.noStroke();	
        	genImage.fill(255,0,0);
        	genImage.ellipse(x[highlight_v_main], y[highlight_v_main], vSize,vSize);
        	genImage.fill(0);
        	genImage.text(highlight_v_main+1, x[highlight_v_main]-txtHeight/3, y[highlight_v_main]+txtHeight/3);
        }
        
        if(highlight_num_v2==1){
        	genImage.noStroke();	
        	genImage.fill(0,255,0);
        	genImage.ellipse(x[highlight_v2_boundary], y[highlight_v2_boundary], vSize,vSize);
        	genImage.fill(0);
        	genImage.text(highlight_v2_boundary+1, x[highlight_v2_boundary]-txtHeight/3, y[highlight_v2_boundary]+txtHeight/3);
        }
               
        if(Visualize.start){
        	
        	Visualize.start=false;
        	genImage.endDraw();
        	
        	genImage.save(dir+"Bellmanford_imagequestion_"+SerialNumber.serialno()+".png");
    		
    		Thread t = new Thread() {
    			public void run() {
    				BellmanFord b = new BellmanFord(displayer);
    				b.getpath(g);
    				repaint();	
    			}
    		};
    		
    		t.start();
        }
        
        if(Visualize.terminate){
        	genImage.endDraw();
        	genImage.save(dir+"Bellmanford_imagesolution_"+SerialNumber.serialno()+".png" );
	        Visualize.terminate=false;
	       
	        if(SerialNumber.increment()>=required_num){
	        	exit();
	        }
	        else
	        {
	        	setup();
	        	Visualize.start=true;
	        }
	    	
    	}
    }
    
    
    /*
    // flag graph  launch
	//public void draw_bellmanford(boolean flag_interactive) {
      public void draw_bellmanford() {
		save("Bellmanford_imagequestion_"+Serial_number.serialno()+".png");
		
		Thread t = new Thread() {
			public void run() {
				BellmanFord b = new BellmanFord(displayer);
				b.getpath(g);
			}
		};
		
		t.start();
		
		//if(!flag_interactive){
		//	try {
		//		t.join();
		//	} catch (InterruptedException e) {}
			
		//}
	}
	
	
	public void mousePressed(){
	//	draw_bellmanford(true);	
		draw_bellmanford();	
	}
	*/
   
}
