import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bandColor, type PerformanceBand } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/prediction")({
  head: () => ({
    meta: [
      { title: "Student Prediction — EduPredict.ai" },
      { name: "description", content: "Enter a student profile and predict academic performance with confidence scores." },
      { property: "og:title", content: "Student Prediction — EduPredict.ai" },
      { property: "og:description", content: "Predict a student's academic band, risk and confidence." },
    ],
  }),
  component: PredictionPage,
});

interface FormValues {
  name: string;
  age: number;
  gender: string;
  attendance: number;
  studyHours: number;
  assignments: number;
  internal: number;
  previous: number;
  participation: number;
  internet: string;
  familySupport: string;
  extraClasses: string;
  health: string;
  sleep: number;
  stress: string;
  socio: string;
  learningStyle: string;
  midSem: number;
  finalSem?: number;
}

interface Result {
  band: PerformanceBand;
  risk: number;
  probability: number;
  confidence: number;
}

const SELECTS: { name: keyof FormValues; label: string; options: string[] }[] = [
  { name: "gender", label: "Gender", options: ["Male", "Female", "Other"] },
  { name: "internet", label: "Internet Access", options: ["Yes", "No"] },
  { name: "familySupport", label: "Family Support", options: ["High", "Medium", "Low"] },
  { name: "extraClasses", label: "Extra Classes", options: ["Yes", "No"] },
  { name: "health", label: "Health Status", options: ["Excellent", "Good", "Poor"] },
  { name: "stress", label: "Stress Level", options: ["Low", "Moderate", "High"] },
  { name: "socio", label: "Socio Economic Status", options: ["High", "Middle", "Low"] },
  { name: "learningStyle", label: "Learning Style", options: ["Visual", "Auditory", "Reading", "Kinesthetic"] },
];

const NUMBERS: { name: keyof FormValues; label: string; max: number; step?: string }[] = [
  { name: "age", label: "Age", max: 60 },
  { name: "attendance", label: "Attendance %", max: 100 },
  { name: "studyHours", label: "Study Hours / day", max: 16, step: "0.5" },
  { name: "assignments", label: "Assignments Completed %", max: 100 },
  { name: "internal", label: "Internal Marks", max: 100 },
  { name: "previous", label: "Previous Semester Marks", max: 100 },
  { name: "participation", label: "Participation Score", max: 100 },
  { name: "sleep", label: "Sleep Hours", max: 14, step: "0.5" },
  { name: "midSem", label: "Mid Semester Marks", max: 100 },
];

function PredictionPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "Aarav Sharma",
      age: 20,
      gender: "Male",
      attendance: 78,
      studyHours: 3,
      assignments: 72,
      internal: 64,
      previous: 68,
      participation: 60,
      internet: "Yes",
      familySupport: "Medium",
      extraClasses: "No",
      health: "Good",
      sleep: 6,
      stress: "High",
      socio: "Middle",
      learningStyle: "Visual",
      midSem: 66,
    },
  });

  const onSubmit = async (v: FormValues) => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1200));
    const score =
      Number(v.attendance) * 0.3 +
      Number(v.studyHours) * 4 +
      Number(v.assignments) * 0.18 +
      Number(v.internal) * 0.2 +
      Number(v.midSem) * 0.15 -
      (v.stress === "High" ? 9 : v.stress === "Moderate" ? 4 : 0);
    const clamped = Math.max(20, Math.min(98, Math.round(score)));
    const band: PerformanceBand =
      clamped >= 85 ? "Excellent" : clamped >= 70 ? "Good" : clamped >= 55 ? "Average" : "Needs Improvement";
    setResult({
      band,
      risk: 100 - clamped,
      probability: clamped,
      confidence: Math.min(98, 74 + Math.round(clamped / 6)),
    });
    setLoading(false);
    toast.success(
      user?.role === "guest" ? "Prediction ready — guest results are not saved" : "Prediction saved to history",
    );
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-5 sm:p-6">
        <h1 className="text-lg font-semibold">Student prediction</h1>
        <p className="text-sm text-muted-foreground">
          19 academic and wellbeing signals feed the model.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="grid gap-2 sm:col-span-2 xl:col-span-3">
            <Label htmlFor="name">Student Name</Label>
            <Input id="name" {...register("name", { required: "Name is required", maxLength: 80 })} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          {NUMBERS.map((f) => (
            <div key={f.name} className="grid gap-2">
              <Label htmlFor={f.name}>{f.label}</Label>
              <Input
                id={f.name}
                type="number"
                step={f.step ?? "1"}
                {...register(f.name as "age", {
                  required: "Required",
                  min: { value: 0, message: "Must be ≥ 0" },
                  max: { value: f.max, message: `Must be ≤ ${f.max}` },
                  valueAsNumber: true,
                })}
              />
              {errors[f.name] && (
                <p className="text-xs text-destructive">{errors[f.name]?.message as string}</p>
              )}
            </div>
          ))}

          {SELECTS.map((s) => (
            <div key={s.name} className="grid gap-2">
              <Label>{s.label}</Label>
              <Controller
                control={control}
                name={s.name as "gender"}
                render={({ field }) => (
                  <Select value={String(field.value)} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {s.options.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ))}

          <div className="grid gap-2">
            <Label htmlFor="finalSem">Final Semester Marks (optional)</Label>
            <Input id="finalSem" type="number" {...register("finalSem", { valueAsNumber: true })} />
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={loading}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />}
          Predict performance
        </Button>
      </form>

      <div className="grid content-start gap-5">
        {loading && (
          <div className="surface-card grid gap-3 p-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {!loading && !result && (
          <div className="surface-card grid place-items-center gap-2 p-10 text-center">
            <Sparkles className="size-8 text-muted-foreground" />
            <p className="font-medium">No prediction yet</p>
            <p className="text-sm text-muted-foreground">
              Fill the form and run the model to see the band, risk and confidence.
            </p>
          </div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface-card p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Prediction result</h2>
              <Badge variant="outline" className={bandColor(result.band)}>
                {result.band}
              </Badge>
            </div>
            <p className="mt-6 text-5xl font-extrabold tracking-tight gradient-text">
              {result.probability}%
            </p>
            <p className="text-sm text-muted-foreground">Predicted performance probability</p>

            <div className="mt-6 grid gap-4">
              {[
                { label: "Probability", value: result.probability },
                { label: "Confidence", value: result.confidence },
                { label: "Risk score", value: result.risk },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="font-medium">{m.value}%</span>
                  </div>
                  <Progress value={m.value} className="mt-2 h-2" />
                </div>
              ))}
            </div>

            {user?.role === "guest" && (
              <p className="mt-5 rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
                Guest mode: this result is not saved to prediction history.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}