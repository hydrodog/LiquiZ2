
/**
This is a function NOT a class.
You input a class into this function,
and it will allow you to add fields to the class.
Then, inside of the class's constructor, the 
first line you call ClassName.initFields(this);
*/
function MakeArchetypical(myClass) {
  myClass._listeners = [];
  myClass._fields = [];
  myClass.addField = MakeArchetypical.addField;
  myClass.edit = MakeArchetypical.edit;
  myClass.initFields = MakeArchetypical.initFields;
}

/**
Add a field to the class
*/
MakeArchetypical.addField = function (field) {
  this._fields.push(field);
};

/**
Edit the class's fields (normally don't call this ever).
*/
MakeArchetypical.edit = function (container) {
  for (var i = 0; i < this._fields.length; i++) {
    this._fields[i].edit(container);
  }
};

/**
Edit the instance's fields.
*/
MakeArchetypical.childedit = function (container) {
  for (var i = 0; i < this._fields.length; i++) {
    this._editors[i] = this[this._fields[i]].edit(container);
  }

};

/**
Initialize an instance of the class.
*/
MakeArchetypical.initFields = function (owner) {
  var f = this._fields,
    l = f.length;
  owner._fields = [];
  owner._listeners = [];
  owner._editors = [];
  for (var i = 0; i < l; i++) {
    f[i].newField(owner);
  }
  owner.edit = MakeArchetypical.childedit;
};
