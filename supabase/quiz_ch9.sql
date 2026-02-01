-- Chapter 9: Estimation and Confidence Intervals Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Estimation and Confidence Intervals Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 9;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a point estimate?',
'["A) A range of values", "B) A single statistic computed from sample data that estimates a population parameter", "C) An exact population value", "D) The margin of error"]',
1, 'A point estimate (point estimator) is a single value computed from sample information that estimates a population parameter.'
FROM quizzes q WHERE q.title = 'Estimation and Confidence Intervals Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What does a 95% confidence interval mean?',
'["A) 95% of the population falls in this range", "B) We are 95% confident the true parameter is in this range", "C) The interval will contain the sample mean 95% of the time", "D) 95% of samples will produce this exact interval"]',
1, 'A 95% confidence interval means we are 95% confident that the true population parameter falls within the calculated interval.'
FROM quizzes q WHERE q.title = 'Estimation and Confidence Intervals Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is the margin of error?',
'["A) The difference between sample and population mean", "B) The maximum expected difference between point estimate and true parameter", "C) The standard deviation of the sample", "D) The sample size"]',
1, 'The margin of error represents the maximum expected difference between the point estimate and the true population parameter.'
FROM quizzes q WHERE q.title = 'Estimation and Confidence Intervals Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What factors affect the width of a confidence interval?',
'["A) Only the sample mean", "B) Sample size, variability, and confidence level", "C) Only the confidence level", "D) Only the population size"]',
1, 'Larger samples and lower variability produce narrower intervals; higher confidence levels produce wider intervals.'
FROM quizzes q WHERE q.title = 'Estimation and Confidence Intervals Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'How does increasing the sample size affect the confidence interval?',
'["A) Makes it wider", "B) Makes it narrower", "C) Has no effect", "D) Changes the confidence level"]',
1, 'Increasing sample size decreases the standard error, making the confidence interval narrower.'
FROM quizzes q WHERE q.title = 'Estimation and Confidence Intervals Quiz';
