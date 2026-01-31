import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate that we have the required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (auto-generated from Supabase schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          learning_preferences: Record<string, unknown> | null
          streak_days: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'streak_days'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url: string | null
          author_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          order_index: number
          description: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['modules']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['modules']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          content: string | null
          video_url: string | null
          duration_min: number
          order_index: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed_at: string
          time_spent_seconds: number
        }
        Insert: Omit<Database['public']['Tables']['progress']['Row'], 'id' | 'completed_at'>
        Update: Partial<Database['public']['Tables']['progress']['Insert']>
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          title: string
          questions: QuizQuestion[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['quizzes']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['quizzes']['Insert']>
      }
      goals: {
        Row: {
          id: string
          user_id: string
          type: 'daily' | 'weekly'
          target: number
          deadline: string | null
          completed: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'created_at' | 'completed'>
        Update: Partial<Database['public']['Tables']['goals']['Insert']>
      }
    }
  }
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
}
