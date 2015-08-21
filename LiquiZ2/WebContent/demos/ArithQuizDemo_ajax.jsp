{
    "type": "Quiz",
    "payload": {
        "title": "Arithmetic Quiz Demo",
        "points": 100,
        "timeLimit": 0,
        "remainingTries": 1,
        "dataDir": "assets/",
        "editMode": true,
        "data": [{
                "id": 1,
                "title": "Arithmetic",
                "type": "fillin",
                "content": [
                    ["Util.span", "What is 5 + 8?"],
                    ["fillin", 100]
                ]
            },

            {
                "id": 2,
                "title": "Multiplication",
                "type": "mcRadioTxt",
                "content": [
                    ["Util.p", "7 * 8 ="],
                    ["mcRadioTextVert", 101, [46, 56, 63, 49, 64]]
                ]
            }, {
                "id": 3,
                "title": "Square Root",
                "type": "fillin",
                "content": [
                    ["Util.p", "What is the square root of 64?"],
                    ["fillin", 102]
                ]
            }, {
                "id": 4,
                "title": "Square Root",
                "type": "fillin",
                "content": [
                    ["Util.p", "The square root of 120 should be between what two integers?"],
                    ["Util.span", "smaller:"],
                    ["fillin", 103],
                    ["Util.span", "bigger:"],
                    ["fillin", 104]
                ]
            }, {
                "id": 5,
                "title": "Multimedia",
                "type": "audio",
                "content": [
                    ["instructions", "Spell the following word"],
                    ["Util.audio", "clip1.mp3"],
                    ["fillin", 103]
                ]
            }, {
                "id": 6,
                "title": "Match terms",
                "type": "match",
                "content": [
                    ["instructions", "Match the terms to the appropriate description."],
                    ["match", 104, ["integer", "whole", "rational"],
                        ["The ratio of two whole numbers",
                            "The product of two whole numbers",
                            "A counting number, greater than 0 with no fraction",
                            "A number with no fraction that is either positive, negative or zero"
                        ]
                    ]
                ]
            }
        ]
    }
}