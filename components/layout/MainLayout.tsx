'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen,
  Home,
  Target,
  Trophy,
  Menu,
  X,
  GraduationCap,
  Brain,
} from 'lucide-react'
import { useState } from 'react'
import { useLearningStore } from '@/lib/store'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Quizzes', href: '/quiz', icon: Brain },
  { name: 'My Goals', href: '/goals', icon: Target },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
]

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { todayMinutes, dailyGoalMinutes, streakDays, completedLessons } = useLearningStore()

  const progressPercent = Math.min((todayMinutes / dailyGoalMinutes) * 100, 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Learning Hub</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Progress Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today's Progress</span>
              <span className="font-medium">{todayMinutes}/{dailyGoalMinutes} min</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">🔥 Streak</span>
              <span className="font-medium">{streakDays} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">✓ Completed</span>
              <span className="font-medium">{completedLessons.length} lessons</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn('transition-all duration-200', sidebarOpen ? 'lg:pl-64' : 'lg:pl-0')}>
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">Learning Hub</span>
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
