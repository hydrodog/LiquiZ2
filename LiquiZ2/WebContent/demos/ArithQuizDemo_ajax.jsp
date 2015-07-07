new Quiz( {
    title: "Arithmetic Quiz Demo",
    points: 100,
    timeLimit: 0,
    remainingTries: 1,
    dataDir: "assets/",
    editMode: true,
},
[

[
    1, 'Arithmetic', 'fillin',
    ['Util.span', 'What is 5 + 8?'],
    ['fillin', 100],
],

[
    2, 'Multiplication', 'mcRadioTxt',
    ['Util.p', '7 * 8 ='],
    ['mcRadioText', 101, [46, 56, 63, 49, 64]],
],

[
    3, 'Square Root', 'fillin',
    ['Util.p', "What is the square root of 64?"],
    ['fillin', 102],
],

[
    4, 'Square Root', 'fillin',
    ['Util.p', 'The square root of 120 should be between what two integers?'],
    ['Util.span', 'smaller:'],
    ['fillin', 103],
    ['Util.span', 'bigger:'],
    ['fillin', 104],
],

[
    5, 'Multimedia', 'audio',
    ['instructions', 'Spell the following word'],
    ['Util.audio', "clip1.mp3"],
    ['fillin', 103],
],

[
    6, 'Match terms', 'match',
    ['instructions', 'Match the terms to the appropriate description.'],
    ['match', 104,
        ["integer", "whole", "rational"],
        ["The ratio of two whole numbers",
            "The product of two whole numbers",
            "A counting number, greater than 0 with no fraction",
            "A number with no fraction that is either positive, negative or zero",
        ],
    ]
],

]);
