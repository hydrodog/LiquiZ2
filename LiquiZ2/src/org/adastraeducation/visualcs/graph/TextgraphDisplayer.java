package org.adastraeducation.visualcs.graph;


public class TextgraphDisplayer extends GraphDisplayer {
		public TextgraphDisplayer(Graph g){
			super(g);
		}

//		1	2	3	4	5   
//	1	                                 I means infinity 
//	2
//	3
//	4
//	5	
		@Override
		public void display() {
			
			int v=g.getV();
			StringBuilder b=new StringBuilder((v+1)*(v+1)*2);
			b.append('\t');
			for(int i=0;i<v;i++){
				if(highlightvertex2[i]!=0)                                //whether could we make highlightvertex2 is specific in textgraphdisplayer
					b.append("\t[").append(i+1).append("]");
				else
					b.append("\t").append(i+1);
				
			}
			
			
			b.append('\n');
			for(int i=0;i<v;i++){
				
				if(highlightvertex[i]!=0)
				    b.append('[').append(i+1).append("]\t");   //show the number before each line
				else
					b.append(i+1).append('\t');
				
				
				for(int j=0;j<v;j++){
					
					double w=g.getW(i,j);
					if(w==Double.POSITIVE_INFINITY)
						if(getEdgeStyle(i,j)==0){
							b.append("\tI");  
						}
						else
							b.append("\t[I]");
					else
						if(getEdgeStyle(i,j)==0){
							b.append('\t').append(w);
						}
						else
							b.append("\t[").append(w).append(']');
					
				}
				b.append('\n');
			}
			System.out.println(b);
		}
		
		
		
		
		public void setVertexStyle(int v,int highlight){            //how to improve these to combine together
			highlightvertex[v]=highlight;
		}
		
		
		public void setHighlightVertex2(int v,int highlight){
			highlightvertex2[v]=highlight;
		}
		
		public void setEdgeStyle(int From, int To, int highlight){
			highlightedge[From*g.getV()+To]=highlight;
		}
		
		
		
}
