import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — EduPredict.ai" },
      { name: "description", content: "Sign in to EduPredict.ai to run predictions and view explainable AI insights." },
      { property: "og:title", content: "Sign in — EduPredict.ai" },
      { property: "og:description", content: "Sign in to run student performance predictions." },
    ],
  }),
  component: LoginPage,
});

interface FormValues {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { login, loginDemo, loginAsGuest } = useAuth();
  const [pending, setPending] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.name}`);
      navigate({ to: "/dashboard" });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const quick = (fn: () => void, key: string, message: string) => {
    setPending(key);
    setTimeout(() => {
      fn();
      toast.success(message);
      navigate({ to: "/dashboard" });
    }, 500);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your prediction workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@demo.com"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <LogIn className="mr-2 size-4" />}
          Sign in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid gap-3">
        <Button
          variant="outline"
          className="w-full"
          disabled={pending === "google"}
          onClick={() => quick(() => loginDemo("student"), "google", "Signed in with Google")}
        >
          {pending === "google" ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </Button>
        <div className="grid grid-cols-3 gap-2">
          {(["student", "teacher", "admin"] as Exclude<Role, "guest">[]).map((r) => (
            <Button
              key={r}
              variant="secondary"
              size="sm"
              disabled={pending === r}
              onClick={() => quick(() => loginDemo(r), r, `Demo ${r} session started`)}
            >
              {pending === r ? <Loader2 className="size-4 animate-spin" /> : `Demo ${r}`}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full"
          disabled={pending === "guest"}
          onClick={() => quick(loginAsGuest, "guest", "Exploring as guest — records cannot be saved")}
        >
          {pending === "guest" && <Loader2 className="mr-2 size-4 animate-spin" />}
          Continue as guest
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Demo credentials</p>
        <p className="mt-2">student@demo.com · teacher@demo.com · admin@demo.com</p>
        <p>Password for all: 123456</p>
      </div>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 size-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.7 0-.7-.1-1.2-.2-1.7z" />
    </svg>
  );
}