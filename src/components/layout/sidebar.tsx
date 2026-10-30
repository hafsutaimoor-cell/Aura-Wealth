"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Shield, TrendingUp, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: "TrendingUp" },
  { title: "Transactions", url: "/transactions", icon: "CreditCard" },
  { title: "Goals", url: "/goals", icon: "Shield" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-[320px] glass border-l border-white/10 flex flex-col">
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <h2 className="text-xl font-bold text-slate-100">Aura Wealth</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive(item.url)
                  ? "bg-white/10 text-brand-green border border-brand-green/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
              )}
            >
              {getIcon(item.icon, 20)}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">Sign out</Link>
          </Button>
        </div>
      </aside>
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function getIcon(name: string, size: number) {
  const icons: Record<string, any> = { Shield, TrendingUp, CreditCard, LogOut, X };
  const Icon = icons[name];
  return Icon ? <Icon size={size} strokeWidth={2} /> : null;
}
