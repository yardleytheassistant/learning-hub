-- Chapter 20: Decision Analysis Quiz
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes)
SELECT ch.id, 'Decision Analysis Quiz', 5, 6 FROM chapters ch WHERE ch.chapter_number = 20;

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 1, 'What is decision theory?',
'["A) A theory about making random choices", "B) An analytic and systematic approach to the study of decision making", "C) Only used in statistics courses", "D) A type of probability distribution"]',
1, 'Decision theory is an analytic and systematic approach to studying decision making under uncertainty.'
FROM quizzes q WHERE q.title = 'Decision Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 2, 'What is a payoff table?',
'["A) A table of probabilities", "B) A table showing the payoff (typically profit) for each combination of alternatives and outcomes", "C) A type of frequency distribution", "D) Only used in accounting"]',
1, 'A payoff table shows the payoff (typically profit or loss) for each combination of decision alternatives and possible outcomes.'
FROM quizzes q WHERE q.title = 'Decision Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 3, 'What are states of nature?',
'["A) The possible conditions or situations over which the decision maker has no control", "B) The decisions being considered", "C) The probabilities of each outcome", "D) The payoffs of the decision"]',
1, 'States of nature are possible conditions or situations over which the decision maker has little or no control.'
FROM quizzes q WHERE q.title = 'Decision Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 4, 'What is the expected value approach?',
'["A) Choosing the alternative with the highest guaranteed payoff", "B) Multiplying each payoff by its probability and summing to find the expected monetary value", "C) Ignoring probabilities completely", "D) Only used when outcomes are certain"]',
1, 'The expected value approach calculates the expected monetary value (EMV) for each alternative by multiplying payoffs by probabilities and summing.'
FROM quizzes q WHERE q.title = 'Decision Analysis Quiz';

INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation)
SELECT q.id, 5, 'What are the six steps in decision making according to the chapter?',
'["A) Guess, check, repeat", "B) Define problem, list alternatives, identify outcomes, list payoffs, select model, make decision", "C) Only statistics-related steps", "D) One standard procedure for all decisions"]',
1, 'The six steps include: define the problem, list alternatives, identify outcomes/states of nature, list payoffs, select a decision model, and apply the model to make the decision.'
FROM quizzes q WHERE q.title = 'Decision Analysis Quiz';
