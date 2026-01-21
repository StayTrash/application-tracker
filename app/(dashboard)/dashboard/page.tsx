import { getDashboardMetrics } from "@/actions/dashboard";
import { DashboardMetrics } from "@/components/dashboard/MetricsCards";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

export default async function DashboardPage() {
    const metrics = await getDashboardMetrics();

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your applications.</p>

            <DashboardMetrics
                totalApplications={metrics.totalApplications}
                interviewsScheduled={metrics.interviewsScheduled}
                offersReceived={metrics.offersReceived}
                rejectionRate={metrics.rejectionRate}
            />

            <DashboardCharts
                data={metrics.statusDistribution}
                monthlyApplications={metrics.monthlyApplications}
            />
        </div>
    );
}
