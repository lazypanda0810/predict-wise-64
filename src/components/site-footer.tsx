import { Link } from "@tanstack/react-router";
import { BrainCircuit, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <BrainCircuit className="size-4" />
            </span>
            <span className="font-semibold">EduPredict.ai</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Student academic performance prediction with explainable AI and personalized
            recommendations for teachers, students and institutions.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Product</p>
          <ul className="mt-3 grid gap-2 text-muted-foreground">
            <li>
              <Link to="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/prediction" className="hover:text-foreground">
                Prediction
              </Link>
            </li>
            <li>
              <Link to="/dashboard/explainable-ai" className="hover:text-foreground">
                Explainable AI
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium">Resources</p>
          <ul className="mt-3 grid gap-2 text-muted-foreground">
            <li>
              <a href="https://github.com" className="inline-flex items-center gap-2 hover:text-foreground">
                <Github className="size-4" /> GitHub
              </a>
            </li>
            <li>Documentation</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © 2026 EduPredict.ai · Version 1.0.0
      </div>
    </footer>
  );
}