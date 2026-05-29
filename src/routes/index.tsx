import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { currentUser } = useStore();
  return <Navigate to={currentUser ? "/dashboard" : "/login"} />;
}
