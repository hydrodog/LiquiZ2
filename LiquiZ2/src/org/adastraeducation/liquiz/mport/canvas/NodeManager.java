package org.adastraeducation.liquiz.mport.canvas;

import org.w3c.dom.Attr;
import org.w3c.dom.Comment;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class NodeManager {

	public static String getAttributeString(Node root,String attr)
	{
		NamedNodeMap map = root.getAttributes();  
		if(map != null)
		{
			Node node1 = map.getNamedItem(attr);
			if(node1 != null)
			{
				return node1.getNodeValue();
			}
		}
		return null;
	}
	
	public static String getNodeStringByPath(Node root,String str)
	{
		String list[] = str.split("/");
        NodeList children = root.getChildNodes();
        Node node = root;
		for(int i = 0; i < list.length; ++i)
		{
			String name = list[i];
	        for(int j = 0; j < children.getLength(); j++)  
	        {  
	           node = children.item(j);
	            //System.out.println(node.getNodeName() + " " + node.getNodeValue());
	           String s = node.getNodeName();
	            if(s.equals(name))
	            {
            		children = node.getChildNodes();
	            }
	        }
		}
		if(node != null && children.getLength() > 0)
		{
			return children.item(0).getNodeValue();
		}
		return null;
	}


	public static Node getNodeByPath(Node root, String path)
	{
		NodeList children = root.getChildNodes();
		String list[] = path.split("/");
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
	

    public static void parseElement(Node element)  
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
