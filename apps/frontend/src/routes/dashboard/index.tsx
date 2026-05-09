import { LayoutDashboard } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PostsTable } from "@/components/dashboard/PostsTable";
import { PostForm } from "@/components/dashboard/PostForm";
import { mockPosts } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="glass-card w-full rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20">
            <LayoutDashboard className="size-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Bienvenido al Dashboard
            </h2>
            <p className="mt-0.5 text-sm text-white/60">
              Gestiona tu contenido y usuarios desde aquí
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70">
          Este es tu centro de control. Desde aquí puedes ver los últimos
          posts, crear nuevo contenido y administrar usuarios.
        </p>
      </div>

      <PostsTable posts={mockPosts} />

      <PostForm />
    </div>
  );
}
