/**
 * LAYOUT DE DASHBOARD
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex min-h-screen relative"
      style={{
        backgroundImage: `url('/login-background3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <Sidebar />
      <main className="flex-1 ml-[calc(15rem+1.5rem)] p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
