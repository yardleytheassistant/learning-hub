'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, CheckCircle, FileText, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Chapter {
  id: string
  chapter_number: number
  title: string
  description: string
  pdf_path: string
  quiz?: {
    id: string
    title: string
    questions_count: number
    time_estimate_minutes: number
  }
}

interface PageProps {
  params: Promise<{ id: string; lessonId: string }>
}

export default function LessonViewerPage({ params }: PageProps) {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [courseId, setCourseId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [pdfText, setPdfText] = useState<string>('')
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params
      const { id: courseId, lessonId } = resolvedParams
      setCourseId(courseId)
      
      const res = await fetch(
        `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/chapters?id=eq.${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          }
        }
      )
      const chapters = await res.json()
      if (chapters.length > 0) {
        setChapter(chapters[0])
        
        // Try to extract text from PDF (simplified - in production use proper PDF parsing)
        if (chapters[0].pdf_path) {
          // For now, show the extracted content from our earlier analysis
          const pdfContent = getPdfContent(chapters[0].pdf_path)
          setPdfText(pdfContent)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [params])

  // Get pre-extracted PDF content based on chapter
  function getPdfContent(pdfPath: string) {
    const chapterNum = pdfPath.match(/Ch_(\d+)/)?.[1]
    const contentMap: Record<string, string> = {
      '1': `Chapter 1: What is Statistics?

Statistics is the science of collecting, analyzing, interpreting, and presenting data.

Key Concepts:
• Statistics refers to numerical facts such as averages, medians, percentages, and index numbers
• Data are the facts and figures that are collected, analyzed, and summarized for presentation
• Statistics helps in making informed decisions based on data analysis

Types of Statistics:
1. Descriptive Statistics - organizing, summarizing, and presenting data
2. Inferential Statistics - using sample data to make predictions or inferences about a population

Applications of Statistics:
• Business: Market research, quality control, financial analysis
• Medicine: Clinical trials, epidemiological studies
• Government: Census, economic indicators
• Science: Experimental data analysis

Why Study Statistics?
• To make data-driven decisions
• To understand and interpret research findings
• To communicate effectively with data`,
      '2': `Chapter 2: Describing Data - Tabular and Graphical Methods

Frequency Distribution:
A tabular summary of data showing the number (frequency) of observations in each non-overlapping category or class.

Types of Data:
• Qualitative Data: Categorical data (colors, brands, yes/no)
• Quantitative Data: Numerical data (age, income, count)

Creating a Frequency Distribution:
1. Decide on the number of classes
2. Determine the class width
3. Define class boundaries
4. Count frequencies in each class

Graphical Presentations:
• Bar Charts: For categorical data
• Histograms: For quantitative data in classes
• Pie Charts: Showing proportions
• Frequency Polygons: Line graph of frequencies`,
      '3': `Chapter 3: Describing Data - Numerical Measures

Measures of Location (Central Tendency):
1. Mean (Average): Sum of all values divided by count
   - Most important measure
   - Affected by extreme values

2. Median: Middle value when data is ordered
   - Not affected by extreme values
   - Better for skewed data

3. Mode: Most frequently occurring value
   - Can have multiple modes or no mode

Measures of Dispersion:
1. Range: Maximum - Minimum
2. Variance: Average of squared deviations from mean
3. Standard Deviation: Square root of variance
4. Coefficient of Variation: Standard deviation / mean (relative measure)

Shape of Distribution:
• Symmetric: Mean = Median
• Positively Skewed: Mean > Median
• Negatively Skewed: Mean < Median`,
      '4': `Chapter 4: Displaying and Exploring Data

Measures of Position:
Percentiles: Values that divide data into 100 equal parts
• The pth percentile: At least p% of values are at or below this value

Quartiles: Divide data into 4 equal parts
• Q1 (25th percentile): First quartile
• Q2 (50th percentile): Median
• Q3 (75th percentile): Third quartile

Interquartile Range (IQR): Q3 - Q1
• Measures spread of middle 50% of data
• Used to identify outliers

Box Plot (Box-and-Whisker):
• Visual display of five-number summary:
  - Minimum, Q1, Median, Q3, Maximum
• Outliers: Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR`,
      '5': `Chapter 5: A Survey of Probability Concepts

Probability: The likelihood that an event will occur
• Always between 0 and 1
• 0 = impossible, 1 = certain

Key Concepts:
• Experiment: A process that generates well-defined outcomes
• Sample Space: All possible outcomes
• Event: A set of one or more outcomes

Types of Probability:
1. Classical Probability: Based on equally likely outcomes
2. Empirical Probability: Based on observed data
3. Subjective Probability: Based on personal judgment

Rules of Probability:
• P(A) + P(A') = 1
• P(A or B) = P(A) + P(B) - P(A and B)
• Independent events: P(A and B) = P(A) × P(B)

Applications:
• Genetics, Physics, Economics, Finance, Social Sciences`,
      '6': `Chapter 6: Discrete Probability Distributions

Random Variable: A numerical description of the outcome of an experiment
• Discrete: Countable values (0, 1, 2, ...)
• Continuous: Any value in an interval

Probability Mass Function (PMF):
Gives the probability for each possible value of a discrete random variable

Expected Value (Mean): E(X) = Σ[x × P(x)]
• Long-run average value

Variance: Var(X) = Σ[(x - μ)² × P(x)]
• Measures spread of the distribution

Common Discrete Distributions:
• Binomial Distribution: Fixed number of trials, two outcomes
• Poisson Distribution: Rare events over time/space
• Hypergeometric Distribution: Sampling without replacement`,
      '7': `Chapter 7: Continuous Probability Distributions

Continuous Random Variable: Can assume any value in an interval

Probability Density Function (PDF):
• Area under the curve = probability
• Total area = 1
• P(X = x) = 0 for any specific value (we use intervals)

Normal Distribution:
• Bell-shaped, symmetric
• Defined by mean (μ) and standard deviation (σ)
• 68-95-99.7 Rule:
  - 68% within 1σ of mean
  - 95% within 2σ of mean
  - 99.7% within 3σ of mean

Standard Normal Distribution:
• Z = (X - μ) / σ
• Mean = 0, Standard Deviation = 1
• Z-tables used to find probabilities`,
      '8': `Chapter 8: Sampling Methods and the Central Limit Theorem

Why Sample?
• Time-consuming to study entire population
• Cost-prohibitive
• Physically impossible (infinite populations)
• Destructive testing

Sampling Methods:
1. Simple Random Sampling: Every item has equal chance
2. Stratified Random Sampling: Divide into strata, sample from each
3. Systematic Sampling: Every kth item
4. Cluster Sampling: Sample groups (clusters) entirely

Central Limit Theorem:
As sample size increases, the sampling distribution of the sample mean:
• Becomes approximately normal
• Mean = population mean
• Standard Error = σ / √n

Rule of thumb: n ≥ 30 for CLT to apply (usually)`,
      '9': `Chapter 9: Estimation and Confidence Intervals

Point Estimate: Single value from sample that estimates population parameter
• Sample mean estimates population mean

Confidence Interval: Range of values likely to contain the true parameter

Formula for Population Mean (σ known):
x̄ ± z × (σ / √n)
• z = 1.96 for 95% confidence
• Margin of Error = z × (σ / √n)

Factors Affecting Width:
• Larger sample size → Narrower interval
• Higher confidence level → Wider interval
• Larger standard deviation → Wider interval

Sample Size Determination:
n = (z × σ / E)²
• E = desired margin of error`,
      '10': `Chapter 10: One-Sample Tests of Hypothesis

Hypothesis Testing: Procedure to determine if sample evidence supports a claim about population

Null Hypothesis (H0): Statement of no difference/effect
• Assumed true until evidence suggests otherwise

Alternative Hypothesis (H1): Statement contradicting H0
• What we hope to prove

Errors:
• Type I Error (α): Reject H0 when it's true
• Type II Error (β): Fail to reject H0 when it's false

Steps:
1. State hypotheses
2. Choose significance level (α)
3. Calculate test statistic
4. Find p-value or critical value
5. Make decision: reject or fail to reject H0`,
      '13': `Chapter 13: Correlation and Linear Regression

Correlation Analysis: Measures strength and direction of relationship
• Correlation coefficient (r): -1 to +1
• r = +1: Perfect positive
• r = -1: Perfect negative
• r = 0: No linear relationship

Scatter Diagram: Graph showing relationship between two variables

Simple Linear Regression:
ŷ = b₀ + b₁x
• b₁: Slope (change in y for unit change in x)
• b₀: Intercept

Coefficient of Determination (R²):
• Proportion of variation in y explained by x
• R² = r²

Interpretation:
• Positive r: As x increases, y tends to increase
• Negative r: As x increases, y tends to decrease`,
      '14': `Chapter 14: Multiple Regression Analysis

Multiple Regression: Predict y using two or more independent variables

Model: ŷ = b₀ + b₁x₁ + b₂x₂ + ... + bₚxₚ

Interpretation of Coefficients:
• bᵢ: Change in y for unit change in xᵢ, holding other variables constant

Coefficient of Determination (R²):
• Adjusted R² accounts for number of predictors
• Better for comparing models with different numbers of predictors

Multicollinearity:
• High correlation among independent variables
• Makes it difficult to interpret individual coefficients

Model Building:
• Forward selection
• Backward elimination
• Stepwise regression`,
      '20': `Chapter 20: Decision Analysis

Decision Theory: Systematic approach to decision making under uncertainty

Six Steps:
1. Define the problem
2. List alternatives
3. Identify states of nature
4. List payoffs
5. Select decision criteria
6. Make decision

Payoff Table:
• Rows: Alternatives
• Columns: States of nature
• Cells: Payoffs (profit/loss)

Decision Criteria:
• Maximax: Best of the best
• Maximin: Best of the worst
• Hurwicz: Coefficient of optimism
• Expected Monetary Value (EMV)
• Expected Opportunity Loss (EOL)`,
    }
    
    return contentMap[chapterNum || ''] || 'Content not available. The PDF content will be displayed here.'
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    )
  }

  if (!chapter) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Chapter not found</h1>
          <Link href={`/courses/${courseId}`} className="text-primary hover:underline mt-4 block">
            ← Back to course
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link href={`/courses/${courseId}`} className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Course
              </Link>
              <h1 className="text-2xl font-bold mt-1">Chapter {chapter.chapter_number}: {chapter.title}</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowSidebar(!showSidebar)}>
              <Menu className="w-4 h-4" />
            </Button>
          </div>

          {/* PDF Content Card */}
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {pdfText.split('\n').map((line, i) => {
                  if (line.match(/^Chapter \d+/)) {
                    return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{line}</h1>
                  }
                  if (line.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/)) {
                    return <h2 key={i} className="text-xl font-semibold mt-5 mb-2">{line}</h2>
                  }
                  if (line.match(/^\d\./)) {
                    return <h3 key={i} className="text-lg font-medium mt-4 mb-2">{line}</h3>
                  }
                  if (line.match(/^•/)) {
                    return <li key={i} className="ml-4">{line.slice(1).trim()}</li>
                  }
                  if (line.trim()) {
                    return <p key={i} className="my-2">{line}</p>
                  }
                  return null
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" disabled>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Link href={`/courses/${courseId}/quiz/${chapter.quiz?.id || ''}`}>
              <Button disabled={!chapter.quiz}>
                Take Quiz
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-64 hidden lg:block">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Chapter Resources</h3>
                <div className="space-y-2">
                  {chapter.pdf_path && (
                    <a 
                      href={chapter.pdf_path} 
                      target="_blank" 
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      View Original PDF
                    </a>
                  )}
                  {chapter.quiz && (
                    <Link 
                      href={`/courses/${courseId}/quiz/${chapter.quiz.id}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Take Quiz ({chapter.quiz.questions_count} questions)
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
