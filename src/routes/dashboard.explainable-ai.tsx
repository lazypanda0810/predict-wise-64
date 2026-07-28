import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Info } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FEATURE_IMPORTANCE } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/explainable-ai")({
  head: () => ({
    meta: [
      { title: "Explainable AI — EduPredict.ai" },
      {
        name: "description",
        content: "See feature importance, SHAP and LIME style explanations behind each prediction.",
      },
      { property: "og:title", content: "Explainable AI — EduPredict.ai" },
      { property: "og:description", content: "Understand what influenced each student prediction." },
    ],
  }),
  component: ExplainablePage,
});

const REASONS = [
  { text: "Attendance influenced the prediction by", value: 30, positive: true },
  { text: "Study hours contributed", value: 25, positive: true },
  { text: "Assignments contributed", value: 18, positive: true },
  { text: "Stress affected performance negatively by", value: 9, positive: false },
];

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

function ExplainablePage() {
  return (
    <div className="grid gap-5">
      <div className="surface-card p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <BrainCircuit className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">What influenced this prediction?</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              The model predicted <span className="font-medium text-foreground">Average (66%)</span>{" "}
              for Aarav Sharma. Attendance and study hours pushed the score up, while high stress and
              short sleep pulled it down.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="surface-card p-5">
          <h2 className="font-semibold">Feature importance</h2>
          <p className="text-sm text-muted-foreground">Contribution to the final prediction</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCE} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis
                  dataKey="feature"
                  type="category"
                  width={110}
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="impact" radius={[0, 6, 6, 0]}>
                  {FEATURE_IMPORTANCE.map((f, i) => (
                    <Cell key={i} fill={f.impact >= 0 ? "var(--chart-1)" : "var(--chart-5)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid content-start gap-5">
          <div className="surface-card p-5">
            <h2 className="font-semibold">Reasons</h2>
            <ul className="mt-4 grid gap-4">
              {REASONS.map((r) => (
                <li key={r.text}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">{r.text}</span>
                    <Badge
                      variant="outline"
                      className={
                        r.positive
                          ? "border-accent/30 bg-accent/12 text-accent"
                          : "border-destructive/30 bg-destructive/12 text-destructive"
                      }
                    >
                      {r.positive ? "+" : "−"}
                      {r.value}%
                    </Badge>
                  </div>
                  <Progress value={r.value * 3} className="mt-2 h-1.5" />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {["SHAP Visualization", "LIME Visualization"].map((t) => (
              <div key={t} className="surface-card grid place-items-center gap-2 p-8 text-center">
                <Info className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium">{t}</p>
                <p className="text-xs text-muted-foreground">
                  Placeholder — rendered from the model service in production.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}