package org.adastraeducation.liquiz.equation;

import java.util.ArrayList;
import java.util.Arrays;

//the Node used to construct the tree
class Node<T> {
	T value;
	int level;
	Node<T> left;
	Node<T> right;

	public Node(T value, int level) {
		this.value = value;
		this.level = level;
		left = null;
		right = null;
	}
}

// pares the infix into a tree which will help to construct an array to RPN
public class Tree {
	private Node<String> head;
	private int len;

	public Tree(ArrayList<String> s) {
		head = null;
		this.len = s.size();
		int i = 0;
		int hierarchy = 1;  // an integer for detecting parenthesis to high or low the level
		this.insert(s, i, hierarchy);
	}

	public void insert(ArrayList<String> s, int i, int hierarchy) {
		String use = s.get(i);
		int level = 0; // set the level for the operands
		// set level
		if (Functions.MATHFUNCTIONS.contains(use)) {
			level = Functions.LEVEL.get(use) * hierarchy;
		} else if (use.equals("(")) {
			hierarchy += 3;
		} else if (use.equals(")")) {
			hierarchy -= 3;
		} else {
			level = Integer.MAX_VALUE;
		}
		// start to insert
		//if the char is "(" or ")", then there is no use for new node
		if (use.equals("(") || use.equals(")")) 
			;
		else {
			Node<String> node = new Node<String>(use, level);
			if (head == null) {
				head = node;
			} else {
				Node<String> cur = head;
				Node<String> previous = null;
				while (cur != null && node.level > cur.level) {
					previous = cur;
					cur = cur.right;
				}
				if (cur == null && previous != null) {
					previous.right = node;
				} else if (previous == null && cur != null) {
					node.left = cur;
					head = node;
				} else {
					previous.right = node;
					node.left = cur;
				}
			}
		}
		i++;
		if (i > s.size() - 1)
			return;
		else
			insert(s, i, hierarchy);
	}

	// get the traverse data
	public ArrayList<String> traverse() {
		ArrayList<String> array = new ArrayList<String>();
		putdata(head, array);
		return array;
	}

	// traverse the tree
	public void putdata(Node<String> h, ArrayList<String> array) {
		if (h == null)
			return;
		else {
			putdata(h.left, array);
			putdata(h.right, array);
			// System.out.println(h.value);
			array.add(h.value);
		}
	}

	public static void main(String[] args) {

		ArrayList<String> s = new ArrayList<String>(
				Arrays.asList("1","+","2","*","sin","(","x",")"));

		Tree t = new Tree(s);
		ArrayList<String> st = t.traverse();
		for (int i = 0; i < st.size(); i++) {
			System.out.print(st.get(i));
		}
	}
}