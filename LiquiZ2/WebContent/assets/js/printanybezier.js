function BezierRect(x, y, w, h, cornerRadiuses, sides) {
  this.sides = [];
  this.sides.push(new BezierSide(x + 0, y + 0, w, 0));
  this.sides.push(new BezierSide(x + w, y + 0, 0, h));
  this.sides.push(new BezierSide(x + w, y + h, -w, 0));
  this.sides.push(new BezierSide(x + 0, y + h, 0, -h));

  this.corners = [];

  var radius = cornerRadiuses[0];
  if (radius > 0) {
    this.sides[0].dx -= radius;
    this.sides[0].x += radius;
    this.sides[3].dy += radius;
  }
  radius = cornerRadiuses[1];
  if (radius > 0) {
    this.sides[1].dy -= radius;
    this.sides[1].y += radius;
    this.sides[0].dx -= radius;
  }
  radius = cornerRadiuses[2];
  if (radius > 0) {
    this.sides[2].dx += radius;
    this.sides[2].x -= radius;
    this.sides[1].dy -= radius;
  }
  radius = cornerRadiuses[3];
  if (radius > 0) {
    this.sides[3].dy += radius;
    this.sides[3].y -= radius;
    this.sides[2].dx += radius;
  }

  radius = cornerRadiuses[0];
  if (radius > 0) {
    this.corners.push(new BezierCorner(this.sides[3].x, this.sides[3].y + this.sides[3].dy, radius, -radius,
                                       {x:0,y:-BezierCorner.k*radius},
                                       {x:(1 - BezierCorner.k)*radius,y:-radius}));
  } else {
    this.corners.push(null);
  }

  radius = cornerRadiuses[1];
  if (radius > 0) {
    this.corners.push(new BezierCorner(this.sides[0].x + this.sides[0].dx, this.sides[0].y, radius, radius,
                                       {x:BezierCorner.k*radius,y:0},
                                       {x:radius,y:(1 - BezierCorner.k)*radius}));
  } else {
    this.corners.push(null);
  }

  radius = cornerRadiuses[2];
  if (radius > 0) {
    this.corners.push(new BezierCorner(this.sides[1].x, this.sides[1].y + this.sides[1].dy, -radius, radius,
                                       {x:0,y:BezierCorner.k*radius},
                                       {x:-(1 - BezierCorner.k)*radius,y:radius}));
  } else {
    this.corners.push(null);
  }

  radius = cornerRadiuses[3];
  if (radius > 0) {
    this.corners.push(new BezierCorner(this.sides[2].x + this.sides[2].dx, this.sides[2].y, -radius, -radius,
                                       {x:-BezierCorner.k*radius,y:0},
                                       {x:-radius,y:-(1 - BezierCorner.k)*radius}));
  } else {
    this.corners.push(null);
  }

  var lines = [],
    broken = false;
  var currentLine = [];
  var i = 0;
  var hasLine = sides[i];
  if (hasLine) {
    if (this.corners[i])
      currentLine.push(this.corners[i]);
    currentLine.push(this.sides[i]);
    if (!sides[(i + 1) % sides.length]) {
      if (this.corners[(i + 1) % this.corners.length])
        currentLine.push(this.corners[(i + 1) % this.corners.length]);
      lines.push(currentLine);
      currentLine = [];
      broken = true;
    }
  }
  i++;
  hasLine = sides[i];
  if (hasLine) {
    if (this.corners[i])
      currentLine.push(this.corners[i]);
    currentLine.push(this.sides[i]);
    if (!sides[(i + 1) % sides.length]) {
      if (this.corners[(i + 1) % this.corners.length])
        currentLine.push(this.corners[(i + 1) % this.corners.length]);
      lines.push(currentLine);
      currentLine = [];
      broken = true;
    }

  }
  i++;
  hasLine = sides[i];
  if (hasLine) {
    if (this.corners[i])
      currentLine.push(this.corners[i]);
    currentLine.push(this.sides[i]);
    if (!sides[(i + 1) % sides.length]) {
      if (this.corners[(i + 1) % this.corners.length])
        currentLine.push(this.corners[(i + 1) % this.corners.length]);
      lines.push(currentLine);
      currentLine = [];
      broken = true;
    }
  }
  i++;
  hasLine = sides[i];
  if (hasLine) {
    if (this.corners[i])
      currentLine.push(this.corners[i]);
    currentLine.push(this.sides[i]);
    if (!sides[(i + 1) % sides.length]) {
      if (this.corners[(i + 1) % this.corners.length])
        currentLine.push(this.corners[(i + 1) % this.corners.length]);
      lines.push(currentLine);
      currentLine = [];
    } else if (broken) {
      var originalLine = lines[0];
      for (var j = currentLine.length - 1; j >= 0; j--) {
        originalLine.unshift(currentLine[j]);
      }
      currentLine = [];
    }
  }
  i++;
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  for (var k = 0; k < lines.length; k++) {
    var line = lines[k];
    var x = line[0].x;
    var y = line[0].y;
    var nextLines = [];
    if (line[0].constructor == BezierCorner) {
      nextLines.push([line[0].p1.x, line[0].p1.y, line[0].p2.x, line[0].p2.y, line[0].dx, line[0].dy]);
    } else {
      nextLines.push([line[0].dx, line[0].dy]);
    }

    for (var l = 1; l < line.length; l++) {
      line[l].x -= x;
      line[l].y -= y;
      x += line[l].x;
      y += line[l].y;
      if (line[l].constructor == BezierCorner) {
        nextLines.push([line[l].p1.x, line[l].p1.y, line[l].p2.x, line[l].p2.y, line[l].dx, line[l].dy]);
      } else {
        nextLines.push([line[l].dx, line[l].dy]);
      }
    }
    lines[k] = new BezierLineData(line[0].x, line[0].y, nextLines);
  }

  this.lines = lines;
}

function BezierLineData(x, y, lines) {
  this.x = x;
  this.y = y;
  this.lines = lines;
}

function BezierSide(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
}

BezierSide.prototype.toLine = function () {
  return [this.dx, this.dy];
}

function BezierCorner(x, y, dx, dy, p1, p2) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.p1 = p1;
  this.p2 = p2;
}

BezierCorner.k = 0.552228474;

BezierSide.prototype.toLine = function () {
  return [this.dx, this.dy];
}