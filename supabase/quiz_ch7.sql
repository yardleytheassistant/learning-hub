-- Chapter 7: Continuous Probability Distributions Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Continuous Probability Distributions Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 7;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a continuous random variable?',
'["A) A variable with only integer values", "B) A variable that can assume any value in an interval or collection of intervals", "C) Only variables with few outcomes", "D) Variables without probability distributions"]',
1, 'A continuous random variable may assume any numerical value in an interval or collection of intervals.'
FROM quizzes q WHERE q.title = 'Continuous Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is the probability that a continuous random variable takes a specific value?',
'["A) Always 1", "B) Always 0.5", "C) Practically zero", "D) Cannot be calculated"]',
2, 'For continuous random variables, the probability of any single point is zero; we calculate probabilities over intervals.'
FROM quizzes q WHERE q.title = 'Continuous Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is a probability density function (PDF)?',
'["A) A function that gives probabilities directly", "B) A function where area under the curve equals probability", "C) Only for discrete variables", "D) Gives the exact value of the random variable"]',
1, 'For continuous variables, probability is the area under the PDF curve between two values.'
FROM quizzes q WHERE q.title = 'Continuous Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is the standard normal distribution?',
'["A) Any normal distribution", "B) A normal distribution with mean 0 and standard deviation 1", "C) A distribution with no variance", "D) Only used in discrete mathematics"]',
1, 'The standard normal distribution has μ = 0 and σ = 1, often denoted as Z.'
FROM quizzes q WHERE q.title = 'Continuous Probability Distributions Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What does the area under a normal curve represent?',
'["A) The total number of data points", "B) Probability (equals 1 for the entire distribution)", "C) The mean of the data", "D) The standard deviation"]',
1, 'The total area under any probability density function equals 1, representing total probability.'
FROM quizzes q WHERE q.title = 'Continuous Probability Distributions Quiz';
