page = new Quiz( {
	title: "Quiz Demo #1",
	points: 100,
	timeLimit: 0,
	remainingTries: 1,
	dataDir: "assets/"
} );

var q;

// question 1
q = page.addQuestion(1, "Mergesort", "grid", 0);
q.appendChild(page.instructions("Show the first pass of Mergesort below"));
q.appendChild(page.grid("1_1", [[9, 8, 7, 6, 5, 4, 3, 1]]));
q.appendChild(Util.br());
q.appendChild(page.emptyGrid("1_2", 1, 8));
page.body.appendChild(q);

// question 2
q = page.addQuestion(2, "Matrix Multiplication", 'matrix', 2); // 2 point question
q.appendChild(page.instructions("Show the result of matrix A * B"));
q.appendChild(page.grid("2_1", [[1, 0, 2],[1, 1, -2],[2, 1, 0]]));
q.appendChild(Util.span("*"));
q.appendChild(page.grid("2_2", [[1, 1, -1],[-2, 1, 0],[1, 1, 3]]));
q.appendChild(Util.span("="));
q.appendChild(page.emptyGrid("2_3", 3, 3));
page.body.appendChild(q);

// question 3
q = page.addQuestion(3, 'Java', 'code');
q.appendChild(page.instructions('Complete the code below so it prints "Hello"'));
q.appendChild(page.code(3, "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n", 10, 80));
page.body.appendChild(q);

// question 4
q = page.addQuestion(4, 'Java', "code");
q.appendChild(page.instructions('Complete the following function so it computes factorial recursively.'));
q.appendChild(page.code(4, "public static void fact(int n) {\n\n\n\n}", 10, 80));
page.body.appendChild(q);

// question 5
q = page.addQuestion(5,'Java', "cloze");
q.appendChild(page.instructions("Fill in the blanks to make the code correct"));
q.appendChild(page.cloze(5, 'public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]]("hello");\n  }\n}'));
page.body.appendChild(q);

// question 6
q = page.addQuestion(6, "Object Oriented Terminology", "match");
q.appendChild(page.instructions("Match the object-oriented terminology to the meaning"));
q.appendChild(page.match(6,
		["class", "object", "method", "message", "polymorphism", "encapsulation"],
			["A concrete instance of a class",
		"A request made to an object",
			"Hiding the internal details of a class or object",
			"Sending the same message to different objects and getting different results",
			"A specification of an object",
		"A function that is applied to an object"]));
page.body.appendChild(q);

// question 7
q = page.addQuestion(7, "File Upload", "file");
q.appendChild(page.instructions("Submit your homework for the 3n+1 problem as a single .java file"));
q.appendChild(Util.file(".java", "file-input", 7));
page.body.appendChild(q);

// question 8
q = page.addQuestion(8, "Graph Theory", "matrix");
q.appendChild(page.instructions("Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable."));
q.appendChild(Util.img("Bellmanford_3.png"));
q.appendChild(Util.br());
q.appendChild(page.emptyGrid("8_1", 6, 6, [1, 2, 3, 4, 5, 6]));
page.body.appendChild(q);

// question 9

// question 10
q = page.addQuestion(10, "Arithmetic", "fillin");
q.appendChild(Util.span("What is 2 + 2?"));
q.appendChild(page.fillin(10));
page.body.appendChild(q);

// question 11
q = page.addQuestion(11, 'Dinosaur', "mcRadioImg");
q.appendChild(Util.p("Which one is the dinosaur?"));
q.appendChild(page.mcRadioImg(11, ["cat2.jpg", "fish2.png", "trex.jpg"]));
page.body.appendChild(q);

// question 11b
q = page.addQuestion(111, 'Dinosaur', "mcRadioImg");
q.appendChild(Util.p("Which one is the dinosaur?"));
q.appendChild(page.mcRadioImg(11, ["cat2.jpg", "fish2.png", "trex.jpg"]));
page.body.appendChild(q);

// question 12
q = page.addQuestion(12, 'Dinosaur', "selectImg");
q.appendChild(Util.p("Which one is the dinosaur?"));
q.appendChild(Util.select("which", false, ["stegosaurus", "dimetrodon", "plesiosaurus"], 'mcdropdown'));
page.body.appendChild(q);

// question 13
q = page.addQuestion(13, 'Multimedia', "audio");
q.appendChild(page.instructions('listen to the following audio file and pick the name of the main character.'));
q.appendChild(Util.audio("clip1.mp3"));
q.appendChild(page.selectText(13, ['Yijin', 'Asher', 'Ying', 'Xuefan', 'Bob']));
page.body.appendChild(q);

// question 14
q = page.addQuestion(14, 'Tacoma Narrows', "video");
q.appendChild(page.instructions('Watch the following video, then explain what caused the bridge to fail.'));
q.appendChild(Util.video("Tacoma Narrows Bridge Collapse.mp4"));
q.appendChild(page.essay(14, 10, 80, 200));
page.body.appendChild(q);

// question 15
q = page.addQuestion(15, 'Arithmetic', "numeric");
q.appendChild(page.instructions("What is the square root of 2 (four digits is fine)?"));
q.appendChild(page.numeric(15));
page.body.appendChild(q);

// question 16
q = page.addQuestion(16, "Geography", "clickableImage");
q.appendChild(page.instructions("Click on Texas"));
q.appendChild(page.clickableImage(16,"usmap.png"));
page.body.appendChild(q);

// question 17
q = page.addQuestion(17, "Matrix with images", "matrix");
q.appendChild(page.instructions("Fill in the grid"));
q.appendChild(page.grid("17_1", [["headers 1", "header 2", "header 3"],
				   ["euler.jpg", "hello", 4],
				   ["later", "einstein.jpg", "%%input%%"]], true));
page.body.appendChild(q);

var calendar = new Calendar(new Date(), 365);
page.body.appendChild(calendar.month(new Date(),calendar));
//page.body.appendChild(calendar.year(calendar));

// question 18
page.end(18);
