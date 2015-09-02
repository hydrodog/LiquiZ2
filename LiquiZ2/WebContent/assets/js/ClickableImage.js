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

ClickableImage = function(id, src, xs, ys, answersRef, reticleSrc) {
    var img = Util.img(src);
    var div = Util.div();
    img.src = mediaLocations.img + src;
	div.classList.add("clickableimage");
	var self = this;
    div.onclick = function(e){
		self.imgClick(e,self);
	};
	this.x = null;
	this.y = null;
	this.id = id;
	this.reticle = reticleSrc || (mediaLocations.img + "reticle.png");
	this.answers = answersRef;
	this.response = null;
	this.div = div;
	div.appendChild(img);
    return div;
};

ClickableImage.prototype.addAnswer = function(x, y) {
	this.x = x;
	this.y = y;
	var i = this.answers.indexOf(this.response);
	if(i != -1){
		this.answers.splice(i,1);
	}
	this.response = [this.id, this.x,this.y];
	this.answers.push(this.response);
	this.addReticle(this.x, this.y);
}

ClickableImage.prototype.imgClick = function(e, clickableImage) {
    var boundRect = clickableImage.div.getBoundingClientRect();
	clickableImage.addAnswer(Math.floor(e.clientX - boundRect.left),Math.floor(e.clientY - boundRect.top));
};

ClickableImage.prototype.reticleLoad = function(e, clickableImage) {
	var img = clickableImage.reticle;
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
		this.div.appendChild(img);
		var self = this;
		img.onload = function(e){
			self.reticleLoad(e,self);;
		};
	}
	img.style.left = (this.x-img.clientWidth/2) + "px";
	img.style.top = (this.y-img.clientHeight/2) + "px";
	this.reticle = img;
};