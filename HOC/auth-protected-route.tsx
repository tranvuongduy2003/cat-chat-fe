"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as string;
    if (accessToken) {
      router.replace("/admin");
    }
  }, [router]);

  return <>{children}</>;
};
