new Quiz( {
title:'Example Quiz',
points:100,
timeLimit:300,
remainingTries:1,
dataDir:'assets/'
} );
var q;
q=page.addQuestion(1,'The Sky','cssClass?');
q.appendChild(Util.span('What is the color of the sky?'));
q.appendChild(page.fillin(1));
page.body.appendChild(q);
q=page.addQuestion(6,'Choosing animals','cssClass?');
q.appendChild(page.instructions('Select all animals from the list'));
['Dog','Cat','Computer','Dragon',]
page.body.appendChild(q);
q=page.addQuestion(2,'Animal Identification','cssClass?');
q.appendChild(Util.img('WebContent/assets/img/cat.jpg'));
q.appendChild(Util.span('Which animal is shown in the picture?'));
mcRadio(2,['Dog','Cat','Dragon',]
page.body.appendChild(q);
q=page.addQuestion(4,'Hello World','cssClass?');
q.appendChild(page.instructions('Write a method to output Hello World to the console'));
q.appendChild(page.code(4, 0, 0));

q.appendChild(Util.span('Was this question hard?'));
q.appendChild(page.essay(5, 2, 50, 250));

page.body.appendChild(q);
q=page.addQuestion(5,'Number Range','cssClass?');
q.appendChild(Util.span('Write a number between 0 and 10'));
q.appendChild(page.fillin(6));
page.body.appendChild(q);
q=page.addQuestion(7,'Regex Question','cssClass?');
q.appendChild(Util.span('Type a digit'));
q.appendChild(page.fillin(8));
page.body.appendChild(q);
q=page.addQuestion(3,'Opinion','cssClass?');
q.appendChild(Util.span('Did you like this quiz?'));
mcRadio(3,['Yes','No',](
page.body.appendChild(q);
