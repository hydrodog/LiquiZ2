function Index (indexData) {
    this.body = document.getElementById("container");
    this.body.className = "index";
    this.data = indexData;
}

Index.prototype.exec = function(params) {
    for (var i = 0; i < this.data.length; i++) {
        this.render(this.processItem(this.data[i]));
    }
};

Index.prototype.processItem = function(item) {
    if (item[0].substring(0, 5) === "Util.") {
        return Util[item[0].substring(5)].apply(this||window, item.slice(1));
    } else {
        return this[item[0]].apply(this||window, item.slice(1));
    }
};

Index.prototype.render = function(element) {
    this.body.appendChild(element);
};
