const fs = require('fs');

// Read chapters first
async function getChapters() {
  const res = await fetch('https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/chapters?select=id,chapter_number', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU'
    }
  });
  return res.json();
}

async function insertQuiz(quiz) {
  const res = await fetch('https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/quizzes?select=id', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(quiz)
  });
  return res;
}

async function insertQuestion(question) {
  const res = await fetch('https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/questions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(question)
  });
  return res;
}

// Quiz data organized by chapter
const quizzesData = {
  3: {
    title: 'Numerical Measures Quiz',
    questions: [
      { q: 'What is the arithmetic mean?', options: ['A) The middle value when data is ordered', 'B) The most frequently occurring value', 'C) The average of all data values', 'D) The difference between highest and lowest values'], correct: 2, exp: 'The arithmetic mean is the sum of all values divided by the number of values - the most important measure of central location.' },
      { q: 'Which measure of central location is most affected by extreme values (outliers)?', options: ['A) Median', 'B) Mode', 'C) Mean', 'D) Percentile'], correct: 2, exp: 'The mean is most affected by extreme values because it considers all data points in its calculation.' },
      { q: 'What is the median?', options: ['A) The average of all values', 'B) The middle value when data is ordered', 'C) The most frequent value', 'D) The sum of all values divided by count'], correct: 1, exp: 'The median is the middle value when data is arranged in ascending or descending order - it is not affected by extreme values.' },
      { q: 'What is the mode?', options: ['A) The middle value', 'B) The average value', 'C) The most frequently occurring value', 'D) The total sum of values'], correct: 2, exp: 'The mode is the value that occurs most frequently in a dataset. A dataset can have multiple modes or no mode.' },
      { q: 'What does a larger standard deviation indicate?', options: ['A) Data is clustered around the mean', 'B) Data has more variability/spread', 'C) The mean is larger', 'D) The median is more accurate'], correct: 1, exp: 'A larger standard deviation means the data values are more spread out from the mean, indicating more variability in the dataset.' }
    ]
  },
  4: {
    title: 'Displaying and Exploring Data Quiz',
    questions: [
      { q: 'What is a percentile?', options: ['A) The average of all values', 'B) A value below which a certain percent of observations fall', 'C) The most common value', 'D) The total sum of data'], correct: 1, exp: 'A percentile indicates the value below which a given percentage of observations fall.' },
      { q: 'If a student scores in the 92nd percentile on the SAT, what does this mean?', options: ['A) They scored 92% of questions correctly', 'B) At least 92% of test takers scored lower, and at least 8% scored higher', 'C) They scored better than 8% of students', 'D) Their score is 92 out of 1600'], correct: 1, exp: 'Scoring in the 92nd percentile means performing better than 92% of other test takers.' },
      { q: 'What are quartiles?', options: ['A) Four types of graphs', 'B) Values that divide data into four equal parts', 'C) A type of average', 'D) Measures of central tendency only'], correct: 1, exp: 'Quartiles (Q1, Q2, Q3) divide ranked data into four equal parts.' },
      { q: 'What is the interquartile range (IQR)?', options: ['A) The range of all data values', 'B) Q3 minus Q1, measuring the middle 50% of data', 'C) The difference between mean and median', 'D) A measure of central location'], correct: 1, exp: 'IQR = Q3 - Q1, representing the spread of the middle 50% of the data.' },
      { q: 'What is a box plot used for?', options: ['A) Showing the total sum of data', 'B) Visualizing the distribution including quartiles, median, and outliers', 'C) Calculating the mean', 'D) Displaying categorical data only'], correct: 1, exp: 'A box plot displays the five-number summary and identifies outliers.' }
    ]
  },
  5: {
    title: 'Probability Concepts Quiz',
    questions: [
      { q: 'Probability and statistics are related areas that concern themselves with analyzing:', options: ['A) The relative frequency of events', 'B) Only government data', 'C) Only graphical representations', 'D) Single values only'], correct: 0, exp: 'Both probability and statistics concern themselves with analyzing the relative frequency of events.' },
      { q: 'What is the fundamental difference between probability and statistics?', options: ['A) They have no relationship', 'B) Probability predicts future events, statistics analyzes past events', 'C) Statistics is only used in gambling', 'D) Probability cannot be applied to business'], correct: 1, exp: 'Probability deals with predicting future events, while statistics analyzes past events.' },
      { q: 'Which field applies probability concepts according to the chapter?', options: ['A) Physics, Genetics, Economics, Social Sciences', 'B) Only mathematics', 'C) Only gambling', 'D) Only medical fields'], correct: 0, exp: 'Probability applications include physics, genetics, economics, social sciences, finance, and more.' },
      { q: 'What is an experiment in probability?', options: ['A) A laboratory test', 'B) A process that generates well-defined outcomes', 'C) Something that always has the same result', 'D) Only related to gambling'], correct: 1, exp: 'An experiment is a process that generates well-defined outcomes.' },
      { q: 'What is an event in probability?', options: ['A) A party celebration', 'B) A set of one or more outcomes of an experiment', 'C) Always an unlikely occurrence', 'D) Only possible outcomes'], correct: 1, exp: 'An event is a set of one or more outcomes of an experiment.' }
    ]
  },
  6: {
    title: 'Discrete Probability Distributions Quiz',
    questions: [
      { q: 'What is a discrete random variable?', options: ['A) A variable that can take any value in an interval', 'B) A variable that can only take distinct/countable values', 'C) Only continuous variables', 'D) Variables with no probability distribution'], correct: 1, exp: 'A discrete random variable may assume distinct or countable values.' },
      { q: 'What is a probability mass function (PMF)?', options: ['A) A function for continuous variables only', 'B) A function that gives the probability of each possible value of a discrete random variable', 'C) A type of average', 'D) Only used for normal distribution'], correct: 1, exp: 'The PMF gives the probability that a discrete random variable equals some specific value.' },
      { q: 'What is the expected value of a discrete random variable?', options: ['A) The most likely outcome', 'B) The long-run average value of repetitions of the experiment', 'C) The variance of the distribution', 'D) The maximum possible value'], correct: 1, exp: 'The expected value is the long-run average value of repetitions.' },
      { q: 'What does variance measure?', options: ['A) The center of the distribution', 'B) The spread or dispersion of the random variable\'s values', 'C) The probability of success', 'D) The number of outcomes'], correct: 1, exp: 'Variance measures the spread of the random variable\'s values around the expected value.' },
      { q: 'Which is an example of a discrete random variable?', options: ['A) The exact height of students', 'B) The number of heads in 10 coin flips', 'C) The exact time until a light bulb fails', 'D) The weight to infinite precision'], correct: 1, exp: 'The number of heads is discrete (0, 1, 2, ..., 10).' }
    ]
  },
  7: {
    title: 'Continuous Probability Distributions Quiz',
    questions: [
      { q: 'What is a continuous random variable?', options: ['A) A variable with only integer values', 'B) A variable that can assume any value in an interval', 'C) Only variables with few outcomes', 'D) Variables without probability distributions'], correct: 1, exp: 'A continuous random variable may assume any numerical value in an interval.' },
      { q: 'What is the probability that a continuous random variable takes a specific value?', options: ['A) Always 1', 'B) Always 0.5', 'C) Practically zero', 'D) Cannot be calculated'], correct: 2, exp: 'For continuous random variables, the probability of any single point is zero.' },
      { q: 'What is a probability density function (PDF)?', options: ['A) A function that gives probabilities directly', 'B) A function where area under the curve equals probability', 'C) Only for discrete variables', 'D) Gives the exact value'], correct: 1, exp: 'For continuous variables, probability is the area under the PDF curve.' },
      { q: 'What is the standard normal distribution?', options: ['A) Any normal distribution', 'B) A normal distribution with mean 0 and standard deviation 1', 'C) A distribution with no variance', 'D) Only used in discrete mathematics'], correct: 1, exp: 'The standard normal distribution has μ = 0 and σ = 1.' },
      { q: 'What does the area under a normal curve represent?', options: ['A) The total number of data points', 'B) Probability (equals 1 for the entire distribution)', 'C) The mean of the data', 'D) The standard deviation'], correct: 1, exp: 'The total area under any PDF equals 1, representing total probability.' }
    ]
  },
  8: {
    title: 'Sampling Methods Quiz',
    questions: [
      { q: 'What is simple random sampling?', options: ['A) Sampling only convenient items', 'B) A sample where each item has an equal chance of being selected', 'C) Taking the first N items', 'D) Only selecting from one group'], correct: 1, exp: 'Simple random sampling gives each item an equal chance of selection.' },
      { q: 'Why do we sample a population?', options: ['A) To make data more complicated', 'B) Time-consuming, cost-prohibitive, or physically impossible to check all items', 'C) Because sampling is always less accurate', 'D) Because we cannot analyze large datasets'], correct: 1, exp: 'Reasons include: time-consuming, costly, physical impossibility, destructive tests.' },
      { q: 'What is stratified random sampling?', options: ['A) Taking samples from only one stratum', 'B) Dividing population into groups and sampling from each group', 'C) Random sampling without any structure', 'D) Only used for small populations'], correct: 1, exp: 'Stratified sampling divides population into strata and samples from each.' },
      { q: 'What is the Central Limit Theorem important for?', options: ['A) Destroying data', 'B) Allowing us to make inferences about population means from sample means', 'C) Only applies to small samples', 'D) Makes data collection harder'], correct: 1, exp: 'CLT allows using sample statistics to infer population parameters.' },
      { q: 'According to CLT, as sample size increases, the sampling distribution:', options: ['A) Becomes more skewed', 'B) Becomes approximately normal', 'C) Becomes wider', 'D) Becomes less reliable'], correct: 1, exp: 'For large samples, the sampling distribution approaches normality.' }
    ]
  },
  9: {
    title: 'Estimation and Confidence Intervals Quiz',
    questions: [
      { q: 'What is a point estimate?', options: ['A) A range of values', 'B) A single statistic computed from sample data that estimates a population parameter', 'C) An exact population value', 'D) The margin of error'], correct: 1, exp: 'A point estimate is a single value that estimates a population parameter.' },
      { q: 'What does a 95% confidence interval mean?', options: ['A) 95% of the population falls in this range', 'B) We are 95% confident the true parameter is in this range', 'C) The interval will contain the sample mean 95% of the time', 'D) 95% of samples will produce this exact interval'], correct: 1, exp: 'We are 95% confident that the true population parameter falls within the interval.' },
      { q: 'What is the margin of error?', options: ['A) The difference between sample and population mean', 'B) The maximum expected difference between point estimate and true parameter', 'C) The standard deviation of the sample', 'D) The sample size'], correct: 1, exp: 'Margin of error is the maximum expected difference between estimate and true parameter.' },
      { q: 'What factors affect the width of a confidence interval?', options: ['A) Only the sample mean', 'B) Sample size, variability, and confidence level', 'C) Only the confidence level', 'D) Only the population size'], correct: 1, exp: 'Larger samples and lower variability produce narrower intervals.' },
      { q: 'How does increasing sample size affect the confidence interval?', options: ['A) Makes it wider', 'B) Makes it narrower', 'C) Has no effect', 'D) Changes the confidence level'], correct: 1, exp: 'Increasing sample size decreases the standard error, making the interval narrower.' }
    ]
  },
  10: {
    title: 'One-Sample Tests of Hypothesis Quiz',
    questions: [
      { q: 'What is a statistical hypothesis?', options: ['A) A guess about anything', 'B) A statement about a population parameter', 'C) Only used in advanced statistics', 'D) The same as a confidence interval'], correct: 1, exp: 'A statistical hypothesis is a statement about the value of a population parameter.' },
      { q: 'What is the null hypothesis (H0)?', options: ['A) The hypothesis we hope to prove', 'B) A statement of no difference or no effect, assumed true until evidence suggests otherwise', 'C) Always rejected', 'D) Only used in descriptive statistics'], correct: 1, exp: 'Null hypothesis is a statement of no effect, assumed true until evidence suggests otherwise.' },
      { q: 'What is the alternative hypothesis (H1)?', options: ['A) The hypothesis we hope to prove', 'B) A statement that contradicts the null hypothesis', 'C) Always the null hypothesis', 'D) Not used in hypothesis testing'], correct: 1, exp: 'Alternative hypothesis contradicts the null and is accepted with sufficient evidence.' },
      { q: 'What is a Type I error?', options: ['A) Failing to reject a false null hypothesis', 'B) Rejecting a true null hypothesis', 'C) Making a correct decision', 'D) Using the wrong test'], correct: 1, exp: 'Type I error: rejecting a true null hypothesis (false positive).' },
      { q: 'What is a p-value?', options: ['A) The probability that the alternative hypothesis is true', 'B) The probability of observing the sample result if the null hypothesis is true', 'C) The probability of making a Type I error', 'D) The significance level'], correct: 1, exp: 'P-value is the probability of observing results as extreme as the sample, assuming H0 is true.' }
    ]
  },
  13: {
    title: 'Correlation and Linear Regression Quiz',
    questions: [
      { q: 'What is correlation analysis?', options: ['A) A method to prove causation', 'B) A group of techniques to measure the relationship between two variables', 'C) Only used for forecasting', 'D) A type of hypothesis test'], correct: 1, exp: 'Correlation analysis measures the relationship between two variables.' },
      { q: 'What does the correlation coefficient (r) measure?', options: ['A) The slope of the regression line', 'B) The strength and direction of the linear relationship between two variables', 'C) The probability of causation', 'D) The sample size needed'], correct: 1, exp: 'Correlation coefficient measures strength and direction of linear relationship.' },
      { q: 'What does a correlation coefficient of +0.9 indicate?', options: ['A) Weak negative relationship', 'B) Strong positive relationship', 'C) No relationship', 'D) Perfect negative relationship'], correct: 1, exp: '+0.9 indicates a strong positive linear relationship.' },
      { q: 'What is a scatter diagram?', options: ['A) A pie chart of correlations', 'B) A graph that displays the relationship between two quantitative variables', 'C) A type of histogram', 'D) Only used for categorical data'], correct: 1, exp: 'Scatter diagram displays relationship between two quantitative variables.' },
      { q: 'What does the slope (b1) in simple linear regression represent?', options: ['A) The correlation coefficient', 'B) The change in Y for a one-unit change in X', 'C) The intercept only', 'D) The probability of the model'], correct: 1, exp: 'Slope represents change in dependent variable for one-unit change in independent variable.' }
    ]
  },
  14: {
    title: 'Multiple Regression Analysis Quiz',
    questions: [
      { q: 'What is multiple regression analysis?', options: ['A) Simple regression with one variable', 'B) Regression with two or more independent variables', 'C) Only for forecasting stock prices', 'D) A type of correlation analysis only'], correct: 1, exp: 'Multiple regression involves two or more independent variables.' },
      { q: 'What does E(y) = β0 + β1x1 + β2x2 + ... represent?', options: ['A) The sample regression equation', 'B) The population regression equation for mean of y', 'C) The correlation between variables', 'D) The probability of the model'], correct: 1, exp: 'Equation describes how mean of y is related to independent variables.' },
      { q: 'In multiple regression, what do coefficients represent?', options: ['A) Correlation between all variables', 'B) Change in Y for one-unit change in that X, holding others constant', 'C) The intercept', 'D) The error term'], correct: 1, exp: 'Each coefficient shows change in Y for unit change in that X, holding others constant.' },
      { q: 'What is multicollinearity?', options: ['A) When all variables are independent', 'B) When independent variables are highly correlated', 'C) A type of residual plot', 'D) The intercept being zero'], correct: 1, exp: 'Multicollinearity occurs when independent variables are highly correlated.' },
      { q: 'What is R² in multiple regression?', options: ['A) Correlation between predicted and actual', 'B) Proportion of variation in Y explained by X variables', 'C) Number of variables', 'D) The slope'], correct: 1, exp: 'R² represents proportion of variation in Y explained by independent variables.' }
    ]
  },
  20: {
    title: 'Decision Analysis Quiz',
    questions: [
      { q: 'What is decision theory?', options: ['A) Theory about random choices', 'B) Analytic and systematic approach to decision making', 'C) Only used in statistics courses', 'D) A type of probability distribution'], correct: 1, exp: 'Decision theory is an analytic approach to studying decision making.' },
      { q: 'What is a payoff table?', options: ['A) Table of probabilities', 'B) Table showing payoff for each combination of alternatives and outcomes', 'C) A type of frequency distribution', 'D) Only used in accounting'], correct: 1, exp: 'Payoff table shows payoffs for each combination of alternatives and outcomes.' },
      { q: 'What are states of nature?', options: ['A) Possible conditions over which decision maker has no control', 'B) The decisions being considered', 'C) The probabilities', 'D) The payoffs'], correct: 1, exp: 'States of nature are conditions over which the decision maker has no control.' },
      { q: 'What is the expected value approach?', options: ['A) Choosing alternative with highest guaranteed payoff', 'B) Multiplying each payoff by probability and summing', 'C) Ignoring probabilities', 'D) Only when outcomes are certain'], correct: 1, exp: 'Expected value approach calculates EMV by multiplying payoffs by probabilities.' },
      { q: 'What are the six steps in decision making?', options: ['A) Guess, check, repeat', 'B) Define problem, list alternatives, identify outcomes, list payoffs, select model, make decision', 'C) Only statistics steps', 'D) One standard procedure'], correct: 1, exp: 'Steps include: define problem, alternatives, outcomes, payoffs, select model, make decision.' }
    ]
  }
};

