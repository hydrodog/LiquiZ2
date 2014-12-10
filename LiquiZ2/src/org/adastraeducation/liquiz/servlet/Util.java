package org.adastraeducation.liquiz.servlet;

import java.io.IOException;

import org.adastraeducation.liquiz.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;


public class Util extends HttpServlet{
	
	private Quiz quiz = new Quiz();
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
//      problem for quiz lifetime, when to create a new Quiz?
		
//		if(request.getSession().isNew())
//			quiz = new Quiz();
		
		addQuestion(quiz, request);
		request.setAttribute("QuizContext",showQuiz(quiz));
		request.setAttribute("NumberOfQuestions", quiz.getQuestionCount());
		request.setAttribute("NumberOfQuestionContainers", quiz.getQuestionContainerCount());
		RequestDispatcher dispatcher = request.getRequestDispatcher("addQuestion.jsp");
		dispatcher.forward(request, response);
	}
	
	
	public void addQuestion(Quiz quiz, HttpServletRequest request){
		
		int points = 1;
	   	try {
	   		points = Integer.parseInt(request.getParameter("points"));
	   	} catch(Exception e) {
	   	}

		int level = 1;
		try {   
	   		level = Integer.parseInt(request.getParameter("level"));
	   	} catch(Exception e) {
	   		//TODO: do nothing and level will default to 1 if error?
	   	}
		Question q = null;
		String questType = request.getParameter("question_type");
		if (questType.equals("FillIn")) {
			q= createFillIn(request);
	     
		}else if (questType.equals("Essay")) {
			q= createEssay(request);
			
		} else if (questType.equals("MultiChoiceDropdown")) {
			q= createMultiChoiceDropdown(request);
			
		}else if (questType.equals("MultiChoiceRadio")) {
			q= createMultiChoiceRadio(request);
			
		}
		else if (questType.equals("MultiAnswer")) {
			q= createMultiAnswer(request);
			
		}
		
		
		QuestionContainer qc = new QuestionContainer();
		String title = request.getParameter("title");
		qc.add(new Text(title));
	    String questionText = request.getParameter("question_text");
	    qc.add(new Text(questionText));
		qc.add(q);
	    quiz.addQuestionContainer(qc);
	}
	
	public String showQuiz(Quiz quiz){
		StringBuilder b = new StringBuilder(65536);
	    quiz.writeHTML(b);
	    return b.toString();
	}
	
	public Question createFillIn(HttpServletRequest request){
		String answerText, warningPattern ;
		Answer answers = null;
		FillIn q = new FillIn();
		q.setAnswers(answers);
	    answerText = request.getParameter("answer");
	    warningPattern = request.getParameter("warningPattern");
	    boolean hasWarning = warningPattern != null;
	    System.out.println(hasWarning); // TODO: CHECK!
	  	Answer answer = new Answer(answerText, true);
	  	return q;
	}
	
	public Question createEssay(HttpServletRequest request){
		String quesText;
		Answer answers = null;
		Essay q = new Essay();
	    quesText = request.getParameter("essay_ques_text");
	  	Answer answer = new Answer(quesText, true);
	  	return q;
	}
	
	public Question createMultiChoiceDropdown(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_dropdown_number"));
		Answer[] answers = new Answer[numChoices];
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("dropdown_choices" + (i+1));
		  answers[i] = new Answer(choice, false);
		}
		MultiChoiceDropdown q = new MultiChoiceDropdown();
		q.setAnswers(answers); 
		return q;
	}
	public Question createMultiChoiceRadio(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_radio_number"));
		Answer[] answers = new Answer[numChoices];
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("radio_choices" + (i+1));
		  answers[i] = new Answer(choice, false);
		}
		MultiChoiceRadio q = new MultiChoiceRadio();
		q.setAnswers(answers); 
		return q;
	}
	public Question createMultiAnswer(HttpServletRequest request) {
		int numChoices = Integer.parseInt(request.getParameter("multianswer_number"));
		Answer[] answers = new Answer[numChoices];
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("multi_choices" + (i+1));
		  answers[i] = new Answer(choice, false);
		}
		MultiAnswer q = new MultiAnswer();
		q.setAnswers(answers); 
		return q;
	}

}
/*    				<input type="button" value="Show Button" onclick="showImage();"/>
 				    <img id="loadingImage" src="typeImageName();" style="visibility:hidden"/>
 */
