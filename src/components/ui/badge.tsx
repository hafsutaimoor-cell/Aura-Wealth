"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "outline" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors";
  const variants = {
    default: "border-white/10 bg-white/5 text-slate-300",
    brand: "border-brand-green/30 bg-brand-green/20 text-brand-green",
    outline: "border-white/20 bg-transparent text-slate-400",
    success: "border-emerald-500/30 bg-emerald-500/20 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/20 text-amber-400",
    danger: "border-rose-500/30 bg-rose-500/20 text-rose-400",
  };
  return (
    <span className={cn(base, variants[variant], className)} {...props} />
  );
}