async function main() {
  const chapters = await getChapters();
  const chapterMap = {};
  chapters.forEach(ch => { chapterMap[ch.chapter_number] = ch.id; });
  
  console.log('Found chapters:', Object.keys(chapterMap));
  
  for (const [num, data] of Object.entries(quizzesData)) {
    const chId = chapterMap[num];
    if (!chId) {
      console.log('Chapter', num, 'not found');
      continue;
    }
    
    // Create quiz
    const quizRes = await insertQuiz({
      chapter_id: chId,
      title: data.title,
      questions_count: data.questions.length,
      time_estimate_minutes: 5
    });
    
    if (!quizRes.ok) {
      console.log('Failed to create quiz for chapter', num);
      continue;
    }
    
    console.log('Created quiz for chapter', num);
    
    // Get quiz ID (need to fetch it)
    const quizList = await fetch(`https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/quizzes?chapter_id=eq.${chId}&select=id`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHl4c2t1cWx1b2t6cnhxa2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgzMjY1MSwiZXhwIjoyMDg1NDA4NjUxfQ.Wyy_qkQVJMqx7n6gm151yWp3B8IrUyK52MfPnSyBgpU'
      }
    }).then(r => r.json());
    
    const quizId = quizList[0]?.id;
    if (!quizId) continue;
    
    // Insert questions
    for (let i = 0; i < data.questions.length; i++) {
      const q = data.questions[i];
      await insertQuestion({
        quiz_id: quizId,
        question_number: i + 1,
        question: q.q,
        options: q.options,
        correct_answer: q.correct,
        explanation: q.exp
      });
    }
    console.log('Inserted', data.questions.length, 'questions for chapter', num);
  }
  console.log('Done!');
}

main().catch(console.error);
