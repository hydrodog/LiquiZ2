
/**
 * Holds the SVG Markups for drawing a resistor
 *
 * @author  Rafael Bezerra
 * @constructor
 * @extends {BaseSymbol}
 * @this {Resistor}
 */
function Resistor(){
    BaseSymbol.call(this);
    this.symbol.width = 150;
    this.symbol.height = this.symbol.width/2;

    var symbol = this.buildElement();
    var port_left = this.constructPort(8.750263, 75, symbol);
    var port_right= this.constructPort(144.24972, 75, symbol);

    var group = SVG.groupElements([
        symbol,
        port_left.getElement(),
        port_right.getElement()
    ]);

    this.constructElement(group, symbol);
}
Resistor.prototype = Object.create(BaseSymbol.prototype);
Resistor.prototype.constructor = Resistor;
Resistor.__super__ = BaseSymbol.prototype;



/**
 * Builds the inner SVG symbols, without ports or controls.
 * This method is called in the constructor of the class.
 *
 * @return {HTMLElement}  The inner SVG markup that represents
 * the symbol wrapped in a <g> tag
 */
Resistor.prototype.buildElement = function () {
    // resistor
    var path = SVG.buildElement(
        'path',
        {
            'd': 'm6.722108,74.998977l34.945265,0l5.82694,-11.65388l11.65388,23.309806l11.645693,-23.309806l11.645693,23.309806l11.65388,-23.309806l11.65388,23.309806l5.8208,-11.655926l34.963685,0',
            'fill': 'none',
            'stroke': '#000000',
            'stroke-width':2,
            'stroke-linejoin':'bevel',
            'follow-scale': true,
        },
        {
        }
    );
    // transparent background
    var rect = SVG.buildElement(
        'rect',
        {
            x: 39.053042,
            y: 58.821528,
            width: 74.894852,
            height: 32.356944,
            // opacity: .5,
            // fill: '#888',
            // 'follow-scale': true
        },
        {
            opacity: .5,
            fill: '#888',
            'follow-scale': true,
            'cursor': 'move',
        }
    );


    // '.body': { fill: 'none', stroke: '#000000', 'stroke-width':2, 'stroke-linejoin':'bevel', 'follow-scale': true},
    // '.body-bg': { x: 24, y: 6.938, opacity: .5, fill: '#888', width: 31.75, height: 16.125, 'follow-scale': true},
    return SVG.groupElements([path, rect],
    {
        'transform': 'scale(1.0)'
    });
};

var shapes = shapes || {};
shapes.circuits = shapes.circuits || {
    Resistor: Resistor,
};
