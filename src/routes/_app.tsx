import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useStore } from "@/lib/store";
import { ROLE_LABELS } from "@/lib/mock-data";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const { currentUser } = useStore();
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground hidden sm:inline">Telurku Management System</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden sm:inline text-muted-foreground">{ROLE_LABELS[currentUser.role]}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
