import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RECOMMENDATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/recommendations")({
  head: () => ({
    meta: [
      { title: "Recommendations — EduPredict.ai" },
      {
        name: "description",
        content: "Prioritized personalized recommendations with 7-day, 30-day and semester timelines.",
      },
      { property: "og:title", content: "Recommendations — EduPredict.ai" },
      { property: "og:description", content: "Personalized action plans for every student." },
    ],
  }),
  component: RecommendationsPage,
});

const priorityTone: Record<string, string> = {
  High: "border-destructive/30 bg-destructive/12 text-destructive",
  Medium: "border-warning/30 bg-warning/15 text-warning",
  Low: "border-primary/30 bg-primary/12 text-primary",
};

function RecommendationsPage() {
  const [filter, setFilter] = useState("All");
  const [done, setDone] = useState<string[]>([]);
  const list = RECOMMENDATIONS.filter((r) => filter === "All" || r.timeline === filter);

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold">Personalized recommendations</h1>
          <p className="text-sm text-muted-foreground">Ranked by predicted impact on final marks</p>
        </div>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {["All", "7 Days", "30 Days", "Semester"].map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((r, i) => {
          const complete = done.includes(r.title);
          return (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface-card flex h-full flex-col p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className={priorityTone[r.priority]}>
                  {r.priority} priority
                </Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" /> {r.timeline}
                </span>
              </div>
              <h2 className="mt-4 flex items-start gap-2 font-semibold">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" />
                {r.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.detail}</p>
              <Button
                variant={complete ? "secondary" : "outline"}
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  setDone((d) => (complete ? d.filter((x) => x !== r.title) : [...d, r.title]))
                }
              >
                {complete && <CheckCircle2 className="mr-2 size-4 text-accent" />}
                {complete ? "Completed" : "Mark as done"}
              </Button>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}