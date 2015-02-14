var Singular = Singular || {
  /*
  creates and returns a text editor.
  takes {element, width, height} optionally
  */
  create:function (opts){
    opts=opts||{};
    var element = opts.element, width = opts.width || (element?element.style.width||480:480), height = opts.height || (element?element.style.height||320:320);
    if(!element || element.localName.toUpperCase()!="DIV"){
      var newElement = document.createElement("DIV");
      if(element)
        element.parentNode.replaceChild(element,newElement);
      element=newElement;
    }
    element.isEditingHTML=false;
    element.classList.add("singular");
    var noCopy = {"create":true};
    for(var prop in this){
      if(!noCopy[prop])
        element[prop]=this[prop];
    }
    if(typeof height == "number"){
      height -=32;
      height += "px";
    }
    var holdWidth=width;
    if(typeof width == "number"){
      width += "px";
    }
        var IDs = opts.buttons||["STRIKE","X","B","I","U","CODE","LEFT","CENTER","RIGHT","JUSTIFY","SUP","SUB","IMG","VIDEO","HTML"];
    
    var buttonCSS="display:inline-block;width:32px;height:32px;border-width:0px;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:url(./assets/img/singular.png) no-repeat;background-size:128px 128px;";
    var singularButtonContainerCSS="width:"+width+";background-color:#097F9D;height:"+(32*Math.ceil((IDs.length*32)/(holdWidth-holdWidth%32)))+"px;";
    var singularEditingAreaCSS="width:"+width+";height:"+height+";background-color:#ffffff;overflow-y:scroll;";
    var singularButtonContainer = document.createElement("DIV");
    singularButtonContainer.id="singular-button-container";
    element.appendChild(singularButtonContainer);
    singularButtonContainer.setAttribute("style",singularButtonContainerCSS);
    element.singularButtonContainer=singularButtonContainer;
    
    var singularEditingArea = document.createElement("DIV");
    singularEditingArea.id="singular-editing-area";
    element.appendChild(singularEditingArea);
    singularEditingArea.contentEditable=true;
    singularEditingArea.setAttribute("style",singularEditingAreaCSS);
    
    element.singularEditingArea=singularEditingArea;
    /*singularEditingArea.addEventListener("keyup",function(){
    element.undoTimeout=setTimeout(function(){
    element.undoHistory.push(element.singularEditingArea.innerHTML);
    element.undoSize+=element.singularEditingArea.innerHTML.length;
  },1000);
  });
    element.undoHistory=[""];
    element.undoSize=0;
    element.undoTimeout=null;*/
    var backgroundPositionById={
      "X":"-0px -96px",
      "B":"-32px 0px",
      "I":"-64px 0px",
      "U":"-96px 0px",
      "CODE":"-32px -64px",
      "LEFT":"-0px -32px",
      "CENTER":"-32px -32px",
      "RIGHT":"-64px -32px",
      "JUSTIFY":"-96px -32px",
      "SUP":"-64px -64px",
      "SUB":"-96px -64px",
      "IMG":"-32px -96px",
      "VIDEO":"-64px -96px",
      "HTML":"0px -64px"
    };
    var FunctionById = {
      "STRIKE":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('S');
      },
      "X":function(){
        if(!element.isEditingHTML)
          element.clearFormatting();
      },
      "B":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('B');
      },
      "I":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('I');
      },
      "U":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('U');
      },
      "CODE":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('CODE');
      },
      "LEFT":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('DIV','text-align','left',true);
      },
      "CENTER":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('DIV','text-align','center',true);
      },
      "RIGHT":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('DIV','text-align','right',true);
      },
      "JUSTIFY":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('DIV','text-align','justify',true);
      },
      "SUP":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('SUP');
      },
      "SUB":function(){
        if(!element.isEditingHTML)
          element.replaceSelectedText('SUB');
      },
      "IMG":function(){
        if(!element.isEditingHTML){
          var src = prompt("Image Source URL?","http://");
          if(src && src.length > 7)
            element.insert('IMG','src',src);
        }
      },
      "VIDEO":function(){
        if(!element.isEditingHTML){
          var src = prompt("Video Source URL?","http://");
          if(src && src.length > 7)
            this.insert('VIDEO','src',src);
        }
      },
      "HTML":function(){
        element.isEditingHTML=!element.isEditingHTML;
        if(element.isEditingHTML){
          element.singularEditingArea.textContent=element.singularEditingArea.innerHTML;
        }else{
          element.singularEditingArea.innerHTML=element.singularEditingArea.textContent;
        }
        var children = element.singularButtonContainer.childNodes;
        for(var i = 0; i < children.length; i++){
          if(children[i]!==this)
            children[i].style.visibility = element.isEditingHTML?"hidden":"visible";
        }
        element.singularEditingArea.setAttribute("textis",element.isEditingHTML?"HTML":"TEXT");
        element.style.fontFamily=element.isEditingHTML?"Monospace":undefined;
      }
    };
            element.singularEditingArea.setAttribute("textis",element.isEditingHTML?"HTML":"TEXT");

    for(var ID in IDs){
      var button = document.createElement("DIV");
      button.id="singular-button-"+IDs[ID];
      button.setAttribute("style",buttonCSS+(backgroundPositionById[IDs[ID]]?"background-position:"+backgroundPositionById[IDs[ID]]+";":""));
      button.addEventListener("click",FunctionById[IDs[ID]]);
      singularButtonContainer.appendChild(button);
    }
    return element;
  },
  /*
  set or get html value
  */
  val:function (value){
    if(arguments.length>0){
      if(this.isEditingHTML){
        this.singularEditingArea.textContent=value;
      }else{
        this.singularEditingArea.innerHTML=value;
      }
    }else{
      if(this.isEditingHTML){
        return this.singularEditingArea.textContent;
      }else{
        return this.singularEditingArea.innerHTML;
      }
    }
  },
  /*
  returns node of type or false from parent nodes
  */
  testForType:function (node,nodeType,endCase){
    var parent = node.parentNode;
    if(parent && parent !== node && node != endCase){
      if(node.localName && node.localName.toUpperCase()==nodeType){
        return node;
      }else{
        return this.testForType(parent,nodeType,endCase);
      }
    }else{
      return false;
    }
  },
  /*
  returns closest parent node of type, or the node itself
  */
  getLowestType:function (node,nodeType,endCase){
    var parent = node.parentNode;
    if(parent !== node && parent != endCase){
      if(node.localName && node.localName.toUpperCase()==nodeType){
        return node;
      }else{
        return this.getLowestType(parent,nodeType,endCase);
      }
    }else{
      return node;
    }
  },
  /*
  returns furthest node of type, or the node itself
  */
  getHighestType:function (node,nodeType,endCase,baseNode){
    var parent = node.parentNode;
    if(parent !== node && parent != endCase){
      if(node.localName && node.localName.toUpperCase()==nodeType){
        return this.getHighestType(parent,nodeType,endCase,node);
      }else{
        return this.getHighestType(parent,nodeType,endCase,baseNode);
      }
    }else{
      return baseNode;
    }
  },
  /*
  focuses and selects a range within the editor
  */
  focusRange:function (sel,range){
    this.singularEditingArea.focus();
    sel.removeAllRanges();
    sel.addRange(range);
  },
  /*
  stylizes selected text
  */
  replaceSelectedText:function (elemType,css,style,changehighest) {
    var sel, range;
    
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        var endCase=this.singularEditingArea;
        range = sel.getRangeAt(0);
        if(this.isRangeAChild(range)){
          
          if(!changehighest){
            var node = this.testForType(range.startContainer,elemType,endCase);
            if(!node){
              if(!range.collapsed){
                var toreplace=document.createElement(elemType);
                
                toreplace.appendChild(range.extractContents());
                
                range.insertNode(toreplace);
                range.setStart(toreplace,0);
                range.setEnd(toreplace,toreplace.childNodes.length);
                if(css && style)
                  toreplace.style[css]=style;
                this.focusRange(sel,range);
              }else{
                this.insert(elemType,false,false,true);
              }
            }else if(node != endCase){
              this.clearFormatting(elemType);
            }
          }else{
            var parent = this.getLowestType(range.startContainer,elemType,endCase);
            if(parent!=endCase && parent.localName && parent.localName.toUpperCase()==elemType){
              if(css && style)
                parent.style[css]=style;
              range.selectNodeContents(parent);
            }else{
              var replacement=document.createElement(elemType);
              var Super = parent.parentNode;
              var children = Super.childNodes;
              var nodeIndex=this.getNodeIndex(Super, parent);
              while((!children[nodeIndex].localName || children[nodeIndex].localName.toUpperCase()!=elemType) && nodeIndex--);
              nodeIndex++;
              
              var firstTime=true,textNode=document.createTextNode("a");
              while(nodeIndex < children.length && (!children[nodeIndex].localName || children[nodeIndex].localName.toUpperCase()!=elemType)){
                if(firstTime){
                  firstTime=false;
                  replacement.appendChild(Super.replaceChild(textNode,children[nodeIndex]));
                  nodeIndex++;
                }else{
                  replacement.appendChild(Super.removeChild(children[nodeIndex]));
                }
              }
              
              Super.replaceChild(replacement,textNode);
              if(css && style)
                replacement.style[css]=style;
              range.selectNodeContents(replacement);
              
            }
            this.focusRange(sel,range);
          }
        }
      }
    }
    
    
  },
  /*
  inserts an element of type at range
  */
  insert:function (elemType,attr,attrVal,shouldEnter,insertAfter){
    var sel, range;
    
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if(this.isRangeAChild(range)){
          range.deleteContents();
          var toreplace=document.createElement(elemType);
          if(attr&&attrVal)
            toreplace[attr]=attrVal;
          
          range.insertNode(toreplace);
          if(shouldEnter){
            toreplace.innerHTML="&nbsp;";
            range.selectNode(toreplace);
          }else{
            range.setStart(toreplace,0);
            range.setEnd(toreplace,toreplace.childNodes.length);
          }
          
          this.focusRange(sel,range);
          
        }
      }
    }
  },
  /*
  makes sure we only run changes if range is inside of editor
  */
  isRangeAChild:function (range){
    var has = this.hasParent(range.commonAncestorContainer,this);
    if(!has)
      console.log("Singular will not modify content outside of itself!!!");
    return has;
  },
  /*
  checks if searchFor is an ancestor of child
  */
  hasParent:function (child,searchFor){
    var parent = child.parentNode;
    if(child == searchFor)
      return true;
    else if(parent && child != parent)
      return this.hasParent(parent,searchFor);
    else
      return false;
  },
  /*
  clears format of selected text
  */
  clearFormatting:function (onlyfromtype) {
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if(this.isRangeAChild(range)){
          var isCollapsed=range.collapsed;
          var textNode = isCollapsed?document.createElement("SPAN"):document.createTextNode( range.toString() );
          if(isCollapsed)
            textNode.innerHTML="&nbsp;";
          range.deleteContents();
          range.insertNode(textNode);
          this.splitNode(textNode.parentNode,textNode,this.singularEditingArea,onlyfromtype);
          range.selectNodeContents(textNode);
          this.focusRange(sel,range);
        }
      }
    }
    
  },
  /*
  splits node around range
  */
  splitNode:function (parent,textNode,finalCase,onlyfromtype){
    if(finalCase!=parent){
      var doc = parent.ownerDocument;
      var leftRange = doc.createRange();
      var nodeIndex =this.getNodeIndex(parent,textNode);
      leftRange.setStart(parent, 0);
      leftRange.setEnd(parent, nodeIndex);
      var left = leftRange.extractContents();
      
      var leftParent = parent.cloneNode(false);
      leftParent.appendChild(left);
      parent.parentNode.insertBefore(leftParent, parent);
      if(!onlyfromtype || parent.localName.toUpperCase()==onlyfromtype){
        parent.parentNode.insertBefore(parent.removeChild(textNode), parent);
        this.splitNode(parent.parentNode,textNode,finalCase,onlyfromtype);
      }else{
        this.splitNode(parent.parentNode,parent,finalCase,onlyfromtype);
      }
      
      
      
    }
  },
  /*
  returns index of node within parent
  */
  getNodeIndex:function (parent, node) {
    var index = parent.childNodes.length;
    while (index--) {
      if (node === parent.childNodes[index]) {
        break;
          }
    }
    return index;
  }
  
};
