Server Front-End Relations Through JSON object parameters.

===========================

Parameter List:
key      : description
---------------------------
makeL    : constructs an array of questions
type     : type of object to be made
HTML     : HTML of question text
ansrL    : an array of possible question answers (order is important)
correctL : Tells the server which answers are correct. Only return to the front end if editing quiz!
pHold    : Placeholder text
hideL    : list of classes to hide if answer is selected, order correlates with "ansrL" order
ID       : html Id of object, identifies answers when sending quiz responses to server
rows     : rows of a textarea
cols     : cols of a textarea
Class    : class of question
opts     : options of a quiz


===========================

What parameters accepted by object type:
type             : [parameter list accepted]
---------------------------
dropdownmultiple : [HTML,ansrL,pHold,hideL,ID,Class]
dropdown         : [HTML,ansrL,pHold,hideL,ID,Class]
radio            : [HTML,ansrL,hideL,ID,Class]
checkbox         : [HTML,ansrL,hideL,ID,Class]
number           : [HTML,rows,pHold,ID,Class]
essay            : [HTML,rows,cols,pHold,ID,Class]
code             : [HTML,rows,cols,pHold,ID,Class]
multiquestion    : [makeL,ID,Class] // multiquestions can contain multiquestions!
html             : [HTML,ID,Class]
quiz             : [makeL,opts,ID,Class]
===========================

Parameters and possible data types
parameter : description
---------------------------
makeL     : Array of Question Objects
type      : String 
HTML      : String, Object
-       {"url" : "image url"}

ansrL     : Array of Strings, Object
-{"placevalue" : ["The first item in this array becomes selected automatically"]}

correctL  : Array of booleans listing if answer is correct/incorrect
pHold     : String, Object
-{"placevalue" : "This will be auto filled in, rather than becoming placeholder text"}
hideL     : Array of String class name to hide (one class or one blank ("") per answer)
ID        : String
rows      : Number
cols      : Number
Class     : String (classes separated by one space (" "))
opts      : Object
-     {"timed" : true/false value is the quiz timed}
-    {"submit" : "title of quiz submit button"}





