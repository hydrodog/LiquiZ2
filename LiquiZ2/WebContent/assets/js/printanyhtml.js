var MAX_SPLIT_SIZE = null;
/**
@author Stephen Oro

@constructor
@this {PrintNode}
@param {number} x The x coordinate of the node.
@param {number} y The y coordinate of the node.
@param {number} width The current width of the node.
@param {number} height The current height of the node.
@param {number} offsetX The x coordinate of the node offset.
@param {number} offsetY The y coordinate of the node offset.
@param {object} style The styling information relevant to rendering.

@property {number} x The x coordinate of the node.
@property {number} y The y coordinate of the node.
@property {number} width The current width of the node.
@property {number} height The current height of the node.
@property {number} offsetX The x coordinate of the node offset.
@property {number} offsetY The y coordinate of the node offset.
@property {object} style The styling information relevant to rendering.
@property {array} children The children of the node to render.
@property {PrintNode} parent The parent node.
*/
function PrintNode(x, y, width, height, offsetX, offsetY, style) {
  this.x = x;
  this.y = y + offsetY;
  this.width = width;
  this.height = height;
  this.offsetX = offsetX;
  this.offsetY = 0;
  this.style = style;
  this.children = [];
  this.parent = null;
}

/**
Render this node and all children within the bounding y values
onto the jsdoc.

@param {JSDoc} jsdoc The jsdoc to render to.
@param {number} start The starting height to be rendered.
@param {number} end The ending height to be rendered to.
*/
PrintNode.prototype.render = function (jsdoc, start, end) {
  var rect = this.renderRect(start, end);
  if (!rect)
    return;
  //  console.log(this.children);
  var d = this.style.borderColor;
  var f = this.style.backgroundColor;
  var str = "";
  var fill = false;
  var stroke = false;
  if (f.a > 0) {
    fill = true;
    jsdoc.setFillColor(f.r, f.g, f.b);
  }
  if (d.a > 0) {
    stroke = true;
    jsdoc.setFillColor(f.r, f.g, f.b);
  }
  var line = false;


  if (d.a > 0) {
    jsdoc.setDrawColor(d.r, d.g, d.b);
    var line = this.style.border.top || this.style.border.right || this.style.border.bottom || this.style.border.left;
    var r = this.style.radius.rad;

    jsdoc.setLineWidth(line);
    var lines = [];
    var k = 0.552228474;
    var currentLine = [];
    var startingPos = null;
    var radius = this.style.radius;
    var currentPosition = [0, 0];
    var border = this.style.border;

    if (fill) {
      var bez = new BezierRect(rect.x, rect.y, rect.width, rect.height, [radius.top, radius.right, radius.bottom, radius.left], [1, 1, 1, 1]);

      for (var i = 0; i < bez.lines.length; i++) {
        jsdoc.lines(bez.lines[i].lines, bez.lines[i].x, bez.lines[i].y, [1, 1], "F");
      }
    }
    if (stroke) {
      var bez = new BezierRect(rect.x, rect.y, rect.width, rect.height, [radius.top, radius.right, radius.bottom, radius.left], [border.top, border.right, border.bottom, border.left]);
      for (var i = 0; i < bez.lines.length; i++) {
        jsdoc.lines(bez.lines[i].lines, bez.lines[i].x, bez.lines[i].y, [1, 1], "D");
      }
    }



  }


  for (var i = 0; i < this.children.length; i++) {
    this.children[i].render(jsdoc, start, end);
  }
};

