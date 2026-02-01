import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedCourse() {
  console.log('Seeding Statistics course...');
  
  // Insert course
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert({
      title: 'Statistics for Business',
      description: 'Comprehensive statistics course covering descriptive statistics, probability, sampling, hypothesis testing, and regression analysis for MBA students.',
      category: 'Statistics',
      difficulty: 'intermediate'
    })
    .select()
    .single();
  
  if (courseError) {
    console.error('Course error:', courseError);
    return;
  }
  console.log('Course created:', course.id);
  
  // Insert chapters
  const chapters = [
    { number: 1, title: 'What is Statistics?', desc: 'Introduction to statistics, numerical facts, averages, medians, percentages, and index numbers. Understanding the role of statistics in business decision making.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_01.pdf' },
    { number: 2, title: 'Describing Data: Tabular and Graphical Methods', desc: 'Frequency distributions, qualitative data presentation, and graphical methods for summarizing data.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_02.pdf' },
    { number: 3, title: 'Describing Data: Numerical Measures', desc: 'Measures of location (mean, median, mode), measures of dispersion, and numerical data summarization.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_03.pdf' },
    { number: 4, title: 'Displaying and Exploring Data', desc: 'Measures of position including percentiles and quartiles. Understanding data distribution and variability.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_04.pdf' },
    { number: 5, title: 'A Survey of Probability Concepts', desc: 'Introduction to probability, likelihood of events, difference between probability and statistics, and fundamental probability rules.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_05.pdf' },
    { number: 6, title: 'Discrete Probability Distributions', desc: 'Random variables, discrete probability distributions, expected value, and variance calculations.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_06.pdf' },
    { number: 7, title: 'Continuous Probability Distributions', desc: 'Continuous random variables, probability density functions, normal distribution, and area under curves.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_07.pdf' },
    { number: 8, title: 'Sampling Methods and the Central Limit Theorem', desc: 'Random sampling methods, stratified sampling, simple random sampling, and the central limit theorem.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_08.pdf' },
    { number: 9, title: 'Estimation and Confidence Intervals', desc: 'Point estimates, confidence intervals, margin of error, and population parameter estimation.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_09.pdf' },
    { number: 10, title: 'One-Sample Tests of Hypothesis', desc: 'Hypothesis testing, null and alternative hypotheses, Type I and Type II errors, and p-values.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_10.pdf' },
    { number: 13, title: 'Correlation and Linear Regression', desc: 'Analyzing relationships between variables, correlation analysis, scatter diagrams, and simple linear regression.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_13.pdf' },
    { number: 14, title: 'Multiple Regression Analysis', desc: 'Multiple regression with multiple independent variables, model specification, and interpretation of regression coefficients.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_14.pdf' },
    { number: 20, title: 'Decision Analysis', desc: 'Decision theory, decision making steps, payoff tables, and quantitative approaches to business decisions.', pdf: '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_20.pdf' }
  ];
  
  for (const ch of chapters) {
    const { data, error } = await supabase
      .from('chapters')
      .insert({
        course_id: course.id,
        chapter_number: ch.number,
        title: ch.title,
        description: ch.desc,
        pdf_path: ch.pdf
      })
      .select()
      .single();
    if (error) console.error('Chapter', ch.number, 'error:', error);
    else console.log('Chapter', ch.number, 'created:', data.id);
  }
  
  // Insert Chapter 1 quiz
  const ch1Result = await supabase.from('chapters').select('id').eq('chapter_number', 1).single();
  if (ch1Result.data) {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        chapter_id: ch1Result.data.id,
        title: 'Statistics Introduction Quiz',
        questions_count: 5,
        time_estimate_minutes: 5
      })
      .select()
      .single();
    
    if (quizError) console.error('Quiz error:', quizError);
    else {
      console.log('Quiz created:', quiz.id);
      
      // Chapter 1 questions
      const questions = [
        { number: 1, q: 'What does the term "statistics" primarily refer to in business context?', options: ['A) Numerical facts such as averages, medians, percentages, and index numbers', 'B) Only government data collection', 'C) A single numerical value', 'D) Graphical charts only'], correct: 0, exp: 'Statistics refers to numerical facts including averages, medians, percentages, and index numbers used in business analysis.' },
        { number: 2, q: 'What is the main difference between probability and statistics?', options: ['A) They are the same thing', 'B) Probability predicts future events, while statistics analyzes past events', 'C) Statistics only deals with graphs', 'D) Probability cannot be calculated mathematically'], correct: 1, exp: 'Probability deals with predicting the likelihood of future events, while statistics involves analysis of frequency of past events.' },
        { number: 3, q: 'Which of the following is NOT a typical use of statistics in business?', options: ['A) Analyzing market trends', 'B) Predicting future sales', 'C) Making decisions based on data', 'D) Ignoring customer feedback'], correct: 3, exp: 'Statistics helps analyze market trends, predict sales, and make data-driven decisions - ignoring feedback would be counterproductive.' },
        { number: 4, q: 'A measure of central location includes all of the following EXCEPT:', options: ['A) Mean', 'B) Median', 'C) Mode', 'D) Range'], correct: 3, exp: 'Range is a measure of dispersion, not central location. Mean, median, and mode are measures of central location.' },
        { number: 5, q: 'What is the purpose of descriptive statistics?', options: ['A) To make predictions about the future', 'B) To summarize and present data in a meaningful way', 'C) To test hypotheses', 'D) To collect data only'], correct: 1, exp: 'Descriptive statistics summarize and present data through tables, graphs, and numerical measures to make data more understandable.' }
      ];
      
      for (const qq of questions) {
        const { error } = await supabase.from('questions').insert({
          quiz_id: quiz.id,
          question_number: qq.number,
          question: qq.q,
          options: qq.options,
          correct_answer: qq.correct,
          explanation: qq.exp
        });
        if (error) console.error('Question', qq.number, 'error:', error);
      }
      console.log('Chapter 1 quiz questions inserted');
    }
  }
  
  console.log('Seed complete!');
}

seedCourse().catch(console.error);
