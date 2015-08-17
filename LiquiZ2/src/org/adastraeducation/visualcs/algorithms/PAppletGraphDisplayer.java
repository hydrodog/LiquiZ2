package org.adastraeducation.sort;

//1  how to repaint after finish one animation?  store that image and then give out certain solution.  
//2  how to output solution in txt file the, name
//3  what's next step?  build on the web server? save png     graph1 png  sloution1 txt  batch


import org.adastraeducation.util.Generate_random_number;
import org.adastraeducation.util.Serial_number;
import org.adastraeducation.util.SetArray;
import org.adastraeducation.visualize.Visualize;

import processing.core.PApplet;


public class PAppletGraphDisplayer extends PApplet {   
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
//	private MergeSort mergedata;
	private String required_algorithm = "MergeSort";
	private int required_num = 1;
	private int delaytime = 1000;
	private int arrayLength = 10;
	private boolean interactive=true;
	private ArrayDisplayer displayer;
	private SetArray randomArray;
	private void interact(){
		if(!interactive)
			return;
		else{
			redraw();
			delay(delaytime);
		}	
	}
	public void setData(int[] data2){
		displayer=new ArrayDisplayer(data2){								    	
			public void setHighlightVertex(int position, int color){          
				highlightvertex[position]=color;
//				interact();
			}
			public void display() {
				interact();
			}
			@Override
			public void setHighlightVertex2(int position, int color) {
				// TODO Auto-generated method stub
				highlightvertex2[position]=color;
			}
		};
	}

	public void setup() {
		randomArray = new SetArray(arrayLength);
		setData(randomArray.data);
		size(600,600);
    	//noStroke();
    	background(255);
    	//fill(0, 102, 153, 204);
    	fill(255);
    	//smooth();
    	//noLoop();
    }
    public void draw() {    
    	rectMode(CENTER);
    	clear();
    	background(255);
    	fill(255);

    	for (int x_axis = 0; x_axis < arrayLength; x_axis++) {
    		fill(255);
    		rect(55+56*x_axis, 200, 56, 56);
    		textSize(32);
    	
    		if (displayer.highlightvertex[x_axis] == 1) {
    			fill(100);
    			text(displayer.data[x_axis], 45+56*x_axis, 210);	
    		} else if (displayer.highlightvertex[x_axis] == 0){
    			fill(200);
    			text(displayer.data[x_axis], 45+56*x_axis, 210);
    		} else {
    			fill(204, 102, 0);
    			text(displayer.data[x_axis], 45+56*x_axis, 210);
    		}

    		if (displayer.highlightvertex2[x_axis] == 1) {
    			fill(255);
        		rect(55+56*x_axis, 400, 56, 56);
        		textSize(32);
        		if (x_axis < displayer.tempArr.length) {
	        		fill(100);
	    			text(displayer.tempArr[x_axis], 45+56*x_axis, 410);
    			}	
    		} 
    		if (displayer.left != -1) {
    			fill(100);
    			line(55+56*displayer.left, 270, 55+56*displayer.left, 330);
    		}
    		if (displayer.right != -1) {
    			fill(100);
    			line(55+56*displayer.right, 270, 55+56*displayer.right, 330);
    		}
    		//delay(100);
    	}
        
		if(Visualize.start){
			Visualize.start=false;
			switch (required_algorithm) {
		 	case "MergeSort":
		 		save("..\\Image Question Folder\\MergeSort_imagequestion_"+Serial_number.serialno()+".png");
		    	Thread merge = new Thread() {
					public void run() {
						MergeSort mergedata = new MergeSort(displayer);
						delay(delaytime);
						mergedata.start();
						mergedata.sort();
						mergedata.finish();
					}
				};
				merge.start();
		 		break;
		 	case "HeapSort":
		 		save("..\\Image Question Folder\\HeapSort_imagequestion_"+Serial_number.serialno()+".png");
		    	Thread heap = new Thread() {
					public void run() {
						HeapSortApplet heapdata = new HeapSortApplet(displayer);
						delay(delaytime);
						heapdata.start();
						heapdata.heapSort();
						heapdata.finish();
					}
				};
				heap.start();
		 		break;
		 	default:
		 		break;
		 	}
		 	
		 }
 
		if(Visualize.terminate){
			switch (required_algorithm) {
			case "MergeSort":
				save("..\\Image Solution Folder\\MergeSort_imagesolution_"+Serial_number.serialno()+".png" );
			    Visualize.terminate=false;
			     
			    if(Serial_number.increment()>=required_num){
			     	exit();
			    }
			    else
			    {
			    	setup();
			    	Visualize.start=true;
			    }
				break;
			case "HeapSort":
				save("..\\Image Solution Folder\\HeapSort_imagesolution_"+Serial_number.serialno()+".png" );
			    Visualize.terminate=false;
			     
			    if(Serial_number.increment()>=required_num){
			     	exit();
			    }
			    else
			    {
			    	setup();
			    	Visualize.start=true;
			    }
				break;
			default:
				break;
			}
		     
		 	
		}
	}

}