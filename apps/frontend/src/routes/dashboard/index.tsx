import { DashboardComponent } from '@/components/dashboard/DashboardComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardComponent,
})


