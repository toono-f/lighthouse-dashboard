import { DashboardHeader } from '@/components/dashboard/header'
import { MetricsChart } from '@/components/dashboard/metrics-chart'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <DashboardHeader />
      <div className="mt-8">
        <MetricsChart data={[]} />
      </div>
    </main>
  )
}
