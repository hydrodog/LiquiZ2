/**
This provides the ability to define tables
whose cells have the ability to span more
than one cell in width or height, and whose
data is pulled from either a nested array
or derived from a function that accepts
row and collumn information.<br><br>
This table follows the initialization pattern,
but parameters may be set before initialization.
However, initialization and either data or a 
data function is required for the table to display.
@constructor
@this {Table}
@property {Int32} type The bitfield containing the types this
table has acquired.
@property {number} rows The number of rows the table has.
@property {?number} width The fixed width of the table.
@property {?number} height The fixed height of the table.
@property {number} cols The number of columns the table has.
@property {?Array.<Array.<Unknown>>} data The nested array source for the table.
@property {Function(r,c)} dataFunction The function source for the table.
@example
var t = (new Table()).initWithRowsCols(3,3).setFunction(function(r,c){
  if(r==0 && c==0){
    return {info:{width: 2, height: 2, type:Table.CELL_TEXT, alignment:Table.ALIGN_RIGHT}, content:"blargh..."};
  }
  return "AARGH!";
}).setAlignment(Table.ALIGN_LEFT).setBorder(2).setColWidth(100).setRowHeight(100);
document.body.appendChild(t.load());
t.addCol(2, 0);
t.addCol(3, 1);
t.addRow(2, 0);
t.addRow(3, 1);
*/
function Table() {
	this.type = Table.TYPE_UNDEFINED;
	this.rows = -1;
	this.width = null;
	this.height = null;
	this.cols = -1;
	this.data = null;
	this.dataFunction = null;
	this.container = null;
	this.table = null;
	this.contentGrid = null;
	this.colWidths = null;
	this.rowHeights = null;
	this.borderWidth = 0;
	this.alignment = Table.ALIGN_LEFT;
	this.jquery = null;
}

/**
Specifies the table is uninitialized.
@const {Table.TYPE_DEF}
*/
Table.TYPE_UNDEFINED = 0;
/**
Specifies the table is loaded from a function.
This enables the use of addRow and addCol
@const {Table.TYPE_DEF}
*/
Table.TYPE_FUNCTION = 0x1;
/**
Specifies the table is loaded from
a nested array.
@const {Table.TYPE_DEF}
*/
Table.TYPE_DATA = 0x2;
/**
Specifies the table has been initialized
with rows and columns.
@const {Table.TYPE_DEF}
*/
Table.TYPE_ROW_COL = 0x4;
/**
Specifies the table has it's column widths
specified by an array.
@const {Table.TYPE_DEF}
*/
Table.TYPE_COL_WIDTH = 0x8;
/**
Specifies the table has it's row heights
specified by an array.
@const {Table.TYPE_DEF}
*/
Table.TYPE_ROW_HEIGHT = 0x10;
/**
Specifies the table is loaded.
@const {Table.TYPE_DEF}
*/
Table.TYPE_LOADED = 0x20;
/**
Specifies the table has it's row heights
specified by a number.
@const {Table.TYPE_DEF}
*/
Table.TYPE_UNIT_ROW_HEIGHT = 0x40;
/**
Specifies the table has it's column widths
specified by a number.
@const {Table.TYPE_DEF}
*/
Table.TYPE_UNIT_COL_WIDTH = 0x80;

/**
The cell's content is text.
@const {Table.CELL_DEF}
*/
Table.CELL_TEXT = 1;
/**
The cell's content is html.
@const {Table.CELL_DEF}
*/
Table.CELL_HTML = 2;
/**
The cell's content is a HTMLElement.
@const {Table.CELL_DEF}
*/
Table.CELL_ELEMENT = 3;
/**
The cell's content is a Contained Object.
A contained object has a HTMLElement
held in a field called "container"
and has a method "end()" that is used
when the table is ended
@const {Table.CELL_DEF}
*/
Table.CELL_CONTAINED = 4;

