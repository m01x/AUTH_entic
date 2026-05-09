import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/dashboard/users")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <ComingSoon
      title="Mantenedor de Usuarios"
      description="La gestión de usuarios estará disponible pronto."
    />
  );
}
