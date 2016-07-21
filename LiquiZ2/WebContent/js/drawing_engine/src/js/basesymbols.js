/**
@author Rafael Nascimento Bezerra

*/

// can this be some sort of factory only


/**
 * @constant
 * @type {{a: number, b: string, c}}
 * @default
 */
Dragable.EventNames = {
    Drag: 'drag',
};

/**
 * Handles the drag-and-drop logic. This class is used by both BaseSymbol and Port
 * classes.
 *
 * @author Rafael Bezerra
 * @constructor
 * @this {Dragable}
 * @param  {SVGElement} el  SVG element that will be moved during a drag-and-drop event
 * @param  {SVGElement} ref SVG element that will be used to trigger the drag-and-drop event
 */
function Dragable(el, ref) {
    this.x = 0;
    this.y = 0;
    this.__parent__ = undefined;
    this.__svg__ = {
        g: undefined,
        ref: ref,
    };

    if (el) {
        this.__svg__.g = SVG.groupElements(
            [el],
            {
                'class': 'dragable',
            },
            undefined
        );
    }
    else {
        this.__svg__.g = SVG.buildElement(
            'g',
            {
                'class': 'dragable',
            },
            undefined
        );
    }



    this.__listeners__ = {
        mousedown: this.onMouseDown.bind(this),
        // mouseup: this.onMouseUp.bind(this),
    };

    this.__svg__.ref.addEventListener('mousedown', this.__listeners__.mousedown);
    // this.__svg__.ref.addEventListener('mouseup', this.__listeners__.mouseup);

}

Dragable.prototype.getPosition = function () {
    return {
        x: this.x,
        y: this.y,
    };
}

Dragable.prototype.setPosition = function (x, y) {
    this.x = x || this.x;
    this.y = y || this.y;

    this.__svg__.g.setAttribute('transform',
        'translate(' + this.x + ',' + this.y + ')'
    );

    const e = new Event(Dragable.EventNames.Drag);
    this.__svg__.ref.dispatchEvent(e);
};

Dragable.prototype.getElement = function () {
    return this.__svg__.g;
}

Dragable.prototype.onMouseDown = function (evt) {
    this.__listeners__ = {
        mousemove: this.onMouseMove.bind(this),
        mouseup: this.onMouseUp.bind(this),
    };

    this.__mouse_drag__ = {
        x:  this.x,
        y:  this.y,
        mX: evt.clientX,
        mY: evt.clientY,
    };

    document.addEventListener('mousemove', this.__listeners__.mousemove);
    document.addEventListener('mouseup', this.__listeners__.mouseup);
    // console.log('mouse down');
};

Dragable.prototype.onMouseUp = function (evt) {
    document.removeEventListener('mousemove', this.__listeners__.mousemove);
    this.__listeners__ = {};
    // console.log('mouse up');
};

Dragable.prototype.onMouseMove = function (evt) {
    var x = this.__mouse_drag__.x + (evt.clientX - this.__mouse_drag__.mX);
    var y = this.__mouse_drag__.y + (evt.clientY - this.__mouse_drag__.mY);
    this.setPosition(x, y);
    // console.log('mouse drag');
};



function Controls(posx, posy, onrotate = undefined, ondelete = undefined) {

    var rotateBtn = Controls.createRotateButton();
    rotateBtn.onclick = onrotate;

    this.__svg__ = {
        g: SVG.groupElements([rotateBtn], {
            'transform': 'translate(0' + posx + ', ' + posy + ')',
        }),
    };
    // this.__svg__.g.appendChild(rotateBtn);

    // this.__svg__.g.setAttributeNS(null,
    //     'transform', 'translate(0' + posx + ', ' + posy + ')'
    //     );

}

Controls.prototype.getElement = function () {
    return this.__svg__.g;
};

