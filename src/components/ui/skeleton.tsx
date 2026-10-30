"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: number | string;
  width?: number | string;
}

export function Skeleton({
  className,
  height,
  width,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800",
        height && `h-[${typeof height === "number" ? height + "px" : height}]`,
        width && `w-[${typeof width === "number" ? width + "px" : width}]`,
        className,
      )}
      {...props}
    />
  );
}
