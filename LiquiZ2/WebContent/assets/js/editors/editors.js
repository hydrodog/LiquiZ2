Util = {
  subClass: function (sup, sub) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }
};

function Editor(archetype, field, appendTo, onlyEditor) {
  this.container = null;
}

Editor.prototype.show = function () {
  this.container.show();
};

Editor.prototype.hide = function () {
  this.container.hide();
};

Editor.prototype.end = function () {
  this.container.remove();
  this.container = null;
};

function EditorString(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var self = field;
  var input = $("<input>", {
    class: "editor-input",
    type: "text",
    value: self.get()
  });


  input.change(function () {
    self.set($(this).val());
    self.messageListeners({
      type: "change"
    });
  });
  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(archetype.description);
    container.append(label);
  }
  container.append(input);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorString);

function EditorStringArray(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var div = $("<div>");
  var self = field;
  var i;
  for (i = 0; i < self.size; i++) {
    archetype._editorFor(self, i, div, onlyEditor);
  }
  var buttonGrow = $("<button>");
  buttonGrow.text("+");
  buttonGrow.click(function () {
    self.grow();
    archetype._editorFor(self, i++, div, onlyEditor);
    self.messageListeners({
      type: "grow"
    });
  });
  var buttonShrink = $("<button>");
  buttonShrink.text("-");
  buttonShrink.click(function () {
    if (i > 0) {
      self.shrink();
      i--;
      if (self.size == 0) {
        div.html("");
      } else {
        div.children().last().remove();
      }
    }
  });
  container.append(div);
  container.append(buttonGrow);
  container.append(buttonShrink);
  this.container = container;
  if (appendTo)
    appendTo.append(container);
}

Util.subClass(Editor, EditorStringArray);

function EditorForStringArray(archetype, field, i, appendTo, onlyEditor) {
  var self = field;
  var container = $("<div>", {
    class: "editor-container"
  });
  var input = $("<input>", {
    class: "editor-input",
    type: "text",
    value: self.get(i)
  });

  input.change(function () {
    self.set(i, $(this).val());
    self.messageListeners({
      type: "change",
      index: i
    });
  });
  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(i + ": ");
    container.append(label);
  }
  container.append(input);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorForStringArray);

function EditorColor(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var self = field;
  var input = $("<input>", {
    class: "editor-input",
    type: "text"
  });

  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(archetype.description);
    container.append(label);
  }

  container.append(input);
  input.spectrum({
    color: "#" + self.get(),
    showInput: true,
    showAlpha: true,
    preferredFormat: "hex",
    change: function (color) {
      self.set(Math.floor(color._a * 255).toString(16) + color.toHexString().substring(1));
      self.messageListeners({
        type: "change"
      });
    }
  });
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorColor);

function EditorColorArray(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var div = $("<div>");
  var self = field;
  var i;
  for (i = 0; i < self.size; i++) {
    archetype._editorFor(self, i, div, onlyEditor);
  }
  var buttonGrow = $("<button>");
  buttonGrow.text("+");
  buttonGrow.click(function () {
    self.grow();
    archetype._editorFor(self, i++, div, onlyEditor);
    self.messageListeners({
      type: "grow"
    });
  });
  var buttonShrink = $("<button>");
  buttonShrink.text("-");
  buttonShrink.click(function () {
    if (i > 0) {
      self.shrink();
      i--;
      if (self.size == 0) {
        div.html("");
      } else {
        div.children().last().remove();
      }
    }
  });
  container.append(div);
  container.append(buttonGrow);
  container.append(buttonShrink);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorColorArray);

function EditorForColorArray(archetype, field, i, appendTo, onlyEditor) {
  var self = field;
  var container = $("<div>", {
    class: "editor-container"
  });
  var input = $("<input>", {
    class: "editor-input",
    type: "text"
  });
  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(i + ": ");
    container.append(label);
  }
  container.append(input);
  input.spectrum({
    color: "#" + self.get(i),
    showInput: true,
    showAlpha: true,
    preferredFormat: "hex",
    change: function (color) {
      self.set(i, Math.floor(color._a * 255).toString(16) + color.toHexString().substring(1));
      self.messageListeners({
        type: "change",
        index: i
      });
    }
  });
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorForColorArray);

function EditorNumber(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var self = field;
  var input = $("<input>", {
    class: "editor-input",
    type: "number",
    value: self.get(),
    min: archetype.minSize,
    max: archetype.maxSize
  });

  input.change(function () {
    self.set($(this).val());
    self.messageListeners({
      type: "change"
    });
  });
  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(archetype.description);
    container.append(label);
  }
  container.append(input);
  if (appendTo)
    appendTo.append(container);

  this.container = container;
}

