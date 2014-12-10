package org.adastraeducation.liquiz.util;

public class NumberWarningPattern implements WarningPattern {
	
	private  int limit;
	
	public NumberWarningPattern(int n){
		this.limit=n;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public NumberWarningPattern(){}

	@Override
	public String getTag() {
		return "number";
	}
	
	

}
