
 /**
  * Handles the draw-on-screen process and outter SVG tag. Also
  * has SVG-related common use methods.
  *
  * @author Rafael Bezerra
  * @constructor
  * @this {DrawingEngine}
  * @param  {HTMLElement} parent DOM Element in which the SVG will be drawn
  * @example
  * var svg_container = new DrawingEngine(document.body);
  */
function DrawingEngine(parent) {

    this.config = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 1000,
        height: 600,
    };

    this.__init__();

    if (parent) {
        this.setContainer(parent);
    }

}


/**
 * Initializes the object, setting the outter SVG container and the different layers
 * within it.
 *
 * Called from the constructor.
 *
 */
DrawingEngine.prototype.__init__ = function () {
    this.__layers__ = {
        links: document.createElementNS(this.config.xmlns, 'g'),
        symbols: document.createElementNS(this.config.xmlns, 'g'),
    };

    this.__svg__ = document.createElementNS(this.config.xmlns, 'svg');
    this.__svg__.setAttributeNS(null, 'viewBox', '0 0 ' + this.config.width + ' ' + this.config.height);
    this.__svg__.setAttributeNS(null, 'width', this.config.width);
    this.__svg__.setAttributeNS(null, 'height', this.config.height);
    this.__svg__.style = {display: 'block' };

    this.__svg__.appendChild(this.__layers__.links);
    this.__svg__.appendChild(this.__layers__.symbols);

    // var __this__ = this;
    // this.__svg__.oncontextmenu = function(evt) {
    //     // __this__.erase(evt.symbol);
    //     // return false;
    // };
};


/**
 * Sets the container in which the SVG will be drawn. Called from the constructor.
 *
 * @param  {type} element description
 * @throws Error('Element provided for Port constructor is not an instance of HTMLElement');
 */
DrawingEngine.prototype.setContainer = function (element) {
    if (element instanceof HTMLElement) {
        this.__parent__ = element;
        this.__parent__.appendChild(this.__svg__);
        // console.log(this.__svg__.getBoundingClientRect());
    }
    else{
        throw new Error('Element provided for Port constructor is not an instance of HTMLElement');
    }
};

/**
 * Draws BaseSymbol children classes, Ports, Links and any other SVGElement.
 *
 * @param  {object} element Any object that is an instance of BaseSymbol, Ports, Links or SVGElement.
 */
DrawingEngine.prototype.draw = function (element) {
    if (element instanceof BaseSymbol) {
        this.__layers__.symbols.appendChild(element.getElement());
    }
    else if (element instanceof Port) {
        this.__layers__.symbols.appendChild(element.getElement());
    }
    else if (element instanceof Link) {
        this.__layers__.links.appendChild(element.getElement());
    }
    else if (element instanceof SVGElement){
        this.__svg__.appendChild(element);
    }
};

/**
 * Erases BaseSymbol children classes, Ports, Links and any other SVGElement.
 *
 * @param  {object} element Any object that is an instance of BaseSymbol, Ports, Links or SVGElement.
 */
DrawingEngine.prototype.erase = function (element) {
    if (element instanceof BaseSymbol) {
        this.__layers__.symbols.removeChild(element.getElement());
    }
    else if (element instanceof Port) {
        this.__layers__.symbols.removeChild(element.getElement());
    }
    else if (element instanceof Link) {
        this.__layers__.links.removeChild(element.getElement());
    }
    else if (element instanceof SVGElement){
        this.__svg__.removeChild(element);
    }
};


/**
 * Converts a given X and Y coordinates using a SVG element as reference. This method is used for snapping
 * Links to Ports/Links, for position updates and element rotation. When linking objects, it is necessary
 * to convert the local X and Y of a Port to a global X an Y in order to set the origin point of the Link.
 *
 * @param  {SVGElement} el Instance of SVGElement
 * @param  {int} x  Original X coordinate
 * @param  {int} y  Original Y coordinate
 * @return {{x: number, y: number}}    Object containing the new coordinates.
 * @example
 * var coord = SVG.convertCoords(el, 0, 37.5);
 * console.log(coord); // Object {x: 200, y: 437.5}
 */
DrawingEngine.prototype.convertCoords = function (el,x,y) {

    var offset = this.__svg__.getBoundingClientRect();

    var matrix = el.getScreenCTM();

    return {
        x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
        y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    };

};


/**
 * Used throughout the library for creating SVG elements.
 *
 * @param  {SVGElement} name The name of the SVG tag
 * @param  {Object.<string, string>} [attrs = undefined]  A set of attributes to be added to the new SVG element
 * @param  {Object.<string, string>} [styles = undefined] A set of styles to be added to the new SVG element
 * @return {SVGElement}                    A SVG element with all the attributes and
 * styles
 * @example
 *  var el = SVG.buildElement('circle',
 *  {
 *      'cx': 8.75,
 *      'cy': 75,
 *      'r': 6,
 *  },
 *  {
 *      'fill': '#fff',
 *  });
 * @example
 * <circle cx="8.75" cy="75" r="6" style="fill: rgb(255, 255, 255);"></circle>
 */
DrawingEngine.prototype.buildElement = function(name, attrs = undefined, styles = undefined) {
    var el = document.createElementNS(this.config.xmlns, name);

    for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }

    for (var style in styles) {
        el.style[style] = styles[style];
    }

    return el;
};

/**
 * Used throughout the library for grouping SVG elements.
 *
 * @param  {SVGElement[]} children The list of SVG elements to be grouped
 * @param  {Object.<string, string>} [attrs = undefined]  A set of attributes to be added to the new SVG element
 * @param  {Object.<string, string>} [styles = undefined] A set of styles to be added to the new SVG element
 * @return {SVGElement}                    A SVG element <g> (with all the attributes and styles)
 * wrapping the given list of elements
 * @example
 *
 *  var circle = SVG.buildElement('circle');
 *  var rect =  SVG.buildElement('rect');
 *  var grouped = SVG.groupElements([circle, rect],
 *  {
 *      'transform': 'scale(1.0)'
 *  });
 * @example
 * <g transform="scale(1.0)">
 *  <circle></circle>
 *  <rect></rect>
 * </g>
 */
DrawingEngine.prototype.groupElements = function(children, attrs = undefined, styles = undefined) {
    var el = document.createElementNS(this.config.xmlns, 'g');

    for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }

    for (var style in styles) {
        el.style[style] = styles[style];
    }

    for (var child in children){
        el.appendChild(children[child]);
    }

    return el;
};


SVG = new DrawingEngine();
