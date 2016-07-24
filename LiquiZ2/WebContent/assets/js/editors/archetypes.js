////////////
// Number //
////////////
/**
An Archetype to handle Numbers

@constructor
@this {NumberArchetype} 

@property {String} fieldName The key this is associated with.
@property {Number} data The stored Number.
@property {Number} size The bytes of the stored Number.
@property {Number} minSize The minimum possible stored Number.
@property {Number} maxSize The maximum possible stored Number.
@property {String} description The edit tip.
*/
function NumberArchetype() {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Number), 1:(Number), 2:(String)

@param {CharArray} prototype The binary data source.
@param {String} field The key this is associated with.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {NumberArchetype} this
*/
NumberArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  this.size = Math.ceil(prototype.get8bits() / 8) * 8;
  if (this.size == 32) {
    this.maxSize = 2147483647;
    this.minSize = -2147483648;
  } else {
    this.maxSize = (1 << this.size) - 1;
    this.minSize = 0;
  }
  this.data = prototype.get(this.size);
  this.description = prototype.getString();
  this.editorClass = EditorNumber;
  return this;
};

/**
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

@param {string} field The fieldname this will bind to.
@param {int} size The number of bits this number should have (8,16,24,32). Only 32 bit ints support signs.
@param {int} data The default value
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {NumberArchetype} this.
*/
NumberArchetype.prototype.initWithFields = function (field, size, data, description) {
  this._listeners = [];
  this.fieldName = field;
  this.size = Math.ceil(size / 8) * 8;
  if (this.size == 32) {
    this.maxSize = 2147483647;
    this.minSize = -2147483648;
  } else {
    this.maxSize = (1 << this.size) - 1;
    this.minSize = 0;
  }
  this.data = data;
  this.description = description;
  this.editorClass = EditorNumber;
  return this;
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?number} data Optional data the field should assume.
*/
NumberArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new NumberField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
NumberArchetype.prototype.toPrototype = function () {
  return hex2a(NumberArchetype.type, 32) + this.fieldName + "\0" + hex2a(this.size, 8) + hex2a(this.data, this.size) + this.description + "\0";
};

/**
Get the Number's data.
@return {Number} The Number held.
*/
NumberArchetype.prototype.get = function () {
  return this.data;
};

/**
Get a shallow copy of the data held.
@return {number} a shallow copy of the data held.
*/
NumberArchetype.prototype.copyData = NumberArchetype.prototype.get;

/**
Set the Number's data.
@param {?NumberField} field The field to execute on.
@param {Number} val The updated Number.
*/
NumberArchetype.prototype.set = function (field, val) {
  if (arguments.length == 1)
    return this.set(this, field);
  field.data = Math.max(this.minSize, Math.min(this.maxSize, val));
};

/**
Dump the NumberField's editor into a html element
@param {?NumberField} field The field to execute on.
@param {HTMLElement} container The place to append
the editor to.
*/
NumberArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
NumberArchetype.prototype.onChange = function (func) {
  this._listeners.push(func);
};

/**
Removes all attached listeners
*/
NumberArchetype.prototype.removeListeners = function (func) {
  this._listeners = [];
};

/**
send a message to all attached listeners
*/
NumberArchetype.prototype.messageListeners = function (x) {
  var l = this._listeners,
    len = l.length;
  for (var i = 0; i < len; i++) {
    var event = {
      target: this
    };
    if (x) {
      for (var k in x) {
        event[k] = x[k];
      }
    }
    l[i](event);
  }
};


/**
A Number array of data, that captures an array of Numbers connected to an object.

@constructor
@this {NumberArrayArchetype} 

@property {String} fieldName The key this is associated with.
@property {Uint32} size The number of Numbers associated with this.
@property {Array.<Number>} data The stored Numbers.
*/
function NumberArrayArchetype(prototype, field) {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Uint32), 1:(Numbers numberof 0)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {NumberArrayArchetype} this.
*/
NumberArrayArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  var self = this;
  this.fieldName = field;
  this.bits = Math.ceil(prototype.get8bits() / 8) * 8;
  if (this.bits == 32) {
    this.maxSize = 2147483647;
    this.minSize = -2147483648;
  } else {
    this.maxSize = (1 << this.bits) - 1;
    this.minSize = 0;
  }
  this.size = prototype.get32bits();
  this.data = new Array(this.size);

  //initialization ints
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = prototype.get(this.bits);
  }
  this.editorClass = EditorNumberArray;
  this.editorForClass = EditorForNumberArray;
  return this;
};

