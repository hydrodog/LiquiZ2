/**
* @author 
* Makes a "Paintable Image" that will supply its answer to the quiz.
*
* Overall: The Paintable Image can
* 1. paint the area wanted 
* 2. display an image
* 
* 
*/
var contex,
	drawingAreaX = 60,
	drawingAreaY = 10,
	drawingAreaWidth = 500,
	drawingAreaHeight = 300,
	canvasWidth,
	canvasHeight,
	outlineImage,
	swatchImage,
	backgroundImage,
	colorLayerData, 
	outlineLayerData,
	swatchStartX = 5,
	swatchStartY = 5,
	swatchImageWidth = 93,
	swatchImageHeight = 46,
	colorGreen = {
			r: 101,
			g: 155,
			b: 65
		},
	colorWhite = {
			r: 255,
			g: 255,
			b: 255
		},
	curColor = colorWhite,
	totalLoadResources = 2,
	curLoadResNum = 0;

Paint = function(src, width, height, x, y) {
	outlineImage = Util.img(src);
	swatchImage = Util.img("paint-outline.png");
	canvasWidth = width;
	canvasHeight = height;
	var canvasDiv = Util.div("canvasDiv", "canvasDiv");
	this.canvasDiv = canvasDiv;
	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', canvasWidth);
	this.canvas.setAttribute('height', canvasHeight);
	this.canvas.setAttribute('id', 'canvas');
	
	context = this.canvas.getContext("2d");
	
	swatchImage.onload = this.resourceLoaded(); 
	outlineImage.onload = this.outlineImageOnload();
	
	this.canvas.onclick = (this.createMouseEvents).bind(this);
	canvasDiv.appendChild(this.canvas);
	
	//return this.canvasDiv;
	return this.canvasDiv;
};

//Add mouse event listeners to the canvas
Paint.prototype.createMouseEvents = function () {

	$('#canvas').mousedown(function (e) {
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft,
			mouseY = e.pageY - this.offsetTop;

		if (mouseX < drawingAreaX) { // Left of the drawing area
			if (mouseX > swatchStartX) {
				if (mouseY > swatchStartY && mouseY < swatchStartY + swatchImageHeight) {
					curColor = colorWhite;
					Paint.prototype.redraw();
				} else if (mouseY > swatchStartY + swatchImageHeight && mouseY < swatchStartY + swatchImageHeight * 2) {
					curColor = colorGreen;
					Paint.prototype.redraw();
				} 
			}
		} else if ((mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight) && (mouseX <= drawingAreaX + drawingAreaWidth)) {
			// Mouse click location on drawing area
			Paint.prototype.paintAt(mouseX, mouseY);
		}
	});
};

//Start painting with paint bucket tool starting from pixel specified by startX and startY
Paint.prototype.paintAt = function (startX, startY) {

	var pixelPos = (startY * canvasWidth + startX) * 4,
		r = colorLayerData.data[pixelPos],
		g = colorLayerData.data[pixelPos + 1],
		b = colorLayerData.data[pixelPos + 2],
		a = colorLayerData.data[pixelPos + 3];

	if (r === curColor.r && g === curColor.g && b === curColor.b) {
		// Return because trying to fill with the same color
		return;
	}

	if (this.matchOutlineColor(r,g,b,a)) {
		// Return because clicked outline
		return;
	}
	this.floodFill(startX, startY, r, g, b);

	this.redraw();
};

