'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// Mock quiz data
const quizData = {
  id: 'ch01',
  chapter: 'Chapter 1',
  title: 'Information Systems Overview',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of an Information System in an organization?',
      options: [
        'A) To provide entertainment for employees',
        'B) To collect, process, store, and distribute information',
        'C) To replace all manual labor processes',
        'D) To increase company revenue directly'
      ],
      correct_answer: 1,
      explanation: 'Information Systems are designed to collect, process, store, and distribute information to support decision-making and operations.'
    },
    {
      id: 2,
      question: 'Which of the following is NOT a component of an Information System?',
      options: [
        'A) People',
        'B) Processes',
        'C) Technology',
        'D) Office furniture'
      ],
      correct_answer: 3,
      explanation: 'The main components of an IS are people, processes, technology, and data. Office furniture is not a core component.'
    },
    {
      id: 3,
      question: 'What does IT stand for in the context of business?',
      options: [
        'A) International Trade',
        'B) Information Technology',
        'C) Industrial Tools',
        'D) Integrated Transactions'
      ],
      correct_answer: 1,
      explanation: 'IT stands for Information Technology, referring to the use of technology to manage and process information.'
    },
    {
      id: 4,
      question: 'Which type of system helps managers make strategic decisions?',
      options: [
        'A) Transaction Processing System (TPS)',
        'B) Management Information System (MIS)',
        'C) Decision Support System (DSS)',
        'D) Office Automation System (OAS)'
      ],
      correct_answer: 2,
      explanation: 'Decision Support Systems (DSS) are designed to help managers analyze complex situations and make strategic decisions.'
    },
    {
      id: 5,
      question: 'What is the difference between data and information?',
      options: [
        'A) Data is processed, information is raw',
        'B) Information is processed, data is raw',
        'C) They mean the same thing',
        'D) Data is only numbers, information is only text'
      ],
      correct_answer: 1,
      explanation: 'Data refers to raw facts and figures, while information is processed and organized data that has meaning and context.'
    }
  ]
}

export default function QuizTakePage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = quizData.questions[currentQuestion]
  const totalQuestions = quizData.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleSelectAnswer = (index: number) => {
    if (showResults) return
    
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = index
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quizData.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_answer) {
        correct++
      }
    })
    return Math.round((correct / totalQuestions) * 100)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setShowExplanation(false)
  }

  if (showResults) {
    const score = calculateScore()
    const correctCount = quizData.questions.filter((q, i) => selectedAnswers[i] === q.correct_answer).length

    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <span className={`text-3xl font-bold ${
                  score >= 80 ? 'text-green-700' : score >= 60 ? 'text-yellow-700' : 'text-red-700'
                }`}>{score}%</span>
              </div>
              <CardTitle className="text-2xl">{quizData.chapter} Quiz Complete!</CardTitle>
              <CardDescription>
                You got {correctCount} out of {totalQuestions} questions correct.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={resetQuiz}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button asChild>
                  <Link href="/quiz">
                    Back to Quiz Library
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Review Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizData.questions.map((q, i) => {
                const isCorrect = selectedAnswers[i] === q.correct_answer
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{q.id}. {q.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{q.options[selectedAnswers[i]]}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mt-1">
                            Correct answer: {q.options[q.correct_answer]}
                          </p>
                        )}
                        <p className="text-sm mt-2">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{quizData.chapter}</Badge>
              <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}</span>
            </div>
            <CardTitle className="text-lg md:text-xl">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index
              const isCorrect = index === question.correct_answer
              const showCorrect = showExplanation && isCorrect
              const showWrong = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              )
            })}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {showExplanation && (
              <div className="w-full p-4 bg-muted rounded-lg">
                <p className="font-medium mb-1">Explanation:</p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (!showExplanation) {
                    setShowExplanation(true)
                  } else {
                    handleNext()
                  }
                }}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="flex-1"
              >
                {showExplanation ? (
                  currentQuestion === totalQuestions - 1 ? (
                    <>See Results</>
                  ) : (
                    <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                  )
                ) : (
                  <>Check Answer</>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quizData.questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestion(i)
                    setShowExplanation(false)
                  }}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    currentQuestion === i
                      ? 'bg-primary text-primary-foreground'
                      : selectedAnswers[i] !== undefined
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
