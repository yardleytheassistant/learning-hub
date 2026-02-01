-- Chapter 3: Numerical Measures Quiz Questions
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Numerical Measures Quiz', 5, 5 FROM chapters ch WHERE ch.chapter_number = 3;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is the arithmetic mean?',
'["A) The middle value when data is ordered", "B) The most frequently occurring value", "C) The average of all data values", "D) The difference between highest and lowest values"]',
2, 'The arithmetic mean is the sum of all values divided by the number of values - the most important measure of central location.'
FROM quizzes q WHERE q.title = 'Numerical Measures Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'Which measure of central location is most affected by extreme values (outliers)?',
'["A) Median", "B) Mode", "C) Mean", "D) Percentile"]',
2, 'The mean is most affected by extreme values because it considers all data points in its calculation.'
FROM quizzes q WHERE q.title = 'Numerical Measures Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What is the median?',
'["A) The average of all values", "B) The middle value when data is ordered", "C) The most frequent value", "D) The sum of all values divided by count"]',
1, 'The median is the middle value when data is arranged in ascending or descending order - it is not affected by extreme values.'
FROM quizzes q WHERE q.title = 'Numerical Measures Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is the mode?',
'["A) The middle value", "B) The average value", "C) The most frequently occurring value", "D) The total sum of values"]',
2, 'The mode is the value that occurs most frequently in a dataset. A dataset can have multiple modes or no mode.'
FROM quizzes q WHERE q.title = 'Numerical Measures Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What does a larger standard deviation indicate?',
'["A) Data is clustered around the mean", "B) Data has more variability/spread", "C) The mean is larger", "D) The median is more accurate"]',
1, 'A larger standard deviation means the data values are more spread out from the mean, indicating more variability in the dataset.'
FROM quizzes q WHERE q.title = 'Numerical Measures Quiz';
