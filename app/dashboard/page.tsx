'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Flame, TrendingUp, ArrowRight, Target } from 'lucide-react'
import { useLearningStore } from '@/lib/store'
import Link from 'next/link'

export default function DashboardPage() {
  const { streakDays, todayMinutes, dailyGoalMinutes, completedLessons } = useLearningStore()

  const progressPercent = Math.min((todayMinutes / dailyGoalMinutes) * 100, 100)
  const remainingMinutes = Math.max(dailyGoalMinutes - todayMinutes, 0)

  // Mock data for MVP
  const recentCourses = [
    { id: '1', title: 'IS 601 - Information Systems', progress: 65, category: 'MBA' },
    { id: '2', title: 'MKTG 500 - Marketing Fundamentals', progress: 30, category: 'MBA' },
    { id: '3', title: 'HRM 652 - Human Resource Management', progress: 15, category: 'MBA' },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and continue where you left off.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayMinutes} min</div>
              <p className="text-xs text-muted-foreground">
                {remainingMinutes} min remaining to reach your goal
              </p>
              <Progress value={progressPercent} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                {streakDays > 0 ? 'Keep it up! 🔥' : 'Start your streak today'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons.length}</div>
              <p className="text-xs text-muted-foreground">
                Total lessons completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                On track for this week
              </p>
              <Progress value={75} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Continue Learning</h2>
          <Button variant="ghost" asChild>
            <Link href="/courses">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentCourses.map((course) => (
            <Card key={course.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{course.category}</span>
                  <span className="text-xs font-medium">{course.progress}%</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="mb-3" />
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>
                    Continue
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Goal Call-to-Action */}
        {remainingMinutes > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Daily Goal: {dailyGoalMinutes} minutes</h3>
                  <p className="text-sm text-muted-foreground">
                    You're {remainingMinutes} minutes away from reaching your goal today!
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/courses">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