Controls.createRotateButton = function(){
    var el = SVG.buildElement(
        'path',
        {
            'fill': '#010101',
            'd': [
                'M2.5,11.875H0C0,16.355,3.645,20,8.125,20c4.48,0,8.125-3.645,',
                '8.125-8.125c0-4.48-3.645-8.125-8.125-8.125V0l-6.25,5l6.25,5V',
                '6.25c3.102,0,5.625,2.523,5.625,5.625S11.227,17.5,8.125,17.5S',
                '2.5,14.977,2.5,11.875z',
            ].join(''),

        },
        {
            'cursor': 'pointer'
        }
    );
    return el;
};

Link.count = 0;

/**
 * @constant
 * @type {{a: number, b: string, c}}
 * @default
 */
Link.EventNames = {
    LinkRelease: 'linkrelease',
    Move: 'linkmove',
    MouseEnter: 'linkmouseenter',
    MouseLeave: 'linkmouseleave',
};
function Link(ix, iy, fx = undefined, fy = undefined) {
    this.constructor.count++;
    this.id = this.constructor.count-1;
    var line = {
        origin: {
            x: ix,
            y: iy,
        },
        dest: {
            x: fx || ix,
            y: fy || iy,
        },
    };
    line.m = function() {
        var o = line.origin;
        var d = line.dest;
        return (d.y - o.y) / (d.x - o.x);
    };

    this.__line__ = line;
    this.__origin__ = undefined;
    this.__dest__ = undefined;
    this.__where__ = {
        overPort: false,
        overLink: false,
    }

    this.__listeners__ = {
        contextmenu: this.onContextMenu.bind(this),
        mouseenter: this.onMouseEnter.bind(this),
        mouseleave: this.onMouseLeave.bind(this),
    };


    var attrs = {
        'x1': this.__line__.origin.x,
        'y1': this.__line__.origin.y,
        'x2': this.__line__.dest.x,
        'y2': this.__line__.dest.y,
    };

    this.__svg__ = {
        view: SVG.buildElement('line', attrs,
            {
                'stroke': '#f00',
                'stroke-width': 3,
            }),
        bg: SVG.buildElement('line', attrs,
            {
                'stroke': '#000',
                'stroke-width': 15,
                'opacity': 0,
            }),
        snap_preview: SVG.buildElement('circle',
            {
                'cx': line.origin.x,
                'cy': line.origin.y,
                'r': 3,
            },
            {
                'fill': '#ff0',
                'stroke-width': 0,
                'opacity': 0,
            }
        )
    };

    this.__svg__.g = SVG.groupElements([
        this.__svg__.bg,
        this.__svg__.view,
        this.__svg__.snap_preview,
    ]);
    this.__svg__.g.addEventListener('contextmenu', this.__listeners__.contextmenu);
    this.__svg__.g.addEventListener('mouseenter', this.__listeners__.mouseenter);
    this.__svg__.g.addEventListener('mouseleave', this.__listeners__.mouseleave);
}

Link.prototype.getElement = function () {
    return this.__svg__.g;
};

Link.prototype.draw = function () {
    // console.log('link draw');
    this.__listeners__ = {
        mousemove: this.onMouseMove.bind(this),
        mouseup: this.onMouseUp.bind(this),
        contextmenu: this.onContextMenu.bind(this),
        portmouseenter: this.onMouseEnterPort.bind(this),
        portmouseleave: this.onMouseLeavePort.bind(this),
        linkmouseenter: this.onMouseEnterLink.bind(this),
        linkmouseleave: this.onMouseLeaveLink.bind(this),
    };

    SVG.draw(this);
    document.addEventListener('mousemove', this.__listeners__.mousemove);
    document.addEventListener('mouseup', this.__listeners__.mouseup);
    // document.addEventListener('contextmenu', this.__listeners__.contextmenu);
    document.addEventListener(Port.EventNames.MouseEnter, this.__listeners__.portmouseenter);
    document.addEventListener(Port.EventNames.MouseLeave, this.__listeners__.portmouseleave);
    document.addEventListener(Link.EventNames.MouseEnter, this.__listeners__.linkmouseenter);
    document.addEventListener(Link.EventNames.MouseLeave, this.__listeners__.linkmouseleave);
};