/**
Align style left
@const {Table.ALIGN_DEF}
*/
Table.ALIGN_LEFT = 0;
/**
Align style right
@const {Table.ALIGN_DEF}
*/
Table.ALIGN_RIGHT = 1;
/**
Align style center
@const {Table.ALIGN_DEF}
*/
Table.ALIGN_CENTER = 2;
/**
Align style justify
@const {Table.ALIGN_DEF}
*/
Table.ALIGN_JUSTIFY = 3;
/**
Table ALIGN_DEFs are indexes of this array.
@const {Array.<string>}
*/
Table.ALIGNMENTS = ["left", "right", "center", "justify"];

/**
When this function is called, the table
will remove itself from its parent.
This function may only be called if the
table is loaded. Otherwise, it will throw
an error.
*/
Table.prototype.end = function () {
	if (this.type & Table.TYPE_LOADED) {
		this.type ^= Table.TYPE_LOADED;
		if (this.container) {
			this.container.parentElement.removeChild(this.container);
			this.container = null;
			this.table = null;
		}
		var grid = this.contentGrid,
			rlen = this.rows,
			clen = this.cols;
		for (var r = 0, ri = 0; r < rlen; r++) {
			var row = grid[r];
			for (var c = 0, ci = 0; c < clen; ci++) {
				var cell = row[c],
					info = cell.info;
				if (info.r != r) {
					c++;
					continue;
				}

				if (cell.content.end)
					cell.content.end();
				c += info.width;
			}
			row = null;
		}
		this.contentGrid = null;
	} else {
		throw new Error("The table is not loaded, so it cannot be ended.\
 This may be because the table has been ended already since its last load.");
	}
};

/**
Initializes the table with certain dimensions.
@param {number} rows Number of rows the table should have.
@param {number} cols Number of columns the table should have.
@return {Table} this, for chaining.
*/
Table.prototype.initWithRowsCols = function (rows, cols) {
	this.type |= Table.TYPE_ROW_COL;
	this.rows = rows;
	this.cols = cols;
	return this;
};

/**
Sets the data function; nulls nested array.
@param {Function(row,col)} dataFunction The 
function that data is loaded from.
@return {Table} this, for chaining.
*/
Table.prototype.setFunction = function (dataFunction) {
	this.type |= Table.TYPE_FUNCTION;
	this.dataFunction = dataFunction;
	this.type ^= this.type & Table.TYPE_DATA;
	this.data = null;
	return this;
};

/**
Sets the data nested array; nulls data function.
@param {Array.<Array.<HTMLElement|Number|String|Contained>>} data The 
nested array that data is loaded from.
@return {Table} this, for chaining.
*/
Table.prototype.setData = function (data) {
	this.type |= Table.TYPE_DATA;
	this.data = data;
	this.type ^= this.type & Table.TYPE_FUNCTION;
	this.dataFunction = null;
	return this;
};

/**
Set the width in pixels of the table.
@param {number} width The desired width.
@return {Table} this, for chaining.
*/
Table.prototype.setWidth = function (width) {
	this.width = width;
	return this;
};

/**
Set the uniform col width of the table.
@param {number} width Col height of one cell.
@return {Table} this, for chaining.
*/
Table.prototype.setColWidth = function (width) {
	this.type |= Table.TYPE_UNIT_COL_WIDTH;
	this.type ^= this.type & Table.TYPE_COL_WIDTH;
	this.colWidths = width;
	return this;
};

/**
Set the uniform row height of the table.
@param {number} height Row height of one cell.
@return {Table} this, for chaining.
*/
Table.prototype.setRowHeight = function (height) {
	this.type |= Table.TYPE_UNIT_ROW_HEIGHT;
	this.type ^= this.type & Table.TYPE_ROW_HEIGHT;
	this.rowHeights = height;
	return this;
};

/**
Set the height in pixels of the table.
@param {number} height The desired height.
@return {Table} this, for chaining.
*/
Table.prototype.setHeight = function (height) {
	this.height = height;
	return this;
};

/**
Set the border in pixels of the table.
@param {number} w The desired border width.
@return {Table} this, for chaining.
*/
Table.prototype.setBorder = function (w) {
	this.borderWidth = w;
	return this;
};

