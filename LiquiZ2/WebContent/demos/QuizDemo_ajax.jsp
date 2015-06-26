page = new Quiz( {
    title: "Quiz Demo #1",
    points: 100,
    timeLimit: 0,
    remainingTries: 1,
    dataDir: "assets/"
},
[

[
    1, "Mergesort", "grid",
    ['instructions', 'Show the first pass of Mergesort below'],
    ['grid' ,'1_1', [[9, 8, 7, 6, 5, 4, 3, 1]] ],
    ['Util.br'],
    ['emptyGrid', '1_2', 1, 8],
],

[
    2, 'Matrix Multiplication', 'matrix',
    ['instructions', 'Show the result of matrix A * B'],
    ['grid', '2_1', [[1, 0, 2],[1, 1, -2],[2, 1, 0]]],
    ['Util.span', '*'],
    ['grid', '2_2', [[1, 1, -1],[-2, 1, 0],[1, 1, 3]] ],
    ['Util.span', '='],
    ['emptyGrid', '2_3', 3, 3],
],

[
    3, 'Java', 'code',
    ['instructions', 'Complete the code below so it prints "Hello"'],
    ['code', 3, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80],    
],


[
    4, 'Java', "code",
    ['instructions', 'Complete the following function so it computes factorial recursively.'],
    ['code', 4, "public static void fact(int n) {\n\n\n\n}", 10, 80],
],

[
    5,'Java', "cloze",
    ['instructions', "Fill in the blanks to make the code correct"],
    ['cloze', 5, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}'],
],

[
    6, "Object Oriented Terminology", "match",
    ['instructions', "Match the object-oriented terminology to the meaning"],
    ['match', 6,
        ["class", "object", "method", "message", "polymorphism", "encapsulation"],
        ["A concrete instance of a class",
            "A request made to an object",
            "Hiding the internal details of a class or object",
            "Sending the same message to different objects and getting different results",
            "A specification of an object",
            "A function that is applied to an object"
        ],
    ],
],

[
    7, "File Upload", "file",
    ['instructions', "Submit your homework for the 3n+1 problem as a single .java file"],
    ['Util.file', ".java", "file-input", 7],
],

[
    8, "Graph Theory", "matrix",
    ['instructions', "Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable."],
    ['Util.img', "Bellmanford_3.png"],
    ['Util.br'],
    ['emptyGrid', "8_1", 6, 6, [1, 2, 3, 4, 5, 6] ],
],

[
    10, "Arithmetic", "fillin",
    ['Util.span', "What is 2 + 2?"],
    ['fillin', 10],
],

[
    11, 'Dinosaur', "mcRadioImg",
    ['Util.p', "Which one is the dinosaur?"],
    ['mcRadioImg', 11, ["cat2.jpg", "fish2.png", "trex.jpg"]],
],

[
    111, 'Dinosaur', "mcRadioImg",
    ['Util.p', "Which one is the dinosaur?"],
    ['mcRadioImg', 11, ["cat2.jpg", "fish2.png", "trex.jpg"]],
],

[
    12, 'Dinosaur', "selectImg",
    ['Util.p', "Which one is the dinosaur?"],
    ['Util.select', "which", false, ["stegosaurus", "dimetrodon", "plesiosaurus"], 'mcdropdown'],
],

[
    13, 'Multimedia', "audio",
    ['page.instructions', 'listen to the following audio file and pick the name of the main character.'],
    ['Util.audio', "clip1.mp3"],
    ['page.selectText', 13, ['Yijin', 'Asher', 'Ying', 'Xuefan', 'Bob']],
],

[
    14, 'Tacoma Narrows', "video",
    ['page.instructions', 'Watch the following video, then explain what caused the bridge to fail.'],
    ['Util.video', "Tacoma Narrows Bridge Collapse.mp4"],
    ['page.essay', 14, 10, 80, 200],
],

[
    15, 'Arithmetic', "numeric",
    ['page.instructions', "What is the square root of 2 (four digits is fine)?"],
    ['page.numeric', 15],
],

[
    16, "Geography", "clickableImage",
    ['page.instructions', "Click on Texas"],
    ['page.clickableImage', 16,"usmap.png"],
],

[
    17, "Matrix with images", "matrix",
    ['page.instructions', "Fill in the grid"],
    ['page.grid', "17_1", [["headers 1", "header 2", "header 3"],
                           ["euler.jpg", "hello", 4],
                           ["later", "einstein.jpg", "%%input%%"]
                          ], true],
],