Link.prototype.setOrigin = function (vetex) {
    if (vetex instanceof Port){
        if (this.__listeners__.originmove) {
            var el = this.__origin__.getElement();
            el.removeEventListener(Port.EventNames.Move, this.__listeners__.originmove);
        }

        this.__origin__ = vetex;
        var el = this.__origin__.getElement();

        this.__listeners__.originmove = this.onOriginChange.bind(this);
        el.addEventListener(Port.EventNames.Move, this.__listeners__.originmove);
    }
};

Link.prototype.setDest = function (vetex) {
    if (vetex instanceof Port){
        if (this.__listeners__.destmove) {
            var el = this.__dest__.getElement();
            el.removeEventListener(Port.EventNames.Move, this.__listeners__.destmove);
        }

        this.__dest__ = vetex;
        var el = this.__dest__.getElement();

        this.__listeners__.destmove = this.onDestChange.bind(this);
        el.addEventListener(Port.EventNames.Move, this.__listeners__.destmove);
    }
};

Link.prototype.buildNewAnchor = function (x, y) {
    var anchor = SVG.buildElement('circle',
        {
            'cx': x,
            'cy': y,
            'r': 6,
        },
        {
            'fill': '#fff',
            'stroke-width': 2,
            'stroke': '#000',
        }
    );
    var port = new Port(anchor, x, y, true);
    return port;
};

Link.prototype.onMouseMove = function (evt) {
    // console.log('event', evt.clientX, evt.clientY);
    this.updateDestCoordinates(evt.clientX, evt.clientY);
};

Link.prototype.onMouseMoveOver = function (evt) {
    // console.log('mouse move over');
    var p = this.snapToLine(evt.clientX, evt.clientY);
    if (evt.buttons >= 1){
        this.__svg__.snap_preview.setAttribute('cx', p.x);
        this.__svg__.snap_preview.setAttribute('cy', p.y);
        this.__svg__.snap_preview.style.opacity = 100;
    }
};

Link.prototype.updateDestCoordinates = function (x, y) {
    this.__line__.dest = {x:x, y:y};

    this.__svg__.view.setAttribute('x2', this.__line__.dest.x);
    this.__svg__.view.setAttribute('y2', this.__line__.dest.y);
    this.__svg__.bg.setAttribute('x2', this.__line__.dest.x);
    this.__svg__.bg.setAttribute('y2', this.__line__.dest.y);

    // this.__line__.m();
};

Link.prototype.onMouseUp = function (evt) {
    document.removeEventListener('mousemove', this.__listeners__.mousemove);
    document.removeEventListener('mouseup', this.__listeners__.mouseup);
    document.removeEventListener(Port.EventNames.MouseEnter, this.__listeners__.portmouseenter);
    document.removeEventListener(Port.EventNames.MouseLeave, this.__listeners__.portmouseleave);
    document.removeEventListener(Link.EventNames.MouseEnter, this.__listeners__.linkmouseenter);
    document.removeEventListener(Link.EventNames.MouseLeave, this.__listeners__.linkmouseleave);
    // console.log('link mouse up');

    this.__listeners__.mousemove = undefined;
    this.__listeners__.mouseup = undefined;
    this.__listeners__.portmouseenter = undefined;
    this.__listeners__.portmouseleave = undefined;
    this.__listeners__.linkmouseenter = undefined;
    this.__listeners__.linkmouseleave = undefined;

    this.__svg__.g.style.stroke = '#000';

    this.__listeners__ = {};
    // console.log('dispatching linkrelease event');

    if (!this.__dest__){
        var e = new Event(Link.EventNames.LinkRelease);
        e.link = this;
        e.clientX = evt.clientX;
        e.clientY = evt.clientY;
        document.dispatchEvent(e);
    }

    if (!this.__where__.overPort && !this.__where__.overLink) {
        var port = this.buildNewAnchor(evt.clientX, evt.clientY);
        SVG.draw(port);

        this.updateDestCoordinates(evt.clientX, evt.clientY);
        this.setDest(port);

        var link = new Link(evt.clientX, evt.clientY);
        link.setOrigin(port);
        link.draw();
    }
};

