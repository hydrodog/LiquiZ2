package org.adastraeducation.liquiz.servlet;

import java.io.IOException;

import org.adastraeducation.liquiz.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;


@SuppressWarnings("serial")
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
		Displayable d = null;
		String questType = request.getParameter("question_type");
		if (questType.equals("FillIn")) {
			q= createFillIn(request);
	     
		} else if (questType.equals("MultiChoice")) {
			q= createMultiChoiceDropdown(request);
			
		}else if (questType.equals("MultiChoiceRadio")) {
			q= createMultiChoiceRadio(request);
			
		}
		else if (questType.equals("MultiAnswer")) {
			q= createMultiAnswer(request);
			
		}
		
		String displaySource = request.getParameter("display_source");
		if (displaySource.equals("Image")) {
			d= createImage(request);
	     
		} else if (displaySource.equals("Video")) {
			d= createVideo(request);
			
		}else if (displaySource.equals("Audio")) {
			d= createAudio(request);
		}	
		
		QuestionContainer qc = new QuestionContainer();
		String title = request.getParameter("title");
		qc.add(new Text(title));
	    String questionText = request.getParameter("question_text");
	    qc.add(new Text(questionText));
		qc.add(q);
		qc.add(d);
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
	public Question createMultiChoiceDropdown(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_number"));
		Answer[] answers = new Answer[numChoices];
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("choices" + (i+1));
		  answers[i] = new Answer(choice, false);
		}
		MultiChoiceDropdown q = new MultiChoiceDropdown();
		q.setAnswers(answers); 
		return q;
	}
	public Question createMultiChoiceRadio(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_number"));
		Answer[] answers = new Answer[numChoices];
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("choices" + (i+1));
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
		  String choice = request.getParameter("multichoices" + (i+1));
		  answers[i] = new Answer(choice, false);
		}
		MultiAnswer q = new MultiAnswer();
		q.setAnswers(answers); 
		return q;
	}
	
	public Displayable createImage(HttpServletRequest request){
		String source = request.getParameter("image_src");
		Image q = new Image();
		q.setName(source);
		return q;
	}

	public Displayable createVideo(HttpServletRequest request){
		String source = request.getParameter("video_src");
		Video q = new Video();
		q.setVideo(source);
		return q;
	}

	public Displayable createAudio(HttpServletRequest request){
		String source = request.getParameter("audio_src");
		Audio q = new Audio();
		q.setSource(source);
		return q;
	}


}
