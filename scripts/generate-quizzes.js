import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chapters = [
  { num: 3, topic: 'Numerical Measures - mean, median, mode, measures of dispersion, range, variance, standard deviation' },
  { num: 4, topic: 'Displaying and Exploring Data - percentiles, quartiles, measures of position, box plots' },
  { num: 5, topic: 'Probability Concepts - likelihood of events, probability rules, difference between probability and statistics' },
  { num: 6, topic: 'Discrete Probability Distributions - random variables, probability mass functions, expected value, variance' },
  { num: 7, topic: 'Continuous Probability Distributions - probability density functions, normal distribution, area under curve' },
  { num: 8, topic: 'Sampling Methods and Central Limit Theorem - simple random sampling, stratified sampling, CLT' },
  { num: 9, topic: 'Estimation and Confidence Intervals - point estimates, confidence intervals, margin of error' },
  { num: 10, topic: 'One-Sample Tests of Hypothesis - null hypothesis, alternative hypothesis, p-values, Type I and II errors' },
  { num: 13, topic: 'Correlation and Linear Regression - scatter diagrams, correlation coefficient, simple linear regression' },
  { num: 14, topic: 'Multiple Regression Analysis - multiple independent variables, regression coefficients, model specification' },
  { num: 20, topic: 'Decision Analysis - decision theory, payoff tables, decision making steps, expected value' }
];

const prompt = `Generate 5 quiz questions about [TOPIC] from a Statistics course.

Output ONLY valid JSON array (no markdown, no explanation):
[
  {
    "question": "Question text?",
    "options": ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
    "correct_answer": 0,
    "explanation": "Why this answer is correct"
  }
]

IMPORTANT: Return only valid JSON, nothing else. No code blocks, no markdown.`;

async function generateQuiz(chapter) {
  console.log(`\nGenerating questions for Chapter ${chapter.num}...`);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a statistics professor creating quiz questions.' },
      { role: 'user', content: prompt.replace('[TOPIC]', chapter.topic) }
    ],
    temperature: 0.7
  });
  
  const content = response.choices[0].message.content;
  console.log(`Chapter ${chapter.num}:`);
  console.log(content);
  
  return { chapter: chapter.num, questions: content };
}

async function main() {
  for (const chapter of chapters) {
    try {
      await generateQuiz(chapter);
      await new Promise(r => setTimeout(r, 1000)); // Rate limit
    } catch (e) {
      console.error(`Chapter ${chapter.num} failed:`, e.message);
    }
  }
}

main();
