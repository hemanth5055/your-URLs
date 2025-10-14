"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "./_context/user.context";
import { Loader } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(UserContext)!;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [loading, user, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 animate-spin">
        <Loader></Loader>
      </div>
    );
  if (!user) return null;

  return <>{children}</>;
};
