"use client";

import { Toaster as SonnerToast, toast } from "sonner";

export function Toaster() {
  return <SonnerToast position="bottom-right" />;
}

export { toast };