/**
Set width and the height of the table.
@param {number} w The desired width.
@param {number} h The desired height.
@return {Table} this, for chaining.
*/
Table.prototype.setSize = function (w, h) {
	return this.setWidth(w).setHeight(h);
};

/**
Set the alignment of the table [0,3].
@param {Table.ALIGN_DEF} alignment The alignment index to use.
@return {Table} this, for chaining.
*/
Table.prototype.setAlignment = function (alignment) {
	this.alignment = alignment || Table.ALIGN_LEFT;
	return this;
};

/**
Get or make the div that contains the table
@return {HTMLElement} The table's container
*/
Table.prototype.getContainer = function () {
	if (this.container)
		return this.container;
	this.container = document.createElement("DIV");
	return this.container;
};

/**
Attempt to figure out how to handle raw data
@param {Unknown} data The raw data to attempt to discern.
@return {Table.CELL_DEF} the cell's apparent type.
*/
Table.prototype._getType = function (data) {
	if (typeof data !== "object")
		return Table.CELL_HTML;
	if (data.container)
		return Table.CELL_CONTAINED;
	return Table.CELL_ELEMENT;
};

/**
Set the cell at some row and col to some content.
@param {number} r The row number.
@param {number} c The column number.
@param {Cell|HTMLElement|Number|String|Contained} cell The content
the cell should contain, or a cell itself.
@return {number} The width in cells that the set cell consumes.
*/
Table.prototype._setCell = function (r, c, cell) {
	var grid = this.contentGrid;
	var info;
	if (cell.info) {
		info = cell.info;
		var width = info.width;
		var height = info.height;
		info.r = r;
		info.c = c;
		if (!info.type)
			info.type = this._getType(cell.content);
	} else {
		info = {
			width: 1,
			height: 1,
			r: r,
			c: c,
			type: this._getType(cell)
		};
		cell = {
			info: info,
			content: cell,
			elem: null
		};
	}
	if (!info.alignment) {
		info.alignment = this.alignment;
	}
	var elem = cell.elem = document.createElement("TD");
	switch (info.type) {
	case Table.CELL_HTML:
		elem.innerHTML = cell.content;
		break;
	case Table.CELL_ELEMENT:
		elem.appendChild(cell.content);
		break;
	case Table.CELL_CONTAINED:
		if (this.jquery)
			this.jquery(elem).append(cell.content.container);
		else
			elem.appendChild(cell.content.container);
		break;
	case Table.CELL_TEXT:
		elem.textContent = cell.content;
		break;
	}
	if (this.borderWidth)
		elem.style.border = this.borderWidth + "px solid";
	if (info.alignment != this.alignment) {
		elem.style.textAlign = Table.ALIGNMENTS[info.alignment];
	}
	var width = info.width;
	var height = info.height;
	for (var row = 0; row < height; row++) {
		for (var col = 0; col < width; col++) {
			grid[r + row][c + col] = cell;
		}
	}

	if (width != 1)
		elem.setAttribute("colspan", width);

	if (height != 1)
		elem.setAttribute("rowspan", height);

	return width;
};

