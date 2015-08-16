function About(page) {
    this.page = page;
}

About.prototype.exec = function(params) {
    var p = this.page.people;
    var f = document.createDocumentFragment();
    for (var i = 0; i < p.length; i++) {
	var d = Util.div();
	var h3 = Util.h3(p[i].fullName);
	var web = Util.a(p[i].web);
	var email = Util.a("mailto:" + p[i].email);
	var bio = Util.p(p[i].bio);
	var img = Util.img(p[i].img);
	var aboutme = Util.p(p[i].aboutme);
	Util.add(d, [h3, web, email, bio, img, aboutme]);
	f.appendChild(d);
    }
    document.getElementById("container").appendChild(f);
}
