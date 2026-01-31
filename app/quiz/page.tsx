import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, CheckCircle, Clock, Trophy, ChevronRight, Brain } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Mock quiz data - will be replaced with real data from API
const mockQuizzes = [
  {
    id: 'ch01',
    chapter: 'Chapter 1',
    title: 'Information Systems Overview',
    questions: 5,
    time: '5 min',
    difficulty: 'beginner',
    completed: false,
    score: null
  },
  {
    id: 'ch02',
    chapter: 'Chapter 2',
    title: 'Data Management & Databases',
    questions: 5,
    time: '5 min',
    difficulty: 'beginner',
    completed: false,
    score: null
  },
  {
    id: 'ch03',
    chapter: 'Chapter 3',
    title: 'Network Fundamentals',
    questions: 5,
    time: '6 min',
    difficulty: 'intermediate',
    completed: false,
    score: null
  },
  {
    id: 'ch04',
    chapter: 'Chapter 4',
    title: 'Enterprise Systems',
    questions: 5,
    time: '6 min',
    difficulty: 'intermediate',
    completed: false,
    score: null
  },
  {
    id: 'ch05',
    chapter: 'Chapter 5',
    title: 'E-Commerce & Digital Business',
    questions: 5,
    time: '5 min',
    difficulty: 'beginner',
    completed: false,
    score: null
  }
]

export default function QuizLibraryPage() {
  const [quizzes, setQuizzes] = useState(mockQuizzes)
  const [filter, setFilter] = useState('all') // all, incomplete, completed

  const filteredQuizzes = quizzes.filter(q => {
    if (filter === 'incomplete') return !q.completed
    if (filter === 'completed') return q.completed
    return true
  })

  const completedCount = quizzes.filter(q => q.completed).length
  const averageScore = quizzes
    .filter(q => q.score !== null)
    .reduce((acc, q) => acc + q.score, 0) / (completedCount || 1)

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Quiz Generator
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Test your knowledge with AI-generated quizzes from your course materials.
            </p>
          </div>
          <Button asChild>
            <Link href="/quiz/generate">
              Generate New Quiz
            </Link>
          </Button>
        </div>

        {/* Stats */}
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
              <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">quizzes finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Avg Score</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {completedCount > 0 ? `${Math.round(averageScore)}%` : '—'}
              </div>
              <p className="text-xs text-muted-foreground">
                {completedCount > 0 ? 'average score' : 'no quizzes yet'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {quizzes.reduce((acc, q) => acc + parseInt(q.time), 0)} min
              </div>
              <p className="text-xs text-muted-foreground">estimated time</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Quizzes
          </Button>
          <Button
            variant={filter === 'incomplete' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('incomplete')}
          >
            To Do ({quizzes.filter(q => !q.completed).length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </Button>
        </div>

        {/* Quiz List */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  {quiz.completed && (
                    <Badge variant="outline" className="bg-green-50">
                      ✓ {quiz.score}%
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{quiz.chapter}</CardTitle>
                <CardDescription>{quiz.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{quiz.questions} questions</span>
                    <span>{quiz.time}</span>
                  </div>
                  <Button asChild size="sm" variant={quiz.completed ? 'outline' : 'default'}>
                    <Link href={`/quiz/${quiz.id}`}>
                      {quiz.completed ? 'Retake' : 'Start Quiz'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No quizzes found</h3>
            <p className="text-muted-foreground">
              {filter === 'completed' 
                ? "You haven't completed any quizzes yet." 
                : "All quizzes completed! Check back for more."}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