Link.prototype.onContextMenu = function (evt) {
    // document.removeEventListener('mousemove', this.__listeners__.mousemove);
    // document.removeEventListener('mouseup', this.__listeners__.mouseup);
    // document.removeEventListener('contextmenu', this.__listeners__.contextmenu);

    this.__svg__.g.removeEventListener('contextmenu', this.__listeners__.contextmenu);
    this.__listeners__.contextmenu = undefined;
    evt.stopPropagation();
    SVG.erase(this);
    return false;
};

Link.prototype.onMouseEnter = function (evt) {
    // console.log('port mouse enter');
    // this.__svg__.g.style.stroke = '#f00';
    this.__svg__.snap_preview.style.opacity = 100;

    if (this.__dest__) {
        this.__listeners__.linkrelease = this.onLinkRelease.bind(this);
        this.__listeners__.mousemoveover = this.onMouseMoveOver.bind(this);

        document.addEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);
        this.__svg__.g.addEventListener('mousemove', this.__listeners__.mousemoveover);

        const e = new Event(Link.EventNames.MouseEnter);
        e.link = this;
        document.dispatchEvent(e);
    }

};

Link.prototype.onMouseLeave = function (evt) {
    // console.log('mouse leave');
    // this.__svg__.g.style.stroke = '#000';
    this.__svg__.snap_preview.style.opacity = 0;

    document.removeEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);
    this.__svg__.g.addEventListener('mousemove', this.__listeners__.mousemoveover);
    this.__listeners__.linkrelease = undefined;
    this.__listeners__.mousemoveover = undefined;

    if (this.__dest__) {
        const e = new Event(Link.EventNames.MouseLeave);
        e.link = this;
        document.dispatchEvent(e);
    }
};

Link.prototype.onOriginChange = function (evt) {
    if (evt && evt.coord){
        this.__line__.origin = {x:evt.coord.x, y:evt.coord.y};
        this.__svg__.view.setAttribute('x1', this.__line__.origin.x);
        this.__svg__.view.setAttribute('y1', this.__line__.origin.y);
        this.__svg__.bg.setAttribute('x1', this.__line__.origin.x);
        this.__svg__.bg.setAttribute('y1', this.__line__.origin.y);
        // this.__line__.m();
    }
};

Link.prototype.onDestChange = function (evt) {
    if (evt && evt.coord){
        this.__line__.dest = {x:evt.coord.x, y:evt.coord.y};
        this.__svg__.view.setAttribute('x2', this.__line__.dest.x);
        this.__svg__.view.setAttribute('y2', this.__line__.dest.y);
        this.__svg__.bg.setAttribute('x2', this.__line__.dest.x);
        this.__svg__.bg.setAttribute('y2', this.__line__.dest.y);
        // this.__line__.m();
    }
};

Link.prototype.onLinkRelease = function (evt) {
    // console.log('link release on link ' + this.id);
    document.removeEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);
    this.__listeners__.linkrelease = undefined;
    evt.stopPropagation();

    var p = this.snapToLine(evt.clientX, evt.clientY);

    // var anchor = SVG.buildElement('circle',
    //     {
    //         'cx': p.x,
    //         'cy': p.y,
    //         'r': 6,
    //     },
    //     {
    //         'fill': '#fff',
    //         'stroke-width': 2,
    //         'stroke': '#000',
    //     }
    // );
    // var port = new Port(anchor, p.x, p.y, true);
    var port = this.buildNewAnchor(p.x, p.y);
    SVG.draw(port);

    evt.link.updateDestCoordinates(p.x, p.y);
    evt.link.setDest(port);

    var l = new Link(p.x, p.y, this.__line__.dest.x, this.__line__.dest.y);
    l.setOrigin(port);
    l.setDest(this.__dest__);
    SVG.draw(l);

    this.updateDestCoordinates(p.x, p.y);
    this.setDest(port);
};

