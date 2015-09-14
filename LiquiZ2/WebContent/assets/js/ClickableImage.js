/*
* Author: Stephen Oro
* Makes a "Clickable Image" that will supply its answer to the quiz.
*
* Overall: The Clickable Image must
* 1. find and keep track of answer position (x, y) 
* 2. add and replace the answer
* 3. display an image
* 4. display a reticle where clicked
*  
* Solution(s):
* 1. keep a reference to the returned response (array) so it can be
*    spliced from the Quiz.answers (stored in this.answers)
* 2. keep a reticle and move it around as desired
* 3. container must be a div in order to have a displayer image and a reticle
*/


/*
 * interface: 
 * new ClickableImage (id, src, xs, ys, answersRef, reticleSrc) - don't know what xs and ys do. returns an image element
 * ClickableImage.addAnswer (x, y) - adds [id, x, y] to answers, will replace
 * owned previous answer if previously clicked
 * ClickableImage.imgClick (e, clickableImage) - onclick calls addAnswer with response
 * ClickableImage.reticle (x, y) places a reticle as a child of the image at the click location
 * ClickableImage.prototype.reticleLoad (e, clickableImage) - onload of reticle to properly position it.
 */

ClickableImage = function(id, src, xs, ys, reticleSrc) {
    var img = Util.img(src);
    var div = Util.div();
	div.classList.add("clickableimage");
    div.onclick = (this.imgClick).bind(this);
	this.x = null;
	this.y = null;
	this.id = id;
	this.reticle = reticleSrc || (mediaLocations.img + "reticle.png");
	this.target = div;
	div.appendChild(img);
    return div;
};

ClickableImage.prototype.addAnswer = function(x, y) {
	this.target.onfocus(this);
	this.x = x;
	this.y = y;
	this.target.value = [this.x,this.y];
	this.target.onchange(this);
	this.addReticle(this.x, this.y);
	this.target.onblur(this);
}

ClickableImage.prototype.imgClick = function(e) {
    var boundRect = this.target.getBoundingClientRect();
	var x = Math.floor(e.clientX - boundRect.left),
		y = Math.floor(e.clientY - boundRect.top);
	if(x >= 0 && y >= 0 && x <= boundRect.width && x <= this.target.clientWidth && y <= this.target.clientHeight){
		this.addAnswer(x,y);
	}
};

ClickableImage.prototype.reticleLoad = function(e) {
	var img = this.reticle;
	img.style.left = (this.x-img.clientWidth/2) + "px";
	img.style.top = (this.y-img.clientHeight/2) + "px";
};

ClickableImage.prototype.addReticle = function() {
	var img = this.reticle;
    if(typeof img === "string"){
		img = document.createElement("img");
		img.innerHTML = "&nbsp";
		img.src = this.reticle;
		img.style.position = "absolute";
		this.target.appendChild(img);
		img.onload = (this.reticleLoad).bind(this);
	}
	img.style.left = (this.x-img.clientWidth/2) + "px";
	img.style.top = (this.y-img.clientHeight/2) + "px";
	this.reticle = img;
};