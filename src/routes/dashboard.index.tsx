import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, GraduationCap, Target, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DEPARTMENT_STATS,
  DISTRIBUTION,
  KPIS,
  RADAR_PROFILE,
  RECENT_PREDICTIONS,
  TREND,
  bandColor,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduPredict.ai" },
      { name: "description", content: "Live KPIs, prediction history and cohort performance trends." },
      { property: "og:title", content: "Dashboard — EduPredict.ai" },
      { property: "og:description", content: "Live KPIs and cohort performance trends." },
    ],
  }),
  component: DashboardHome,
});

const COLORS = ["var(--chart-2)", "var(--chart-1)", "var(--chart-4)", "var(--chart-5)"];

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

function DashboardHome() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={KPIS.totalStudents} icon={GraduationCap} trend="+8 this term" index={0} />
        <StatCard label="Average Marks" value={KPIS.averageMarks} icon={TrendingUp} tone="accent" trend="+3.4 vs last term" index={1} />
        <StatCard label="Prediction Accuracy" value={KPIS.accuracy} decimals={1} suffix="%" icon={Target} index={2} />
        <StatCard label="At-Risk Students" value={KPIS.atRisk} icon={AlertTriangle} tone="destructive" trend="Needs intervention" index={3} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <h2 className="font-semibold">Performance trends</h2>
          <p className="text-sm text-muted-foreground">Predicted vs actual average marks</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="predicted" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="actual" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-semibold">Prediction distribution</h2>
          <p className="text-sm text-muted-foreground">Cohort split by band</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {DISTRIBUTION.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-semibold">Department comparison</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_STATS}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="department" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="average" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-semibold">Learner profile</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_PROFILE}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="value" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.35} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-semibold">Attendance trend</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="attendance" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold">Recent predictions</h2>
          <p className="text-sm text-muted-foreground">Latest model runs across the cohort</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Band</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_PREDICTIONS.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.department}</TableCell>
                  <TableCell>{r.attendance}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={bandColor(r.band)}>
                      {r.band}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.risk}%</TableCell>
                  <TableCell>{r.confidence}%</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}