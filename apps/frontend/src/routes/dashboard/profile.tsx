import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <ComingSoon
      title="Mi Perfil"
      description="La edición de perfil estará disponible pronto."
    />
  );
}