Link.prototype.snapToLine = function(x, y) {
    var p = {
        x: x,
        y: y,
    };
    var o = this.__line__.origin;
    var d = this.__line__.dest;

    if (o.x == d.x) {
        return {
            x: o.x,
            y: p.y,
        };
    }

    if (o.y == d.y) {
        return {
            x: p.x,
            y: o.y,
        };
    }

    var m = this.__line__.m();
    var im = (-1)/m;
    var intersection = {
        x: (((m * o.x) - (im * p.x) + p.y - o.y) / (m - im) ),
    };
    intersection.y = im * (intersection.x - p.x) + p.y;
    return intersection;
};

Link.prototype.onMouseEnterPort = function(evt) {
    // console.log('link entered port');
    this.__where__.overPort = true;
    if (this.__listeners__.mousemove){
        document.removeEventListener('mousemove', this.__listeners__.mousemove);
        this.__listeners__.mousemove = undefined;
    }

    if (evt.port){
        var p = evt.port.snapToPort();
        this.updateDestCoordinates(p.x, p.y);
        this.setDest(this);
    }
};

Link.prototype.onMouseLeavePort = function(evt) {
    // console.log('link left port');
    this.__where__.overPort = false;

    if (!this.__listeners__.mousemove){
        this.__listeners__.mousemove = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.__listeners__.mousemove);
    }
};

Link.prototype.onMouseEnterLink = function(evt) {
    if (evt.link == this) return;
    evt.stopPropagation();
    this.__where__.overLink = true;
    // console.log('enter');
};

Link.prototype.onMouseLeaveLink = function(evt) {
    if (evt.link == this) return;
    evt.stopPropagation();
    this.__where__.overLink = false;
    // console.log('leave');
};



Port.count = 0;

/**
 * @constant
 * @type {{a: number, b: string, c}}
 * @default
 */
Port.EventNames = {
    Move: 'portmove',
    MouseEnter: 'portmouseenter',
    MouseLeave: 'portmouseleave',
};
function Port(view, x, y, is_dragable = false){
    this.constructor.count++;
    this.id = Port.count-1;
    this.x = x;
    this.y = y;
    this.links = [];
    this.is_dragable = is_dragable;
    this.__move_evt_dispacher__ = undefined;

    var bg = SVG.buildElement('circle',
        {
            'cx': x,
            'cy': y,
            'r': 14,
        },
        {
            // 'fill': '#15a484',
            'fill': '#fff',
            'opacity': 0,
        }
    );

    var group = SVG.groupElements([bg, view],{
        'cursor': is_dragable ? 'move' : 'pointer',
    });

    this.__dragableWrapper__ = undefined;

    this.__svg__ = {
        view: view,
        bg: bg,
        g: group,
    };

    if (is_dragable){
        this.__dragableWrapper__ = new Dragable(this.__svg__.g, this.__svg__.view);
        this.__svg__.g = this.__dragableWrapper__.getElement();
        this.__svg__.view.addEventListener(Dragable.EventNames.Drag, this.onParentMove.bind(this));
    }

    this.__listeners__ = { };

    this.__svg__.g.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.__svg__.g.addEventListener('mouseenter', this.onMouseEnter.bind(this));
}

Port.prototype.getElement = function () {
    return this.__svg__.g;
};

Port.prototype.setMoveEventDispatcher = function (dispatcher) {
    this.__move_evt_dispacher__ = dispatcher;
    // this.__move_evt_dispacher__.addEventListener('move', function(){console.log('click')});
    this.__move_evt_dispacher__.addEventListener(Dragable.EventNames.Drag, this.onParentMove.bind(this));
    this.__move_evt_dispacher__.addEventListener(BaseSymbol.EventNames.Rotate, this.onParentMove.bind(this));
};