/**
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

@param {string} field The fieldname this will bind to.
@param {int} bits The number of bits this number should have (8,16,24,32). Only 32 bit ints support signs.
@param {int} size The number of elements this holds
@param {Array.<int>} data The default values.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {NumberArrayArchetype} this.
*/
NumberArrayArchetype.prototype.initWithFields = function (field, bits, size, data) {
  this._listeners = [];
  this.fieldName = field;
  this.bits = Math.ceil(bits / 8) * 8;
  if (this.bits == 32) {
    this.maxSize = 2147483647;
    this.minSize = -2147483648;
  } else {
    this.maxSize = (1 << this.bits) - 1;
    this.minSize = 0;
  }
  this.size = size;
  this.data = new Array(this.size);
  for (var i = 0; i < size; i++) {
    this.set(this, i, data[i]);
  }
  this.editorClass = EditorNumberArray;
  this.editorForClass = EditorForNumberArray;
  return this;
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?number} data Optional data the field should assume.
*/
NumberArrayArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new NumberArrayField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get a shallow copy of the Number's value.
@return {Array.<Number>} The Number held.
*/
NumberArrayArchetype.prototype.copyData = function () {
  var copy = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    copy[i] = this.data[i];
  }
  return copy;
};

/**
concatenate the numbers held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
NumberArrayArchetype.prototype.join = function (separator) {
  return this.data.join(separator);
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
NumberArrayArchetype.prototype.toPrototype = function () {
  var str = hex2a(NumberArrayArchetype.type, 32) + this.fieldName + "\0" + hex2a(this.bits, 8) + hex2a(this.size, 32);
  var len = this.data.length,
    i = 0;
  while (i < len) {
    str += hex2a(this.data[i++], this.bits);
  }
  return str;
};

/**
Get the nth Number stored.
@param {number} nth The position of the Number to get.
@return {number} The value of the Number.
*/
NumberArrayArchetype.prototype.get = function (nth) {
  return this.data[nth];
};

/**
Set the nth stored Number to a value.
@param {?NumberArrayField} field The field to execute on.
@param {number} nth The position of the Number to set.
@param {Number} val The value to change the Number to.
*/
NumberArrayArchetype.prototype.set = function (field, nth, val) {
  if (arguments.length == 2)
    return this.set(this, field, nth);
  field.data[nth] = Math.max(this.minSize, Math.min(this.maxSize, val));
};

/**
Expand the number of Numbers stored by one
*/
NumberArrayArchetype.prototype.grow = function () {
  this.size++;
  this.data.push(0);
  this.messageListeners({
    type: "grow"
  });
};

/**
Shrink the number of Numbers stored by one
*/
NumberArrayArchetype.prototype.shrink = function (i) {
  this.size--;
  if (i == undefined)
    i = this.size;
  this.data.splice(i, 1);
  this.messageListeners({
    type: "shrink",
    index: i
  });
};

/**
Get the editor for the Number at index i.
@param {?NumberArrayField} field The field to execute on.
@param {number} i The index.
@param {HTMLElement} div The container to append to.
*/
NumberArrayArchetype.prototype._editorFor = function (field, i, div, onlyEditor) {
  if (arguments.length == 3)
    return this._editorFor(this, field, i, div);
  return new this.editorForClass(this, field, i, div, onlyEditor);
};

