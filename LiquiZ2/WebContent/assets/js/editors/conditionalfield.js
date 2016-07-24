/**
The archetype attached to a class that helps decide whether a certain field should be editable at any given time.

@constructor
@this {ConditionalArchetype}

@param {Function} protectionFunction The function that determines whether the field is accessible or not takes an argument of the fieldname {String} in question.
@param {Array.<number>} fieldsProtectingIndexes The indexes within the parent class's fields list this condition applies to.
@param {class} protectedClass The class to be protected.

@property {Function} protectionFunction The function that determines whether the field is accessible or not takes an argument of the fieldname {String} in question.
@property {Array.<number>} _fieldindexes The indexes within the parent class's fields list this condition applies to.
@property {Array.<Field>} _fields The fields within the parent class's fields list this condition applies to.
*/
function ConditionalArchetype(protectionFunction, fieldsProtectingIndexes, protectedClass) {
  this._function = protectionFunction;
  if (typeof fieldsProtectingIndexes == "string")
    fieldsProtectingIndexes = [fieldsProtectingIndexes];
  this._fieldindexes = fieldsProtectingIndexes;
  this._fields = new Array(fieldsProtectingIndexes.length);
  for (var i = 0; i < fieldsProtectingIndexes.length; i++) {
    this._fields[i] = protectedClass._fields[fieldsProtectingIndexes[i]].fieldName;
  }
  protectedClass._fields.push(this);
  this.newField(protectedClass, true);
}

/**
make a new field on the owner, with the information if the owner is an object or a class. This does not create a new field, but rather consumes an attached pre-existing field.
@param {class|object} owner What to attach the new field to.
@param {boolean} isClass Whether the owner is a class or object.
*/
ConditionalArchetype.prototype.newField = function (owner, isClass) {
  if (isClass)
    owner = owner._fields;
  var fields = isClass ? this._fieldindexes : this._fields;
  console.log("fields");
  console.log(fields);
  for (var i = 0; i < fields.length; i++) {
    var captiveField = owner[fields[i]];
    console.log("captiveField");
    console.log(captiveField);
    owner[fields[i]] = new ConditionalField(this._fields[i], owner[fields[i]], this, isClass);
  }
};

/**
Conditional Archetypes are to complex to convert to binary
(I lie, I just don't feel it is a good use of the spec.)
So we return empty so that conditional Archetypes are ignored.
*/
ConditionalArchetype.prototype.toPrototype = function (owner) {
  return "";
};

/**
Conditional Archetypes are to complex to edit
(I lie, I just don't feel it is a good use of the spec.)
So we return undefined because by our definition, there can
be no definition of an editor.
*/
ConditionalArchetype.prototype.edit = function (owner) {
  return undefined;
};

/**
A conditional field, the guard against editing
of other fields based on some condition function.

@constructor
@this {ConditionalField}

@param {String} fieldname The field being protected.
@param {Field} captive The field held captive.
@param {ConditionalArchetype} archetype The archetype responsible
for this.
@param {Boolean} isClass Whether the protected owner is a class.

@property {String} _fieldname The field being protected.
@property {Field} _captive The field held captive.
@property {ConditionalArchetype} archetype The archetype responsible
for this.
@property {Boolean} isClass Whether the protected owner is a class.
*/
function ConditionalField(fieldname, captive, archetype, isClass) {
  this.archetype = archetype;
  this._fieldname = fieldname;
  this._captive = captive;
  this._holders = [];
  this.isClass = isClass;
}

/**
if the held captive can turn into a prototype, do it.
*/
ConditionalField.prototype.toPrototype = function () {
  if (this._captive !== undefined && this._captive.toPrototype) {
    return this._captive.toPrototype.apply(this._captive, arguments);
  }
  return "";
}

/**
if the held captive can produce a new field, do it
*/
ConditionalField.prototype.newField = function () {
  if (this._captive !== undefined && this._captive.toPrototype) {
    return this._captive.newField.apply(this._captive, arguments);
  }
  return "";
}

/**
if the held captive should be editable, set, all arguments
are passed to the captive
*/
ConditionalField.prototype.set = function (args) {
  if (this.can()) {
    return this._captive.set.apply(this._captive, arguments);
  }
  return undefined;
};

/**
if the held captive should be editable, get, all arguments
are passed to the captive
*/
ConditionalField.prototype.get = function (args) {
  if (this.can()) {
    return this._captive.get.apply(this._captive, arguments);
  }
  return undefined;
};

/**
if the held captive should be editable, copy the data,
all arguments are passed to the captive
*/
ConditionalField.prototype.copyData = function (args) {
  if (this.can()) {
    return this._captive.copyData.apply(this._captive, arguments);
  }
  return undefined;
};

/**
update all editors as to whether they should be visible or not
*/
ConditionalField.prototype.update = function () {
  for (var i = 0; i < this._holders.length; i++) {
    this._holders[i].show();
  }
};

/**
Should this field be editable? Asks the function,
return the result.
*/
ConditionalField.prototype.can = function () {
  return this.archetype._function(this._fieldname);
};

/**
update all editors as to whether they should be visible or not
*/
ConditionalField.prototype.edit = function (container) {
  var holder = new EditorConditional(this.archetype, this, this._captive.edit.apply(this._captive, arguments));
  holder.show();
  this._holders.push(holder);
};

/**
if the held captive should be editable, join data,
all arguments are passed to the captive
*/
ConditionalField.prototype.join = function (args) {
  if (this.can()) {
    return this._captive.join.apply(this._captive, arguments);
  }
  return undefined;
};

/**
if the held captive should be editable, grow,
all arguments are passed to the captive
*/
ConditionalField.prototype.grow = function (args) {
  if (this.can()) {
    return this._captive.grow.apply(this._captive, arguments);
  }
  return undefined;
};

/**
if the held captive should be editable, shrink,
all arguments are passed to the captive
*/
ConditionalField.prototype.shrink = function (args) {
  if (this.can()) {
    return this._captive.shrink.apply(this._captive, arguments);
  }
  return undefined;
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
ConditionalField.prototype.onChange = function (args) {
  return this._captive.onChange.apply(this._captive, arguments);
};

/**
Removes all attached listeners
*/
ConditionalField.prototype.removeListeners = function (args) {
  return this._captive.removeListeners.apply(this._captive, arguments);
};

/**
send a message to all attached listeners
*/
ConditionalField.prototype.messageListeners = function (args) {
  return this._captive.messageListeners.apply(this._captive, arguments);
};