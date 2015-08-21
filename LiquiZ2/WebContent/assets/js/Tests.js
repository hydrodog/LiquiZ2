

function Tests(testInfo) {
    this.testInfo = testInfo;
}

Tests.prototype.exec = function() {
    this.container = document.getElementById("container");

    var table = this.testInfo[0].data[0].slice();

    if (url.params.append) {
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                table[i][j] += url.params.append;
            }
        }
    }

    this.matrix(table);
};

Tests.prototype.matrix = function(list) {
    table = Util.table(list);
    this.container.appendChild(table);
};
