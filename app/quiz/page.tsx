'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, CheckCircle, Clock, ChevronRight, Brain } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

interface Quiz {
  id: string
  chapter: string
  title: string
  questions: QuizQuestion[]
}

export default function QuizLibraryPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/quizzes/index.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setQuizzes(data)
        }
      })
      .catch(err => console.error('Error loading quizzes:', err))
      .finally(() => setLoading(false))
  }, [])

  const completedCount = 0
  const totalTime = quizzes.reduce((acc, q) => acc + Math.ceil(q.questions.length * 1), 0)

  const getDifficultyColor = (quizId: string) => {
    const num = parseInt(quizId.replace('ch', ''))
    if (num <= 3) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    if (num <= 7) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  const getDifficulty = (quizId: string) => {
    const num = parseInt(quizId.replace('ch', ''))
    if (num <= 3) return 'beginner'
    if (num <= 7) return 'intermediate'
    return 'advanced'
  }

  const filteredQuizzes = quizzes.filter(q => {
    if (filter === 'incomplete') return true
    if (filter === 'completed') return false
    return true
  })

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto text-primary animate-pulse mb-4" />
            <p className="text-muted-foreground">Loading quizzes...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Quiz Generator
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Test your knowledge with quizzes from your course materials.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Available</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{quizzes.length}</div>
              <p className="text-xs text-muted-foreground">quizzes ready</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Questions</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {quizzes.reduce((acc, q) => acc + q.questions.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{totalTime} min</div>
              <p className="text-xs text-muted-foreground">estimated time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">quizzes finished</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
            All Quizzes ({quizzes.length})
          </Button>
          <Button variant={filter === 'completed' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('completed')}>
            Completed ({completedCount})
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredQuizzes.map((quiz) => {
            const difficulty = getDifficulty(quiz.id)
            return (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(quiz.id)}>{difficulty}</Badge>
                    <Badge variant="outline">{quiz.questions.length} questions</Badge>
                  </div>
                  <CardTitle className="text-lg">{quiz.chapter}</CardTitle>
                  <CardDescription>{quiz.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{Math.ceil(quiz.questions.length * 1)} min</span>
                    </div>
                    <Button asChild size="sm" variant="default">
                      <Link href={`/quiz/${quiz.id}`}>
                        Start Quiz
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No quizzes available yet</h3>
            <p className="text-muted-foreground">Quizzes will appear here once generated.</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
