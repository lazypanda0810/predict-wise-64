import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  CloudUpload,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  Quote,
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduPredict.ai — Predict Student Performance with Explainable AI" },
      {
        name: "description",
        content:
          "Predict student academic performance, understand every prediction with explainable AI, and act on personalized recommendations.",
      },
      { property: "og:title", content: "Predict Student Performance using Explainable AI" },
      {
        property: "og:description",
        content:
          "Empowering teachers and institutions with intelligent insights for better academic success.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Gauge,
    title: "Prediction Engine",
    text: "Gradient-boosted models score every learner across 19 academic and wellbeing signals.",
  },
  {
    icon: BrainCircuit,
    title: "Explainable AI",
    text: "SHAP and LIME breakdowns show exactly which factors moved each prediction.",
  },
  {
    icon: Lightbulb,
    title: "Recommendations",
    text: "Personalized, prioritized action plans with 7-day, 30-day and semester timelines.",
  },
  {
    icon: BarChart3,
    title: "Performance Dashboard",
    text: "Live KPIs, cohort trends and at-risk alerts in one premium workspace.",
  },
  {
    icon: Users,
    title: "Student Analytics",
    text: "Department, gender, attendance and study-hour distributions at a glance.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Cloud Storage",
    text: "Role-based access for students, teachers and admins with audited prediction logs.",
  },
];

const STEPS = [
  { icon: CloudUpload, title: "Upload Student Data", text: "Import CSV records or enter a single student profile." },
  { icon: Sparkles, title: "AI Predicts Performance", text: "The model returns a band, risk score and confidence." },
  { icon: BrainCircuit, title: "Explainable AI Shows Reasons", text: "Feature contributions explain the outcome." },
  { icon: Lightbulb, title: "Personalized Recommendations", text: "Prioritized actions for measurable improvement." },
];

const TESTIMONIALS = [
  {
    quote:
      "We identified 38 at-risk students six weeks earlier than usual. The explanations made the staff trust the model.",
    name: "Dr. Meera Iyer",
    role: "Head of Computer Science",
  },
  {
    quote:
      "The recommendation timelines turned analytics into an actual weekly routine for our mentors.",
    name: "Rahul Menon",
    role: "Academic Coordinator",
  },
  {
    quote: "Clean, fast and honest about uncertainty. Confidence scores changed how we counsel students.",
    name: "Sana Qureshi",
    role: "Institutional Analyst",
  },
];

const FAQS = [
  {
    q: "What data does the prediction need?",
    a: "Attendance, study hours, assignments, internal and previous semester marks, plus wellbeing signals such as sleep, stress and family support.",
  },
  {
    q: "How is the prediction explained?",
    a: "Every prediction ships with feature importance, SHAP-style contributions and a plain-language summary of what pushed the result up or down.",
  },
  {
    q: "Can I try it without an account?",
    a: "Yes. Guest access unlocks the dashboard, a sample prediction, explainability and recommendations — but records cannot be saved.",
  },
  {
    q: "Which roles are supported?",
    a: "Student, Teacher and Admin, each with a tailored dashboard and permissions.",
  },
];

function Landing() {
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] opacity-70 blur-3xl"
            style={{ background: "var(--gradient-subtle)" }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                <Sparkles className="mr-1 size-3" /> Explainable AI for academic success
              </Badge>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Predict Student Performance using{" "}
                <span className="gradient-text">Explainable AI</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Empowering teachers and institutions with intelligent insights for better academic
                success.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    loginAsGuest();
                    navigate({ to: "/dashboard" });
                  }}
                >
                  Try Demo <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {[
                  ["94.2%", "Model accuracy"],
                  ["19", "Signals analysed"],
                  ["6 wks", "Earlier risk alerts"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-2xl font-semibold tracking-tight">{v}</dt>
                    <dd className="text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={heroImage}
                width={1280}
                height={896}
                alt="EduPredict analytics dashboard preview with charts and student insights"
                className="w-full rounded-2xl border border-border"
                style={{ boxShadow: "var(--shadow-glow)" }}
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Everything the institution needs</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A complete pipeline from raw academic records to interventions that actually change
              outcomes.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="surface-card h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            </Reveal>
            <ol className="mt-10 grid gap-5 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <li className="surface-card h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg bg-accent/12 text-accent">
                        <s.icon className="size-4" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Trusted by academic teams</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="surface-card h-full p-6">
                  <Quote className="size-5 text-primary" />
                  <blockquote className="mt-4 text-sm leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-6">
              {FAQS.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
