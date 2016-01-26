/**
 * Creates an instance of SelectOptGrouped.
 *
 * @author Stephen Oro
 * @constructor
 * @this {SelectOptGrouped}
 * @param {object} groups Hierarchy of groups.
 * @param {string} value Value of chosen option.
 * @property {HTMLElement} element The <select><option>Select</option></select> element.
 * @property {function} onchange The onChange callback.
 * @example
 * var sel = new SelectOptGrouped({
 *	opt1: {
 *		value: "Option user sees #1"
 *	},
 *	opt2: {
 *		value: 2
 *	},
 *	GroupName: {
 *		isOptGroup: 1,
 *		value: {
 *			opt1: {
 *				value: "pigs"
 *			},
 *			opt2: {
 *				value: document.createElement("IMG")
 *			}
 *		}
 *	}
 * });
 */
function SelectOptGrouped(groups) {
	this.groups = groups;
	var options = document.createDocumentFragment();
	this.convertGroupToOpt(this.groups, options);
	var sel = Util.make("select");
	sel.appendChild(options);
	this.element = sel;
	this.options = options;
	this.value = this.element.value;
	this.onchange = null;
	this.changeCaller();
	this.element.addEventListener("change", (this.changeCaller).bind(this));
}

/**
Calls the on change function and sets own value,
bound to onchange event of this.element.
*/
SelectOptGrouped.prototype.changeCaller = function () {
	this.value = this.element.value;

	var opt = this.element.options[this.element.selectedIndex];
	this.value = opt.value;
	while (opt.parentElement != this.element) {
		opt = opt.parentElement;
		this.value = opt.label + "." + this.value;
	}
	if (this.onchange) {
		this.onchange();
	}
};

/**
Converts a group hierarchy object into options and groups recursively.

@param {Object} group Hierarchy of groups.
@param {HTMLElement} options The option or document fragment to append children to.
*/
SelectOptGrouped.prototype.convertGroupToOpt = function (group, options) {
	var SOGroup = options.SOGroup;
	if (!SOGroup) {
		options.SOGroup = {};
		SOGroup = options.SOGroup;
	}
	for (var key in group) {
		if (group[key].isOptGroup) {
			var optgr = Util.make("optgroup", {
				label: key
			});
			var children = this.convertGroupToOpt(group[key].value, optgr);
			options.appendChild(optgr);
			SOGroup[key] = optgr;
		} else {
			var opt = Util.option(key, group[key].value);
			options.appendChild(opt);
			SOGroup[key] = opt;
		}
	}
};

/**
Removes a option at the specified dotted path

@param {String} path The dotted access path
@example this.remove("GroupKey.OptionKey");
*/
SelectOptGrouped.prototype.remove = function (path) {
	var parts = path.split(".");
	var node = this.groups;
	var context = this.options;
	var valid = true;
	for (var i = 0;
		(i < parts.length - 1) && valid; i++) {
		node = node[parts[i]];
		if (!node) {
			valid = false;
		} else {
			node = node.value;
			context = context.SOGroup[parts[i]];
		}
	}
	if (valid) {
		var last = parts[parts.length - 1];
		if (node[last]) {
			context.removeChild(context.SOGroup[last]);
			node[last] = undefined;
			context.SOGroup[last] = undefined;
			delete(node[last]);
			delete(context.SOGroup[last]);
		}
	}
};

/**
Sets a option at the specified dotted path

@param {String} path The dotted access path
@param {String} value The desired value
@example this.set("GroupKey.OptionKey", Util.span("stuff"));
*/
SelectOptGrouped.prototype.set = function (path, value) {
	var parts = path.split(".");
	var node = this.groups;
	var context = this.options;
	var valid = true;
	for (var i = 0;
		(i < parts.length) && valid; i++) {
		node = node[parts[i]];
		if (!node) {
			valid = false;
		} else {
			node = node.value;
			context = context.SOGroup[parts[i]];
		}
	}
	if (valid) {
		for (var key in value) {
			if (node[key]) {
				context.removeChild(context.SOGroup[key]);
			}
			node[key] = value[key];
		}
		this.convertGroupToOpt(value, context);
	}
};