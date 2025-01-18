import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsChart } from "@/components/dashboard/metrics-chart";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <DashboardHeader />
      <div className="mt-8">
        <MetricsChart
          data={[
            { date: "2024-01-01", value: 10 },
            { date: "2024-01-02", value: 20 },
            { date: "2024-01-03", value: 30 },
          ]}
        />
      </div>
    </main>
  );
}
