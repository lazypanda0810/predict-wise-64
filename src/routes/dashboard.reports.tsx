import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RECENT_PREDICTIONS, bandColor } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EduPredict.ai" },
      { name: "description", content: "Generate, export and print academic prediction reports." },
      { property: "og:title", content: "Reports — EduPredict.ai" },
      { property: "og:description", content: "Export prediction history and cohort reports." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold">Reports</h1>
          <p className="text-sm text-muted-foreground">Prediction history and exportable summaries</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 size-4" /> Print
          </Button>
        </div>
      </div>

      <ol className="grid gap-3">
        {RECENT_PREDICTIONS.map((r) => (
          <li key={r.id} className="surface-card flex items-center gap-4 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.name} · prediction report</p>
              <p className="text-xs text-muted-foreground">
                {r.date} · confidence {r.confidence}% · risk {r.risk}%
              </p>
            </div>
            <Badge variant="outline" className={bandColor(r.band)}>
              {r.band}
            </Badge>
          </li>
        ))}
      </ol>
    </div>
  );
}