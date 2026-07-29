import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — EduPredict.ai" },
      { name: "description", content: "Reset your EduPredict.ai password and regain access to your workspace." },
      { property: "og:title", content: "Reset password — EduPredict.ai" },
      { property: "og:description", content: "Request a password reset link for EduPredict.ai." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; confirm: string }>();

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Confirm your email and choose a new password."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {done ? (
        <div className="surface-card flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="size-10 animate-in zoom-in text-accent" />
          <p className="mt-4 font-medium">Password updated</p>
          <p className="mt-2 text-sm text-muted-foreground">
            You can now sign in with your new password.
          </p>
          <Button className="mt-5" onClick={() => navigate({ to: "/login" })}>
            Go to sign in
          </Button>
        </div>
      ) : (
        <form
          className="surface-card grid gap-4 p-5 sm:p-6"
          onSubmit={handleSubmit(async (v) => {
            try {
              await resetPassword(v.email, v.password);
              setDone(true);
              toast.success("Password updated");
            } catch (e) {
              toast.error((e as Error).message);
            }
          })}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@school.edu"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm new password</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              {...register("confirm", {
                validate: (v) => v === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <KeyRound className="mr-2 size-4" />
            )}
            Update password
          </Button>
        </form>
      )}
    </AuthShell>
  );
}