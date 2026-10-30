"use client";

import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Banknote, ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCard {
  title: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  border: string;
  renderValue: (stats: any) => React.ReactNode;
}

const cards: StatCard[] = [
  {
    title: "Total Income",
    icon: Banknote,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    renderValue: (s) => formatCurrency(s.totalIncome),
  },
  {
    title: "Total Expense",
    icon: ArrowDownLeft,
    color: "text-rose-400",
    iconBg: "bg-rose-500/10",
    border: "border-rose-500/20",
    renderValue: (s) => formatCurrency(s.totalExpense),
  },
  {
    title: "Net Cash Flow",
    icon: ArrowUpRight,
    color: "text-brand-green",
    iconBg: "bg-brand-green/10",
    border: "border-brand-green/20",
    renderValue: (s) => (
      <>
        {s.balance >= 0 ? "+" : ""}{formatCurrency(s.balance)}
      </>
    ),
  },
  {
    title: "Savings Rate",
    icon: Clock,
    color: "text-blue-400",
    iconBg: "bg-blue-500/10",
    border: "border-blue-500/20",
    renderValue: (s) => `${s.savingsRate.toFixed(1)}%`,
  },
];

export function SummaryCards() {
  const stats = useFinanceStore((s) => s.getDashboardStats());

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className={card.border}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{card.title}</CardTitle>
            <CardDescription>This period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-2xl font-bold text-slate-100">
                {card.renderValue(stats)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <card.icon size={18} strokeWidth={2} className={card.color} />
              </div>
              <span className="text-xs text-slate-500">
                Updated just now
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
