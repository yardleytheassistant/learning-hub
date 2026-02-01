-- Chapter 14: Multiple Regression Analysis Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Multiple Regression Analysis Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 14;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is multiple regression analysis?',
'["A) Simple regression with one variable", "B) Regression analysis involving two or more independent variables", "C) Only used for forecasting stock prices", "D) A type of correlation analysis only"]',
1, 'Multiple regression analysis considers situations involving two or more independent variables to predict a dependent variable.'
FROM quizzes q WHERE q.title = 'Multiple Regression Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What does the multiple regression equation E(y) = β0 + β1x1 + β2x2 + ... + βpxp represent?',
'["A) The sample regression equation", "B) The population regression equation describing the mean value of y", "C) The correlation between variables", "D) The probability of the model"]',
1, 'This equation describes how the mean value of y (dependent variable) is related to x1, x2, ..., xp (independent variables).'
FROM quizzes q WHERE q.title = 'Multiple Regression Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'In multiple regression, what do the regression coefficients (β1, β2, etc.) represent?',
'["A) The correlation between all variables", "B) The change in the dependent variable for a one-unit change in that independent variable, holding other variables constant", "C) The intercept of the model", "D) The error term"]',
1, 'Each coefficient represents the estimated change in the dependent variable for a one-unit change in that independent variable, holding other variables constant.'
FROM quizzes q WHERE q.title = 'Multiple Regression Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is multicollinearity in multiple regression?',
'["A) When all variables are independent", "B) When independent variables are highly correlated with each other", "C) A type of residual plot", "D) The intercept being zero"]',
1, 'Multicollinearity occurs when independent variables are highly correlated, which can cause problems in interpreting individual coefficients.'
FROM quizzes q WHERE q.title = 'Multiple Regression Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What is the coefficient of determination (R²) in multiple regression?',
'["A) The correlation between predicted and actual values", "B) The proportion of variation in the dependent variable explained by all independent variables", "C) The number of variables in the model", "D) The slope of the regression line"]',
1, 'R² represents the proportion of the variation in the dependent variable that is explained by the independent variables.'
FROM quizzes q WHERE q.title = 'Multiple Regression Analysis Quiz';
