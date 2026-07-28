import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <Skeleton className="h-40 w-full max-w-3xl rounded-2xl" />
      </div>
    );
  }

  const crumb =
    pathname === "/dashboard"
      ? "Overview"
      : pathname.split("/").pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-3 py-2.5 backdrop-blur-xl sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <SidebarTrigger />
              <span className="truncate text-sm font-medium">{crumb}</span>
              {user.role === "guest" && (
                <Badge variant="outline" className="shrink-0 border-warning/40 text-warning">
                  Guest — read only
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium leading-tight">{user.name}</p>
                <p className="text-[11px] capitalize text-muted-foreground">{user.role}</p>
              </div>
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}