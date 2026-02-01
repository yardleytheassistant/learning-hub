-- Chapter 6: Discrete Probability Distributions Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Discrete Probability Distributions Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 6;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a discrete random variable?',
'["A) A variable that can take any value in an interval", "B) A variable that can only take distinct/countable values", "C) Only continuous variables", "D) Variables with no probability distribution"]',
1, 'A discrete random variable may assume distinct or separate values, either finite or an infinite sequence of countable values.'
FROM quizzes q WHERE q.title = 'Discrete Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is a probability mass function (PMF)?',
'["A) A function for continuous variables only", "B) A function that gives the probability of each possible value of a discrete random variable", "C) A type of average", "D) Only used for normal distribution"]',
1, 'The PMF gives the probability that a discrete random variable equals some specific value.'
FROM quizzes q WHERE q.title = 'Discrete Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is the expected value of a discrete random variable?',
'["A) The most likely outcome", "B) The long-run average value of repetitions of the experiment", "C) The variance of the distribution", "D) The maximum possible value"]',
1, 'The expected value (mean) is the long-run average value of repetitions of the experiment it represents.'
FROM quizzes q WHERE q.title = 'Discrete Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What does variance measure?',
'["A) The center of the distribution", "B) The spread or dispersion of the random variable's values", "C) The probability of success", "D) The number of outcomes"]',
1, 'Variance measures the spread of the random variable's values around the expected value.'
FROM quizzes q WHERE q.title = 'Discrete Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'Which is an example of a discrete random variable?',
'["A) The exact height of students in a class", "B) The number of heads in 10 coin flips", "C) The exact time until a light bulb fails", "D) The weight of a newborn baby to infinite precision"]',
1, 'The number of heads in 10 coin flips is discrete (0, 1, 2, ..., 10), while height and weight are typically continuous.'
FROM quizzes q WHERE q.title = 'Discrete Probability Distributions Quiz';
