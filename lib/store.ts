import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
}

interface Course {
  id: string
  title: string
  description: string | null
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  thumbnail_url: string | null
}

interface LearningState {
  // User
  user: User | null
  setUser: (user: User | null) => void

  // Courses
  courses: Course[]
  setCourses: (courses: Course[]) => void
  addCourse: (course: Course) => void

  // Progress
  completedLessons: string[]
  markLessonComplete: (lessonId: string) => void
  streakDays: number
  incrementStreak: () => void

  // Goals
  dailyGoalMinutes: number
  setDailyGoalMinutes: (minutes: number) => void
  todayMinutes: number
  addStudyMinutes: (minutes: number) => void

  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Courses
      courses: [],
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),

      // Progress
      completedLessons: [],
      markLessonComplete: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      streakDays: 0,
      incrementStreak: () => set((state) => ({ streakDays: state.streakDays + 1 })),

      // Goals
      dailyGoalMinutes: 30,
      setDailyGoalMinutes: (minutes) => set({ dailyGoalMinutes: minutes }),
      todayMinutes: 0,
      addStudyMinutes: (minutes) =>
        set((state) => ({ todayMinutes: state.todayMinutes + minutes })),

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'learning-hub-storage',
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        streakDays: state.streakDays,
        dailyGoalMinutes: state.dailyGoalMinutes,
        todayMinutes: state.todayMinutes,
      }),
    }
  )
)
