import { Link } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-card/50 p-10 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <Link to="/" className="relative flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <BrainCircuit className="size-5" />
          </span>
          <span className="font-semibold">EduPredict.ai</span>
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Predict, explain and improve academic outcomes.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Every prediction ships with the reasons behind it and a personalized action plan your
            students can follow.
          </p>
        </div>
        <p className="relative text-xs text-muted-foreground">Version 1.0.0</p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground lg:invisible">
            ← Back home
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}