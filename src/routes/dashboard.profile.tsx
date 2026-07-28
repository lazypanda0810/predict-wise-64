import { createFileRoute } from "@tanstack/react-router";
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
  const { user } = useAuth();
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
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input id="fullname" defaultValue={user?.name} maxLength={80} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mail">Email</Label>
            <Input id="mail" type="email" defaultValue={user?.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw">New password</Label>
            <Input id="pw" type="password" placeholder="••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw2">Confirm password</Label>
            <Input id="pw2" type="password" placeholder="••••••" />
          </div>
          <Button type="submit" className="sm:col-span-2 sm:w-fit">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  );
}