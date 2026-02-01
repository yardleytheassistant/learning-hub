import { MainLayout } from '@/components/layout/MainLayout'
import { Target } from 'lucide-react'

export default function GoalsPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">My Goals</h1>
        </div>
        
        <div className="bg-card rounded-lg border p-6 text-center py-12">
          <p className="text-muted-foreground mb-4">Set your daily learning goals</p>
          <p className="text-sm text-muted-foreground">
            Goal setting feature coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
