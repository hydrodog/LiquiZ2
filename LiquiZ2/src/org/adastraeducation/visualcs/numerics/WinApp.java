package org.adastraeducation.visualcs.numerics;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class WinApp extends JFrame {
	public WinApp(String title, int w, int h) {
		super(title);
		setSize(w,h);
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
		setVisible(true);
	}
	
	public void buildMenu(String[][] menus) {
		JMenuBar mb = new JMenuBar();
		for (int i = 0; i < menus.length; i++) {
			JMenu m = new JMenu(menus[i][0]);
			for (int j = 1; j < menus[i].length; j++) {
				JMenuItem mi = new JMenuItem(menus[i][j]);
				m.add(mi);
			}
			mb.add(m);
		}
		setJMenuBar(mb);
	}
	public static void main(String[] a) {
		WinApp w = new WinApp("Test", 800,500);
		String[][] m = {
				{"File", "New", "Open...", "Close..."},
				{"Quit"}				
		};
		w.buildMenu(m);
		
	}
}