Util.subClass(Editor, EditorNumber);

function EditorNumberArray(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var div = $("<div>");
  var self = field;
  var i;
  for (i = 0; i < self.size; i++) {
    archetype._editorFor(field, i, div, onlyEditor);
  }
  var buttonGrow = $("<button>");
  buttonGrow.text("+");
  buttonGrow.click(function () {
    self.grow();
    archetype._editorFor(self, i++, div, onlyEditor);
    self.messageListeners({
      type: "grow"
    });
  });
  var buttonShrink = $("<button>");
  buttonShrink.text("-");
  buttonShrink.click(function () {
    if (i > 0) {
      self.shrink();
      i--;
      if (self.size == 0) {
        div.html("");
      } else {
        div.children().last().remove();
      }
    }
  });
  container.append(div);
  container.append(buttonGrow);
  container.append(buttonShrink);
  if (appendTo)
    appendTo.append(container);

  this.container = container;
}

Util.subClass(Editor, EditorNumberArray);

function EditorForNumberArray(archetype, field, i, appendTo, onlyEditor) {
  var self = field;
  var container = $("<div>", {
    class: "editor-container"
  });
  var input = $("<input>", {
    class: "editor-input",
    type: "number",
    value: self.get(i),
    min: archetype.minSize + "",
    max: archetype.maxSize + ""
  });

  input.change(function () {
    self.set(i, $(this).val());
    self.messageListeners({
      type: "change",
      index: i
    });
  });
  if (!onlyEditor) {
    var label = $("<label>", {
      class: "editor-label"
    });
    label.text(i + ": ");
    container.append(label);
  }
  container.append(input);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorForNumberArray);

function EditorBoolean(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var self = field;
  for (var i = 0; i < archetype.size; i++) {
    var div = $("<div>", {
      class: "editor-container"
    });

    var input = $("<input>", {
      class: "editor-input",
      type: "checkbox"
    });
    if (self.get(i)) {
      input.prop("checked", true);
    }

    (function (i) {
      input.click(function () {
        self.set(i, $(this).is(":checked"));
        self.messageListeners({
          type: "change",
          index: i
        });
      });
    })(i);
    if (!onlyEditor) {
      var label = $("<label>", {
        class: "editor-label"
      });
      label.text(archetype.descriptions[i]);
      div.append(label);
    }
    div.append(input);
    container.append(div);
  }
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorBoolean);

function EditorBooleanArray(archetype, field, appendTo, onlyEditor) {
  if (appendTo) appendTo = $(appendTo);
  var container = $("<div>", {
    class: "editor-container"
  });
  var div = $("<div>");
  var self = field;
  var i;
  for (i = 0; i < self.size; i++) {
    archetype._editorFor(self, i, div, onlyEditor);
  }
  var buttonGrow = $("<button>");
  buttonGrow.text("+");
  buttonGrow.click(function () {
    self.grow();
    archetype._editorFor(self, self.size - 1, div, onlyEditor);
    self.messageListeners({
      type: "grow"
    });
  });

  container.append(div);
  container.append(buttonGrow);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorBooleanArray);

function EditorForBooleanArray(archetype, field, i, appendTo, onlyEditor) {
  var self = field;
  var container = $("<div>", {
    class: "editor-container"
  });
  var input = $("<input>", {
    class: "editor-input",
    type: "checkbox"
  });
  
  if (self.get(i)) {
    input.prop("checked", true);
  }
  
  this.inputChange = function () {
    self.set(i, $(this).is(":checked"));
    self.messageListeners({
      type: "change",
      index: i
    });
  };
  
  input.click(this.inputChange);
  this.onRemove = function(){
    self.shrink(i);
  };
  this.buttonClick = function () {
    if (self.size > 0) {
      this.onRemove();
      if (self.size == 0) {
        div.html("");
      } else {
        container.remove();
      }
    }
  };
  
  var buttonShrink = $("<button>");
  buttonShrink.text("-");
  buttonShrink.click(this.buttonClick);
  container.append(input);
  container.append(buttonShrink);
  if (appendTo)
    appendTo.append(container);
  this.container = container;
}

Util.subClass(Editor, EditorForBooleanArray);

function EditorConditional(archetype, field, contained) {
  this.archetype = archetype;
  this.field = field;
  this.contained = contained;
}

EditorConditional.prototype.show = function () {
  if (this.archetype.can())
    this.contained.show();
  else
    this.contained.hide();
};

EditorConditional.prototype.hide = function () {
  this.contained.hide();
};

EditorConditional.prototype.end = function () {
  this.contained.remove();
  this.contained = null;
};