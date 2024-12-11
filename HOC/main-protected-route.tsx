"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const MainProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;
    if (!accessToken) {
      router.replace("/auth");
    }
  }, [router]);

  return <>{children}</>;
};
