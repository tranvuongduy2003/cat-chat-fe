"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function BackButton({ className = "", children }: BackButtonProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Navigates to the main/home page
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoBack}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {children || "Back to Home"}
    </Button>
  );
}
