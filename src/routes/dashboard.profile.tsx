import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Profile — EduPredict.ai" },
      { name: "description", content: "Manage your EduPredict.ai profile, password and notifications." },
      { property: "og:title", content: "Profile — EduPredict.ai" },
      { property: "og:description", content: "Manage your account profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateProfile, resetPassword } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return toast.error("Name cannot be empty");
    if (password || confirm) {
      if (password.length < 6) return toast.error("Password must be at least 6 characters");
      if (password !== confirm) return toast.error("Passwords do not match");
    }
    setSaving(true);
    try {
      updateProfile({ name: trimmed });
      if (password && user) await resetPassword(user.email, password);
      setPassword("");
      setConfirm("");
      toast.success(password ? "Profile and password updated" : "Profile updated");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid max-w-2xl gap-5">
      <div className="surface-card p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user?.name}</p>
            <p className="text-sm capitalize text-muted-foreground">
              {user?.role} · {user?.email}
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSave}>
          <div className="grid gap-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mail">Email</Label>
            <Input id="mail" type="email" value={user?.email ?? ""} readOnly disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw">New password</Label>
            <Input
              id="pw"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw2">Confirm password</Label>
            <Input
              id="pw2"
              type="password"
              placeholder="••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={saving} className="sm:col-span-2 sm:w-fit">
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}