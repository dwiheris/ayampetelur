import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/master-control")({ component: MasterControlRedirect });

function MasterControlRedirect() {
  return <Navigate to="/owner/master-control" replace />;
}
