package org.adastraeducation.liquiz.mport.canvas;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Attr;
import org.w3c.dom.Comment;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlReader {
	
	Element _root;
	
	public XmlReader(String str) throws Exception
	{
		readStr(str);
	}
	
	public void readStr(String str) throws Exception
	{
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();  
        DocumentBuilder db = dbf.newDocumentBuilder(); 
        File file = new File(str);

        
        Document doc = db.parse(file);
        
        _root = doc.getDocumentElement(); 
	}
	
	public Element getRoot()
	{
		return _root;
	}
	
	public Node getNodeByPath(String str)
	{
		String list[] = str.split("/");
        NodeList children = _root.getChildNodes();  
		for(int i = 0; i < list.length; ++i)
		{
			String name = list[i];
	        for(int j = 0; j < children.getLength(); j++)  
	        {  
	            Node node = children.item(j);
	            //System.out.println(node.getNodeName() + " " + node.getNodeValue());
	            if(node.getNodeName().equals(name))
	            {
	            	if(i < list.length - 1)
	            	{
	            		children = node.getChildNodes();
	        	        break;
	            	}
	            	else
	            	{
	            		return node;
	            	}
	            }
	        }
		}
		return null;
	}
	
	public String getNodeStringByPath(String str)
	{
		String list[] = str.split("/");
        NodeList children = _root.getChildNodes();
        Node node = null;
		for(int i = 0; i < list.length; ++i)
		{
			String name = list[i];
	        for(int j = 0; j < children.getLength(); j++)  
	        {  
	           Node node1 = children.item(j);
	            //System.out.println(node.getNodeName() + " " + node.getNodeValue());
	            if(node1.getNodeName().equals(name))
	            {
            		children = node1.getChildNodes();
            		node = node1;
	            }
	        }
		}
		if(node != null && children.getLength() > 0)
		{
			return children.item(0).getNodeValue();
		}
		return null;
	}
    
    public void parseElement(Element element)  
    {  
        String tagName = element.getNodeName();  
          
        NodeList children = element.getChildNodes();  
          
        System.out.print("<" + tagName);  
          
        NamedNodeMap map = element.getAttributes();  
        
        if(null != map)  
        {  
            for(int i = 0; i < map.getLength(); i++)  
            { 
                Attr attr = (Attr)map.item(i);  
                  
                String attrName = attr.getName();  
                String attrValue = attr.getValue();  
                  
                System.out.print(" " + attrName + "=\"" + attrValue + "\"");  
            }  
        }  
          
        System.out.print(">");  
          
        for(int i = 0; i < children.getLength(); i++)  
        {  
            Node node = children.item(i);
            
            short nodeType = node.getNodeType();  
              
            if(nodeType == Node.ELEMENT_NODE)  
            {
                parseElement((Element)node);  
            }  
            else if(nodeType == Node.TEXT_NODE)  
            {
                System.out.print(node.getNodeValue());  
            }  
            else if(nodeType == Node.COMMENT_NODE)  
            {  
                System.out.print("<!--");  
                  
                Comment comment = (Comment)node;  
                 
                String data = comment.getData();  
                  
                System.out.print(data);  
                  
                System.out.print("-->");  
            }  
        }  
          
        System.out.print("</" + tagName + ">");  
    }
}
