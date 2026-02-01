-- Chapter 4: Displaying and Exploring Data Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Displaying and Exploring Data Quiz', 5, 5 FROM chapters ch WHERE ch.chapter_number = 4;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is a percentile?',
'["A) The average of all values", "B) A value below which a certain percent of observations fall", "C) The most common value", "D) The total sum of data"]',
1, 'A percentile indicates the value below which a given percentage of observations fall. For example, the 90th percentile means 90% of values are below it.'
FROM quizzes q WHERE q.title = 'Displaying and Exploring Data Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'If a student scores in the 92nd percentile on the SAT, what does this mean?',
'["A) They scored 92% of questions correctly", "B) At least 92% of test takers scored lower, and at least 8% scored higher", "C) They scored better than 8% of students", "D) Their score is 92 out of 1600"]',
1, 'Scoring in the 92nd percentile means performing better than 92% of other test takers.'
FROM quizzes q WHERE q.title = 'Displaying and Exploring Data Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What are quartiles?',
'["A) Four types of graphs", "B) Values that divide data into four equal parts", "C) A type of average", "D) Measures of central tendency only"]',
1, 'Quartiles (Q1, Q2, Q3) divide ranked data into four equal parts. Q2 is the median.'
FROM quizzes q WHERE q.title = 'Displaying and Exploring Data Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is the interquartile range (IQR)?',
'["A) The range of all data values", "B) Q3 minus Q1, measuring the middle 50% of data", "C) The difference between mean and median", "D) A measure of central location"]',
1, 'IQR = Q3 - Q1, representing the spread of the middle 50% of the data.'
FROM quizzes q WHERE q.title = 'Displaying and Exploring Data Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What is a box plot used for?',
'["A) Showing the total sum of data", "B) Visualizing the distribution including quartiles, median, and outliers", "C) Calculating the mean", "D) Displaying categorical data only"]',
1, 'A box plot (box-and-whisker) displays the five-number summary: minimum, Q1, median, Q3, maximum, and identifies outliers.'
FROM quizzes q WHERE q.title = 'Displaying and Exploring Data Quiz';
