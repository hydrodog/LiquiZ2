{
    "type": "Quiz",
    "css": "demostyle.css",
    "payload": {
        "policy" : "Dov",
        "title": "Quiz Demo #1",
        "points": 100,
        "timeLimit": 0,
        "remainingTries": 1,
        "dataDir": "assets/",
        "editMode": true,
        "questions": [
            {
                "id": 1,
                "title": "Mergesort",
                "type": "grid",
                "content": [["instructions", "Show the first pass of Mergesort below"],
                         ["grid" ,"1_1", [[9, 8, 7, 6, 5, 4, 3, 1]] ],
                         ["Util.br"],
                         ["Util.br"],
                         ["emptyGrid", "1_2", 1, 8]]
            },
            
            {
                "id": 2,
                "title": "Matrix Multiplication",
                "type": "matrix",
                "content": [
                    ["instructions", "Show the result of matrix A * B"],
                    ["grid", "2_1", [
                        [1, 0, 2],
                        [1, 1, -2],
                        [2, 1, 0]
                    ]],
                    ["Util.span", " * "],
                    ["grid", "2_2", [
                        [1, 1, -1],
                        [-2, 1, 0],
                        [1, 1, 3]
                    ]],
                    ["Util.span", " = "],
                    ["emptyGrid", "2_3", 3, 3]
                ]
            },

            {
                "id": 3,
                "title": "Java",
                "type": "code",
                "content": [
                    ["instructions",
                        "Complete the code below so it prints \"Hello\""
                    ],
                    ["code", 3,
                        "public A {\n  void   (String[] args) {\n  System.\n  }\n}\n",
                        10, 80
                    ]
                ]
            },

            {
                "id": 4,
                "title": "Java",
                "type": "code",
                "content": [
                    ["instructions",
                        "Complete the following function so it computes factorial recursively."
                    ],
                    ["code", 4, "public static void fact(int n) {\n\n\n\n}", 10, 80]
                ]
            },

            {
                "id": 5,
                "title": "Java",
                "type": "cloze",
                "content": [
                    ["instructions", "Fill in the blanks to make the code correct"],
                    ["cloze", 5,
                        "public [[]] A {\n  [[]] static [[]] main([[]] [] args) {\n  System.[[]].[[]](\"hello\");\n  }\n}"
                    ]
                ]
            },

            {
                "id": 6,
                "title": "Object Oriented Terminology",
                "type": "match",
                "content": [
                    ["instructions",
                        "Match the object-oriented terminology to the meaning"
                    ],
                    ["match", 6, ["class", "object", "method", "message",
                            "polymorphism", "encapsulation"
                        ],
                        ["A concrete instance of a class",
                            "A request made to an object",
                            "Hiding the internal details of a class or object",
                            "Sending the same message to different objects and getting different results",
                            "A specification of an object",
                            "A function that is applied to an object"
                        ]
                    ]
                ]
            },

            {
                "id": 7,
                "title": "File Upload",
                "type": "file",
                "content": [
                    ["instructions",
                        "Submit your homework for the 3n+1 problem as a single .java file"
                    ],
                    ["file", "Upload File", ".java", "file-input", 7]
                ]
            },

            {
                "id": 8,
                "title": "Graph Theory",
                "type": "matrix",
                "content": [
                    ["instructions",
                        "Find the Shortest Path from vertex 1 to 5.  Leave any cost box blank if the vertex is unreachable."
                    ],
                    ["Util.img", "Bellmanford_3.png"],
                    ["Util.br"],
                    ["emptyGrid", "8_1", 6, 6, [1, 2, 3, 4, 5, 6]]
                ]
            },

            {
                "id": 9,
                "title": "Arithmetic",
                "type": "fillin",
                "content": [
                    ["Util.span", "What is 2 + 2?"],
                    ["fillin", 9]
                ]
            },

            {
                "id": 11,
                "title": "Dinosaur",
                "type": "mcRadioImg",
                "content": [
                    ["Util.p", "Which one is the dinosaur?"],
                    ["mcRadioImg", 11, ["cat2.jpg", "fish2.png", "trex.jpg"]]
                ]
            },

            {
                "id": 12,
                "title": "Dinosaur",
                "type": "selectText",
                "content": [
                    ["Util.p", "Which one is the dinosaur?"],
                    ["selectText", 13, ["stegosaurus", "dimetrodon",
                        "plesiosaurus"
                    ]]
                ]
            },

            {
                "id": 13,
                "title": "Multimedia",
                "type": "audio",
                "content": [
                    ["instructions",
                        "Listen to the following audio file and pick the name of the main character."
                    ],
                    ["Util.audio", "clip1.mp3"],
                    ["selectText", 13, ["Yijin", "Asher", "Ying", "Xuefan", "Bob"]]
                ]
            },

            {
                "id": 14,
                "title": "Tacoma Narrows",
                "type": "video",
                "content": [
                    ["instructions",
                        "Watch the following video, then explain what caused the bridge to fail."
                    ],
                    ["Util.video", "Tacoma Narrows Bridge Collapse.mp4"],
                    ["essay", 14, 10, 80, 200]
                ]
            },

            {
                "id": 15,
                "title": "Arithmetic",
                "type": "numeric",
                "content": [
                    ["instructions",
                        "What is the square root of 2? Be specific to three decimal places."
                    ],
                    ["numeric", 15]
                ]
            },

            {
                "id": 16,
                "title": "Geography",
                "type": "clickableImage",
                "content": [
                    ["instructions", "Click on Texas"],
                    ["clickableImage", 16, "usmap.png"]
                ]
            }
        ]
    }
}