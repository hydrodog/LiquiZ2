/**
An image with mutable content that can be clicked or moved,
and lines drawn between hotpoints of child nodes.
@todo make areas in which nodes will snap to one or more axis.
Those areas should be either fixed or generated based on the 
current state of the image.
@author ...

@constructor
@this {MutableImage}
@param {number} width The desired width
@param {number} height The desired height
@param {function} onchange The onchange callback.

@property {HTMLDivElement} container The container in which the image is held.
@property {HTMLCanvasElement} canvas The canvas to be rendered to.
@property {Context} ctx The canvas context to be rendered to.
@property {array} nodes The set of renderable nodes.
@property {object} value The save-able value of the image.
@property {funcion} onchange A callback for when the value changes.
@property {number} width The current width
@property {number} height The current height
@property {number} threshold The distance that turns a click into a drag.
*/
function MutableImage(width, height, onchange) {
	this.container = Util.div();
	this.canvas = Util.canvas();
	this.ctx = this.canvas.getContext("2d");
	this.nodes = [];
	this.setDimensions(width, height);
	this.onchange = onchange;
	this.threshold = 10;
}

/**
Render all nodes to the context.
Must not transform the coordinates of the context.

*/
MutableImage.prototype.draw = function () {};

/**
MouseDown bound event, starts drag. Determines clicked
object. Sets clicked object as target, passes relevant
event info (coordinates) to target onDown.

@this {MutableImage}
@param {event} e The passed event.
*/
MutableImage.prototype.onDown = function (e) {};

/**
MouseMove bound event, updates drag. Passes relevant
event info (coordinates) to target onMove. 

@this {MutableImage}
@param {event} e The passed event.
*/
MutableImage.prototype.onMove = function (e) {};

/**
MouseUp bound event, ends drag. Determines Whether event
set was drag or click. Passes relevant
event info (none) to target onUp. 

@this {MutableImage}
@param {event} e The passed event.
*/
MutableImage.prototype.onUp = function (e) {};

/**
Method to change this.value to proper value and
call onchange callback.
*/
MutableImage.prototype.valueChanged = function () {};

/**
Method to change the current dimensions
*/
MutableImage.prototype.setDimensions = function (width, height) {
	this.width = width;
	this.height = height;
};

/**
Method to get the topmost node from a point.

@return {MutableImage.Node} node at point.
*/
MutableImage.prototype.nodeAt = function (x, y) {};


//=================================================================

/**
@author ...

@constructor
@this {MutableImage.Node}
@property {number} x The origin point (upper left) x to be drawn at.
@property {number} y The origin point (upper left) y to be drawn at.
@property {number} width The width of the node.
@property {number} height The height of the node.
@property {array} hotpoints The points to which lines can be connected.
*/
MutableImage.Node = function (x, y, width, height, hotpoints) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.hotpoints = hotpoints;
};

/**
Draws the node to a context. Calls drawHotpoints when finished.
Must not transform the coordinates of the context.

@virtual
*/
MutableImage.Node.prototype.draw = function (ctx) {};

/**
Draws the hotpoints owned by this node to a context.
Must not transform the coordinates of the context.

*/
MutableImage.Node.prototype.drawHotpoints = function (ctx) {};

/**
Gets current node state, including connections, value,
and any other pertinent info.

@virtual
*/
MutableImage.Node.prototype.valueOf = function () {};

/**
Predicate whether point x, y is in node.

@param {number} x Point.x
@param {number} y Point.y
@return {boolean} is inside node.
*/
MutableImage.Node.prototype.isInNode = function (x, y) {};

/**
Determines whether to interact with / move node or
to draw a line from hotpoints.

For line drawing, onDown will initialize a line
using a temporarily created hotpoint as the other end.

@this {MutableImage.Node}
@param {event} e The passed event.
*/
MutableImage.Node.prototype.onDown = function (e) {};

/**
Determines whether to interact with / move node or
to draw a line from hotpoints.

If drawing a line, move the temporary endpoint by the
delta position change. If moving the node, move own hotspots.
This will also in effect move lines connected to hotspots.

@this {MutableImage.Node}
@param {event} e The passed event.
*/
MutableImage.Node.prototype.onMove = function (e) {};

/**
Determines whether to interact with / move node or
to draw a line from hotpoints.

@this {MutableImage.Node}
@param {event} e The passed event.
*/
MutableImage.Node.prototype.onUp = function (e) {};

/**
What to do when the object is clicked
@virtual
*/
MutableImage.Node.prototype.interact = function () {};

/**
@author ...

@constructor
@this {MutableImage.Shape}
@property {array} points Set of points to be drawn to make shape.
@property {string} label The label, or title text of the shape. 
*/
MutableImage.Shape = function (x, y) {
	var width = null; //TODO: compute from points
	var height = null; //TODO: compute from points
	MutableImage.Node.call(this, x, y, width, height);
};

Util.subClass(MutableImage.Node, MutableImage.Shape);

/**
Draws the shape to a context.
Must not transform the coordinates of the context.

*/
MutableImage.Shape.prototype.draw = function (ctx) {};

/**
@author ...

@constructor
@this {MutableImage.Hotpoint}
@property {array} lines The set of lines connected to this hotpoint
@property {number} x The center x coordinate of this hotpoint.
NOTE this is different than parent's non-centered coords.
@property {number} y The center y coordinate of this hotpoint. 
NOTE this is different than parent's non-centered coords.
*/
MutableImage.Hotpoint = function (x, y) {
	this.x = x;
	this.y = y;
	this.lines = [];
};

/**
Draws the hotpoint to a context, then draw lines whose ownership == this
Must not transform the coordinates of the context.

*/
MutableImage.Hotpoint.prototype.draw = function (ctx) {};

/**
Disconnects all lines from the hotpoints connected to it so that the node
can be deleted.
*/
MutableImage.Hotpoint.prototype.disconnect = function (ctx) {};

/**
The basic line simply a connection of two points.
@todo More line types, including bezier curves or connections
made of only horizontal or verticle lines.
@author ...

@constructor
@this {MutableImage.Line}
@property {MutableImage.Hotpoint} owner The hotpoint which has
permission to draw the line to the context. There can only be one, as
it would be undesireable to have the line drawn twice on accident.
@property {number} target The hotpoint which does not have permission
to draw the line and forms the endpoint of the line.
*/
MutableImage.Line = function (x, y, owner, target) {
	this.x = x;
	this.y = y;
	this.lines = [];
	this.owner = owner;
	this.target = target;
};

/**
Draws the hotpoint to a context, then draw lines whose ownership == this
Must not transform the coordinates of the context.

*/
MutableImage.Line.prototype.draw = function (ctx) {};

