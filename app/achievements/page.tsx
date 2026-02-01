import { MainLayout } from '@/components/layout/MainLayout'
import { Trophy } from 'lucide-react'

export default function AchievementsPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Achievements</h1>
        </div>
        
        <div className="bg-card rounded-lg border p-6 text-center py-12">
          <p className="text-muted-foreground mb-4">Track your learning achievements</p>
          <p className="text-sm text-muted-foreground">
            Achievements feature coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
