page = new Quiz( {
	title: "Quiz Demo #1",
	points: 100,
	timeLimit: 0,
	remainingTries: 1,
	dataDir: "assets/"
} );
// question 1
page.addQuestion(1, "Mergesort", "matrix");
page.instructions("Show the first pass of Mergesort below");
// page.matrix([[9, 8, 7, 6, 5, 4, 3, 1]]);
page.br();
// page.matrix(1, 1, 8);

// question 2
page.addQuestion(2, "Matrix Multiplication", 'matrix', 2); // 2 point question
page.instructions("Show the result of matrix A * B");
// page.matrix([[1, 0, 2],[1, 1, -2],[2, 1, 0]]);
page.span("*");
// page.matrix([[1, 1, -1],[-2, 1, 0],[1, 1, 3]]);
page.span("=");
// page.matrix(2, 3, 3);

// question 3
page.addQuestion(3, 'Java', 'code');
page.instructions('Complete the code below so it prints "Hello"');
page.code(3, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80);

// question 4
page.addQuestion(4, 'Java');
page.instructions('Complete the following function so it computes factorial recursively.');
page.code(4, "public static void fact(int n) {\n\n\n\n}", 10, 80);

// question 5
page.addQuestion(5,'Java');
page.instructions("Fill in the blanks to make the code correct");
page.cloze(5, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}');

// question 6
page.addQuestion(6, "Object Oriented Terminology");
page.instructions("Match the object-oriented terminology to the meaning");
page.match(6,
		["class", "object", "method", "message", "polymorphism", "encapsulation"],
			["A concrete instance of a class",
		"A request made to an object",
			"Hiding the internal details of a class or object",
			"Sending the same message to different objects and getting different results",
			"A specification of an object",
		"A function that is applied to an object"]);

// question 7
page.addQuestion(7, "File Upload");
page.instructions("Submit your homework for the 3n+1 problem as a single .java file");
page.fileUpload(7, ".java");

// question 8
page.addQuestion(8, "Graph Theory");
page.instructions("Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable.");
page.img("Bellmanford_3.png");
page.matrix(8, 3, 5);

// question 9

// question 10
page.addQuestion(10, "Arithmetic");
page.span("What is 2 + 2?");
page.fillin(10);

// question 11
page.addQuestion(11, 'Dinosaur');
page.p("Which one is the dinosaur?");
page.mcRadioImg(11);
page.img("cat2.jpg");
page.img("fish2.png");
page.img("trex.jpg");

// question 12
page.addQuestion(12, 'Dinosaur');
page.p("Which one is the dinosaur?");
page.selectImg(12, ["cat2.jpg", "fish2.png", "trex.jpg"]);

// question 13
page.addQuestion(13, 'Multimedia');
page.instructions('listen to the following audio file and pick the name of the main character.');
page.aud("clip1.mp3");
page.selectText(13, ['Yijin', 'Asher', 'Ying', 'Xuefan', 'Bob']);

// question 14
page.addQuestion(14, 'Tacoma Narrows');
page.instructions('Watch the following video, then explain what caused the bridge to fail.');
page.vid("Tacoma Narrows Bridge Collapse.mp4");
page.essay(14, 10, 80, 200);

// question 15
page.addQuestion(15, 'Arithmetic');
page.instructions("What is the square root of 2 (four digits is fine)?");
page.numeric(15);

// question 16
page.addQuestion(16, "Geography");
page.instructions("Click on Texas");
page.clickableImage(16,"usmap.png");

// question 17
page.end(17);
