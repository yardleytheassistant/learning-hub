-- Chapter 10: One-Sample Tests of Hypothesis Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'One-Sample Tests of Hypothesis Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 10;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a statistical hypothesis?',
'["A) A guess about anything", "B) A statement about a population parameter", "C) Only used in advanced statistics", "D) The same as a confidence interval"]',
1, 'A statistical hypothesis is a statement about the value of a population parameter.'
FROM quizzes q WHERE q.title = 'One-Sample Tests of Hypothesis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is the null hypothesis (H0)?',
'["A) The hypothesis we hope to prove", "B) A statement of no difference or no effect, assumed true until evidence suggests otherwise", "C) Always rejected", "D) Only used in descriptive statistics"]',
1, 'The null hypothesis (H0) is a statement of no difference or no effect, assumed true until sample evidence suggests otherwise.'
FROM quizzes q WHERE q.title = 'One-Sample Tests of Hypothesis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is the alternative hypothesis (H1 or Ha)?',
'["A) The hypothesis we hope to prove", "B) A statement that contradicts the null hypothesis", "C) Always the null hypothesis", "D) Not used in hypothesis testing"]',
1, 'The alternative hypothesis (H1) is a statement that contradicts the null hypothesis and is accepted if there is sufficient evidence.'
FROM quizzes q WHERE q.title = 'One-Sample Tests of Hypothesis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is a Type I error?',
'["A) Failing to reject a false null hypothesis", "B) Rejecting a true null hypothesis", "C) Making a correct decision", "D) Using the wrong test"]',
1, 'A Type I error occurs when we reject a true null hypothesis (false positive).'
FROM quizzes q WHERE q.title = 'One-Sample Tests of Hypothesis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What is a p-value?',
'["A) The probability that the alternative hypothesis is true", "B) The probability of observing the sample result if the null hypothesis is true", "C) The probability of making a Type I error", "D) The significance level"]',
1, 'The p-value is the probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true.'
FROM quizzes q WHERE q.title = 'One-Sample Tests of Hypothesis Quiz';