/**
Dump the Number array's editor into a html element
@param {?NumberArrayField} field The field to execute on.
@param {HTMLElement} container The place to append
the editor to.
*/
NumberArrayArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
NumberArrayArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
NumberArrayArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
NumberArrayArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/////////////
// Boolean //
/////////////
/**
A bit field of data, that captures several booleans connected to an object.

@constructor
@this {BooleanArchetype}

@property {Uint32} size The number of bits associated with this.
@property {Uint32} bytes The number of bytes associated with this.
@property {Array.<Uint8>} data The actual stored information.
@property {Array.<String>} descriptions The on edit description of each field.
*/
function BooleanArchetype() {

}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Uint32), 1:(Bits numberof 0), 2:(String numberof 0), 3:(String numberof 0)descriptions

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {BooleanArchetype} this.
*/
BooleanArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  this.size = prototype.get32bits();
  this.data = new Array(Math.ceil(this.size / 8));
  this.propNames = new Array(this.size);
  this.descriptions = new Array(this.size);
  //initialization bools
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = prototype.get8bits();
  }
  for (var i = 0; i < this.size; i++) {
    this.propNames[i] = prototype.getString();
  }

  for (var i = 0; i < this.size; i++) {
    var description = prototype.getString();
    this.descriptions[i] = description;
  }

  this.editorClass = EditorBoolean;
  return this;
};

/**
Initialize the boolean archetype.
@param {string} field The fieldname this will bind to.
@param {int} size The number of booleans associated witht this.
@param {Array.<boolean>} data The default truth values for this.
@param {array.<string>} propertyNames The property names
that will be bound for each boolean.
@param {array.<string>} descriptions The text description of each field.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {BooleanArchetype} this.
*/
BooleanArchetype.prototype.initWithFields = function (field, size, data, propertyNames, descriptions) {
  this._listeners = [];
  this.fieldName = field;
  this.size = size;
  this.propNames = propertyNames;
  this.descriptions = descriptions;
  this.data = new Array(Math.ceil(this.size / 8));
  for (var i = 0; i < size; i++) {
    this.set(i, data[i]);
  }
  this.editorClass = EditorBoolean;
  return this;
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?bitfield.<boolean>} data Optional data the field should assume.
*/
BooleanArchetype.prototype.newField = function (owner, data) {
  var self = owner[this.fieldName] = new BooleanField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
  for (var i = 0; i < this.size; i++) {
    var prop = this.propNames[i];
    var pos = i;
    (function (pos) {
      owner[prop] = {
        get: function () {
          return self.get(pos);
        },
        set: function (val) {
          self.set(pos, val);
        }
      };
    })(i);
  }
};

/**
Get a shallow copy of the Number's value.
@return {bitfield.<boolean>} The Number held.
*/
BooleanArchetype.prototype.copyData = function () {
  var copy = new Array(this.data.length);
  for (var i = 0; i < this.data.length; i++) {
    copy[i] = this.data[i];
  }
  return copy;
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
BooleanArchetype.prototype.toPrototype = function () {
  return hex2a(BooleanArchetype.type, 32) + this.fieldName + "\0" + hex2a(this.size, 32) +
    (new CharArray).initWithRLB(0, this.data.length, this.data).toString() +
    this.propNames.join("\0") + "\0" +
    this.descriptions.join("\0") + "\0";
};

/**
Get the nth bool stored.
@param {number} nth The position of the bool to get.
@return {boolean} The value of the bool.
*/
BooleanArchetype.prototype.get = function (nth) {
  var byte = Math.floor(nth / 8);
  var pos = 7 - (nth - (byte << 3));
  return this.data[byte] & (1 << pos);
};

/**
Set the nth stored bool to a value.
@param {number} nth The position of the bool to set.
@param {boolean} val The value to change the bool to.
*/
BooleanArchetype.prototype.set = function (nth, val) {
  var byte = Math.floor(nth / 8);
  var pos = 7 - (nth - (byte << 3));
  this.data[byte] ^= this.data[byte] & (1 << pos);
  this.data[byte] |= (val << pos);
};

/**
Dump the bitfield's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
BooleanArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
BooleanArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
BooleanArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
BooleanArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A bit array of data, that captures several booleans connected to an object.

@constructor
@this {BooleanArrayArchetype}

@property {Uint32} size The number of bits associated with this.
@property {Uint32} bytes The number of bytes associated with this.
@property {Array.<Uint8>} data The actual stored information.
*/
function BooleanArrayArchetype(prototype, field) {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Uint32), 1:(Bits numberof 0)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {BooleanArrayArchetype} this.
*/
BooleanArrayArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  this.size = prototype.get32bits();
  this.data = new Array(Math.ceil(this.size / 8));
  //initialization bools
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = prototype.get8bits();
  }

  this.editorClass = EditorBooleanArray;
  this.editorForClass = EditorForBooleanArray;
  return this;
};