/**
Turns the content of the contentGrid into a table.
If the table is not loaded, return null.
@return {?HTMLElement} The table produced.
*/
Table.prototype.contentToTable = function (rowStart, colStart, rowEnd, colEnd) {
	rowStart || (rowStart = 0);
	colStart || (colStart = 0);
	rowEnd || (rowEnd = this.rows);
	colEnd || (colEnd = this.cols);
	var type = this.type;
	if (type & Table.TYPE_LOADED) {
		var t = document.createElement("TABLE");
		var grid = this.contentGrid,
			rlen = rowEnd,
			clen = colEnd;

		var ri = 0,
			rt = 0;

		while (rt < rowStart) {
			rt += grid[ri][0].info.height;
			ri++;
		}


		for (var r = rowStart; r < rlen; r++) {
			var row = grid[r];
			var tr = document.createElement("TR");
			var ci = 0;

			while (ci < colStart) {
				ci += row[ci].info.width;
			}

			for (var c = ci; c < clen; ci++) {
				var info = row[c].info;
				if (info.r != r) {
					c++;
					continue;
				} else if (r == 0) {
					if (type & Table.TYPE_UNIT_COL_WIDTH) {
						row[c].elem.style.width = this.colWidths * info.width;
					}
				}
				if (c == 0) {
					if (type & Table.TYPE_UNIT_ROW_HEIGHT) {
						row[c].elem.style.height = this.rowHeights * info.height;
					}
				}
				tr.appendChild(row[c].elem);
				c += info.width;
			}
			t.appendChild(tr);
		}
		if (this.width !== null)
			t.style.width = this.width;
		if (this.height !== null)
			t.style.height = this.height;
		t.style.textAlign = Table.ALIGNMENTS[this.alignment];
		t.style.borderCollapse = "collapse";
		return t;
	}
	return null;
};


/**
Will recall the content function at a row and column
and set the cell's content appropriately.
@param {number} r The row index
@param {number} c The col index
@return {boolean} whether the cell was updated.
*/
Table.prototype.refreshCell = function (r, c) {
	var test = (Table.TYPE_FUNCTION | Table.TYPE_LOADED);

	if ((this.type & test) == test) {
		var grid = this.contentGrid;
		var row = grid[r];
		var cell = row[c];
		if (cell.info.r == r && cell.info.c == c) {
			var t = this.table;
			var tr = t.children[r];
			var ct = 0,
				ci = 0;
			while (ct < c) {
				ct += row[ct].info.width;
				ci++;
			}
			this._setCell(r, c, this.dataFunction(r, c));
			tr.insertBefore(row[c].elem, tr.children[ci]);
			tr.removeChild(tr.children[ci + 1]);
			return true;
		} else {
			return false;
		}
	}
};


/**
Determine if the table satisfies any TYPE condition.
The most common use is in the example.
@example console.log(table.is(Table.TYPE_LOADED));
@param {Table.TYPE_DEF} type The type to check the table against.
@return {Boolean} whether the table satisfies the type.
*/
Table.prototype.is = function (type) {
	return !!((type & this.type) || (type == this.type));
};

/**
This will add rows to the table.
@param {?number} numRows The number of rows to be added. 
Default is 1.
@param {?number} index Where to add these rows [0,this.rows].
Default is this.rows (the end).
*/
Table.prototype.addRow = function (numRows, index) {
	numRows || (numRows = 1);
	var oldRows = this.rows;
	this.rows += numRows;
	var test = (Table.TYPE_LOADED | Table.TYPE_FUNCTION);
	if ((this.type & test) == test) {
		var grid = this.contentGrid;
		if (index === undefined)
			index = this.rows - numRows;

		var toinsert = new Array(numRows + 2);
		toinsert[0] = index;
		toinsert[1] = 0;
		for (var i = 2; i < numRows + 2; i++) {
			toinsert[i] = new Array(this.cols);
		}
		this.contentGrid.splice.apply(this.contentGrid, toinsert);


		//reassign info.r as needed
		for (var r = index + numRows; r < this.rows; r++) {
			var row = grid[r];
			for (var c = 0; c < this.cols;) {
				var cell = row[c];
				if (cell) {
					var rr = cell.info.r;
					var rew = grid[rr + numRows + cell.info.height - 1];
					if (rr == r - numRows && rew && rew[c] == cell) {
						cell.info.r += numRows;
					}
					c += cell.info.width;
				} else {
					c++;
				}
			}
		}


		//cells that extend into inserted row will cover all of inserted rows.
		var prev = index - 1;
		if (prev != -1) {
			var row = grid[prev];


			//handles multiline cells that intersect the added area.
			for (var c = 0; c < this.cols; c++) {
				var cell = row[c];
				if (cell.info.height - index + cell.info.r > 0) {
					for (var r = 0; r < numRows; r++) {
						grid[r + index][c] = cell;
					}
					if (c == 0) {
						if (this.type & Table.TYPE_UNIT_ROW_HEIGHT) {
							cell.elem.style.height = this.rowHeights * (cell.info.height + numRows);
						}
					}
					if (cell.info.c == c) {
						cell.info.height += numRows;
						cell.elem.setAttribute("rowspan", cell.info.height);
					}
				}
			}
		}

		//initialize new cells from function.
		for (var i = 0; i < numRows; i++) {
			var r = i + index;
			var row = grid[r];
			for (var c = 0, ci = 0; c < this.cols;) {
				if (!row[c]) {
					c += this._setCell(r, c, this.dataFunction(r, ci));
					ci++;
				} else {
					c++;
				}
			}
		}

		//call to load in cells into html table
		var table = this.contentToTable(index, 0, index + numRows);
		if (index == 0) {
			var tr = this.table.children[0];
			if (tr) {
				for (var i = 0; i < tr.children.length; i++) {
					tr.children[i].style.width = "";
				}
			}
		}
		if (index == oldRows) {
			while (table.children.length > 0) {
				this.table.appendChild(table.children[0]);
			}
		} else {
			var before = this.table.children[index];
			while (table.children.length > 0) {
				this.table.insertBefore(table.children[0], before);
			}
		}

	}
};

