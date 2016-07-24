/**
Internal data manipulation, useful for reading or writing to binary.
@constructor
@this{CharArray}
@property {number} length The length of the input, never used, except for
converting to string.
@property {number} readHead Where the current data is being pulled from
@property {Array.<Uint8>} readHead Where the current data is being pulled from.
*/
function CharArray() {
  this.length = this.readHead = 0;
  this.buffer = null;
}

CharArray.prototype.initWithString = function (string) {
  this.readHead = 0;
  this.length = string.length;
  this.buffer = string.split("");
  for (var i = 0; i < this.length; i++) {
    this.buffer[i] = this.buffer[i].charCodeAt(0);
  }
  return this;
};

CharArray.prototype.initWithRLB = function (readHead, length, buffer) {
  this.readHead = readHead;
  this.length = length;
  this.buffer = buffer;
  return this;
};

CharArray.prototype.getBuffer = function () {
  return this.buffer;
};

CharArray.prototype.getString = function () {
  var start = this.readHead;
  while (this.buffer[this.readHead++] != '\0'.charCodeAt(0));
  var len = this.readHead - start;
  var array = new Array(--len);
  while (len--) {
    array[len] = String.fromCharCode(this.buffer[len + start]);
  }
  return array.join("");
};

CharArray.prototype.toString = function () {
  var index = this.length;
  var array = new Array(index);
  while (index--) {
    array[index] = String.fromCharCode(this.buffer[index]);
  }
  return array.join("");
};

CharArray.prototype.rollBack = function () {
  this.readHead = 0;
  return this;
};

CharArray.prototype.rollBackBy = function (amount) {
  this.readHead -= amount;
  return this;
};

CharArray.prototype.get32bits = function () {
  var ret = ((this.buffer[this.readHead] << 24) |
    (this.buffer[this.readHead + 1] << 16) |
    (this.buffer[this.readHead + 2] << 8) |
    (this.buffer[this.readHead + 3]))|0;
  this.readHead += 4;
  return ret;
};

CharArray.prototype.get24bits = function () {
  var ret = (this.buffer[this.readHead] << 16) |
    (this.buffer[this.readHead + 1] << 8) |
    (this.buffer[this.readHead + 2]);
  this.readHead += 3;
  return ret;
};

CharArray.prototype.get16bits = function () {
  var ret = (this.buffer[this.readHead] << 8) |
    (this.buffer[this.readHead + 1]);
  this.readHead += 2;
  return ret;
};

CharArray.prototype.getChars = function (length) {
  var newBuffer = new Array(length);
  var i = 0;
  while (i < length) {
    newBuffer[i++] = this.buffer[this.readHead++];
  }
  var array = new CharArray();
  array.initWithRLB(0, length, newBuffer);
  return array;
};

CharArray.prototype.get = function (x) {
  switch (x) {
  case 8:
    return this.get8bits();
    break;
  case 16:
    return this.get16bits();
    break;
  case 24:
    return this.get24bits();
    break;
  default:
    return this.get32bits();
    break;
  }
};

CharArray.prototype.get8bits = function () {
  return this.buffer[this.readHead++];
};

CharArray.prototype.getColor = function () {
  var a = (this.get8bits()/255);
  return "rgba(" + this.get8bits() + "," + this.get8bits() + "," + this.get8bits() + "," + a + ")";
};

CharArray.prototype.getLength = function () {
  return this.length;
};

CharArray.prototype.changeTo = function (array, start) {
  var other = array.buffer;
  var size = array.length;
  for (var i = 0; i < size; i++) {
    this.buffer[i + start] = this.other[i];
  }
};

/**
converts hex into ascii.
*/
function hex2a(hexx, length) {
  if(hexx < 0){
    hexx = 0xFFFFFFFF + hexx + 1;
  }
  var hex = hexx.toString(16); //force conversion
  length = length || (hex.length << 2);
  length >>= 2;
  var str = '';
  for (var i = 0; i < hex.length && i < length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  while (i < length) {
    str = String.fromCharCode(0) + str;
    i += 2;
  }
  return str;
}

