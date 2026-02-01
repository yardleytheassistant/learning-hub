-- Chapter 13: Correlation and Linear Regression Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Correlation and Linear Regression Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 13;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is correlation analysis?',
'["A) A method to prove causation", "B) A group of techniques to measure the relationship between two variables", "C) Only used for forecasting", "D) A type of hypothesis test"]',
1, 'Correlation analysis is a group of techniques to measure the relationship between two variables.'
FROM quizzes q WHERE q.title = 'Correlation and Linear Regression Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What does the correlation coefficient (r) measure?',
'["A) The slope of the regression line", "B) The strength and direction of the linear relationship between two variables", "C) The probability of causation", "D) The sample size needed"]',
1, 'The correlation coefficient r measures both the strength and direction of the linear relationship between two variables.'
FROM quizzes q WHERE q.title = 'Correlation and Linear Regression Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What does a correlation coefficient of +0.9 indicate?',
'["A) Weak negative relationship", "B) Strong positive relationship", "C) No relationship", "D) Perfect negative relationship"]',
1, 'A correlation coefficient of +0.9 indicates a strong positive linear relationship between the variables.'
FROM quizzes q WHERE q.title = 'Correlation and Linear Regression Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is a scatter diagram?',
'["A) A pie chart of correlations", "B) A graph that displays the relationship between two quantitative variables", "C) A type of histogram", "D) Only used for categorical data"]',
1, 'A scatter diagram (scatter plot) displays the relationship between two quantitative variables as points on a graph.'
FROM quizzes q WHERE q.title = 'Correlation and Linear Regression Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What does the slope (b1) in simple linear regression represent?',
'["A) The correlation coefficient", "B) The change in the dependent variable for a one-unit change in the independent variable", "C) The intercept only", "D) The probability of the model"]',
1, 'The slope b1 represents the estimated change in the dependent variable (Y) for a one-unit change in the independent variable (X).'
FROM quizzes q WHERE q.title = 'Correlation and Linear Regression Quiz';