/**
This will add cols to the table.
@param {?number} numCols The number of cols to be added. 
Default is 1.
@param {?number} index Where to add these cols [0,this.cols].
Default is this.cols (the end).
*/
Table.prototype.addCol = function (numCols, index) {
	numCols || (numCols = 1);
	var oldCols = this.cols;
	this.cols += numCols;
	var test = (Table.TYPE_LOADED | Table.TYPE_FUNCTION);
	if ((this.type & test) == test) {
		var grid = this.contentGrid;
		if (index === undefined)
			index = this.cols - numCols;


		//add in necessary cols to content grid
		var toinsert;
		for (var r = 0; r < this.rows; r++) {
			toinsert = new Array(numCols + 2);
			toinsert[0] = index;
			toinsert[1] = 0;
			grid[r].splice.apply(grid[r], toinsert);
		}
		toinsert = null;

		//reassign info.c as needed
		for (var r = 0; r < this.rows; r++) {
			var row = grid[r];
			for (var c = index + numCols; c < this.cols;) {
				var cell = row[c];
				if (cell) {
					var width = cell.info.width;
					var cc = cell.info.c;
					if (cc == c - numCols && row[cc + numCols + width - 1] == cell) {
						cell.info.c += numCols;
					}
					c += width;
				} else {
					c++;
				}
			}
		}


		//cells that extend into inserted cols will cover all of inserted cols.
		var prev = index - 1;
		if (prev != -1) {

			//handles multiline cells that intersect the added area.
			for (var r = 0; r < this.rows; r++) {
				var row = grid[r];
				var cell = row[prev];
				if (cell.info.width - index + cell.info.c > 0) {
					for (var c = 0; c < numCols; c++) {
						row[index + c] = cell;
					}
					if (r == 0) {
						if (this.type & Table.TYPE_UNIT_ROW_HEIGHT) {
							cell.elem.style.width = this.colWidths * (cell.info.width + numCols);
						}
					}
					if (cell.info.r == r) {
						cell.info.width += numCols;
						cell.elem.setAttribute("colspan", cell.info.width);
					}
				}
			}
		}
		var colEnd = index + numCols;
		//initialize new cells from function.
		for (var r = 0; r < this.rows; r++) {
			var row = grid[r];
			var ci = 0;

			while (ci < index) {
				ci += row[ci].info.width;
			}

			for (var c = ci; c < colEnd;) {
				if (!row[c]) {
					c += this._setCell(r, c, this.dataFunction(r, ci));
					ci++;
				} else {
					c++;
				}
			}
		}

		//call to load in cells into html table
		var table = this.contentToTable(0, index, 0, colEnd);
		if (index == 0) {
			for (var i = 0; i < this.table.children.length; i++) {
				var tr = this.table.children[i];
				var cell = tr.children[0];
				if (cell)
					cell.style.height = "";
			}
		}
		if (index == oldCols) {
			for (var r = 0; r < this.rows; r++) {
				var tr = table.children[r],
					myTr = this.table.children[r];
				while (tr.children.length > 0) {
					myTr.appendChild(tr.children[0]);
				}
			}
		} else {
			for (var r = 0; r < this.rows; r++) {
				var tr = table.children[r],
					myTr = this.table.children[r];
				var before = myTr.children[index];
				while (tr.children.length > 0) {
					myTr.insertBefore(tr.children[0], before);
				}
			}
		}
	}
};

