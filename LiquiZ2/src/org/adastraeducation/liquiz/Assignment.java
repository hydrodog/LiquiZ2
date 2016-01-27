package org.adastraeducation.liquiz;

import java.util.Date;

/**
 * Assignment contains the dates and circumstances surrounding every assignment.
 * At the moment, the only assignment supported by the system is a quiz
 * @author Dov Kruger
 *
 */
public class Assignment implements java.io.Serializable{
	public boolean isPublished() {
		return published;
	}
	public void setPublished(boolean published) {
		this.published = published;
	}
	public Date getUnlockDate() {
		return unlockDate;
	}
	public void setUnlockDate(Date unlockDate) {
		this.unlockDate = unlockDate;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public Date getCloseDate() {
		return closeDate;
	}
	public void setCloseDate(Date closeDate) {
		this.closeDate = closeDate;
	}
	public double getPerDayBonusEarlySubmission() {
		return perDayBonusEarlySubmission;
	}
	public void setPerDayBonusEarlySubmission(double perDayBonusEarlySubmission) {
		this.perDayBonusEarlySubmission = perDayBonusEarlySubmission;
	}
	public double getPerDayPenaltyLateSubmission() {
		return perDayPenaltyLateSubmission;
	}
	public void setPerDayPenaltyLateSubmission(double perDayPenaltyLateSubmission) {
		this.perDayPenaltyLateSubmission = perDayPenaltyLateSubmission;
	}
	private boolean published;	// if not published, then this is invisible to all students
	private Date unlockDate;	// after this date, students may read the contents
	private Date dueDate;		// after this date, the assignment is late
	private Date closeDate;		// after this date, the assignment is closed
	private double perDayBonusEarlySubmission;	// per day bonus for early submission
	private double perDayPenaltyLateSubmission;	// per day penalty for late submission
	private double flatBonusEarlySubmission;
	private double flatPenaltyLateSubmission;
	public Assignment() {
	}
	
}
