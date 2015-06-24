package org.adastraeducation.visualcs;

import java.util.ArrayList;

public class Data implements Observer {
	protected ArrayList<Observer> observers;
	public Data () { observers = new ArrayList<Observer>(); }
	public void addObserver(Observer obs) { observers.add(obs); }
	public void changed() {
		for (Observer obs : observers)
			obs.display(); // send any dependents and update message
	}
	@Override
	public void display() {
		throw new RuntimeException("This should never happen!");
	}
}
