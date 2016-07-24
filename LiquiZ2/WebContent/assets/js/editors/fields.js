///////////////
//  Numbers  //
///////////////

/**
A number that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {NumberField}

@param {number} data The number held.
@param {NumberArchetype} archetype The associated archetype.

@property {number} data The number held.
@property {NumberArchetype} archetype The associated archetype.
*/
function NumberField(data, archetype) {
  this.data = data;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the NumberField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
NumberField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the Number's value.
@return {Number} The Number held.
*/
NumberField.prototype.get = NumberArchetype.prototype.get;

/**
Set the Number's value.
@param {Number} val The updated Number.
*/
NumberField.prototype.set = function (val) {
  this.archetype.set(this, val);
};

/**
Get a shallow copy of the Number's value.
@return {Number} The Number held.
*/
NumberField.prototype.copyData = NumberField.prototype.get;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
NumberField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
NumberField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
NumberField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A number array that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {NumberArrayField}

@param {Array.<number>} data The numbers held.
@param {NumberArrayArchetype} archetype The associated archetype.

@property {Array.<number>} data The numbers held.
@property {NumberArrayArchetype} archetype The associated archetype.
*/
function NumberArrayField(data, archetype) {
  this.data = data;
  this.size = this.data.length;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the NumberField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
NumberArrayField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the nth Number stored.
@param {number} nth The position of the Number to get.
@return {number} The value of the Number.
*/
NumberArrayField.prototype.get = NumberArrayArchetype.prototype.get;

/**
Set the nth stored Number to a value.
@param {number} nth The position of the Number to set.
@param {Number} val The value to change the Number to.
*/
NumberArrayField.prototype.set = function (nth, val) {
  this.archetype.set(this, nth, val);
};

/**
Get a shallow copy of the Number's value.
@return {Array.<Number>} The Number held.
*/
NumberArrayField.prototype.copyData = NumberArrayArchetype.prototype.copyData;

/**
concatenate the numbers held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
NumberArrayField.prototype.join = NumberArrayArchetype.prototype.join;

/**
Expand the number of Numbers stored by one
*/
NumberArrayField.prototype.grow = NumberArrayArchetype.prototype.grow;

/**
Shrink the number of Numbers stored by one
*/
NumberArrayField.prototype.shrink = NumberArrayArchetype.prototype.shrink;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
NumberArrayField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
NumberArrayField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
NumberArrayField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
get the editor for an index
*/
NumberArrayField.prototype.editorFor = function(i){
  return this.archetype._editorFor(this, i, 0, true);
};

///////////////
//  STRINGS  //
///////////////

//newField, modify toPrototype, modify constructor and PO copydata and edit and join


/**
A String that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {StringField}

@param {string} data The String held.
@param {StringArchetype} archetype The associated archetype.

@property {string} data The String held.
@property {StringArchetype} archetype The associated archetype.
*/
function StringField(data, archetype) {
  this.data = data;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the StringField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
StringField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the String's value.
@return {String} The String held.
*/
StringField.prototype.get = StringArchetype.prototype.get;

/**
Set the Number's value.
@param {String} val The updated String.
*/
StringField.prototype.set = StringArchetype.prototype.set;

/**
Get a shallow copy of the String's value.
@return {String} The String held.
*/
StringField.prototype.copyData = StringField.prototype.get;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
StringField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
StringField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
StringField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;



/**
A string array that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {StringArrayField}

@param {Array.<String>} data The strings held.
@param {StringArrayArchetype} archetype The associated archetype.

@property {Array.<String>} data The strings held.
@property {StringArrayArchetype} archetype The associated archetype.
*/
function StringArrayField(data, archetype) {
  this.data = data;
  this.size = this.data.length;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the StringField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
StringArrayField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the nth string stored.
@param {number} nth The position of the String to get.
@return {String} The value of the String.
*/
StringArrayField.prototype.get = StringArrayArchetype.prototype.get;

/**
Set the nth stored String to a value.
@param {number} nth The position of the String to set.
@param {String} val The value to change the String to.
*/
StringArrayField.prototype.set = StringArrayArchetype.prototype.set;

/**
Get a shallow copy of the String's value.
@return {Array.<String>} The String held.
*/
StringArrayField.prototype.copyData = StringArrayArchetype.prototype.copyData;

/**
concatenate the Strings held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
StringArrayField.prototype.join = StringArrayArchetype.prototype.join;

/**
Expand the number of Strings stored by one
*/
StringArrayField.prototype.grow = StringArrayArchetype.prototype.grow;

/**
Shrink the number of Strings stored by one
*/
StringArrayField.prototype.shrink = StringArrayArchetype.prototype.shrink;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
StringArrayField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
StringArrayField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
StringArrayField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
get the editor for an index
*/
StringArrayField.prototype.editorFor = NumberArrayField.prototype.editorFor;

////////////////
//   Colors   //
////////////////

/**
A Color that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {ColorField}

@param {Color} data The Color held.
@param {ColorArchetype} archetype The associated archetype.

@property {Color} data The Color held.
@property {ColorArchetype} archetype The associated archetype.
*/
function ColorField(data, archetype) {
  this.data = data;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the ColorField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
ColorField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the Color's value.
@return {String} The Color held.
*/
ColorField.prototype.get = ColorArchetype.prototype.get;

/**
Set the Color's value.
@param {String} val The updated Color (#aarrggbb.
*/
ColorField.prototype.set = ColorArchetype.prototype.set;

/**
Get a shallow copy of the Color's value.
@return {CharArray} The Color held.
*/
ColorField.prototype.copyData = ColorArchetype.prototype.copyData;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
ColorField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
ColorField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
ColorField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A Color array that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {ColorArrayField}

@param {Array.<Color>} data The Colors held.
@param {ColorArrayArchetype} archetype The associated archetype.

@property {Array.<Color>} data The Colors held.
@property {ColorArrayArchetype} archetype The associated archetype.
*/
function ColorArrayField(data, archetype) {
  this.data = data;
  this.size = this.data.length;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the ColorField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
ColorArrayField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the nth Color stored.
@param {number} nth The position of the Color to get.
@return {Color} The value of the Color.
*/
ColorArrayField.prototype.get = ColorArrayArchetype.prototype.get;

/**
Set the nth stored Color to a value.
@param {number} nth The position of the Color to set.
@param {Color} val The value to change the Color to.
*/
ColorArrayField.prototype.set = ColorArrayArchetype.prototype.set;

/**
Get a shallow copy of the Color's value.
@return {Array.<CharArray>} The Color held.
*/
ColorArrayField.prototype.copyData = ColorArrayArchetype.prototype.copyData;

/**
concatenate the Colors held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
ColorArrayField.prototype.join = ColorArrayArchetype.prototype.join;

/**
Expand the number of Colors stored by one
*/
ColorArrayField.prototype.grow = ColorArrayArchetype.prototype.grow;

/**
Shrink the number of Colors stored by one
*/
ColorArrayField.prototype.shrink = ColorArrayArchetype.prototype.shrink;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
ColorArrayField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
ColorArrayField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
ColorArrayField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
get the editor for an index
*/
ColorArrayField.prototype.editorFor = NumberArrayField.prototype.editorFor;

////////////////
//  Booleans  //
////////////////

/**
A Boolean that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {BooleanField}

@param {Boolean} data The Boolean held.
@param {BooleanArchetype} archetype The associated archetype.

@property {Boolean} data The Boolean held.
@property {BooleanArchetype} archetype The associated archetype.
*/
function BooleanField(data, archetype) {
  this.data = data;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the BooleanField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
BooleanField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the Boolean's value.
@return {Boolean} The Boolean held.
*/
BooleanField.prototype.get = BooleanArchetype.prototype.get;

/**
Set the Boolean's value.
@param {Boolean} val The updated Boolean.
*/
BooleanField.prototype.set = BooleanArchetype.prototype.set;

/**
Get a shallow copy of the Boolean's value.
@return {Array.<unit8>} The Booleans held.
*/
BooleanField.prototype.copyData = BooleanArchetype.prototype.copyData;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
BooleanField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
BooleanField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
BooleanField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A Boolean array that is managed by an Archetype.
All data proccessing is handled by the Archetype

@constructor
@this {BooleanArrayField}

@param {Array.<Boolean>} data The Booleans held.
@param {BooleanArrayArchetype} archetype The associated archetype.

@property {Array.<unit8>} data The Booleans held.
@property {BooleanArrayArchetype} archetype The associated archetype.
*/
function BooleanArrayField(data, archetype, size) {
  this.data = data;
  this.size = size;
  this.archetype = archetype;
  this._listeners = [];
}

/**
Dump the BooleanField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
BooleanArrayField.prototype.edit = function (container) {
  this.archetype.edit(this, container);
};

/**
Get the nth Boolean stored.
@param {number} nth The position of the Boolean to get.
@return {Boolean} The value of the Boolean.
*/
BooleanArrayField.prototype.get = BooleanArrayArchetype.prototype.get;

/**
Set the nth stored Boolean to a value.
@param {number} nth The position of the Boolean to set.
@param {Boolean} val The value to change the Boolean to.
*/
BooleanArrayField.prototype.set = BooleanArrayArchetype.prototype.set;

/**
Get a shallow copy of the Boolean's value.
@return {Array.<unit8>} The Boolean held.
*/
BooleanArrayField.prototype.copyData = BooleanArrayArchetype.prototype.copyData;

/**
concatenate the Booleans held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
BooleanArrayField.prototype.join = BooleanArrayArchetype.prototype.join;

/**
Expand the number of Booleans stored by one
*/
BooleanArrayField.prototype.grow = BooleanArrayArchetype.prototype.grow;

/**
Shrink the number of Booleans stored by one
*/
BooleanArrayField.prototype.shrink = BooleanArrayArchetype.prototype.shrink;

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
BooleanArrayField.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
BooleanArrayField.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
BooleanArrayField.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
get the editor for an index
*/
BooleanArrayField.prototype.editorFor = NumberArrayField.prototype.editorFor;