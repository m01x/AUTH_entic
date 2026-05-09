/**
 * LAYOUT DE DASHBOARD
 */

import { createFileRoute } from "@tanstack/react-router";
import { DashboardComponent } from "@/components/dashboard/DashboardComponent";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});
