-- Seed data for Statistics course
-- Run this in Supabase SQL Editor

-- Insert Statistics course
INSERT INTO courses (title, description, category, difficulty) 
VALUES ('Statistics for Business', 'Comprehensive statistics course covering descriptive statistics, probability, sampling, hypothesis testing, and regression analysis for MBA students.', 'Statistics', 'intermediate')
RETURNING id;

-- Chapter data (manually specified UUIDs for reference)
-- Chapter 1
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 1, 'What is Statistics?', 'Introduction to statistics, numerical facts, averages, medians, percentages, and index numbers. Understanding the role of statistics in business decision making.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_01.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 2
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 2, 'Describing Data: Tabular and Graphical Methods', 'Frequency distributions, qualitative data presentation, and graphical methods for summarizing data.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_02.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 3
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 3, 'Describing Data: Numerical Measures', 'Measures of location (mean, median, mode), measures of dispersion, and numerical data summarization.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_03.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 4
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 4, 'Displaying and Exploring Data', 'Measures of position including percentiles and quartiles. Understanding data distribution and variability.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_04.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 5
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 5, 'A Survey of Probability Concepts', 'Introduction to probability, likelihood of events, difference between probability and statistics, and fundamental probability rules.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_05.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 6
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 6, 'Discrete Probability Distributions', 'Random variables, discrete probability distributions, expected value, and variance calculations.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_06.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 7
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 7, 'Continuous Probability Distributions', 'Continuous random variables, probability density functions, normal distribution, and area under curves.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_07.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 8
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 8, 'Sampling Methods and the Central Limit Theorem', 'Random sampling methods, stratified sampling, simple random sampling, and the central limit theorem.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_08.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 9
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 9, 'Estimation and Confidence Intervals', 'Point estimates, confidence intervals, margin of error, and population parameter estimation.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_09.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 10
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 10, 'One-Sample Tests of Hypothesis', 'Hypothesis testing, null and alternative hypotheses, Type I and Type II errors, and p-values.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_10.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 13
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 13, 'Correlation and Linear Regression', 'Analyzing relationships between variables, correlation analysis, scatter diagrams, and simple linear regression.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_13.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 14
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 14, 'Multiple Regression Analysis', 'Multiple regression with multiple independent variables, model specification, and interpretation of regression coefficients.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_14.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Chapter 20
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) 
SELECT c.id, 20, 'Decision Analysis', 'Decision theory, decision making steps, payoff tables, and quantitative approaches to business decisions.', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_20.pdf'
FROM courses c WHERE c.title = 'Statistics for Business';

-- Insert Quiz for Chapter 1
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Statistics Introduction Quiz', 5, 5
FROM chapters ch WHERE ch.chapter_number = 1;

-- Chapter 1 Quiz Questions
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What does the term "statistics" primarily refer to in business context?',
'["A) Numerical facts such as averages, medians, percentages, and index numbers", "B) Only government data collection", "C) A single numerical value", "D) Graphical charts only"]',
0, 'Statistics refers to numerical facts including averages, medians, percentages, and index numbers used in business analysis.'
FROM quizzes q WHERE q.title = 'Statistics Introduction Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is the main difference between probability and statistics?',
'["A) They are the same thing", "B) Probability predicts future events, while statistics analyzes past events", "C) Statistics only deals with graphs", "D) Probability cannot be calculated mathematically"]',
1, 'Probability deals with predicting the likelihood of future events, while statistics involves analysis of frequency of past events.'
FROM quizzes q WHERE q.title = 'Statistics Introduction Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'Which of the following is NOT a typical use of statistics in business?',
'["A) Analyzing market trends", "B) Predicting future sales", "C) Making decisions based on data", "D) Ignoring customer feedback"]',
3, 'Statistics helps analyze market trends, predict sales, and make data-driven decisions - ignoring feedback would be counterproductive.'
FROM quizzes q WHERE q.title = 'Statistics Introduction Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'A measure of central location includes all of the following EXCEPT:',
'["A) Mean", "B) Median", "C) Mode", "D) Range"]',
3, 'Range is a measure of dispersion, not central location. Mean, median, and mode are measures of central location.'
FROM quizzes q WHERE q.title = 'Statistics Introduction Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What is the purpose of descriptive statistics?',
'["A) To make predictions about the future", "B) To summarize and present data in a meaningful way", "C) To test hypotheses", "D) To collect data only"]',
1, 'Descriptive statistics summarize and present data through tables, graphs, and numerical measures to make data more understandable.'
FROM quizzes q WHERE q.title = 'Statistics Introduction Quiz';

-- Insert Quiz for Chapter 2
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Tabular and Graphical Methods Quiz', 5, 5
FROM chapters ch WHERE ch.chapter_number = 2;

-- Chapter 2 Quiz Questions
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a frequency distribution?',
'["A) A list of all data values", "B) A tabular summary showing the number of observations in each category", "C) A graphical representation of data", "D) The average of all values"]',
1, 'A frequency distribution is a tabular summary showing the number (frequency) of observations in each non-overlapping category.'
FROM quizzes q WHERE q.title = 'Tabular and Graphical Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'Which type of data is best summarized using a frequency distribution for categories?',
'["A) Quantitative data only", "B) Qualitative (categorical) data", "C) Both quantitative and qualitative", "D) Neither, only graphs"]',
1, 'Frequency distributions are particularly useful for qualitative/categorical data to show how observations fall into different categories.'
FROM quizzes q WHERE q.title = 'Tabular and Graphical Methods Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is the primary objective of creating a frequency distribution?',
'["A) To increase the complexity of data", "B) To provide insights that cannot be quickly obtained from original data", "C) To change the data values", "D) To hide important information"]',
1, 'The objective is to provide insights about data that cannot be quickly obtained by looking only at the original raw data.'
FROM quizzes q WHERE q.title = 'Tabular and Graphical Methods Quiz';

SELECT 'Seed data inserted successfully!' AS status;