Port.prototype.onMouseDown = function (evt) {
    // console.log('port mouse down');
    evt.stopPropagation();

    if (!this.is_dragable) {
        var coord = SVG.convertCoords(this.__svg__.g, this.x, this.y);

        var link = new Link(coord.x, coord.y);
        link.setOrigin(this);
        link.draw();
        this.links.push(link);
    }
};

Port.prototype.onMouseUp = function (evt) {
    // console.log('port mouse up');

    if (!this.__listeners__.mousedrag){
        document.removeEventListener('mousemove', this.__listeners__.mousedrag);
        this.__listeners__.mousedrag = undefined;
    }
};

Port.prototype.onMouseEnterView = function (evt) {
    this.__svg__.view.style.stroke = '#f00';
    this.__svg__.view.style.fill = '#f00';
}

Port.prototype.onMouseLeaveView = function (evt) {
    this.__svg__.view.style.stroke = '#000';
    this.__svg__.view.style.fill = '#fff';
}

Port.prototype.onMouseEnter = function (evt) {
    evt.stopPropagation();

    this.__svg__.view.style.stroke = '#f00';
    this.__svg__.view.style.fill = '#f00';

    this.__listeners__ = {
        mouseleave: this.onMouseLeave.bind(this),
        linkrelease: this.onLinkRelease.bind(this),
    };

    this.__svg__.g.addEventListener('mouseleave', this.__listeners__.mouseleave);
    document.addEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);

    const e = new Event(Port.EventNames.MouseEnter);
    e.port = this;
    document.dispatchEvent(e);
};

Port.prototype.onMouseLeave = function (evt) {
    evt.stopPropagation();

    this.__svg__.view.style.stroke = '#000';
    this.__svg__.view.style.fill = '#fff';

    this.__svg__.g.removeEventListener('mouseleave', this.__listeners__.mouseleave);
    document.removeEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);

    this.__listeners__.mouseleave = undefined;
    this.__listeners__.linkrelease = undefined;

    const e = new Event(Port.EventNames.MouseLeave);
    e.port = this;
    document.dispatchEvent(e);
};

Port.prototype.onLinkRelease = function (evt) {
    // console.log('link release on port ' + this.id);

    this.__svg__.g.style.stroke = '#000';

    var coord = this.snapToPort();
    evt.link.updateDestCoordinates(coord.x, coord.y);
    evt.link.setDest(this);
    document.removeEventListener(Link.EventNames.LinkRelease, this.__listeners__.linkrelease);
    this.__listeners__.linkrelease = undefined;
};

Port.prototype.onParentMove = function (evt) {
    // console.log('moving');
    const e = new Event(Port.EventNames.Move);
    e.port = this;
    e.coord = SVG.convertCoords(this.__svg__.g, this.x, this.y);
    this.__svg__.g.dispatchEvent(e);
    // console.log(this.__svg__.g);
};

Port.prototype.onMouseDrag = function(evt) {
    // console.log(evt);
    if (evt.buttons && evt.buttons >= 1){
        console.log('port mouse drag');
        // this.x = evt.clientX;
        // this.y = evt.clientY;
        this.x += evt.movementX;
        this.y += evt.movementY;
        this.__svg__.g.setAttribute('transform',
            'translate(' + this.x + ',' + this.y + ')'
        );
    }
};

Port.prototype.snapToPort = function() {
    return SVG.convertCoords(this.__svg__.g, this.x, this.y);
};




BaseSymbol.id_count = 0;

/**
 * @constant
 * @type {{a: number, b: string, c}}
 * @default
 */
BaseSymbol.EventNames = {
    // Move: 'elementmove',
    Rotate: 'elementrotate',
};

/**
 * Base calss of all the SVG symbols.
 *
 * @author Rafael Bezerra
 * @constructor
 * @this {BaseSymbol}
 */