/**
Remove one or more rows from the table,
optionally from an index. Warning: if this.rowHeights is
an array, it will be changed.
@param {?number} numRows The number of rows to be added. 
Default is 1.
@param {?number} index Where to add these rows [0,(this.rows-numRows)].
Default is this.rows - numRows (the end).
*/
Table.prototype.removeRow = function (numRows, index) {
	numRows || (numRows = 1);
	var oldRows = this.rows;
	this.rows -= numRows;
	var test = (Table.TYPE_LOADED | Table.TYPE_FUNCTION);
	if ((this.type & test) == test) {
		var grid = this.contentGrid;
		if (index === undefined)
			index = this.rows - numRows - 1;
		var ri = 0;


		for (var r = index, maxRow = index + numRows; r < maxRow; r++) {
			for (var c = 0; c < this.cols;) {
				var cell = grid[r][c];
				if (cell) {
					var rr = cell.info.r,
						cc = cell.info.c,
						w = cell.info.width,
						h = cell.info.height;
					var run = rr + h - r;;
					if (rr == r) {
						if (rr + h < maxRow) {
							//uhm I don't think I need anything here
						} else {
							if (rr + h > maxRow) {
								var dif = (maxRow - rr);
								for (var tr = maxRow - dif; tr < maxRow; tr++) {
									for (var tc = cc; tc < cc + w;) {
										grid[tr][tc] = null;
									}
								}
								h = (cell.info.height -= dif);
								cell.elem.setAttribute("rowspan", h);
							}
							for (var tr = maxRow; tr < oldRows;) {
								var cel = grid[tr][c];
								cel.info.r = tr - numRows;
								tr += cel.info.height;
							}
						}

					} else {
						var dif = r - rr;
						if (run > numRows)
							run = numRows;
						for (var tr = r; tr < r + run; tr++) {
							for (var tc = cc; tc < cc + w;) {
								grid[tr][tc] = null;
							}
						}
						h = (cell.info.height -= dif);
						cell.elem.setAttribute("rowspan", h);
					}
					console.log(r, c, w);
					c += w;
				} else {
					console.log(r, c, null);
					c++;
				}
			}
		}

		this.contentGrid.splice(index, numRows);

		var table = this.table;
		while (numRows--) {
			table.removeChild(table.children[index]);
		}
	}
};


