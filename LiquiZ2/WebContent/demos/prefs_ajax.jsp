{
    "css": "demostyle.css",
    "calendar": {
        "startdate": 20150101,
        "weekdayHolidays": [0,6],
        "holidays": {
            "scope": 6,
            "list": [
                [101, "New Year's"],
                [1225, "Christmas"]
            ]
        },
        "events": {
            "scope": 3,
            "list": [
                [914, "", "Rosh Hashanah"],
                [916, "1330-1430", "ECE Dept. Meeting"],
                [923, "1300-0230", "Safe Training"]
            ]
        }
    },
    "policy": {
        "hw4x": {
            "scope": "user",
            "attempts": 4,
            "duration": 0,
            "showAnswers": false,
            "showCorrectAnswersAfterDue": true,
            "scored": false,
            "shuffleQuestions": false,
            "shuffleAnswers": false,
            "visibleBeforeOpen": 0,
            "dueAfterOpen": 7,
            "closeAfterDue": 7,
            "latePenalty": 0,
            "lateDailyPenalty": 0,
            "earlyReward": 0,
            "earlyDailyReward": 0
        },
        "hw1x": {
            "scope": "user",
            "attempts": 1,
            "duration": 0,
            "showAnswers": false,
            "showCorrectAnswersAfterDue": true,
            "scored": false,
            "shuffleQuestions": false,
            "shuffleAnswers": false,
            "visibleBeforeOpen": 0,
            "dueAfterOpen": 7,
            "closeAfterDue": 7,
            "latePenalty": 0,
            "lateDailyPenalty": 0,
            "earlyReward": 0,
            "earlyDailyReward": 0
        }
    },
    "regex": {
        "scope": 2,
        "mass": "kg|kilo|kilogram",
        "time": "s|sec|second",
        "length": "m|meter",
        "3sig": "\\d{3}|\\d{2}\\.\\d|\\d{1}\\.\\d{2}|\\.\\d{3}",
        "3sigmass": "[:3sig:][:mass:]"
    },
    "stdchoice": {
        "scope":3,
        "Likert5Agree":  ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
        "Likert5Satisfied":  ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"],
        "Likert5Frequency": ["Never", "Occasionally", "Fairly Many Times", "Very Often", "Always"],
        "Likert5Goodness":  ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
        "Yesno":    ["yes", "no"]
    },
    "vars": {
        "scope": 3,
        "x": {
            "scope": 2,
            "type": "int",
            "min": 0, "max": 10
        }
    }
}