function BaseSymbol() {
    this.constructor.id_count++;
    // this.x = 0;
    // this.y = 0;
    this.rotation = {
        angle: 0,
        anchorX: undefined,
        anchorY: undefined,
    };
    this.symbol = {
        width: 0,
        height: 0,
    };
    // this.ports = [];
    this.__parent__ = undefined;

    this.__dragableWrapper__ =  undefined;
    this.__svg__ = {
        g: undefined,
        view: undefined,
        dragable: undefined,
    };
    this.__listeners__ = {};
}

BaseSymbol.prototype.setX = function (v) {
    var pos = this.__dragableWrapper__.getPosition();
    pos.x = v || this.x;
    this.__dragableWrapper__.setPosition(pos.x, pos.y);
    return this;
};

BaseSymbol.prototype.setY = function (v) {
    var pos = this.__dragableWrapper__.getPosition();
    pos.y = v || this.y;
    this.__dragableWrapper__.setPosition(pos.x, pos.y);
    return this;
};

BaseSymbol.prototype.setRotation = function (v) {
    if (v){
        // this.rotation.angle = v*Math.PI/180;
        this.rotation.angle = v % 360;
    }
    return this;
};

BaseSymbol.prototype.constructPort = function(x, y, dispatcher) {
    var el = SVG.buildElement('circle',
        {
            'cx': x,
            'cy': y,
            'r': 6,
        },
        {
            'fill': '#fff',
            'stroke-width': 2,
            'stroke': '#000',
        }
    );
    var p = new Port(el, x, y);
    p.setMoveEventDispatcher(dispatcher);
    return p;
};

BaseSymbol.prototype.constructElement = function (el, ref) {
    this.__controls__ = new Controls(
        this.symbol.width + 10,
        0,
        this.onRotate.bind(this)
    );


    this.__svg__ = {
        g: undefined,
        view: el,
    };

    this.__svg__.g = SVG.groupElements([el, this.__controls__.getElement()])


    // this.__svg__.dragable.addEventListener('mousedown', this.onMouseDown.bind(this));
    // this.__svg__.dragable.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.__dragableWrapper__ = new Dragable(this.__svg__.g, ref);
    this.__svg__.g = this.__dragableWrapper__.getElement();
};
//
// BaseSymbol.prototype.testRot = function () {
//     // console.log(this);
//     var box = this.__svg__.view.getBoundingClientRect();
//     // var coord = SVG.convertCoords(this.__svg__.g, 0, 0);
//     // coord.x += (box.width/2);
//     // coord.y += (box.height/2);
//     //
//     // console.log(coord);
//     console.log(box);
//
//     var coord = SVG.convertCoords(this.__svg__.view, 0, 0);
//     coord.x = (box.width/2);
//     coord.y = (box.height/2);
//     console.log(coord);
//     console.log(SVG.convertCoords(this.__svg__.g, coord.x, coord.y));
//
//     {
//         var center_coord = SVG.convertCoords(this.__svg__.view, coord.x, coord.y);
//
//         // if (!this.svg.center){
//         //     SVG.erase(this.svg.center);
//         // }
//         this.svg.center = document.createElementNS(SVG.config.xmlns, 'circle');
//         this.svg.center.setAttribute('cx', center_coord.x);
//         this.svg.center.setAttribute('cy', center_coord.y);
//         this.svg.center.setAttribute('r', 4);
//         this.svg.center.style.fill = '#f00';
//         SVG.draw(this.svg.center);
//     }
//
//     setInterval((function(){
//         this.setRotation(this.rotation.angle+1);
//
//         this.__svg__.view.setAttributeNS(null,
//             'transform',
//             'rotate(' + (this.rotation.angle) + ', ' + coord.x + ', ' + coord.y + ')'
//             // 'rotate(' + (this.rotation.angle) + ', 0, 0)'
//
//         );
//     }).bind(this), 10);
// };

