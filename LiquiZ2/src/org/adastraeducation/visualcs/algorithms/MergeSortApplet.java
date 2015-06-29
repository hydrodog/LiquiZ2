package org.adastraeducation.visualcs.algorithms;

import org.adastraeducation.visualcs.BasePApplet;

import jogamp.graph.curve.tess.GraphOutline;

@SuppressWarnings("serial")
public class MergeSortApplet extends BasePApplet {
	private Array arr = null;
	public void setup() {
		super.setup();
		arr = new Array(null, 10, 0, 99);
//		System.out.println(arr);
		setDrawer(new PGraphicsArrayDisplayer(this, null, arr));		
	}
	public void algorithm() {
		if (arr == null)
			return;
		arr.MergeSort();		
	}
}

