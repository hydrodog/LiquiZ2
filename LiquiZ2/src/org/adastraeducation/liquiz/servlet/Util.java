package org.adastraeducation.liquiz.servlet;

import java.io.IOException;
import java.util.ArrayList;

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
		
		String questType = request.getParameter("question_type");
		if (questType.equals("FillIn")) {
			q= createFillIn(request);
	     
		}else if (questType.equals("Essay")) {
			q= createEssay(request);
			
		}else if (questType.equals("Code")) {
			q= createCode(request);
			
		}else if (questType.equals("MultiChoice")) {
			q= createMultiChoiceDropdown(request);
			
		}else if (questType.equals("MultiChoiceRadio")) {
			q= createMultiChoiceRadio(request);
			
		}
		else if (questType.equals("MultiAnswer")) {
			q= createMultiAnswer(request);
			
		}else if(questType.equals("RegexQuestion")){
			q= createRegexQuestion(request);
			
		}
		
		
		QuestionContainer qc = new QuestionContainer();
		String title = request.getParameter("title");
		qc.add(new Text(title));
	    String questionText = request.getParameter("question_text");
	    qc.add(new TextQuestion(questionText));
		String image = request.getParameter("image_src");
		qc.add(new Image(image,0,0));
		String audio = request.getParameter("audio_src");
		qc.add(new Audio(audio));
		String video = request.getParameter("video_src");
		qc.add(new Video(video,0,0));
		qc.add(q);
	    quiz.addQuestionContainer(qc);
	}
	
	public String showQuiz(Quiz quiz){
		DisplayContext dc = new DisplayContext();
	    quiz.writeHTML(dc);
	    return dc.toString();
	}
	
	public Question createFillIn(HttpServletRequest request){
		String answerText, warningPattern ;
		Answer answers = null;
		FillIn q = new FillIn();
		q.setAns(answers);
	    answerText = request.getParameter("answer");
	    warningPattern = request.getParameter("warningPattern");
	    boolean hasWarning = warningPattern != null;
	    System.out.println(hasWarning); // TODO: CHECK!
	  	Answer answer = new Answer(new TextAnswer(answerText), true);
	  	return q;
	}
	
	public Question createEssay(HttpServletRequest request){
		String text = request.getParameter("essay_text");
		Essay q = new Essay();
		q.setDefaultText(text);
	  	return q;
	}
	
	public Question createCode(HttpServletRequest request){
		String text = request.getParameter("code_text");
		Code q = new Code();
		q.setDefaultText(text);
	  	return q;
	}
	
	public Question createMultiChoiceDropdown(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_dropdown_number"));
		//int numChoices = 4 + (Integer.parseInt(request.getParameter("multichoice_dropdown_number")));
		ArrayList<Answer> answers = new ArrayList<Answer>(numChoices);
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("dropdown_choices" + (i+1));
		  answers.add(new Answer(new TextAnswer(choice), false));
		}
		MultiChoiceDropdown q = new MultiChoiceDropdown();
		q.setAns(answers); 
		return q;
	}
	public Question createMultiChoiceRadio(HttpServletRequest request){
		int numChoices = Integer.parseInt(request.getParameter("multichoice_radio_number"));
		//int numChoices = 4 + (Integer.parseInt(request.getParameter("multichoice_radio_number")));
		ArrayList<Answer> answers = new ArrayList<Answer>(numChoices);
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("radio_choices" + (i+1));
		  answers.add(new Answer(new TextAnswer(choice), false));
		}
		MultiChoiceRadio q = new MultiChoiceRadio();
		q.setAns(answers); 
		return q;
	}
	public Question createMultiAnswer(HttpServletRequest request) {
		int numChoices = Integer.parseInt(request.getParameter("multichoice_number"));
		//int numChoices = 4 + (Integer.parseInt(request.getParameter("multichoice_number")));
		ArrayList<Answer> answers = new ArrayList<Answer>(numChoices);
		for (int i = 0; i < numChoices; i++) {
		  String choice = request.getParameter("multi_choices" + (i+1));
		  answers.add(new Answer(new TextAnswer(choice), false));
		}
		MultiAnswer q = new MultiAnswer();
		q.setAns(answers); 
		return q;
	}
	public Question createRegexQuestion(HttpServletRequest request){
		String answerText ;
		Answer answers = null;
		RegexQuestion q = new RegexQuestion();
		q.setAns(answers);
	    answerText = request.getParameter("answer");
	  //  regexPattern = request.getParameter("regexString");
	  //  q.setPattern(regexPattern);   TODO: Check!
	  	Answer answer = new Answer(new TextAnswer(answerText), true);
	  	return q;
	}
	


}
