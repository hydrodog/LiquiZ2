package org.adastraeducation.liquiz.mport.canvas;

import org.adastraeducation.liquiz.Course;
import org.adastraeducation.liquiz.Quiz;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class CourseLoader {
	
	public static Course loadCourse(String inputPath) throws Exception
	{
		XmlReader reader = new XmlReader(inputPath + "imsmanifest.xml");
		String courseTitle = reader.getNodeStringByPath("metadata/imsmd:lom/imsmd:general/imsmd:title/imsmd:string/");
		
		Course newCourse = new Course(courseTitle);
		Node resource = reader.getNodeByPath("resources");
		NodeList resourceList = resource.getChildNodes();
		int quizId = 1;
		for(int i = 0; i < resourceList.getLength(); ++i)
		{
			Node resourceNode = resourceList.item(i);
			if(resourceNode.getNodeName().equals("resource"))
			{
				NamedNodeMap map = resourceNode.getAttributes();  
				if(map != null)
				{
					Node node1 = map.getNamedItem("type");
					if(node1 != null)
					{
						if(node1.getNodeValue().equals("imsqti_xmlv1p2"))
						{
							Node node2 = map.getNamedItem("identifier");
							String identifier = node2.getNodeValue();
							try
							{
								System.out.println(quizId);
								Quiz quiz = QuizLoader.loadQuizFromCanvas(quizId++,inputPath+"/" + identifier,identifier);
								newCourse.addQuiz(quiz);
							}
							catch(Exception e)
							{
								e.printStackTrace();
							}
						}
					}
				}
			}
		}
		
		return newCourse;
	}
}
