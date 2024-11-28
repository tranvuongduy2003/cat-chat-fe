import React from "react";

export interface IOnlineDotProps {
  className?: string;
}

export function OnlineDot({ className = "" }: IOnlineDotProps) {
  return (
    <div className={`w-2.5 h-2.5 rounded-full bg-green-500 ${className}`}></div>
  );
}
