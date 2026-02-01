'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Question {
  id: string
  question_number: number
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

interface Quiz {
  id: string
  title: string
  questions_count: number
  time_estimate_minutes: number
  chapter?: {
    id: string
    chapter_number: number
    title: string
  }
}

interface PageProps {
  params: Promise<{ id: string; quizId: string }>
}

export default function QuizPage({ params }: PageProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params
      const { id: courseId, quizId } = resolvedParams
      
      // Fetch quiz
      const quizRes = await fetch(
        `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/quizzes?id=eq.${quizId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          }
        }
      )
      const quizzes = await quizRes.json()
      if (quizzes.length > 0) {
        const q = quizzes[0]
        setQuiz(q)
        
        // Fetch questions
        const questionsRes = await fetch(
          `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/questions?quiz_id=eq.${quizId}&order=question_number.asc`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
              'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            }
          }
        )
        const questionsData = await questionsRes.json()
        setQuestions(questionsData.map((q: any) => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        })))
      }
      setLoading(false)
    }
    fetchData()
  }, [params])

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct_answer) correct++
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { message: 'Excellent!', icon: Award, color: 'text-green-600' }
    if (score >= 80) return { message: 'Great Job!', icon: Award, color: 'text-green-500' }
    if (score >= 70) return { message: 'Good Work!', icon: CheckCircle, color: 'text-blue-500' }
    if (score >= 60) return { message: 'Keep Practicing!', icon: Clock, color: 'text-yellow-500' }
    return { message: 'Review the Material', icon: XCircle, color: 'text-red-500' }
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

  if (!quiz) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <Link href="/courses" className="text-primary hover:underline mt-4 block">
            ← Back to courses
          </Link>
        </div>
      </MainLayout>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const { message, icon: Icon, color } = getScoreMessage(score)
    const correctCount = questions.filter((q, i) => answers[i] === q.correct_answer).length

    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon className={`w-10 h-10 ${color}`} />
              </div>
              <CardTitle className="text-3xl">{message}</CardTitle>
              <p className="text-muted-foreground">Quiz Complete!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <p className="text-muted-foreground">
                  {correctCount} out of {questions.length} questions correct
                </p>
              </div>

              <Progress value={score} className="h-3" />

              {/* Review Answers */}
              <div className="space-y-4 mt-6">
                <h3 className="font-semibold">Review Answers</h3>
                {questions.map((q, i) => {
                  const userAnswer = answers[i]
                  const isCorrect = userAnswer === q.correct_answer
                  return (
                    <Card key={q.id} className={isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm mt-1">
                              Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{q.options[userAnswer] || 'Not answered'}</span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-700 mt-1">
                                Correct: {q.options[q.correct_answer]}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mt-2 italic">{q.explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex gap-4">
                <Link href={`/courses/${quiz.chapter?.id || ''}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Course
                  </Button>
                </Link>
                <Button onClick={() => {
                  setShowResults(false)
                  setCurrentQuestion(0)
                  setAnswers({})
                }} className="flex-1">
                  Retake Quiz
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  const q = questions[currentQuestion]
  const answeredCount = Object.keys(answers).length

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href={`/courses/${quiz.chapter?.id || ''}`} className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Course
            </Link>
            <h1 className="text-xl font-bold mt-1">{quiz.title}</h1>
          </div>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {quiz.time_estimate_minutes} min
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{answeredCount} answered</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  answers[currentQuestion] === i
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {option}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={answers[currentQuestion] === undefined}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={() => setShowResults(true)}
              disabled={answeredCount < questions.length}
            >
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Question Dots */}
        <div className="flex justify-center gap-2 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentQuestion === i
                  ? 'bg-primary text-primary-foreground'
                  : answers[i] !== undefined
                  ? 'bg-green-100 text-green-700'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
