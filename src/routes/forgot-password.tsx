import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  return (
    <AuthShell
      title="Forgot password"
      subtitle="We'll email you a secure reset link."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="surface-card flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="size-10 animate-in zoom-in text-accent" />
          <p className="mt-4 font-medium">Reset link sent</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check your inbox for instructions. The link expires in 30 minutes.
          </p>
        </div>
      ) : (
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async () => {
            await new Promise((r) => setTimeout(r, 700));
            setSent(true);
            toast.success("Reset link sent");
          })}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Mail className="mr-2 size-4" />
            )}
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}