'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Search, Filter, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock data for MVP
const courses = [
  {
    id: '1',
    title: 'IS 601 - Information Systems',
    description: 'Covers foundational concepts in information systems, databases, and business technology.',
    category: 'MBA',
    difficulty: 'beginner' as const,
    lessonsCount: 20,
    completedLessons: 13,
    thumbnail: null,
  },
  {
    id: '2',
    title: 'MKTG 500 - Marketing Fundamentals',
    description: 'Introduction to marketing strategies, consumer behavior, and market research.',
    category: 'MBA',
    difficulty: 'intermediate' as const,
    lessonsCount: 15,
    completedLessons: 4,
    thumbnail: null,
  },
  {
    id: '3',
    title: 'HRM 652 - Human Resource Management',
    description: 'Strategic HR management, talent acquisition, and organizational development.',
    category: 'MBA',
    difficulty: 'advanced' as const,
    lessonsCount: 18,
    completedLessons: 2,
    thumbnail: null,
  },
  {
    id: '4',
    title: 'AI & Machine Learning Basics',
    description: 'Understanding artificial intelligence and machine learning fundamentals.',
    category: 'Technology',
    difficulty: 'beginner' as const,
    lessonsCount: 12,
    completedLessons: 0,
    thumbnail: null,
  },
  {
    id: '5',
    title: 'Data Analytics with Python',
    description: 'Learn data analysis, visualization, and statistical methods using Python.',
    category: 'Technology',
    difficulty: 'intermediate' as const,
    lessonsCount: 25,
    completedLessons: 0,
    thumbnail: null,
  },
  {
    id: '6',
    title: 'Leadership & Management',
    description: 'Essential leadership skills for managing teams and organizations effectively.',
    category: 'Business',
    difficulty: 'intermediate' as const,
    lessonsCount: 16,
    completedLessons: 0,
    thumbnail: null,
  },
]

const categories = ['All', 'MBA', 'Technology', 'Business']
const difficulties = ['All', 'beginner', 'intermediate', 'advanced']

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Course Library</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Browse and enroll in courses to advance your learning journey.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/courses/new">Add Course</Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-sm h-10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All' : cat}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-sm h-10"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>{diff === 'All' ? 'All Levels' : diff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const progressPercent = Math.round((course.completedLessons / course.lessonsCount) * 100)
            const isEnrolled = course.completedLessons > 0

            return (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow p-3 md:p-6">
                <CardHeader className="p-0 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{course.category}</Badge>
                    <Badge className={`text-xs ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base md:text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-auto pt-3">
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
                    <span>{course.lessonsCount} lessons</span>
                    {isEnrolled && <span>{progressPercent}%</span>}
                  </div>
                  {isEnrolled && <Progress value={progressPercent} className="h-1.5 mb-3" />}
                  <Button className="w-full text-sm" variant={isEnrolled ? 'default' : 'outline'} size="sm" asChild>
                    <Link href={`/courses/${course.id}`}>
                      {isEnrolled ? 'Continue' : 'Enroll'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
