import StatCard from "@/components/dashboard/stat-card";
import { ShieldAlert, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";
import LogVolumeChart from "@/components/dashboard/log-volume-chart";
import RecentIncidentsTable from "@/components/dashboard/recent-incidents-table";
import SeverityDistributionChart from "@/components/dashboard/severity-distribution-chart";


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Events (24h)" value="1.2M" icon={BarChart3} change="+20.1%" changeType="increase" />
        <StatCard title="Active Incidents" value="3" icon={ShieldAlert} change="+1" changeType="increase" />
        <StatCard title="Anomalies Detected" value="234" icon={AlertTriangle} change="-5.2%" changeType="decrease" />
        <StatCard title="Systems Healthy" value="99.8%" icon={CheckCircle} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <LogVolumeChart />
        </div>
        <div>
            <SeverityDistributionChart />
        </div>
      </div>
      <div>
        <RecentIncidentsTable />
      </div>
    </div>
  );
}