/**
Initialize the boolean array archetype.
@param {string} field The fieldname this will bind to.
@param {int} size The number of booleans associated witht this.
@param {Array.<boolean>} data The default truth values for this.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {BooleanArrayArchetype} this.
*/
BooleanArrayArchetype.prototype.initWithFields = function (field, size, data) {
  this._listeners = [];
  this.fieldName = field;
  this.size = size;
  this.data = new Array(Math.ceil(this.size / 8));
  for (var i = 0; i < size; i++) {
    this.set(i, data[i]);
  }
  this.editorClass = EditorBooleanArray;
  this.editorForClass = EditorForBooleanArray;
  return this;
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
BooleanArrayArchetype.prototype.toPrototype = function () {
  return hex2a(BooleanArrayArchetype.type, 32) + this.fieldName + "\0" + hex2a(this.size, 32) +
    (new CharArray).initWithRLB(0, this.data.length, this.data).toString();
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?bitfield.<boolean>} data Optional data the field should assume.
*/
BooleanArrayArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new BooleanArrayField(data || this.copyData(), this, data ? data.length * 8 : this.size);
  owner.size = this.size;
  if (data) {
    owner.size = data.length * 8;
  }
  owner._fields.push(this.fieldName);
};

/**
Get a shallow copy of the Number's value.
@return {bitfield.<boolean>} The Number held.
*/
BooleanArrayArchetype.prototype.copyData = function () {
  var copy = new Array(this.data.length);
  for (var i = 0; i < this.data.length; i++) {
    copy[i] = this.data[i];
  }
  return copy;
};

/**
concatenate the numbers held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
BooleanArrayArchetype.prototype.join = function (separator) {
  var str = "";
  for (var i = 0; i < this.size; i++) {
    str += !!this.get(i);
    if (i + 1 != this.size)
      str += separator;
  }
  return str;
};

/**
Get the nth bool stored.
@param {number} nth The position of the bool to get.
@return {boolean} The value of the bool.
*/
BooleanArrayArchetype.prototype.get = function (nth) {
  var byte = Math.floor(nth / 8);
  var pos = 7 - (nth - (byte << 3));
  return this.data[byte] & (1 << pos);
};

/**
Set the nth stored bool to a value.
@param {number} nth The position of the bool to set.
@param {boolean} val The value to change the bool to.
*/
BooleanArrayArchetype.prototype.set = function (nth, val) {
  var byte = Math.floor(nth / 8);
  var pos = 7 - (nth - (byte << 3));
  this.data[byte] ^= this.data[byte] & (1 << pos);
  this.data[byte] |= (val << pos);
};

/**
Expand the number of booleans stored by one
*/
BooleanArrayArchetype.prototype.grow = function () {
  this.size++;
  if ((this.data.length << 3) < this.size) {
    this.data.push(0);
  }
  this.messageListeners({
    type: "grow"
  });
};

/**
Shrink the number of booleans stored by one
@param {?number} index Optional index; which nth boolean to remove.
*/
BooleanArrayArchetype.prototype.shrink = function (index) {
  this.size--;
  var d = this.data,
    len = d.length;
  if (index === undefined)
    index = this.size;
  var byte = Math.floor(index / 8);
  var pos = 7 - (index - (byte << 3));
  var FF = 0xFF;
  var b = d[byte],
    e = 0;
  while (byte < len) {
    b ^= (b & (1 << pos));
    b = (b & (FF << pos)) | (b & (FF >> (8 - pos)));
    if (byte + 1 < len) {
      e = d[byte + 1];
      b |= (e & 0x80) >> 7;
    }
    d[byte++] = b;
  }
  if ((this.data.length << 3) - this.size >= 8) {
    this.data.pop();
  }
  this.messageListeners({
    type: "shrink",
    index: index
  });
};

