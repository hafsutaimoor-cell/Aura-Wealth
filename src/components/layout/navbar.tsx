"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Mic,
  Shield,
  TrendingUp,
  CreditCard,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuToggle: () => void;
}

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: "TrendingUp" },
  { title: "Transactions", url: "/transactions", icon: "CreditCard" },
  { title: "Goals", url: "/goals", icon: "Shield" },
];

export function Navbar({ onMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", dark);
  }, [dark]);

  const isActive = (url: string) => pathname === url;

  return (
    <nav className="fixed z-50 top-0 left-0 right-0 h-16 glass border-b border-white/5">
      <div className="flex items-center justify-between h-full px-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 animate-wave rounded-xl brand-text flex items-center justify-center shadow-brand">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-100">Aura</span>
            <span className="font-bold text-xl tracking-tight text-white">Wealth</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive(item.url)
                  ? "bg-white/10 text-brand-green border border-brand-green/30"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              {getIcon(item.icon, 18)}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="glass-btn text-slate-400 hover:text-white"
            aria-label="Toggle theme"
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Button variant="brand" size="sm">
            <Mic size={16} className="mr-2" /> Voice
          </Button>
          <button
            onClick={onMenuToggle}
            className="glass-btn text-slate-400 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function getIcon(name: string, size: number) {
  const icons: Record<string, any> = {
    TrendingUp,
    Shield,
    CreditCard,
    Moon,
    Sun,
    Menu,
  };
  const Icon = icons[name];
  return Icon ? <Icon size={size} strokeWidth={2} /> : null;
}
