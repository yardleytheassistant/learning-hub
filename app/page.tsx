import { redirect } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Target, Trophy, ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  // For MVP, redirect to dashboard
  // Later we can add a landing page with auth
  redirect('/dashboard')

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Learning Hub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your personal AI-powered learning companion. Master new skills, track your progress, and achieve your learning goals.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/goals">Set Daily Goal</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Course Library</CardTitle>
              <CardDescription>
                Access a curated collection of courses with AI-generated quizzes from your materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Learning Goals</CardTitle>
              <CardDescription>
                Set daily and weekly targets. Track your streak and stay consistent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/goals">Manage Goals</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Earn badges and celebrate your learning milestones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/achievements">View Achievements</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