/**
Get the editor for the bool at index i.
@param {number} i The index.
@param {HTMLElement} div The container to append to.
*/
BooleanArrayArchetype.prototype._editorFor = function (field, i, div, onlyEditor) {
  if (arguments.length == 3)
    return this._editorFor(this, field, i, div);
  return new this.editorForClass(this, field, i, div, onlyEditor);
};

/**
Dump the bitarray's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
BooleanArrayArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
BooleanArrayArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
BooleanArrayArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
BooleanArrayArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

///////////
// Color //
///////////
/**
A simple Color field.
This takes 0:(Color), 1:(String)

@constructor
@this {ColorArchetype} 

@param {?CharArray} prototype The binary data source.
@param {?Object} object The object to bind fields to.

@property {CharArray} value The color held.
@property {String} description The description of the color held.
*/
function ColorArchetype(prototype, field) {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Color), 1:(String)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {ColorArchetype} this for chaining.
*/
ColorArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field
  this.data = prototype.getChars(4);
  this.description = prototype.getString();
  this.editorClass = EditorColor;
  return this;
};

/**
Initialize the ColorArchetype.
@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {ColorArchetype} this for chaining.
*/
ColorArchetype.prototype.initWithFields = function (field, data, description) {
  this._listeners = [];
  this.fieldName = field
  this.data = new CharArray();
  this.data.initWithString(hex2a(data));
  this.description = description;
  this.editorClass = EditorColor;
  return this;
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
ColorArchetype.prototype.toPrototype = function () {
  return hex2a(ColorArchetype.type, 32) + this.fieldName + "\0" + this.data + (this.description + "\0");
};

/**
Get the color's value.
@return {String} The color held.
*/
ColorArchetype.prototype.get = function () {
  return this.data.rollBack().getColor();
};

/**
Set the color's value.
@param {String} val The updated color.
*/
ColorArchetype.prototype.set = function (val) {
  this.data.initWithString(hex2a(val));
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?number} data Optional data the field should assume.
*/
ColorArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new ColorField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get a deep copy of the Number's value.
@return {Array.<Number>} The Number held.
*/
ColorArchetype.prototype.copyData = function () {
  return (new CharArray()).initWithString(this.data.toString());
};

/**
Dump the StringField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
ColorArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
ColorArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
ColorArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
ColorArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A string array of colors, that captures an array of colors connected to an object.
This takes 0:(Uint32), 1:(Colors numberof 0)

@constructor
@this {ColorArrayArchetype} 

@property {Uint32} size The number of colors associated with this.
@property {Array.<CharArray>} data The stored colors.
*/
function ColorArrayArchetype(prototype, field) {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Uint32), 1:(Colors numberof 0)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {ColorArrayArchetype} this.
*/
ColorArrayArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  var self = this;
  this.size = prototype.get32bits();
  this.data = new Array(this.size);
  //initialization bools
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = prototype.getChars(4);
  }
  this.editorClass = EditorColorArray;
  this.editorForClass = EditorForColorArray;
  return this;
};

/**
Initialize the color array archetype.
@param {string} field The fieldname this will bind to.
@param {int} size The number of booleans associated witht this.
@param {array.<string>} data The default colors for this in hex of format #aarrggbb
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {ColorArrayArchetype} this.
*/

ColorArrayArchetype.prototype.initWithFields = function (field, size, data) {
  this._listeners = [];
  this.fieldName = field;
  this.size = size;
  this.data = new Array(this.size);
  //initialization bools
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = new CharArray();
    this.data[i].initWithString(hex2a(data[i]));
  }
  this.editorClass = EditorColorArray;
  this.editorForClass = EditorForColorArray;
  return this;
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
ColorArrayArchetype.prototype.toPrototype = function () {
  return hex2a(ColorArrayArchetype.type, 32) + this.fieldName + "\0" +
    hex2a(this.size, 32) +
    this.data.join("");
};

/**
Get the nth String stored.
@param {number} nth The position of the String to get.
@return {string} The rgba color.
*/
ColorArrayArchetype.prototype.get = function (nth) {
  return this.data[nth].rollBack().getColor();
};