/**
WIP line: [960-1074]
Remove one or more cols from the table,
optionally from an index. Warning: if this.colHeights is
an array, it will be changed.
@param {?number} numCols The number of cols to be added. 
Default is 1.
@param {?number} index Where to add these cols [0,(this.cols-numCols)].
Default is this.cols - numCols (the end).
*/
Table.prototype.removeCol = function (numCols, index) {
	numCols || (numCols = 1);
	var oldCols = this.cols;
	this.cols -= numCols;
	var test = (Table.TYPE_LOADED | Table.TYPE_FUNCTION);
	if ((this.type & test) == test) {
		var grid = this.contentGrid;
		if (index === undefined)
			index = this.cols;
		var table = this.table;
		var children = table.children;
		for (var i = 0; i < children.length; i++) {
			var tempCols = numCols,
				tempIndex = index;
			var child = children[i];
			var cc = index;
			while (tempCols > 0) {
				var cell = grid[i][tempIndex];
				if (cell) {
					if (cell.info.c == tempIndex) {
						tempCols -= cell.info.width;
						if (tempCols >= 0) {
							child.removeChild(cell.elem);
						} else {
							//resize cell to -tempCols;
							var oldW = cell.info.width,
								h = cell.info.height,
								rr = cell.info.r;
							var w = cell.info.width = -tempCols;
							oldW += tempCols;
							cell.elem.setAttribute("colspan", w);
							if (this.type & Table.TYPE_UNIT_COL_WIDTH) {
								cell.elem.style.width = this.colWidths * w;
							}
							for (var r = 0; r < h; r++) {
								for (var c = 0; c < oldW; c++) {
									grid[rr + r][tempIndex + c] = null;
								}
							}
						}
						if (tempCols <= 0) {
							if (tempCols == 0)
								tempIndex++;
							while (tempIndex < oldCols) {
								cell = grid[i][tempIndex];
								if (cell.info.r == i) {
									console.log("setting cc", cc, cell.elem);
									cell.info.c = cc;
									cc += cell.info.width;
									tempIndex += cell.info.width;
								} else {
									cc++;
									tempIndex++;
								}
							}
						}
						tempIndex += cell.info.width;
					} else {
						var oldIndex = tempIndex;
						//resize cell to tempIndex-cc
						cc = cell.info.c;
						var oldW = cell.info.width,
							h = cell.info.height,
							rr = cell.info.r;
						tempCols -= cc - tempIndex + oldW;
						tempIndex = cc + oldW;
						var w = cell.info.width = oldIndex - cc;
						if (oldW - w > numCols) {
							oldW -= numCols;
							for (var r = 0; r < h; r++) {
								for (var c = w; c < w + numCols; c++) {
									grid[rr + r][cc + c] = null;
								}
							}
							w = cell.info.width = oldW;
						} else {
							for (var r = 0; r < h; r++) {
								for (var c = w; c < oldW; c++) {
									grid[rr + r][cc + c] = null;
								}
							}
						}
						cell.elem.setAttribute("colspan", w);
						if (this.type & Table.TYPE_UNIT_COL_WIDTH) {
							cell.elem.style.width = this.colWidths * w;
						}

						cc++;
					}
				} else {
					tempIndex++;
					tempCols--;
				}
			}
		}
		for (var i = 0; i < this.rows; i++) {
			grid[i].splice(index, numCols);
		}

	}
};

/**
Loads the table from the data function, or data array.
If the table is not loaded successfully the container
returned will be empty.
@return {HTMLElement} The table's container.
*/
Table.prototype.load = function () {
	var type = this.type;
	var isLoad = true;
	if (type & Table.TYPE_ROW_COL) {
		//the table is now in the loaded state.
		this.contentGrid = new Array(this.rows);
		for (var i = 0; i < this.rows; i++) {
			this.contentGrid[i] = new Array(this.cols);
		}
		if (type & Table.TYPE_FUNCTION) {
			var grid = this.contentGrid;
			for (var r = 0; r < this.rows; r++) {
				var row = grid[r];
				for (var c = 0, ci = 0; c < this.cols;) {
					if (!row[c]) {
						c += this._setCell(r, c, this.dataFunction(r, ci));
						ci++;
					} else {
						c++;
					}
				}
			}
		} else if (type & Table.TYPE_DATA) {
			var grid = this.contentGrid;
			for (var r = 0; r < this.rows; r++) {
				var row = grid[r];
				for (var c = 0, ci = 0; c < this.cols;) {
					if (!row[c]) {
						c += this._setCell(r, c, this.data[r][ci]);
						ci++;
					} else {
						c++;
					}
				}
			}
		} else {
			//not actually loaded, there was no data to load from.
			isLoad = false;
		}
	} else {
		//not actually loaded, no rows/cols
		isLoad = false;
	}
	if (isLoad) {
		this.type |= Table.TYPE_LOADED;
	} else {
		this.type ^= this.type & Table.TYPE_LOADED;
	}
	var container = this.getContainer();
	container.innerHTML = "";
	this.table = this.contentToTable();
	container.appendChild(this.table);

	return container;
};