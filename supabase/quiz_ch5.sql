-- Chapter 5: Probability Concepts Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Probability Concepts Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 5;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'Probability and statistics are related areas that concern themselves with analyzing:',
'["A) The relative frequency of events", "B) Only government data", "C) Only graphical representations", "D) Single values only"]',
0, 'Both probability and statistics concern themselves with analyzing the relative frequency of events.'
FROM quizzes q WHERE q.title = 'Probability Concepts Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is the fundamental difference between probability and statistics?',
'["A) They have no relationship", "B) Probability predicts future events, statistics analyzes past events", "C) Statistics is only used in gambling", "D) Probability cannot be applied to business"]',
1, 'Probability deals with predicting likelihood of future events, while statistics involves analysis of frequency of past events.'
FROM quizzes q WHERE q.title = 'Probability Concepts Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'Which field applies probability concepts according to the chapter?',
'["A) Physics, Genetics, Economics, Social Sciences", "B) Only mathematics", "C) Only gambling", "D) Only medical fields"]',
0, 'Probability applications include physics, genetics, economics, social sciences, finance, and more.'
FROM quizzes q WHERE q.title = 'Probability Concepts Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is an experiment in probability?',
'["A) A laboratory test", "B) A process that generates well-defined outcomes", "C) Something that always has the same result", "D) Only related to gambling"]',
1, 'An experiment is a process that generates well-defined outcomes, like flipping a coin or rolling a die.'
FROM quizzes q WHERE q.title = 'Probability Concepts Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What is an event in probability?',
'["A) A party celebration", "B) A set of one or more outcomes of an experiment", "C) Always an unlikely occurrence", "D) Only possible outcomes"]',
1, 'An event is a set of one or more outcomes of an experiment. For example, rolling a 6 on a die.'
FROM quizzes q WHERE q.title = 'Probability Concepts Quiz';
