import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — EduPredict.ai" },
      { name: "description", content: "Configure theme, AI behaviour, notifications, privacy and data export." },
      { property: "og:title", content: "Settings — EduPredict.ai" },
      { property: "og:description", content: "Configure your EduPredict.ai workspace." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const rows = [
    { id: "explain", label: "Always generate explanations", desc: "Attach SHAP/LIME output to every prediction." },
    { id: "notify", label: "At-risk notifications", desc: "Email alerts when a student drops a band." },
    { id: "privacy", label: "Anonymize exports", desc: "Strip names from CSV and PDF exports." },
  ];

  return (
    <div className="grid max-w-2xl gap-5">
      <div className="surface-card p-6">
        <h1 className="text-lg font-semibold">Settings</h1>
        <div className="mt-6 grid gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Label>Dark mode</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>
          <Separator />
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label htmlFor={r.id}>{r.label}</Label>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
              <Switch id={r.id} defaultChecked />
            </div>
          ))}
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Export queued")}>
              Export my data
            </Button>
            <Button variant="ghost">About EduPredict.ai v1.0.0</Button>
          </div>
        </div>
      </div>
    </div>
  );
}