/**
Set the nth stored String to a value.
@param {number} nth The position of the String to set.
@param {String} val The value to change the String to.
*/
ColorArrayArchetype.prototype.set = function (nth, val) {
  this.data[nth].initWithString(hex2a(val));
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?Array.<CharArray>} data Optional data the field should assume.
*/
ColorArrayArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new ColorArrayField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get a deep copy of the color's value.
@return {Array.<CharArray>} The color held.
*/
ColorArrayArchetype.prototype.copyData = function () {
  var copy = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    copy[i] = (new CharArray()).initWithString(this.data[i].toString());
  }
  return copy;
};

/**
concatenate the numbers held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
ColorArrayArchetype.prototype.join = function (separator) {
  var str = "";
  for (var i = 0; i < this.size; i++) {
    str += this.data[i].rollBack().getColor();
    if (i + 1 != this.size)
      str += separator;
  }
  return str;
};

/**
Expand the number of colors stored by one
*/
ColorArrayArchetype.prototype.grow = function () {
  this.size++;
  this.data.push((new CharArray()).initWithRLB(0, 4, [255, 255, 0, 0]));
  this.messageListeners({
    type: "grow"
  });
};

/**
Shrink the number of colors stored by one
@param {?number} index. Which element to remove
*/
ColorArrayArchetype.prototype.shrink = function (index) {
  this.size--;
  if (index === undefined) {
    index = this.size;
  }
  this.data.splice(index, 1);
  this.messageListeners({
    type: "shrink",
    index: index
  });
};

/**
Get the editor for the Color at index i.
@param {number} i The index.
@param {HTMLElement} div The container to append to.
*/
ColorArrayArchetype.prototype._editorFor = function (field, i, div, onlyEditor) {
  if (arguments.length == 3)
    return this.edit(this, field, i, div);
  return new this.editorForClass(this, field, i, div, onlyEditor);
};

/**
Dump the Color array's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
ColorArrayArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
ColorArrayArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
ColorArrayArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
ColorArrayArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

////////////
// String //
////////////
/**
A simple String field.

@constructor
@this {StringArchetype} 

@property {String} fieldName The key this is associated with.
@property {String} value The stored String.
@property {String} description The edit tip.
*/
function StringArchetype(prototype, field) {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(String), 1:(String)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {StringArchetype} this.
*/
StringArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  this.data = prototype.getString();
  this.description = prototype.getString();
  this.editorClass = EditorString;
  return this;
};

/**
Initialize the string archetype.
@param {string} field The fieldname this will bind to.
@param {string} data The default truth values for this.
@param {string} description The text description of this field.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@return {StringArchetype} this.
*/
StringArchetype.prototype.initWithFields = function (field, data, description) {
  this._listeners = [];
  this.fieldName = field;
  this.data = data;
  this.description = description;
  this.editorClass = EditorString;
  return this;
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?string} data Optional data the field should assume.
*/
StringArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new StringField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
StringArchetype.prototype.toPrototype = function () {
  return hex2a(StringArchetype.type, 32) + this.fieldName + "\0" + this.data + "\0" + this.description + "\0";
};

/**
Get the string's value.
@return {String} The string held.
*/
StringArchetype.prototype.get = function () {
  return this.data;
};

/**
Set the string's value.
@param {String} val The updated string.
*/
StringArchetype.prototype.set = function (val) {
  this.data = val;
};

/**
Get a shallow copy of the data held.
@return {string} a shallow copy of the data held.
*/
StringArchetype.prototype.copyData = StringArchetype.prototype.get;

/**
Dump the StringField's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
StringArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
StringArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
StringArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
StringArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;

/**
A string array of data, that captures an array of strings connected to an object.

@constructor
@this {StringArrayArchetype} 

@property {Uint32} size The number of strings associated with this.
@property {Array.<String>} data The stored strings.
*/
function StringArrayArchetype() {}

/**
@private
The initialization process, separated from the constructor in case
initialization of parameters needs to be redone or
happen at a different time.

This takes 0:(Uint32), 1:(Strings numberof 0)

@param {CharArray} prototype The binary data source.
@param {Object} object The object to bind fields to.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {StringArrayArchetype} this.
*/
StringArrayArchetype.prototype.initWithPO = function (prototype, field) {
  this._listeners = [];
  this.fieldName = field;
  var self = this;
  this.size = prototype.get32bits();
  this.data = new Array(this.size);
  //initialization bools
  for (var i = 0; i < this.data.length; i++) {
    this.data[i] = prototype.getString();
  }
  this.editorClass = EditorStringArray;
  this.editorForClass = EditorForStringArray;
  return this;
};