/**
 * Returns all the SVG markups (symbol, ports and controls) within a
 * group tag <g>
 *
 * @return {SVGElement}  A SVG markup
 * @example
 *   <g class="dragable"
 *       transform="translate(500,200)">
 *       <g>
 *           <g>
 *               <rect width="150" height="75" ></rect>
 *               <g cursor="pointer">
 *                   <circle cx="150" cy="37.5" r="14"></circle>
 *                   <circle cx="150" cy="37.5" r="6"></circle>
 *               </g>
 *           </g>
 *           <g transform="translate(0160, 0)">
 *               <path fill="#010101" d="..." style="cursor: pointer;">
 *               </path>
 *           </g>
 *       </g>
 *   </g>
 */

BaseSymbol.prototype.getElement = function () {
    return this.__svg__.g;
}

// BaseSymbol.prototype.onMouseDown = function (evt) {
//     this.__listeners__ = {
//         mousemove: this.onMouseMove.bind(this),
//     };
//
//     this.__mouse_drag__ = {
//         x:  this.x,
//         y:  this.y,
//         mX: evt.clientX,
//         mY: evt.clientY,
//     };
//
//     document.addEventListener('mousemove', this.__listeners__.mousemove);
// };

// BaseSymbol.prototype.onMouseUp = function (evt) {
//     document.removeEventListener('mousemove', this.__listeners__.mousemove);
//     this.__listeners__ = {};
// };

// BaseSymbol.prototype.onMouseMove = function (evt) {
//     this.setX(this.__mouse_drag__.x + (evt.clientX - this.__mouse_drag__.mX))
//     .setY(this.__mouse_drag__.y + (evt.clientY - this.__mouse_drag__.mY));
// };

BaseSymbol.prototype.onRotate = function (evt) {
    if (!this.rotation.anchorX && !this.rotation.anchorX) {
        var box = this.__svg__.view.getBoundingClientRect();
        this.rotation.anchorX = box.width/2;
        this.rotation.anchorY = box.height/2;
    }

    this.setRotation(this.rotation.angle-90);

    this.__svg__.view.setAttribute(
        'transform',
        'rotate(' + this.rotation.angle + ', ' + this.rotation.anchorX + ', ' + this.rotation.anchorY + ')'
    );

    this.__dragableWrapper__.setPosition();
};



// Rect.prototype = new BaseSymbol();
// Rect.prototype.constructor = Rect;
// Rect.__super__ = BaseSymbol.prototype;
function Rect(){
    BaseSymbol.call(this);
    this.symbol.width = 150;
    this.symbol.height = this.symbol.width/2;

    var rect = SVG.buildElement(
        'rect',
        {
            'width': this.symbol.width,
            'height': this.symbol.height,
        },
        {
            'fill': 'rgb(0,0,255)',
            'stroke-width': 3,
            'stroke': 'rgb(0,0,0)',
            'cursor': 'move',
        }
    );

    var port_left = this.constructPort(0, this.symbol.height/2, rect);
    var port_right= this.constructPort(this.symbol.width, this.symbol.height/2, rect);

    var symbol = SVG.groupElements([
        rect,
        port_left.getElement(),
        port_right.getElement()
    ]);

    this.constructElement(symbol, rect);
}
Rect.prototype = Object.create(BaseSymbol.prototype);
Rect.prototype.constructor = Rect;
Rect.__super__ = BaseSymbol.prototype;

Rect.prototype.getElement = function () {
    return Rect.__super__.getElement.call(this);
};


//
// Symbols.Shapes.Resistor = {
//     markup:[
//         '<g class="rotatable">',
//         '<g class="scalable">',
//         '<path class="body" d="M10,15h15l2.5-5l5,10l5-10l5,10l5-10l5,10l2.5-5h15" />',
//         '<rect class="body-bg"/>',
//         '<circle class="left-port"  />',
//         '<circle class="right-port" />',
//         '</g>',
//         '<text class="label"/>',
//         '</g>',
//     ].join(''),
// }
