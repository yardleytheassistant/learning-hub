-- Chapter 8: Sampling Methods Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Sampling Methods Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 8;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is simple random sampling?',
'["A) Sampling only convenient items", "B) A sample where each item has an equal chance of being selected", "C) Taking the first N items", "D) Only selecting from one group"]',
1, 'Simple random sampling selects items so that each item/person in the population has the same chance of being included.'
FROM quizzes q WHERE q.title = 'Sampling Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'Why do we sample a population instead of studying the entire population?',
'["A) To make data more complicated", "B) Time-consuming, cost-prohibitive, or physically impossible to check all items", "C) Because sampling is always less accurate", "D) Because we cannot analyze large datasets"]',
1, 'Reasons include: time-consuming, costly, physical impossibility, destructive nature of tests, and adequate sample results.'
FROM quizzes q WHERE q.title = 'Sampling Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is stratified random sampling?',
'["A) Taking samples from only one stratum", "B) Dividing population into groups and sampling from each group", "C) Random sampling without any structure", "D) Only used for small populations"]',
1, 'Stratified random sampling divides the population into subgroups (strata) and takes random samples from each stratum.'
FROM quizzes q WHERE q.title = 'Sampling Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is the Central Limit Theorem important for?',
'["A) Destroying data", "B) Allowing us to make inferences about population means from sample means", "C) Only applies to small samples", "D) Makes data collection harder"]',
1, 'The Central Limit Theorem allows us to use sample statistics to make inferences about population parameters.'
FROM quizzes q WHERE q.title = 'Sampling Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'According to the Central Limit Theorem, as sample size increases, the sampling distribution:',
'["A) Becomes more skewed", "B) Becomes approximately normal regardless of population distribution", "C) Becomes wider", "D) Becomes less reliable"]',
1, 'The CLT states that for sufficiently large samples, the sampling distribution of the mean approaches a normal distribution.'
FROM quizzes q WHERE q.title = 'Sampling Methods Quiz';