Paint.prototype.floodFill = function (startX, startY, startR, startG, startB) {

	var newPos,
		x,
		y,
		pixelPos,
		reachLeft,
		reachRight,
		drawingBoundLeft = drawingAreaX,
		drawingBoundTop = drawingAreaY,
		drawingBoundRight = drawingAreaX + drawingAreaWidth - 1,
		drawingBoundBottom = drawingAreaY + drawingAreaHeight - 1,
		pixelStack = [[startX, startY]];

	while (pixelStack.length) {

		newPos = pixelStack.pop();
		x = newPos[0];
		y = newPos[1];

		// Get current pixel position
		pixelPos = (y * canvasWidth + x) * 4;

		// Go up as long as the color matches and are inside the canvas
		while (y >= drawingBoundTop && this.matchStartColor(pixelPos, startR, startG, startB)) {
			y -= 1;
			pixelPos -= canvasWidth * 4;
		}

		pixelPos += canvasWidth * 4;
		y += 1;
		reachLeft = false;
		reachRight = false;
		
		// Go down as long as the color matches and in inside the canvas
		while (y <= drawingBoundBottom && this.matchStartColor(pixelPos, startR, startG, startB)) {
			y += 1;
			this.colorPixel(pixelPos, curColor.r, curColor.g, curColor.b);
			if (x > drawingBoundLeft) {
				if (this.matchStartColor(pixelPos - 4, startR, startG, startB)) {
					if (!reachLeft) {
						// Add pixel to stack
						pixelStack.push([x - 1, y]);
						reachLeft = true;
					}
				} else if (reachLeft) {
					reachLeft = false;
				}
			}
			if (x < drawingBoundRight) {
				if (this.matchStartColor(pixelPos + 4, startR, startG, startB)) {
					if (!reachRight) {
						// Add pixel to stack
						pixelStack.push([x + 1, y]);
						reachRight = true;
					}
				} else if (reachRight) {
					reachRight = false;
				}
			}

			pixelPos += canvasWidth * 4;
		}
	}
};


Paint.prototype.matchStartColor = function (pixelPos, startR, startG, startB) {
	var r = outlineLayerData.data[pixelPos],
		g = outlineLayerData.data[pixelPos + 1],
		b = outlineLayerData.data[pixelPos + 2],
		a = outlineLayerData.data[pixelPos + 3];

	// If current pixel of the outline image is black
	if (this.matchOutlineColor(r, g, b, a)) {
		return false;
	}

	r = colorLayerData.data[pixelPos];
	g = colorLayerData.data[pixelPos + 1];
	b = colorLayerData.data[pixelPos + 2];

    // If the current pixel matches the clicked color
	if (r === startR && g === startG && b === startB) {
		return true;
	}

	// If current pixel matches the new color
	if (r === curColor.r && g === curColor.g && b === curColor.b) {
		return false;
	}

	return true;
};

Paint.prototype.outlineImageOnload = function() {
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	outlineLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);
	this.clearCanvas();
	colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);
	this.redraw(); 
};

Paint.prototype.clearCanvas = function(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

Paint.prototype.colorPixel = function (pixelPos, r, g, b, a) {
	colorLayerData.data[pixelPos] = r;
	colorLayerData.data[pixelPos + 1] = g;
	colorLayerData.data[pixelPos + 2] = b;
	colorLayerData.data[pixelPos + 3] = a !== undefined ? a : 255;
};

Paint.prototype.matchOutlineColor = function (r, g, b, a) {
	return (r + g + b < 200 && a === 255);
};

//Draw the elements on the canvas
Paint.prototype.redraw = function () {
	var locX,locY;
	this.clearCanvas();
	// Draw the current state of the color layer to the canvas
	context.putImageData(colorLayerData, 0, 0);
	// Draw the background
	//context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
	// Draw the color swatches
	locX = 1;
	locY = 5;
	this.drawColorSwatch(colorWhite, locX, locY);

	locY += 46;
	this.drawColorSwatch(colorGreen, locX, locY);

	// Draw the outline image on top of everything. We could move this to a separate 
	//   canvas so we did not have to redraw this everyime.
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
};

//Draw a color swatch
Paint.prototype.drawColorSwatch = function (color, x, y) {

	context.beginPath();
	context.arc(x + 46, y + 23, 18, 0, Math.PI * 2, true);
	context.closePath();
	context.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
	context.fill();

	if (curColor === color) {
		context.drawImage(swatchImage, 0, 0, 59, swatchImageHeight, x, y, 59, swatchImageHeight);
	} else {
		context.drawImage(swatchImage, x, y, swatchImageWidth, swatchImageHeight);
	}
};

// Calls the redraw function after all neccessary resources are loaded.
Paint.prototype.resourceLoaded = function(){
	if(++curLoadResNum >= totalLoadResources){
		this.redraw();
	}
};

// Save the position where have color-green.
Paint.prototype.savePosition = function(){
	
}




	


