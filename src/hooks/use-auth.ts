import { useSession } from "next-auth/react";
// import type { AuthSession } from "@/db/schema/auth";

interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function useAuth() {
  const { data: session, status, update } = useSession();
  
  return {
    session: session as AuthSession | null,
    status,
    update,
    isAuthenticated: !!session,
    isLoading: status === "loading",
  };
} 