package org.adastraeducation.liquiz.mport.canvas;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.adastraeducation.liquiz.Answer;
import org.adastraeducation.liquiz.Displayable;
import org.adastraeducation.liquiz.EquationQuestion;
import org.adastraeducation.liquiz.Essay;
import org.adastraeducation.liquiz.FileUpload;
import org.adastraeducation.liquiz.FillIn;
import org.adastraeducation.liquiz.MultiAnswer;
import org.adastraeducation.liquiz.MultiChoiceDropdown;
import org.adastraeducation.liquiz.NumberRange;
import org.adastraeducation.liquiz.Policy;
import org.adastraeducation.liquiz.Question;
import org.adastraeducation.liquiz.QuestionContainer;
import org.adastraeducation.liquiz.Quiz;
import org.adastraeducation.liquiz.Text;
import org.adastraeducation.liquiz.equation.Equation;
import org.adastraeducation.liquiz.equation.Var;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class QuizLoader {

	public static final int textOnlyQuestion = 0;
	public static final int multiple_choice_question = 1;
	public static final int true_false_question = 2;
	public static final int short_answer_question = 3;
	public static final int fill_in_multiple_blanks_question = 4;
	public static final int multiple_answers_question = 5;
	public static final int multiple_dropdowns_question = 6;
	public static final int matching_question = 7;
	public static final int numerical_question = 8;
	public static final int calculated_question = 9;
	public static final int essay_question = 10;
	public static final int file_upload_question = 11;
	
	public static Quiz loadQuizFromCanvas(int quizId, String quizPath, String canvasId) throws Exception
	{
		System.out.println(canvasId);
		XmlReader reader = new XmlReader(quizPath + "/assessment_meta.xml");
		String title = reader.getNodeStringByPath("title");
		Policy plc = new Policy();
		if(reader.getNodeStringByPath("allowed_attempts") != null && reader.getNodeStringByPath("allowed_attempts").length() > 0)
			plc.setAttemptNum(Integer.parseInt(reader.getNodeStringByPath("allowed_attempts")));
		else
			plc.setAttemptNum(0);
		if(reader.getNodeStringByPath("time_limit") != null)
		{
			String time_limit = reader.getNodeStringByPath("time_limit");
			try{
				plc.setDuration(Integer.parseInt(time_limit));
				plc.setTimed(true);
			}
			catch(Exception e)
			{
				plc.setDuration(0);
				plc.setTimed(false);
			}
		}
		else
		{
			plc.setDuration(0);
			plc.setTimed(true);
		}
		if(reader.getNodeStringByPath("show_correct_answers") != null)
			plc.setShowAns(reader.getNodeStringByPath("show_correct_answers").equals("true"));
		else
			plc.setShowAns(false);
		if(reader.getNodeStringByPath("shuffle_answers") != null)
			plc.setShuffleAns(reader.getNodeStringByPath("shuffle_answers").equals("true"));
		else
			plc.setShuffleAns(false);
		if(reader.getNodeStringByPath("access_code") != null)
			plc.setAccessCode(reader.getNodeStringByPath("access_code"));
		Quiz newQuiz = new Quiz(plc);
		newQuiz.setName(title);
		XmlReader questionReader = new XmlReader(quizPath + "/" + canvasId + ".xml");
		Node sectionNode = questionReader.getNodeByPath("assessment");
		NodeList itemList = sectionNode.getChildNodes();
		for(int i = 0; i < itemList.getLength(); ++i)
		{
			Node itemNode = itemList.item(i);
			if(itemNode.getNodeName().equals("section"))
			{
				NodeList children = itemNode.getChildNodes();
				for(int j = 0; j < children.getLength(); ++j)
				{
					Node item = children.item(j);
					if(item.getNodeName().equals("item"))
					{
						QuestionContainer qc = loadQuestionContainerFromCanvas(item);
						newQuiz.addQuestionContainer(qc);
					}
				}
			}
		}
		return newQuiz;
	}
	
	public static QuestionContainer loadQuestionContainerFromCanvas(Node node)
	{
		ArrayList<Displayable> displayableList = new ArrayList<Displayable>();
		String title = NodeManager.getAttributeString(node, "title");
		displayableList.add(new Text("<B>"+title+"</B>"));

		Node materialNode = NodeManager.getNodeByPath(node,"presentation/material/mattext");
		
		String textString = null;
		if(materialNode != null)
		{
			textString = NodeManager.getNodeStringByPath(materialNode,"");
			textString = textString.replaceAll("\\xA0", " ");
		}

		double points = 0;
		Node itemMetaData = NodeManager.getNodeByPath(node,"itemmetadata/qtimetadata");
		if(itemMetaData != null)
		{
			NodeList itemList = itemMetaData.getChildNodes();
			Question question = null;
			int type = 0;
			for(int j = 0; j < itemList.getLength(); ++j)
			{
				Node qtimetadatafield = itemList.item(j);
				if(qtimetadatafield.getNodeName().equals("qtimetadatafield"))
				{
					String fieldlabel = NodeManager.getNodeStringByPath(qtimetadatafield,"fieldlabel");
					String fieldentry = NodeManager.getNodeStringByPath(qtimetadatafield,"fieldentry");
					if(fieldlabel.equals("question_type"))
					{
						if(fieldentry.equals("multiple_choice_question"))
						{
							type = multiple_choice_question;
							question = new MultiAnswer();
							question.setLevel(1);
						}
						else if(fieldentry.equals("true_false_question"))
						{
							type = true_false_question;
							question = new MultiAnswer();
							question.setLevel(1);
						}
						else if(fieldentry.equals("short_answer_question"))
						{
							type = short_answer_question;
						}
						else if(fieldentry.equals("fill_in_multiple_blanks_question"))
						{
							type = fill_in_multiple_blanks_question;
						}
						else if(fieldentry.equals("multiple_answers_question"))
						{
							type = multiple_answers_question;
							question = new MultiAnswer();
							question.setLevel(1);
						}
						else if(fieldentry.equals("multiple_dropdowns_question"))
						{
							type = multiple_dropdowns_question;
						}
						else if(fieldentry.equals("matching_question"))
						{
							type = matching_question;
						}
						else if(fieldentry.equals("numerical_question"))
						{
							type = numerical_question;
							//System.out.println(":" + type);
						}
						else if(fieldentry.equals("calculated_question"))
						{
							type = calculated_question;
							System.out.println(type);
						}
						else if(fieldentry.equals("essay_question"))
						{
							type = essay_question;
						}
						else if (fieldentry.equals("file_upload_question"))
						{
							type = file_upload_question;
							//System.out.println(type);
						}
						else
						{
							type = textOnlyQuestion;
						}
					}
					else if(fieldlabel.equals("points_possible"))
					{
						if(question != null)
							question.setPoints(Integer.parseInt(fieldentry));
						else
							points = Double.parseDouble(fieldentry);
					}
				}
			}
			if(question != null)
			{
				if(textString != null)
				{
					displayableList.add( new Text(textString));
				}
				ArrayList<Answer> ansList = new ArrayList<Answer>();
				if(type == multiple_choice_question || type == true_false_question || type == multiple_answers_question)
				{
					HashMap<String,Boolean> rightAnswerList = new HashMap<String,Boolean>();
					if(type == multiple_choice_question || type == true_false_question)
					{
						String rightAnswer = NodeManager.getNodeStringByPath(node, "resprocessing/respcondition/conditionvar/varequal");
						rightAnswerList.put(rightAnswer, true);
					}
					else if(type == multiple_answers_question)
					{
						Node resprocessingNode = NodeManager.getNodeByPath(node, "resprocessing");
						NodeList conditionNodeList = resprocessingNode.getChildNodes();
						for(int k = 0; k < conditionNodeList.getLength(); ++k)
						{
							Node conditionNode = conditionNodeList.item(k);
							if(conditionNode.getNodeName().equals("respcondition") && NodeManager.getAttributeString(conditionNode, "continue").equals("No"))
							{
								Node rightNode = NodeManager.getNodeByPath(conditionNode, "conditionvar/and");
								NodeList rightNodeList = rightNode.getChildNodes();
								for(int i = 0; i < rightNodeList.getLength(); ++i)
								{
									Node answerNode = rightNodeList.item(i);
									if(answerNode.getNodeName().equals("varequal"))
									{
										String rightAnswer = NodeManager.getNodeStringByPath(answerNode, "");
										rightAnswerList.put(rightAnswer, true);
									}
								}
							}
						}
						
					}
	
					Node responseNode = NodeManager.getNodeByPath(node, "presentation/response_lid/render_choice");
					NodeList responseList = responseNode.getChildNodes();
					for(int i = 0; i < responseList.getLength(); ++i)
					{
						Node response_label = responseList.item(i);
						if(response_label.getNodeName().equals("response_label"))
						{
							String ansId = NodeManager.getAttributeString(response_label, "ident");
							Node material = NodeManager.getNodeByPath(response_label, "material/mattext");
							String ansString = NodeManager.getNodeStringByPath(material, "");
							
							ansList.add(new Answer(new Text(ansString),rightAnswerList.containsKey(ansId)));
						}
					}
				}
				
				question.setAns(ansList);
				displayableList.add(question);
			}
			else if(type == short_answer_question)
			{
				if(textString != null)
				{
					ArrayList<Answer> ansList = new ArrayList<Answer>();
					Node responseNode = NodeManager.getNodeByPath(node, "resprocessing/respcondition/conditionvar");
					NodeList responseList = responseNode.getChildNodes();
					for(int i = 0; i < responseList.getLength(); ++i)
					{
						Node response_label = responseList.item(i);
						if(response_label.getNodeName().equals("varequal"))
						{
							String text = NodeManager.getNodeStringByPath(response_label, "");
							ansList.add(new Answer(new Text(text),true));
						}
					}
					
					displayableList.add( new Text(textString));
					displayableList.add(new FillIn(1,1,(int)points,ansList));
					displayableList.add(new Text("<br>"));
				}
			}
			else if(type == numerical_question)
			{
				if(textString != null)
				{
					double gte = Double.parseDouble(NodeManager.getNodeStringByPath(node,"resprocessing/respcondition/conditionvar/or/and/vargte"));
					double lte = Double.parseDouble(NodeManager.getNodeStringByPath(node,"resprocessing/respcondition/conditionvar/or/and/varlte"));
					displayableList.add( new Text(textString));
					displayableList.add(new NumberRange(1,1,(int)points,gte,lte));
					displayableList.add(new Text("<br>"));
				}
			}
			else if(type == fill_in_multiple_blanks_question)
			{
				if(textString != null)
				{
					Node responseNode = NodeManager.getNodeByPath(node, "presentation");
					NodeList responseList = responseNode.getChildNodes();
					HashMap<String,ArrayList<Answer>> rightAnswerMap = new HashMap<String,ArrayList<Answer>>();
					for(int i = 0; i < responseList.getLength(); ++i)
					{
						Node response_lib = responseList.item(i);
						if(response_lib.getNodeName().equals("response_lid"))
						{

							ArrayList<Answer> answerList = new ArrayList<Answer>();
							String ansid = NodeManager.getNodeStringByPath(response_lib, "material/mattext");
							Node renderChoice = NodeManager.getNodeByPath(response_lib, "render_choice");
							NodeList choiceList = renderChoice.getChildNodes();
							for(int j = 0; j < choiceList.getLength(); ++j)
							{
								Node response_label = choiceList.item(j);
								if(response_label.getNodeName().equals("response_label"))
								{
									Node material = NodeManager.getNodeByPath(response_label, "material/mattext");
									String ansString = NodeManager.getNodeStringByPath(material, "");
									
									Answer ans = new Answer(new Text(ansString),true);
									answerList.add(ans);
								}
							}
							rightAnswerMap.put(ansid, answerList);
						}
					}
					String textArr[] = textString.split("\\[[^\\] ]+\\]");
					Matcher matcher = Pattern.compile("\\[([^\\] ]+?)\\]").matcher(textString);
					for(int i = 0; i < textArr.length - 1; ++i)
					{
						String text = textArr[i];
						displayableList.add( new Text(text));
						if(matcher.find())
						{
							ArrayList<Answer> answerList = rightAnswerMap.get(matcher.group(1));
							displayableList.add(new FillIn(1,1,(int)Math.ceil(points/textArr.length),answerList));
						}
					}
					displayableList.add(new Text("<br>"));
				}
			}
			else if( type == multiple_dropdowns_question)
			{
				if(textString != null)
				{
					HashMap<String, String> rightAnswerMap = new HashMap<String, String>();
					Node responseNode = NodeManager.getNodeByPath(node, "resprocessing");
					NodeList responseList = responseNode.getChildNodes();
					
					for(int i = 0; i < responseList.getLength(); ++i)
					{
						Node response_lib = responseList.item(i);

						if(response_lib != null && response_lib.getNodeName().equals("respcondition"))
						{
							Node correctNode = NodeManager.getNodeByPath(response_lib, "conditionvar/varequal");
							String ansId = NodeManager.getAttributeString(correctNode, "respident");
							ansId = ansId.split("_")[1];
							rightAnswerMap.put(ansId, NodeManager.getNodeStringByPath(correctNode, ""));
						}
					}

					Node ansNode = NodeManager.getNodeByPath(node, "presentation");
					NodeList ansList = ansNode.getChildNodes();
					
					HashMap<String,ArrayList<Answer>> answerMap = new HashMap<String,ArrayList<Answer>>();
					for(int i = 0; i < ansList.getLength(); ++i)
					{
						Node response_lib = ansList.item(i);
						if(response_lib.getNodeName().equals("response_lid"))
						{

							ArrayList<Answer> answerList = new ArrayList<Answer>();
							String ansid = NodeManager.getNodeStringByPath(response_lib, "material/mattext");
							Node renderChoice = NodeManager.getNodeByPath(response_lib, "render_choice");
							NodeList choiceList = renderChoice.getChildNodes();
							for(int j = 0; j < choiceList.getLength(); ++j)
							{
								Node response_label = choiceList.item(j);
								if(response_label.getNodeName().equals("response_label"))
								{
									String answerIdent = NodeManager.getAttributeString(response_label, "ident");
									Node material = NodeManager.getNodeByPath(response_label, "material/mattext");
									String ansString = NodeManager.getNodeStringByPath(material, "");
									String rightAnswerIdent = rightAnswerMap.get(ansid);
									if(rightAnswerIdent == null)
									{
										System.out.println("null a");
									}
									Answer ans = new Answer(new Text(ansString),rightAnswerIdent.equals(answerIdent));
									answerList.add(ans);
								}
							}
							answerMap.put(ansid, answerList);
						}
					}
					String textArr[] = textString.split("\\[[^\\] ]+\\]");
					Matcher matcher = Pattern.compile("\\[([^\\] ]+?)\\]").matcher(textString);
					for(int i = 0; i < textArr.length - 1; ++i)
					{
						String text = textArr[i];
						displayableList.add( new Text(text));
						if(matcher.find())
						{
							String ansId = matcher.group(1);
							ArrayList<Answer> answerList = answerMap.get(ansId);
							displayableList.add(new MultiChoiceDropdown(1,(int)Math.ceil(points/textArr.length),answerList));
						}
					}
				}
			}
			else if(type == matching_question)
			{
				if(textString != null)
				{
					displayableList.add( new Text(textString));
					
					HashMap<String, String> rightAnswerMap = new HashMap<String, String>();
					Node resprocessingNode = NodeManager.getNodeByPath(node, "resprocessing");
					NodeList responseList = resprocessingNode.getChildNodes();
					
					for(int i = 0; i < responseList.getLength(); ++i)
					{
						Node response_lib = responseList.item(i);

						if(response_lib != null && response_lib.getNodeName().equals("respcondition"))
						{
							Node correctNode = NodeManager.getNodeByPath(response_lib, "conditionvar/varequal");
							String ansId = NodeManager.getAttributeString(correctNode, "respident");
							rightAnswerMap.put(ansId, NodeManager.getNodeStringByPath(correctNode, ""));
						}
					}
					
					Node presentationNode = NodeManager.getNodeByPath(node, "presentation");
					NodeList responseNodeList = presentationNode.getChildNodes();
					for(int i = 0; i < responseNodeList.getLength(); ++i)
					{
						Node responseNode = responseNodeList.item(i);
						if(responseNode.getNodeName().equals("response_lid"))
						{
							String ansid = NodeManager.getAttributeString(responseNode, "ident");
							ArrayList<Answer> answerList = new ArrayList<Answer>();
							String materialText = NodeManager.getNodeStringByPath(responseNode, "material/mattext");
							displayableList.add(new Text(materialText));
							Node renderChoice = NodeManager.getNodeByPath(responseNode, "render_choice");
							NodeList choiceList = renderChoice.getChildNodes();
							for(int j = 0; j < choiceList.getLength(); ++j)
							{
								Node response_label = choiceList.item(j);
								if(response_label.getNodeName().equals("response_label"))
								{
									String answerIdent = NodeManager.getAttributeString(response_label, "ident");
									Node material = NodeManager.getNodeByPath(response_label, "material/mattext");
									String ansString = NodeManager.getNodeStringByPath(material, "");
									String rightAnswerIdent = rightAnswerMap.get(ansid);
									Answer ans = new Answer(new Text(ansString),rightAnswerIdent.equals(answerIdent));
									answerList.add(ans);
								}
							};
							displayableList.add(new MultiChoiceDropdown(1,(int)Math.ceil(points/(responseNodeList.getLength() - 1)),answerList));
						}
					}
				}
			}
			else if(type == calculated_question)
			{
				if(textString != null)
				{
					HashMap<String,Var> map = new HashMap<String,Var>();
					Node varsNode = NodeManager.getNodeByPath(node, "itemproc_extension/calculated/vars");
					NodeList varNodeList = varsNode.getChildNodes();
					for(int i = 0; i < varNodeList.getLength(); ++i)
					{
						Node varNode = varNodeList.item(i);
						if(varNode.getNodeName().equals("var"))
						{
							String varId = NodeManager.getAttributeString(varNode, "name");
							double minVar = Double.parseDouble(NodeManager.getNodeStringByPath(varNode, "min"));
							double maxVar = Double.parseDouble(NodeManager.getNodeStringByPath(varNode, "max"));
							map.put(varId, new Var(varId, minVar, maxVar, 1));
						}
					}
					String formulas = NodeManager.getNodeStringByPath(node, "itemproc_extension/calculated/formulas/formula");
					textString += "["+formulas+"]";
					Equation eq = new Equation(formulas,map);
					EquationQuestion eqQuestion = new EquationQuestion(eq,textString);
					eqQuestion.generateAquestion();
					
					displayableList.add(eqQuestion);
				}
			}
			else if(type == essay_question)
			{
				if(textString != null)
				{
					displayableList.add( new Text(textString));
					displayableList.add(new Essay());
				}
			}
			else if(type == file_upload_question)
			{
				if(textString != null)
				{
					displayableList.add( new Text(textString));

					displayableList.add( new FileUpload());
				}
			}
			else if(type == textOnlyQuestion)
			{
				if(textString != null)
				{
					displayableList.add( new Text(textString));
				}
			}
		}
		displayableList.add(new Text("<br><br>"));
		QuestionContainer qc = new QuestionContainer(title,displayableList);
		return qc;
	}
}