/**

@param {number} start The starting height to be rendered.
@param {number} end The ending height to be rendered to.

@return the bounding rect of the rectangle or null if DNE
*/
PrintNode.prototype.renderRect = function (start, end) {
  if (this.y + this.height < start)
    return null;
  if (this.y > end)
    return null;
  var x = this.x,
    y = this.y,
    width = this.width,
    height = this.height;
  if (y < start) {
    y = start - 10;
    height -= y - this.y;
  }
  if (y + height > end) {
    height = end - y + 10;
  }
  y -= start;
  //console.log("(" + x + "," + y + ") (" + width + "," + height + ")");
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

/**
Grows the height of a parent element and self by delta y
*/
PrintNode.prototype.extendHeight = function (delta) {
  this.height += delta;
  this.offsetY += delta;
  if (this.parent && this.parent != this) {
    this.parent.extendHeight(delta);
  }
};


/**
Shifts by delta y so that we don't cut awkwardly on pages
*/
PrintNode.prototype.shiftDeltaY = function (delta) {
  this.y += delta;
  if (this.parent && this.parent != this) {
    this.parent.extendHeight(delta);
  }
};

/**
@author Stephen Oro

@constructor
@this {PrintImgNode}
@extends {PrintNode}

@property {HTMLElement} img The image to be rendered.
*/
function PrintImgNode(x, y, width, height, img, offsetY) {
  this.x = x;
  this.y = y + offsetY;
  this.width = width;
  this.height = height;
  this.img = img;
  this.children = [];
  this.parent = null;
}
Util.subClass(PrintNode, PrintImgNode);

/**
Renders an image onto the jsdoc.
@param {JSDoc} jsdoc the document to draw onto.
@param {number} start The starting height to be rendered.
@param {number} end The ending height to be rendered to.
*/
PrintImgNode.prototype.render = function (jsdoc, start, end) {
  var rect = this.renderRect(start, end);
  if (!rect) {
    return;
  }
  if (rect.y < 0) {
    jsdoc.addImage(this.img, rect.x, rect.y - this.height + rect.height);
  } else {
    jsdoc.addImage(this.img, rect.x, rect.y);
  }
};

/**
@author Stephen Oro

@constructor
@this {PrintTextNode}
@extends {PrintNode}

@property {array} children The lines of text to render.
*/
function PrintTextNode(x, y, width, height, offsetX, offsetY, style) {
  PrintNode.call(this, x, y, width, height, offsetX, offsetY, style);
}

Util.subClass(PrintNode, PrintTextNode);

/**
Renders an image onto the jsdoc.
@param {JSDoc} jsdoc the document to draw onto.
@param {number} start The starting height to be rendered.
@param {number} end The ending height to be rendered to.
*/
PrintTextNode.prototype.render = function (jsdoc, start, end) {
  var rect = this.renderRect(start, end);
  if (!rect)
    return;
  var d = this.style.foregroundColor;
  if (d.a > 1) {


    jsdoc.setTextColor(d.r, d.g, d.b);
  }


  //console.log(this.style.fontFamily +":"+ this.style.fontStyle);
  jsdoc.setFont(this.style.fontFamily, this.style.fontStyle);
  jsdoc.setFontSize(parseFloat(this.style.fontSize));
  var height = jsdoc.getTextDimensions("|").h;
  for (var y = 0; y < this.children.length; y++) {
    jsdoc.text(this.children[y], rect.x, y * height + rect.y + height * 2 / 3);
  }
  //jsdoc.addImage(this.img, rect.x, rect.y);
};

/**
@author Stephen Oro

@constructor
@this {PagePrinterV2}
@property {jsPDF} doc The JSPDF document to render to.
@property {jsPDF} scale The JSPDF document scale.
@property {number} pageWidth The current width of the page in px.
@property {number} pageHeight The current height of the page in px.
@property {array} The context stack for rendering a document

*/
function PagePrinterV2() {
  this.doc = new jsPDF('p', 'pt', [768, 1086]);
  this.scale = this.doc.internal.scaleFactor;
  this.pageHeight = this.scale * this.doc.internal.pageSize.height;
  this.pageWidth = this.scale * this.doc.internal.pageSize.width;
  if(MAX_SPLIT_SIZE === null)
    MAX_SPLIT_SIZE = this.pageHeight;
  this.nodeDocument = null;
  this.currentNode = null;
  this.printingCursor = null;
  this.hasBeenRendered = false;
  this.isPre = false;
  this.pageOffsetKeep = 0;
  this.offsetY = 0;
};

/**
Renders the document to a pdf and downloads the pdf.
*/
PagePrinterV2.prototype.print = function (ele) {
  var printer = new PagePrinterV2();
  document.body.parentElement.style.width = "768px";
  if (ele) {
    this.nodeDocument = null;
    this.currentNode = null;
    this.hasBeenRendered = false;
    this.prepare(ele);
  }
  document.body.parentElement.style.width = null;
  if (!this.hasBeenRendered) {

    for (var y = 0; y < this.nodeDocument.height; y += this.pageHeight) {
      this.nodeDocument.render(this.doc, y, y + this.pageHeight);
      if (y + this.pageHeight < this.nodeDocument.height) {
        this.doc.addPage();
      }
    }
    this.hasBeenRendered = true;
  }
  this.doc.save();
};

/**
Prepares the printer to print an element.

@param {HTMLElement} element The element to be printed.
*/
PagePrinterV2.prototype.prepare = function (element) {
  var key = "prepare_" + element.nodeName.toLowerCase().replace(/\#/g, "_");
  if (this[key]) {
    var node = this[key](element);
    return node;
  } else {
    //    console.log(key);
    return this.generallyPrep(element);
  }
};

/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare_head = function (element) {};

/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare_input = function (element) {

  var printNode = this.generallyPrep(element);
  if (printNode && element.type != "radio" && element.type != "checkbox"){
    printNode.children.push(this.textInBox(printNode, element.value));
  }else if(printNode){
    var borderWidth = 1;
    var radius = 0;
    if(element.type == "radio")
      radius = printNode.width/2;
    printNode.style.borderColor = htmlToRGBA("#000");
    printNode.style.radius.rad = radius;
    printNode.style.radius.top = radius;
    printNode.style.radius.right = radius;
    printNode.style.radius.bottom = radius;
    printNode.style.radius.left = radius;
    
    printNode.style.border.top = borderWidth;
    printNode.style.border.right = borderWidth;
    printNode.style.border.bottom = borderWidth;
    printNode.style.border.left = borderWidth;
  }
  
  return printNode;
};

/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare__comment = function (element) {
  console.log(element);
};

/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare_br = function (element) {};


/**
Calls prep generallyPrep and sets mode to pre
*/
PagePrinterV2.prototype.prepare_pre = function (element) {
  var oldIsPre = this.isPre;
  this.isPre = true;
  var printNode = this.generallyPrep(element);
  this.isPre = oldIsPre;
  return printNode;
};

/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare_select = function (element) {

};


/**
Prepares a textarea for printing
*/
PagePrinterV2.prototype.prepare_textarea = function (element) {
  var printNode = this.generallyPrep(element);
  printNode.children.push(this.textInBox(printNode, element.value));
  return printNode;
};

PagePrinterV2.prototype.textInBox = function (printNode, text) {
  var x = 0;
  var y = 0;
  var lines = text.split(/\n/g);
  var printNode = new PrintTextNode(printNode.x, printNode.y, printNode.width, printNode.height, 0, 0, printNode.style);
  printNode.parent = this.currentNode;
  for (var l = 0; l < lines.length; l++) {
    var line = lines[l];
    var words = line.split(/\s/g);
    var currentString = "";
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      var width = this.doc.getTextDimensions(word).w;
      if (width > printNode.width) {
        printNode.children.push(currentString);
        currentString = word;
      } else {
        currentString += " " + word;
      }
    }
    if (currentString.length > 0) {
      printNode.children.push(currentString);
    }
  }
  return printNode;
};


/**
Does nothing really.
*/
PagePrinterV2.prototype.prepare__text = function (element) {
  var orig = element;
  var text = element.textContent;
  var range = document.createRange();
  range.selectNode(element);

  var clientRect = range.getBoundingClientRect();
  range.detach(); // frees up memory in older browsers
  element = element.parentElement;
  var computedStyle = getComputedStyle(element);
  var style = styleFromComputed(computedStyle);
  var printNode = new PrintTextNode(clientRect.left + window.scrollX, clientRect.top + window.scrollY, clientRect.width, clientRect.height, 0, this.offsetY + this.pageOffsetKeep, style);
  printNode.parent = this.currentNode;

  var printingCursor = this.printingCursor;

  var dim = this.doc.getTextDimensions(text);
  var width = dim.w;
  var deltaHeight = 0;
  var ch = this.doc.getTextDimensions("|").h;
  if (width > printNode.width) {
    var timessplit = 0;
    text = text.split(/\s/g);
    var currentString = text[0].trim();
    var words = 1;
    while (words < text.length) {
      if (this.doc.getTextDimensions(currentString + text[words]).w < printNode.width) {
        currentString += " " + text[words];
        words++;
      } else {
        deltaHeight += ch;
        printNode.children.push(currentString);
        currentString = text[words];
        timessplit++;
        words++;
      }
    }
    if (currentString.length > 0) {
      printNode.children.push(currentString);
      timessplit++;
    }
    if (timessplit >= 1) {
      //this.offsetY += deltaHeight;
      //printNode.extendHeight(deltaHeight);
    }

  } else {
    printNode.children.push(text);
  }
  this.antiSplitator(printNode);
  return printNode;
};

/**
Prepares a text node.

@param {TextNode} element A html text node.
@return {PrintTextNode} a text printnode.
*/
PagePrinterV2.prototype.prepare_img = function (element) {
  var computedStyle = getComputedStyle(element);
  if (computedStyle.display == "none")
    return false;
  var clientRect = element.getBoundingClientRect();

  var printNode = new PrintImgNode(clientRect.left + window.scrollX, clientRect.top + window.scrollY, clientRect.width, clientRect.height, element, this.offsetY + this.pageOffsetKeep);
  printNode.parent = this.currentNode;

  return printNode;
};

PagePrinterV2.prototype.antiSplitator = function (printNode) {
  var comparingTo = printNode.y % this.pageHeight;
  var compareTo = printNode.height;
  if (comparingTo + compareTo > this.pageHeight) {
    if (printNode.height < MAX_SPLIT_SIZE) {
      var shiftBy = this.pageHeight + 1 - comparingTo;
      //this.pageOffsetKeep += shiftBy;
      this.offsetY += shiftBy;
      printNode.shiftDeltaY(shiftBy);
    }
  }
};


/**
Prepares the whatever node.
Prepares children.

@param {HTMLELement} element The tag element to do.
@return {PrintNode} the html printnode.
*/
PagePrinterV2.prototype.generallyPrep = function (element) {
  var computedStyle = getComputedStyle(element);
  if (computedStyle.display == "none")
    return false;
  var clientRect = element.getBoundingClientRect();
  var style = styleFromComputed(computedStyle)
  var printNode = new PrintNode(clientRect.left + window.scrollX, clientRect.top + window.scrollY, clientRect.width, clientRect.height, 0, this.offsetY + this.pageOffsetKeep, style);
  printNode.parent = this.currentNode;

  //console.log(style.position);

  printNode.style.fontHeight = this.doc.getTextDimensions("|").h;
  //console.log(printNode.style);
  var oldOffsetY = this.offsetY;
  if (style.position == "absolute")
    this.offsetY == 0;
  var oldPrintingCursor = this.printingCursor;
  if (oldPrintingCursor)
    oldPrintingCursor.nextRect(printNode);
  this.printingCursor = new PrintingCursor(printNode);
  var oldDoc = this.nodeDocument;
  var oldCurrent = this.currentNode;
  this.currentNode = printNode;
  if (!this.nodeDocument) {
    this.nodeDocument = printNode;
  }

  this.antiSplitator(printNode);

  var myOffsetY = this.offsetY,
    myOffsetYDelta = 0;
  for (var i = 0; i < element.childNodes.length; i++) {
    var childEle = element.childNodes[i];

    if (childEle.nodeName == "#text" && printNode.style.display == "inline") {
      var text = childEle.textContent;
      if (text.search(/\s/) != -1 && text.search(/[^\s]/) != -1) {
        var matches = text.match(/\s/g);
        var m = 0;
        var nexts = text.split(/\s/g);
        for (var n = 0; n < nexts.length; n++) {
          var span = Util.span();
          span.textContent = nexts[n];
          element.insertBefore(span, childEle);
          if (m < matches.length) {
            var span = Util.span();
            span.textContent = matches[m++];
            element.insertBefore(span, childEle);
          }
        }

        element.removeChild(childEle);

        childEle = null;
        i--;

      }
    }
    if (childEle) {
      if (childEle.style) {
        if (childEle.style.display == "inline") {
          myOffsetYDelta += this.offsetY - myOffsetY;
          this.offsetY = myOffsetY;
        } else {
          myOffsetY = this.offsetY; // + myOffsetYDelta?
          myOffsetYDelta = 0;
        }
      } else {
        myOffsetYDelta += this.offsetY - myOffsetY;
        this.offsetY = myOffsetY;
      }
      var child = this.prepare(childEle);
      if (child) {
        printNode.children.push(child);
        //child.parent = printNode;
      }
    }
  }
  this.offsetY = myOffsetY + myOffsetYDelta;

  if (oldDoc)
    this.nodeDocument = oldDoc;
  if (style.position == "absolute"){
    this.offsetY == oldOffsetY;
  }else{
    this.offsetY = myOffsetY + myOffsetYDelta + printNode.offsetY;
  }
  this.printingCursor = oldPrintingCursor;
  this.currentNode = oldCurrent;
  return printNode;
};


/**
The string input must be of one of the following formats:<br>
rgba([0-255],[0-255],[0-255],[0-255])<br>
rgba([0-255],[0-255],[0-255])<br>
#[0-F]{3|4|6|8}

@param {string} str The string to convert into rgba values
@return {r:[0-255], g:[0-255], b:[0-255], a:[0-255]}
*/
function htmlToRGBA(str) {
  var r = 0,
    g = 0,
    b = 0,
    a = 0;

  var i = 0;
  //console.log(str);
  if (str.indexOf("#") != -1) {
    str = str.substring(1);
    if (str.length == 3) {
      var ary = str.match(/.{1}/g);
      r = parseInt(ary[i] + ary[i], 16);
      i++;
      g = parseInt(ary[i] + ary[i], 16);
      i++;
      b = parseInt(ary[i] + ary[i], 16);
      a = 255;
    } else if (str.length == 4) {
      var ary = str.match(/.{1}/g);
      r = parseInt(ary[i] + ary[i], 16);
      i++;
      g = parseInt(ary[i] + ary[i], 16);
      i++;
      b = parseInt(ary[i] + ary[i], 16);
      i++;
      a = parseInt(ary[i] + ary[i], 16);
      i++;
    } else if (str.length == 6) {
      var ary = str.match(/.{2}/g);
      r = parseInt(ary[i], 16);
      i++;
      g = parseInt(ary[i], 16);
      i++;
      b = parseInt(ary[i], 16);
      a = 255;
    } else if (str.length == 8) {
      var ary = str.match(/.{2}/g);
      r = parseInt(ary[i], 16);
      i++;
      g = parseInt(ary[i], 16);
      i++;
      b = parseInt(ary[i], 16);
      i++;
      a = parseInt(ary[i], 16);
      i++;
    }
  } else if (str.indexOf("rgba") != -1) {
    str = str.substring(5, str.length - 1);
    var ary = str.split(",");
    r = parseInt(ary[i]);
    i++;
    g = parseInt(ary[i]);
    i++;
    b = parseInt(ary[i]);
    i++;
    a = parseInt(ary[i]) * 255;
    i++;
  } else if (str.indexOf("rgb") != -1) {
    str = str.substring(4, str.length - 1);
    var ary = str.split(",");
    r = parseInt(ary[i]);
    i++;
    g = parseInt(ary[i]);
    i++;
    b = parseInt(ary[i]);
    i++;
    a = 255;
    i++;
  }
  var ret = {
    r: r,
    g: g,
    b: b,
    a: a
  };
  //console.log(ret);

  return ret;
};


/**
Forms a {PrintNode} style from the computed style passed.

@param {Style} computedStyle The result of getComputedStyle(HTMLElement)
*/
function styleFromComputed(computedStyle) {
  var radius = computedStyle.borderRadius.split(" ");
  var rad = 0;
  for (var i = 0; i < radius.length; i++) {
    radius[i] = parseFloat(radius[i]);
    if (radius[i]) {
      rad = radius[i];
    }
  }
  var i = radius.length,
    len = radius.length;
  while (radius.length < 4) {
    radius.push(radius[(len + (i - 2) % len) % len]);
  }
  return {
    backgroundColor: htmlToRGBA(computedStyle.backgroundColor),
    borderColor: htmlToRGBA(computedStyle.borderColor),
    foregroundColor: htmlToRGBA(computedStyle.color),
    border: {
      top: parseFloat(computedStyle.borderTopWidth),
      right: parseFloat(computedStyle.borderRightWidth),
      bottom: parseFloat(computedStyle.borderBottomWidth),
      left: parseFloat(computedStyle.borderLeftWidth)
    },
    radius: {
      rad: rad,
      top: (radius[0]),
      right: (radius[1]),
      bottom: (radius[2]),
      left: (radius[3])
    },
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily,
    fontStyle: computedStyle.fontStyle,
    display: computedStyle.display,
    position: computedStyle.position
  };
}


function PrintingCursor(node) {
  this.x = node.x;
  this.y = node.y;
  this.width = node.width;
  this.height = node.height;
  this.owner = node;
}

PrintingCursor.prototype.nextRect = function (node) {
  this.x = node.x;
  this.y = node.y;
  this.width = node.width;
  this.height = node.height;
  this.owner = node;
};