/**
Initialize the string array archetype.
@param {string} field The fieldname this will bind to.
@param {int} size The number of booleans associated witht this.
@param {Array.<string>} data The default string values for this.
@param {Class} editorClass The editor that will be used to modify the contents of this field when .edit($) is called.
@param {Class} editorForClass The _for editor that will be used to modify the contents of each item in the array.
@return {StringArrayArchetype} this.
*/
StringArrayArchetype.prototype.initWithFields = function (field, size, data) {
  this._listeners = [];
  this.fieldName = field;
  this.size = size;
  this.data = data;
  this.editorClass = EditorStringArray;
  this.editorForClass = EditorForStringArray;
  return this;
};

/**
Get the raw data used to generate this in its current state.
@return {Binary|String} The necessary information
required by the constructor's CharArray
*/
StringArrayArchetype.prototype.toPrototype = function () {
  return hex2a(StringArrayArchetype.type, 32) + this.fieldName + "\0" +
    hex2a(this.size, 32) +
    this.data.join("\0") + "\0";
};

/**
Make a new field on the object.
@param {FieldOwner} owner What the field should be attached to.
@param {?string} data Optional data the field should assume.
*/
StringArrayArchetype.prototype.newField = function (owner, data) {
  owner[this.fieldName] = new StringArrayField(data || this.copyData(), this);
  owner._fields.push(this.fieldName);
};

/**
Get the nth String stored.
@param {number} nth The position of the String to get.
@return {string} The value of the String.
*/
StringArrayArchetype.prototype.get = function (nth) {
  return this.data[nth];
};

/**
Set the nth stored String to a value.
@param {number} nth The position of the String to set.
@param {String} val The value to change the String to.
*/
StringArrayArchetype.prototype.set = function (nth, val) {
  this.data[nth] = val;
};

/**
Get a shallow copy of the String's value.
@return {string} The string held.
*/
StringArrayArchetype.prototype.copyData = NumberArrayArchetype.prototype.copyData;

/**
concatenate the strings held
@param {string} separator The string to occur between elements
@return {String} The result.
*/
StringArrayArchetype.prototype.join = NumberArrayArchetype.prototype.join;

/**
Expand the number of Strings stored by one
*/
StringArrayArchetype.prototype.grow = function () {
  this.size++;
  this.data.push("");
  this.messageListeners({
    type: "grow"
  });
};

/**
Shrink the number of Strings stored by one
@param {?number} index. Which element to remove
*/
StringArrayArchetype.prototype.shrink = function (index) {
  this.size--;
  if (index === undefined)
    index = this.size;
  this.data.splice(index, 1);
  this.messageListeners({
    type: "shrink",
    index: index
  });
};

/**
Get the editor for the String at index i.
@param {number} i The index.
@param {HTMLElement} div The container to append to.
*/
StringArrayArchetype.prototype._editorFor = function (field, i, div, onlyEditor) {
  if (arguments.length == 3)
    return this._editorFor(this, field, i, div);
  return new this.editorForClass(this, field, i, div, onlyEditor)
};

/**
Dump the String array's editor into a html element
@param {HTMLElement} container The place to append
the editor to.
*/
StringArrayArchetype.prototype.edit = function (field, container) {
  if (arguments.length == 1)
    return this.edit(this, field);
  return new this.editorClass(this, field, container, false);
};

/**
Add a listener that will be called any
time this field's editor is updated
@param {funciton} func The function to be called.
The function will be passed {target:this} when called
*/
StringArrayArchetype.prototype.onChange = NumberArchetype.prototype.onChange;

/**
Removes all attached listeners
*/
StringArrayArchetype.prototype.removeListeners = NumberArchetype.prototype.removeListeners;

/**
send a message to all attached listeners
*/
StringArrayArchetype.prototype.messageListeners = NumberArchetype.prototype.messageListeners;