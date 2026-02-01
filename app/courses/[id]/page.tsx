'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, BookOpen, CheckCircle, Circle, Play, FileText } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

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
  params: Promise<{ id: string }>
}

export default function CourseDetailPage({ params }: PageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params
      const courseId = resolvedParams.id
      
      // Fetch course details
      const courseRes = await fetch(
        `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/courses?id=eq.${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          }
        }
      )
      const courses = await courseRes.json()
      if (courses.length > 0) {
        setCourse(courses[0])
      }

      // Fetch chapters with quiz info
      const chaptersRes = await fetch(
        `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/chapters?course_id=eq.${courseId}&order=chapter_number.asc`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          }
        }
      )
      const chaptersData = await chaptersRes.json()
      
      // Fetch quizzes for each chapter
      const chaptersWithQuizzes = await Promise.all(
        chaptersData.map(async (ch: any) => {
          const quizRes = await fetch(
            `https://gjpyxskuqluokzrxqkby.supabase.co/rest/v1/quizzes?chapter_id=eq.${ch.id}`,
            {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              }
            }
          )
          const quizzes = await quizRes.json()
          return {
            ...ch,
            quiz: quizzes.length > 0 ? quizzes[0] : null
          }
        })
      )
      
      setChapters(chaptersWithQuizzes)
      setLoading(false)
    }
    fetchData()
  }, [params])

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    )
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link href="/courses" className="text-primary hover:underline mt-4 block">
            ← Back to courses
          </Link>
        </div>
      </MainLayout>
    )
  }

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-white/20 text-white">{course.category}</Badge>
            <Badge className={difficultyColor[course.difficulty]}>{course.difficulty}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-blue-100">{course.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span>{chapters.length} Chapters</span>
            <span>•</span>
            <span>{chapters.filter(ch => ch.quiz).length} Quizzes</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Course Content</h2>
          {chapters.map((chapter, index) => (
            <Card key={chapter.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {chapter.chapter_number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{chapter.title}</h3>
                      <p className="text-muted-foreground text-sm">{chapter.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {chapter.pdf_path && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FileText className="w-3 h-3" /> PDF Included
                          </span>
                        )}
                        {chapter.quiz && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <BookOpen className="w-3 h-3" /> {chapter.quiz.questions_count} questions • {chapter.quiz.time_estimate_minutes} min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {chapter.pdf_path && (
                      <Link href={`/courses/${course.id}/lessons/${chapter.id}`}>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      </Link>
                    )}
                    {chapter.quiz && (
                      <Link href={`/courses/${course.id}/quiz/${chapter.quiz.id}`}>
                        <Button variant="default" size="sm">
                          Take Quiz
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back */}
        <Link href="/courses" className="inline-flex items-center text-muted-foreground hover:text-primary">
          ← Back to all courses
        </Link>
      </div>
    </MainLayout>
  )
}
