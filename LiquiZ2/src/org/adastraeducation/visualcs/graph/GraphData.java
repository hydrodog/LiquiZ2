package org.adastraeducation.visualcs.graph;
import org.adastraeducation.visualcs.*;

public class GraphData extends AnswerStore implements GraphObserver {
	public GraphData(String answerFile) {
		super(answerFile);
	}
	@Override
	public void setVertexStyle(int v, int style) {
		for (Observer obs : observers)
			((GraphObserver)obs).setVertexStyle(v,style);
	}

	// meaningless here, really implemented in each visualization
	@Override // but must be overridden
	public int getVertexStyle(int v) {
		return 0;
	}

	@Override
	public void setEdgeStyle(int from, int to, int style) {
		for (Observer obs : observers)
			((GraphObserver)obs).setEdgeStyle(from,to,style);		
	}

	// meaningless here, really implemented in each visualization
	@Override 
	public int getEdgeStyle(int from, int to) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
