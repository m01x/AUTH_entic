import { createFileRoute } from "@tanstack/react-router";
import { DashboardUserForm } from "@/components/dashboard/DashboardUserForm";

export const Route = createFileRoute("/dashboard/users")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <DashboardUserForm />
  );
}
